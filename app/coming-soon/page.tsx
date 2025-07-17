"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Music, Heart, Clock, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/truefans', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/truefans', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com/truefans', label: 'Facebook' },
];

export default function ComingSoonPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
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
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Right Now Money
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                and Fans Forever
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Discover live shows near you and directly support artists with instant donations. No delays – just pure support for the music you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={() => setIsModalOpen(true)}
              >
                <Mail className="w-5 h-5 mr-2" />
                Get Early Access
              </Button>
            </div>
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
          </motion.div>
        </div>
      </section>
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
  );
} 
