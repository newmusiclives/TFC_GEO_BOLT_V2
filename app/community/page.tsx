'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, Music, Heart, Zap, MessageCircle, Share2, Clock, ExternalLink } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function CommunityPage() {
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
            TrueFans ComUnity
          </h1>
          <div className="flex items-center justify-center gap-2 mb-8">
            <Badge className="bg-purple-600 text-white px-4 py-2 text-lg">
              Coming Soon
            </Badge>
            <Badge className="bg-blue-600 text-white px-4 py-2 text-lg">
              In Partnership with Vinly.co
            </Badge>
          </div>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Join our vibrant community of music lovers, artists, and venues. Connect, collaborate, 
            and celebrate live music together in an exclusive social space designed for true fans.
          </p>
        </motion.div>

        {/* Partnership Announcement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  Exciting Partnership Announcement
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We're thrilled to announce our strategic partnership with <span className="text-blue-400 font-semibold">Vinly.co</span>, 
                  the innovative platform revolutionizing how communities connect around shared passions.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Together, we're building TrueFans ComUnity - a dedicated space where music enthusiasts, 
                  artists, and venues can connect beyond the live show experience, creating lasting bonds 
                  and fostering a thriving ecosystem for independent music.
                </p>
                <div className="flex gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Join the Waitlist
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Vinly.co
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-56 h-56 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <Users className="w-16 h-16 text-white mx-auto mb-4" />
                        <div className="text-white text-xl font-bold">TrueFans</div>
                        <div className="text-white text-xl font-bold">+</div>
                        <div className="text-white text-xl font-bold">Vinly.co</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl font-bold animate-pulse">
                    🎵
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Coming Soon Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-gray-300">
              TrueFans ComUnity will transform how you connect with the music community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard variant="elevated" className="h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Artist-Fan Connections</h3>
                  <p className="text-gray-300 text-sm">
                    Direct messaging, exclusive content, and behind-the-scenes access to your favorite artists
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard variant="elevated" className="h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Event Planning</h3>
                  <p className="text-gray-300 text-sm">
                    Organize meetups, group attendance at shows, and coordinate fan activities
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GlassCard variant="elevated" className="h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Community Forums</h3>
                  <p className="text-gray-300 text-sm">
                    Discuss music, share recommendations, and connect with like-minded fans
                  </p>
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <GlassCard variant="elevated" className="h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">Collaborative Support</h3>
                  <p className="text-gray-300 text-sm">
                    Pool resources with other fans to support artists through group donations and projects
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Launch Timeline</h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500/30"></div>
              
              <div className="space-y-16 relative">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Beta Registration</h3>
                    <p className="text-gray-300 mb-2">
                      Sign up for early access and help shape the future of TrueFans ComUnity
                    </p>
                    <Badge className="bg-green-500/20 text-green-300">
                      <Clock className="w-3 h-3 mr-1" />
                      Now Open
                    </Badge>
                  </div>
                  <div className="relative order-1 md:order-2">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center z-10 relative">
                      <span className="text-white font-bold">1</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative order-1">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center z-10 relative">
                      <span className="text-white font-bold">2</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 order-2">
                    <h3 className="text-xl font-semibold text-white mb-2">Private Alpha</h3>
                    <p className="text-gray-300 mb-2">
                      Invitation-only testing with select artists and super fans
                    </p>
                    <Badge className="bg-yellow-500/20 text-yellow-300">
                      <Clock className="w-3 h-3 mr-1" />
                      Q3 2025
                    </Badge>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="md:w-1/2 md:text-right order-2 md:order-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Public Beta</h3>
                    <p className="text-gray-300 mb-2">
                      Open to all TrueFans users with expanded features and integrations
                    </p>
                    <Badge className="bg-blue-500/20 text-blue-300">
                      <Clock className="w-3 h-3 mr-1" />
                      Q4 2025
                    </Badge>
                  </div>
                  <div className="relative order-1 md:order-2">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center z-10 relative">
                      <span className="text-white font-bold">3</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative order-1">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center z-10 relative">
                      <span className="text-white font-bold">4</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 order-2">
                    <h3 className="text-xl font-semibold text-white mb-2">Full Launch</h3>
                    <p className="text-gray-300 mb-2">
                      Complete integration with TrueFans CONNECT™ and Vinly.co ecosystems
                    </p>
                    <Badge className="bg-purple-500/20 text-purple-300">
                      <Clock className="w-3 h-3 mr-1" />
                      Q1 2026
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Waitlist Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <GlassCard variant="elevated">
            <h2 className="text-3xl font-bold text-white mb-6">
              Be the First to Join
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Sign up for the waitlist today and get early access to TrueFans ComUnity. 
              Early members will receive exclusive perks and founding member status.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
              />
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Zap className="w-5 h-5 mr-2" />
                Join Waitlist
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              By signing up, you agree to receive updates about TrueFans ComUnity. We respect your privacy.
            </p>
          </GlassCard>
        </motion.div>

        {/* About Vinly.co */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-16"
        >
          <GlassCard variant="minimal">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">About Our Partner</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Vinly.co is a pioneering community platform that brings people together around shared interests and passions.
                Their technology powers meaningful connections and collaborative experiences for communities worldwide.
              </p>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <ExternalLink className="w-4 h-4 mr-2" />
                Learn More About Vinly.co
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}