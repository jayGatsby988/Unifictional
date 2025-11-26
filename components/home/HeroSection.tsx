'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, TrendingUp, Zap, Bot, Headphones, Rocket, Users, BarChart3, ImagePlus, Target } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-gold-50 border border-gold-200 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold-700">AI-Powered Growth Engine</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-6 leading-tight">
              The future of{' '}
              <span className="text-[#1F4F9A]">
                marketing AI
              </span>
              {' '}unified in one platform.
            </h1>

            <p className="text-lg sm:text-xl text-[#6B7280] mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Unifictional centralizes AI lead management, ad generation, and campaign intelligence into one clean, intuitive platform—so you stop juggling tools and start scaling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-base px-8"
                asChild
              >
                <Link href="/contact">Get More Info</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue text-blue hover:bg-blue hover:text-white transition-all duration-200 text-base px-8"
                asChild
              >
                <Link href="/contact">Book a Live Demo</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Quality AI Ads</p>
                  <p className="text-xs text-[#6B7280]">High-converting</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">24/7 Support</p>
                  <p className="text-xs text-[#6B7280]">Always here</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="flex items-center space-x-3 bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Quick Launch</p>
                  <p className="text-xs text-[#6B7280]">Live in 3 days</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200">
              <div className="space-y-4 mb-6">
                {[
                  { Icon: Users, title: 'Hot Lead', status: 'Hot', color: 'bg-red-100 text-red-700', iconBg: 'bg-red-50', iconColor: 'text-red-600' },
                  { Icon: BarChart3, title: 'Pipeline', status: 'Nurturing', color: 'bg-yellow-100 text-yellow-700', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600' },
                  { Icon: ImagePlus, title: 'Ad Creative', status: 'Generated', color: 'bg-green-100 text-green-700', iconBg: 'bg-green-50', iconColor: 'text-green-600' },
                  { Icon: Target, title: 'Campaign', status: 'Active', color: 'bg-green-100 text-green-700', iconBg: 'bg-green-50', iconColor: 'text-green-600' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`h-14 w-14 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-sm`}>
                        <item.Icon className={`h-7 w-7 ${item.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#111827] text-lg">{item.title}</h3>
                        <p className="text-sm text-[#6B7280]">Updated just now</p>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full font-medium text-sm ${item.color}`}>
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#111827]">AI Performance Score</h3>
                  <span className="text-4xl font-bold text-[#1F4F9A]">
                    94%
                  </span>
                </div>
                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                    className="absolute top-0 left-0 h-full bg-[#1F4F9A] rounded-full"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
