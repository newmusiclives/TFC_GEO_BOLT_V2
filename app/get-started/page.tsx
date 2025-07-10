'use client'

import { motion } from 'framer-motion'
import { Music, Building, Users, ArrowRight } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function GetStartedPage() {
  const userTypes = [
    {
      title: 'Artist',
      description: 'Create your artist profile and start receiving support from fans during your live performances.',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
      link: '/signup/artist/benefits',
      benefits: [
        'Receive instant donations during shows',
        'Build a dedicated fan community',
        'Get real-time performance analytics',
        'Earn through our referral program'
      ]
    },
    {
      title: 'Venue',
      description: 'Partner with us to enhance your venue experience and help artists thrive through innovative support tools.',
      icon: Building,
      color: 'from-blue-500 to-cyan-500',
      link: '/venues/partner',
      benefits: [
        'Increase revenue through artist donations',
        'Enhance fan experience at your venue',
        'Access detailed performance analytics',
        'Strengthen relationships with artists'
      ]
    },
    {
      title: 'Fan',
      description: 'Discover live shows near you and directly support the artists you love with instant donations.',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      link: '/signup/fan/benefits',
      benefits: [
        'Find live shows happening near you',
        'Support artists you love in real-time',
        'Request songs during performances',
        'Join a community of music lovers'
      ]
    }
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
            Get Started with TrueFans
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Choose how you want to be part of the live music revolution. 
            Whether you're an artist, venue, or fan, we have the perfect solution for you.
          </p>
        </motion.div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {userTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <GlassCard variant="elevated" className="h-full flex flex-col">
                <div className="p-6 flex-1">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${type.color} flex items-center justify-center mb-6`}>
                    <type.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">
                    I'm a {type.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-6">
                    {type.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {type.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <p className="text-sm text-gray-300">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 pt-0 mt-auto">
                  <Link href={type.link}>
                    <Button className={`w-full bg-gradient-to-r ${type.color} hover:opacity-90`}>
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <GlassCard variant="minimal">
            <h3 className="text-xl font-semibold text-white mb-4">
              Not sure which option is right for you?
            </h3>
            <p className="text-gray-300 mb-6">
              Contact our team for personalized guidance on how to get the most out of TrueFans.
            </p>
            <Link href="/contact">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </Link>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}