import { Router, type IRouter } from "express";
import puppeteer from "puppeteer";
import path from "node:path";
import { execFile, execFileSync } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const router: IRouter = Router();

function resolveChromiumPath(): string {
  if (process.env["CHROMIUM_PATH"]) {
    return process.env["CHROMIUM_PATH"];
  }
  try {
    return execFileSync("which", ["chromium"], { encoding: "utf8" }).trim();
  } catch {
    return "/usr/bin/chromium-browser";
  }
}

const CHROMIUM_PATH = resolveChromiumPath();

const WORKSPACE_ROOT = path.resolve(process.cwd(), "../..");
const ADS_DIR = path.join(WORKSPACE_ROOT, "artifacts/mockup-sandbox/public/ads");
const EXPORTS_DIR = path.join(ADS_DIR, "exports");
const BUNDLE_SCRIPT = path.join(WORKSPACE_ROOT, "scripts/bundle-ads.py");

const EXPORT_COOLDOWN_MS = 30_000;
let lastExportAt = 0;
let exportInProgress = false;

const AD_SPECS = [
  { name: "angle1-pain", file: "angle1-pain.html" },
  { name: "angle2-outcome", file: "angle2-outcome.html" },
  { name: "angle3-identity", file: "angle3-identity.html" },
  { name: "angle4-curiosity", file: "angle4-curiosity.html" },
] as const;

const SIZES = [
  { w: 1080, h: 1080, label: "1080x1080" },
  { w: 1200, h: 627, label: "1200x627" },
  { w: 1200, h: 675, label: "1200x675" },
] as const;

router.post("/export-ads", async (_req, res) => {
  if (exportInProgress) {
    res.status(429).json({ ok: false, error: "An export is already running, please wait." });
    return;
  }

  const now = Date.now();
  const elapsed = now - lastExportAt;
  if (lastExportAt > 0 && elapsed < EXPORT_COOLDOWN_MS) {
    const wait = Math.ceil((EXPORT_COOLDOWN_MS - elapsed) / 1000);
    res.status(429).json({ ok: false, error: `Export cooldown active — try again in ${wait}s.` });
    return;
  }

  exportInProgress = true;
  lastExportAt = now;

  const browser = await puppeteer.launch({
    executablePath: CHROMIUM_PATH,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });

  try {
    const generated: string[] = [];

    for (const ad of AD_SPECS) {
      const fileUrl = `file://${path.join(ADS_DIR, ad.file)}`;

      for (const size of SIZES) {
        const page = await browser.newPage();
        await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 1 });
        await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30_000 });

        const outFile = path.join(EXPORTS_DIR, `${ad.name}-${size.label}.png`);
        await page.screenshot({ path: outFile, type: "png", fullPage: false });
        await page.close();

        generated.push(`${ad.name}-${size.label}.png`);
      }
    }

    await browser.close();
    await execFileAsync("python3", [BUNDLE_SCRIPT]);

    res.json({ ok: true, generated, count: generated.length });
  } catch (err: unknown) {
    await browser.close().catch(() => {});
    const message = err instanceof Error ? err.message : String(err);
    res.status(500).json({ ok: false, error: message });
  } finally {
    exportInProgress = false;
  }
});

export default router;
