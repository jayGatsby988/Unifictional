import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Unifictional',
  description: 'Learn about Unifictional\'s mission to make sophisticated AI tools accessible to every agency, freelancer, and brand.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
