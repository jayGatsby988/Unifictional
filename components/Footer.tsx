import Link from 'next/link';
import { Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  const productLinks = [
    { href: '/', label: 'Features' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/solutions', label: 'Solutions' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const resourceLinks = [
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gold to-blue bg-clip-text text-transparent mb-3 sm:mb-4">
              Unifictional
            </div>
            <p className="text-[#6B7280] text-xs sm:text-sm">
              Unified AI for leads, ads, and growth.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#111827] mb-3 sm:mb-4 text-sm sm:text-base">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B7280] hover:text-blue transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#111827] mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B7280] hover:text-blue transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#111827] mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#6B7280] hover:text-blue transition-colors duration-200 text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[#6B7280] text-sm">
            © {new Date().getFullYear()} Unifictional. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <a href="#" aria-label="Twitter" className="text-[#6B7280] hover:text-blue transition-colors duration-200">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-[#6B7280] hover:text-blue transition-colors duration-200">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" aria-label="GitHub" className="text-[#6B7280] hover:text-blue transition-colors duration-200">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
