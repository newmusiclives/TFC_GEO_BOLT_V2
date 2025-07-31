'use client'

import { motion } from 'framer-motion'
import { Download, ExternalLink, Calendar, Users, TrendingUp, Award, Image, FileText, Video, Mic } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PressKitPage() {
  const pressReleases = [
    {
      title: 'TrueFans CONNECT™ seeeks to Revolutionize Live Music Support',
      date: '2024-01-15',
      excerpt: 'Leading music technology company uses geolocation to develop music artist support platform.',
      type: 'Funding',
      downloadUrl: '#'
    },
    {
      title: 'TrueFans CONNECT™ Partners with Venues Nationwide',
      date: '2024-01-10',
      excerpt: 'Platform reaches major milestone with venue partnerships across all major US markets.',
      type: 'Partnership',
      downloadUrl: '#'
    },
    {
      title: 'Music artists Earn additional income through the TrueFans CONNECT™ Platform',
      date: '2024-01-05',
      excerpt: 'Independent music artists see significant revenue increase through real-time fan donations.',
      type: 'Milestone',
      downloadUrl: '#'
    }
  ]

  const mediaAssets = [
    {
      category: 'Logos',
      items: [
        { name: 'Primary Logo (PNG)', size: '2.4 MB', format: 'PNG' },
        { name: 'Primary Logo (SVG)', size: '1.8 MB', format: 'SVG' },
        { name: 'Logo Mark Only', size: '1.2 MB', format: 'PNG' },
        { name: 'White Logo', size: '2.1 MB', format: 'PNG' }
      ]
    },
    {
      category: 'Screenshots',
      items: [
        { name: 'App Interface - Discovery', size: '3.2 MB', format: 'PNG' },
        { name: 'Artist Dashboard', size: '2.8 MB', format: 'PNG' },
        { name: 'Live Show Detection', size: '3.5 MB', format: 'PNG' },
        { name: 'Donation Flow', size: '2.9 MB', format: 'PNG' }
      ]
    },
    {
      category: 'Team Photos',
      items: [
        { name: 'Executive Team', size: '4.1 MB', format: 'JPG' },
        { name: 'Paul Saunders - Founder & CEO', size: '2.3 MB', format: 'JPG' },
        { name: 'Matthew Wood - CMO', size: '2.1 MB', format: 'JPG' },
        { name: 'Company Group Photo', size: '5.2 MB', format: 'JPG' }
      ]
    }
  ]

  const companyStats = [
    { label: 'Artists Supported', value: '2,500+', icon: Users },
    { label: 'Total Donations', value: '$125K+', icon: TrendingUp },
    { label: 'Venue Partners', value: '500+', icon: Award },
    { label: 'App Downloads', value: '15K+', icon: Download }
  ]

  const teamMembers = [
    {
      name: 'Paul Saunders',
      role: 'CEO & Co-Founder',
      bio: 'More than 40+ years in music industry. Now completely passionate about create a music artist ecosystem that is truly artist-first',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      linkedin: 'https://linkedin.com/in/paulksaunders',
      twitter: '@paulksaunders'
    },
    {
      name: 'Matthew Wood',
      role: 'CMO & Co-Founder',
      bio: 'Digital marketing specialist seeking to develop the marketing and promotional strategy to reach music artists on a global scale.',
      image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
      linkedin: 'https://linkedin.com/in/matthewwood',
    },
    {
      name: 'Lou Bledsoe',
      role: 'CCO & Co-Founder',
      bio: 'Web developer and photgraper with a passion for music applications. Bring years of creative design experience',
      image: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200',
      linkedin: 'https://linkedin.com/in/loubledsoe',
      twitter: '@loubrledsor'
    }
  ]

  const mediaContact = {
    name: 'Sarah Thompson',
    role: 'Head of Communications',
    email: 'press@truefansconnect.com',
    phone: '+1 (xxx)-xxx-xxxx',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
  }

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
            Press Kit
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Media resources, company information, and press materials for 
            journalists and content creators covering TrueFans CONNECT™.
          </p>
          <div className="flex gap-4 justify-center">
            <Button className="bg-purple-600 hover:bg-purple-700" size="lg">
              <Download className="w-5 h-5 mr-2" />
              Download Full Press Kit
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" size="lg">
              Contact Media Team
            </Button>
          </div>
        </motion.div>

        {/* Company Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Company Overview</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  TrueFans CONNECT™ is revolutionizing how fans support music artists through 
                  cutting-edge geolocation technology. Our platform detects when fans are 
                  at live music venues and enables them to instantly and seamlessly donate directly 
                  to performing music artists.
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Founded in 2023 by former music business and technology experts, we've already 
                  facilitating direct music artist support and we are partnered with more than 200 venues nationwide. Our mission is to ensure that live music thrives by creating 
                  new revenue streams for music artists.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <FileText className="w-4 h-4 mr-2" />
                    Company Fact Sheet
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {companyStats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/5 rounded-lg p-4 text-center"
                  >
                    <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Press Releases */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <GlassCard variant="elevated">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Recent Press Releases</h2>
              </div>
              
              <div className="space-y-6">
                {pressReleases.map((release, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                            {release.type}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(release.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {release.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {release.excerpt}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 ml-4"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Media Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <GlassCard variant="elevated">
              <div className="flex items-center gap-2 mb-6">
                <Mic className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Media Contact</h2>
              </div>
              
              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src={mediaContact.image}
                    alt={mediaContact.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-white">{mediaContact.name}</h3>
                <p className="text-purple-300 mb-4">{mediaContact.role}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span>📧</span>
                    <a href={`mailto:${mediaContact.email}`} className="hover:text-white transition-colors">
                      {mediaContact.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <span>📞</span>
                    <a href={`tel:${mediaContact.phone}`} className="hover:text-white transition-colors">
                      {mediaContact.phone}
                    </a>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Schedule Interview
              </Button>
            </GlassCard>
          </motion.div>
        </div>

        {/* Media Assets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Image className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Media Assets</h2>
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Download All Assets
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {mediaAssets.map((category, index) => (
                <div key={category.category}>
                  <h3 className="text-lg font-semibold text-white mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <p className="text-white font-medium text-sm">{item.name}</p>
                          <p className="text-gray-400 text-xs">{item.format} • {item.size}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Leadership Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GlassCard variant="elevated">
            <div className="flex items-center gap-2 mb-8">
              <Users className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-bold text-white">Leadership Team</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-purple-300 mb-3">{member.role}</p>
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      LinkedIn
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Twitter
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}