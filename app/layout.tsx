import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/sonner'
import { QueryProvider } from '@/components/providers/query-provider'
import { ErrorBoundary } from '@/components/ui/error-boundary'
import { DemoModeDisabler } from '@/components/providers/demo-mode-disabler'
import dynamic from 'next/dynamic'
import React from 'react'

const ComingSoonPage = dynamic(() => import('@/components/coming-soon'), { ssr: false })

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

function ForcedComingSoon() {
  // Only render ComingSoonPage if running in browser and domain matches
  if (typeof window !== 'undefined' && window.location.hostname === 'truefansconnect.com') {
    return (
      <html lang="en" className={`dark ${inter.variable}`}>
        <body className={inter.className}>
          <ComingSoonPage />
        </body>
      </html>
    );
  }
  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // If in browser and domain matches, show only ComingSoonPage (no header/footer)
  if (typeof window !== 'undefined' && window.location.hostname === 'truefansconnect.com') {
    return <ForcedComingSoon />;
  }
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className={inter.className}>
        <DemoModeDisabler>
          <ErrorBoundary>
            <QueryProvider>
              <Navigation />
              <main className="pt-24">
                {children}
              </main>
              <Footer />
              <Toaster />
            </QueryProvider>
          </ErrorBoundary>
        </DemoModeDisabler>
      </body>
    </html>
  )
}