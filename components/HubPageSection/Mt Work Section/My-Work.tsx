"use client";

import { useState, useEffect, useRef } from "react";
import type { TransitionEvent, TouchEvent } from "react";
import Image from "next/image";
import "./My-Work.css";

// How much of an element must be on screen before it fades in.
// The old code watched the whole section at 0.7, but on phones the section
// (title + 480px+ slider + dots) is taller than the screen, so it could never
// be 70% visible and the slider stayed at opacity 0.
const REVEAL_THRESHOLD = 0.15;

// Minimum finger movement (px) that counts as a swipe
const SWIPE_DISTANCE = 50;

const slides = [
  {
    title: "Sales Analytics Dashboard",
    description:
      "Interactive revenue dashboard with live filtering — built so decisions come from data, not guesswork.",
    tag: "Demo Project",
    image: "/images/sales-analytics-dashboard.jpg",
    linkText: "View Project →",
    link: "/demo-projects/sales-analytics-dashboard",
  },
  {
    title: "Task Board (Kanban)",
    description:
      "Drag-and-drop board for To Do, In Progress, and Done — simple enough that teams actually use it.",
    tag: "Demo Project",
    image: "/images/task-board.jpg",
    linkText: "View Project →",
    link: "/demo-projects/task-board",
  },
  {
    title: "Photographer Portfolio",
    description:
      "Minimal, image-led portfolio built to let the work speak — and turn viewers into inquiries.",
    tag: "Template",
    image: "/images/photographer-portfolio.jpg",
    linkText: "View Template →",
    link: "/template-projects/photographer-portfolio",
  },
  {
    title: "Restaurant Website",
    description:
      "Elegant restaurant site with menu, hours, and a booking flow built to get the table filled.",
    tag: "Template",
    image: "/images/restaurant.jpg",
    linkText: "View Template →",
    link: "/template-projects/restaurant",
  },
  {
    title: "Appointment Booking App",
    description:
      "Full booking flow — service, time, confirmation — built for salons, clinics, and consultants.",
    tag: "Demo Project",
    image: "/images/appointment-booking.jpg",
    linkText: "View Project →",
    link: "/demo-projects/appointment-booking-app",
  },
  {
    title: "Creative Agency Website",
    description:
      "A bold, multi-page agency site built to make a service business look like the obvious choice.",
    tag: "Template",
    image: "/images/creative-agency.jpg",
    linkText: "View Template →",
    link: "/template-projects/creative-agency",
  },
  {
    title: "E-commerce Demo",
    description:
      "Browse, cart, checkout — a purchase flow built around one thing: getting to checkout without friction.",
    tag: "Demo Project",
    image: "/images/ecommerce-demo.jpg",
    linkText: "View Project →",
    link: "/demo-projects/ecommerce-demo",
  },
];

// Clone the last slide onto the front and the first slide onto the back.
// This lets the track keep sliding "forward"/"backward" past the real
// boundary instead of visually rewinding through every slide to loop.
const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];

export default function MyWorkSection() {
  // Index into extendedSlides — real slides live at 1..slides.length.
  const [current, setCurrent] = useState(1);
  const [instant, setInstant] = useState(false);

  const [titleInView, setTitleInView] = useState(false);
  const [sliderInView, setSliderInView] = useState(false);
  const [sliderAnimationDone, setSliderAnimationDone] = useState(false);
  const [slideSettled, setSlideSettled] = useState(false);
  const [firstSlideLoaded, setFirstSlideLoaded] = useState(false);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  // Ignore clicks while we're sitting on a clone slide (waiting to snap back).
  // Without this, clicking fast could push the track past the last slide.
  const prevSlide = () => setCurrent((prev) => (prev <= 0 ? prev : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) =>
      prev >= extendedSlides.length - 1 ? prev : prev + 1
    );

  // Reveal the title and the slider when each one itself is on screen
  useEffect(() => {
    const title = titleRef.current;
    const wrapper = wrapperRef.current;
    if (!title || !wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.target === title) setTitleInView(true);
          if (entry.target === wrapper) setSliderInView(true);
          observer.unobserve(entry.target);
        });
      },
      { threshold: REVEAL_THRESHOLD }
    );

    observer.observe(title);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Reset slideSettled on slide change
  useEffect(() => {
    setSlideSettled(false);
  }, [current]);

  // Once the track's slide transition finishes, check whether we landed
  // on a clone (index 0, or the very last index). If so, snap instantly
  // — no transition — to the matching real slide. Because the clone is
  // visually identical to the real slide, that snap is invisible.
  const handleTrackTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    setSlideSettled(true);

    if (current === extendedSlides.length - 1) {
      setInstant(true);
      setCurrent(1);
    } else if (current === 0) {
      setInstant(true);
      setCurrent(slides.length);
    }
  };

  // Re-enable the transition on the next frame after an instant snap,
  // so the next click animates normally again.
  useEffect(() => {
    if (!instant) return;
    const id = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(id);
  }, [instant]);

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

    // Ignore short moves and mostly-vertical moves (those are page scrolling)
    if (Math.abs(dx) < SWIPE_DISTANCE || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) nextSlide();
    else prevSlide();
  };

  const realIndex =
    current === 0
      ? slides.length - 1
      : current === extendedSlides.length - 1
      ? 0
      : current - 1;

  return (
    <section id="my-work" className="my-work">
      <h2
        ref={titleRef}
        className={`my-work-title ${titleInView ? "animate" : ""}`}
      >
        My Work in Action
      </h2>

      <div
        ref={wrapperRef}
        className={`my-work-slider-wrapper ${sliderInView ? "animate" : ""}`}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          setSliderAnimationDone(true);
          setFirstSlideLoaded(true);
        }}
      >
        <button
          type="button"
          className="slider-arrow left"
          aria-label="Previous project"
          onClick={prevSlide}
        >
          ‹
        </button>

        <div
          className={`my-work-slider ${instant ? "is-instant" : ""}`}
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTransitionEnd={handleTrackTransitionEnd}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div key={index} className="my-work-slide">
              <Image
                src={slide.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="my-work-slide-img"
              />

              {index === current && (
                <div
                  className={`my-work-overlay ${
                    sliderAnimationDone && (firstSlideLoaded || slideSettled)
                      ? "animate"
                      : ""
                  }`}
                >
                  <span className="my-work-tag">{slide.tag}</span>
                  <h3>{slide.title}</h3>
                  <p>{slide.description}</p>
                  <a href={slide.link}>{slide.linkText}</a>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="slider-arrow right"
          aria-label="Next project"
          onClick={nextSlide}
        >
          ›
        </button>
      </div>

      <div className="slider-dots">
        {slides.map((slide, index) => (
          <button
            type="button"
            key={index}
            className={`dot ${index === realIndex ? "active" : ""}`}
            aria-label={`Show ${slide.title}`}
            aria-current={index === realIndex}
            onClick={() => setCurrent(index + 1)}
          />
        ))}
      </div>
    </section>
  );
}