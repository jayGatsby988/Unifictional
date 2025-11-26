'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const faqs = [
    {
      question: 'How does the AI lead scoring work?',
      answer: 'Our AI analyzes dozens of data points including engagement history, demographic fit, behavior patterns, and intent signals to assign each lead a score from 0-100. The model learns from your conversions to continuously improve accuracy.',
    },
    {
      question: 'What ad platforms does Unifictional support?',
      answer: 'We currently support Meta (Facebook & Instagram), Google Ads, TikTok, and Twitter. Our AI generates platform-specific ad variations optimized for each channel\'s best practices and audience behaviors.',
    },
    {
      question: 'Is my data secure and private?',
      answer: 'Absolutely. We use enterprise-grade encryption, maintain SOC 2 compliance, and never share your data with third parties. Your leads and campaign data belong to you and can be exported at any time.',
    },
    {
      question: 'How quickly can I get started?',
      answer: 'Most clients are fully set up and live within 3 days. Our team works with you to connect your accounts, set up your custom workflows, and ensure everything is optimized for your business.',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'All plans include email support. Team and Agency plans get priority support with dedicated Slack channels. We also provide comprehensive documentation, video tutorials, and monthly webinars.',
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Yes, you can cancel your subscription at any time with no penalties or fees. Your data remains accessible for 30 days after cancellation, giving you plenty of time to export everything.',
    },
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
            Frequently asked{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Everything you need to know about Unifictional. Can't find the answer you're looking for? Reach out to our team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-gray-50 border border-gray-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-[#111827] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#6B7280] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
