#!/bin/bash

# Troubleshoot SSL Certificate Issues
echo "🔍 Troubleshooting SSL Certificate Issues..."

echo ""
echo "📋 Checking Traefik Status..."
docker ps | grep coolify-proxy

echo ""
echo "📊 Checking Traefik Logs..."
docker logs coolify-proxy --tail 20

echo ""
echo "🔒 Checking SSL Certificate Storage..."
if [ -f "/data/coolify/proxy/acme.json" ]; then
    echo "✅ acme.json exists"
    ls -la /data/coolify/proxy/acme.json
    echo ""
    echo "📄 Certificate content (first 500 chars):"
    head -c 500 /data/coolify/proxy/acme.json
else
    echo "❌ acme.json not found"
fi

echo ""
echo "🌐 Checking Network Configuration..."
docker network ls | grep coolify

echo ""
echo "📁 Checking Dynamic Configuration..."
if [ -f "/data/coolify/proxy/dynamic/traefik-dynamic.yml" ]; then
    echo "✅ Dynamic config exists"
    cat /data/coolify/proxy/dynamic/traefik-dynamic.yml
else
    echo "❌ Dynamic config not found"
fi

echo ""
echo "🔧 Checking Traefik Dashboard..."
echo "Dashboard should be available at: http://localhost:8080"

echo ""
echo "📝 Common Solutions:"
echo "1. Ensure your domain points to this server's IP"
echo "2. Check that ports 80 and 443 are open"
echo "3. Wait 5-10 minutes for initial certificate generation"
echo "4. Check Let's Encrypt rate limits (max 5 certs per domain per week)"
echo ""
echo "🔄 To restart Traefik:"
echo "   docker-compose -f coolify-proxy.yml restart"
echo ""
echo "🔍 To check specific domain:"
echo "   curl -I http://yourdomain.com/.well-known/acme-challenge/test" 