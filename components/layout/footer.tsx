'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Music, Heart, MapPin, Mail, Phone, Twitter, Instagram, Facebook, Github } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Discover Shows', href: '/discover' },
        { label: 'Browse Artists', href: '/artists' },
        { label: 'Support Music', href: '/support' },
        { label: 'How It Works', href: '/how-it-works' }
      ]
    },
    {
      title: 'For Artists',
      links: [
        { label: 'I\'m an Artist', href: '/signup/artist/benefits' },
        { label: 'Artist Dashboard', href: '/dashboard/artist' },
        { label: 'Artist Resources', href: '/help' }
      ]
    },
    {
      title: 'For Venues',
      links: [
        { label: 'Become a Venue Partner', href: '/venues/partner' },
        { label: 'Venue Dashboard', href: '/dashboard/venue' },
        { label: 'Integration Guide', href: '/help' }
      ]
    },
    {
      title: 'For Fans',
      links: [
        { label: 'Find Shows', href: '/discover' },
        { label: 'Fan Dashboard', href: '/dashboard/fan' },
        { label: 'Support Artists', href: '/support' },
        { label: 'Community', href: '/help' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press Kit', href: '/press' },
        { label: 'Blog', href: '/blog' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'Documentation', href: '/help' },
        { label: 'Admin Portal', href: '/admin/dashboard' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/truefans', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/truefans', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/truefans', label: 'Facebook' },
    { icon: Github, href: 'https://github.com/truefans', label: 'GitHub' }
  ]

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy' },
    { label: 'GDPR', href: '/privacy' }
  ]

  return (
    <footer className="relative bg-gradient-to-t from-black via-slate-900 to-transparent">
      <div className="container mx-auto px-4 py-16">
        {/* Stay Connected - Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GlassCard variant="minimal" className="p-6 lg:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">
                  Stay Connected
                </h3>
                <p className="text-gray-300 text-sm lg:text-base">
                  Get updates on new features, artist spotlights, and live music events in your area.
                </p>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 md:w-64 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Navigation Sections - All on Same Line */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-4 text-sm lg:text-base">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={`${section.title}-${link.label}`}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-xs lg:text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* TrueFans CONNECT™ Brand & Contact Info + Follow Us - Combined Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-3 text-white hover:text-purple-300 transition-colors mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">TrueFans CONNECT™</span>
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
              {/* Tagline */}
              <p className="text-gray-300 text-sm lg:text-base max-w-md mb-4 lg:mb-0">
                Supporting artists in real-time with geolocation-powered donations. 
                Discover live music near you and make a difference in artists' lives.
              </p>

              {/* Contact Information - Aligned with first line of tagline */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 lg:mt-0">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-sm">support@truefans.ai</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Phone className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-sm">1-800-TRUEFANS</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-sm">San Francisco, CA</span>
                </div>
              </div>
            </div>

            {/* Follow Us - Social Links - Right under contact info with no gap */}
            <div className="flex justify-end mt-2">
              <div className="flex items-center gap-4">
                <span className="text-gray-300 text-sm">Follow us:</span>
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Heart className="w-4 h-4 text-red-400" />
              <span>© {currentYear} TrueFans CONNECT™. Made with love for the music community.</span>
            </div>
            
            <div className="flex items-center gap-4 lg:gap-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Subsidiary Information */}
          <div className="pt-4 text-center">
            <p className="text-xs text-gray-500">
              © TrueFans CONNECT™ is a subsidiary of New Music Lives, which is owned and operated by Lightwork Digital. © 2025 New Music Lives. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl" />
      </div>
    </footer>
  )
}