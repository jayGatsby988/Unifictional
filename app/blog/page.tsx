'use client';

import { motion } from 'framer-motion';
import { SectionContainer } from '@/components/SectionContainer';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const posts = [
    {
      title: 'How AI is Transforming Lead Scoring in 2024',
      category: 'AI',
      excerpt: 'Discover how machine learning models are revolutionizing the way agencies qualify and prioritize leads.',
      date: 'Jan 15, 2024',
      readTime: '5 min read',
      slug: 'ai-lead-scoring-2024',
    },
    {
      title: '5 Ad Variations That Convert: Insights from 1000+ Campaigns',
      category: 'Ads',
      excerpt: 'Data-driven insights into what makes ad creative resonate with audiences across different platforms.',
      date: 'Jan 12, 2024',
      readTime: '8 min read',
      slug: 'ad-variations-convert',
    },
    {
      title: 'Building a Predictable Lead Generation Pipeline',
      category: 'Lead Gen',
      excerpt: 'Step-by-step framework for creating consistent, scalable lead generation that agencies can rely on.',
      date: 'Jan 8, 2024',
      readTime: '6 min read',
      slug: 'predictable-pipeline',
    },
    {
      title: 'Agency Operations: From Chaos to Systems',
      category: 'Agency Ops',
      excerpt: 'How successful agencies standardize their workflows to scale without burning out their teams.',
      date: 'Jan 5, 2024',
      readTime: '7 min read',
      slug: 'agency-systems',
    },
    {
      title: 'The ROI of Marketing Automation: Real Numbers',
      category: 'Lead Gen',
      excerpt: 'Actual data from agencies showing time saved and revenue gained from automated nurture sequences.',
      date: 'Dec 29, 2023',
      readTime: '5 min read',
      slug: 'automation-roi',
    },
    {
      title: 'Multi-Platform Ad Strategy: A Complete Guide',
      category: 'Ads',
      excerpt: 'Learn how to coordinate campaigns across Meta, Google, LinkedIn, and TikTok for maximum impact.',
      date: 'Dec 22, 2023',
      readTime: '10 min read',
      slug: 'multi-platform-ads',
    },
  ];

  const categories = ['All', 'AI', 'Ads', 'Lead Gen', 'Agency Ops'];

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
            Insights for{' '}
            <span className="bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent">
              modern growth
            </span>
          </h1>
          <p className="text-xl text-[#6B7280] max-w-3xl mx-auto">
            Practical guides, data-driven insights, and best practices for agencies, freelancers, and brands.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category, i) => (
            <button
              key={i}
              className="px-6 py-2 rounded-full font-medium transition-all duration-200 bg-white text-[#111827] border border-gray-200 hover:border-gold hover:text-gold"
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="h-48 bg-gradient-to-br from-gold to-blue"></div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-3">
                  <span className="text-xs font-semibold text-blue bg-blue-50 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-xs text-[#6B7280]">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-blue transition-colors">
                  {post.title}
                </h2>
                <p className="text-[#6B7280] mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-[#6B7280]">
                    <Clock className="h-4 w-4 mr-1" />
                    {post.readTime}
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-gold font-medium flex items-center hover:text-gold-600 transition-colors"
                  >
                    Read more
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-blue text-blue hover:bg-blue hover:text-white"
          >
            Load More Articles
          </Button>
        </motion.div>
      </SectionContainer>

      <SectionContainer className="bg-gradient-to-br from-gold-50 to-blue-50 border-y border-gold-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] mb-6">
            Ready to put these insights into action?
          </h2>
          <p className="text-lg text-[#6B7280] mb-8 max-w-2xl mx-auto">
            Join agencies and freelancers who are already scaling faster with Unifictional.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-gold to-blue hover:opacity-90 text-white shadow-lg"
            asChild
          >
            <Link href="/contact">Start Free Trial</Link>
          </Button>
        </motion.div>
      </SectionContainer>
    </>
  );
}
