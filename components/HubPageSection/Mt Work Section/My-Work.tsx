"use client";

import { useState, useEffect, useRef } from "react";
import "./My-Work.css";

const slides = [
  {
    title: "Habit Tracker App",
    description:
      "Track daily habits, visualize progress, and stay consistent with a clean, focused interface.",
    tag: "Demo Project",
    image: "/images/laptop.jpeg",
    linkText: "Open Habit Tracker",
    link: "/habit-tracker/",
  },
  {
    title: "Demo Website Build",
    description:
      "Concept project showcasing layout structure, UX flow, and responsiveness.",
    tag: "Demo Project",
    image: "/images/project-demo.jpg",
    linkText: "View Demo",
    link: "#",
  },
  {
    title: "Website Template",
    description:
      "Reusable, scalable template optimized for speed and customization.",
    tag: "Template",
    image: "/images/project-template.jpg",
    linkText: "View Template",
    link: "#",
  },
];

export default function MyWorkSection() {
  const [current, setCurrent] = useState(0);

  const [titleInView, setTitleInView] = useState(false);
  const [sliderInView, setSliderInView] = useState(false);
  const [overlayInView, setOverlayInView] = useState(false);
  const [sliderAnimationDone, setSliderAnimationDone] = useState(false);
  const [slideSettled, setSlideSettled] = useState(false);
  const [firstSlideLoaded, setFirstSlideLoaded] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

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

  // Slider wrapper — 0.4 viewport
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

  // Overlay trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOverlayInView(true);
        }
      },
      { threshold: 0.9 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Reset slideSettled on slide change
  useEffect(() => {
    setSlideSettled(false);
  }, [current]);

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
          style={{ transform: `translateX(-${current * 100}%)` }}
          onTransitionEnd={(e) => {
            if (e.target !== e.currentTarget) return;
            setSlideSettled(true);
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="my-work-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {index === current && (
                <div
                  className={`my-work-overlay ${
                    overlayInView &&
                    sliderAnimationDone &&
                    (firstSlideLoaded || slideSettled)
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
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </section>
  );
}
