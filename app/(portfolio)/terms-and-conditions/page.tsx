import React from "react";
import "../../../styles/pages/Terms-and-Conditions.css"

const TermsAndConditions = () => {
  return (
    <main className="terms">
      <section className="terms__container">
        <header className="terms__header">
          <h1 className="terms__title">Terms and Conditions</h1>
          <p className="terms__effective-date">
            Effective date: January 1, 2026
          </p>
        </header>

        <section className="terms__section">
          <p className="terms__text">
            These Terms and Conditions govern your use of this website operated
            by <strong>Filip Grozdanov</strong> ("I", "me", "my").
          </p>
          <p className="terms__text">
            By accessing or using this website, you agree to these Terms. If you
            do not agree, please discontinue use of the website.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">1. Purpose of the Website</h2>
          <p className="terms__text">
            This website is a professional portfolio and informational platform
            designed to showcase my skills, experience, demo projects, and
            template examples related to web development and digital marketing.
          </p>
          <p className="terms__text">
            The website does not offer products or services for direct purchase.
            All services are discussed and agreed upon separately after direct
            communication.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">2. No Client or Contractual Relationship</h2>
          <p className="terms__text">
            Visiting this website or contacting me through it does not create a
            client, contractual, employment, or professional relationship.
          </p>
          <p className="terms__text">
            Any collaboration or service engagement is subject to separate,
            explicitly agreed terms outside of this website.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">3. Use of the Website</h2>
          <p className="terms__text">
            You agree to use this website lawfully and not to:
          </p>
          <ul className="terms__list">
            <li>Attempt unauthorized access to the website or its systems</li>
            <li>Disrupt or interfere with website functionality or security</li>
            <li>Use the website for unlawful or abusive purposes</li>
          </ul>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">4. Intellectual Property</h2>
          <p className="terms__text">
            All content on this website, including text, layouts, designs, code,
            demo projects, and templates, is my intellectual property unless
            explicitly stated otherwise.
          </p>
          <p className="terms__text">
            No content may be copied, reused, reproduced, or distributed without
            prior written permission.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">5. Demo Projects and Templates</h2>
          <p className="terms__text">
            Demo projects are interactive examples intended solely to
            demonstrate functionality, technical skills, and user experience.
          </p>
          <p className="terms__text">
            Demo projects do not use live databases and do not store personal
            data. Any interaction relies on local browser storage only.
          </p>
          <p className="terms__text">
            Template projects are static or visual examples and are not
            production-ready solutions.
          </p>
          <p className="terms__text">
            All demo and template projects are provided “as is” and may not be
            reused or deployed without explicit permission.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">6. Testimonials and Portfolio Use</h2>
          <p className="terms__text">
            Client testimonials, names, business names, logos, images, or
            project references are displayed only with explicit client consent.
          </p>
          <p className="terms__text">
            Permission is requested on a case-by-case basis and may be limited
            to specific details approved by the client.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">7. Third-Party Services</h2>
          <p className="terms__text">
            This website may reference or integrate third-party services such as
            hosting providers, email services, or scheduling tools.
          </p>
          <p className="terms__text">
            I am not responsible for the content, availability, or practices of
            third-party services.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">8. Limitation of Liability</h2>
          <p className="terms__text">
            This website and its content are provided on an “as is” and “as
            available” basis.
          </p>
          <p className="terms__text">
            I make no warranties regarding accuracy, completeness, or
            availability and am not liable for any damages arising from use of
            this website.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">9. No Guarantees</h2>
          <p className="terms__text">
            No guarantees are made regarding business outcomes, performance,
            results, or suitability of any information or examples shown on this
            website.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">10. Privacy</h2>
          <p className="terms__text">
            Use of this website is also governed by the Privacy Policy, which
            explains how personal data is handled.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">11. Governing Law</h2>
          <p className="terms__text">
            These Terms are governed by and interpreted in accordance with
            applicable European Union laws and regulations.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">12. Changes to These Terms</h2>
          <p className="terms__text">
            These Terms and Conditions may be updated at any time. Changes will
            be posted on this page with an updated effective date.
          </p>
        </section>

        <section className="terms__section">
          <h2 className="terms__heading">13. Contact</h2>
          <p className="terms__text">
            For questions regarding these Terms, you may contact me at{" "}
            <span className="terms__email">filip.grozdanov.web@gmail.com</span>.
          </p>
        </section>
      </section>
    </main>
  );
};

export default TermsAndConditions;
