"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { scrollToSection } from "../lib/scrollToSection";
import "../styles/StartupHero.css";

type ServiceCheck = {
  id: string;
  name: string;
  baseLatency: number;
};

const SERVICES: ServiceCheck[] = [
  { id: "api", name: "API Gateway", baseLatency: 42 },
  { id: "db", name: "Postgres — primary", baseLatency: 8 },
  { id: "cache", name: "Redis Cache", baseLatency: 3 },
  { id: "auth", name: "Auth Service", baseLatency: 61 },
  { id: "queue", name: "Webhook Queue", baseLatency: 118 },
];

const INCIDENT_SERVICE_ID = "queue";

export default function StartupHero() {
  const pathname = usePathname();
  const router = useRouter();

  const [latencies, setLatencies] = useState<Record<string, number>>(
    Object.fromEntries(SERVICES.map((s) => [s.id, s.baseLatency]))
  );
  const [incidentActive, setIncidentActive] = useState(false);
  const [incidentTime, setIncidentTime] = useState<string | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const jitterInterval = setInterval(() => {
      setLatencies((prev) => {
        const next = { ...prev };
        for (const service of SERVICES) {
          const drift = Math.round((Math.random() - 0.5) * 6);
          const spike =
            incidentActive && service.id === INCIDENT_SERVICE_ID ? 700 : 0;
          next[service.id] = Math.max(2, service.baseLatency + drift + spike);
        }
        return next;
      });
    }, 1800);

    const incidentInterval = setInterval(() => {
      setIncidentActive((prevActive) => {
        const nextActive = !prevActive;
        setIncidentTime(
          nextActive
            ? new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : null
        );
        return nextActive;
      });
    }, 7000);

    return () => {
      clearInterval(jitterInterval);
      clearInterval(incidentInterval);
    };
  }, [incidentActive]);

  function handleCtaClick() {
    scrollToSection("cta", pathname, router);
  }

  return (
    <section className="startup-hero">
      <div className="startup-container startup-hero-inner">
        <div className="startup-hero-copy">
          <span className="startup-hero-eyebrow startup-mono">
            <span className="startup-hero-eyebrow-dot" aria-hidden="true" />
            STATUS: OPERATIONAL
          </span>

          <h1 className="startup-hero-headline">
            Built for the three-person
            <br />
            on-call rotation.
          </h1>

          <p className="startup-hero-subhead">
            Rivet watches your infrastructure in real time and pages the
            right engineer within seconds of a failure — no war room, no
            noisy dashboards, no guesswork.
          </p>

          <div className="startup-hero-actions">
            <button
              type="button"
              className="startup-hero-cta"
              onClick={handleCtaClick}
            >
              Get Early Access
            </button>
            <span className="startup-hero-actions-note">
              Free during beta. No credit card.
            </span>
          </div>
        </div>

        <div className="startup-hero-panel" aria-hidden="true">
          <div className="startup-hero-panel-header">
            <span className="startup-mono">rivet-monitor · production</span>
            <span className="startup-hero-panel-live">
              <span className="startup-hero-panel-live-dot" />
              live
            </span>
          </div>

          <ul className="startup-hero-panel-list">
            {SERVICES.map((service) => {
              const isIncident =
                incidentActive && service.id === INCIDENT_SERVICE_ID;
              return (
                <li key={service.id} className="startup-hero-panel-row">
                  <span className="startup-hero-panel-row-name">
                    {service.name}
                  </span>
                  <span className="startup-hero-panel-row-latency startup-mono">
                    {latencies[service.id]}ms
                  </span>
                  <span
                    className={`startup-hero-panel-row-status ${
                      isIncident ? "is-degraded" : "is-operational"
                    }`}
                  >
                    {isIncident ? "Degraded" : "Operational"}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="startup-hero-panel-feed startup-mono">
            {incidentActive && incidentTime ? (
              <>
                <AlertTriangle size={13} />
                {incidentTime} — Webhook Queue latency &gt; 700ms → paged
                on-call
              </>
            ) : (
              <>
                <CheckCircle2 size={13} />
                All checks passing
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}