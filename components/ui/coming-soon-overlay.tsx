'use client'

import { motion } from 'framer-motion'
import { Music, Heart, Clock, Mail, Instagram, Twitter, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GlassCard } from '@/components/ui/glass-card'
import { GradientBg } from '@/components/ui/gradient-bg'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'

export function ComingSoonOverlay() {
  const [shouldShow, setShouldShow] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', artist: '', website: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Check if we're on the truefansconnect.com domain
    const hostname = window.location.hostname
    const isTrueFansConnect = hostname === 'truefansconnect.com' || 
                             hostname === 'www.truefansconnect.com' ||
                             hostname.includes('truefansconnect.com')
    setShouldShow(isTrueFansConnect)
  }, [])

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    // For now, just log the data. Later, connect to CRM.
    console.log('Notify Form Submission:', formData)
  }

  const handleEmailSignup = () => {
    // You can implement email signup functionality here
    window.open('mailto:paul@newmusiclives.com?subject=Coming Soon Notification Request', '_blank')
  }

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/truefans', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/truefans', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/truefans', label: 'Facebook' },
  ]

  // Don't render anything if we shouldn't show the overlay
  if (!shouldShow) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <GradientBg variant="primary">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo and Brand */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">
                    TrueFans CONNECT™
                  </h1>
                  <p className="text-purple-300 text-sm md:text-base">
                    Revolutionizing Live Music Support
                  </p>
                </div>
              </div>
              
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg font-semibold">
                <Clock className="w-4 h-4 mr-2" />
                Coming Soon
              </Badge>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Something Amazing is
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Coming Soon
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                We're building the future of live music support. Get ready to discover shows near you 
                and support artists with instant donations using cutting-edge geolocation technology.
              </p>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-12"
            >
              <GlassCard variant="elevated" className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  What's Coming
                </h3>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Music className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Live Show Detection</h4>
                    <p className="text-gray-300 text-sm">
                      Advanced geolocation finds live performances happening near you
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Instant Support</h4>
                    <p className="text-gray-300 text-sm">
                      Send donations directly to artists during their performances
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Real-Time Impact</h4>
                    <p className="text-gray-300 text-sm">
                      Watch your support boost the energy of live performances
                    </p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-8"
            >
              <div className="flex justify-center">
                {submitted ? (
                  <div className="bg-green-600/20 border border-green-400/30 rounded-lg p-6 text-center max-w-md mx-auto">
                    <h4 className="text-2xl font-bold text-green-300 mb-2">Thank you!</h4>
                    <p className="text-white mb-2">We'll notify you when we launch.</p>
                  </div>
                ) : formOpen ? (
                  <form onSubmit={handleFormSubmit} className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-md mx-auto w-full flex flex-col gap-4">
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />
                    <Input
                      name="artist"
                      placeholder="Artist's Name"
                      value={formData.artist}
                      onChange={handleFormChange}
                    />
                    <Input
                      name="website"
                      placeholder="Your Website (optional)"
                      value={formData.website}
                      onChange={handleFormChange}
                    />
                    <Button type="submit" className="bg-gradient-to-r from-purple-500 to-purple-600 text-white mt-2">Submit</Button>
                  </form>
                ) : (
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                    onClick={() => setFormOpen(true)}
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Get Notified
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex justify-center gap-6"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-12 text-gray-400 text-sm"
            >
              <p>© 2025 TrueFans CONNECT™. Made with ❤️ for the music community.</p>
            </motion.div>
          </div>
        </div>
      </GradientBg>
    </div>
  )
} 
