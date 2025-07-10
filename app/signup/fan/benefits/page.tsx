'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Heart, MapPin, Zap, Music, ArrowRight, CheckCircle, Star } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function FanBenefitsPage() {
  const benefits = [
    {
      icon: MapPin,
      title: 'Discover Live Shows',
      description: 'Find amazing live performances happening near you with our advanced geolocation technology.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Heart,
      title: 'Support Artists Directly',
      description: 'Send instant donations to artists during their performances with just a few taps.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Music,
      title: 'Request Songs',
      description: 'Request your favorite songs and add personal dedications during live shows.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Experience',
      description: 'See the immediate impact of your support on the energy and excitement of live performances.',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const features = [
    'Automatic show detection when you arrive at venues',
    'Personalized recommendations based on your music preferences',
    'Follow your favorite artists and get notified about upcoming shows',
    'Connect with other fans who share your music taste',
    'Track your support history and the artists you've helped',
    'Earn rewards through our referral program',
    'Receive exclusive content from artists you support',
    'Participate in fan communities around your favorite music'
  ]

  const testimonials = [
    {
      quote: "I love being able to support artists directly during their performances. It creates such a special connection, and I can see how much it means to them in real-time.",
      name: "Michael Davis",
      role: "Music Enthusiast",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      quote: "The song request feature is amazing! I requested my favorite song with a dedication to my girlfriend during a show, and the artist played it right away. It was a magical moment.",
      name: "Emily Wilson",
      role: "Concert Lover",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ]

  const stats = [
    { label: 'Artists Supported', value: '2,500+' },
    { label: 'Average Donation', value: '$28.50' },
    { label: 'Fan Community', value: '15K+' },
    { label: 'Shows Enhanced', value: '8,200+' }
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
            Elevate Your Live Music Experience
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Join TrueFans CONNECT™ and transform how you experience and support live music. 
            Our platform uses cutting-edge geolocation technology to enhance your concert 
            experience and help you support the artists you love.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup">
              <Button className="bg-green-600 hover:bg-green-700" size="lg">
                <Users className="w-5 h-5 mr-2" />
                Join as a Fan
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
              Why Fans Love TrueFans
            </h2>
            <p className="text-lg text-gray-300">
              Our platform is designed to enhance your live music experience
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
                  How TrueFans Works for Fans
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Our platform uses advanced geolocation technology to detect when you're at a live show, 
                  making it effortless to discover and support artists in real-time. No more searching 
                  for artist payment links or fumbling with cash tips.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Arrive at a Show</h3>
                      <p className="text-gray-300 text-sm">Our app automatically detects when you're at a venue with a live performance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Discover the Artist</h3>
                      <p className="text-gray-300 text-sm">View the artist's profile, music, and support history right from your phone.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Support with Ease</h3>
                      <p className="text-gray-300 text-sm">Send donations instantly with just a few taps, with 80% going directly to the artist.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-300 font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white mb-1">Enhance the Experience</h3>
                      <p className="text-gray-300 text-sm">Request songs, add dedications, and see the real-time impact of your support.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Fans at a concert" 
                  className="rounded-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-sm">Secure & Private</div>
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
              Everything You Need for the Ultimate Fan Experience
            </h2>
            <p className="text-lg text-gray-300">
              Comprehensive tools designed for music lovers like you
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
                Join a Growing Community
              </h2>
              <p className="text-lg text-gray-300">
                Be part of the movement that's transforming live music support
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
                  <div className="text-3xl font-bold text-green-400 mb-2">{stat.value}</div>
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
              Hear From Our Fans
            </h2>
            <p className="text-lg text-gray-300">
              Real stories from music lovers using TrueFans
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
                        <p className="text-sm text-green-300">{testimonial.role}</p>
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
                <h3 className="text-lg font-semibold text-white mb-3">How does the geolocation detection work?</h3>
                <p className="text-gray-300">
                  Our app uses your device's location services to detect when you're at a venue hosting a live show. Your location data is only used for this purpose and is never stored permanently.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">How much of my donation goes to the artist?</h3>
                <p className="text-gray-300">
                  Artists receive 80% of every donation. The remaining 20% covers platform fees, payment processing, and our referral program.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Is my payment information secure?</h3>
                <p className="text-gray-300">
                  Absolutely. We use industry-standard encryption and work with certified payment processors. We never store your complete payment information on our servers.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Can I use this at any venue?</h3>
                <p className="text-gray-300">
                  Yes! While we partner with many venues for enhanced features, you can use TrueFans at any performance location where we can detect a live show.
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
              Ready to Transform Your Concert Experience?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of music lovers who are already using TrueFans to discover 
              and support amazing artists during live performances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button className="bg-green-600 hover:bg-green-700" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Create Fan Account
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