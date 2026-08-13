# Optimize Cloudflare Pages Build for ShineBride

## Why Build Fails: "build exceeded the time limit"

Your Cloudflare Pages build takes **~37 minutes** (limit: 20 minutes).

### Root Causes:
1. **Build Cache = Disabled** → `npm install` runs from scratch every deploy
2. **Inefficient build command** → `opennextjs-cloudflare build && mkdir && cp`
3. **Next.js 16 + React 19** → Newer versions need more resources
4. **Network dependencies** → npm registry timeouts

---

## ✅ Required Fixes

### 1. Enable Build Cache in Cloudflare (CRITICAL)

**Path:** `Dashboard > Pages > shinebride > Settings > Build & deployment`

```
Build cache: Enabled  ← Change from Disabled
```

**Impact:** Subsequent deploys will be 80-90% faster (skips `npm install`)

---

### 2. Update Cloudflare Settings

| Setting | Current | Correct |
|---------|---------|---------|
| Build command | `npm run build` | `npm run build` (keep) |
| Build output | `out` | **`.open-next/assets`** |
| Root directory | (empty) | **`.`** |
| Build cache | Disabled | **Enabled** |

---

### 3. Add Environment Variable for OpenNext

In Cloudflare Pages > Settings > Variables and secrets:

```
Name: CLOUDFLARE_PAGES
Value: 1
```

This tells OpenNext it's running on Cloudflare Pages.

---

## 📦 Changes Made in Repository

### package.json
```json
"build": "opennextjs-cloudflare build"
```
- Removed unnecessary `mkdir && cp` commands
- OpenNext automatically handles `public/` directory

### .npmrc
```
legacy-peer-deps=true
strict-peer-dependencies=false
fetch-retry-mintimeout=20000
fetch-retry-maxtimeout=120000
```
- Prevents npm install timeouts
- Handles peer dependency issues gracefully

---

## 🚀 Expected Results

| Action | Time Before | Time After |
|--------|-------------|------------|
| First deploy | ~37 min (timeout) | ~15-18 min (success) |
| Subsequent deploys | ~37 min (timeout) | ~2-5 min (success) |

---

## ⚡ Additional Optimization Tips

### Use a custom Docker image (advanced)
If builds still timeout, consider using Cloudflare Pages with a custom build image that has dependencies pre-installed.

### Reduce node_modules size
Run `npm prune --production` locally and commit the cleaned node_modules (not recommended for most cases).

### Split your project
Move heavy dependencies to Cloudflare Workers or use edge functions.

---

## 🔍 Build Log Analysis

```
2026-08-13T20:40:15.077745Z Success: Finished cloning repository files
2026-08-13T21:16:58.059935Z Failed: build exceeded the time limit
```

**Time spent: ~36 minutes 43 seconds**
- ~5-10 min: Cloning + setup
- ~15-20 min: npm install (without cache)
- ~10-15 min: opennextjs-cloudflare build
- ~1-2 min: Asset copying

With **Build Cache Enabled**, the `npm install` step will be skipped.
