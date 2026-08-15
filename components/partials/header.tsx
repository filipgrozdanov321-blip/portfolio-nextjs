"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Image from "next/image";
import "./header.css";

export default function Header() {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="header">
      <div className="elements-inside-header">
        <div className="logo">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={140}
            height={40}
            className="logo-img"
            priority
          />
        </div>

        <nav className="nav">
          <Link href="/" className={`nav-button ${isActive("/") ? "active" : ""}`}>
            Home
          </Link>

          {/* Projects Dropdown */}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="nav-button">
              Projects <ExpandMoreIcon className="arrow" />
            </span>

            <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              <Link
                href="/demo-projects"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Demo Projects
              </Link>
              <Link
                href="/template-projects"
                className="dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Template Projects
              </Link>
            </div>
          </div>

          <Link
            href="/services"
            className={`nav-button ${isActive("/services") ? "active" : ""}`}
          >
            Services
          </Link>

          <Link
            href="/about"
            className={`nav-button ${isActive("/about") ? "active" : ""}`}
          >
            About
          </Link>
        </nav>

        <div className="header-right">
          <div className="search-container">
            <div className="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <input
              type="text"
              className="search-field"
              placeholder="Search..."
            />
          </div>

          <Link
            href="/contact"
            className={`contact-button ${isActive("/contact") ? "active" : ""}`}
          >
            Contact Me
          </Link>
        </div>
      </div>
    </header>
  );
}
