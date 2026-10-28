'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import '../styles/AgencyNavbar.css';
import BackButton from '@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton';

// Keep this number in sync with the 768px media query in AgencyNavbar.css
const MOBILE_QUERY = '(max-width: 768px)';

const navLinks = [
  { href: '/template-projects/creative-agency/work', label: 'Work' },
  { href: '/template-projects/creative-agency/services', label: 'Services' },
  { href: '/template-projects/creative-agency/about', label: 'About' },
  { href: '/template-projects/creative-agency/contact', label: 'Contact' },
];

export default function AgencyNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setIsOpen(false);

  // Close the menu when the route changes (also covers browser back/forward)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  // While the menu is open: Escape closes it, and so does a press anywhere
  // outside the navbar.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setIsOpen(false);
      toggleRef.current?.focus(); // don't lose keyboard focus
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen]);

  // If the window grows past the mobile breakpoint (rotating a tablet,
  // resizing a browser), reset the mobile menu.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      if (!e.matches) setIsOpen(false);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      {/* The Back button used to sit INSIDE the header. The header has
          backdrop-filter, and browsers treat that as a new "frame" for
          position: fixed children, so the button was fixed to the navbar's
          box instead of the screen (on phones it landed on top of the logo).
          Outside the header it is fixed to the screen like on every other
          template. */}
      <BackButton />

      <header className="agency-navbar" ref={headerRef}>
        <div className="agency-navbar-inner">
          <Link
            href="/template-projects/creative-agency"
            className="agency-navbar-logo"
            onClick={closeMenu}
          >
            GLYPH<span className="agency-navbar-logo-dot">.</span>STUDIO
          </Link>

          <nav
            id="agency-navbar-menu"
            aria-label="Main navigation"
            className={`agency-navbar-links ${isOpen ? 'agency-navbar-links-open' : ''}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={pathname === link.href ? 'page' : undefined}
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
            ref={toggleRef}
            type="button"
            className="agency-navbar-toggle"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="agency-navbar-menu"
          >
            {isOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>
      </header>
    </>
  );
}