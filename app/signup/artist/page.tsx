'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Music, MapPin, Globe, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { GradientBg } from '@/components/ui/gradient-bg'
import { Badge } from '@/components/ui/badge'

export default function ArtistSignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    stageName: '',
    location: '',
    musicGenre: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    websiteUrl: '',
    spotifyId: '',
    bandsinTownId: '',
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

  const musicGenres = [
    'Rock', 'Pop', 'Hip Hop', 'Electronic', 'Jazz', 'Blues', 'Country', 
    'Folk', 'Classical', 'R&B', 'Reggae', 'Punk', 'Metal', 'Indie', 
    'Alternative', 'Funk', 'Soul', 'Gospel', 'Latin', 'World', 'Other'
  ]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const generateUsername = (stageName: string) => {
    return stageName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .substring(0, 20)
  }

  const handleStageNameChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      stageName: value,
      username: generateUsername(value)
    }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required'
    if (!formData.lastName.trim()) return 'Last name is required'
    if (!formData.stageName.trim()) return 'Stage name is required'
    if (!formData.location.trim()) return 'Location is required'
    if (!formData.musicGenre) return 'Music genre is required'
    if (!formData.username.trim()) return 'Username is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!formData.password) return 'Password is required'
    if (formData.password.length < 8) return 'Password must be at least 8 characters'
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match'
    if (!formData.bio.trim()) return 'Bio is required'
    if (!formData.agreeToTerms) return 'You must agree to the Terms of Service and Privacy Policy'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address'
    
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
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            display_name: formData.stageName,
            role: 'artist',
            first_name: formData.firstName,
            last_name: formData.lastName,
            stage_name: formData.stageName,
            location: formData.location,
            music_genre: formData.musicGenre,
            referred_by: formData.referredBy || null,
            username: formData.username,
            bio: formData.bio,
            website_url: formData.websiteUrl,
            spotify_id: formData.spotifyId
          }
        }
      })
      
      if (signUpError) {
        setError(signUpError.message)
      } else {
        setError('Success! Check your email to confirm your account and complete your artist profile setup.')
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
            className="mb-8"
          >
            <Link 
              href="/signup/artist/benefits"
              className="inline-flex items-center gap-2 text-purple-300 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Artist Benefits
            </Link>
            
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Join as an Artist</h1>
              <p className="text-gray-300">Create your artist profile and start receiving support from fans</p>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 mt-2">
                Artist Registration
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-white/5 backdrop-blur border-white/10">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information Section */}
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-4">Personal Information</h2>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <Input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <Input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Stage Name
                      </label>
                      <Input
                        type="text"
                        value={formData.stageName}
                        onChange={(e) => handleStageNameChange(e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">The name your fans know you by</p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="City, State"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Music Genre
                      </label>
                      <select
                        value={formData.musicGenre}
                        onChange={(e) => handleInputChange('musicGenre', e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                        required
                      >
                        <option value="" className="bg-gray-800">Select a genre</option>
                        {musicGenres.map((genre) => (
                          <option key={genre} value={genre} className="bg-gray-800">
                            {genre}
                          </option>
                        ))}
                      </select>
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
                        Choose a unique username for your profile URL. Consider using your stage name if available (no spaces or special characters allowed).
                      </p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                          required
                        />
                      </div>
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
                        <p className="text-xs text-gray-400 mt-1">Password must be at least 8 characters.</p>
                        <p className="text-xs text-gray-400">Minimum 8 characters</p>
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

                  {/* Artist Profile Section */}
                  <div className="border-t border-white/10 pt-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Artist Profile</h2>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Bio
                      </label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                        placeholder="Tell your fans about yourself"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">Tell your fans about yourself</p>
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
                          placeholder="https://your-website.com"
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        If You Have One Please Add Your Spotify ID (optional)
                      </label>
                      <div className="relative">
                        <Music className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          value={formData.spotifyId}
                          onChange={(e) => handleInputChange('spotifyId', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="1A2B3C4D5E"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Your unique Spotify artist identifier. Find it in your Spotify artist URL after "artist/".
                      </p>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        If You Have One Please Add Your BandsInTown ID (optional)
                      </label>
                      <div className="relative">
                        <Music className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <Input
                          type="text"
                          value={formData.bandsinTownId || ''}
                          onChange={(e) => handleInputChange('bandsinTownId', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                          placeholder="your-artist-name"
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        Your BandsInTown artist identifier. This helps us sync your tour dates and events.
                      </p>
                    </div>
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-white/20 bg-white/10 text-purple-500 focus:ring-purple-500"
                      required
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                  {formData.referredBy && (
                    <div className="bg-purple-500/10 border border-purple-400/20 rounded-lg p-3 text-sm text-purple-200 mb-4">
                      <p>You were referred by a friend! You'll both earn referral bonuses on donations.</p>
                    </div>
                  )}
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
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                    size="lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Creating Artist Account...
                      </div>
                    ) : (
                      'Create Artist Account'
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link href="/login" className="text-purple-300 hover:text-white transition-colors">
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