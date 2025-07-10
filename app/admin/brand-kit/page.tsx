'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Download, Image, FileText, Layers, Copy, ExternalLink } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card' 
import { Button } from '@/components/ui/button' 
import { Badge } from '@/components/ui/badge'
import Link from 'next/link' 

// Define specific types for each category
interface LogoAsset {
  name: string;
  format: string;
  size: string;
  preview: string;
}

interface ColorAsset {
  name: string;
  hex: string;
  rgb: string;
}

interface TypographyAsset {
  name: string;
  family: string;
  weights: string;
  usage: string;
}

interface IconAsset {
  name: string;
  format: string;
  count: string;
  size: string;
}

interface BrandAssetCategory {
  category: string;
  items: LogoAsset[] | ColorAsset[] | TypographyAsset[] | IconAsset[];
}

export default function BrandKitPage() {
  const brandAssets: BrandAssetCategory[] = [
    {
      category: 'Logos',
      items: [
        { name: 'Primary Logo', format: 'SVG, PNG', size: '2.4 MB', preview: '/logo-primary.svg' },
        { name: 'Logo Mark', format: 'SVG, PNG', size: '1.8 MB', preview: '/logo-mark.svg' },
        { name: 'Logo White', format: 'SVG, PNG', size: '2.1 MB', preview: '/logo-white.svg' },
        { name: 'Logo Dark', format: 'SVG, PNG', size: '2.0 MB', preview: '/logo-dark.svg' }
      ] as LogoAsset[]
    },
    {
      category: 'Colors',
      items: [
        { name: 'Primary Purple', hex: '#8B5CF6', rgb: '139, 92, 246' },
        { name: 'Secondary Pink', hex: '#EC4899', rgb: '236, 72, 153' },
        { name: 'Accent Blue', hex: '#3B82F6', rgb: '59, 130, 246' },
        { name: 'Success Green', hex: '#10B981', rgb: '16, 185, 129' },
        { name: 'Warning Yellow', hex: '#F59E0B', rgb: '245, 158, 11' },
        { name: 'Error Red', hex: '#EF4444', rgb: '239, 68, 68' }
      ] as ColorAsset[]
    },
    {
      category: 'Typography',
      items: [
        { name: 'Primary Font', family: 'Inter', weights: '400, 500, 600, 700', usage: 'Body text, UI elements' },
        { name: 'Display Font', family: 'Inter', weights: '700, 800, 900', usage: 'Headings, titles' }
      ] as TypographyAsset[]
    },
    {
      category: 'Icons',
      items: [
        { name: 'Music Icon Set', format: 'SVG', count: '24 icons', size: '1.2 MB' },
        { name: 'UI Icon Set', format: 'SVG', count: '48 icons', size: '2.8 MB' },
        { name: 'Social Icons', format: 'SVG', count: '12 icons', size: '0.8 MB' }
      ] as IconAsset[]
    }
  ]

  const guidelines = [
    {
      title: 'Logo Usage',
      description: 'Guidelines for proper logo placement, sizing, and clear space requirements.',
      icon: Image
    },
    {
      title: 'Color Palette',
      description: 'Official brand colors with hex codes, RGB values, and usage guidelines.',
      icon: Palette
    },
    {
      title: 'Typography',
      description: 'Font families, weights, and hierarchy for consistent text styling.',
      icon: FileText
    },
    {
      title: 'Voice & Tone',
      description: 'Brand personality, messaging guidelines, and communication style.',
      icon: Layers
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
                <h1 className="text-3xl font-bold text-white mb-2">Brand Kit</h1>
                <p className="text-gray-300">Download brand assets and access usage guidelines</p>
              </div>
              <div className="flex gap-3">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download All Assets
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
            {/* Brand Assets */}
            <div className="lg:col-span-2 space-y-8">
              {brandAssets.map((category, categoryIndex) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * categoryIndex }}
                >
                  <GlassCard variant="elevated">
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-6">{category.category}</h3>
                      
                      {category.category === 'Colors' ? (
                        <div className="grid md:grid-cols-2 gap-4">
                          {(category.items as ColorAsset[]).map((color, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                              <div 
                                className="w-12 h-12 rounded-lg border border-white/20"
                                style={{ backgroundColor: color.hex }}
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-white">{color.name}</h4>
                                <p className="text-sm text-gray-400">{color.hex}</p>
                                <p className="text-sm text-gray-400">RGB: {color.rgb}</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-white/20 text-white hover:bg-white/10"
                                onClick={() => navigator.clipboard.writeText(color.hex)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : category.category === 'Typography' ? (
                        <div className="space-y-4">
                          {(category.items as TypographyAsset[]).map((font, index) => (
                            <div key={index} className="p-4 bg-white/5 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-white">{font.name}</h4>
                                <Badge variant="outline" className="border-purple-400/30 text-purple-300">
                                  {font.family}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{font.usage}</p>
                              <p className="text-sm text-gray-300">Weights: {font.weights}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid md:grid-cols-2 gap-4">
                          {(category.items as (LogoAsset | IconAsset)[]).map((item, index) => (
                            <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-medium text-white">{item.name}</h4>
                                <Button
                                  size="sm"
                                  className="bg-purple-600 hover:bg-purple-700"
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                              <div className="space-y-1 text-sm text-gray-400">
                                {'format' in item && <p>Format: {item.format}</p>}
                                {'size' in item && <p>Size: {item.size}</p>}
                                {'count' in item && <p>Count: {item.count}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Guidelines Sidebar */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Brand Guidelines</h3>
                    <div className="space-y-3">
                      {guidelines.map((guideline, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                          <div className="flex items-start gap-3">
                            <guideline.icon className="w-5 h-5 text-purple-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-white mb-1">{guideline.title}</h4>
                              <p className="text-xs text-gray-400">{guideline.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Full Guidelines
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Logo Package
                      </Button>
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                        <Palette className="w-4 h-4 mr-2" />
                        Color Swatches
                      </Button>
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        Style Guide PDF
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Usage Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <GlassCard variant="elevated">
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Usage Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Downloads Today</span>
                        <span className="text-white font-medium">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">This Month</span>
                        <span className="text-white font-medium">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Most Popular</span>
                        <span className="text-purple-300">Primary Logo</span>
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