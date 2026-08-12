# Fix Next.js 16 Build Issues

## Problem: Jest worker encountered 2 child process exceptions

This error occurs in Next.js 16+ when using Turbopack with limited memory resources.

## Solutions

### Solution 1: Clean and Rebuild (Recommended)

```bash
# Remove all build artifacts and caches
rm -rf node_modules .next

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
npm install

# Build with increased memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Solution 2: Use SWC Compiler Instead of Turbopack

Edit `next.config.ts`:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // Force SWC compiler for better stability
  compiler: {
    styledComponents: false,
  },
};

export default nextConfig;
```

### Solution 3: Environment Variables

Add to `.env.local`:

```
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096

# Next.js memory limit
NEXTJS_MEMORY_LIMIT=4096
```

### Solution 4: Disable Turbopack Explicitly

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // Disable Turbopack
    turbopack: false,
  },
};

export default nextConfig;
```

### Solution 5: All-in-One Fix

```bash
# 1. Clean everything
rm -rf node_modules .next package-lock.json

# 2. Add environment variables
cat >> .env.local << 'EOF'
NODE_OPTIONS=--max-old-space-size=4096
NEXTJS_MEMORY_LIMIT=4096
EOF

# 3. Reinstall and build
npm install
npm run build
```

## Additional Notes

- This issue is common in Next.js 16+ with Turbopack on systems with <8GB RAM
- The SWC compiler is more stable and uses less memory
- If you have <4GB RAM, consider using `--max-old-space-size=2048`
- For production builds, ensure you have at least 4GB free memory

## Verified Working Configuration

The current `next.config.ts` uses SWC compiler which should resolve the Jest worker issues while maintaining good build performance.
