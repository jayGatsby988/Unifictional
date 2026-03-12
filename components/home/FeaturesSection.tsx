'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Sparkles, Workflow, BarChart3, Building2, Plug, ArrowRight } from 'lucide-react';
import { SectionContainer } from '@/components/SectionContainer';
import { FloatingShapes } from '@/components/FloatingShapes';

const features = [
  {
    icon: Users,
    title: 'AI Lead Manager',
    description: 'Auto-capture, qualify, score, and assign leads with intelligent routing and real-time insights.',
    gradient: 'from-purple-500 to-indigo-600',
    glow: 'rgba(139,92,246,0.2)',
    tag: 'Core Feature',
  },
  {
    icon: Sparkles,
    title: 'AI Ad Generator',
    description: 'Create high-converting ad variants for Meta, Google, TikTok, and more with one click.',
    gradient: 'from-gold to-orange-500',
    glow: 'rgba(246,184,0,0.2)',
    tag: 'Most Popular',
  },
  {
    icon: Workflow,
    title: 'Smart Nurture Flows',
    description: 'Automated sequences and outreach messages that adapt based on lead behavior and engagement.',
    gradient: 'from-blue to-cyan-500',
    glow: 'rgba(31,79,154,0.2)',
    tag: 'Automation',
  },
  {
    icon: BarChart3,
    title: 'Unified Analytics',
    description: 'One view of all your leads, campaigns, and ROI with plain-language performance insights.',
    gradient: 'from-green-500 to-emerald-600',
    glow: 'rgba(16,185,129,0.2)',
    tag: 'Insights',
  },
  {
    icon: Building2,
    title: 'Pipelines & Funnels',
    description: 'Visual pipeline management with automated funnel tracking to move leads through your sales process.',
    gradient: 'from-pink-500 to-rose-600',
    glow: 'rgba(236,72,153,0.2)',
    tag: 'Sales',
  },
  {
    icon: Plug,
    title: 'Seamless Integrations',
    description: 'Connect your email platform and ad accounts in minutes with our easy integration flow.',
    gradient: 'from-blue to-indigo-600',
    glow: 'rgba(31,79,154,0.2)',
    tag: 'Integrations',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <SectionContainer className="relative bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] overflow-hidden">
      <FloatingShapes variant="light" density="low" />

      {/* Section decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-gold-300 to-transparent" />

      <div ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14 md:mb-18 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-50 to-blue-50 border border-gold-200 rounded-full px-4 py-1.5 mb-4"
          >
            <Sparkles className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Everything You Need</span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-4 sm:mb-5">
            Everything you need to{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
                grow faster
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-blue origin-left"
              />
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto">
            Powerful features designed to help agencies, freelancers, and brands scale their growth without the complexity.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group relative bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-gray-200 hover:border-transparent hover:shadow-2xl cursor-default overflow-hidden transition-all duration-300"
            >
              {/* Gradient glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 0% 0%, ${feature.glow} 0%, transparent 60%)`,
                }}
              />

              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${feature.glow} 50%, transparent 100%)`,
                  padding: '1px',
                }}
              />
              <div className="absolute inset-[1px] rounded-[15px] bg-white group-hover:bg-white/95 transition-colors duration-300 pointer-events-none" />

              {/* Tag */}
              <div className="relative flex items-center justify-between mb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#9CA3AF]">{feature.tag}</span>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ x: 3 }}
                >
                  <ArrowRight className="h-4 w-4 text-[#9CA3AF]" />
                </motion.div>
              </div>

              {/* Icon */}
              <div className="relative mb-4 sm:mb-5">
                <motion.div
                  className={`h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </motion.div>

                {/* Icon glow */}
                <div
                  className="absolute inset-0 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.glow}, ${feature.glow})`,
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300"
                  style={{ backgroundImage: `linear-gradient(135deg, #111827, #374151)` }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">{feature.description}</p>
              </div>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${feature.gradient} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-10 sm:mt-14"
        >
          <p className="text-[#6B7280] text-sm sm:text-base">
            All features included in every plan.{' '}
            <a href="/pricing" className="text-gold font-semibold hover:text-gold-600 transition-colors animated-underline">
              View pricing →
            </a>
          </p>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
