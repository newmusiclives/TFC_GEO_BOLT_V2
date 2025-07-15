#!/bin/bash

# Test standalone build locally

set -e

echo "🧪 Testing standalone build..."

# Check if standalone build exists
if [ ! -f ".next/standalone/server.js" ]; then
    echo "❌ Standalone build not found. Running build first..."
    npm run build
fi

# Copy standalone files to a test directory
TEST_DIR="./test-standalone"
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"

echo "📁 Copying standalone files..."
cp -r .next/standalone/* "$TEST_DIR/"
mkdir -p "$TEST_DIR/.next"
cp -r .next/static "$TEST_DIR/.next/"
cp -r .next/server "$TEST_DIR/.next/"
# Copy all required manifest files if they exist
for f in BUILD_ID prerender-manifest.json prerender-manifest.js routes-manifest.json build-manifest.json app-build-manifest.json required-server-files.json images-manifest.json; do
  if [ -f ".next/$f" ]; then
    cp ".next/$f" "$TEST_DIR/.next/"
  fi
done
# Copy server/app-path-routes-manifest.json and server/middleware-manifest.json if present
mkdir -p "$TEST_DIR/.next/server"
for f in app-path-routes-manifest.json middleware-manifest.json; do
  if [ -f ".next/server/$f" ]; then
    cp ".next/server/$f" "$TEST_DIR/.next/server/"
  fi
done
cp -r public "$TEST_DIR/"

# Set environment variables for testing
export NODE_ENV=production
export PORT=3009
export HOSTNAME=0.0.0.0

echo "🚀 Starting standalone server..."
cd "$TEST_DIR"

# Start the server in the background
node server.js &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test if server is responding
echo "🔍 Testing server response..."
if curl -f http://localhost:3009/api/health > /dev/null 2>&1; then
    echo "✅ Standalone server is working correctly!"
else
    echo "❌ Standalone server is not responding"
    echo "📋 Server logs:"
    ps aux | grep "node server.js" | grep -v grep || true
fi

# Clean up
echo "🧹 Cleaning up..."
kill $SERVER_PID 2>/dev/null || true
cd ..
rm -rf "$TEST_DIR"

echo "🎉 Standalone test completed!" 