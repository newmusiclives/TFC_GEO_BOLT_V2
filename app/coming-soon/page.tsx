"use client";

import { GradientBg } from '@/components/ui/gradient-bg';
import { GlassCard } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Mail, Music, Heart, Clock, Instagram, Twitter, Facebook } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/truefans', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/truefans', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/truefans', label: 'Facebook' },
];

export default function ComingSoonPage() {
  return (
    <GradientBg variant="primary">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center min-h-screen">
        {/* Hero Section */}
        <GlassCard variant="elevated" size="lg" className="w-full max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                The Future of Live Music Engagement
              </h1>
              <p className="text-purple-300 text-sm md:text-base">
                Empowering fans and artists with real-time support, discovery, and connection—right where the music happens.
              </p>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg font-semibold mb-6 inline-flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2" />
            Coming Soon
          </Badge>
        </GlassCard>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full mx-auto mb-12">
          <GlassCard variant="minimal" className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Smart Show Detection</h4>
            <p className="text-gray-300 text-sm">
              Instantly discover live performances near you with advanced geolocation.
            </p>
          </GlassCard>
          <GlassCard variant="minimal" className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Direct Artist Support</h4>
            <p className="text-gray-300 text-sm">
              Send secure, instant donations to artists during their shows.
            </p>
          </GlassCard>
          <GlassCard variant="minimal" className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-white mb-2">Real-Time Impact</h4>
            <p className="text-gray-300 text-sm">
              See your support make a difference, live and on stage.
            </p>
          </GlassCard>
        </div>

        {/* Signup Section */}
        <GlassCard variant="elevated" size="lg" className="w-full max-w-2xl mx-auto text-center mb-12">
          <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Mail className="w-6 h-6 text-purple-400" />
            Join the Early Access List
          </h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Be the first to experience the next era of live music. Sign up for exclusive updates and early access.
          </p>
          <div className="w-full h-[500px] relative rounded-2xl overflow-hidden border-2 border-white/10">
            <iframe
              src="https://track.newmusiclives.com/widget/form/kV4YXpdHZWU0ybxHRLl3"
              className="w-full h-full border-0 rounded-2xl bg-white/5"
              title="TrueFans CONNECT - Early Access Signup"
              allowFullScreen
            />
          </div>
        </GlassCard>

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="text-gray-400 text-xs text-center mb-2">
          <p>© 2025 TrueFans CONNECT™. All rights reserved.</p>
        </div>
      </div>
    </GradientBg>
  );
} 