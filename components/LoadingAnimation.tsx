'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Zap, TrendingUp, Users, Target, Sparkles, Brain, Rocket, BarChart3, Layers } from 'lucide-react';

interface LoadingAnimationProps {
  onComplete?: () => void;
}

export function LoadingAnimation({ onComplete }: LoadingAnimationProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);
  const [showSecondary, setShowSecondary] = useState(false);
  const [startWhoosh, setStartWhoosh] = useState(false);

  useEffect(() => {
    // Faster progress animation (2 seconds shorter)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Wait a moment to ensure page is ready
          setTimeout(() => {
            // Trigger whoosh animation
            setStartWhoosh(true);
            // Call onComplete after whoosh animation
            setTimeout(() => onComplete?.(), 1200);
          }, 300);
          return 100;
        }
        // Faster progression
        return prev + 1;
      });
    }, 30);

    // Stage transitions - adjusted for faster timing
    const stageTimer1 = setTimeout(() => setStage(1), 900);
    const stageTimer2 = setTimeout(() => setStage(2), 1800);
    const stageTimer3 = setTimeout(() => setStage(3), 2700);
    const secondaryTimer = setTimeout(() => setShowSecondary(true), 500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      clearTimeout(secondaryTimer);
    };
  }, [onComplete]);

  // Primary orbital particles
  const particles = [
    { icon: Users, color: '#EF4444', gradient: 'from-red-500 to-pink-500', delay: 0, angle: 0 },
    { icon: TrendingUp, color: '#F59E0B', gradient: 'from-orange-500 to-yellow-500', delay: 0.15, angle: 72 },
    { icon: Target, color: '#10B981', gradient: 'from-green-500 to-emerald-500', delay: 0.3, angle: 144 },
    { icon: Zap, color: '#3B82F6', gradient: 'from-blue-500 to-cyan-500', delay: 0.45, angle: 216 },
    { icon: Sparkles, color: '#8B5CF6', gradient: 'from-purple-500 to-fuchsia-500', delay: 0.6, angle: 288 },
  ];

  // Secondary inner orbit
  const secondaryParticles = [
    { icon: Brain, color: '#F6B800', size: 'small', delay: 0.2 },
    { icon: Rocket, color: '#1F4F9A', size: 'small', delay: 0.4 },
    { icon: BarChart3, color: '#10B981', size: 'small', delay: 0.6 },
    { icon: Layers, color: '#8B5CF6', size: 'small', delay: 0.8 },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 1, 
          ease: [0.16, 1, 0.3, 1]
        }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white"
        style={{
          willChange: 'opacity',
        }}
      >
        {/* Subtle animated background - optimized */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 20%, rgba(246,184,0,0.06), transparent 50%), radial-gradient(circle at 70% 80%, rgba(31,79,154,0.06), transparent 50%)',
          }}
        />

        {/* Simple floating orbs - reduced from 8 to 4 for performance */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            animate={{
              y: [0, -60, 0],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 10 + i * 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{
              width: `${250 + i * 80}px`,
              height: `${250 + i * 80}px`,
              background: i % 2 === 0 ? 'radial-gradient(circle, rgba(31, 79, 154, 0.15), transparent)' : 
                         'radial-gradient(circle, rgba(246, 184, 0, 0.15), transparent)',
              left: `${15 + (i * 20)}%`,
              top: `${20 + Math.sin(i) * 25}%`,
              willChange: 'transform, opacity',
            }}
          />
        ))}

        {/* Main container */}
        <div className="relative flex flex-col items-center justify-center space-y-8 sm:space-y-12 px-4">
          {/* Central logo area with orbiting particles */}
          <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
            {/* Optimized glow effects - single layer */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full blur-[60px] sm:blur-[80px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(246, 184, 0, 0.4), rgba(31, 79, 154, 0.3), transparent)',
                willChange: 'transform, opacity',
              }}
            />

            {/* Logo Core with Whoosh Animation */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={ startWhoosh ? {
                scale: [1, 0.3],
                opacity: [1, 0],
                y: [0, -50],
              } : { 
                scale: 1, 
                opacity: 1,
                y: 0,
              }}
              transition={startWhoosh ? {
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              } : {
                scale: { duration: 1, ease: [0.34, 1.56, 0.64, 1] },
                opacity: { duration: 0.8 },
              }}
              className="absolute z-20 w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44"
              style={{
                willChange: 'transform, opacity',
              }}
            >
              <motion.div
                animate={!startWhoosh ? {
                  rotate: 360,
                } : {}}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="relative w-full h-full"
              >
                {/* Logo container with glow */}
                <motion.div
                  animate={!startWhoosh ? {
                    boxShadow: [
                      '0 15px 80px rgba(246, 184, 0, 0.25), 0 5px 50px rgba(31, 79, 154, 0.2)',
                      '0 15px 100px rgba(31, 79, 154, 0.25), 0 5px 60px rgba(246, 184, 0, 0.2)',
                      '0 15px 80px rgba(246, 184, 0, 0.25), 0 5px 50px rgba(31, 79, 154, 0.2)',
                    ],
                  } : {}}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-3xl bg-white shadow-2xl border border-gray-200 flex items-center justify-center p-6"
                >
                  <motion.div
                    animate={!startWhoosh ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                  >
                    {/* Clean "U" letter - responsive sizing */}
                    <div className="text-6xl sm:text-7xl md:text-8xl font-black bg-gradient-to-br from-[#1F4F9A] to-[#3B82F6] bg-clip-text text-transparent">
                      U
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Optimized orbiting particles - fade out during whoosh */}
            {!startWhoosh && particles.map((particle, index) => {
              const radius = 170;
              const angleRad = (particle.angle * Math.PI) / 180;
              
              return (
                <motion.div
                  key={`primary-${index}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    rotate: 360,
                    opacity: 1,
                  }}
                  transition={{
                    opacity: { delay: particle.delay + 0.4, duration: 0.5 },
                    rotate: {
                      duration: 15,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: particle.delay,
                    }
                  }}
                  className="absolute w-[500px] h-[500px]"
                  style={{
                    transformOrigin: 'center center',
                    willChange: 'transform',
                  }}
                >
                  <motion.div
                    className="absolute"
                    style={{
                      left: `calc(50% + ${radius * Math.cos(angleRad)}px)`,
                      top: `calc(50% + ${radius * Math.sin(angleRad)}px)`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <motion.div
                      animate={{
                        rotate: -360,
                        y: [0, -6, 0],
                      }}
                      transition={{
                        rotate: {
                          duration: 15,
                          repeat: Infinity,
                          ease: 'linear',
                        },
                        y: {
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                      }}
                      className="relative"
                      style={{
                        willChange: 'transform',
                      }}
                    >
                      <div
                        className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center bg-gradient-to-br ${particle.gradient} border border-white/20`}
                      >
                        <particle.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      
                      {/* Simplified connection line */}
                      <motion.div
                        animate={{
                          opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: particle.delay,
                        }}
                        className="absolute top-1/2 left-1/2 origin-left pointer-events-none"
                        style={{
                          height: '2px',
                          background: `linear-gradient(90deg, ${particle.color}60, transparent)`,
                          width: `${radius - 35}px`,
                          transform: `rotate(${180 + particle.angle}deg)`,
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Optimized secondary orbit - fade out during whoosh */}
            <AnimatePresence>
              {!startWhoosh && showSecondary && secondaryParticles.map((particle, index) => {
                const radius = 90;
                const angle = (360 / secondaryParticles.length) * index;
                const angleRad = (angle * Math.PI) / 180;
                
                return (
                  <motion.div
                    key={`secondary-${index}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: -360,
                    }}
                    transition={{
                      scale: { duration: 0.6, ease: 'backOut', delay: particle.delay },
                      opacity: { duration: 0.4, delay: particle.delay },
                      rotate: {
                        duration: 18,
                        repeat: Infinity,
                        ease: 'linear',
                      }
                    }}
                    className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]"
                    style={{
                      transformOrigin: 'center center',
                      willChange: 'transform',
                    }}
                  >
                    <motion.div
                      className="absolute"
                      style={{
                        left: `calc(50% + ${radius * Math.cos(angleRad)}px)`,
                        top: `calc(50% + ${radius * Math.sin(angleRad)}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <motion.div
                        animate={{
                          rotate: 360,
                        }}
                        transition={{
                          rotate: { duration: 18, repeat: Infinity, ease: 'linear' },
                        }}
                        className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-white shadow-md border border-gray-100 flex items-center justify-center"
                        style={{
                          willChange: 'transform',
                        }}
                      >
                        <particle.icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" style={{ color: particle.color }} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Simplified rotating rings - fixed responsive sizing */}
            {!startWhoosh && [0, 1, 2].map((index) => {
              // Fixed sizes for each ring - mobile optimized
              const sizes = [
                { mobile: 140, tablet: 180, desktop: 220 },
                { mobile: 170, tablet: 220, desktop: 270 },
                { mobile: 200, tablet: 260, desktop: 320 },
              ];
              const size = sizes[index];
              
              return (
                <motion.div
                  key={`ring-${index}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    rotate: index % 2 === 0 ? 360 : -360,
                  }}
                  transition={{
                    scale: { duration: 0.7, ease: 'backOut', delay: 0.2 + index * 0.1 },
                    opacity: { duration: 0.5, delay: 0.2 + index * 0.1 },
                    rotate: {
                      duration: 20 + index * 5,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                  }}
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    width: `${size.desktop}px`,
                    height: `${size.desktop}px`,
                    border: index % 2 === 0 ? '2px dashed rgba(246, 184, 0, 0.15)' : '2px dotted rgba(31, 79, 154, 0.15)',
                    willChange: 'transform',
                  }}
                />
              );
            })}
          </div>

          {/* Optimized text animations - fade out during whoosh */}
          <motion.div 
            animate={startWhoosh ? {
              opacity: 0,
              y: 20,
            } : {
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
              className="space-y-3"
            >
              <h2 className="text-4xl font-black text-[#111827] mb-2 tracking-tight">
                Unifictional
              </h2>
              
              <AnimatePresence mode="wait">
                <motion.p
                  key={stage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-base font-semibold text-[#6B7280]"
                >
                  {stage === 0 && 'Unifying your AI ecosystem...'}
                  {stage === 1 && 'Connecting data streams...'}
                  {stage === 2 && 'Optimizing workflows...'}
                  {stage === 3 && 'Preparing your dashboard...'}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Optimized progress bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="w-72 mx-auto"
            >
              <div className="relative h-2 sm:h-2.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200 shadow-inner">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #F6B800, #1F4F9A)',
                    width: `${progress}%`,
                  }}
                  transition={{ duration: 0.05, ease: 'linear' }}
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    style={{
                      width: '50%',
                    }}
                  />
                </motion.div>
              </div>
              
              <div className="flex justify-between items-center mt-2 sm:mt-2.5">
                <p className="text-[10px] sm:text-xs font-medium text-[#9CA3AF]">
                  Loading
                </p>
                <motion.p
                  className="text-xs sm:text-sm font-bold text-[#1F4F9A]"
                  animate={{ 
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {progress}%
                </motion.p>
              </div>
            </motion.div>
          </motion.div>

          {/* Reduced particles for performance - fade out during whoosh */}
          {!startWhoosh && [...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                y: [0, -200],
                x: [0, Math.sin(i) * 60],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: 'easeOut',
                delay: i * 0.5,
              }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${3 + (i % 2) * 2}px`,
                height: `${3 + (i % 2) * 2}px`,
                background: i % 2 === 0 ? '#F6B800' : '#1F4F9A',
                left: `${10 + (i * 10)}%`,
                top: '75%',
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

