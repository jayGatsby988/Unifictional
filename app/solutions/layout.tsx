import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solutions - Unifictional',
  description: 'Discover how Unifictional adapts to your workflow whether you\'re an agency, freelancer, in-house team, or creator.',
};

export default function SolutionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
