"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";
import "./header.css";

const NAV_LINKS = [
  { href: "/demo-projects/habit-tracker", label: "Home" },
  { href: "/demo-projects/habit-tracker/add-habit", label: "Add Habit" },
  { href: "/demo-projects/habit-tracker/completed", label: "Completed" },
];

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="header-habit-tracker">
      <div className="header-habit-tracker__back-wrapper">
        <BackButton />
      </div>

      <nav className="header-habit-tracker__nav" aria-label="Habit tracker">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={isActive(link.href) ? "is-active" : ""}
            aria-current={isActive(link.href) ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}