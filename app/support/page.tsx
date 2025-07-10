'use client'

import { motion } from 'framer-motion'
import { Heart, Music, Users, Zap, ArrowRight, Star, CheckCircle } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function SupportPage() {
  const supportFeatures = [
    {
      icon: Heart,
      title: 'Direct Artist Support',
      description: 'Send donations directly to artists during live performances with zero delays.',
      color: 'text-red-400'
    },
    {
      icon: Zap,
      title: 'Instant Payments',
      description: 'Lightning-fast payment processing ensures artists receive support immediately.',
      color: 'text-yellow-400'
    },
    {
      icon: Users,
      title: 'Community Building',
      description: 'Connect with other fans and build a supportive community around live music.',
      color: 'text-blue-400'
    },
    {
      icon: Music,
      title: 'Live Show Discovery',
      description: 'Discover amazing live shows happening near you with our advanced geolocation.',
      color: 'text-purple-400'
    }
  ]

  const impactStats = [
    { label: 'Artists Supported', value: '2,500+', color: 'text-purple-400' },
    { label: 'Total Donations', value: '$125K+', color: 'text-green-400' },
    { label: 'Live Shows', value: '8,200+', color: 'text-blue-400' },
    { label: 'Fan Community', value: '15K+', color: 'text-pink-400' }
  ]

  const supportTiers = [
    {
      name: 'Fan',
      price: 'Free',
      description: 'Perfect for music lovers who want to support artists',
      features: [
        'Discover live shows near you',
        'Send donations to artists',
        'Join the fan community',
        'Real-time show updates'
      ],
      buttonText: 'Get Started',
      popular: false
    },
    {
      name: 'Artist',
      price: 'Free',
      description: 'Everything you need to connect with fans and receive support',
      features: [
        'Create artist profile',
        'List your shows',
        'Receive instant donations',
        'Real-time analytics',
        'Fan engagement tools',
        'Payment processing'
      ],
      buttonText: 'Join as an Artist',
      popular: true
    },
    {
      name: 'Venue',
      price: 'Free',
      description: 'Partner with us to enhance your venue experience',
      features: [
        'Venue profile management',
        'Show hosting tools',
        'Advanced analytics',
        'Custom integrations',
        'Priority support'
      ],
      buttonText: 'Become a Venue Partner',
      popular: false
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
            Support Live Music
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Join music lovers in supporting artists directly during live performances. 
            Every donation makes a difference in keeping live music alive and thriving.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
              <Heart className="w-5 h-5 mr-2" />
              Start Supporting
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {impactStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-gray-300 text-sm md:text-base">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How We Support Artists
            </h2>
            <p className="text-xl text-purple-200">
              Innovative features designed to connect fans with artists
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="h-full">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-white/10 ${feature.color}`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Support Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Community
            </h2>
            <p className="text-xl text-purple-200">
              Choose how you want to be part of the live music revolution
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {supportTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="relative"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <GlassCard 
                  variant="elevated" 
                  className={`h-full ${tier.popular ? 'ring-2 ring-purple-400/50' : ''}`}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-purple-400 mb-2">{tier.price}</div>
                    <p className="text-gray-300 text-sm">{tier.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className={`w-full ${
                      tier.popular 
                        ? 'bg-purple-600 hover:bg-purple-700'
                        : 'bg-white/10 hover:bg-white/20 border border-white/20'
                    }`}
                    onClick={() => {
                      if (tier.name === 'Artist') {
                        window.location.href = '/signup/artist/benefits';
                      } else if (tier.name === 'Venue') {
                        window.location.href = '/venues/partner';
                      } else {
                        window.location.href = '/signup';
                      }
                    }}
                  >
                    {tier.buttonText}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <GlassCard variant="elevated" className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-left">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to Support Live Music?
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Join our community of music lovers and start making a difference in artists' lives today. 
                  Every donation, no matter the size, helps keep live music thriving.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                    <Heart className="w-5 h-5 mr-2" />
                    Find Shows Near Me
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                    Browse Artists
                  </Button>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Music className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}