'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Settings, CheckCircle, AlertTriangle, X, Plus, ExternalLink, Key, Globe } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function IntegrationsPage() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null)

  const integrations = [
    {
      id: 'spotify',
      name: 'Spotify',
      description: 'Connect with Spotify Web API for artist verification and music data',
      status: 'connected',
      category: 'Music Platforms',
      icon: '🎵',
      color: 'bg-green-500',
      lastSync: '2 hours ago',
      features: ['Artist Verification', 'Track Data', 'Playlist Integration'],
      config: {
        clientId: 'sp_****_****_1234',
        webhookUrl: 'https://api.truefans.ai/webhooks/spotify',
        scopes: ['user-read-email', 'playlist-read-private']
      }
    },
    {
      id: 'bandsintown',
      name: 'BandsinTown',
      description: 'Sync event data and venue information from BandsinTown API',
      status: 'connected',
      category: 'Event Platforms',
      icon: '🎪',
      color: 'bg-blue-500',
      lastSync: '1 hour ago',
      features: ['Event Sync', 'Venue Data', 'Artist Tours'],
      config: {
        appId: 'truefans-geoconnect',
        apiKey: 'bt_****_****_5678',
        webhookUrl: 'https://api.truefans.ai/webhooks/bandsintown'
      }
    },
    {
      id: 'vinly',
      name: 'Vinly.co',
      description: 'Community platform integration for fan engagement and artist communities',
      status: 'connected',
      category: 'Community',
      icon: '👥',
      color: 'bg-indigo-500',
      lastSync: '15 minutes ago',
      features: ['Community Management', 'User Groups', 'Content Sharing', 'Event Coordination'],
      config: {
        apiKey: 'vinly_****_****_7890',
        webhookUrl: 'https://api.truefans.ai/webhooks/vinly',
        environment: 'production'
      }
    },
    {
      id: 'vinly',
      name: 'Vinly.co',
      description: 'Community platform integration for TrueFans CONNECT ecosystem',
      status: 'connected',
      category: 'TrueFans Ecosystem',
      icon: '👥',
      color: 'bg-indigo-500',
      lastSync: '15 minutes ago',
      features: ['Community Management', 'User Groups', 'Content Sharing', 'Event Coordination'],
      config: {
        apiKey: 'vinly_****_****_7890',
        webhookUrl: 'https://api.truefans.ai/webhooks/vinly',
        environment: 'production'
      }
    },
    {
      id: 'manifest',
      name: 'Manifest Financial',
      description: 'Payment processing and instant payouts for artist donations',
      status: 'connected',
      category: 'Payment Processing',
      icon: '💳',
      color: 'bg-purple-500',
      lastSync: '30 minutes ago',
      features: ['Payment Processing', 'Instant Payouts', 'KYC Verification'],
      config: {
        publicKey: 'pk_live_****_****_9012',
        webhookSecret: 'whsec_****_****_3456',
        environment: 'production'
      }
    },
    {
      id: 'truefans-api',
      name: 'TrueFans CONNECT™',
      description: 'Live show digital donation platform for real-time artist support',
      status: 'connected',
      category: 'Payment Processing',
      icon: '💸',
      color: 'bg-purple-500',
      lastSync: '15 minutes ago',
      features: ['Live Donations', 'Geolocation Detection', 'Artist Payouts', 'Fan Engagement'],
      config: {
        apiKey: 'tf_****_****_1234',
        environment: 'production',
        webhookUrl: 'https://api.truefans.ai/webhooks/truefans'
      }
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      description: 'Enhanced geolocation services and venue mapping',
      status: 'disconnected',
      category: 'Location Services',
      icon: '🗺️',
      color: 'bg-red-500',
      lastSync: 'Never',
      features: ['Geocoding', 'Place Details', 'Distance Matrix'],
      config: {
        apiKey: 'Not configured',
        restrictions: 'None',
        quotaLimit: '100,000 requests/day'
      }
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Email delivery service for notifications and marketing',
      status: 'connected',
      category: 'Communication',
      icon: '📧',
      color: 'bg-cyan-500',
      lastSync: '5 minutes ago',
      features: ['Transactional Emails', 'Marketing Campaigns', 'Analytics'],
      config: {
        apiKey: 'sg_****_****_4567',
        fromEmail: 'noreply@truefans.ai',
        templates: '12 active'
      }
    },
    {
      id: 'dialog',
      name: 'DIALOG',
      description: 'AI-powered customer support and artist communication platform',
      status: 'connected',
      category: 'Communication',
      icon: '💬',
      color: 'bg-blue-500',
      lastSync: '10 minutes ago',
      features: ['AI Chat Support', 'Artist Messaging', 'Automated Responses', 'Analytics'],
      config: {
        apiKey: 'dialog_****_****_8901',
        botId: 'bot_music_support_123',
        channels: '4 active'
      }
    }
  ]

  const categories = [...new Set(integrations.map(i => i.category))]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-500/20 text-green-300'
      case 'pending': return 'bg-yellow-500/20 text-yellow-300'
      case 'disconnected': return 'bg-red-500/20 text-red-300'
      default: return 'bg-gray-500/20 text-gray-300'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <AlertTriangle className="w-4 h-4" />
      case 'disconnected': return <X className="w-4 h-4" />
      default: return null
    }
  }

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
                <h1 className="text-3xl font-bold text-white mb-2">Integrations</h1>
                <p className="text-gray-300">Manage external service connections and API integrations</p>
              </div>
              <div className="flex gap-3">
                <Button 
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => {
                    // Add a new integration with default values
                    setSelectedIntegration('new-integration');
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Integration
                </Button>
                <Link href="/admin/dashboard">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Integrations List */}
            <div className="lg:col-span-2">
              {categories.map((category, categoryIndex) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * categoryIndex }}
                  className="mb-8"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">{category}</h3>
                  <div className="grid gap-4">
                    {integrations
                      .filter(integration => integration.category === category)
                      .map((integration, index) => (
                        <GlassCard 
                          key={integration.id} 
                          variant="elevated" 
                          className="hover:bg-white/15 transition-all cursor-pointer"
                          onClick={() => setSelectedIntegration(integration.id)}
                        >
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                                  {integration.icon}
                                </div>
                                <div>
                                  <h4 className="text-lg font-semibold text-white">{integration.name}</h4>
                                  <p className="text-sm text-gray-400">{integration.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(integration.status)}>
                                  {getStatusIcon(integration.status)}
                                  {integration.status}
                                </Badge>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-white/20 text-white hover:bg-white/10"
                                >
                                  <Settings className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                              <div className="flex gap-4">
                                {integration.features.slice(0, 2).map((feature, idx) => (
                                  <Badge key={idx} variant="outline" className="border-purple-400/30 text-purple-300">
                                    {feature}
                                  </Badge>
                                ))}
                                {integration.features.length > 2 && (
                                  <Badge variant="outline" className="border-gray-400/30 text-gray-300">
                                    +{integration.features.length - 2} more
                                  </Badge>
                                )}
                              </div>
                              <span className="text-gray-400">Last sync: {integration.lastSync}</span>
                            </div>
                          </div>
                        </GlassCard>
                      ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Integration Details Sidebar */}
            <div className="space-y-6">
              {selectedIntegration ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={selectedIntegration}
                >
                  {(() => {
                    const integration = integrations.find(i => i.id === selectedIntegration)
                    if (!integration) return null

                    return (
                      <GlassCard variant="elevated">
                        <div className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 ${integration.color} rounded-lg flex items-center justify-center text-white`}>
                              {integration.icon}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">{integration.name}</h3>
                              <Badge className={getStatusColor(integration.status)}>
                                {getStatusIcon(integration.status)}
                                {integration.status}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-gray-300 text-sm mb-6">{integration.description}</p>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Features</h4>
                              <div className="space-y-1">
                                {integration.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                                    <CheckCircle className="w-3 h-3 text-green-400" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Configuration</h4>
                              <div className="space-y-2">
                                {Object.entries(integration.config).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-sm">
                                    <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                    <span className="text-gray-300 font-mono">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="pt-4 border-t border-white/10">
                              <div className="flex gap-2">
                                {integration.status === 'connected' ? (
                                  <>
                                    <Button size="sm" variant="outline" className="flex-1 border-red-400/30 text-red-300 hover:bg-red-500/10">
                                      Disconnect
                                    </Button>
                                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                                      Configure
                                    </Button>
                                  </>
                                ) : (
                                  <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                                    Connect
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    )
                  })()}
                </motion.div>
              ) : selectedIntegration === 'new-integration' ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Plus className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">Add New Integration</h3>
                          <Badge className="bg-yellow-500/20 text-yellow-300">
                            Setup Required
                          </Badge>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm mb-6">Select the type of integration you want to add to your platform.</p>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Integration Type</label>
                          <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                            <option value="">Select integration type</option>
                            <option value="music">Music Platform</option>
                            <option value="payment">Payment Processing</option>
                            <option value="event">Event Platform</option>
                            <option value="communication">Communication</option>
                            <option value="analytics">Analytics</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Integration Name</label>
                          <Input
                            className="bg-white/10 border-white/20 text-white"
                            placeholder="Enter a name for this integration"
                          />
                        </div>

                        <div className="pt-4 border-t border-white/10">
                          <div className="flex gap-2">
                            <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                              Continue Setup
                            </Button>
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={() => setSelectedIntegration(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6 text-center">
                      <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">Select an Integration</h3>
                      <p className="text-gray-400 text-sm">
                        Click on an integration to view details and configuration options.
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Integration Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Connected</span>
                        <span className="text-green-400 font-medium">
                          {integrations.filter(i => i.status === 'connected').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Pending</span>
                        <span className="text-yellow-400 font-medium">
                          {integrations.filter(i => i.status === 'pending').length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Disconnected</span>
                        <span className="text-red-400 font-medium">
                          {integrations.filter(i => i.status === 'disconnected').length}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* API Health */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">API Health</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Response Time</span>
                        <Badge className="bg-green-500/20 text-green-300">142ms</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Success Rate</span>
                        <Badge className="bg-green-500/20 text-green-300">99.8%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Daily Requests</span>
                        <span className="text-white font-medium">12,456</span>
                      </div>
                    </div>
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