import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/components/providers/query-provider'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { ComingSoonOverlay } from '@/components/ui/coming-soon-overlay'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'TrueFans CONNECT™ - Live Music Discovery & Artist Support',
  description: 'Discover live music near you and support your favorite artists with instant donations. Advanced geolocation-powered music discovery platform.',
  keywords: ['live music', 'artist support', 'music discovery', 'donations', 'concerts', 'venues'],
  authors: [{ name: 'TrueFans' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/apple-touch-icon.png',
  },
  openGraph: {
    title: 'TrueFans CONNECT™',
    description: 'Discover live music near you and support your favorite artists',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrueFans CONNECT™',
    description: 'Discover live music near you and support your favorite artists',
  },
  robots: 'index, follow',
  metadataBase: new URL(typeof process !== 'undefined' ? (process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000') : 'http://localhost:3000'),
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#8B5CF6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className={inter.className}>
        <ErrorBoundary>
          <QueryProvider>
            <Navigation />
            <main className="pt-24">
              {children}
            </main>
            <Footer />
            <Toaster />
            <ComingSoonOverlay />
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}