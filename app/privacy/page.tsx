'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Users, Download, Mail } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

export default function PrivacyPage() {
  const lastUpdated = 'December 15, 2024'

  const sections = [
    {
      title: 'Information We Collect',
      icon: Eye,
      content: [
        'Account information (name, email, profile details)',
        'Location data when using geolocation features',
        'Payment information for donations (processed securely)',
        'Usage data and analytics to improve our service',
        'Device information and browser data'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Users,
      content: [
        'Provide and improve our geolocation services',
        'Process donations and payments securely',
        'Send important updates and notifications',
        'Analyze usage patterns to enhance user experience',
        'Comply with legal obligations and prevent fraud'
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'Industry-standard encryption for all data transmission',
        'Secure payment processing through certified providers',
        'Regular security audits and vulnerability assessments',
        'Limited access to personal data on a need-to-know basis',
        'Secure data centers with physical and digital protection'
      ]
    },
    {
      title: 'Your Rights',
      icon: Shield,
      content: [
        'Access and download your personal data',
        'Correct or update your information',
        'Delete your account and associated data',
        'Opt-out of non-essential communications',
        'Control location sharing and privacy settings'
      ]
    }
  ]

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
            Privacy Policy
          </h1>
          <p className="text-xl text-purple-200 mb-4 max-w-3xl mx-auto">
            Your privacy is important to us. This policy explains how we collect, 
            use, and protect your personal information.
          </p>
          <p className="text-gray-300">
            Last updated: {lastUpdated}
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                TrueFans GeoConnect ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our mobile application and website.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                By using our service, you agree to the collection and use of information in 
                accordance with this policy. We will not use or share your information with 
                anyone except as described in this Privacy Policy.
              </p>
              <p className="text-gray-300 leading-relaxed">
                This policy applies to all users of TrueFans GeoConnect, including artists, 
                fans, venue owners, and visitors to our website.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Sections */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <GlassCard variant="elevated" className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">{section.title}</h2>
                </div>
                
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Detailed Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-8 mb-16"
        >
          {/* Location Data */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">Location Data</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                Our core service relies on location data to detect when you're at live music venues. 
                Here's how we handle your location information:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Location data is only collected when you explicitly enable geolocation features</li>
                <li>• We use precise location data only to detect venue proximity and enhance your experience</li>
                <li>• Location history is not stored permanently and is automatically deleted after 30 days</li>
                <li>• You can disable location sharing at any time in your device or app settings</li>
                <li>• Location data is never shared with third parties without your explicit consent</li>
              </ul>
            </div>
          </GlassCard>

          {/* Payment Information */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">Payment Information</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                We take the security of your payment information seriously:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Payment processing is handled by certified, PCI-compliant payment processors</li>
                <li>• We do not store complete credit card numbers or sensitive payment data</li>
                <li>• All payment transactions are encrypted using industry-standard protocols</li>
                <li>• Donation records are maintained for tax and legal compliance purposes</li>
                <li>• Artists receive anonymized donation data unless donors opt to share their information</li>
              </ul>
            </div>
          </GlassCard>

          {/* Third-Party Services */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">Third-Party Services</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                We work with trusted third-party services to provide our features:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Supabase for secure data storage and real-time features</li>
                <li>• Manifest Financial for payment processing</li>
                <li>• Spotify and BandsinTown for music and event data</li>
                <li>• Analytics services to understand usage patterns (anonymized data only)</li>
                <li>• Cloud infrastructure providers for hosting and security</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                These services are bound by their own privacy policies and our data processing agreements.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
            <p className="text-gray-300 mb-6">
              If you have questions about this Privacy Policy or how we handle your data, 
              please contact our privacy team:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">privacy@truefans.ai</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-gray-300">Data Protection Officer</span>
              </div>
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Contact Privacy Team
            </Button>
          </GlassCard>

          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">Your Data Rights</h2>
            <p className="text-gray-300 mb-6">
              You have control over your personal data. Use these tools to manage 
              your privacy settings and data:
            </p>
            <div className="space-y-3">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download My Data
              </Button>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Eye className="w-4 h-4 mr-2" />
                Privacy Settings
              </Button>
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                <Shield className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}