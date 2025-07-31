'use client'

import { motion } from 'framer-motion'
import { Building, Users, TrendingUp, Heart, CheckCircle, Star, ArrowRight, MapPin, Calendar, DollarSign, Zap, Music } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function VenuePartnerPage() {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Increased Revenue',
      description: 'Generate additional income through music artist donations and enhanced fan engagement',
      color: 'text-green-400'
    },
    {
      icon: Users,
      title: 'Enhanced Fan Experience',
      description: 'Provide fans with new ways to support their favorite music artists during live shows',
      color: 'text-blue-400'
    },
    {
      icon: Heart,
      title: 'Music Artist Relationships',
      description: 'Strengthen relationships with music artists by offering innovative support tools',
      color: 'text-red-400'
    },
    {
      icon: Zap,
      title: 'Technology Integration',
      description: 'Seamless integration with your existing systems and minimal setup required',
      color: 'text-purple-400'
    }
  ]

  const features = [
    'Real-time geolocation detection for automatic fan check-ins',
    'Instant donation processing with transparent fee structure',
    'Live analytics dashboard for venue managers',
    'Artist performance metrics and audience insights',
    'Custom venue geofencing and boundary setup',
    'Integration with existing ticketing and POS systems',
    'Marketing tools to promote shows and artists',
    '24/7 technical support and account management'
  ]

  const partnerVenues = [
    {
      name: 'The Blue Note',
      location: 'New York, NY',
      type: 'Jazz Club',
      capacity: '200',
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Underground Hall',
      location: 'Brooklyn, NY',
      type: 'Rock Venue',
      capacity: '350',
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=300'
    },
    {
      name: 'Electric Garden',
      location: 'Manhattan, NY',
      type: 'Electronic Club',
      capacity: '500',
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=300'
    }
  ]

  const testimonials = [
    {
      quote: "Since partnering with TrueFans CONNECT™, we've seen a 30% increase in artist satisfaction and a significant boost in repeat bookings. The platform has become an essential part of our venue's offering.",
      author: "Michael Stevens",
      role: "Owner, The Blue Note",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      quote: "The geolocation technology is incredibly accurate, and our music artists love the instant support they receive. It's transformed how we approach live music at our venue.",
      author: "Jessica Rivera",
      role: "Manager, Electric Garden",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100"
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
            Partner with TrueFans
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Join the revolution in live music support. Enhance your venue's experience 
            while helping music artists thrive through innovative geolocation-powered donations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/signup/venue">
              <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                <Building className="w-5 h-5 mr-2" />
                Become a Venue Partner
              </Button>
            </Link>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
              Schedule a Demo
            </Button>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Partner with Us?
            </h2>
            <p className="text-xl text-purple-200">
              Transform your venue into a hub for music artist support and fan engagement
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
                  <div className={`w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 ${benefit.color}`}>
                    <benefit.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm text-center">{benefit.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-purple-200">
              A seamless experience for venues, artists, and fans
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <GlassCard variant="elevated" className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">1. Venue Setup</h3>
                <p className="text-gray-300">
                  We create a custom geofence around your venue. Setup takes less than a day with no hardware required.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <GlassCard variant="elevated" className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Music className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">2. Artist Performs</h3>
                <p className="text-gray-300">
                  When music artists perform at your venue, our platform automatically detects fans in attendance through their mobile devices' geolocation.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <GlassCard variant="elevated" className="h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">3. Fans Support</h3>
                <p className="text-gray-300">
                  Fans receive notifications about the show and can instantly send donations to the performing music artist, creating a more engaging live music experience.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Complete Partnership Package
                </h2>
                <p className="text-gray-300 mb-6">
                  Everything you need to enhance your venue's live music experience 
                  and support the music artists who perform on your stage.
                </p>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">0%</div>
                  <div className="text-sm text-gray-300">Setup Fees</div>
                </div>
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">2.9%</div>
                  <div className="text-sm text-gray-300">Transaction Fee</div>
                </div>
                <div className="bg-white/5 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-sm text-gray-300">Support</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What Venue Partners Say
            </h2>
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
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-white">{testimonial.author}</p>
                        <p className="text-sm text-purple-300">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partner Venues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Trusted by Leading Venues
            </h2>
            <p className="text-lg text-gray-300">
              Join venues across the country that are already supporting music artists
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerVenues.map((venue, index) => (
              <motion.div
                key={venue.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="overflow-hidden">
                  <div className="relative h-32 -m-6 mb-4">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">{venue.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{venue.location}</span>
                      </div>
                      <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                        {venue.capacity} cap
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">{venue.type}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
                <div className="text-gray-300">Venue Partners</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">Many</div>
                <div className="text-gray-300">Shows Hosted</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">xxx+</div>
                <div className="text-gray-300">Artist Donations</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">xxx+</div>
                <div className="text-gray-300">Active Fans</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard variant="elevated">
              <h3 className="text-lg font-semibold text-white mb-3">How much does it cost to join?</h3>
              <p className="text-gray-300">
                There are no setup fees or monthly charges. A small 2.9% transaction fee is added to all donations processed at your venue. You earn commission on all donations they generate wherever they play, you also earn commission on artists that they refer - a win win opportunity.
              </p>
            </GlassCard>

            <GlassCard variant="elevated">
              <h3 className="text-lg font-semibold text-white mb-3">What hardware do I need?</h3>
              <p className="text-gray-300">
                None! Our platform is entirely software-based and works with fans' existing smartphones. There's no need for special equipment, beacons, or scanners at your venue.
              </p>
            </GlassCard>

            <GlassCard variant="elevated">
              <h3 className="text-lg font-semibold text-white mb-3">How accurate is the geolocation?</h3>
              <p className="text-gray-300">
                Our advanced Geolocation system creates a precise geofence around your venue. We can detect fans within 50 meters of accuracy, and our system is designed to minimize false positives.
              </p>
            </GlassCard>

            <GlassCard variant="elevated">
              <h3 className="text-lg font-semibold text-white mb-3">Does this have to integrate with my existing systems?</h3>
              <p className="text-gray-300">
                No! Our system does not affect any popular ticketing platforms, POS systems, and venue management software that they are using. Our API is also available for custom integrations.
              </p>
            </GlassCard>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="text-center"
        >
          <GlassCard variant="elevated" className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Venue?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the TrueFans CONNECT™ network and start supporting music artists while enhancing 
              your venue's live music experience. Setup is quick, easy snd FREE.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup/venue">
                <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                  <Building className="w-5 h-5 mr-2" />
                  Become a Venue Partner
                </Button>
              </Link>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                Download Partnership Guide
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                Contact Us with Questions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}