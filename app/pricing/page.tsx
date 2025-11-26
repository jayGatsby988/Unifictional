'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Check, Shield, CreditCard, HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PricingCardsSection } from '@/components/home/PricingCardsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

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
        'Content management system',
        '30 days of support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Premium AI Lead Management',
      description: 'Advanced AI-powered lead management system',
      price: 3000,
      isOneTime: false,
      features: [
        'AI lead scoring & routing',
        'Automated lead nurturing',
        'Custom pipelines & funnels',
        'Advanced analytics dashboard',
        'Weekly reporting & strategy calls',
        'Email & SMS automation',
        'CRM system included',
        '24/7 support',
      ],
      cta: 'Get Started',
      highlighted: true,
      badge: 'Most Popular',
    },
    {
      name: 'Complete Growth Suite',
      description: 'Full AI lead management + ad management + website',
      price: 4000,
      isOneTime: false,
      features: [
        'Everything in Premium AI',
        'AI ad generation & management',
        'Multi-platform ad campaigns',
        'Custom website included',
        'Advanced automation workflows',
        'Dedicated account manager',
        'Weekly strategy meetings',
        'Priority support',
        'Custom integrations',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: 'Can I change plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.',
    },
    {
      question: 'What happens after my free trial?',
      answer: 'Your trial lasts 14 days. After that, you\'ll be charged based on your selected plan unless you cancel. No credit card required to start.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee. If you\'re not satisfied within the first 30 days, we\'ll refund your payment in full.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, Amex) and ACH transfers for annual plans. Enterprise customers can also pay via invoice.',
    },
  ];

  return (
    <>
      <SectionContainer className="bg-gradient-to-b from-white to-[#F9FAFB] pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
            Simple,{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              transparent pricing
            </span>
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto mb-8">
            Choose the package that fits your business needs. Custom solutions available.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative bg-white rounded-2xl p-8 border-2 transition-all duration-300 ${
                plan.highlighted
                  ? 'border-gold shadow-2xl scale-105'
                  : 'border-gray-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-gold to-blue text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#111827] mb-2">{plan.name}</h3>
                <p className="text-[#6B7280] text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-[#111827]">
                    ${plan.price.toLocaleString()}
                  </span>
                  <span className="text-[#6B7280] ml-2">
                    {plan.isOneTime ? 'one-time' : '/month'}
                  </span>
                </div>
                {!plan.isOneTime && (
                  <p className="text-sm text-[#6B7280] mt-2">
                    Billed monthly
                  </p>
                )}
              </div>

              <Button
                className={`w-full mb-6 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-[#111827]'
                }`}
                size="lg"
                asChild
              >
                <Link href="/contact">{plan.cta}</Link>
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-[#111827] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-gold-50 to-blue-50 rounded-2xl p-8 border border-gold-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <Shield className="h-12 w-12 text-gold" />
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-1">Security & Compliance</h3>
                  <p className="text-[#6B7280]">SOC 2 compliant · GDPR ready · Enterprise-grade encryption</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <CreditCard className="h-12 w-12 text-blue" />
                <div>
                  <h3 className="text-xl font-bold text-[#111827] mb-1">Flexible Billing</h3>
                  <p className="text-[#6B7280]">Cancel anytime · 30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#111827] mb-4">Frequently asked questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-white border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[#111827] hover:no-underline">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-gold" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-[#6B7280] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </SectionContainer>
      <PricingCardsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
