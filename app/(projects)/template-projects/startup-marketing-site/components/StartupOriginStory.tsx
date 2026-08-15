import "../styles/StartupOriginStory.css";

const TIMELINE = [
  {
    date: "Sept 2025",
    title: "The incident that started it",
    description:
      "A payments webhook queue backed up for eleven minutes before anyone noticed. The alert fired — into a channel with 400 unread messages.",
  },
  {
    date: "Nov 2025",
    title: "Left our jobs",
    description:
      "Jonah and Priya had worked on-call together for two years. They left the same week to build the monitoring tool they'd both been asking for internally.",
  },
  {
    date: "Jan 2026",
    title: "First working prototype",
    description:
      "A single binary that watched HTTP endpoints and paged a phone number. No dashboard. No UI. It worked, and that was the point.",
  },
  {
    date: "Mar 2026",
    title: "First 10 beta teams",
    description:
      "Recruited entirely from engineers in their own network — teams of two to six people who'd felt the same 3 a.m. pain.",
  },
  {
    date: "Jul 2026",
    title: "40+ teams, still two founders",
    description:
      "Rivet now watches over 600 services. No sales team, no marketing budget — just word of mouth between engineers who trust each other.",
  },
];

const TEAM = [
  {
    initials: "JR",
    name: "Jonah Reyes",
    title: "Co-founder & CTO",
    bio: "Ex-payments infrastructure. Owns the detection engine and on-call routing logic.",
  },
  {
    initials: "PN",
    name: "Priya Nandakumar",
    title: "Co-founder & CEO",
    bio: "Ex-SRE lead. Talks to every beta team personally before they onboard.",
  },
];

export default function StartupOriginStory() {
  return (
    <article className="startup-origin-story">
      <div className="startup-container startup-origin-story-header">
        <span className="startup-origin-story-eyebrow startup-mono">
          OUR STORY
        </span>
        <h1 className="startup-origin-story-headline">
          We built the tool we needed at 3 a.m.
        </h1>
        <p className="startup-origin-story-lede">
          Rivet started as a private script two engineers wrote for their own
          on-call rotation — not as a startup idea. The company came after.
        </p>
      </div>

      <div className="startup-container startup-origin-story-narrative">
        <p>
          Jonah and Priya met on the same incident-response rotation at a
          payments company, three years apart in tenure but equally tired of
          the same problem: their monitoring stack was excellent at
          generating alerts and terrible at telling them which ones
          mattered. On a Tuesday night in September, a webhook queue backed
          up quietly for eleven minutes before either of them saw it — not
          because the alert didn&apos;t fire, but because it fired into a
          channel neither of them could reasonably keep up with.
        </p>
        <p>
          That incident didn&apos;t cause any lasting damage. It also
          didn&apos;t need to happen. Two months later, both of them had
          left to build the tool they&apos;d spent years wishing existed:
          something small enough to trust completely, and precise enough to
          only interrupt you when it&apos;s real.
        </p>
      </div>

      <div className="startup-container">
        <h2 className="startup-origin-story-section-title">
          How we got here
        </h2>
        <ol className="startup-origin-story-timeline">
          {TIMELINE.map((item) => (
            <li
              key={item.date}
              className="startup-origin-story-timeline-item"
            >
              <span className="startup-origin-story-timeline-date startup-mono">
                {item.date}
              </span>
              <div className="startup-origin-story-timeline-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="startup-container startup-origin-story-future">
        <h2 className="startup-origin-story-section-title">
          Where we&apos;re headed
        </h2>
        <p>
          Rivet stays deliberately narrow: health checks, paging, and an
          incident timeline — done well, for teams too small to need
          anything more. As we grow past the beta, that scope changes
          slowly and only when a real team hits a real wall we haven&apos;t
          solved yet, not because a feature looked good on a roadmap slide.
        </p>
      </div>

      <div className="startup-container startup-origin-story-team">
        <h2 className="startup-origin-story-section-title">
          Who&apos;s building it
        </h2>
        <div className="startup-origin-story-team-grid">
          {TEAM.map((member) => (
            <div
              key={member.name}
              className="startup-origin-story-team-card"
            >
              <div
                className="startup-origin-story-team-avatar"
                aria-hidden="true"
              >
                {member.initials}
              </div>
              <span className="startup-origin-story-team-name">
                {member.name}
              </span>
              <span className="startup-origin-story-team-title">
                {member.title}
              </span>
              <p className="startup-origin-story-team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}