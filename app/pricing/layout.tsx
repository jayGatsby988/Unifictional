import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Unifictional',
  description: 'Simple, transparent pricing for Unifictional. Choose the plan that fits your needs with a 14-day free trial.',
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
