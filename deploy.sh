#!/bin/bash

# TrueFans GeoConnect Docker Deployment Script
set -e

echo "🚀 Starting TrueFans GeoConnect deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example if it exists..."
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "📝 Please update the .env file with your actual values."
    else
        echo "❌ No .env or .env.example file found. Please create a .env file with your environment variables."
        exit 1
    fi
fi

# Build and start the application
echo "🔨 Building Docker image..."
docker-compose build --no-cache

echo "🚀 Starting application..."
docker-compose up -d

# Wait for the application to start
echo "⏳ Waiting for application to start..."
sleep 10

# Check if the application is running
if curl -f http://localhost:3009/api/health > /dev/null 2>&1; then
  echo "✅ Application is running successfully!"
  echo "🌐 Access your application at: http://localhost:3009"
  echo "📊 Health check: http://localhost:3009/api/health"
else
    echo "❌ Application failed to start. Checking logs..."
    docker-compose logs app
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Useful commands:"
echo "  View logs: docker-compose logs -f app"
echo "  Stop app: docker-compose down"
echo "  Restart app: docker-compose restart"
echo "  Update app: git pull && docker-compose up -d --build" 