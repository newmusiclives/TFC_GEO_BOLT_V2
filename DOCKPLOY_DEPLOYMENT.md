# Dockploy Deployment Guide

This guide will help you deploy your Next.js application to Dockploy using your API key.

## Prerequisites

- Docker installed and running
- All environment variables configured
- Dockploy API key: `edwKwxrXDqhfdtpQyALOUyrNemlzljcaCMQumBbgpXnlimnDsotTXdqgcSLXyTlgnje`

## Quick Start

### Option 1: Automated Setup (Recommended)

1. **Run the setup script:**
   ```bash
   ./setup-dockploy.sh
   ```
   
   This interactive script will:
   - Guide you through setting up all required environment variables
   - Create a `.env` file with your configuration
   - Make the deployment script executable
   - Provide clear next steps

2. **Deploy your application:**
   ```bash
   ./deploy-dockploy.sh
   ```

### Option 2: Manual Environment Setup

If you prefer to set environment variables manually:

```bash
export NEXT_PUBLIC_SUPABASE_URL="your_supabase_url"
export NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
export SUPABASE_SERVICE_ROLE_KEY="your_supabase_service_role_key"
export NEXT_PUBLIC_APP_URL="https://fansdock.xenpac.org:3009"
export NEXT_PUBLIC_MANIFEST_PUBLIC_KEY="your_manifest_public_key"
export MANIFEST_API_KEY="your_manifest_api_key"
export MANIFEST_WEBHOOK_SECRET="your_manifest_webhook_secret"
```

## Required Environment Variables

Before deploying, ensure these environment variables are set:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://your-project.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key (public) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (private) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | `https://fansdock.xenpac.org:3009` |
| `NEXT_PUBLIC_MANIFEST_PUBLIC_KEY` | Manifest public key for payments | `pk_test_...` |
| `MANIFEST_API_KEY` | Manifest API key for payments | `sk_test_...` |
| `MANIFEST_WEBHOOK_SECRET` | Manifest webhook secret | `whsec_...` |

## Deployment Process

### Automated Deployment

1. **Run the deployment script:**
   ```bash
   ./deploy-dockploy.sh
   ```

   This script will:
   - ✅ Check all required environment variables
   - ✅ Build the Docker image with production optimizations
   - ✅ Deploy to Dockploy automatically
   - ✅ Provide deployment status and URLs
   - ✅ Show health check information

### Manual Deployment

1. **Build the Docker image:**
   ```bash
   docker build -t tfc-geo-bolt-v2:latest .
   ```

2. **Deploy to Dockploy:**
   ```bash
   curl -X POST \
     -H "Authorization: Bearer edwKwxrXDqhfdtpQyALOUyrNemlzljcaCMQumBbgpXnlimnDsotTXdqgcSLXyTlgnje" \
     -H "Content-Type: application/json" \
     -d '{
       "name": "tfc-geo-bolt-v2",
       "image": "tfc-geo-bolt-v2:latest",
       "port": 3009,
       "environment": {
         "NODE_ENV": "production",
         "NEXT_TELEMETRY_DISABLED": "1",
         "NEXT_PUBLIC_SUPABASE_URL": "'$NEXT_PUBLIC_SUPABASE_URL'",
         "NEXT_PUBLIC_SUPABASE_ANON_KEY": "'$NEXT_PUBLIC_SUPABASE_ANON_KEY'",
         "SUPABASE_SERVICE_ROLE_KEY": "'$SUPABASE_SERVICE_ROLE_KEY'",
         "NEXT_PUBLIC_APP_URL": "'$NEXT_PUBLIC_APP_URL'",
         "NEXT_PUBLIC_MANIFEST_PUBLIC_KEY": "'$NEXT_PUBLIC_MANIFEST_PUBLIC_KEY'",
         "MANIFEST_API_KEY": "'$MANIFEST_API_KEY'",
         "MANIFEST_WEBHOOK_SECRET": "'$MANIFEST_WEBHOOK_SECRET'"
       },
       "healthcheck": {
         "path": "/api/health",
         "interval": 30,
         "timeout": 10,
         "retries": 3,
         "start_period": 40
       }
     }' \
     https://fansdock.xenpac.org/api/deploy
   ```

## Deployment Configuration

- **Application Name:** `tfc-geo-bolt-v2`
- **External Port:** `3009`
- **Internal Port:** `3000`
- **Health Check:** `/api/health`
- **Dockploy URL:** `https://fansdock.xenpac.org`

## Post-Deployment

### 1. Verify Deployment
Your application will be available at:
```
https://fansdock.xenpac.org:3009
```

### 2. Health Check
Monitor the health endpoint:
```
https://fansdock.xenpac.org:3009/api/health
```

### 3. Dashboard Access
View deployment status at:
```
https://fansdock.xenpac.org/dashboard
```

## Troubleshooting

### Common Issues

1. **Environment Variables Missing**
   - Run `./setup-dockploy.sh` to configure all variables
   - Ensure all required environment variables are set
   - The deployment script will check this automatically

2. **Docker Build Fails**
   - Check that Docker is running: `docker --version`
   - Ensure all dependencies are properly configured
   - Try cleaning Docker cache: `docker system prune -a`

3. **Application Not Starting**
   - Check the health endpoint: `https://fansdock.xenpac.org:3009/api/health`
   - Review logs in the Dockploy dashboard
   - Verify environment variables are correctly set

4. **Port Already in Use**
   - The external port 3009 should be available
   - If not, modify the port in the deployment configuration

### Logs and Monitoring

- **Application Logs:** Available in the Dockploy dashboard
- **Health Status:** Check `/api/health` endpoint
- **Deployment Status:** Monitor via Dockploy dashboard

## Security Features

Your deployment includes:
- ✅ Security headers via Next.js middleware
- ✅ Rate limiting protection
- ✅ Input sanitization
- ✅ Secure environment variable handling
- ✅ Health check monitoring
- ✅ Production-optimized Docker configuration
- ✅ Standalone Next.js output for minimal attack surface

## Development vs Production

### Local Development
```bash
npm run dev
```

### Production Deployment
```bash
./setup-dockploy.sh    # First time setup
./deploy-dockploy.sh   # Deploy to production
```

## Support

If you encounter issues:
1. Check the Dockploy dashboard for detailed logs
2. Verify all environment variables are correctly set
3. Ensure Docker is running and accessible
4. Check the health endpoint for application status
5. Review the troubleshooting section above

## Next Steps

After successful deployment:
1. Test all application features
2. Verify Supabase connections
3. Test payment processing (if applicable)
4. Monitor application performance
5. Set up any additional monitoring or alerts 