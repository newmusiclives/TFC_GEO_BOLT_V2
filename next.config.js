/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Ensure the server binds to all interfaces
  experimental: {
    // Removed deprecated serverComponentsExternalPackages
  },
  // Configure server to bind to all interfaces
  serverRuntimeConfig: {
    hostname: '0.0.0.0',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: [
      'images.pexels.com',
      'your-project.supabase.co',
      'supabase.co',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Ensure environment variables are properly exposed to the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size in production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      }
    }

    // Add cache busting for development
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }

    return config
  },

  // Security headers are now handled by middleware.ts
  // This ensures consistent headers across all routes,

  // Redirects for better UX
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: false,
      },
      {
        source: '/resources',
        destination: '/help',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig