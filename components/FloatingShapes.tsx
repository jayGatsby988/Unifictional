'use client';

import { useEffect, useRef } from 'react';

interface ShapeProps {
  variant?: 'light' | 'dark' | 'gold' | 'blue' | 'mixed';
  density?: 'low' | 'medium' | 'high';
  className?: string;
}

export function FloatingShapes({ variant = 'light', density = 'medium', className = '' }: ShapeProps) {
  const shapes = [
    // Large blobs
    {
      style: {
        width: '400px', height: '400px',
        top: '-100px', left: '-100px',
        background: variant === 'dark'
          ? 'radial-gradient(circle, rgba(246,184,0,0.12) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(246,184,0,0.08) 0%, transparent 70%)',
        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
        animationDuration: '12s',
        animationDelay: '0s',
      },
      anim: 'blob-morph',
      float: 'float-slow',
    },
    {
      style: {
        width: '350px', height: '350px',
        top: '20%', right: '-80px',
        background: variant === 'dark'
          ? 'radial-gradient(circle, rgba(31,79,154,0.15) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(31,79,154,0.07) 0%, transparent 70%)',
        borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
        animationDuration: '15s',
        animationDelay: '-3s',
      },
      anim: 'blob-morph',
      float: 'float-medium',
    },
    {
      style: {
        width: '300px', height: '300px',
        bottom: '10%', left: '15%',
        background: variant === 'dark'
          ? 'radial-gradient(circle, rgba(246,184,0,0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle, rgba(246,184,0,0.06) 0%, transparent 70%)',
        borderRadius: '50% 50% 30% 70% / 50% 70% 30% 50%',
        animationDuration: '10s',
        animationDelay: '-6s',
      },
      anim: 'blob-morph',
      float: 'float-slow',
    },

    // Medium geometric shapes
    {
      style: {
        width: '60px', height: '60px',
        top: '15%', left: '10%',
        border: variant === 'dark' ? '2px solid rgba(246,184,0,0.25)' : '2px solid rgba(246,184,0,0.2)',
        borderRadius: '12px',
        animationDuration: '8s',
        animationDelay: '-2s',
        transform: 'rotate(45deg)',
      },
      anim: '',
      float: 'float-medium',
    },
    {
      style: {
        width: '40px', height: '40px',
        top: '60%', right: '12%',
        border: variant === 'dark' ? '2px solid rgba(31,79,154,0.3)' : '2px solid rgba(31,79,154,0.2)',
        borderRadius: '8px',
        animationDuration: '6s',
        animationDelay: '-4s',
        transform: 'rotate(20deg)',
      },
      anim: '',
      float: 'float-fast',
    },
    {
      style: {
        width: '80px', height: '80px',
        bottom: '25%', right: '8%',
        border: variant === 'dark' ? '2px solid rgba(246,184,0,0.2)' : '2px solid rgba(246,184,0,0.15)',
        borderRadius: '50%',
        animationDuration: '9s',
        animationDelay: '-1s',
      },
      anim: '',
      float: 'float-slow',
    },
    {
      style: {
        width: '24px', height: '24px',
        top: '40%', left: '5%',
        background: variant === 'dark' ? 'rgba(246,184,0,0.3)' : 'rgba(246,184,0,0.2)',
        borderRadius: '50%',
        animationDuration: '5s',
        animationDelay: '-3s',
      },
      anim: '',
      float: 'float-fast',
    },
    {
      style: {
        width: '16px', height: '16px',
        top: '75%', left: '25%',
        background: variant === 'dark' ? 'rgba(31,79,154,0.4)' : 'rgba(31,79,154,0.2)',
        borderRadius: '50%',
        animationDuration: '7s',
        animationDelay: '-5s',
      },
      anim: '',
      float: 'float-medium',
    },
    {
      style: {
        width: '12px', height: '12px',
        top: '30%', right: '20%',
        background: variant === 'dark' ? 'rgba(246,184,0,0.5)' : 'rgba(246,184,0,0.3)',
        borderRadius: '50%',
        animationDuration: '4s',
        animationDelay: '-2s',
      },
      anim: '',
      float: 'float-fast',
    },

    // Ring shapes
    {
      style: {
        width: '120px', height: '120px',
        top: '8%', right: '25%',
        border: variant === 'dark' ? '3px solid rgba(246,184,0,0.15)' : '3px solid rgba(246,184,0,0.12)',
        borderRadius: '50%',
        animationDuration: '11s',
        animationDelay: '-7s',
      },
      anim: 'spin-slow',
      float: '',
    },
    {
      style: {
        width: '80px', height: '80px',
        bottom: '15%', left: '8%',
        border: variant === 'dark' ? '2px solid rgba(31,79,154,0.2)' : '2px solid rgba(31,79,154,0.15)',
        borderRadius: '50%',
        animationDuration: '14s',
        animationDelay: '-4s',
      },
      anim: 'spin-reverse',
      float: '',
    },

    // Small accent dots
    {
      style: {
        width: '8px', height: '8px',
        top: '55%', right: '30%',
        background: variant === 'dark' ? 'rgba(246,184,0,0.6)' : 'rgba(246,184,0,0.4)',
        borderRadius: '50%',
        animationDuration: '3s',
        animationDelay: '-1s',
      },
      anim: 'dot-pulse',
      float: '',
    },
    {
      style: {
        width: '8px', height: '8px',
        top: '20%', left: '40%',
        background: variant === 'dark' ? 'rgba(31,79,154,0.6)' : 'rgba(31,79,154,0.3)',
        borderRadius: '50%',
        animationDuration: '4s',
        animationDelay: '-2s',
      },
      anim: 'dot-pulse',
      float: '',
    },
    {
      style: {
        width: '6px', height: '6px',
        bottom: '40%', right: '40%',
        background: variant === 'dark' ? 'rgba(246,184,0,0.7)' : 'rgba(246,184,0,0.5)',
        borderRadius: '50%',
        animationDuration: '2.5s',
        animationDelay: '-3s',
      },
      anim: 'dot-pulse',
      float: '',
    },
  ];

  const visibleShapes = density === 'low' ? shapes.slice(0, 6) : density === 'high' ? shapes : shapes.slice(0, 10);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      {visibleShapes.map((shape, i) => {
        const animClasses = [
          shape.anim ? `animate-${shape.anim}` : '',
          shape.float ? `animate-${shape.float}` : '',
        ].filter(Boolean).join(' ');

        return (
          <div
            key={i}
            className={animClasses}
            style={{
              position: 'absolute',
              ...shape.style,
            }}
          />
        );
      })}
    </div>
  );
}

// Lightweight version for subtle backgrounds
export function FloatingDots({ className = '', color = 'gold' }: { className?: string; color?: 'gold' | 'blue' | 'mixed' }) {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    size: Math.random() * 6 + 3,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    delay: `${-Math.random() * 10}s`,
    duration: `${4 + Math.random() * 6}s`,
    opacity: 0.1 + Math.random() * 0.2,
    isGold: color === 'mixed' ? Math.random() > 0.5 : color === 'gold',
  }));

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {dots.map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            background: dot.isGold ? '#F6B800' : '#1F4F9A',
            opacity: dot.opacity,
            animationDelay: dot.delay,
            animationDuration: dot.duration,
          }}
        />
      ))}
    </div>
  );
}

// Moving grid lines component
export function AnimatedGrid({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1F4F9A" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
