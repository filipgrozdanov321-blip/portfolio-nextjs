import type { Metadata } from 'next';
import AgencyNavbar from './components/AgencyNavbar';
import AgencyFooter from './components/AgencyFooter';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Glyph Studio — Creative Agency',
  description:
    'A bold, independent creative studio specializing in branding, digital design, and motion for ambitious startups and challenger brands.',
};

export default function CreativeAgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="agency-layout">
      <AgencyNavbar />
      <main>{children}</main>
      <AgencyFooter />
    </div>
  );
}