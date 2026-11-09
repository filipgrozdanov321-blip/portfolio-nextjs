"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import "./services.css";

// How much of an element must be on screen before it animates in.
// 0.9 meant "90% visible", which the elements that start 60px off to the
// side (clipped by the section) could never reach on a phone. They stayed
// at opacity 0 forever.
const REVEAL_THRESHOLD = 0.15;

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(".animate");

    if (!elements) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: REVEAL_THRESHOLD }
    );

    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="services-container">
        <h2 className="services-title animate animate-down">
          What I Actually Deliver
        </h2>

        {/* Websites */}
        <div className="service-row">
          <div className="service-heading web animate animate-left">
            <h3>Business Websites</h3>
            <p>
              Fast, modern websites that explain what you do and make it easy
              for customers to get in touch.
            </p>
          </div>

          <div className="service-content animate animate-right">
            <ul>
              <li>Custom design built around your business, not a template</li>
              <li>Mobile-first layouts that work on every phone</li>
              <li>A contact form that sends enquiries to your inbox</li>
              <li>Basic SEO setup: page titles, descriptions and a sitemap</li>
              <li>Launched on your own domain</li>
            </ul>

            <span className="service-outcome">
              Websites from {site.pricing.websitesFrom}, up to 5 pages.{" "}
              <Link href="/services#pricing">See what&apos;s included</Link>
            </span>
          </div>
        </div>

        {/* Web apps */}
        <div className="service-row reverse">
          <div className="service-heading apps animate animate-left">
            <h3>Web Apps</h3>
            <p>
              Custom tools for when a website isn&apos;t enough, built around
              how your business actually works.
            </p>
          </div>

          <div className="service-content animate animate-right">
            <ul>
              <li>Booking systems: customers pick a service, a person and a free slot</li>
              <li>Online shops: product pages, filters, cart and checkout</li>
              <li>Dashboards: revenue, orders and best sellers on one screen</li>
              <li>For agencies: React and Next.js development on client projects</li>
            </ul>

            <span className="service-outcome">
              Each of these has a working demo.{" "}
              <Link href="/projects">Try the projects</Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
