'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Book, 
  Video, 
  Image, 
  Code, 
  Headphones,
  Folder,
  Search
} from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function ResourcesPage() {
  // Mock resource categories
  const resourceCategories = [
    {
      title: 'Documentation',
      icon: Book,
      color: 'bg-blue-500/20 text-blue-400',
      resources: [
        { 
          title: 'Platform API Documentation', 
          description: 'Complete reference for the TrueFans API endpoints and usage',
          type: 'PDF',
          size: '2.4 MB',
          updated: '2024-06-15'
        },
        { 
          title: 'Integration Guide', 
          description: 'Step-by-step instructions for integrating with external services',
          type: 'PDF',
          size: '3.8 MB',
          updated: '2024-06-10'
        },
        { 
          title: 'Database Schema', 
          description: 'Comprehensive documentation of the database structure',
          type: 'PDF',
          size: '1.2 MB',
          updated: '2024-06-05'
        }
      ]
    },
    {
      title: 'Marketing Materials',
      icon: Image,
      color: 'bg-purple-500/20 text-purple-400',
      resources: [
        { 
          title: 'Brand Guidelines', 
          description: 'Official brand guidelines and usage instructions',
          type: 'PDF',
          size: '5.7 MB',
          updated: '2024-05-20'
        },
        { 
          title: 'Marketing Assets', 
          description: 'Logos, banners, and promotional materials',
          type: 'ZIP',
          size: '24.5 MB',
          updated: '2024-05-15'
        },
        { 
          title: 'Social Media Templates', 
          description: 'Ready-to-use templates for social media posts',
          type: 'ZIP',
          size: '18.2 MB',
          updated: '2024-05-10'
        }
      ]
    },
    {
      title: 'Training Materials',
      icon: Video,
      color: 'bg-green-500/20 text-green-400',
      resources: [
        { 
          title: 'Admin Dashboard Tutorial', 
          description: 'Video walkthrough of the admin dashboard features',
          type: 'MP4',
          size: '45.8 MB',
          updated: '2024-04-25'
        },
        { 
          title: 'User Management Training', 
          description: 'Guide to managing users, roles, and permissions',
          type: 'PDF',
          size: '2.1 MB',
          updated: '2024-04-20'
        },
        { 
          title: 'Financial Reporting Guide', 
          description: 'Instructions for generating and interpreting financial reports',
          type: 'PDF',
          size: '3.5 MB',
          updated: '2024-04-15'
        }
      ]
    },
    {
      title: 'Developer Resources',
      icon: Code,
      color: 'bg-yellow-500/20 text-yellow-400',
      resources: [
        { 
          title: 'API Client Libraries', 
          description: 'Client libraries for various programming languages',
          type: 'ZIP',
          size: '8.3 MB',
          updated: '2024-03-30'
        },
        { 
          title: 'Webhook Integration Guide', 
          description: 'Documentation for setting up and handling webhooks',
          type: 'PDF',
          size: '1.8 MB',
          updated: '2024-03-25'
        },
        { 
          title: 'Sample Code Repository', 
          description: 'Example code for common integration scenarios',
          type: 'ZIP',
          size: '5.2 MB',
          updated: '2024-03-20'
        }
      ]
    }
  ]

  // Recently accessed resources
  const recentResources = [
    { 
      title: 'Platform API Documentation', 
      accessedAt: '2024-06-25T14:30:00Z',
      category: 'Documentation'
    },
    { 
      title: 'Admin Dashboard Tutorial', 
      accessedAt: '2024-06-24T10:15:00Z',
      category: 'Training Materials'
    },
    { 
      title: 'Marketing Assets', 
      accessedAt: '2024-06-23T16:45:00Z',
      category: 'Marketing Materials'
    }
  ]

  return (
    <GradientBg variant="primary">
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Resources</h1>
                <p className="text-gray-300">Documentation, marketing materials, and developer resources</p>
              </div>
              <Link href="/admin/dashboard">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Search */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search resources..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard variant="elevated">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                  <div className="space-y-2">
                    <button className="w-full text-left p-3 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      All Resources
                    </button>
                    {resourceCategories.map((category) => (
                      <button 
                        key={category.title}
                        className="w-full text-left p-3 rounded-lg hover:bg-white/5 text-gray-300 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <category.icon className="w-4 h-4" />
                          <span>{category.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </GlassCard>

              {/* Recent Resources */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Recently Accessed</h3>
                    <div className="space-y-3">
                      {recentResources.map((resource, index) => (
                        <div 
                          key={index}
                          className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                        >
                          <p className="font-medium text-white text-sm">{resource.title}</p>
                          <div className="flex items-center justify-between mt-1">
                            <Badge variant="outline" className="border-white/20 text-gray-300 text-xs">
                              {resource.category}
                            </Badge>
                            <p className="text-xs text-gray-400">
                              {new Date(resource.accessedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {resourceCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + categoryIndex * 0.1 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className={`w-10 h-10 rounded-lg ${category.color.split(' ')[0]} flex items-center justify-center`}>
                          <category.icon className={`w-5 h-5 ${category.color.split(' ')[1]}`} />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {category.resources.map((resource, resourceIndex) => (
                          <motion.div
                            key={resource.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + resourceIndex * 0.1 }}
                            className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-medium text-white mb-1">{resource.title}</h4>
                                <p className="text-xs text-gray-400 line-clamp-2">{resource.description}</p>
                              </div>
                              <Badge variant="outline" className="border-white/20 text-white">
                                {resource.type}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>Updated: {resource.updated}</span>
                              <span>{resource.size}</span>
                            </div>
                            
                            <div className="mt-3 flex justify-end">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-white/20 text-white hover:bg-white/10"
                              >
                                <Download className="w-3 h-3 mr-1" />
                                Download
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <div className="mt-4 text-center">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          View All {category.title}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
              
              {/* Resource Request */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <GlassCard variant="minimal">
                  <div className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-white mb-3">Need Something Specific?</h3>
                    <p className="text-gray-300 mb-4">
                      Can't find what you're looking for? Request a specific resource or document.
                    </p>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Request Resource
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </GradientBg>
  )
}