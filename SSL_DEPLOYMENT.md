# SSL Deployment Guide with Traefik

This guide explains how to deploy TrueFans Connect with automatic SSL certificate generation using Traefik and Let's Encrypt.

## Prerequisites

1. **Domain Name**: You need a domain name pointing to your server
2. **Server Access**: SSH access to your server
3. **Docker & Docker Compose**: Installed on your server
4. **Ports Open**: Ports 80 and 443 must be open on your server

## Quick Deployment

### Option 1: Using the Deployment Script (Recommended)

```bash
# Deploy with your domain
./deploy-with-ssl.sh yourdomain.com

# Deploy with custom email
./deploy-with-ssl.sh yourdomain.com your-email@example.com
```

### Option 2: Manual Deployment

1. **Update Configuration**:
   ```bash
   # Update email in traefik.yml
   sed -i "s/your-email@example.com/your-email@yourdomain.com/g" traefik.yml
   
   # Update domain in docker-compose.traefik.yml
   sed -i "s/truefansconnect.com/yourdomain.com/g" docker-compose.traefik.yml
   ```

2. **Create SSL Certificate Storage**:
   ```bash
   touch acme.json
   chmod 600 acme.json
   ```

3. **Deploy**:
   ```bash
   docker-compose -f docker-compose.traefik.yml up -d
   ```

## Configuration Files

### traefik.yml
- **Dashboard**: Available at `http://your-server-ip:8080`
- **SSL**: Automatic Let's Encrypt certificates
- **HTTP to HTTPS**: Automatic redirects

### docker-compose.traefik.yml
- **App Service**: Your Next.js application
- **Traefik Service**: Reverse proxy with SSL termination
- **Networks**: Isolated network for security

## SSL Certificate Details

- **Provider**: Let's Encrypt
- **Challenge Type**: HTTP-01 challenge
- **Auto-renewal**: Automatic (every 60 days)
- **Storage**: `acme.json` file

## Access Points

- **Application**: `https://yourdomain.com`
- **Traefik Dashboard**: `http://your-server-ip:8080`
- **HTTP Redirect**: `http://yourdomain.com` → `https://yourdomain.com`

## Troubleshooting

### SSL Certificate Issues

1. **Check Domain DNS**:
   ```bash
   nslookup yourdomain.com
   ```

2. **Check Traefik Logs**:
   ```bash
   docker-compose -f docker-compose.traefik.yml logs traefik
   ```

3. **Check Certificate Status**:
   ```bash
   docker exec traefik cat /acme.json
   ```

### Common Issues

1. **"Certificate not found"**:
   - Ensure domain points to server IP
   - Check port 80 is open for HTTP challenge
   - Wait 5-10 minutes for initial certificate generation

2. **"Connection refused"**:
   - Check if containers are running: `docker ps`
   - Check container logs: `docker-compose logs`

3. **"Invalid certificate"**:
   - Clear browser cache
   - Check certificate renewal: `docker-compose restart traefik`

## Security Considerations

1. **Firewall**: Only expose ports 80, 443, and 8080
2. **Updates**: Keep Traefik updated for security patches
3. **Backup**: Backup `acme.json` for certificate persistence
4. **Monitoring**: Monitor certificate expiration

## Maintenance

### Update Application
```bash
docker-compose -f docker-compose.traefik.yml down
docker-compose -f docker-compose.traefik.yml build --no-cache
docker-compose -f docker-compose.traefik.yml up -d
```

### Update Traefik
```bash
docker-compose -f docker-compose.traefik.yml pull traefik
docker-compose -f docker-compose.traefik.yml up -d traefik
```

### Backup Certificates
```bash
cp acme.json acme.json.backup
```

## Support

If you encounter issues:

1. Check the logs: `docker-compose -f docker-compose.traefik.yml logs`
2. Verify DNS settings
3. Ensure ports are open
4. Check Let's Encrypt rate limits (max 5 certificates per domain per week) 