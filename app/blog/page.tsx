'use client'

import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Music, Heart, Zap, Users, Tag } from 'lucide-react'
import { GradientBg } from '@/components/ui/gradient-bg'
import { GlassCard } from '@/components/ui/glass-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'

export default function BlogPage() {
  const featuredPost = {
    id: '1',
    title: 'The Future of Live Music: How Geolocation is Revolutionizing Music Artist Support',
    excerpt: 'Discover how cutting-edge geolocation technology is creating new opportunities for fans to support their favorite music artists in real-time during live performances.',
    content: 'In an era where digital streaming dominates the music landscape, live performances remain the heartbeat of authentic musical connection...',
    author: {
      name: 'Paul Saunders',
      role: 'CEO & Co-Founder',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    category: 'Technology',
    tags: ['geolocation', 'live music', 'innovation'],
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true
  }

  const blogPosts = [
    {
      id: '2',
      title: 'Artist Spotlight: Luna Rodriguez\'s Journey to 10,000 Supporters',
      excerpt: 'Follow Luna\'s incredible journey from local coffee shop performances to becoming one of our most supported artists.',
      author: {
        name: 'Maria Rodriguez',
        role: 'Content Manager',
        avatar: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      publishedAt: '2024-01-12',
      readTime: '5 min read',
      category: 'Artist Stories',
      tags: ['artist spotlight', 'success story'],
      image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '3',
      title: 'Building the Perfect Venue Geofence: A Technical Deep Dive',
      excerpt: 'Learn how we use Geolocation and advanced algorithms to create a precise venue boundary for accurate show detection.',
      author: {
        name: 'Matthew Wood',
        role: 'CMO & Co-Founder',
        avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      publishedAt: '2024-01-10',
      readTime: '12 min read',
      category: 'Engineering',
      tags: ['geofencing', 'postgis', 'technical'],
      image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '4',
      title: 'The Economics of Live Music: Why Direct Support Matters for Music Artists',
      excerpt: 'An analysis of how streaming royalties compare to live performance income and why direct fan support is crucial.',
      author: {
        name: 'Sarah Thompson',
        role: 'Music Industry Analyst',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      publishedAt: '2024-01-08',
      readTime: '7 min read',
      category: 'Industry Insights',
      tags: ['economics', 'streaming', 'artist support'],
      image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '5',
      title: 'Community Spotlight: Fans Making a Difference',
      excerpt: 'Meet the TrueFans who are going above and beyond to support their local music scenes through TrueFans GeoConnect.',
      author: {
        name: 'Mike Johnson',
        role: 'Community Manager',
        avatar: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      publishedAt: '2024-01-05',
      readTime: '6 min read',
      category: 'Community',
      tags: ['fans', 'community', 'impact'],
      image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: '6',
      title: 'Privacy and Security: How We Protect Your Location Data',
      excerpt: 'Transparency about our data practices and the measures we take to ensure your privacy while using geolocation features.',
      author: {
        name: 'Paul Saunders',
        role: 'CEO & Co-Founder',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
      },
      publishedAt: '2024-01-03',
      readTime: '9 min read',
      category: 'Privacy & Security',
      tags: ['privacy', 'security', 'data protection'],
      image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ]

  const categories = [
    { name: 'All Posts', count: blogPosts.length + 1, active: true },
    { name: 'Technology', count: 2, active: false },
    { name: 'Artist Stories', count: 1, active: false },
    { name: 'Industry Insights', count: 1, active: false },
    { name: 'Community', count: 1, active: false },
    { name: 'Privacy & Security', count: 1, active: false }
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
            TrueFans Blog
          </h1>
          <p className="text-xl text-purple-200 mb-8 max-w-3xl mx-auto">
            Stories, insights, and updates from the world of live music technology. 
            Discover how we're revolutionizing music artist support and fan engagement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <GlassCard variant="elevated" className="overflow-hidden">
                <div className="relative h-64 md:h-80 -m-6 mb-6">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-purple-600 text-white">Featured</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge variant="outline" className="border-white/30 text-white mb-2">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {featuredPost.title}
                    </h2>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                        <AvatarFallback className="bg-purple-500 text-white">
                          {featuredPost.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{featuredPost.author.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {blogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard variant="elevated" className="h-full hover:bg-white/15 transition-all cursor-pointer group">
                    <div className="relative h-48 -m-6 mb-4">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <Badge variant="outline" className="border-white/30 text-white">
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback className="text-xs bg-purple-500 text-white">
                              {post.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-xs text-gray-400">
                            <p>{post.author.name}</p>
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {post.readTime}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard variant="elevated">
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        category.active
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
                          : 'hover:bg-white/5 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.name}</span>
                        <Badge variant="outline" className="border-white/20">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </GlassCard>
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard variant="elevated">
                <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get the latest insights and updates delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 text-sm"
                  />
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Subscribe
                  </Button>
                </div>
              </GlassCard>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard variant="elevated">
                <h3 className="text-lg font-semibold text-white mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['geolocation', 'live music', 'artist support', 'technology', 'community', 'innovation', 'streaming', 'venues'].map((tag) => (
                    <Badge key={tag} variant="outline" className="border-purple-400/30 text-purple-300 hover:bg-purple-500/20 cursor-pointer">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </GradientBg>
  )
}