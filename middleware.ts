import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = process.env.NODE_ENV === 'production' ? 100 : 1000 // More lenient in development

// Security headers (less restrictive in development)
const securityHeaders = process.env.NODE_ENV === 'production' ? {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://*.supabase.co https://api.manifest.financial https://api.truefans.connect; frame-src https://js.stripe.com https://checkout.stripe.com; object-src 'none'; base-uri 'self'; form-action 'self';"
} : {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin'
}

// Rate limiting function
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false
  }
  
  record.count++
  return true
}

// Clean up old rate limit records
function cleanupRateLimitStore() {
  const now = Date.now()
  const entries = Array.from(rateLimitStore.entries())
  for (const [ip, record] of entries) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip)
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000)

export function middleware(request: NextRequest) {
  // Domain-based routing for truefansconnect.com
  const hostname = request.headers.get('host') || ''
  if (hostname === 'truefansconnect.com' || hostname.includes('truefansconnect.com')) {
    // For truefansconnect.com, serve a custom HTML response with coming-soon content
    const html = `
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>TrueFans CONNECT™ - Coming Soon</title>
    <meta name="description" content="Something amazing is coming soon. TrueFans CONNECT™ - Revolutionizing Live Music Support." />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                }
            }
        }
    </script>
    <style>
        .bg-gradient-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .modal-overlay {
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        .text-shadow {
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body class="font-sans bg-gradient-primary min-h-screen flex items-center justify-center p-4">
    <div class="glass-card rounded-3xl p-8 max-w-3xl w-full mx-auto text-center shadow-2xl">
        <!-- Brand and Tagline -->
        <div class="flex items-center justify-center gap-3 mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
            </div>
            <div class="text-left">
                <h1 class="text-3xl md:text-4xl font-bold text-white text-shadow">
                    TrueFans CONNECT™
                </h1>
                <p class="text-white text-sm md:text-base font-medium">
                    Revolutionizing Live Music Support
                </p>
            </div>
        </div>

        <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg font-semibold mb-6 inline-flex items-center justify-center rounded-full shadow-lg">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Coming Soon
        </div>

        <!-- Main Content -->
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow">
            Something Amazing is
            <span class="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Coming Soon
            </span>
        </h2>
        <p class="text-white text-xl mb-8 max-w-2xl mx-auto font-medium text-shadow">
            We're building the future of live music support. Get ready to discover shows near you and support artists with instant donations using cutting-edge geolocation technology.
        </p>

        <!-- Features Preview -->
        <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold text-white mb-2 text-shadow">Live Show Detection</h4>
                <p class="text-white text-sm font-medium">
                    Advanced geolocation finds live performances happening near you
                </p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold text-white mb-2 text-shadow">Instant Support</h4>
                <p class="text-white text-sm font-medium">
                    Send donations directly to artists during their performances
                </p>
            </div>
            <div class="text-center">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold text-white mb-2 text-shadow">Real-Time Impact</h4>
                <p class="text-white text-sm font-medium">
                    Watch your support boost the energy of live performances
                </p>
            </div>
        </div>

        <!-- CTA Button -->
        <button id="signupBtn" class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg mb-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg">
            <svg class="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            Sign up for Early Access
        </button>

        <!-- Social Links -->
        <div class="flex justify-center gap-6 mt-6 mb-2">
            <a href="https://instagram.com/truefans" target="_blank" rel="noopener noreferrer" class="text-white hover:text-yellow-300 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </a>
            <a href="https://twitter.com/truefans" target="_blank" rel="noopener noreferrer" class="text-white hover:text-yellow-300 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            </a>
            <a href="https://facebook.com/truefans" target="_blank" rel="noopener noreferrer" class="text-white hover:text-yellow-300 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            </a>
        </div>

        <!-- Footer -->
        <div class="mt-6 text-white text-xs font-medium">
            <p>© 2025 TrueFans CONNECT™. Made with ❤️ for the music community.</p>
        </div>
    </div>

    <!-- Modal -->
    <div id="modal" class="fixed inset-0 z-50 hidden modal-overlay">
        <div class="flex items-center justify-center min-h-screen p-4">
            <div class="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
                <button id="closeModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold">
                    &times;
                </button>
                <h2 class="text-2xl font-bold mb-4 text-gray-900">Sign up for Early Access</h2>
                <div class="w-full h-[500px] relative">
                    <div id="loading" class="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 z-10">
                        <div class="text-center">
                            <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p class="text-gray-500">Loading signup form...</p>
                        </div>
                    </div>
                    <iframe
                        id="signupForm"
                        src="https://track.newmusiclives.com/widget/form/kV4YXpdHZWU0ybxHRLl3"
                        class="w-full h-full border-0 rounded-2xl opacity-0 transition-opacity duration-500"
                        title="TrueFans CONNECT - Coming Soon"
                        allowFullScreen
                        onload="document.getElementById('loading').style.display='none'; document.getElementById('signupForm').classList.remove('opacity-0');"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Modal functionality
        const modal = document.getElementById('modal');
        const signupBtn = document.getElementById('signupBtn');
        const closeModal = document.getElementById('closeModal');

        signupBtn.addEventListener('click', function() {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    </script>
</body>
</html>`
    
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  }
  
  const response = NextResponse.next()
  
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
  
  // Apply rate limiting
  if (!checkRateLimit(ip)) {
    return new NextResponse(JSON.stringify({ error: 'Rate limit exceeded' }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60'
      }
    })
  }
  
  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  
  // CORS headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
  
  // Block suspicious requests (only in production)
  if (process.env.NODE_ENV === 'production') {
    const userAgent = request.headers.get('user-agent') || ''
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i
    ]
    
    // Allow legitimate bots but block suspicious ones
    const isSuspicious = suspiciousPatterns.some(pattern => 
      pattern.test(userAgent) && !userAgent.includes('googlebot') && !userAgent.includes('bingbot')
    )
    
    if (isSuspicious) {
      return new NextResponse(JSON.stringify({ error: 'Access denied' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      })
    }
  }
  
  // Block requests with suspicious headers (only in production)
  // Note: Removed blocking of x-forwarded-* headers as they're commonly used by reverse proxies
  if (process.env.NODE_ENV === 'production') {
    const suspiciousHeaders: string[] = [
      // Removed x-forwarded-host, x-forwarded-proto, x-real-ip as they're legitimate in production
    ]
    
    for (const header of suspiciousHeaders) {
      if (request.headers.get(header)) {
        return new NextResponse(JSON.stringify({ error: 'Invalid request' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    }
  }
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 