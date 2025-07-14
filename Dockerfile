# Use the official Node.js runtime as the base image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --omit=dev

USER nextjs

EXPOSE 3009
ENV PORT=3009
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"] 