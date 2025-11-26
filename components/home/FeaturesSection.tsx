'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, Sparkles, Workflow, BarChart3, Building2, Plug } from 'lucide-react';
import { SectionContainer } from '@/components/SectionContainer';

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Users,
      title: 'AI Lead Manager',
      description: 'Auto-capture, qualify, score, and assign leads with intelligent routing and real-time insights.',
    },
    {
      icon: Sparkles,
      title: 'AI Ad Generator',
      description: 'Create high-converting ad variants for Meta, Google, TikTok, and more with one click.',
    },
    {
      icon: Workflow,
      title: 'Smart Nurture Flows',
      description: 'Automated sequences and outreach messages that adapt based on lead behavior and engagement.',
    },
    {
      icon: BarChart3,
      title: 'Unified Analytics',
      description: 'One view of all your leads, campaigns, and ROI with plain-language performance insights.',
    },
    {
      icon: Building2,
      title: 'Pipelines & Funnels',
      description: 'Visual pipeline management with automated funnel tracking to move leads through your sales process.',
    },
    {
      icon: Plug,
      title: 'Seamless Integrations',
      description: 'Connect your email platform and ad accounts in minutes with our easy integration flow.',
    },
  ];

  return (
    <SectionContainer className="bg-gradient-to-b from-[#F9FAFB] to-white">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
            Everything you need to{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              grow faster
            </span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Powerful features designed to help agencies, freelancers, and brands scale their growth without the complexity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold to-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">{feature.title}</h3>
              <p className="text-[#6B7280] leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
