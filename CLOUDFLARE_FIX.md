# Fix Cloudflare Pages Configuration for ShineBride

## Problems Identified

Your Cloudflare Pages settings are misconfigured for OpenNext deployment:

1. **Build command**: Currently `npm run build` → Now fixed in package.json to run OpenNext build
2. **Build output**: Currently `out` → Should be `.open-next/assets`
3. **Root directory**: Currently empty → Should be `.`

## Required Changes in Cloudflare Dashboard

Go to: https://dash.cloudflare.com/ > Pages > shinebride > Settings > Build & deployment

### Change these settings:

| Setting | Current Value | Correct Value |
|---------|---------------|---------------|
| Build command | `npm run build` | `npm run build` (already fixed) |
| Build output directory | `out` | `.open-next/assets` |
| Root directory | (empty) | `.` |

### Environment Variables (Already Fixed)

The `.env.local` file has been updated to match your Cloudflare variables:
- `NEXT_PUBLIC_SUPABASE_ANON` 
- `NEXT_PUBLIC_SUPABASE_STORAGE`
- `NEXT_PUBLIC_SUPABASE_URL`

### What Was Fixed

1. **package.json**: Changed `build` script from `next build` to `opennextjs-cloudflare build && mkdir -p .open-next/assets && cp -r public/. .open-next/assets/`

2. **.env.local**: Renamed variables to match Cloudflare:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` → `NEXT_PUBLIC_SUPABASE_ANON`
   - `NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET` → `NEXT_PUBLIC_SUPABASE_STORAGE`

### After Fixing Cloudflare Settings

Your deployment will:
1. Use OpenNext to build for Cloudflare
2. Output files to `.open-next/assets`
3. Copy public assets correctly
4. Use the correct environment variables

**Action required**: Update Build output to `.open-next/assets` and Root directory to `.` in Cloudflare Pages settings.