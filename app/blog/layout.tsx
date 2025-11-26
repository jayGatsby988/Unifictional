import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Unifictional',
  description: 'Practical guides, data-driven insights, and best practices for modern growth from Unifictional.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
