'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Music, Menu, X, User, Heart, MapPin, Search, Home, LogOut, Building } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Badge } from '@/components/ui/badge'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    // Check for demo mode
    const demoMode = typeof window !== 'undefined' && localStorage.getItem('demo_mode') === 'true'
    setIsDemoMode(demoMode)

    // Get current user
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    }

    getCurrentUser()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setIsDemoMode(false)
      window.location.href = '/'
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/discover', label: 'Discover', icon: Search },
    { href: '/artists', label: 'Artists', icon: Music },
    { href: '/support', label: 'Support', icon: Heart },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 p-4">
      <GlassCard variant="minimal" className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors">
            <Music className="w-8 h-8" />
            <span className="text-xl font-bold">TrueFans CONNECT™</span>
            {isDemoMode && (
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 text-xs">
                Demo
              </Badge>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/demo-login">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Demo Login
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/get-started">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Get Started
                  </Button>
                </Link>
                <Link href="/signup/artist/benefits">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Join as an Artist
                  </Button>
                </Link>
                <Link href="/venues/partner">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Be a Venue Partner
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-white/20"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/20">
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button variant="ghost" className="justify-start text-white hover:bg-white/10 w-full">
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="justify-start text-white hover:bg-white/10 w-full"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/demo-login">
                      <Button variant="ghost" className="justify-start text-white hover:bg-white/10 w-full">
                        Demo Login
                      </Button>
                    </Link>
                    <Link href="/login">
                      <Button variant="ghost" className="justify-start text-white hover:bg-white/10 w-full">
                        <User className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/get-started">
                      <Button className="justify-start bg-purple-600 hover:bg-purple-700 w-full">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/signup/artist/benefits">
                      <Button variant="ghost" className="justify-start text-white hover:bg-white/10 w-full">
                        <Music className="w-4 h-4 mr-2" />
                        Join as an Artist
                      </Button>
                    </Link>
                    <Link href="/venues/partner">
                      <Button variant="ghost" className="justify-start text-white hover:bg-white/10 w-full">
                        <Building className="w-4 h-4 mr-2" />
                        Be a Venue Partner
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </GlassCard>
    </nav>
  )
}