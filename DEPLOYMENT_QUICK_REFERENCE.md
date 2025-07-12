# 🚀 Quick Deployment Guide

## One-Command Setup & Deploy

```bash
# 1. Setup environment variables (first time only)
./setup-dockploy.sh

# 2. Deploy to production
./deploy-dockploy.sh
```

## Your App URLs

- **Production App:** https://fansdock.xenpac.org:3009
- **Health Check:** https://fansdock.xenpac.org:3009/api/health
- **Dashboard:** https://fansdock.xenpac.org/dashboard

## Environment Variables Needed

You'll need these values from your Supabase and Manifest accounts:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase public key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase private key
- `NEXT_PUBLIC_APP_URL` - Set to: `https://fansdock.xenpac.org:3009`
- `NEXT_PUBLIC_MANIFEST_PUBLIC_KEY` - Manifest public key
- `MANIFEST_API_KEY` - Manifest private key
- `MANIFEST_WEBHOOK_SECRET` - Manifest webhook secret

## Troubleshooting

- **Docker not running:** `docker --version`
- **Build fails:** `docker system prune -a`
- **App not starting:** Check health endpoint
- **Missing env vars:** Run `./setup-dockploy.sh`

## Development

```bash
npm run dev  # Local development
``` 