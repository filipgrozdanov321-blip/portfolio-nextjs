"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./header.css";

// Keep this number in sync with the 768px media query in header.css
const MOBILE_QUERY = "(max-width: 768px)";
const HOVER_QUERY = "(hover: hover)";

// True only for a real mouse on the desktop layout. Touch screens (and the
// hamburger layout) use tap-to-toggle instead of hover.
const canUseHover = () =>
  window.matchMedia(HOVER_QUERY).matches &&
  !window.matchMedia(MOBILE_QUERY).matches;

export default function Header() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const isActive = (path: string) => pathname === path;

  // Close everything when the route changes (also covers browser back/forward)
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Escape closes menu / dropdown / search. A press outside the header closes
  // the menu and the dropdown.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (isMenuOpen) toggleRef.current?.focus(); // don't lose keyboard focus
      setIsMenuOpen(false);
      setIsDropdownOpen(false);
      searchRef.current?.blur();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  // If the window grows past the mobile breakpoint (rotating a tablet,
  // resizing a browser), reset the mobile menu.
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const handleChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const handleDropdownClick = (e: ReactMouseEvent<HTMLButtonElement>) => {
    // Mouse on desktop: hover already opened it, so a click keeps it open.
    // e.detail === 0 means the click came from the keyboard (Enter/Space).
    if (canUseHover() && e.detail !== 0) {
      setIsDropdownOpen(true);
      return;
    }
    setIsDropdownOpen((open) => !open);
  };

  // Close the dropdown when keyboard focus leaves it
  const handleDropdownBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <div className="elements-inside-header">
        <div className="logo">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={140}
            height={40}
            sizes="48px"
            className="logo-img"
            priority
          />
        </div>

        {/* Hamburger: only visible below 768px (see header.css) */}
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="header-menu"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="menu-toggle-bars" aria-hidden="true" />
        </button>

        {/* On desktop this wrapper is display: contents, so the layout is
            identical to before. On mobile it becomes the slide-down panel. */}
        <div
          id="header-menu"
          className={`header-menu ${isMenuOpen ? "is-open" : ""}`}
        >
          <nav className="nav" aria-label="Main navigation">
            <Link
              href="/"
              className={`nav-button ${isActive("/") ? "active" : ""}`}
              onClick={closeAll}
            >
              Home
            </Link>

            {/* Projects Dropdown: hover (mouse) or tap/Enter (touch, keyboard) */}
            <div
              className="nav-dropdown"
              onMouseEnter={() => {
                if (canUseHover()) setIsDropdownOpen(true);
              }}
              onMouseLeave={() => {
                if (canUseHover()) setIsDropdownOpen(false);
              }}
              onBlur={handleDropdownBlur}
            >
              <button
                type="button"
                className="nav-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                aria-controls="projects-menu"
                onClick={handleDropdownClick}
              >
                Projects <ExpandMoreIcon className="arrow" />
              </button>

              <div
                id="projects-menu"
                className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}
              >
                <Link
                  href="/demo-projects"
                  className="dropdown-item"
                  onClick={closeAll}
                >
                  Demo Projects
                </Link>
                <Link
                  href="/template-projects"
                  className="dropdown-item"
                  onClick={closeAll}
                >
                  Template Projects
                </Link>
              </div>
            </div>

            <Link
              href="/services"
              className={`nav-button ${isActive("/services") ? "active" : ""}`}
              onClick={closeAll}
            >
              Services
            </Link>

            <Link
              href="/about"
              className={`nav-button ${isActive("/about") ? "active" : ""}`}
              onClick={closeAll}
            >
              About
            </Link>
          </nav>

          <div className="header-right">
            <div className="search-container">
              {/* Tapping the icon focuses the field, and :focus opens it */}
              <button
                type="button"
                className="search-icon"
                aria-label="Open search"
                onClick={() => searchRef.current?.focus()}
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                ref={searchRef}
                type="text"
                className="search-field"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>

            <Link
              href="/contact"
              className={`contact-button ${isActive("/contact") ? "active" : ""}`}
              onClick={closeAll}
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
