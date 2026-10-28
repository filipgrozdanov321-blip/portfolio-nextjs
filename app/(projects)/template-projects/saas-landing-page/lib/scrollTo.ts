import type { MouseEvent } from "react";

export function scrollToSection(e: MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();

  // Visitors who turned on "reduce motion" jump instead of gliding
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
}