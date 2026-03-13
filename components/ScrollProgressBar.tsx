'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #F6B800 0%, #FFCF33 30%, #1F4F9A 70%, #3B82F6 100%)',
        boxShadow: '0 0 10px rgba(246,184,0,0.5), 0 0 20px rgba(31,79,154,0.3)',
      }}
    />
  );
}
