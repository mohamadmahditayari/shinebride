#!/bin/bash

# Fix Next.js 16 Jest worker memory issues

echo "🔧 Fixing Next.js build issues..."

# Step 1: Clean node_modules and cache
echo "🗑️  Cleaning node_modules and cache..."
rm -rf node_modules .next npm-cache
npm cache clean --force

# Step 2: Reinstall dependencies
echo "📦 Reinstalling dependencies..."
npm install

# Step 3: Build with reduced workers
echo "🏗️  Building with optimized settings..."
NODE_OPTIONS=--max-old-space-size=4096 NEXTJS_MEMORY_LIMIT=4096 npm run build

echo "✅ Build optimization complete!"
