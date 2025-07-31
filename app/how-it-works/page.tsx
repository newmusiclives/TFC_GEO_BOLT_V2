'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Music, Heart, Zap, ArrowRight, Star, CheckCircle, ExternalLink } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Discover Live Shows',
      description: 'Our advanced geolocation technology automatically detects when you\'re near a live music venue.',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      details: [
        'GPS-powered venue detection within a selected radius',
        'Real-time show notifications',
        'Automatic check-in when you arrive',
        'We work with venues all across the country and soon worldwide'
      ],
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      number: 2,
      title: 'Connect with Artists',
      description: 'See which artists are performing live right now and explore their profiles, music, and upcoming shows.',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
      details: [
        'Real-time artist information and bios',
        'Listen to music samples and previews',
        'View upcoming tour dates and venues',
        'Follow your favorite artists for updates'
      ],
      image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      number: 3,
      title: 'Support with Donations',
      description: 'Send instant donations directly to performing artists with just a few taps.',
      icon: Heart,
      color: 'from-red-500 to-pink-500',
      details: [
        'Instant payment processing',
        'Choose from preset amounts or enter a custom amount',
        'Add personal messages to artists',
        'Option to donate anonymously'
      ],
      image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      number: 4,
      title: 'Real-Time Impact',
      description: 'Watch your support boost the energy of live performances and see the immediate impact on artists.',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      details: [
        'Live donation feeds during shows',
        'Real-time energy and excitement meters',
        'See total support raised for each artist',
        'Join a community of music supporters'
      ],
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ]

  const features = [
    {
      icon: MapPin,
      title: 'Smart Location Detection',
      description: 'Advanced GPS technology that knows when you are at a show'
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Lightning-fast donations that reach artists immediately'
    },
    {
      icon: Heart,
      title: 'Direct Support',
      description: '80% of your donation goes directly to the artist'
    },
    {
      icon: Music,
      title: 'Real-Time Updates',
      description: 'Live stats and activity feeds during performances'
    }
  ]

  const faqs = [
    {
      question: 'How does the geolocation detection work?',
      answer: 'We use advanced GPS technology combined with venue mapping to detect when you\'re within 1km of a venue hosting a live show. Your location data is only used for show detection and is never stored permanently.'
    },
    {
      question: 'How much of my donation goes to the artist?',
      answer: 'Music Artists receive 80% of every donation. We take a small platform fee to maintain and improve the service. Payment processing fees (2.9% + $0.30) are clearly disclosed before you donate.'
    },
    {
      question: 'Can I donate if I\'m not at the show?',
      answer: 'Yes! While our geolocation feature works best when you\'re at the venue, you can also browse music artists and shows to support them remotely through their profile pages.'
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely. We use industry-standard encryption and work with certified payment processors. We never store your complete payment information on our servers.'
    },
    {
      question: 'How do music artists receive their money?',
      answer: 'Artists receive donations instantly through our payment partner Manifest Financial. They set up instant payout directly to their bank account or choose to accumulate donations before withdrawal.'
    }
  ]

  return (
    <GradientBg variant="primary">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How It Works
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Supporting live music has never been easier. Our platform uses cutting-edge 
            geolocation technology to connect fans with music artists in real-time.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/discover">
              <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                <MapPin className="w-5 h-5 mr-2" />
                Try It Now
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Main Steps */}
        <div className="space-y-24 mb-24">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl`}>
                      {step.number}
                    </div>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {step.title}
                  </h2>
                  
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>

                  {step.number === 1 && (
                    <Link href="/discover">
                      <Button className={`bg-gradient-to-r ${step.color} hover:opacity-90`}>
                        Find Shows Near Me
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}

                  {step.number === 2 && (
                    <Link href="/artists">
                      <Button className={`bg-gradient-to-r ${step.color} hover:opacity-90`}>
                        Browse Artists
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}

                  {step.number === 3 && (
                    <Link href="/support">
                      <Button className={`bg-gradient-to-r ${step.color} hover:opacity-90`}>
                        Learn About Support
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}

                  {step.number === 4 && (
                    <Link href="/signup">
                      <Button className={`bg-gradient-to-r ${step.color} hover:opacity-90`}>
                        Join the Community
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  )}
                </div>

                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <GlassCard variant="elevated">
                    <img
                      src={step.image}
                      className="w-full h-64 md:h-80 object-cover rounded-lg"
                      alt={step.title}
                    />
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose TrueFans GeoConnect?
            </h2>
            <p className="text-lg text-gray-300">
              Built with artists and fans in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard variant="elevated" className="text-center h-full">
                  <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-300">
              Everything you need to know about supporting artists
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard variant="elevated">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlassCard variant="elevated" className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Support Live Music?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join music lovers who are already making a difference 
              in music artists' lives. Start discovering and supporting live music today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/discover">
                <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Shows Near Me
                </Button>
              </Link>
              <Link href="/artists">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                  Browse Artists
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                  Create Account
                </Button>
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}