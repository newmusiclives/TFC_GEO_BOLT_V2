# 🚀 Quick Deployment Reference

## Port Configuration
- **Container Port**: 3000 (internal)
- **Host Port**: 3009 (external)
- **Access URL**: `http://localhost:3009`
- **Health Check**: `http://localhost:3009/api/health`

## Dockploy Settings
| Setting | Value |
|---------|-------|
| **Port** | `3009` |
| **Health Check Path** | `/api/health` |
| **Build Command** | `(leave empty)` |
| **Start Command** | `(leave empty)` |

## Environment Variables (Required)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
NEXT_PUBLIC_APP_URL=https://your-dockploy-domain.com
```

## Quick Commands

### Local Docker
```bash
# Deploy locally
./deploy.sh

# Or manually
docker-compose up -d

# Check status
curl http://localhost:3009/api/health
```

### Dockploy
1. Connect repository
2. Set port to `3009`
3. Set health check to `/api/health`
4. Add environment variables
5. Deploy

## Health Check Response
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "version": "1.0.0"
}
```

## Troubleshooting
- **Port 3009 in use**: Change to 3010 in docker-compose.yml
- **Health check fails**: Wait 1-2 minutes after deployment
- **Environment variables**: Ensure all required vars are set 