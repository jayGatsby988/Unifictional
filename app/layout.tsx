import './globals.css';
import type { Metadata } from 'next';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PreventFlash } from '@/components/PreventFlash';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { Toaster } from '@/components/ui/sonner';


export const metadata: Metadata = {
  title: 'Unifictional - Unified AI for leads, ads, and growth',
  description: 'Unifictional is an AI growth platform for agencies, freelancers, and brands. Centralize lead management, ad generation, and campaign intelligence in one clean, powerful dashboard',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  document.documentElement.classList.add('loading');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <PreventFlash />
        <ScrollProgressBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
