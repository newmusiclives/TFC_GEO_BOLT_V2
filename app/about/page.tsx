'use client'

import { motion } from 'framer-motion'
import { Music, Users, Heart, Zap, Award, Globe } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AboutPage() {
  const stats = [
    { label: 'Artists Supported', value: '2,500+', icon: Music },
    { label: 'Total Donations', value: '$125K+', icon: Heart },
    { label: 'Live Shows', value: '8,200+', icon: Zap },
    { label: 'Fan Community', value: '15K+', icon: Users }
  ]

  const team = [
    {
      name: 'Paul Saunders',
      role: 'CEO & Co-Founder',
      bio: 'Music Industry maverick who is passionate about supporting independent artists.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Matthew Wood',
      role: 'CMO & Co-Founder',
      bio: 'His focused is to expand the reach of the platform to music artists on a global scale.',
      avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Lou Bledsoe',
      role: 'CCO & Co-Founder',
      bio: 'Designer, Photographer and Web Developer focused on enabling music aertist to succeed.',
      avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150'
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
            About TrueFans CONNECT™
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            We're on a mission to revolutionize how fans support artists by connecting them 
            in real-time during live performances through advanced geolocation technology.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <GlassCard variant="elevated" className="text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Live music is the heartbeat of culture, but artists often struggle to receive 
                immediate support from their audience. We bridge this gap by using cutting-edge 
                geolocation technology to detect when fans are at live shows and enable instant, 
                seamless donations that directly support the artists they love.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Support Artists</h3>
                  <p className="text-gray-300">Direct financial support when it matters most</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Real-Time Connection</h3>
                  <p className="text-gray-300">Instant recognition and engagement at live shows</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Global Impact</h3>
                  <p className="text-gray-300">Building a worldwide community of music supporters</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="text-center">
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-300">
              Passionate individuals working to support the music community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xl bg-purple-500 text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-300 mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm">{member.bio}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Award className="w-6 h-6 text-yellow-400" />
                  Artist First
                </h3>
                <p className="text-gray-300 mb-6">
                  Every decision we make prioritizes the needs and success of artists. 
                  We believe in fair compensation and transparent processes.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  Community Driven
                </h3>
                <p className="text-gray-300">
                  We're building more than a platform - we're fostering a global 
                  community of music lovers who actively support the artists they admire.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-purple-400" />
                  Innovation
                </h3>
                <p className="text-gray-300 mb-6">
                  We leverage cutting-edge technology to solve real problems in the 
                  music industry, always pushing the boundaries of what's possible.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                  <Heart className="w-6 h-6 text-red-400" />
                  Transparency
                </h3>
                <p className="text-gray-300">
                  Open communication, fair pricing, and honest relationships with 
                  artists, fans, and venues are at the core of everything we do.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <GlassCard variant="elevated">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Mission
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're an artist, fan, or venue owner, there's a place for you 
              in the TrueFans CONNECT™ community. Let's support live music together.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                Get Started
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                Contact Us
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}