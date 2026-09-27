import { CalendarCheck, BellRing, Users, UserCircle } from "lucide-react";
import "../styles/Features.css";

const features = [
  {
    title: "Online Booking",
    description: "Clients book their own appointment in seconds, any time — no calls needed.",
    icon: CalendarCheck,
  },
  {
    title: "Automatic Reminders",
    description: "Automated reminders before every appointment, so fewer no-shows.",
    icon: BellRing,
  },
  {
    title: "Staff Calendars",
    description: "Every stylist's schedule side by side, so double-bookings stop happening by accident.",
    icon: Users,
  },
  {
    title: "Client Profiles",
    description: "Notes, preferences, and visit history saved and ready before they sit down.",
    icon: UserCircle,
  },
];

export default function Features() {
  return (
    <section className="saas-features" id="features">
      <div className="saas-features-header">
        <h2 className="saas-features-title">Everything your studio needs</h2>
        <p className="saas-features-subtitle">
          The day-to-day tools that make running a busy chair actually manageable.
        </p>
      </div>

      <div className="saas-features-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div key={feature.title} className="saas-feature-card">
              <div className="saas-feature-icon">
                <Icon size={22} strokeWidth={2} />
              </div>
              <h3 className="saas-feature-card-title">{feature.title}</h3>
              <p className="saas-feature-card-description">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}