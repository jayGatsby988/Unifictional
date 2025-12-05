'use client';

import { useEffect } from 'react';

export function PreventFlash() {
  useEffect(() => {
    // Add loading class immediately to prevent flash
    document.documentElement.classList.add('loading');
    
    // Ensure loading class is removed after a short delay to allow scrolling
    const timer = setTimeout(() => {
      if (document.documentElement.classList.contains('loading')) {
        document.documentElement.classList.remove('loading');
        document.documentElement.classList.add('loaded');
      }
    }, 100);
    
    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('loading');
      document.documentElement.classList.add('loaded');
    };
  }, []);

  return null;
}

