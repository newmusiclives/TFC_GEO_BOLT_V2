#!/bin/bash

# Dockploy Deployment Script
# This script deploys your Next.js application to Dockploy

set -e

# Dockploy Configuration
DOCKPLOY_API_KEY="edwKwxrXDqhfdtpQyALOUyrNemlzljcaCMQumBbgpXnlimnDsotTXdqgcSLXyTlgnje"
DOCKPLOY_URL="https://fansdock.xenpac.org"

# Application Configuration
APP_NAME="tfc-geo-bolt-v2"
EXTERNAL_PORT="3009"
INTERNAL_PORT="3000"

echo "🚀 Starting Dockploy deployment for $APP_NAME..."

# Check if required environment variables are set
echo "📋 Checking environment variables..."

REQUIRED_VARS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "SUPABASE_SERVICE_ROLE_KEY"
    "NEXT_PUBLIC_APP_URL"
    "NEXT_PUBLIC_MANIFEST_PUBLIC_KEY"
    "MANIFEST_API_KEY"
    "MANIFEST_WEBHOOK_SECRET"
)

MISSING_VARS=()

for var in "${REQUIRED_VARS[@]}"; do
    if [ -z "${!var}" ]; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -ne 0 ]; then
    echo "❌ Missing required environment variables:"
    for var in "${MISSING_VARS[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "Please set these environment variables before deploying."
    exit 1
fi

echo "✅ All required environment variables are set"

# Build the Docker image
echo "🔨 Building Docker image..."
docker build -t $APP_NAME .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed"
    exit 1
fi

echo "✅ Docker image built successfully"

# Create deployment configuration
echo "📝 Creating deployment configuration..."

# Create a temporary deployment config
cat > dockploy-deploy.json << EOF
{
  "name": "$APP_NAME",
  "image": "$APP_NAME:latest",
  "port": $EXTERNAL_PORT,
  "environment": {
    "NODE_ENV": "production",
    "NEXT_TELEMETRY_DISABLED": "1",
    "NEXT_PUBLIC_SUPABASE_URL": "$NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "$NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY": "$SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_APP_URL": "$NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_MANIFEST_PUBLIC_KEY": "$NEXT_PUBLIC_MANIFEST_PUBLIC_KEY",
    "MANIFEST_API_KEY": "$MANIFEST_API_KEY",
    "MANIFEST_WEBHOOK_SECRET": "$MANIFEST_WEBHOOK_SECRET"
  },
  "healthcheck": {
    "path": "/api/health",
    "interval": 30,
    "timeout": 10,
    "retries": 3,
    "start_period": 40
  }
}
EOF

echo "✅ Deployment configuration created"

# Deploy to Dockploy
echo "🚀 Deploying to Dockploy..."

# Using curl to deploy to Dockploy
DEPLOY_RESPONSE=$(curl -s -X POST \
  -H "Authorization: Bearer $DOCKPLOY_API_KEY" \
  -H "Content-Type: application/json" \
  -d @dockploy-deploy.json \
  "$DOCKPLOY_URL/api/deploy")

if [ $? -ne 0 ]; then
    echo "❌ Failed to connect to Dockploy"
    exit 1
fi

# Check if deployment was successful
if echo "$DEPLOY_RESPONSE" | grep -q "success\|deployed\|running"; then
    echo "✅ Deployment successful!"
    echo ""
    echo "🌐 Your application should be available at:"
    echo "   $DOCKPLOY_URL:$EXTERNAL_PORT"
    echo ""
    echo "📊 Health check endpoint:"
    echo "   $DOCKPLOY_URL:$EXTERNAL_PORT/api/health"
    echo ""
    echo "🔍 To check deployment status, visit:"
    echo "   $DOCKPLOY_URL/dashboard"
else
    echo "❌ Deployment failed"
    echo "Response: $DEPLOY_RESPONSE"
    exit 1
fi

# Clean up temporary files
rm -f dockploy-deploy.json

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📝 Next steps:"
echo "   1. Wait 1-2 minutes for the application to fully start"
echo "   2. Visit your application URL to verify it's working"
echo "   3. Check the health endpoint to ensure everything is running"
echo "   4. Monitor logs in the Dockploy dashboard if needed" 