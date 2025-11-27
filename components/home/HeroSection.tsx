'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, TrendingUp, Zap, Bot, Headphones, Rocket, Users, BarChart3, ImagePlus, Target } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pb-0">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
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
              className="inline-flex items-center space-x-2 bg-gold-50 border border-gold-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6"
            >
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gold" />
              <span className="text-xs sm:text-sm font-medium text-gold-700">AI-Powered Growth Engine</span>
            </motion.div>

            <h1 className="text-[28px] leading-[1.2] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#111827] mb-4 sm:mb-5 md:mb-6 lg:leading-tight">
              The future of{' '}
              <span className="text-[#1F4F9A]">
                marketing AI
              </span>
              {' '}unified in one platform.
            </h1>

            <p className="text-[15px] leading-relaxed sm:text-base md:text-lg lg:text-xl text-[#6B7280] mb-6 sm:mb-7 md:mb-8 max-w-2xl mx-auto lg:mx-0">
              Unifictional centralizes AI lead management, ad generation, and campaign intelligence into one clean, intuitive platform—so you stop juggling tools and start scaling.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-5 sm:mb-6 md:mb-8">
              <Button
                className="bg-gold hover:bg-gold-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 w-full sm:w-auto"
                asChild
              >
                <Link href="/contact">Get More Info</Link>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-blue text-blue hover:bg-blue hover:text-white transition-all duration-200 text-sm sm:text-base px-6 sm:px-8 h-11 sm:h-12 w-full sm:w-auto"
                asChild
              >
                <Link href="/contact">Book a Live Demo</Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-2xl mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex items-center space-x-2.5 bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-200"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-purple-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-[#111827]">Quality AI Ads</p>
                  <p className="text-[10px] sm:text-xs text-[#6B7280]">High-converting</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
                className="flex items-center space-x-2.5 bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-200"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-5 w-5 text-blue-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-[#111827]">24/7 Support</p>
                  <p className="text-[10px] sm:text-xs text-[#6B7280]">Always here</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="flex items-center space-x-2.5 bg-white rounded-lg sm:rounded-xl p-3 shadow-sm border border-gray-200"
              >
                <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-5 w-5 text-orange-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-[#111827]">Quick Launch</p>
                  <p className="text-[10px] sm:text-xs text-[#6B7280]">Live in 3 days</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-8 lg:mt-0 w-full"
          >
            {/* Mobile: Grid of 2 columns, Desktop: Original layout */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border border-gray-200">
              {/* Dashboard Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-6">
                {[
                  { Icon: Users, title: 'Hot Lead', status: 'Hot', color: 'bg-red-100 text-red-700', iconBg: 'bg-red-50', iconColor: 'text-red-600' },
                  { Icon: BarChart3, title: 'Pipeline', status: 'Nurturing', color: 'bg-yellow-100 text-yellow-700', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600' },
                  { Icon: ImagePlus, title: 'Ad Creative', status: 'Generated', color: 'bg-green-100 text-green-700', iconBg: 'bg-green-50', iconColor: 'text-green-600' },
                  { Icon: Target, title: 'Campaign', status: 'Active', color: 'bg-green-100 text-green-700', iconBg: 'bg-green-50', iconColor: 'text-green-600' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200 lg:flex lg:items-center lg:justify-between"
                  >
                    {/* Mobile: Vertical layout, Desktop: Horizontal */}
                    <div className="flex flex-col lg:flex-row items-center lg:items-center space-y-2 lg:space-y-0 lg:space-x-3 text-center lg:text-left">
                      <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl ${item.iconBg} flex items-center justify-center shadow-sm flex-shrink-0`}>
                        <item.Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${item.iconColor}`} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-[#111827] text-xs sm:text-sm lg:text-base">{item.title}</h3>
                        <p className="text-[10px] sm:text-xs text-[#6B7280] hidden lg:block">Updated just now</p>
                      </div>
                    </div>
                    <span className={`mt-2 lg:mt-0 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full font-medium text-[10px] sm:text-xs ${item.color} inline-block`}>
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* AI Performance Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm border border-blue-100"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#111827]">AI Performance</h3>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#1F4F9A] to-[#3B82F6] bg-clip-text text-transparent">
                    94%
                  </span>
                </div>
                <div className="relative h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '94%' }}
                    transition={{ duration: 1.5, delay: 0.8, ease: 'easeOut' }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1F4F9A] to-[#3B82F6] rounded-full shadow-lg"
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
