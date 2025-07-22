'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Music, User, Shield, LogIn, Users, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { GradientBg } from '@/components/ui/gradient-bg'
import { Badge } from '@/components/ui/badge'

export default function DemoLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const demoAccounts = [
    {
      id: 'demo-artist',
      name: 'Luna Rodriguez',
      role: 'artist',
      email: 'luna@demo.com',
      avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Acoustic storyteller with verified artist status',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
      stats: ['15 Shows', '$2,450 Earned', '89 Supporters']
    },
    {
      id: 'demo-admin',
      name: 'Admin User',
      role: 'admin',
      email: 'admin@demo.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Full platform access with administrative privileges',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      stats: ['All Access', 'Analytics', 'User Management']
    },
    {
      id: 'demo-venue',
      name: 'Blue Note Manager',
      role: 'venue_owner',
      email: 'venue@demo.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Venue owner with access to venue management and analytics',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      stats: ['4 Venues', '156 Shows', '$45K Revenue']
    },
    {
      id: 'demo-fan',
      name: 'Sarah Johnson',
      role: 'fan',
      email: 'sarah@demo.com',
      avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Music lover and active supporter of local artists',
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      stats: ['$125 Donated', '8 Artists', '23 Shows']
    }
  ]

  const handleDemoLogin = async (account: typeof demoAccounts[0]) => {
    setIsLoading(true)
    
    try {
      // Create demo user data with proper role
      const demoUser = {
        id: account.id,
        email: account.email,
        user_metadata: {
          display_name: account.name,
          avatar_url: account.avatar
        }
      }

      const demoProfile = {
        id: account.id,
        role: account.role, // This is the key - make sure role is set correctly
        display_name: account.name,
        avatar_url: account.avatar,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }

      // Store minimal demo data in sessionStorage (cleared on tab close)
      sessionStorage.setItem('demo_user_id', account.id)
      sessionStorage.setItem('demo_role', account.role)
      sessionStorage.setItem('demo_mode', 'true')

      console.log('Demo login - storing user:', demoUser) // Debug log
      console.log('Demo login - storing profile:', demoProfile) // Debug log

      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Demo login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearDemo = () => {
    sessionStorage.removeItem('demo_user_id')
    sessionStorage.removeItem('demo_role')
    sessionStorage.removeItem('demo_mode')
    window.location.reload()
  }

  return (
    <GradientBg variant="primary">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Demo Login Portal
            </h1>
            <p className="text-gray-300 mb-6">
              Choose a demo account to explore TrueFans CONNECT™ features
            </p>
            <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
              Development Mode - No Real Authentication Required
            </Badge>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {demoAccounts.map((account, index) => (
              <motion.div
                key={account.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }} 
              >
                <Card className="bg-white/5 backdrop-blur border-white/10 hover:bg-white/10 transition-all duration-300 group cursor-pointer h-full flex flex-col">
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${account.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <account.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="w-12 h-12 rounded-full overflow-hidden mx-auto mb-3 ring-2 ring-white/20">
                        <img
                          src={account.avatar}
                          alt={account.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-1">{account.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`border-white/20 text-white mb-3 ${
                          account.role === 'admin' ? 'bg-blue-500/20' :
                          account.role === 'artist' ? 'bg-purple-500/20' :
                          'bg-green-500/20'
                        }`}
                      >
                        {account.role.charAt(0).toUpperCase() + account.role.slice(1)}
                      </Badge>
                      
                      <p className="text-gray-300 text-sm mb-4">
                        {account.description} 
                      </p>
                    </div>

                    <div className="space-y-2 mb-6 flex-1">
                      {account.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="flex items-center justify-center gap-2 text-sm text-gray-300">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                          <span>{stat}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleDemoLogin(account)}
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r ${account.color} hover:opacity-90 transition-opacity`}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                          Logging in...
                        </div>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4 mr-2" />
                          Login as {account.name}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Card className="bg-white/5 backdrop-blur border-white/10 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Demo Features Available
                </h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span>Artist Dashboard & Analytics</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span>Fan Support History</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span>Live Show Detection</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span>Real-time Donations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span>Artist Profiles</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span>Admin Controls</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-white/10">
                  <Button
                    onClick={handleClearDemo}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Clear Demo Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </GradientBg>
  )
}