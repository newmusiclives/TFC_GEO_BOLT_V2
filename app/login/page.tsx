'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Music } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { GradientBg } from '@/components/ui/gradient-bg'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [useMagicLink, setUseMagicLink] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      let result
      if (useMagicLink) {
        result = await supabase.auth.signInWithOtp({ email })
      } else {
        result = await supabase.auth.signInWithPassword({ email, password })
      }
      
      if (result.error) {
        setError(result.error.message)
      } else {
        if (useMagicLink) {
          setError('Check your email for a magic link!')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GradientBg variant="primary">
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#48517F] to-[#F98017] rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to your TrueFans CONNECT™ account</p>
          </div>

          <Card className="bg-white/5 backdrop-blur border-white/10">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                      required
                    />
                  </div>
                </div>

                {!useMagicLink && (
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                        required
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className={`text-sm border rounded-lg p-3 ${
                    error.includes('Check your email') 
                      ? 'text-green-400 bg-green-400/10 border-green-400/20'
                      : 'text-red-400 bg-red-400/10 border-red-400/20'
                  }`}>
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#F98017] hover:bg-[#48517F] text-white"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      {useMagicLink ? 'Sending Magic Link...' : 'Signing In...'}
                    </div>
                  ) : (
                    useMagicLink ? 'Send Magic Link' : 'Sign In'
                  )}
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setUseMagicLink(!useMagicLink)}
                    className="text-[#48517F] hover:text-[#F98017] text-sm transition-colors"
                  >
                    {useMagicLink ? 'Use password instead' : 'Use magic link instead'}
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-6 border-t border-white/10 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-[#48517F] hover:text-[#F98017] transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </GradientBg>
  )
}