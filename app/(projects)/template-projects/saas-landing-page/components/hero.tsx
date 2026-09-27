"use client";

import { use } from "react";
import { scrollToSection } from "../lib/scrollTo";
import "../styles/hero.css";

export default function Hero() {
  return (
    <section className="saas-hero">
      <div className="saas-hero-container">
        <h1 className="saas-hero-title">
          Booking software that keeps your chair full
        </h1>
        <p className="saas-hero-subtitle">
          ChairTime helps salons, barbers, and tattoo studios manage
          appointments, reduce no-shows, and keep clients coming back —
          all from one simple dashboard.
        </p>

        <div className="saas-hero-actions">
          <a href="#pricing" onClick={(e) => scrollToSection(e, "pricing")} className="saas-hero-cta-primary">
            Get Started
          </a>
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, "how-it-works")} className="saas-hero-cta-secondary">
            See How It Works
          </a>
        </div>

        <div className="saas-hero-mockup">
          <div className="saas-mockup-browserbar">
            <span className="saas-mockup-dot red"></span>
            <span className="saas-mockup-dot yellow"></span>
            <span className="saas-mockup-dot green"></span>
          </div>

          <div className="saas-mockup-body">
            <aside className="saas-mockup-sidebar">
              <div className="saas-mockup-logo">ChairTime</div>
              <nav className="saas-mockup-nav">
                <span className="active">Calendar</span>
                <span>Clients</span>
                <span>Stats</span>
                <span>Settings</span>
              </nav>
            </aside>

            <main className="saas-mockup-main">
              <div className="saas-mockup-stats">
                <div className="saas-mockup-stat">
                  <span className="saas-mockup-stat-label">Today</span>
                  <span className="saas-mockup-stat-value">12 bookings</span>
                </div>
                <div className="saas-mockup-stat">
                  <span className="saas-mockup-stat-label">No-shows</span>
                  <span className="saas-mockup-stat-value">1 this week</span>
                </div>
                <div className="saas-mockup-stat">
                  <span className="saas-mockup-stat-label">Revenue</span>
                  <span className="saas-mockup-stat-value">$840</span>
                </div>
              </div>

              <div className="saas-mockup-schedule">
                <div className="saas-mockup-appt">
                  <span className="saas-mockup-time">10:00</span>
                  <span className="saas-mockup-appt-name">Haircut — John D.</span>
                </div>
                <div className="saas-mockup-appt">
                  <span className="saas-mockup-time">11:30</span>
                  <span className="saas-mockup-appt-name">Color — Sarah M.</span>
                </div>
                <div className="saas-mockup-appt">
                  <span className="saas-mockup-time">13:00</span>
                  <span className="saas-mockup-appt-name">Beard Trim — Alex P.</span>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}