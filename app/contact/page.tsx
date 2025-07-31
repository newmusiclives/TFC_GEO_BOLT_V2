'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help with your account or technical issues',
      contact: 'support@truesconnect.com',
      action: 'Send Email'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our support team',
      contact: '1-(xxx)-xxx-xxxx',
      action: 'Call Now'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with us in real-time for immediate assistance',
      contact: 'Available 24/7',
      action: 'Start Chat'
    }
  ]

  const offices = [
    {
      city: 'Corrales, NM',
      address: '4101 Corrales Road, Unit 1776',
      state: 'NM 87048',
      phone: '+1 (xxx)-xxx-xxx'
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
            Get in Touch
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Have questions, feedback, or need support? We're here to help. 
            Reach out to us through any of the channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard variant="elevated">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your first name"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your last name"
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <select className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="artist">Artist Questions</option>
                    <option value="venue">Venue Partnership</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                  />
                </div>

                <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </GlassCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <GlassCard variant="elevated">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Methods</h2>
              
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <div key={method.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <method.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{method.title}</h3>
                      <p className="text-gray-300 text-sm mb-2">{method.description}</p>
                      <p className="text-purple-300 font-medium mb-2">{method.contact}</p>
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                        {method.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Office Locations */}
            <GlassCard variant="elevated">
              <h2 className="text-2xl font-bold text-white mb-6">Our Offices</h2>
              
              <div className="space-y-6">
                {offices.map((office, index) => (
                  <div key={office.city} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{office.city}</h3>
                      <p className="text-gray-300 text-sm">{office.address}</p>
                      <p className="text-gray-300 text-sm mb-2">{office.state}</p>
                      <p className="text-purple-300 text-sm">{office.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Support Hours */}
            <GlassCard variant="elevated">
              <h2 className="text-2xl font-bold text-white mb-6">Support Hours</h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-white font-medium">Live Chat & Email</p>
                    <p className="text-gray-300 text-sm">24/7 - Always available</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">Phone Support</p>
                    <p className="text-gray-300 text-sm">Mon-Fri: 9AM-6PM PST</p>
                    <p className="text-gray-300 text-sm">Sat-Sun: 10AM-4PM PST</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <GlassCard variant="elevated">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-300">
                Quick answers to common questions. Can't find what you're looking for? Contact us directly.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">How does geolocation detection work?</h3>
                  <p className="text-gray-300 text-sm">
                    Our advanced PostGIS system detects when you're near or inside a venue hosting a live show, 
                    enabling instant artist support.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Is my payment information secure?</h3>
                  <p className="text-gray-300 text-sm">
                    Yes, we use industry-standard encryption and partner with trusted payment processors 
                    to ensure your information is always protected.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">How do artists receive donations?</h3>
                  <p className="text-gray-300 text-sm">
                    Artists receive donations instantly through our payment system, with transparent 
                    fee structures and real-time analytics.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Can I use this at any venue?</h3>
                  <p className="text-gray-300 text-sm">
                    We're constantly expanding our venue network. If your favorite venue isn't listed, 
                    let us know and we'll work to add them.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                View All FAQs
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </GradientBg>
  )
}