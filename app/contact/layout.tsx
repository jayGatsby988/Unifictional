import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Unifictional',
  description: 'Get in touch with Unifictional. Book a demo or start your free trial. No credit card required.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
