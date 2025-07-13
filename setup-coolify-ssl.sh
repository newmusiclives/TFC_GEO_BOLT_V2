#!/bin/bash

# Setup Coolify Proxy with Automatic SSL
echo "🔧 Setting up Coolify Proxy with Automatic SSL..."

# Create necessary directories
echo "📁 Creating directories..."
sudo mkdir -p /data/coolify/proxy/dynamic
sudo mkdir -p /data/coolify/proxy/logs

# Set proper permissions
echo "🔐 Setting permissions..."
sudo chown -R 1000:1000 /data/coolify/proxy
sudo chmod -R 755 /data/coolify/proxy

# Copy dynamic configuration
echo "📄 Setting up dynamic configuration..."
sudo cp traefik-dynamic.yml /data/coolify/proxy/dynamic/

# Create acme.json for SSL certificates
echo "🔒 Creating SSL certificate storage..."
sudo touch /data/coolify/proxy/acme.json
sudo chmod 600 /data/coolify/proxy/acme.json
sudo chown 1000:1000 /data/coolify/proxy/acme.json

# Create coolify network if it doesn't exist
echo "🌐 Creating Coolify network..."
docker network create coolify 2>/dev/null || echo "Network 'coolify' already exists"

# Deploy the proxy
echo "🚀 Deploying Coolify Proxy..."
docker-compose -f coolify-proxy.yml up -d

echo ""
echo "✅ Coolify Proxy setup completed!"
echo ""
echo "📋 Configuration Summary:"
echo "   - Email: aldenlemberg@gmail.com"
echo "   - SSL: Automatic Let's Encrypt certificates"
echo "   - HTTP to HTTPS: Automatic redirects"
echo "   - Dashboard: http://localhost:8080"
echo ""
echo "🔍 To check status:"
echo "   docker-compose -f coolify-proxy.yml logs -f"
echo ""
echo "📊 Access Traefik Dashboard:"
echo "   http://localhost:8080"
echo ""
echo "📝 For your applications, add these labels:"
echo "   - traefik.enable=true"
echo "   - traefik.http.routers.your-app.entrypoints=https"
echo "   - traefik.http.routers.your-app.rule=Host('yourdomain.com')"
echo "   - traefik.http.routers.your-app.tls=true"
echo "   - traefik.http.routers.your-app.tls.certresolver=letsencrypt"
echo "   - traefik.http.services.your-app.loadbalancer.server.port=YOUR_PORT" 