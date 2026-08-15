import { CalendarCheck, BellRing, Users, UserCircle } from "lucide-react";
import "../styles/Features.css";

const features = [
  {
    title: "Online Booking",
    description: "Clients book appointments themselves, 24/7, without a single phone call.",
    icon: CalendarCheck,
  },
  {
    title: "Automatic Reminders",
    description: "Cut no-shows with automated SMS and email reminders before every appointment.",
    icon: BellRing,
  },
  {
    title: "Staff Calendars",
    description: "Manage multiple staff schedules side by side, all in one clear view.",
    icon: Users,
  },
  {
    title: "Client Profiles",
    description: "Keep notes, preferences, and visit history for every client in one place.",
    icon: UserCircle,
  },
];

export default function Features() {
  return (
    <section className="saas-features" id="features">
      <div className="saas-features-header">
        <h2 className="saas-features-title">Everything your studio needs</h2>
        <p className="saas-features-subtitle">
          Simple tools that save time, reduce no-shows, and keep clients coming back.
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