#!/usr/bin/env python3
"""
Bundle all ad PNG exports into a single ZIP for easy download.
Output: artifacts/mockup-sandbox/public/ads/exports/moneyverse-ads.zip
"""
import zipfile
import glob
import os

EXPORTS_DIR = os.path.join(
    os.path.dirname(__file__),
    "..", "artifacts", "mockup-sandbox", "public", "ads", "exports"
)
OUTPUT = os.path.join(EXPORTS_DIR, "moneyverse-ads.zip")

pngs = sorted(glob.glob(os.path.join(EXPORTS_DIR, "*.png")))
if not pngs:
    print("No PNG files found in", EXPORTS_DIR)
    raise SystemExit(1)

with zipfile.ZipFile(OUTPUT, "w", zipfile.ZIP_DEFLATED) as zf:
    for f in pngs:
        zf.write(f, os.path.basename(f))
        print(f"  + {os.path.basename(f)}")

size_kb = os.path.getsize(OUTPUT) // 1024
print(f"\nCreated {OUTPUT} ({len(pngs)} files, {size_kb} KB)")
