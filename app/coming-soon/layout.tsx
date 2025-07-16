import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'TrueFans CONNECT™ - Coming Soon',
  description: 'Something amazing is coming soon. TrueFans CONNECT™ - Revolutionizing Live Music Support.',
  robots: 'noindex, nofollow',
}

export default function ComingSoonLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
} 