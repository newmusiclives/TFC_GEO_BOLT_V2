"use client";

import { useState } from "react";
import { GradientBg } from '@/components/ui/gradient-bg';
import { GlassCard } from '@/components/ui/glass-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Music, Heart, Clock, Mail, Instagram, Twitter, Facebook } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/truefans', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/truefans', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/truefans', label: 'Facebook' },
];

export default function ComingSoonPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <GradientBg variant="primary">
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard variant="elevated" size="lg" className="max-w-3xl w-full mx-auto text-center">
          {/* Brand and Tagline */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                TrueFans CONNECT™
              </h1>
              <p className="text-purple-300 text-sm md:text-base">
                Revolutionizing Live Music Support
              </p>
            </div>
          </div>

          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg font-semibold mb-6 inline-flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2" />
            Coming Soon
          </Badge>

          {/* Main Content */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Something Amazing is
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Coming Soon
            </span>
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            We're building the future of live music support. Get ready to discover shows near you and support artists with instant donations using cutting-edge geolocation technology.
          </p>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Live Show Detection</h4>
              <p className="text-gray-300 text-sm">
                Advanced geolocation finds live performances happening near you
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Instant Support</h4>
              <p className="text-gray-300 text-sm">
                Send donations directly to artists during their performances
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Real-Time Impact</h4>
              <p className="text-gray-300 text-sm">
                Watch your support boost the energy of live performances
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg mb-4"
            onClick={() => setIsModalOpen(true)}
          >
            <Mail className="w-5 h-5 mr-2" />
            Sign up for Early Access
          </Button>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mt-6 mb-2">
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
          <div className="mt-6 text-gray-400 text-xs">
            <p>© 2025 TrueFans CONNECT™. Made with ❤️ for the music community.</p>
          </div>
        </GlassCard>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Sign up for Early Access</h2>
              <div className="w-full h-[500px] relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 z-10">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
                      <p className="text-gray-500">Loading signup form...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://track.newmusiclives.com/widget/form/kV4YXpdHZWU0ybxHRLl3"
                  className={`w-full h-full border-0 rounded-2xl transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  title="TrueFans CONNECT - Coming Soon"
                  allowFullScreen
                  onLoad={() => setIsLoading(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </GradientBg>
  );
} 
