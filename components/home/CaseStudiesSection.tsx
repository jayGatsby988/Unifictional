'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionContainer } from '@/components/SectionContainer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CaseStudiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const caseStudies = [
    {
      category: 'Personal Brand',
      problem: 'Zero organic reach and no systematic growth',
      metrics: [
        { value: '+12.4K', label: 'Instagram Growth', subLabel: '6 months' },
        { value: '8.2%', label: 'Engagement Rate', subLabel: 'avg' },
      ],
      quote: 'From 400 followers to building a real community. The content strategy and automation are game-changing.',
      author: 'Alex Rivera',
      role: 'Coach & Speaker',
    },
    {
      category: 'E-commerce Brand',
      problem: 'High ad spend with declining ROAS',
      metrics: [
        { value: '3.8x', label: 'ROAS Increase', subLabel: '90 days' },
        { value: '-42%', label: 'Cost Per Lead', subLabel: 'reduction' },
      ],
      quote: 'The AI ad testing found winning combinations we never would have tried manually. Revenue is up 280%.',
      author: 'Sarah Chen',
      role: 'E-commerce Founder',
    },
    {
      category: 'Marketing Agency',
      problem: 'Juggling 15 clients with fragmented tools',
      metrics: [
        { value: '20hrs', label: 'Time Saved', subLabel: 'per week' },
        { value: '+85%', label: 'Client Retention', subLabel: 'improved' },
      ],
      quote: 'We consolidated 6 tools into one platform. Client reporting alone saves us days every month.',
      author: 'Marcus Johnson',
      role: 'Agency Owner',
    },
    {
      category: 'SaaS Startup',
      problem: 'No clear lead qualification process',
      metrics: [
        { value: '62%', label: 'Lead Quality', subLabel: 'increase' },
        { value: '2.1x', label: 'Conversion Rate', subLabel: 'improved' },
      ],
      quote: 'The AI scoring helped our sales team focus on the right leads. Close rate doubled in 60 days.',
      author: 'Emily Watson',
      role: 'Head of Growth',
    },
  ];

  const currentCase = caseStudies[activeIndex];

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  return (
    <SectionContainer className="bg-gradient-to-b from-[#F9FAFB] to-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
            Proven Growth,{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            See how businesses like yours are achieving measurable growth with Unifictional
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gold-50 text-gold border border-gold-200">
                  {currentCase.category}
                </span>
              </div>

              <p className="text-[#6B7280] text-lg mb-8">{currentCase.problem}</p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {currentCase.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-gradient-to-br from-gold-50 to-blue-50 rounded-2xl p-6 border border-gold-200"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent mb-2">
                      {metric.value}
                    </div>
                    <div className="text-[#111827] font-semibold mb-1">{metric.label}</div>
                    <div className="text-[#6B7280] text-sm">{metric.subLabel}</div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-[#F9FAFB] rounded-2xl p-6 border border-gray-200">
                <div className="flex items-start space-x-4">
                  <Quote className="h-8 w-8 text-gold flex-shrink-0" />
                  <div>
                    <p className="text-[#111827] text-lg leading-relaxed mb-4">
                      "{currentCase.quote}"
                    </p>
                    <div>
                      <div className="font-semibold text-[#111827]">{currentCase.author}</div>
                      <div className="text-sm text-[#6B7280]">{currentCase.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevious}
              className="h-12 w-12 rounded-full border-2 border-gray-200 hover:border-gold"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center space-x-2">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-8 bg-gradient-to-r from-gold to-blue' : 'w-2 bg-gray-300'
                  }`}
                  aria-label={`Go to case study ${i + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              className="h-12 w-12 rounded-full border-2 border-gray-200 hover:border-gold"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

