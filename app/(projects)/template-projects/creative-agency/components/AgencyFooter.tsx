import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import '../styles/AgencyFooter.css';

const footerLinks = [
  { href: '/template-projects/creative-agency/work', label: 'Work' },
  { href: '/template-projects/creative-agency/services', label: 'Services' },
  { href: '/template-projects/creative-agency/about', label: 'About' },
  { href: '/template-projects/creative-agency/contact', label: 'Contact' },
];

export default function AgencyFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="agency-footer">
      <div className="agency-footer-inner">
        <div className="agency-footer-top">
          <div className="agency-footer-brand">
            <span className="agency-footer-logo">
              GLYPH<span className="agency-footer-logo-dot">.</span>STUDIO
            </span>
            <p className="agency-footer-tagline">
              A bold, independent creative studio for ambitious brands.
            </p>
          </div>

          <nav className="agency-footer-nav" aria-label="Footer navigation">
            <span className="agency-footer-nav-label">Explore</span>
            <ul className="agency-footer-nav-list">
              {footerLinks.map((link, index) => (
                <li key={link.href} className="agency-footer-nav-item">
                  <Link href={link.href} className="agency-footer-nav-link">
                    <span className="agency-footer-nav-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="agency-footer-nav-text">{link.label}</span>
                    <ArrowUpRight className="agency-footer-nav-arrow" size={20} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="agency-footer-contact">
            <a href="mailto:hello@glyphstudio.com" className="agency-footer-email">
              hello@glyphstudio.com
            </a>
            <div className="agency-footer-socials">
              <a href="#" className="agency-footer-social">Instagram</a>
              <a href="#" className="agency-footer-social">LinkedIn</a>
              <a href="#" className="agency-footer-social">Twitter</a>
            </div>
          </div>
        </div>

        <div className="agency-footer-bottom">
          <span className="agency-footer-copyright">
            © {year} Glyph Studio. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}