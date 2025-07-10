'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, Search, ArrowLeft } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <GradientBg variant="primary">
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-6">Page Not Found</h2>
          <p className="text-gray-300 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
            <Link href="/discover">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                <Search className="w-4 h-4 mr-2" />
                Discover Shows
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </GradientBg>
  )
}