'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Music, Upload, Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface SubmissionFormWidgetProps {
  venueId: string
  venueName: string
  primaryColor?: string
  accentColor?: string
  backgroundColor?: string
  textColor?: string
  borderRadius?: string
  showVenueLogo?: boolean
  showVenueInfo?: boolean
  customMessage?: string
  allowFileUploads?: boolean
}

export function SubmissionFormWidget({
  venueId,
  venueName,
  primaryColor = '#F98017',
  accentColor = '#48517F',
  backgroundColor = '#162961',
  textColor = '#FFFFFF',
  borderRadius = '8',
  showVenueLogo = true,
  showVenueInfo = true,
  customMessage = '',
  allowFileUploads = true
}: SubmissionFormWidgetProps) {
  const [formData, setFormData] = useState({
    artistName: '',
    genre: '',
    email: '',
    phone: '',
    preferredDate: '',
    message: '',
    website: '',
    socialLinks: ''
  })
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-lg p-8 shadow-lg text-center"
        style={{ 
          backgroundColor: backgroundColor,
          borderRadius: `${borderRadius}px`,
          color: textColor
        }}
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
             style={{ backgroundColor: primaryColor }}>
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Submission Received!</h3>
        <p className="opacity-80 mb-6">
          Thank you for your submission. We'll review your application and get back to you within 5-7 business days.
        </p>
        <Button
          onClick={() => setIsSubmitted(false)}
          style={{ backgroundColor: primaryColor }}
          className="text-white"
        >
          Submit Another
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg p-6 shadow-lg max-w-2xl mx-auto"
      style={{ 
        backgroundColor: backgroundColor,
        borderRadius: `${borderRadius}px`,
        color: textColor
      }}
    >
      {/* Header */}
      {showVenueInfo && (
        <div className="text-center mb-6">
          {showVenueLogo && (
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                 style={{ backgroundColor: `${primaryColor}20` }}>
              <Music className="w-8 h-8" style={{ color: primaryColor }} />
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{venueName}</h2>
          <p className="text-sm opacity-80">Live Music Submission</p>
        </div>
      )}

      {/* Custom Message */}
      {customMessage && (
        <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: `${primaryColor}20` }}>
          <p className="text-sm">{customMessage}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Artist Name *</label>
            <Input
              value={formData.artistName}
              onChange={(e) => handleInputChange('artistName', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="Your artist name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Genre *</label>
            <select 
              value={formData.genre}
              onChange={(e) => handleInputChange('genre', e.target.value)}
              className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
              required
            >
              <option value="">Select genre</option>
              <option value="rock">Rock</option>
              <option value="jazz">Jazz</option>
              <option value="blues">Blues</option>
              <option value="electronic">Electronic</option>
              <option value="folk">Folk</option>
              <option value="hip-hop">Hip Hop</option>
              <option value="country">Country</option>
              <option value="classical">Classical</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>

        {/* Performance Details */}
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Performance Date</label>
          <Input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => handleInputChange('preferredDate', e.target.value)}
            className="bg-white/10 border-white/20 text-white"
          />
        </div>

        {/* Online Presence */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Website</label>
            <Input
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Social Media</label>
            <Input
              value={formData.socialLinks}
              onChange={(e) => handleInputChange('socialLinks', e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
              placeholder="@yourusername or links"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-2">Tell us about your music</label>
          <textarea
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={4}
            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none"
            placeholder="Describe your style, experience, and what makes your performance special..."
          />
        </div>

        {/* File Upload */}
        {allowFileUploads && (
          <div>
            <label className="block text-sm font-medium mb-2">Press Kit / Media (Optional)</label>
            <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-white/50 transition-colors">
              <Upload className="w-8 h-8 mx-auto mb-2 opacity-60" />
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp3,.wav"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-sm opacity-80 mb-1">
                  Drop files here or click to upload
                </div>
                <div className="text-xs opacity-60">
                  PDF, DOC, images, or audio files (max 10MB each)
                </div>
              </label>
              {files.length > 0 && (
                <div className="mt-3 text-sm">
                  {files.map((file, index) => (
                    <div key={index} className="opacity-80">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 text-white font-medium transition-all"
          style={{ backgroundColor: primaryColor }}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Submitting...
            </div>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Application
            </>
          )}
        </Button>
      </form>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/20 text-center">
        <p className="text-xs opacity-60">
          Powered by TrueFans GeoConnect
        </p>
      </div>
    </motion.div>
  )
}