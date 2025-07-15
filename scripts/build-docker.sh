#!/bin/bash

# Docker build script with debugging and environment variable handling

set -e

echo "🚀 Starting Docker build process..."

# Check if required environment variables are set
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ]; then
    echo "⚠️  Warning: NEXT_PUBLIC_SUPABASE_URL is not set"
fi

if [ -z "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ]; then
    echo "⚠️  Warning: NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"
fi

if [ -z "$NEXT_PUBLIC_APP_URL" ]; then
    echo "⚠️  Warning: NEXT_PUBLIC_APP_URL is not set"
fi

# Build the Docker image with build arguments
echo "🔨 Building Docker image..."
docker build \
    --build-arg NEXT_PUBLIC_SUPABASE_URL="$NEXT_PUBLIC_SUPABASE_URL" \
    --build-arg NEXT_PUBLIC_SUPABASE_ANON_KEY="$NEXT_PUBLIC_SUPABASE_ANON_KEY" \
    --build-arg NEXT_PUBLIC_APP_URL="$NEXT_PUBLIC_APP_URL" \
    -t truefans-geoconnect:latest .

echo "✅ Docker build completed successfully!"

# Optional: Run a test container to verify the build
if [ "$1" = "--test" ]; then
    echo "🧪 Testing the built image..."
    docker run --rm -p 3009:3009 truefans-geoconnect:latest &
    TEST_PID=$!
    
    # Wait a moment for the server to start
    sleep 5
    
    # Test if the server is responding
    if curl -f http://localhost:3009/api/health > /dev/null 2>&1; then
        echo "✅ Server is responding correctly!"
    else
        echo "❌ Server is not responding"
    fi
    
    # Clean up
    kill $TEST_PID 2>/dev/null || true
fi

echo "🎉 Build process completed!" 