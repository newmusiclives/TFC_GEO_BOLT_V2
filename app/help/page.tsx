'use client'

import { motion } from 'framer-motion'
import { Search, Book, MessageCircle, Video, Download, ExternalLink, ChevronDown, ChevronRight, HelpCircle, Zap, Shield, Users } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>('getting-started')

  const helpCategories = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Book,
      description: 'Learn the basics of using TrueFans CONNECT™',
      articles: [
        {
          title: 'How to create your account',
          description: 'Step-by-step guide to signing up and setting up your profile',
          readTime: '3 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Understanding geolocation detection',
          description: 'How our smart venue detection works and privacy considerations',
          readTime: '5 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Making your first donation',
          description: 'Complete walkthrough of supporting an artist during a live show',
          readTime: '4 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Setting up location permissions',
          description: 'Enabling location access for optimal show detection',
          readTime: '2 min',
          difficulty: 'Beginner'
        }
      ]
    },
    {
      id: 'for-artists',
      title: 'For Music Artists',
      icon: MessageCircle,
      description: 'Music Artist specific guides and best practices',
      articles: [
        {
          title: 'Setting up your music artist profile',
          description: 'Complete your profile to start receiving donations',
          readTime: '8 min',
          difficulty: 'Intermediate'
        },
        {
          title: 'Connecting payment methods',
          description: 'Link your bank account for instant payouts',
          readTime: '6 min',
          difficulty: 'Intermediate'
        },
        {
          title: 'Managing your shows',
          description: 'Add shows, update details, and track performance',
          readTime: '7 min',
          difficulty: 'Intermediate'
        },
        {
          title: 'Understanding analytics',
          description: 'Read your performance metrics and fan insights',
          readTime: '10 min',
          difficulty: 'Advanced'
        },
        {
          title: 'Verification process',
          description: 'How to get verified and unlock additional features',
          readTime: '5 min',
          difficulty: 'Intermediate'
        }
      ]
    },
    {
      id: 'for-venues',
      title: 'For Venues',
      icon: Video,
      description: 'Venue partnership and integration guides',
      articles: [
        {
          title: 'Venue partnership program',
          description: 'Benefits and requirements for venue partners',
          readTime: '6 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Setting up geofencing',
          description: 'Configure precise venue boundaries for detection',
          readTime: '12 min',
          difficulty: 'Advanced'
        },
        {
          title: 'Integration with existing systems',
          description: 'Connect with your POS and ticketing systems',
          readTime: '15 min',
          difficulty: 'Advanced'
        },
        {
          title: 'Managing venue analytics',
          description: 'Track show performance and fan engagement',
          readTime: '8 min',
          difficulty: 'Intermediate'
        }
      ]
    },
    {
      id: 'payments',
      title: 'Payments & Donations',
      icon: Download,
      description: 'Payment processing, security, and troubleshooting',
      articles: [
        {
          title: 'How donations work',
          description: 'Understanding the donation flow from fan to artist',
          readTime: '4 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Payment security',
          description: 'How we protect your financial information',
          readTime: '6 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Refund policies',
          description: 'When and how refunds are processed',
          readTime: '3 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Tax information for artists',
          description: 'Understanding tax implications of donations received',
          readTime: '8 min',
          difficulty: 'Intermediate'
        },
        {
          title: 'Troubleshooting payment issues',
          description: 'Common payment problems and solutions',
          readTime: '5 min',
          difficulty: 'Intermediate'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Zap,
      description: 'Technical issues, API documentation, and troubleshooting',
      articles: [
        {
          title: 'Troubleshooting location permissions',
          description: 'Fix common geolocation detection issues',
          readTime: '4 min',
          difficulty: 'Beginner'
        },
        {
          title: 'App performance optimization',
          description: 'Improve app speed and battery usage',
          readTime: '6 min',
          difficulty: 'Intermediate'
        },
        {
          title: 'API documentation',
          description: 'Developer resources for integrations',
          readTime: '20 min',
          difficulty: 'Advanced'
        },
        {
          title: 'Webhook setup guide',
          description: 'Configure webhooks for real-time updates',
          readTime: '15 min',
          difficulty: 'Advanced'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      description: 'Data protection, privacy settings, and security',
      articles: [
        {
          title: 'Privacy settings overview',
          description: 'Control what data you share and with whom',
          readTime: '5 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Location data handling',
          description: 'How we collect, use, and protect your location data',
          readTime: '7 min',
          difficulty: 'Intermediate'
        },
        {
          title: 'Account security best practices',
          description: 'Keep your account safe with these security tips',
          readTime: '6 min',
          difficulty: 'Beginner'
        },
        {
          title: 'Data deletion and export',
          description: 'How to download or delete your personal data',
          readTime: '4 min',
          difficulty: 'Beginner'
        }
      ]
    }
  ]

  const popularArticles = [
    {
      title: 'How does geolocation detection work?',
      category: 'Getting Started',
      readTime: '5 min read',
      views: '12.5K'
    },
    {
      title: 'Setting up instant payouts as an artist',
      category: 'For Artists',
      readTime: '6 min read',
      views: '8.2K'
    },
    {
      title: 'Troubleshooting location permissions',
      category: 'Technical',
      readTime: '4 min read',
      views: '6.8K'
    },
    {
      title: 'Understanding donation fees',
      category: 'Payments',
      readTime: '3 min read',
      views: '5.9K'
    },
    {
      title: 'Privacy settings overview',
      category: 'Privacy & Security',
      readTime: '5 min read',
      views: '4.7K'
    }
  ]

  const quickActions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      action: 'Start Chat',
      available: true
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: Video,
      action: 'Watch Videos',
      available: true
    },
    {
      title: 'Download Resources',
      description: 'Get mobile apps and guides',
      icon: Download,
      action: 'Download',
      available: true
    },
    {
      title: 'Community Forum',
      description: 'Connect with other users',
      icon: Users,
      action: 'Join Forum',
      available: false
    }
  ]

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  )

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
            Help Center
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Find answers to your questions, learn how to use TrueFans CONNECT™, 
            and get the most out of our platform.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <GlassCard variant="minimal" className="p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search for help articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Search
                </Button>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <GlassCard variant="elevated" className={`text-center h-full ${action.available ? 'hover:bg-white/15 cursor-pointer' : 'opacity-60'}`}>
                      <action.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <h3 className="text-lg font-semibold text-white mb-2">{action.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{action.description}</p>
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-white hover:bg-white/10"
                        disabled={!action.available}
                      >
                        {action.available ? action.action : 'Coming Soon'}
                      </Button>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Help Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Browse by Category</h2>
              <div className="space-y-4">
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <GlassCard variant="elevated">
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <category.icon className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">{category.title}</h3>
                            <p className="text-gray-300 text-sm">{category.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-white/20">
                            {category.articles.length} articles
                          </Badge>
                          {expandedCategory === category.id ? (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {expandedCategory === category.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="border-t border-white/10"
                        >
                          <div className="p-6 pt-4">
                            <div className="grid gap-3">
                              {category.articles.map((article, articleIndex) => (
                                <div
                                  key={articleIndex}
                                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                  <div className="flex-1">
                                    <h4 className="font-medium text-white mb-1">{article.title}</h4>
                                    <p className="text-sm text-gray-300 mb-2">{article.description}</p>
                                    <div className="flex items-center gap-3 text-xs text-gray-400">
                                      <span>{article.readTime}</span>
                                      <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                                        {article.difficulty}
                                      </Badge>
                                    </div>
                                  </div>
                                  <ExternalLink className="w-4 h-4 text-gray-400" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Popular Articles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard variant="elevated">
                <h3 className="text-lg font-semibold text-white mb-4">Popular Articles</h3>
                <div className="space-y-3">
                  {popularArticles.map((article, index) => (
                    <div key={index} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <h4 className="font-medium text-white mb-1 text-sm">{article.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{article.category}</span>
                        <span>{article.views} views</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{article.readTime}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Contact Support */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GlassCard variant="elevated">
                <h3 className="text-lg font-semibold text-white mb-4">Need More Help?</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="space-y-3">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Community Forum
                  </Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Support Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <GlassCard variant="elevated">
                <h3 className="text-lg font-semibold text-white mb-4">Support Hours</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Live Chat</span>
                    <span className="text-green-400">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email Support</span>
                    <span className="text-green-400">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Phone Support</span>
                    <span className="text-white">Mon-Fri 9AM-6PM PST</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </GradientBg>
  )
}