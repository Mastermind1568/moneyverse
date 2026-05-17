#!/usr/bin/env python3
"""
Bundle all ad PNG and JPG exports into a single ZIP for easy download.
Files are grouped into per-angle subfolders inside the ZIP.
Output: artifacts/mockup-sandbox/public/ads/exports/moneyverse-ads.zip
"""
import zipfile
import glob
import os
import re

EXPORTS_DIR = os.path.join(
    os.path.dirname(__file__),
    "..", "artifacts", "mockup-sandbox", "public", "ads", "exports"
)
OUTPUT = os.path.join(EXPORTS_DIR, "moneyverse-ads.zip")

def angle_folder(filename):
    """Extract the angle name (everything before the trailing -WxH.ext)."""
    base = os.path.basename(filename)
    name_no_ext = re.sub(r'\.\w+$', '', base)
    match = re.search(r'-\d+x\d+$', name_no_ext)
    if match:
        return name_no_ext[:match.start()]
    return name_no_ext

files = sorted(
    glob.glob(os.path.join(EXPORTS_DIR, "*.png")) +
    glob.glob(os.path.join(EXPORTS_DIR, "*.jpg")) +
    glob.glob(os.path.join(EXPORTS_DIR, "*.jpeg"))
)
if not files:
    print("No PNG/JPG files found in", EXPORTS_DIR)
    raise SystemExit(1)

with zipfile.ZipFile(OUTPUT, "w", zipfile.ZIP_DEFLATED) as zf:
    for f in files:
        folder = angle_folder(f)
        arcname = os.path.join(folder, os.path.basename(f))
        zf.write(f, arcname)
        print(f"  + {arcname}")

size_kb = os.path.getsize(OUTPUT) // 1024
print(f"\nCreated {OUTPUT} ({len(files)} files, {size_kb} KB)")
