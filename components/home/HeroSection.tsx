'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, TrendingUp, Zap, Bot, Headphones, Rocket, Users, BarChart3, ImagePlus, Target, ArrowRight, CheckCircle2, Star } from 'lucide-react';
import { FloatingShapes, AnimatedGrid } from '@/components/FloatingShapes';
import { useRef, useEffect, useState } from 'react';

function MouseParallax({ children, factor = 0.02, className = '' }: { children: React.ReactNode; factor?: number; className?: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) * factor);
      mouseY.set((e.clientY - cy) * factor);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [factor, mouseX, mouseY]);

  return (
    <motion.div className={className} style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const trustItems = ['No credit card required', '14-day free trial', 'Cancel anytime'];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20 sm:pt-24 pb-12 sm:pb-16 lg:pb-0"
    >
      {/* Animated grid background */}
      <AnimatedGrid />

      {/* Floating shapes */}
      <FloatingShapes variant="light" density="high" />

      {/* Large animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(246,184,0,0.12) 0%, rgba(246,184,0,0.04) 50%, transparent 70%)',
          y,
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(31,79,154,0.1) 0%, rgba(31,79,154,0.04) 50%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(246,184,0,0.04) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Animated rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        {[400, 600, 800].map((size, i) => (
          <motion.div
            key={i}
            className="absolute border border-gold/5 rounded-full"
            style={{
              width: size,
              height: size,
              top: -size / 2,
              left: -size / 2,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
        style={{ opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">

          {/* LEFT: Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center space-x-2 mb-5 sm:mb-7"
            >
              <div className="relative inline-flex items-center gap-2 bg-gradient-to-r from-gold-50 to-blue-50 border border-gold-200 rounded-full px-4 py-2 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                </span>
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="text-xs sm:text-sm font-semibold text-gold-700 tracking-wide">AI-Powered Growth Engine</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-[28px] leading-[1.15] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#111827] mb-4 sm:mb-5 md:mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {['The future of', ' marketing AI', ' unified in', ' one platform.'].map((chunk, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="inline"
                >
                  {i === 1 ? (
                    <span className="bg-gradient-to-r from-[#F6B800] via-[#1F4F9A] to-[#3B82F6] bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>
                      {chunk}
                    </span>
                  ) : chunk}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15px] leading-relaxed sm:text-base md:text-lg lg:text-xl text-[#6B7280] mb-6 sm:mb-7 md:mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Unifictional centralizes AI lead management, ad generation, and campaign intelligence into one clean, intuitive platform—so you stop juggling tools and start scaling.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6 sm:mb-7 md:mb-8"
            >
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="relative overflow-hidden bg-gradient-to-r from-gold to-gold-600 hover:from-gold-600 hover:to-gold text-white shadow-lg hover:shadow-2xl transition-all duration-300 text-sm sm:text-base px-7 sm:px-9 h-12 sm:h-13 w-full sm:w-auto group"
                  asChild
                >
                  <Link href="/contact">
                    <span className="relative z-10 flex items-center gap-2">
                      Get More Info
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button
                  variant="outline"
                  className="border-2 border-blue text-blue hover:bg-blue hover:text-white transition-all duration-300 text-sm sm:text-base px-7 sm:px-9 h-12 sm:h-13 w-full sm:w-auto backdrop-blur-sm"
                  asChild
                >
                  <Link href="/contact">Book a Live Demo</Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-2 justify-center lg:justify-start mb-6 sm:mb-8"
            >
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  <span className="text-xs sm:text-sm text-[#6B7280]">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Feature pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-2xl mx-auto lg:mx-0">
              {[
                { Icon: Bot, label: 'Quality AI Ads', sub: 'High-converting', bg: 'bg-purple-100', ic: 'text-purple-600', delay: 0.9 },
                { Icon: Headphones, label: '24/7 Support', sub: 'Always here', bg: 'bg-blue-100', ic: 'text-blue-600', delay: 1.0 },
                { Icon: Rocket, label: 'Quick Launch', sub: 'Live in 3 days', bg: 'bg-orange-100', ic: 'text-orange-600', delay: 1.1 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: item.delay, duration: 0.5, type: 'spring', stiffness: 200 }}
                  whileHover={{ y: -4, scale: 1.03 }}
                  className="flex items-center space-x-2.5 bg-white rounded-xl p-3 shadow-md border border-gray-200 hover:shadow-lg hover:border-gold-200 transition-all duration-300 cursor-default"
                >
                  <div className={`h-9 w-9 sm:h-10 sm:w-10 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                    <item.Icon className={`h-5 w-5 ${item.ic}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-[#111827]">{item.label}</p>
                    <p className="text-[10px] sm:text-xs text-[#6B7280]">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: Dashboard Preview */}
          <MouseParallax factor={0.015} className="relative mt-8 lg:mt-0 w-full">
            <motion.div
              initial={{ opacity: 0, x: 40, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Glow behind card */}
              <div
                className="absolute inset-0 rounded-3xl blur-3xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(246,184,0,0.15), rgba(31,79,154,0.15))',
                  transform: 'scale(1.05) translateY(10px)',
                }}
              />

              {/* Main dashboard card */}
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-2xl border border-gray-200/80 backdrop-blur-sm">

                {/* Header bar */}
                <div className="flex items-center justify-between mb-4 sm:mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs text-gray-400 font-medium">Unifictional Dashboard</div>
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-gold to-blue flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white">U</span>
                  </div>
                </div>

                {/* Dashboard Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3 lg:gap-4 mb-4 sm:mb-5 md:mb-6">
                  {[
                    { Icon: Users, title: 'Hot Lead', sub: 'Sarah Johnson - Enterprise', status: 'Hot', color: 'bg-red-100 text-red-700', iconBg: 'bg-red-50', iconColor: 'text-red-600', dot: 'bg-red-400' },
                    { Icon: BarChart3, title: 'Pipeline', sub: '23 leads nurturing', status: 'Nurturing', color: 'bg-yellow-100 text-yellow-700', iconBg: 'bg-yellow-50', iconColor: 'text-yellow-600', dot: 'bg-yellow-400' },
                    { Icon: ImagePlus, title: 'Ad Creative', sub: 'Meta Campaign #47', status: 'Generated', color: 'bg-green-100 text-green-700', iconBg: 'bg-green-50', iconColor: 'text-green-600', dot: 'bg-green-400' },
                    { Icon: Target, title: 'Campaign', sub: 'ROAS: 4.2x this week', status: 'Active', color: 'bg-blue-100 text-blue-700', iconBg: 'bg-blue-50', iconColor: 'text-blue-600', dot: 'bg-blue-400' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                      whileHover={{ scale: 1.02, x: 3 }}
                      className="bg-white rounded-xl p-3 sm:p-3.5 shadow-sm border border-gray-200 hover:border-gold-200 hover:shadow-md transition-all duration-200 lg:flex lg:items-center lg:justify-between cursor-default group"
                    >
                      <div className="flex flex-col lg:flex-row items-center lg:items-center space-y-2 lg:space-y-0 lg:space-x-3 text-center lg:text-left">
                        <div className={`h-10 w-10 sm:h-11 sm:w-11 rounded-xl ${item.iconBg} flex items-center justify-center shadow-sm flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                          <item.Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${item.iconColor}`} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#111827] text-xs sm:text-sm">{item.title}</h3>
                          <p className="text-[10px] sm:text-xs text-[#6B7280] hidden lg:block">{item.sub}</p>
                        </div>
                      </div>
                      <div className="flex justify-center lg:justify-end mt-2 lg:mt-0">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium text-[10px] sm:text-xs ${item.color}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${item.dot}`} />
                          {item.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* AI Performance Score */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-gradient-to-br from-blue-50 via-white to-gold-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm border border-blue-100"
                >
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-[#111827]">AI Performance</h3>
                      <p className="text-[10px] sm:text-xs text-[#6B7280]">Across all campaigns</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#1F4F9A] to-[#3B82F6] bg-clip-text text-transparent">
                        94%
                      </span>
                      <p className="text-[10px] text-green-600 font-medium flex items-center justify-end gap-0.5">
                        <TrendingUp className="h-3 w-3" /> +12% this week
                      </p>
                    </div>
                  </div>
                  <div className="relative h-2.5 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '94%' }}
                      transition={{ duration: 1.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1F4F9A] to-[#3B82F6] rounded-full"
                    >
                      <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/30 blur-sm rounded-full" />
                    </motion.div>
                  </div>

                  {/* Mini stats row */}
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {[
                      { label: 'Leads', value: '1,247', up: true },
                      { label: 'Ads Live', value: '38', up: true },
                      { label: 'ROI', value: '4.2x', up: true },
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-sm font-bold text-[#111827]">{stat.value}</p>
                        <p className="text-[10px] text-[#6B7280]">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="flex items-center justify-between mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100"
                >
                  <div className="flex items-center -space-x-2">
                    {['#F6B800', '#1F4F9A', '#10B981', '#8B5CF6', '#F97316'].map((color, i) => (
                      <div
                        key={i}
                        className="h-6 w-6 rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold"
                        style={{ background: color }}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star key={s} className="h-3 w-3 fill-gold text-gold" />
                      ))}
                    </div>
                    <p className="text-[10px] text-[#6B7280]">500+ happy clients</p>
                  </div>
                </motion.div>
              </div>

              {/* Floating badge - top right */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-200 flex items-center gap-2"
                style={{ animation: 'float-slow 6s ease-in-out infinite' }}
              >
                <div className="h-7 w-7 rounded-xl bg-green-100 flex items-center justify-center">
                  <Zap className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#111827]">AI Generated</p>
                  <p className="text-[9px] text-[#6B7280]">32 ads today</p>
                </div>
              </motion.div>

              {/* Floating badge - bottom left */}
              <motion.div
                initial={{ opacity: 0, scale: 0, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.35, type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-200 flex items-center gap-2"
                style={{ animation: 'float-medium 7s ease-in-out infinite', animationDelay: '-3s' }}
              >
                <div className="h-7 w-7 rounded-xl bg-gold-100 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-gold-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#111827]">+42% Leads</p>
                  <p className="text-[9px] text-[#6B7280]">This month</p>
                </div>
              </motion.div>
            </motion.div>
          </MouseParallax>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F9FAFB] to-transparent pointer-events-none" />
    </section>
  );
}
