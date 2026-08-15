import "../styles/StartupFounderNote.css";

export default function StartupFounderNote() {
  return (
    <section className="startup-founder-note">
      <div className="startup-container startup-founder-note-inner">
        <div className="startup-founder-note-avatar" aria-hidden="true">
          JR
        </div>

        <div className="startup-founder-note-content">
          <span className="startup-founder-note-eyebrow startup-mono">
            WHY WE BUILT THIS
          </span>

          <p className="startup-founder-note-quote">
            &ldquo;I spent four years on-call for a payments platform,
            getting paged at 3 a.m. for alerts that turned out to be
            nothing — and missing the one that mattered because it looked
            just like the noise. Rivet is the tool I wanted during every
            one of those nights: something small enough to trust, and
            precise enough to only wake you up when it&apos;s real.&rdquo;
          </p>

          <div className="startup-founder-note-attribution">
            <span className="startup-founder-note-name">Jonah Reyes</span>
            <span className="startup-founder-note-title">
              Co-founder &amp; CTO, Rivet
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}