"use client";

import { useEffect, useRef } from "react";
import type { TouchEvent } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/RestaurantLightbox.css";

// Minimum finger movement (px) that counts as a swipe
const SWIPE_DISTANCE = 50;

interface LightboxProps {
  items: { id: number; alt: string; url: string }[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function RestaurantLightbox({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  const active = items[activeIndex];

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Keyboard: Escape closes, arrows change photo, Tab stays inside the lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();

      if (e.key === "Tab" && dialogRef.current) {
        const buttons = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  // Lock the page behind the lightbox while it's open
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Move keyboard focus into the lightbox when it opens, and back to the
  // gallery tile you opened it from when it closes
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  // Swipe left / right on touch screens
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    // Ignore short moves and mostly-vertical moves
    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) onNext();
    else onPrev();
  };

  return (
    <div
      className="restaurant-lightbox"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      ref={dialogRef}
    >
      <div
        className="restaurant-lightbox-inner"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="restaurant-lightbox-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={22} aria-hidden="true" />
        </button>

        <button
          type="button"
          className="restaurant-lightbox-arrow restaurant-lightbox-arrow-left"
          onClick={onPrev}
          aria-label="Previous photo"
        >
          <ChevronLeft size={28} aria-hidden="true" />
        </button>

        <div
          className="restaurant-lightbox-image-wrapper"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* A box with a set height, so the photo can fill it and fit
              inside (object-fit: contain), whatever its shape */}
          <div className="restaurant-lightbox-image-box">
            <Image
              src={active.url}
              alt={active.alt}
              fill
              sizes="(max-width: 900px) 100vw, 800px"
              className="restaurant-lightbox-image"
            />
          </div>
          <p className="restaurant-lightbox-caption">{active.alt}</p>
        </div>

        <button
          type="button"
          className="restaurant-lightbox-arrow restaurant-lightbox-arrow-right"
          onClick={onNext}
          aria-label="Next photo"
        >
          <ChevronRight size={28} aria-hidden="true" />
        </button>

        <div className="restaurant-lightbox-dots" aria-hidden="true">
          {items.map((_, i) => (
            <span
              key={i}
              className={`restaurant-lightbox-dot ${i === activeIndex ? "restaurant-lightbox-dot-active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}