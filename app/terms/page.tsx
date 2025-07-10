'use client'

import { motion } from 'framer-motion'
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'

export default function TermsPage() {
  const lastUpdated = 'December 15, 2024'

  const quickSummary = [
    {
      title: 'Service Usage',
      description: 'Use our platform responsibly and in accordance with applicable laws',
      icon: CheckCircle
    },
    {
      title: 'Account Security',
      description: 'Keep your account credentials secure and notify us of any unauthorized access',
      icon: Shield
    },
    {
      title: 'Payment Terms',
      description: 'Donations are final, fees are clearly disclosed, and payments are processed securely',
      icon: Scale
    },
    {
      title: 'Content Guidelines',
      description: 'Respect intellectual property and maintain appropriate conduct on our platform',
      icon: AlertTriangle
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
            Terms of Service
          </h1>
          <p className="text-xl text-purple-200 mb-4 max-w-3xl mx-auto">
            These terms govern your use of TrueFans GeoConnect. Please read them carefully 
            before using our platform.
          </p>
          <p className="text-gray-300">
            Last updated: {lastUpdated}
          </p>
        </motion.div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Quick Summary</h2>
            <p className="text-gray-300">
              Here are the key points you should know about using our service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickSummary.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <GlassCard variant="elevated" className="text-center h-full">
                  <item.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Terms Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-8 mb-16"
        >
          {/* Acceptance of Terms */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">1. Acceptance of Terms</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                By accessing or using TrueFans GeoConnect ("the Service"), you agree to be bound by these 
                Terms of Service ("Terms"). If you disagree with any part of these terms, you may not 
                access the Service.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                These Terms apply to all visitors, users, and others who access or use the Service, 
                including artists, fans, venue owners, and any other participants in our platform.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to update these Terms at any time. We will notify users of any 
                material changes via email or through the Service.
              </p>
            </div>
          </GlassCard>

          {/* Service Description */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">2. Service Description</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                TrueFans GeoConnect is a platform that uses geolocation technology to connect music fans 
                with live performances and enable real-time donations to artists. Our services include:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Geolocation-based detection of live music events</li>
                <li>• Real-time donation processing to artists</li>
                <li>• Artist profile and show management tools</li>
                <li>• Fan engagement and community features</li>
                <li>• Venue partnership and integration services</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                The Service is provided "as is" and we make no warranties about the availability, 
                accuracy, or reliability of the Service.
              </p>
            </div>
          </GlassCard>

          {/* User Accounts */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">3. User Accounts</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                To access certain features of the Service, you must create an account. You agree to:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Provide accurate, current, and complete information</li>
                <li>• Maintain the security of your password and account</li>
                <li>• Notify us immediately of any unauthorized use</li>
                <li>• Accept responsibility for all activities under your account</li>
                <li>• Use the Service only for lawful purposes</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these Terms or 
                engage in fraudulent, abusive, or illegal activities.
              </p>
            </div>
          </GlassCard>

          {/* Payment Terms */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">4. Payment Terms</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                Our payment system enables donations from fans to artists. Key terms include:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• All donations are voluntary and final</li>
                <li>• Platform fees are clearly disclosed before payment</li>
                <li>• Payment processing is handled by certified third-party providers</li>
                <li>• Artists must complete verification to receive payments</li>
                <li>• Refunds are only available in cases of technical error or fraud</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                By making a donation, you authorize us to charge your payment method for the 
                specified amount plus any applicable fees.
              </p>
            </div>
          </GlassCard>

          {/* Privacy and Data */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">5. Privacy and Data</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                Your privacy is important to us. Our collection and use of personal information 
                is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                By using the Service, you consent to the collection and use of your information 
                as described in our Privacy Policy, including:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Location data for geolocation features</li>
                <li>• Payment information for donation processing</li>
                <li>• Usage data for service improvement</li>
                <li>• Communication preferences and history</li>
              </ul>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <ExternalLink className="w-4 h-4 mr-2" />
                Read Privacy Policy
              </Button>
            </div>
          </GlassCard>

          {/* Prohibited Uses */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">6. Prohibited Uses</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                You may not use the Service for any unlawful purpose or in any way that could 
                damage, disable, or impair the Service. Prohibited activities include:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Fraudulent or deceptive practices</li>
                <li>• Harassment, abuse, or harmful conduct toward other users</li>
                <li>• Attempting to gain unauthorized access to the Service</li>
                <li>• Distributing malware, viruses, or harmful code</li>
                <li>• Violating intellectual property rights</li>
                <li>• Circumventing security measures or geolocation features</li>
                <li>• Creating fake accounts or impersonating others</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Violation of these terms may result in immediate termination of your account 
                and legal action if necessary.
              </p>
            </div>
          </GlassCard>

          {/* Limitation of Liability */}
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">7. Limitation of Liability</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                To the fullest extent permitted by law, TrueFans GeoConnect shall not be liable 
                for any indirect, incidental, special, consequential, or punitive damages, including 
                but not limited to:
              </p>
              <ul className="text-gray-300 space-y-2 mb-4">
                <li>• Loss of profits, data, or business opportunities</li>
                <li>• Service interruptions or technical failures</li>
                <li>• Errors in geolocation detection</li>
                <li>• Third-party payment processing issues</li>
                <li>• User-generated content or interactions</li>
              </ul>
              <p className="text-gray-300 leading-relaxed">
                Our total liability for any claims arising from the Service shall not exceed 
                the amount you paid to us in the twelve months preceding the claim.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <GlassCard variant="elevated">
            <h2 className="text-2xl font-bold text-white mb-6">Questions About These Terms?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              If you have any questions about these Terms of Service, please contact our legal team. 
              We're here to help clarify any concerns you may have.
            </p>
            <div className="flex gap-4 justify-center">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Contact Legal Team
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <FileText className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}