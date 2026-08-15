'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/AgencyNavbar.css';
import BackButton from '@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton';

const navLinks = [
  { href: '/template-projects/creative-agency/work', label: 'Work' },
  { href: '/template-projects/creative-agency/services', label: 'Services' },
  { href: '/template-projects/creative-agency/about', label: 'About' },
  { href: '/template-projects/creative-agency/contact', label: 'Contact' },
];

export default function AgencyNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="agency-navbar">
      <BackButton />
      <div className="agency-navbar-inner">
        <Link
          href="/template-projects/creative-agency"
          className="agency-navbar-logo"
          onClick={closeMenu}
        >
          GLYPH<span className="agency-navbar-logo-dot">.</span>STUDIO
        </Link>

        <nav className={`agency-navbar-links ${isOpen ? 'agency-navbar-links-open' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`agency-navbar-link ${
                pathname === link.href ? 'agency-navbar-link-active' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/template-projects/creative-agency/contact"
            className="agency-navbar-cta"
            onClick={closeMenu}
          >
            Start a Project
          </Link>
        </nav>

        <button
          className="agency-navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}