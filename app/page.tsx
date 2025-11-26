'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LoadingAnimation } from '@/components/LoadingAnimation';
import { HeroSection } from '@/components/home/HeroSection';
import { ProblemSolutionSection } from '@/components/home/ProblemSolutionSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { CaseStudiesSection } from '@/components/home/CaseStudiesSection';
import { PricingCardsSection } from '@/components/home/PricingCardsSection';
import { FAQSection } from '@/components/home/FAQSection';
import { CTASection } from '@/components/home/CTASection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Check if user has visited before in this session
    const hasVisited = sessionStorage.getItem('hasVisitedHome');
    if (hasVisited) {
      setIsLoading(false);
      setShowContent(true);
      setContentReady(true);
      return;
    }

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      setContentReady(true);
    } else {
      window.addEventListener('load', () => {
        setContentReady(true);
      });
    }

    return () => {
      window.removeEventListener('load', () => {
        setContentReady(true);
      });
    };
  }, []);

  const handleLoadingComplete = () => {
    // Only complete loading if content is ready
    if (contentReady) {
      sessionStorage.setItem('hasVisitedHome', 'true');
      setIsLoading(false);
      // Perfect timing to sync with whoosh animation
      setTimeout(() => setShowContent(true), 400);
    } else {
      // Wait for content to be ready, then complete
      const checkReady = setInterval(() => {
        if (contentReady) {
          clearInterval(checkReady);
          sessionStorage.setItem('hasVisitedHome', 'true');
          setIsLoading(false);
          setTimeout(() => setShowContent(true), 400);
        }
      }, 100);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingAnimation key="loading" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1 // Small delay ensures content is mounted
            }}
          >
            <HeroSection />
            <ProblemSolutionSection />
            <FeaturesSection />
            <HowItWorksSection />
            <StatsSection />
            <CaseStudiesSection />
            <TestimonialsSection />
            <PricingCardsSection />
            <FAQSection />
            <CTASection />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
