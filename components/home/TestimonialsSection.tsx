'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';
import { SectionContainer } from '@/components/SectionContainer';

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const testimonials = [
    {
      name: 'Jessica Martinez',
      role: 'Agency Owner',
      content: 'Unifictional replaced three tools and doubled our qualified leads in 60 days. The AI ad generation alone has saved us 20 hours per week.',
      avatar: 'JM',
    },
    {
      name: 'David Park',
      role: 'Marketing Director',
      content: 'The unified dashboard gives us visibility we never had before. Lead scoring is incredibly accurate, and our sales team finally trusts the pipeline.',
      avatar: 'DP',
    },
    {
      name: 'Sarah Thompson',
      role: 'Freelance Marketer',
      content: 'As a solo marketer, Unifictional lets me compete with agencies. The automation is seamless, and I can manage 5x more clients than before.',
      avatar: 'ST',
    },
  ];

  return (
    <SectionContainer className="bg-gradient-to-b from-white to-[#F9FAFB]">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
            Trusted by{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              growth leaders
            </span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            See what agencies, freelancers, and brands are saying about Unifictional.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-[#111827] mb-6 leading-relaxed">{testimonial.content}</p>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gold to-blue flex items-center justify-center text-white font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-[#111827]">{testimonial.name}</div>
                  <div className="text-sm text-[#6B7280]">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
