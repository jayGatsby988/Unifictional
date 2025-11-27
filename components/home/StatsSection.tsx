'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { SectionContainer } from '@/components/SectionContainer';

function Counter({ end, suffix = '', prefix = '' }: { end: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { value: 42, suffix: '%', label: 'Average increase in qualified leads' },
    { value: 3, suffix: 'x', label: 'Faster ad creation workflow' },
    { value: 6, suffix: '+', label: 'Platforms centralized in one dashboard' },
  ];

  return (
    <SectionContainer className="bg-gradient-to-br from-gold-50 via-white to-blue-50 border-y border-gray-200">
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12 px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#111827] mb-3 sm:mb-4">
            Real results from real users
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent mb-3 sm:mb-4">
                <Counter end={stat.value} suffix={stat.suffix} prefix={i === 0 ? '+' : ''} />
              </div>
              <p className="text-[#6B7280] text-sm sm:text-base md:text-lg">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
