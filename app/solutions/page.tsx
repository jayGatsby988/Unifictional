'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/SectionContainer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Building2, User, Users, Sparkles, ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState('websites');

  const solutions = {
    websites: {
      title: 'Custom Websites',
      icon: Building2,
      description: 'Beautiful, high-converting websites built with AI integration from day one.',
      benefits: [
        'Modern, responsive design that works on all devices',
        'AI chatbot for instant customer engagement',
        'Optimized for lead capture and conversions',
        'SEO-friendly structure for organic growth',
      ],
      workflow: [
        {
          title: 'Discovery & Design',
          description: 'We understand your brand and create a custom design that reflects your vision and converts visitors into customers.',
        },
        {
          title: 'Development & Integration',
          description: 'Build your website with cutting-edge technology and integrate AI tools for automated lead capture.',
        },
        {
          title: 'Launch & Support',
          description: 'Go live in 3 days with 30 days of support to ensure everything runs smoothly.',
        },
      ],
    },
    leadManagement: {
      title: 'AI Lead Management',
      icon: Users,
      description: 'Intelligent lead management that never misses an opportunity and always follows up at the right time.',
      benefits: [
        'AI-powered lead scoring to prioritize your best prospects',
        'Automated nurturing sequences that adapt to behavior',
        'Custom pipelines and funnels for your sales process',
        'Real-time analytics with weekly strategy calls',
      ],
      workflow: [
        {
          title: 'Capture & Score',
          description: 'Automatically capture leads from all sources and use AI to score them based on conversion likelihood.',
        },
        {
          title: 'Nurture & Convert',
          description: 'AI-powered workflows engage leads at the perfect moment with personalized messaging.',
        },
        {
          title: 'Track & Optimize',
          description: 'Weekly reports and strategy meetings keep you informed and help optimize your funnel for maximum ROI.',
        },
      ],
    },
    adManagement: {
      title: 'AI Ad Management',
      icon: Sparkles,
      description: 'Let AI create, test, and optimize your ad campaigns across all major platforms.',
      benefits: [
        'AI-generated ad copy and creative that converts',
        'Multi-platform campaign management (Meta, Google, TikTok)',
        'Automated A/B testing and optimization',
        'Transparent reporting with clear ROI metrics',
      ],
      workflow: [
        {
          title: 'Strategy & Setup',
          description: 'We work with you to understand your goals and set up campaigns that align with your business objectives.',
        },
        {
          title: 'AI Creation & Testing',
          description: 'Our AI generates multiple ad variations and continuously tests to find winning combinations.',
        },
        {
          title: 'Scale & Optimize',
          description: 'As performance improves, we scale your best campaigns and continuously refine for better results.',
        },
      ],
    },
    complete: {
      title: 'Complete Growth Suite',
      icon: TrendingUp,
      description: 'The full package: website, AI lead management, and ad management working together seamlessly.',
      benefits: [
        'Everything working together in perfect harmony',
        'Custom website with built-in lead capture',
        'AI managing your leads from first touch to conversion',
        'Professional ad campaigns driving qualified traffic',
      ],
      workflow: [
        {
          title: 'Comprehensive Setup',
          description: 'We build your website, set up your AI lead system, and launch your ad campaigns all at once.',
        },
        {
          title: 'Integrated Automation',
          description: 'Your ads drive traffic to your site, leads are automatically captured and nurtured, all working in sync.',
        },
        {
          title: 'Continuous Growth',
          description: 'Weekly strategy meetings and ongoing optimization ensure your marketing engine keeps improving.',
        },
      ],
    },
  };

  const currentSolution = solutions[activeTab as keyof typeof solutions];
  const Icon = currentSolution.icon;

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
            Tailored Solutions for{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              Your Growth
            </span>
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            From custom websites to full-scale AI marketing automation, we build solutions that drive real results for your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {Object.entries(solutions).map(([key, solution]) => {
            const SolutionIcon = solution.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-gold to-blue text-white shadow-lg'
                    : 'bg-white text-[#111827] border border-gray-200 hover:border-gold'
                }`}
              >
                <SolutionIcon className="h-5 w-5" />
                <span>{solution.title}</span>
              </button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
            <div className="flex items-start space-x-4 mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-gold to-blue flex items-center justify-center flex-shrink-0">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#111827] mb-3">{currentSolution.title}</h2>
                <p className="text-lg text-[#6B7280]">{currentSolution.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {currentSolution.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-[#111827]">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-[#111827] mb-6">Your journey with Unifictional</h3>
              <div className="space-y-6">
                {currentSolution.workflow.map((step, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gold to-blue flex items-center justify-center text-white font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-[#111827] mb-2">{step.title}</h4>
                      <p className="text-[#6B7280]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                asChild
              >
                <Link href="/contact">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-blue text-blue hover:bg-blue hover:text-white"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </SectionContainer>
      <CaseStudiesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
