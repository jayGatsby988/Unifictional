'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link2, Upload, Wand2, TrendingUp, ArrowRight, Zap } from 'lucide-react';
import { SectionContainer } from '@/components/SectionContainer';

const steps = [
  {
    icon: Link2,
    number: '01',
    title: 'Connect your channels',
    description: 'Link your ad accounts and lead sources in minutes with our simple integration flow.',
    gradient: 'from-gold to-orange-400',
    bg: 'bg-gold/10',
    iconColor: 'text-gold',
    glow: 'rgba(246,184,0,0.25)',
  },
  {
    icon: Upload,
    number: '02',
    title: 'Import leads & campaigns',
    description: 'Automatically sync your existing leads and campaign data into one unified dashboard.',
    gradient: 'from-blue to-cyan-400',
    bg: 'bg-blue/10',
    iconColor: 'text-blue',
    glow: 'rgba(31,79,154,0.25)',
  },
  {
    icon: Wand2,
    number: '03',
    title: 'Generate AI ads & workflows',
    description: 'Let AI create high-converting ad variations and nurture sequences tailored to your audience.',
    gradient: 'from-purple-500 to-indigo-400',
    bg: 'bg-purple-500/10',
    iconColor: 'text-purple-600',
    glow: 'rgba(139,92,246,0.25)',
  },
  {
    icon: TrendingUp,
    number: '04',
    title: 'Monitor & optimize',
    description: 'Track performance with weekly reporting and real-time AI-powered insights and optimization.',
    gradient: 'from-green-500 to-emerald-400',
    bg: 'bg-green-500/10',
    iconColor: 'text-green-600',
    glow: 'rgba(16,185,129,0.25)',
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionContainer className="bg-gradient-to-b from-white via-[#F9FAFB] to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-50 to-blue-50 border border-gold-200 rounded-full px-4 py-1.5 mb-4"
          >
            <Zap className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Simple Process</span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-3 sm:mb-4">
            From setup to scale in{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              four simple steps
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto">
            Get up and running in minutes, not weeks. No technical expertise required.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-14 left-full w-full z-10" style={{ paddingLeft: '12px', paddingRight: '12px' }}>
                    <motion.div
                      className="relative h-0.5 w-full"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      style={{ originX: 0 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/40 to-blue/40 rounded-full" />
                      <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <ArrowRight className="h-3 w-3 text-blue/40" />
                      </div>
                    </motion.div>
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-transparent transition-all duration-300 group overflow-hidden cursor-default"
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 30% 30%, ${step.glow} 0%, transparent 60%)` }}
                  />

                  {/* Bottom accent */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${step.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

                  <div className="relative">
                    {/* Number + Icon row */}
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        className={`h-12 w-12 rounded-2xl ${step.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        style={{ boxShadow: `0 0 0 0 ${step.glow}` }}
                        whileHover={{ boxShadow: `0 0 0 8px ${step.glow}` }}
                      >
                        <step.icon className={`h-6 w-6 ${step.iconColor}`} />
                      </motion.div>
                      <span className={`text-4xl font-black bg-gradient-to-br ${step.gradient} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300`}>
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2">{step.title}</h3>
                    <p className="text-[#6B7280] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Timeline for mobile */}
          <div className="flex items-center justify-center gap-2 mt-8 lg:hidden">
            {steps.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className={`h-1 rounded-full ${i < 3 ? 'w-8' : 'w-4'} bg-gradient-to-r from-gold to-blue`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
