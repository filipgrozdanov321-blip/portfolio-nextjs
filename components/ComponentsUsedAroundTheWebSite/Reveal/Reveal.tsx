"use client";

import { useEffect, useRef, type ReactNode } from "react";
import "./Reveal.css";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Extra wait before this item fades in, in milliseconds */
  delay?: number;
}

// Fades its content in the first time it scrolls into view. The content is
// still rendered on the server, so it's in the page's HTML for search
// engines; only the fade-in needs JavaScript.
export default function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-revealed");
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
