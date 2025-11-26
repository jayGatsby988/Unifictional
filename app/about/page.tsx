'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/SectionContainer';
import { CheckCircle2, Rocket, Users, TrendingUp, Target } from 'lucide-react';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { CTASection } from '@/components/home/CTASection';

export default function AboutPage() {
  const milestones = [
    { year: 'Jan 2024', title: 'The Beginning', description: 'Founded with a vision to simplify AI-powered growth' },
    { year: 'Dec 2024', title: 'Platform Launch', description: 'Launched our unified AI marketing platform' },
    { year: 'Jan 2025', title: 'First Clients', description: 'Onboarded first agency partners and refined our product' },
    { year: 'Nov 2025', title: '100 Customers', description: 'Reached 100 clients including agencies, freelancers, and brands' },
  ];

  const team = [
    {
      name: 'Trishank Methukula',
      role: 'Founder & CEO',
      avatar: 'TM',
      bio: 'Visionary founder building the future of AI-powered marketing with Unifictional.',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Simplicity First',
      description: 'We believe powerful tools should be easy to use. No complexity, no overwhelm.',
    },
    {
      icon: Users,
      title: 'Customer Obsessed',
      description: 'Every feature we build starts with listening to what our customers actually need.',
    },
    {
      icon: TrendingUp,
      title: 'Results Driven',
      description: 'Success means measurable growth for our customers, not just features shipped.',
    },
    {
      icon: Rocket,
      title: 'Continuous Innovation',
      description: 'AI evolves quickly. We stay ahead so you don\'t have to think about it.',
    },
  ];

  return (
    <>
      <SectionContainer className="bg-gradient-to-b from-white to-[#F9FAFB] pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#111827] mb-6">
            Building the future of{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              AI-powered growth
            </span>
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            We're on a mission to make sophisticated AI tools accessible to every agency, freelancer, and brand that wants to scale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-200">
            <h2 className="text-3xl font-bold text-[#111827] mb-6">Our Story</h2>
            <div className="space-y-4 text-[#6B7280] text-lg leading-relaxed">
              <p>
                Unifictional was born from frustration. Our founder, Trishank, was running a growing marketing agency and drowning in disconnected tools. One platform for leads, another for ads, a third for analytics—and none of them talking to each other.
              </p>
              <p>
                The promise of AI was everywhere, but the reality was scattered SaaS subscriptions and manual data entry. Trishank knew there had to be a better way.
              </p>
              <p>
                That's when the idea for Unifictional emerged: what if you could have all the AI-powered growth tools you need in one unified platform? A system that actually worked together, shared data intelligently, and made scaling feel effortless instead of overwhelming.
              </p>
              <p>
                In 2024, that vision became reality. We've quickly grown to serve 100 clients—agencies, freelancers, in-house teams, and creators—helping them unify their AI stack and focus on what matters most: results.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#111827] text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gold to-blue flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-2">{value.title}</h3>
                <p className="text-[#6B7280]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-[#111827] text-center mb-12">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold to-blue"></div>
              <div className="space-y-12">
                {milestones.map((milestone, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    className="relative flex items-center space-x-6"
                  >
                    <div className="flex-shrink-0 h-24 w-24 rounded-full bg-gradient-to-br from-gold to-blue flex items-center justify-center text-white font-bold text-sm leading-tight shadow-lg z-10 text-center p-2">
                      <span className="block">{milestone.year}</span>
                    </div>
                    <div className="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="text-xl font-bold text-[#111827] mb-2">{milestone.title}</h3>
                      <p className="text-[#6B7280]">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-20"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-0 items-stretch bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="lg:col-span-2 relative bg-gradient-to-br from-[#1F4F9A] via-[#2563EB] to-[#3B82F6] p-12 flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(246,184,0,0.15),transparent_70%)]"></div>
                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="mb-8"
                  >
                    <div className="h-56 w-56 rounded-full bg-white/10 backdrop-blur-md border-4 border-white/30 flex items-center justify-center mx-auto shadow-2xl">
                      <span className="text-white font-black text-8xl tracking-tight">TM</span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <div className="inline-block bg-gradient-to-r from-[#F6B800] to-[#FCD34D] px-8 py-4 rounded-2xl shadow-xl">
                      <p className="text-[#1F4F9A] font-black text-3xl">Founder & CEO</p>
                      <p className="text-[#1F4F9A] text-sm font-semibold mt-1">Visionary Leader</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="lg:col-span-3 p-10 md:p-14 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50"
              >
                <div className="mb-3">
                  <span className="inline-block px-4 py-1.5 bg-blue/10 text-blue text-xs font-bold rounded-full mb-4">
                    LEADERSHIP
                  </span>
                </div>
                <h2 className="text-5xl font-black text-[#111827] mb-3 tracking-tight">Meet the Founder</h2>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-[#F6B800] via-[#FCD34D] to-[#F6B800] bg-clip-text text-transparent mb-8">
                  Trishank Methukula
                </h3>
                <div className="space-y-5 text-[#4B5563] text-base leading-relaxed">
                  <p className="text-lg">
                    Trishank founded <span className="font-semibold text-[#111827]">Unifictional</span> with a singular vision: to revolutionize how businesses leverage AI for exponential growth.
                  </p>
                  <p>
                    Drawing from deep experience in marketing and technology, he recognized the fragmentation plaguing the industry and built a unified platform that turns complexity into simplicity.
                  </p>
                  <p>
                    His mission is clear—make cutting-edge AI accessible to everyone. Under his leadership, Unifictional empowers agencies, freelancers, and brands worldwide to scale effortlessly and achieve results that matter.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </SectionContainer>
      <CaseStudiesSection />
      <CTASection />
    </>
  );
}
