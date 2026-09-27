"use client";

import { useState, useEffect, useRef } from "react";
import type { TransitionEvent } from "react";
import "./My-Work.css";

const slides = [
  {
    title: "Sales Analytics Dashboard",
    description:
      "Interactive revenue dashboard with live filtering — built so decisions come from data, not guesswork.",
    tag: "Demo Project",
    image: "/images/sales-analytics-dashboard.jpg",
    linkText: "View Project →",
    link: "/demo-projects/sales-analytic-dashboard",
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
    link: "/demo-projects/photographer-portfolio",
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

  const sectionRef = useRef<HTMLElement | null>(null);

  const prevSlide = () => setCurrent((prev) => prev - 1);
  const nextSlide = () => setCurrent((prev) => prev + 1);

  // Title — 0.3 viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setTitleInView(true);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Slider wrapper — 0.7 viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSliderInView(true);
        observer.disconnect();
      },
      { threshold: 0.7 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
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

  const realIndex =
    current === 0
      ? slides.length - 1
      : current === extendedSlides.length - 1
      ? 0
      : current - 1;

  return (
    <section id="my-work" ref={sectionRef} className="my-work">
      <h2 className={`my-work-title ${titleInView ? "animate" : ""}`}>
        My Work in Action
      </h2>

      <div
        className={`my-work-slider-wrapper ${sliderInView ? "animate" : ""}`}
        onTransitionEnd={(e) => {
          if (e.target !== e.currentTarget) return;
          setSliderAnimationDone(true);
          setFirstSlideLoaded(true);
        }}
      >
        <button className="slider-arrow left" onClick={prevSlide}>
          ‹
        </button>

        <div
          className="my-work-slider"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: instant ? "none" : "transform 0.6s ease",
          }}
          onTransitionEnd={handleTrackTransitionEnd}
        >
          {extendedSlides.map((slide, index) => (
            <div
              key={index}
              className="my-work-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
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

        <button className="slider-arrow right" onClick={nextSlide}>
          ›
        </button>
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === realIndex ? "active" : ""}`}
            onClick={() => setCurrent(index + 1)}
          />
        ))}
      </div>
    </section>
  );
}