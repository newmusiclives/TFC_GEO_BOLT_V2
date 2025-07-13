#!/bin/bash

# Generate self-signed SSL certificate for development
# This script creates a self-signed certificate for local development

echo "Generating self-signed SSL certificate for development..."

# Create SSL directory
mkdir -p ssl

# Generate private key
openssl genrsa -out ssl/localhost.key 2048

# Generate certificate signing request
openssl req -new -key ssl/localhost.key -out ssl/localhost.csr -subj "/C=US/ST=State/L=City/O=Organization/CN=localhost"

# Generate self-signed certificate
openssl x509 -req -days 365 -in ssl/localhost.csr -signkey ssl/localhost.key -out ssl/localhost.crt

# Set permissions
chmod 600 ssl/localhost.key
chmod 644 ssl/localhost.crt

echo "SSL certificate generated successfully!"
echo "Certificate: ssl/localhost.crt"
echo "Private key: ssl/localhost.key"
echo ""
echo "For development, you can now use:"
echo "  npm run dev:ssl"
echo ""
echo "For production, replace the certificate files with your actual SSL certificates." 