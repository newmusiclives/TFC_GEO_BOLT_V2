'use client'

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Clock, Users, Heart, Zap, Code, Palette } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our engineering team to build cutting-edge geolocation and real-time features.',
      requirements: ['React/Next.js', 'Node.js', 'PostgreSQL', 'Real-time systems'],
      level: 'Senior'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design beautiful, intuitive experiences for music artists and music fans.',
      requirements: ['Figma', 'User Research', 'Mobile Design', 'Design Systems'],
      level: 'Mid-level'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Scale our infrastructure to support millions of real-time connections.',
      requirements: ['AWS/GCP', 'Kubernetes', 'CI/CD', 'Monitoring'],
      level: 'Senior'
    },
    {
      title: 'Artist Relations Manager',
      department: 'Business',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build relationships with artists and help them succeed on our platform.',
      requirements: ['Music Industry', 'Relationship Building', 'Communication', 'Analytics'],
      level: 'Mid-level'
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health, dental, and vision insurance plus wellness stipend'
    },
    {
      icon: Zap,
      title: 'Growth & Learning',
      description: 'Professional development budget and conference attendance'
    },
    {
      icon: Users,
      title: 'Work-Life Balance',
      description: 'Flexible hours, unlimited PTO, and remote work options'
    },
    {
      icon: Code,
      title: 'Cutting-Edge Tech',
      description: 'Work with the latest technologies and tools in music tech'
    }
  ]

  const values = [
    {
      title: 'Artist First',
      description: 'Every decision we make prioritizes the success and well-being of music artists.',
      icon: '🎵'
    },
    {
      title: 'Innovation',
      description: 'We push the boundaries of what\'s possible in music technology.',
      icon: '🚀'
    },
    {
      title: 'Community',
      description: 'We believe in the power of music to bring people together.',
      icon: '🤝'
    },
    {
      title: 'Transparency',
      description: 'Open communication and honest relationships guide everything we do.',
      icon: '💎'
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
            Join Our Mission
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Help us revolutionize how fans support music artists. We're building the future of 
            live music technology, and we want you to be part of it.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
              View Open Positions
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
              Learn About Our Culture
            </Button>
          </div>
        </motion.div>

        {/* Company Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-lg text-gray-300">
              The principles that guide our work and culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="text-center h-full">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm">{value.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Work With Us</h2>
            <p className="text-lg text-gray-300">
              We believe in taking care of our team so they can do their best work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="h-full">
                  <benefit.icon className="w-8 h-8 text-purple-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-lg text-gray-300">
              Join our growing team and help shape the future of music technology
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="hover:bg-white/15 transition-all cursor-pointer">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-white">{position.title}</h3>
                        <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                          {position.level}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-300 mb-4">{position.description}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-4">
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{position.department}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{position.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{position.type}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {position.requirements.map((req, reqIndex) => (
                          <Badge key={reqIndex} variant="secondary" className="bg-white/10 text-gray-300">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Button className="bg-purple-600 hover:bg-purple-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Culture Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Culture</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We're a diverse team of music lovers, technologists, and creators who believe 
                  in the power of live music to bring people together. Our culture is built on 
                  collaboration, innovation, and a shared passion for supporting music artists.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>We are a entirely Remote-first company allow for great flexibility.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>Regular team events and music experiences.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>Collaborative decision-making and open communication.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span>Focus on work-life balance and personal growth.</span>
                  </li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">5+</div>
                  <div className="text-sm text-gray-300">Team Members</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">2+</div>
                  <div className="text-sm text-gray-300">Countries</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">4.9/5</div>
                  <div className="text-sm text-gray-300">Employee Rating</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-400 mb-1">95%</div>
                  <div className="text-sm text-gray-300">Retention Rate</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Application Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="text-center"
        >
          <GlassCard variant="elevated">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Join Us?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't see a position that fits? We're always looking for talented people who 
              share our passion for helping build the careers of music artists by using technology creativily. Send us your resume and let's talk.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
                Apply for Open Positions
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
                Send General Application
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}