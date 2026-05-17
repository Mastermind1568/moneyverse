import puppeteer from "puppeteer";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH = path.resolve(__dirname, "../../../artifacts/moneyverse/public/fiat-trap-guide.pdf");

function resolveChromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  try { return execFileSync("which", ["chromium"], { encoding: "utf8" }).trim(); } catch {}
  try { return execFileSync("which", ["chromium-browser"], { encoding: "utf8" }).trim(); } catch {}
  return "/usr/bin/chromium-browser";
}

const PORT = process.argv[2] || "24979";
const URL  = `http://localhost:${PORT}/free-guide`;

console.log(`[guide-pdf] Rendering ${URL}`);
const chromium = resolveChromiumPath();
console.log(`[guide-pdf] Chromium: ${chromium}`);

const browser = await puppeteer.launch({
  executablePath: chromium,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 900 });
await page.goto(URL, { waitUntil: "networkidle0", timeout: 60_000 });

await page.pdf({
  path: OUT_PATH,
  format: "A4",
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});

await browser.close();
const size = (fs.statSync(OUT_PATH).size / 1024).toFixed(1);
console.log(`[guide-pdf] Saved: ${OUT_PATH} (${size} KB)`);
