"use client";

import { useEffect, useRef } from "react";
import type { TouchEvent } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/PhotographerLightbox.css";

// Minimum finger movement (px) that counts as a swipe
const SWIPE_DISTANCE = 50;

interface LightboxImage {
  src: string;
  alt: string;
}

interface PhotographerLightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function PhotographerLightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: PhotographerLightboxProps) {
  const currentImage = images[currentIndex];

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Keyboard: Escape closes, arrows change photo, Tab stays inside the lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrev();

      if (event.key === "Tab" && dialogRef.current) {
        const buttons = dialogRef.current.querySelectorAll<HTMLElement>("button");
        if (buttons.length === 0) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  // Lock the page behind the lightbox while it's open. This is its own effect
  // with no dependencies: before, it re-ran on every render, because the
  // handlers above are new functions each time the gallery re-renders.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  // Move keyboard focus into the lightbox when it opens, and back to the
  // gallery photo you opened it from when it closes
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, []);

  // Swipe left / right on touch screens
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const t = event.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;

    const t = event.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;

    // Ignore short moves and mostly-vertical moves
    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) onNext();
    else onPrev();
  };

  if (!currentImage) return null;

  return (
    <div
      className="portfolio-lightbox"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      ref={dialogRef}
    >
      <button
        ref={closeRef}
        type="button"
        className="portfolio-lightbox-close"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X size={26} aria-hidden="true" />
      </button>

      <button
        type="button"
        className="portfolio-lightbox-nav portfolio-lightbox-nav-prev"
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
        aria-label="Previous image"
      >
        <ChevronLeft size={30} aria-hidden="true" />
      </button>

      <div
        className="portfolio-lightbox-image-wrap"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          sizes="(max-width: 768px) 92vw, 1100px"
          className="portfolio-lightbox-image"
        />
      </div>

      <button
        type="button"
        className="portfolio-lightbox-nav portfolio-lightbox-nav-next"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
      >
        <ChevronRight size={30} aria-hidden="true" />
      </button>

      <div className="portfolio-lightbox-counter" aria-live="polite">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}