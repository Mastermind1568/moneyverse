#!/bin/bash
set -e
PUPPETEER_SKIP_DOWNLOAD=true pnpm install --frozen-lockfile
pnpm --filter db push
