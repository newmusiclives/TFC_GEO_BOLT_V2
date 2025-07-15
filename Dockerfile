# Use the official Node.js runtime as the base image
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Set npm configuration to avoid napi-postinstall issues
ENV npm_config_napi_postinstall=skip

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Ensure all environment variables are available during build
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL

RUN npm run build

# Verify the standalone build was created
RUN ls -la .next/standalone/ || (echo "Standalone build failed" && exit 1)

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Create necessary directories
RUN mkdir -p .next/static
RUN chown -R nextjs:nodejs .next

# Copy standalone build with verification
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/server ./.next/server
# Copy all required manifest files if they exist
COPY --from=builder --chown=nextjs:nodejs /app/.next/BUILD_ID ./.next/BUILD_ID
COPY --from=builder --chown=nextjs:nodejs /app/.next/prerender-manifest.json ./.next/prerender-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/prerender-manifest.js ./.next/prerender-manifest.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/routes-manifest.json ./.next/routes-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/build-manifest.json ./.next/build-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/app-build-manifest.json ./.next/app-build-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/required-server-files.json ./.next/required-server-files.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/images-manifest.json ./.next/images-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/server/app-path-routes-manifest.json ./.next/server/app-path-routes-manifest.json
COPY --from=builder --chown=nextjs:nodejs /app/.next/server/middleware-manifest.json ./.next/server/middleware-manifest.json

# Verify the server.js file exists
RUN ls -la server.js || (echo "server.js not found in standalone build" && exit 1)

USER nextjs

EXPOSE 3009
ENV PORT=3009
ENV HOSTNAME=0.0.0.0

# Use absolute path to server.js
CMD ["node", "/app/server.js"] 