"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // behavior: "auto" means "obey the CSS", and index.css sets
    // html { scroll-behavior: smooth }, so the old code actually scrolled
    // smoothly. Switch smooth scrolling off for just this one jump.
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
}