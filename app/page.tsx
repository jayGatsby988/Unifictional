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
      document.documentElement.classList.remove('loading');
      document.documentElement.classList.add('loaded');
      return;
    }

    // Set content ready immediately for first-time visitors
    setContentReady(true);
    
    // Also listen for window load as backup
    if (document.readyState === 'complete') {
      setContentReady(true);
    } else {
      const handleLoad = () => {
        setContentReady(true);
      };
      window.addEventListener('load', handleLoad);
      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
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

  useEffect(() => {
    // Remove loading class and add loaded class when content is shown
    if (showContent) {
      document.documentElement.classList.remove('loading');
      document.documentElement.classList.add('loaded');
    } else {
      document.documentElement.classList.add('loading');
      document.documentElement.classList.remove('loaded');
    }
  }, [showContent]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <div data-loading-screen>
            <LoadingAnimation key="loading" onComplete={handleLoadingComplete} />
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            data-content-section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative z-0"
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
