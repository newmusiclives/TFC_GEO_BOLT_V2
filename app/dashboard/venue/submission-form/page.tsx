'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Code, 
  Copy, 
  Eye, 
  Settings, 
  Music, 
  Calendar, 
  Users, 
  Mail,
  CheckCircle,
  ExternalLink,
  Download,
  Palette,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'

export default function SubmissionFormPage() {
  const [formSettings, setFormSettings] = useState({
    venueId: 'blue-note-nyc',
    venueName: 'The Blue Note',
    primaryColor: '#F98017',
    accentColor: '#48517F',
    backgroundColor: '#162961',
    textColor: '#FFFFFF',
    borderRadius: '8',
    showVenueLogo: true,
    showVenueInfo: true,
    requireApproval: true,
    allowFileUploads: true,
    customMessage: 'Submit your music for consideration at The Blue Note. We review all submissions and will contact you within 5-7 business days.',
    notificationEmail: 'bookings@bluenote.com',
    autoReply: true
  })

  const [activeTab, setActiveTab] = useState('customize')
  const [previewDevice, setPreviewDevice] = useState('desktop')

  const generateEmbedCode = () => {
    const config = encodeURIComponent(JSON.stringify({
      venueId: formSettings.venueId,
      primaryColor: formSettings.primaryColor,
      accentColor: formSettings.accentColor,
      backgroundColor: formSettings.backgroundColor,
      textColor: formSettings.textColor,
      borderRadius: formSettings.borderRadius,
      showVenueLogo: formSettings.showVenueLogo,
      showVenueInfo: formSettings.showVenueInfo,
      customMessage: formSettings.customMessage
    }))

    return `<!-- TrueFans GeoConnect - Live Music Submission Form -->
<div id="truefans-submission-form"></div>
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://embed.truefans.ai/submission-form.js';
    script.setAttribute('data-venue-config', '${config}');
    script.async = true;
    document.head.appendChild(script);
  })();
</script>
<!-- End TrueFans GeoConnect Embed -->`
  }

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode())
    // You could add a toast notification here
  }

  const handleSettingChange = (key: string, value: any) => {
    setFormSettings(prev => ({ ...prev, [key]: value }))
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Live Music Submission Form</h1>
                <p className="text-gray-300">Create an embeddable form for your venue website</p>
              </div>
              <div className="flex gap-3">
                <Link href="/dashboard/venue">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Configuration Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid w-full grid-cols-3 bg-white/10 border border-white/20">
                  <TabsTrigger value="customize" className="data-[state=active]:bg-purple-600">
                    <Palette className="w-4 h-4 mr-2" />
                    Customize
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-purple-600">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger value="embed" className="data-[state=active]:bg-purple-600">
                    <Code className="w-4 h-4 mr-2" />
                    Embed
                  </TabsTrigger>
                </TabsList>

                {/* Customize Tab */}
                <TabsContent value="customize">
                  <GlassCard variant="elevated">
                    <div className="p-6 space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Visual Customization</h3>
                      
                      {/* Color Settings */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Primary Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={formSettings.primaryColor}
                              onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                              className="w-12 h-10 rounded border border-white/20 bg-transparent"
                            />
                            <Input
                              value={formSettings.primaryColor}
                              onChange={(e) => handleSettingChange('primaryColor', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Accent Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={formSettings.accentColor}
                              onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                              className="w-12 h-10 rounded border border-white/20 bg-transparent"
                            />
                            <Input
                              value={formSettings.accentColor}
                              onChange={(e) => handleSettingChange('accentColor', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Background Color
                          </label>
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={formSettings.backgroundColor}
                              onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                              className="w-12 h-10 rounded border border-white/20 bg-transparent"
                            />
                            <Input
                              value={formSettings.backgroundColor}
                              onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                              className="bg-white/10 border-white/20 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Border Radius (px)
                          </label>
                          <Input
                            type="number"
                            value={formSettings.borderRadius}
                            onChange={(e) => handleSettingChange('borderRadius', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                            min="0"
                            max="20"
                          />
                        </div>
                      </div>

                      {/* Display Options */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-white">Display Options</h4>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Show Venue Logo</div>
                            <div className="text-sm text-gray-400">Display your venue logo in the form header</div>
                          </div>
                          <button
                            onClick={() => handleSettingChange('showVenueLogo', !formSettings.showVenueLogo)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              formSettings.showVenueLogo ? 'bg-purple-500' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                formSettings.showVenueLogo ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Show Venue Info</div>
                            <div className="text-sm text-gray-400">Display venue name and basic information</div>
                          </div>
                          <button
                            onClick={() => handleSettingChange('showVenueInfo', !formSettings.showVenueInfo)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              formSettings.showVenueInfo ? 'bg-purple-500' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                formSettings.showVenueInfo ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Custom Message */}
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Custom Message
                        </label>
                        <textarea
                          value={formSettings.customMessage}
                          onChange={(e) => handleSettingChange('customMessage', e.target.value)}
                          rows={3}
                          className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                          placeholder="Enter a custom message for artists..."
                        />
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings">
                  <GlassCard variant="elevated">
                    <div className="p-6 space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Form Settings</h3>
                      
                      {/* Venue Information */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Venue Name
                          </label>
                          <Input
                            value={formSettings.venueName}
                            onChange={(e) => handleSettingChange('venueName', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Notification Email
                          </label>
                          <Input
                            type="email"
                            value={formSettings.notificationEmail}
                            onChange={(e) => handleSettingChange('notificationEmail', e.target.value)}
                            className="bg-white/10 border-white/20 text-white"
                            placeholder="bookings@yourvenue.com"
                          />
                        </div>
                      </div>

                      {/* Form Behavior */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-white">Form Behavior</h4>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Require Approval</div>
                            <div className="text-sm text-gray-400">All submissions need manual approval</div>
                          </div>
                          <button
                            onClick={() => handleSettingChange('requireApproval', !formSettings.requireApproval)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              formSettings.requireApproval ? 'bg-purple-500' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                formSettings.requireApproval ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Allow File Uploads</div>
                            <div className="text-sm text-gray-400">Let artists upload press kits and media</div>
                          </div>
                          <button
                            onClick={() => handleSettingChange('allowFileUploads', !formSettings.allowFileUploads)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              formSettings.allowFileUploads ? 'bg-purple-500' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                formSettings.allowFileUploads ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-white">Auto-Reply</div>
                            <div className="text-sm text-gray-400">Send automatic confirmation emails</div>
                          </div>
                          <button
                            onClick={() => handleSettingChange('autoReply', !formSettings.autoReply)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              formSettings.autoReply ? 'bg-purple-500' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                formSettings.autoReply ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>

                {/* Embed Tab */}
                <TabsContent value="embed">
                  <GlassCard variant="elevated">
                    <div className="p-6 space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Embed Code</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Copy this code to your website
                        </label>
                        <div className="relative">
                          <pre className="bg-black/50 border border-white/20 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
                            <code>{generateEmbedCode()}</code>
                          </pre>
                          <Button
                            onClick={copyEmbedCode}
                            size="sm"
                            className="absolute top-2 right-2 bg-purple-600 hover:bg-purple-700"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-lg font-medium text-white">Integration Instructions</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <p>1. Copy the embed code above</p>
                          <p>2. Paste it into your website's HTML where you want the form to appear</p>
                          <p>3. The form will automatically load and match your venue's branding</p>
                          <p>4. Submissions will be sent to your notification email</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="bg-purple-600 hover:bg-purple-700">
                          <Download className="w-4 h-4 mr-2" />
                          Download HTML File
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Documentation
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard variant="elevated">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-white">Live Preview</h3>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                        onClick={() => setPreviewDevice('desktop')}
                        className={previewDevice === 'desktop' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                      >
                        <Monitor className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                        onClick={() => setPreviewDevice('tablet')}
                        className={previewDevice === 'tablet' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                      >
                        <Tablet className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                        onClick={() => setPreviewDevice('mobile')}
                        className={previewDevice === 'mobile' ? 'bg-purple-600' : 'border-white/20 text-white hover:bg-white/10'}
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Preview Container */}
                  <div className="bg-gray-100 rounded-lg p-4 min-h-[600px]">
                    <div className={`mx-auto transition-all duration-300 ${
                      previewDevice === 'desktop' ? 'max-w-full' :
                      previewDevice === 'tablet' ? 'max-w-md' :
                      'max-w-sm'
                    }`}>
                      <SubmissionFormPreview settings={formSettings} />
                    </div>
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

// Preview Component
function SubmissionFormPreview({ settings }: { settings: any }) {
  return (
    <div 
      className="rounded-lg p-6 shadow-lg"
      style={{ 
        backgroundColor: settings.backgroundColor,
        borderRadius: `${settings.borderRadius}px`,
        color: settings.textColor
      }}
    >
      {/* Header */}
      {settings.showVenueInfo && (
        <div className="text-center mb-6">
          {settings.showVenueLogo && (
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8" style={{ color: settings.primaryColor }} />
            </div>
          )}
          <h2 className="text-2xl font-bold mb-2">{settings.venueName}</h2>
          <p className="text-sm opacity-80">Live Music Submission</p>
        </div>
      )}

      {/* Custom Message */}
      {settings.customMessage && (
        <div className="mb-6 p-4 rounded-lg bg-white/10">
          <p className="text-sm">{settings.customMessage}</p>
        </div>
      )}

      {/* Form Fields */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Artist Name *</label>
            <input 
              type="text" 
              className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
              placeholder="Your artist name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Genre *</label>
            <select className="w-full p-3 rounded bg-white/10 border border-white/20 text-white">
              <option>Select genre</option>
              <option>Rock</option>
              <option>Jazz</option>
              <option>Electronic</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <input 
            type="email" 
            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Preferred Date</label>
          <input 
            type="date" 
            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea 
            rows={3}
            className="w-full p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400 resize-none"
            placeholder="Tell us about your music..."
          />
        </div>

        {settings.allowFileUploads && (
          <div>
            <label className="block text-sm font-medium mb-2">Press Kit / Media</label>
            <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
              <div className="text-sm text-gray-400">
                Drop files here or click to upload
              </div>
            </div>
          </div>
        )}

        <button 
          className="w-full py-3 rounded font-medium transition-colors"
          style={{ 
            backgroundColor: settings.primaryColor,
            color: 'white'
          }}
        >
          Submit Application
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-white/20 text-center">
        <p className="text-xs opacity-60">
          Powered by TrueFans GeoConnect
        </p>
      </div>
    </div>
  )
}