'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, MapPin, Clock, Zap } from 'lucide-react'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { GEOLOCATION_CONFIG } from '@/lib/constants'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'

interface GeoSettings {
  radius: number
  timeWindow: number
  highAccuracy: boolean
  autoDetect: boolean
}

interface GeoSettingsProps {
  onSettingsChange?: (settings: GeoSettings) => void
  onClose?: () => void
}

export function GeoSettings({ onSettingsChange, onClose }: GeoSettingsProps) {
  const [settings, setSettings] = useLocalStorage<GeoSettings>('truefans_geo_settings', {
    radius: GEOLOCATION_CONFIG.defaultRadius,
    timeWindow: GEOLOCATION_CONFIG.timeWindow,
    highAccuracy: GEOLOCATION_CONFIG.highAccuracy,
    autoDetect: true
  })

  const handleSettingChange = (key: keyof GeoSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    onSettingsChange?.(newSettings)
  }

  const handleSave = () => {
    onClose?.()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        <GlassCard variant="elevated">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Geolocation Settings</h2>
                <p className="text-gray-300">Customize how we find shows near you</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Search Radius */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white">Search Radius</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  How far from your location should we search for shows?
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {GEOLOCATION_CONFIG.radiusOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSettingChange('radius', option.value)}
                      className={`p-4 rounded-lg border transition-all ${
                        settings.radius === option.value
                          ? 'border-purple-400 bg-purple-500/20 text-white'
                          : 'border-white/20 bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs opacity-75">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Window */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Time Window</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  How many hours before/after now should we include shows?
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[2, 4, 8].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => handleSettingChange('timeWindow', hours)}
                      className={`p-4 rounded-lg border transition-all ${
                        settings.timeWindow === hours
                          ? 'border-blue-400 bg-blue-500/20 text-white'
                          : 'border-white/20 bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <div className="font-medium">{hours} hours</div>
                      <div className="text-xs opacity-75">
                        {hours === 2 ? 'Current shows' : hours === 4 ? 'Recommended' : 'Extended'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accuracy Settings */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <h3 className="text-lg font-semibold text-white">Detection Settings</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="font-medium text-white">High Accuracy GPS</div>
                      <div className="text-sm text-gray-400">
                        More precise location but uses more battery
                      </div>
                    </div>
                    <button
                      onClick={() => handleSettingChange('highAccuracy', !settings.highAccuracy)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.highAccuracy ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.highAccuracy ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Auto-Detect on App Open</div>
                      <div className="text-sm text-gray-400">
                        Automatically search for shows when you open the app
                      </div>
                    </div>
                    <button
                      onClick={() => handleSettingChange('autoDetect', !settings.autoDetect)}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.autoDetect ? 'bg-purple-500' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          settings.autoDetect ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Current Settings Summary */}
              <div className="p-4 bg-purple-500/10 border border-purple-400/30 rounded-lg">
                <h4 className="font-medium text-white mb-2">Current Settings</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-purple-500/20 text-purple-300">
                    {GEOLOCATION_CONFIG.radiusOptions.find(r => r.value === settings.radius)?.label} radius
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-300">
                    {settings.timeWindow}h window
                  </Badge>
                  <Badge className="bg-yellow-500/20 text-yellow-300">
                    {settings.highAccuracy ? 'High' : 'Standard'} accuracy
                  </Badge>
                  <Badge className="bg-green-500/20 text-green-300">
                    Auto-detect {settings.autoDetect ? 'on' : 'off'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8">
              <Button 
                onClick={handleSave}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                Save Settings
              </Button>
              {onClose && (
                <Button 
                  onClick={onClose}
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}