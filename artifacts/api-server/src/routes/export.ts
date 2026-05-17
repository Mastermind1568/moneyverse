import { Router, type IRouter } from "express";
import puppeteer from "puppeteer";
import path from "node:path";
import fs from "node:fs";
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
    try {
      return execFileSync("which", ["chromium-browser"], { encoding: "utf8" }).trim();
    } catch {
      return "/usr/bin/chromium-browser";
    }
  }
}

const CHROMIUM_PATH = resolveChromiumPath();

(function validateChromiumPath() {
  try {
    fs.accessSync(CHROMIUM_PATH, fs.constants.X_OK);
    console.log(`[export] Chromium resolved: ${CHROMIUM_PATH}`);
  } catch {
    console.warn(
      `[export] WARNING: Chromium binary not found or not executable at "${CHROMIUM_PATH}". ` +
        "Ad exports will fail. Set the CHROMIUM_PATH environment variable to override."
    );
  }
})();

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

const TOTAL = AD_SPECS.length * SIZES.length;

type FlushableResponse = import("express").Response & { flush?: () => void };

function sseWrite(res: FlushableResponse, data: object) {
  res.write(`data: ${JSON.stringify(data)}\n\n`);
  res.flush?.();
}

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

  try {
    fs.accessSync(CHROMIUM_PATH, fs.constants.X_OK);
  } catch {
    res.status(503).json({
      ok: false,
      error: `Chromium binary not found or not executable at "${CHROMIUM_PATH}". Set the CHROMIUM_PATH environment variable to override.`,
    });
    return;
  }

  exportInProgress = true;
  lastExportAt = now;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  const flushable = res as FlushableResponse;
  sseWrite(flushable, { type: "start", total: TOTAL });

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
    let done = 0;

    for (const ad of AD_SPECS) {
      const fileUrl = `file://${path.join(ADS_DIR, ad.file)}`;

      for (const size of SIZES) {
        const page = await browser.newPage();
        await page.setViewport({ width: size.w, height: size.h, deviceScaleFactor: 1 });
        await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30_000 });

        const outFile = path.join(EXPORTS_DIR, `${ad.name}-${size.label}.png`);
        await page.screenshot({ path: outFile, type: "png", fullPage: false });
        await page.close();

        done++;
        generated.push(`${ad.name}-${size.label}.png`);

        sseWrite(flushable, { type: "progress", done, total: TOTAL, file: `${ad.name}-${size.label}.png` });
      }
    }

    await browser.close();

    let bundleOutput = "";
    try {
      const { stdout } = await execFileAsync("python3", [BUNDLE_SCRIPT]);
      bundleOutput = stdout.trim();
    } catch (bundleErr: unknown) {
      const msg = bundleErr instanceof Error ? bundleErr.message : String(bundleErr);
      sseWrite(flushable, { type: "error", error: `PNGs exported but ZIP bundling failed: ${msg}` });
      res.end();
      return;
    }

    sseWrite(flushable, { type: "done", ok: true, generated, count: generated.length, bundle: bundleOutput });
    res.end();
  } catch (err: unknown) {
    await browser.close().catch(() => {});
    const message = err instanceof Error ? err.message : String(err);
    sseWrite(flushable, { type: "error", error: message });
    res.end();
  } finally {
    exportInProgress = false;
  }
});

export default router;
