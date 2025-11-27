'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link2, Upload, Wand2, TrendingUp } from 'lucide-react';
import { SectionContainer } from '@/components/SectionContainer';

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const steps = [
    {
      icon: Link2,
      number: '01',
      title: 'Connect your channels',
      description: 'Link your ad accounts and lead sources in minutes with our simple integration flow.',
    },
    {
      icon: Upload,
      number: '02',
      title: 'Import leads & campaigns',
      description: 'Automatically sync your existing leads and campaign data into one unified dashboard.',
    },
    {
      icon: Wand2,
      number: '03',
      title: 'Generate AI ads & workflows',
      description: 'Let AI create high-converting ad variations and nurture sequences tailored to your audience.',
    },
    {
      icon: TrendingUp,
      number: '04',
      title: 'Monitor & optimize',
      description: 'Track performance with weekly reporting and strategy meetings, plus real-time AI-powered insights and optimization suggestions.',
    },
  ];

  return (
    <SectionContainer className="bg-white">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16 px-4"
        >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gold to-blue opacity-20" />
                )}
                <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-gold to-blue flex items-center justify-center">
                      <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-bold text-gold opacity-20">{step.number}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#111827] mb-2">{step.title}</h3>
                  <p className="text-[#6B7280] text-xs sm:text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
