"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import BackButton from "@/components/ComponentsUsedAroundTheWebSite/BackButton/BackButton";
import "./header.css";

export default function Header() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href ? "is-active" : "";

  return (
    <header className="header-habit-tracker">
      <div className="header-habit-tracker__back-wrapper">
        <BackButton />
      </div>

      <nav className="header-habit-tracker__nav">
        <Link
          href="/demo-projects/habit-tracker"
          className={isActive("/demo-projects/habit-tracker")}
        >
          Home
        </Link>

        <Link
          href="/demo-projects/habit-tracker/add-habit"
          className={isActive("/demo-projects/habit-tracker/add-habit")}
        >
          Add Habit
        </Link>

        <Link
          href="/demo-projects/habit-tracker/completed"
          className={isActive("/demo-projects/habit-tracker/completed")}
        >
          Completed
        </Link>
      </nav>
    </header>
  );
}