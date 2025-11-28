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
      category: 'Bathroom Remodeling',
      problem: 'Zero online leads, relying only on word-of-mouth referrals',
      before: 'No website traffic, manual follow-ups, missing opportunities',
      metrics: [
        { value: '+340%', label: 'Lead Volume', subLabel: '4 months' },
        { value: '$48K', label: 'New Revenue', subLabel: 'monthly' },
      ],
      quote: 'I was turning down jobs because I couldn\'t keep up with follow-ups. Now the AI handles it all, and I have a waitlist of clients.',
      author: 'Mike Rodriguez',
      role: 'Bathroom Remodeling Contractor',
    },
    {
      category: 'Hotel Renovation',
      problem: 'Wasting $4K/month on ads with zero qualified commercial leads',
      before: 'Random targeting, no lead tracking, couldn\'t measure what worked',
      metrics: [
        { value: '5.8x', label: 'ROAS', subLabel: 'return on ad spend' },
        { value: '-58%', label: 'Cost Per Lead', subLabel: 'reduction' },
      ],
      quote: 'The AI found hotel managers who actually need renovations. We went from 2 projects to 9 in the pipeline.',
      author: 'James Carter',
      role: 'Commercial Hotel Remodeler',
    },
    {
      category: 'Kitchen Remodeling',
      problem: 'Juggling 15 kitchen projects with spreadsheets and missed follow-ups',
      before: 'Lost leads in email, manual estimates, no systematic follow-up process',
      metrics: [
        { value: '22hrs', label: 'Time Saved', subLabel: 'weekly' },
        { value: '+180%', label: 'Project Capacity', subLabel: 'increased' },
      ],
      quote: 'I went from barely managing 6 kitchens to easily handling 17. The automation gave me my weekends back.',
      author: 'Tony Morales',
      role: 'Kitchen Remodeling Specialist',
    },
    {
      category: 'Basement Finishing',
      problem: 'Spending 20 hours/week on estimates for leads that never converted',
      before: 'Manual lead qualification, wasted time on tire-kickers, no automation',
      metrics: [
        { value: '73%', label: 'Lead Quality', subLabel: 'improved' },
        { value: '+$6.8K', label: 'Monthly Profit', subLabel: 'increase' },
      ],
      quote: 'The lead scoring saved me from wasting time on bad-fit clients. I only talk to serious homeowners now.',
      author: 'Steve Anderson',
      role: 'Basement Finishing Contractor',
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
          className="text-center mb-10 sm:mb-12 md:mb-16 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827] mb-3 sm:mb-4">
            Proven Growth,{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              Real Results
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto">
            See how real businesses like yours achieved measurable growth with Unifictional
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
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl border border-gray-200"
            >
              <div className="mb-6">
                <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-gold-50 text-gold border border-gold-200">
                  {currentCase.category}
                </span>
              </div>

              {/* Clear "Before" Problem Section */}
              <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-5 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="text-red-600 font-bold text-sm">!</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-red-900 mb-1">THE PROBLEM</h4>
                    <p className="text-red-800 font-semibold mb-2">{currentCase.problem}</p>
                    <p className="text-red-700 text-sm">{currentCase.before}</p>
                  </div>
                </div>
              </div>

              {/* Results - "After" Section */}
              <div className="mb-6">
                <h4 className="text-sm font-bold text-green-700 mb-3 flex items-center">
                  <span className="inline-block h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <span className="text-green-600 font-bold text-lg">✓</span>
                  </span>
                  THE RESULTS
                </h4>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {currentCase.metrics.map((metric, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-green-200 shadow-sm"
                    >
                      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                        {metric.value}
                      </div>
                      <div className="text-[#111827] font-semibold mb-1 text-sm sm:text-base">{metric.label}</div>
                      <div className="text-[#6B7280] text-xs sm:text-sm">{metric.subLabel}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-5 sm:p-6 border border-blue-200 shadow-sm">
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <Quote className="h-7 w-7 sm:h-8 sm:w-8 text-[#1F4F9A] flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-[#111827] text-base sm:text-lg leading-relaxed mb-4 italic">
                      "{currentCase.quote}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1F4F9A] to-[#3B82F6] flex items-center justify-center text-white font-bold text-sm">
                        {currentCase.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-bold text-[#111827] text-sm sm:text-base">{currentCase.author}</div>
                        <div className="text-xs sm:text-sm text-[#6B7280]">{currentCase.role}</div>
                      </div>
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

