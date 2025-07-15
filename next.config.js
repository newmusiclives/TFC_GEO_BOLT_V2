/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Ensure standalone output is properly configured
  experimental: {
    // Removed deprecated serverComponentsExternalPackages
    outputFileTracingRoot: process.cwd(),
  },
  // Configure server to bind to all interfaces
  serverRuntimeConfig: {
    hostname: '0.0.0.0',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
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
    // Handle Supabase realtime critical dependency warning
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Ignore specific webpack warnings for Supabase realtime
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
      /Module not found: Can't resolve 'encoding'/,
      /Failed to parse source map/,
    ]

    // Handle Supabase realtime module specifically
    config.module = {
      ...config.module,
      exprContextCritical: false,
    }

    // Custom plugin to suppress Supabase realtime warnings
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.afterCompile.tap('SupabaseRealtimeWarningSuppressor', (compilation) => {
          compilation.warnings = compilation.warnings.filter(warning => {
            return !warning.message.includes('Critical dependency: the request of a dependency is an expression') &&
                   !warning.message.includes('@supabase/realtime-js')
          })
        })
      }
    })

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