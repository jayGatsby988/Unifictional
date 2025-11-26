'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, Check } from 'lucide-react';
import { SectionContainer } from '@/components/SectionContainer';

export function ProblemSolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const problems = [
    'Leads scattered across spreadsheets and CRMs',
    'Ad creative guessing game and burnout',
    'Too many tools, not enough results',
    'Manual follow-ups falling through cracks',
  ];

  const solutions = [
    'Unified dashboard with AI lead scoring',
    'AI-generated, auto-tested ad variants',
    'All-in-one platform with smart automation',
    'Intelligent nurture sequences on autopilot',
  ];

  return (
    <SectionContainer className="bg-white">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
            Stop juggling tools.{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              Start scaling.
            </span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Unifictional eliminates the chaos of disconnected systems and brings everything you need into one intelligent workspace.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-red-50 border-2 border-red-200 rounded-2xl p-8"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#111827]">The Old Way</h3>
            </div>
            <ul className="space-y-4">
              {problems.map((problem, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <X className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-[#111827]">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gold-50 to-blue-50 border-2 border-gold-200 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold to-blue flex items-center justify-center">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827]">With Unifictional</h3>
              </div>
              <ul className="space-y-4">
                {solutions.map((solution, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-[#111827] font-medium">{solution}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
