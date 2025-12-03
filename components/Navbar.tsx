'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Product' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-xl sm:text-2xl font-black bg-gradient-to-br from-[#1F4F9A] to-[#3B82F6] bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105">
              Unifictional
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group text-[#111827] hover:text-blue font-medium relative pb-1 transition-colors duration-300 ease-in-out ${
                  isActive(link.href) ? 'text-blue' : ''
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold to-blue transition-all duration-500 ease-in-out ${
                    isActive(link.href) ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                  }`}
                ></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-gold hover:bg-gold-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-[#111827]" />
            ) : (
              <Menu className="h-6 w-6 text-[#111827]" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block hover:text-blue hover:bg-gray-50 transition-all duration-300 ease-in-out font-medium py-3 px-4 rounded-lg relative ${
                  isActive(link.href) 
                    ? 'text-blue bg-blue-50 border-l-4 border-gold shadow-sm' 
                    : 'text-[#111827] border-l-4 border-transparent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button className="w-full bg-gold hover:bg-gold-600 text-white shadow-md" size="lg" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
