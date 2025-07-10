'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, Building, MapPin, Globe, Eye, EyeOff, ArrowLeft, Calendar, Users } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { GradientBg } from '@/components/ui/gradient-bg'
import { Badge } from '@/components/ui/badge'

export default function VenueSignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    venueName: '',
    address: '',
    city: '',
    state: '',
    capacity: '',
    venueType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    username: '',
    password: '',
    confirmPassword: '',
    description: '',
    websiteUrl: '',
    referredBy: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Check for referral code in URL
    const refCode = searchParams.get('ref')
    if (refCode) {
      setFormData(prev => ({ ...prev, referredBy: refCode }))
    }
  }, [searchParams])

  const venueTypes = [
    'Music Venue', 'Bar', 'Club', 'Festival', 'Outdoor', 'Other'
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateUsername = (venueName: string) => {
    return venueName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20)
  }

  const handleVenueNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      venueName: value,
      username: generateUsername(value)
    }))
  }

  const validateForm = () => {
    if (!formData.venueName.trim()) return 'Venue name is required'
    if (!formData.address.trim()) return 'Address is required'
    if (!formData.city.trim()) return 'City is required'
    if (!formData.state.trim()) return 'State is required'
    if (!formData.venueType) return 'Venue type is required'
    if (!formData.contactName.trim()) return 'Contact name is required'
    if (!formData.contactEmail.trim()) return 'Contact email is required'
    if (!formData.username.trim()) return 'Username is required'
    if (!formData.password) return 'Password is required'
    if (formData.password.length < 8) return 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match'
    if (!formData.description.trim()) return 'Description is required'
    if (!formData.agreeToTerms) return 'You must agree to the Terms of Service and Privacy Policy'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.contactEmail)) return 'Please enter a valid email address'
    
    // Username validation
    if (formData.username.length < 3) return 'Username must be at least 3 characters'
    if (!/^[a-z0-9]+$/.test(formData.username)) return 'Username can only contain lowercase letters and numbers'
    
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsLoading(true)

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.contactEmail,
        password: formData.password,
        options: {
          data: {
            display_name: formData.venueName,
            role: 'venue_owner',
            first_name: formData.contactName.split(' ')[0],
            last_name: formData.contactName.split(' ').slice(1).join(' '),
            venue_name: formData.venueName,
            venue_address: formData.address,
            venue_city: formData.city,
            venue_state: formData.state,
            venue_capacity: formData.capacity,
            venue_type: formData.venueType,
            referred_by: formData.referredBy || null,
            username: formData.username,
            description: formData.description,
            website_url: formData.websiteUrl
          }
        }
      })
      
      if (signUpError) {
        setError(signUpError.message)
      } else {
        setError('Success! Check your email to confirm your account and complete your venue profile setup.')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <GradientBg variant="primary">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <Link 
              href="/signup"
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Account Type Selection
            </Link>
            
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Register Your Venue</h1>
            <p className="text-gray-300">Create your venue profile and start connecting with artists and fans</p>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 mt-2">
              Venue Registration
            </Badge>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur border-white/10">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Venue Information Section */}
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Venue Information</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Venue Name
                      </label>
                      <Input
                        type="text"
                        value={formData.venueName}
                        onChange={(e) => handleVenueNameChange(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          City
                        </label>
                        <Input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          State
                        </label>
                        <Input
                          type="text"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Capacity
                        </label>
                        <Input
                          type="number"
                          value={formData.capacity}
                          onChange={(e) => handleInputChange('capacity', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="e.g. 200"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Venue Type
                      </label>
                      <select
                        value={formData.venueType}
                        onChange={(e) => handleInputChange('venueType', e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                        required
                      >
                        <option value="" className="bg-gray-800">Select a venue type</option>
                        {venueTypes.map((type) => (
                          <option key={type} value={type} className="bg-gray-800">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="border-t border-white/10 pt-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Contact Name
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange('contactName', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            type="email"
                            value={formData.contactEmail}
                            onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                            className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account Information Section */}
                  <div className="border-t border-white/10 pt-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Username
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-white/20 bg-white/5 text-gray-300 text-sm">
                          truefanconnect.com/
                        </span>
                        <Input
                          type="text"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                          className="rounded-l-none bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Choose a unique username for your venue profile URL (no spaces or special characters allowed).
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Minimum 8 characters</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-white"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Venue Profile Section */}
                  <div className="border-t border-white/10 pt-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Venue Profile</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                        placeholder="Tell us about your venue, the types of music you feature, and what makes your space special..."
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Website URL (optional)
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          type="url"
                          value={formData.websiteUrl}
                          onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="https://your-venue-website.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Referral Information */}
                  {formData.referredBy && (
                    <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3 text-sm text-blue-200 mb-4">
                      <p>You were referred by a partner! You'll both earn referral bonuses on donations processed at your venue.</p>
                    </div>
                  )}

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500"
                      required
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                      I agree to the{' '}
                      <Link href="/terms" className="text-yellow-400 hover:text-yellow-300 underline">
                        Terms of Service
                      </Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-yellow-400 hover:text-yellow-300 underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>

                  {error && (
                    <div className={`text-sm border rounded-lg p-3 ${
                      error.includes('Success') 
                        ? 'text-green-400 bg-green-400/10 border-green-400/20'
                        : 'text-red-400 bg-red-400/10 border-red-400/20'
                    }`}>
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Creating Venue Account...
                      </div>
                    ) : (
                      'Create Venue Account'
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-300 hover:text-white transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </GradientBg>
  )
}