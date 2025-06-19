#!/bin/bash

# Netlify build script with error handling
set -e

echo "🚀 Starting build process..."

# Check Node.js version
echo "Node.js version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install dependencies if needed
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

# Run TypeScript compilation
echo "🔧 Compiling TypeScript..."
npx tsc -b

# Run Vite build
echo "🏗️ Building with Vite..."
npx vite build

# Run post-build script for sitemap
echo "� Running post-build tasks..."
bash ./post-build.sh

echo "✅ Build completed successfully!"
