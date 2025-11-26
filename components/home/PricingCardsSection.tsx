'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import Link from 'next/link';

export function PricingCardsSection() {
  const plans = [
    {
      name: 'Website + AI',
      description: 'Custom website with AI integration',
      price: 2500,
      isOneTime: true,
      features: [
        'Custom website design & development',
        'AI chatbot integration',
        'Basic lead capture forms',
        'Mobile responsive design',
        'SEO optimization',
      ],
      cta: 'Book a Discovery Call',
      highlighted: false,
    },
    {
      name: 'Premium AI Lead Management',
      description: 'Advanced AI-powered lead management',
      price: 3000,
      isOneTime: false,
      features: [
        'AI lead scoring & routing',
        'Automated lead nurturing',
        'Custom pipelines & funnels',
        'Weekly reporting & strategy calls',
        'CRM system included',
        '24/7 support',
      ],
      cta: 'Book a Discovery Call',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Complete Growth Suite',
      description: 'Full AI + ad management + website',
      price: 4000,
      isOneTime: false,
      features: [
        'Everything in Premium AI',
        'AI ad generation & management',
        'Multi-platform campaigns',
        'Custom website included',
        'Dedicated account manager',
        'Weekly strategy meetings',
      ],
      cta: 'Book a Discovery Call',
      highlighted: false,
    },
  ];

  return (
    <SectionContainer className="bg-gradient-to-b from-white to-[#F9FAFB]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4">
          Simple Plans{' '}
          <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
            Built To Scale
          </span>
        </h2>
        <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
          Choose the plan that fits your growth stage. All plans include a 14-day free trial.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${
              plan.highlighted
                ? 'border-gold shadow-2xl scale-105 md:scale-110'
                : 'border-gray-200 shadow-lg hover:shadow-xl'
            }`}
          >
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="flex items-center space-x-1 bg-gradient-to-r from-gold to-blue text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
                  <Star className="h-4 w-4 fill-white" />
                  <span>{plan.badge}</span>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#111827] mb-2">{plan.name}</h3>
              <p className="text-[#6B7280] text-sm mb-6">{plan.description}</p>
              <div className="flex items-baseline">
                <span className="text-5xl font-bold bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
                  ${plan.price.toLocaleString()}
                </span>
                <span className="text-[#6B7280] ml-2">
                  {plan.isOneTime ? 'one-time' : '/month'}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, j) => (
                <li key={j} className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#111827] text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className={`w-full ${
                plan.highlighted
                  ? 'bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-[#111827] border-2 border-gray-900'
              }`}
              size="lg"
              asChild
            >
              <Link href="/contact">{plan.cta}</Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}

