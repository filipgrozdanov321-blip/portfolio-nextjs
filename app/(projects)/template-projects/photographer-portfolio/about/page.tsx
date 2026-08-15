import Image from "next/image";
import "../styles/PhotographerAboutPage.css";

const CREDIBILITY_ITEMS = [
  "Personal branding sessions for founders, consultants, and creatives",
  "Editorial portrait work featured in independent lifestyle publications",
  "Corporate headshot projects for teams of 5 to 50+ people",
  "Ongoing collaborations with local stylists and creative studios",
];

export default function PhotographerAboutPage() {
  return (
    <div className="portfolio-about-page">
      <section className="portfolio-about-hero">
        <div className="portfolio-about-hero-image-wrap">
          <Image
            src="/images/photographer/wren-about.jpg"
            alt="Wren Ashby, photographer, in the studio"
            fill
            className="portfolio-about-hero-image"
          />
        </div>

        <div className="portfolio-about-hero-content">
          <h1 className="portfolio-about-hero-title">About Wren</h1>

          <p className="portfolio-about-hero-paragraph">
            I picked up a camera in my early twenties, mostly to photograph
            friends who couldn't afford a "real" photographer. There was no
            grand plan — just a habit that turned into a practice, and a
            practice that turned into a way of paying attention to people.
          </p>

          <p className="portfolio-about-hero-paragraph">
            Somewhere along the way I noticed a pattern: most people don't
            hate having their photo taken, they hate feeling like themselves
            got lost in the process. So that became the actual job — not
            just lighting and composition, but making sure the person in
            front of the camera still looks like them, just a more
            put-together version.
          </p>

          <p className="portfolio-about-hero-paragraph">
            These days my work sits at the intersection of portrait,
            editorial, and personal branding — three things that, in
            practice, all come down to the same question: how do you want
            to be seen?
          </p>
        </div>
      </section>

      <section className="portfolio-about-credibility">
        <h2 className="portfolio-about-credibility-title">Selected Experience</h2>
        <ul className="portfolio-about-credibility-list">
          {CREDIBILITY_ITEMS.map((item) => (
            <li key={item} className="portfolio-about-credibility-item">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="portfolio-about-personal">
        <h2 className="portfolio-about-personal-title">A Few Other Things</h2>
        <p className="portfolio-about-personal-text">
          Outside of shoots, I'm usually found re-organizing my film
          collection, failing to keep houseplants alive, or making an
          unreasonably specific playlist for whoever I'm about to
          photograph. I still shoot film on weekends, purely because I like
          slowing down.
        </p>
      </section>
    </div>
  );
}