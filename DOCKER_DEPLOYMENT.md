# 🐳 Docker Deployment Guide

## Quick Start

### Prerequisites
- Docker installed
- Docker Compose installed
- Environment variables configured

### Deploy with Script
```bash
./deploy.sh
```

### Manual Deployment
```bash
# Build the image
docker-compose build

# Start the application
docker-compose up -d

# Check logs
docker-compose logs -f app
```

## 🔧 Troubleshooting

### "bash: executable file not found" Error

**Problem**: The container doesn't have bash installed.

**Solution**: Use the provided Dockerfile which uses Alpine Linux with proper shell support.

**Alternative**: If you need to run commands inside the container, use:
```bash
# Instead of: docker exec -it container_name bash
docker exec -it container_name sh
```

### Environment Variables

**Problem**: Application can't access environment variables.

**Solution**: 
1. Create a `.env` file in the project root
2. Add your environment variables:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add other required variables
```

### Port Conflicts

**Problem**: Port 3000 is already in use.

**Solution**: Change the port in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Use port 3001 on host
```

### Build Failures

**Problem**: Docker build fails.

**Solutions**:
1. **Clear Docker cache**:
   ```bash
   docker system prune -a
   docker-compose build --no-cache
   ```

2. **Check Node.js version**: Ensure you're using Node.js 18+
3. **Check dependencies**: Run `npm install` locally first

### Application Won't Start

**Problem**: Container starts but application is not accessible.

**Solutions**:
1. **Check logs**:
   ```bash
   docker-compose logs app
   ```

2. **Check health endpoint**:
   ```bash
   curl http://localhost:3000/api/health
   ```

3. **Verify environment variables**:
   ```bash
   docker-compose exec app env | grep NEXT_PUBLIC
   ```

## 📋 Common Commands

### Development
```bash
# Start in development mode
docker-compose -f docker-compose.dev.yml up

# Rebuild after changes
docker-compose build --no-cache
docker-compose up -d
```

### Production
```bash
# Deploy to production
docker-compose -f docker-compose.prod.yml up -d

# Update application
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Maintenance
```bash
# View logs
docker-compose logs -f app

# Stop application
docker-compose down

# Restart application
docker-compose restart

# Remove all containers and images
docker-compose down --rmi all --volumes --remove-orphans
```

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to version control
- Use Docker secrets for sensitive data in production
- Rotate API keys regularly

### Container Security
- The Dockerfile runs as non-root user (`nextjs`)
- Uses Alpine Linux for smaller attack surface
- Includes security headers via middleware

### Network Security
- Application runs on internal network
- Only port 3000 is exposed
- Health checks monitor application status

## 🚀 Production Deployment

### Using Docker Compose
```bash
# Create production environment file
cp .env.example .env.prod
# Edit .env.prod with production values

# Deploy
docker-compose -f docker-compose.yml --env-file .env.prod up -d
```

### Using Docker Swarm
```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml truefans
```

### Using Kubernetes
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/
```

## 📊 Monitoring

### Health Checks
- Application exposes `/api/health` endpoint
- Docker health check monitors application status
- Logs are available via `docker-compose logs`

### Metrics
- Application uptime available via health endpoint
- Container metrics via Docker stats
- Consider adding Prometheus/Grafana for detailed monitoring

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to server
        run: |
          ssh user@server "cd /app && git pull && docker-compose up -d --build"
```

## 📞 Support

If you encounter issues:

1. **Check logs**: `docker-compose logs app`
2. **Verify environment**: Ensure all required variables are set
3. **Test locally**: Try running the app without Docker first
4. **Check Docker version**: Ensure you're using recent Docker version

## 📝 Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key |
| `NEXT_PUBLIC_APP_URL` | Yes | Application URL |
| `NEXT_PUBLIC_MANIFEST_PUBLIC_KEY` | No | Manifest Financial public key |
| `MANIFEST_API_KEY` | No | Manifest Financial API key |
| `MANIFEST_WEBHOOK_SECRET` | No | Manifest Financial webhook secret | 