'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { SectionContainer } from '@/components/SectionContainer';

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SectionContainer className="bg-gradient-to-br from-[#F9FAFB] to-white">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-3xl shadow-2xl"
      >
        {/* Animated gradient background */}
        <div
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background: 'linear-gradient(135deg, #F6B800, #FFCF33, #1F4F9A, #3B82F6, #F6B800)',
            backgroundSize: '300% 300%',
          }}
        />

        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />

        {/* Radial light source */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(255,255,255,0.15),transparent_60%)]" />

        {/* Floating orbs */}
        <motion.div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.3, 1], x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-10 -right-10 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.2, 1], x: [0, -15, 0], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)' }}
          animate={{ scale: [1, 1.4, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating shapes */}
        {[
          { size: 60, top: '10%', left: '5%', delay: 0, duration: 7 },
          { size: 40, top: '70%', left: '8%', delay: -2, duration: 9 },
          { size: 30, top: '20%', right: '8%', delay: -4, duration: 6 },
          { size: 50, bottom: '15%', right: '5%', delay: -1, duration: 8 },
          { size: 20, top: '50%', left: '20%', delay: -3, duration: 5 },
          { size: 35, top: '30%', right: '20%', delay: -5, duration: 10 },
        ].map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border-2 border-white/20 pointer-events-none"
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: (shape as any).left,
              right: (shape as any).right,
              bottom: (shape as any).bottom,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: shape.delay,
            }}
          />
        ))}

        {/* Animated dots */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute rounded-full bg-white pointer-events-none"
            style={{
              width: 3,
              height: 3,
              top: `${15 + (i * 6) % 70}%`,
              left: `${10 + (i * 7) % 80}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: -(i * 0.4),
            }}
          />
        ))}

        {/* Content */}
        <div className="relative z-10 py-12 sm:py-16 md:py-20 lg:py-24 px-6 sm:px-10 md:px-14 lg:px-16 text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-6"
          >
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span className="text-xs font-semibold text-white uppercase tracking-widest">Start Today</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            Ready to unify your{' '}
            <span className="relative">
              <span className="text-white/90">AI stack?</span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-1 left-0 right-0 h-1 bg-white/40 rounded-full origin-left"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/85 mb-6 sm:mb-8 max-w-2xl mx-auto"
          >
            Join hundreds of agencies, freelancers, and brands who are scaling faster with Unifictional.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                className="relative overflow-hidden bg-white text-blue hover:bg-white/95 shadow-2xl text-sm sm:text-base px-8 sm:px-10 h-12 sm:h-14 w-full sm:w-auto group font-semibold"
                asChild
              >
                <Link href="/contact">
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-gold" />
                    Start Free Trial
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white transition-all duration-200 text-sm sm:text-base px-8 sm:px-10 h-12 sm:h-14 w-full sm:w-auto"
                asChild
              >
                <Link href="/contact">Book a Demo</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            {['No credit card required', '14-day free trial', 'Cancel anytime', 'Onboarding included'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-white/70 flex-shrink-0" />
                <span className="text-white/80 text-sm">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
