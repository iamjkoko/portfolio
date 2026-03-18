#!/bin/bash

# ============================================================
#  cleanup.sh — React + TypeScript / Cursor Project Cleaner
#  Run from project root: bash cleanup.sh
# ============================================================

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

log()  { echo -e "${CYAN}▶ $1${NC}"; }
ok()   { echo -e "${GREEN}✔ $1${NC}"; }
warn() { echo -e "${YELLOW}⚠ $1${NC}"; }

echo ""
echo "============================================"
echo "   🧹 React + TypeScript Project Cleanup"
echo "============================================"
echo ""

# ── 1. Node modules & lock-file-safe reinstall ────────────────
log "Removing node_modules..."
rm -rf node_modules
ok "node_modules removed"

log "Clearing npm cache..."
npm cache clean --force
ok "npm cache cleared"

# ── 2. Build artifacts ────────────────────────────────────────
log "Removing build artifacts..."
rm -rf dist build .next out .turbo
ok "Build artifacts removed"

# ── 3. TypeScript cache ───────────────────────────────────────
log "Removing TypeScript build info..."
find . -name "*.tsbuildinfo" -not -path "*/node_modules/*" -delete
ok "TypeScript cache cleared"

# ── 4. Test / coverage cache ──────────────────────────────────
log "Removing test & coverage cache..."
rm -rf coverage .jest-cache jest_cache
ok "Test cache cleared"

# ── 5. Vite / Webpack / ESBuild cache ────────────────────────
log "Removing bundler cache..."
rm -rf .vite node_modules/.vite node_modules/.cache .swc
ok "Bundler cache cleared"

# ── 6. ESLint cache ───────────────────────────────────────────
log "Removing ESLint cache..."
find . -name ".eslintcache" -not -path "*/node_modules/*" -delete
ok "ESLint cache cleared"

# ── 7. Prettier cache ─────────────────────────────────────────
log "Removing Prettier cache..."
find . -name ".prettiercache" -not -path "*/node_modules/*" -delete 2>/dev/null || true
ok "Prettier cache cleared"

# ── 8. OS junk files ──────────────────────────────────────────
log "Removing OS junk files (.DS_Store, Thumbs.db)..."
find . -name ".DS_Store" -not -path "*/node_modules/*" -delete
find . -name "Thumbs.db"  -not -path "*/node_modules/*" -delete
ok "OS junk files removed"

# ── 9. Cursor AI cache (app-level) ────────────────────────────
log "Clearing Cursor editor cache..."
if [[ "$OSTYPE" == "darwin"* ]]; then
  CURSOR_CACHE="$HOME/Library/Application Support/Cursor"
  for dir in Cache "Code Cache" GPUCache CachedData CachedExtensionVSIXs; do
    if [ -d "$CURSOR_CACHE/$dir" ]; then
      rm -rf "$CURSOR_CACHE/$dir"
      ok "  Removed Cursor/$dir"
    fi
  done
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
  CURSOR_CACHE="$HOME/.config/Cursor"
  for dir in Cache "Code Cache" GPUCache CachedData; do
    if [ -d "$CURSOR_CACHE/$dir" ]; then
      rm -rf "$CURSOR_CACHE/$dir"
      ok "  Removed Cursor/$dir"
    fi
  done
elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "cygwin"* ]]; then
  warn "Windows detected — manually delete: %APPDATA%\\Cursor\\Cache and Code Cache"
fi

# ── 10. Reinstall dependencies ────────────────────────────────
echo ""
log "Reinstalling dependencies..."
npm install
ok "Dependencies reinstalled"

echo ""
echo "============================================"
echo -e "${GREEN}   ✅ Cleanup complete! Project is fresh.${NC}"
echo "============================================"
echo ""