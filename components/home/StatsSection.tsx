'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { TrendingUp, Users, Zap, Award } from 'lucide-react';

function AnimatedCounter({ end, suffix = '', prefix = '', duration = 2000 }: {
  end: number; suffix?: string; prefix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      // Eased progress
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  {
    icon: TrendingUp,
    value: 42,
    suffix: '%',
    prefix: '+',
    label: 'Average increase in qualified leads',
    sub: 'within first 60 days',
    color: 'from-gold to-orange-400',
    glow: 'rgba(246,184,0,0.3)',
    iconBg: 'bg-gold/20',
    iconColor: 'text-gold',
  },
  {
    icon: Zap,
    value: 3,
    suffix: 'x',
    prefix: '',
    label: 'Faster ad creation workflow',
    sub: 'compared to manual process',
    color: 'from-blue to-cyan-400',
    glow: 'rgba(31,79,154,0.3)',
    iconBg: 'bg-blue/20',
    iconColor: 'text-blue-300',
  },
  {
    icon: Users,
    value: 500,
    suffix: '+',
    prefix: '',
    label: 'Agencies & brands trusting us',
    sub: 'across 30+ countries',
    color: 'from-purple-500 to-indigo-400',
    glow: 'rgba(139,92,246,0.3)',
    iconBg: 'bg-purple-500/20',
    iconColor: 'text-purple-400',
  },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 md:py-28">
      {/* Dark premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1e] via-[#111827] to-[#0a0f1e]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(246,184,0,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(31,79,154,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dark-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dark-grid)" />
        </svg>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + (i % 4),
            height: 2 + (i % 4),
            top: `${10 + (i * 7) % 80}%`,
            left: `${5 + (i * 13) % 90}%`,
            background: i % 2 === 0 ? 'rgba(246,184,0,0.5)' : 'rgba(31,79,154,0.5)',
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: -(i * 0.5),
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 rounded-full px-4 py-1.5 mb-4"
          >
            <Award className="h-3.5 w-3.5 text-gold" />
            <span className="text-xs font-semibold text-gold uppercase tracking-widest">Proven Results</span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Real results from{' '}
            <span className="bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent animate-gradient-shift" style={{ backgroundSize: '200% auto' }}>
              real users
            </span>
          </h2>
          <p className="text-white/60 text-base sm:text-lg max-w-xl mx-auto">
            Agencies and brands using Unifictional see transformative results within weeks.
          </p>
        </motion.div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="relative group"
            >
              {/* Card glow */}
              <div
                className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${stat.glow} 0%, transparent 70%)` }}
              />

              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-white/20 hover:bg-white/8 transition-all duration-300 text-center overflow-hidden">

                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon */}
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-2xl ${stat.iconBg} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>

                {/* Number */}
                <div className={`text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  style={{ filter: isInView ? 'none' : undefined }}
                >
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
                </div>

                {/* Label */}
                <p className="text-white font-semibold text-base sm:text-lg mb-1">{stat.label}</p>
                <p className="text-white/40 text-sm">{stat.sub}</p>

                {/* Progress bar decoration */}
                <div className="mt-5 h-px bg-white/10 overflow-hidden rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${60 + i * 15}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10 sm:mt-14"
        >
          {[
            'SOC 2 Compliant',
            'GDPR Ready',
            '99.9% Uptime',
            'Enterprise Security',
          ].map((badge, i) => (
            <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
              <span className="text-white/70 text-xs sm:text-sm font-medium">{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
