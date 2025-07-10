'use client'

import { motion } from 'framer-motion'
import { CheckCircle, AlertTriangle, Clock, Server, Activity, Database, Globe, RefreshCw } from 'lucide-react'
import { useState, useEffect } from 'react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function StatusPage() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock service status data - in a real app, this would come from an API
  const [services, setServices] = useState([
    {
      name: 'API Services',
      status: 'operational',
      description: 'Core API endpoints and services',
      lastIncident: null,
      icon: Server
    },
    {
      name: 'Geolocation',
      status: 'operational',
      description: 'Live show detection and venue proximity',
      lastIncident: '2025-06-20T14:30:00Z',
      icon: Globe
    },
    {
      name: 'Payment Processing',
      status: 'operational',
      description: 'Donation processing and artist payouts',
      lastIncident: null,
      icon: Database
    },
    {
      name: 'Real-time Updates',
      status: 'operational',
      description: 'WebSocket connections and live data',
      lastIncident: null,
      icon: Activity
    }
  ])

  // Mock incident history
  const incidents = [
    {
      id: 'incident-1',
      title: 'Geolocation Service Degradation',
      date: '2025-06-20T14:30:00Z',
      resolved: true,
      resolvedAt: '2025-06-20T16:45:00Z',
      description: 'Some users experienced delays in venue detection due to increased traffic. Our team implemented optimizations to resolve the issue.',
      affectedServices: ['Geolocation']
    },
    {
      id: 'incident-2',
      title: 'Database Maintenance',
      date: '2025-06-15T02:00:00Z',
      resolved: true,
      resolvedAt: '2025-06-15T04:30:00Z',
      description: 'Scheduled database maintenance caused brief service interruptions. All systems were restored to normal operation after completion.',
      affectedServices: ['API Services', 'Payment Processing']
    },
    {
      id: 'incident-3',
      title: 'WebSocket Connection Issues',
      date: '2025-06-05T18:15:00Z',
      resolved: true,
      resolvedAt: '2025-06-05T19:20:00Z',
      description: 'Some users experienced disconnections from real-time updates. The issue was traced to a configuration problem and resolved.',
      affectedServices: ['Real-time Updates']
    }
  ]

  // Mock uptime percentages
  const uptimeStats = {
    '24h': '100%',
    '7d': '99.98%',
    '30d': '99.95%',
    '90d': '99.92%'
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    
    // Simulate API call
    setTimeout(() => {
      // Randomly change one service status for demo purposes
      if (Math.random() > 0.7) {
        const serviceIndex = Math.floor(Math.random() * services.length)
        const newStatus = Math.random() > 0.5 ? 'operational' : 'degraded'
        
        const updatedServices = [...services]
        updatedServices[serviceIndex] = {
          ...updatedServices[serviceIndex],
          status: newStatus
        }
        
        setServices(updatedServices)
      }
      
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 1500)
  }

  // Get status badge color based on status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational':
        return <Badge className="bg-green-500/20 text-green-300 border-green-400/30">
          <CheckCircle className="w-3 h-3 mr-1" />
          Operational
        </Badge>
      case 'degraded':
        return <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Degraded
        </Badge>
      case 'outage':
        return <Badge className="bg-red-500/20 text-red-300 border-red-400/30">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Outage
        </Badge>
      case 'maintenance':
        return <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30">
          <Clock className="w-3 h-3 mr-1" />
          Maintenance
        </Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-300 border-gray-400/30">
          Unknown
        </Badge>
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Calculate overall system status
  const getOverallStatus = () => {
    if (services.some(s => s.status === 'outage')) return 'outage'
    if (services.some(s => s.status === 'degraded')) return 'degraded'
    if (services.some(s => s.status === 'maintenance')) return 'maintenance'
    return 'operational'
  }

  const overallStatus = getOverallStatus()

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
            System Status
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Current operational status of TrueFans CONNECT™ services and infrastructure
          </p>
          
          {/* Overall Status */}
          <div className="inline-block">
            {overallStatus === 'operational' ? (
              <Badge className="text-lg px-6 py-2 bg-green-500/20 text-green-300 border border-green-400/30">
                <CheckCircle className="w-5 h-5 mr-2" />
                All Systems Operational
              </Badge>
            ) : overallStatus === 'degraded' ? (
              <Badge className="text-lg px-6 py-2 bg-yellow-500/20 text-yellow-300 border border-yellow-400/30">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Some Systems Degraded
              </Badge>
            ) : overallStatus === 'maintenance' ? (
              <Badge className="text-lg px-6 py-2 bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Clock className="w-5 h-5 mr-2" />
                Scheduled Maintenance
              </Badge>
            ) : (
              <Badge className="text-lg px-6 py-2 bg-red-500/20 text-red-300 border border-red-400/30">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Service Outage
              </Badge>
            )}
          </div>
        </motion.div>

        {/* Services Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Service Status</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-400">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-white/20 text-white hover:bg-white/10"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <service.icon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white">{service.name}</h3>
                        {getStatusBadge(service.status)}
                      </div>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                  </div>
                  
                  {service.lastIncident && (
                    <div className="text-sm text-gray-400">
                      Last incident: {formatDate(service.lastIncident)}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Uptime Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard variant="elevated">
              <h3 className="text-lg font-semibold text-white mb-6">Uptime</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last 24 hours</span>
                  <span className="text-green-400 font-medium">{uptimeStats['24h']}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last 7 days</span>
                  <span className="text-green-400 font-medium">{uptimeStats['7d']}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last 30 days</span>
                  <span className="text-green-400 font-medium">{uptimeStats['30d']}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Last 90 days</span>
                  <span className="text-green-400 font-medium">{uptimeStats['90d']}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">SLA Target</span>
                  <span className="text-purple-400 font-medium">99.9%</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Incident History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <GlassCard variant="elevated">
              <h3 className="text-lg font-semibold text-white mb-6">Recent Incidents</h3>
              
              <div className="space-y-6">
                {incidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="border-l-4 border-yellow-500 pl-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{incident.title}</h4>
                      <Badge className="bg-green-500/20 text-green-300">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Resolved
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-gray-300 mb-2">{incident.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-2">
                      {incident.affectedServices.map((service) => (
                        <Badge key={service} variant="outline" className="border-purple-400/30 text-purple-300">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <div>
                        <span className="text-gray-500">Started:</span> {formatDate(incident.date)}
                      </div>
                      <div>
                        <span className="text-gray-500">Resolved:</span> {formatDate(incident.resolvedAt)}
                      </div>
                      <div>
                        <span className="text-gray-500">Duration:</span> {Math.round((new Date(incident.resolvedAt).getTime() - new Date(incident.date).getTime()) / (1000 * 60))} minutes
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {incidents.length === 0 && (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <p className="text-gray-300">No incidents reported in the last 90 days</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Scheduled Maintenance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <GlassCard variant="elevated">
            <h3 className="text-lg font-semibold text-white mb-6">Scheduled Maintenance</h3>
            
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-300">No scheduled maintenance at this time</p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Subscribe to Updates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center"
        >
          <GlassCard variant="minimal">
            <h3 className="text-lg font-semibold text-white mb-4">Subscribe to Status Updates</h3>
            <p className="text-gray-300 mb-6">
              Get notified when there are service disruptions or scheduled maintenance.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Email Updates
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                RSS Feed
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}