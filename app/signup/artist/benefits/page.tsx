'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Music, Heart, DollarSign, Zap, Users, Globe, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function ArtistBenefitsPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Direct Fan Support',
      description: 'Receive instant donations during your live performances with 80% of every donation going directly to you.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Engagement',
      description: 'Connect with fans in real-time during shows with live donation feeds, song requests, and audience insights.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Globe,
      title: 'Geolocation Technology',
      description: 'Our advanced geolocation automatically detects when fans are at your shows, making support seamless.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Fan Community',
      description: 'Build a dedicated community of supporters who can follow your journey and attend your shows.',
      color: 'from-pink-500 to-rose-500'
    }
  ]

  const features = [
    'Comprehensive artist profile with bio, photos, and social links',
    'Setlist management for song requests during shows',
    'Instant payouts with minimal processing fees',
    'Show analytics and audience insights',
    'Venue partnership opportunities',
    'Referral program to earn additional income',
    'Cross-promotion with other artists',
    'Verified artist status for increased visibility'
  ]

  const testimonials = [
    {
      quote: "Since joining TrueFans, I've seen a 40% increase in my income from live shows. The platform makes it so easy for fans to support my music.",
      name: "Luna Rodriguez",
      role: "Indie Folk Artist",
      image: "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      quote: "The real-time engagement during shows has transformed how I connect with my audience. I can see their reactions and support as it happens.",
      name: "DJ Cosmic",
      role: "Electronic Producer",
      image: "https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ]

  const stats = [
    { label: 'Average Increase in Show Revenue', value: '35%' },
    { label: 'Artists on Platform', value: '2,500+' },
    { label: 'Average Donation', value: '$28.50' },
    { label: 'Payout Rate', value: '80%' }
  ]

  return (
    <GradientBg variant="primary">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Amplify Your Music Career
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Join TrueFans CONNECT™ and transform how fans support your music. 
            Our platform uses cutting-edge geolocation technology to connect you with fans 
            during live performances and enable instant support.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup/artist">
              <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                <Music className="w-5 h-5 mr-2" />
                Join as an Artist
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Artists Love TrueFans
            </h2>
            <p className="text-lg text-gray-300">
              Our platform is designed specifically for musicians like you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="h-full">
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${benefit.color} flex items-center justify-center`}>
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                    <p className="text-gray-300">{benefit.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <GlassCard variant="elevated">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  How TrueFans Works for Artists
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Our platform uses advanced geolocation technology to detect when fans are at your shows, 
                  making it effortless for them to support you in real-time. No more passing around a tip jar 
                  or hoping fans remember to support you after the show.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Create Your Artist Profile</h3>
                      <p className="text-gray-300 text-sm">Sign up and complete your artist profile with bio, photos, and music links.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Add Your Shows</h3>
                      <p className="text-gray-300 text-sm">List your upcoming performances at partner venues or any location.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Perform and Receive Support</h3>
                      <p className="text-gray-300 text-sm">As you perform, fans at your show can send instant donations and song requests.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-300 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Get Paid Quickly</h3>
                      <p className="text-gray-300 text-sm">Receive your earnings with fast, secure payouts to your bank account.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Artist performing" 
                  className="rounded-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-purple-600 text-white p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">80%</div>
                  <div className="text-sm">Artist Payout</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-gray-300">
              Comprehensive tools designed for working musicians
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-20"
        >
          <GlassCard variant="elevated">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Artist Success by the Numbers
              </h2>
              <p className="text-lg text-gray-300">
                See the real impact TrueFans has on artists' careers
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-purple-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Hear From Our Artists
            </h2>
            <p className="text-lg text-gray-300">
              Real stories from musicians using TrueFans
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="h-full">
                  <div className="flex flex-col h-full">
                    <div className="mb-6 flex-1">
                      <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{testimonial.name}</p>
                        <p className="text-sm text-purple-300">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-20"
        >
          <GlassCard variant="elevated">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How much does it cost to join?</h3>
                <p className="text-gray-300">
                  It's completely free to join TrueFans as an artist. We only take a small percentage of donations you receive through the platform.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How do I get paid?</h3>
                <p className="text-gray-300">
                  You'll receive 80% of all donations. Payments are processed securely and can be transferred to your bank account immediately or on a schedule you choose.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Do I need to be verified?</h3>
                <p className="text-gray-300">
                  While verification isn't required to join, verified artists receive a badge that increases trust and visibility on the platform.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Can I use this at any venue?</h3>
                <p className="text-gray-300">
                  Yes! While we partner with many venues for enhanced features, you can use TrueFans at any performance location.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <GlassCard variant="elevated" className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Live Shows?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of artists who are already using TrueFans to connect with fans 
              and receive direct support during their performances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup/artist">
                <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                  <Music className="w-5 h-5 mr-2" />
                  Create Artist Account
                </Button>
              </Link>
              <Link href="/demo-login">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                  <Star className="w-5 h-5 mr-2" />
                  Try Demo Account
                </Button>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}