"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Activity, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Иконите се преземени од пакетот react-icons/fa
import {
  scrollToSection,
  STARTUP_HOME_PATH,
  STARTUP_STORY_PATH,
} from "../lib/scrollToSection";
import "../styles/StartupFooter.css";

const FOOTER_LINKS = [
  { label: "Product", id: "product" },
  { label: "Proof", id: "proof" },
];

export default function StartupFooter() {
  const pathname = usePathname();
  const router = useRouter();

  function handleAnchorClick(id: string) {
    scrollToSection(id, pathname, router);
  }

  return (
    <footer className="startup-footer">
      <div className="startup-footer-inner">
        <div className="startup-footer-brand">
          <Link href={STARTUP_HOME_PATH} className="startup-footer-logo">
            <Activity size={16} strokeWidth={2.5} />
            <span>Rivet</span>
          </Link>
          <p className="startup-footer-tagline">
            Real-time monitoring and incident alerting for teams who can&apos;t afford downtime.
          </p>
          <span className="startup-footer-status startup-mono">
            STATUS: OPERATIONAL
          </span>
        </div>

        <div className="startup-footer-column">
          <span className="startup-footer-heading">Site</span>
          {FOOTER_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              className="startup-footer-link"
              onClick={() => handleAnchorClick(link.id)}
            >
              {link.label}
            </button>
          ))}
          <Link href={STARTUP_STORY_PATH} className="startup-footer-link">
            Story
          </Link>
        </div>

        <div className="startup-footer-column">
          <span className="startup-footer-heading">Connect</span>
          <a href="mailto:hello@rivet.dev" className="startup-footer-link">
            <Mail size={14} />
            hello@rivet.dev
          </a>
          
          <a
            href="https://github.com/rivet"
            target="_blank"
            rel="noreferrer"
            className="startup-footer-link"
          >
            <FaGithub size={14} />
            GitHub
          </a>
          
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="startup-footer-link"
          >
            <FaLinkedin size={14} />
            LinkedIn
          </a>
        </div>
      </div>

      <div className="startup-footer-bottom">
        <span>© {new Date().getFullYear()} Rivet. All systems built in the open.</span>
      </div>
    </footer>
  );
}
