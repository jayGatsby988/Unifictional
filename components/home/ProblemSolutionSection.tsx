'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { X, Check, ArrowRight, Sparkles } from 'lucide-react';
import { SectionContainer } from '@/components/SectionContainer';

export function ProblemSolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

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
    <SectionContainer className="bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="absolute top-1/2 left-0 w-32 h-32 -translate-y-1/2 bg-red-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 right-0 w-40 h-40 -translate-y-1/2 bg-gold-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div ref={ref} className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-14 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-3 sm:mb-4">
            Stop juggling tools.{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              Start scaling.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto">
            Unifictional eliminates the chaos of disconnected systems and brings everything you need into one intelligent workspace.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Problem card */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-red-50 border-2 border-red-200 rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
          >
            {/* Background X pattern */}
            <div className="absolute top-0 right-0 w-40 h-40 opacity-5 pointer-events-none">
              <X className="w-full h-full text-red-500" strokeWidth={0.5} />
            </div>

            <div className="flex items-center space-x-3 mb-5 sm:mb-6">
              <motion.div
                className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0"
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
              </motion.div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">The Old Way</h3>
                <p className="text-xs text-red-500 font-medium">Broken & disconnected</p>
              </div>
            </div>
            <ul className="space-y-3 sm:space-y-4">
              {problems.map((problem, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  className="flex items-start space-x-3 group/item"
                >
                  <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-red-200 transition-colors">
                    <X className="h-3 w-3 text-red-500" />
                  </div>
                  <span className="text-sm sm:text-base text-[#374151]">{problem}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Solution card */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.97 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-gradient-to-br from-gold-50 via-white to-blue-50 border-2 border-gold-200 rounded-2xl p-5 sm:p-6 md:p-8 overflow-hidden hover:shadow-xl hover:border-gold-300 transition-all duration-300"
          >
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-gold/15 to-transparent rounded-full -mr-10 -mt-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue/10 to-transparent rounded-full -ml-8 -mb-8 pointer-events-none" />

            <div className="relative">
              <div className="flex items-center space-x-3 mb-5 sm:mb-6">
                <motion.div
                  className="h-9 w-9 sm:h-11 sm:w-11 rounded-xl bg-gradient-to-br from-gold to-blue flex items-center justify-center flex-shrink-0 shadow-lg"
                  animate={{ boxShadow: ['0 0 0 0 rgba(246,184,0,0)', '0 0 0 8px rgba(246,184,0,0.1)', '0 0 0 0 rgba(246,184,0,0)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#111827]">With Unifictional</h3>
                  <p className="text-xs text-gold-700 font-semibold">Unified & intelligent</p>
                </div>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                {solutions.map((solution, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                    className="flex items-start space-x-3 group/item"
                  >
                    <motion.div
                      className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:bg-green-200 transition-colors"
                      whileHover={{ scale: 1.2 }}
                    >
                      <Check className="h-3 w-3 text-green-600" />
                    </motion.div>
                    <span className="text-sm sm:text-base text-[#111827] font-medium">{solution}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Arrow connector on mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4, type: 'spring' }}
          className="flex justify-center mt-6 md:hidden"
        >
          <div className="flex items-center gap-2 bg-gradient-to-r from-gold to-blue text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
            <ArrowRight className="h-3.5 w-3.5" />
            Switch to Unifictional
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
