import ContactForm from "../../../components/ComponentsUsedAroundTheWebSite/ContactForm/ContactFrom";
import "../../../styles/pages/Contact.css";

export default function Contact() {
  return (
    <section id="contact-page">
      <div className="contact-page-container">
        <div>      
          <h1 className="contact-page-title">Let’s Work Together</h1>
          <p className="contact-page-intro">
          Ready to improve your online presence or start a new project?
          Fill out the form below and I’ll get back to you personally.
        </p>
        </div>




        <ContactForm />

        <div className="contact-info">
            <h3>Prefer email or social?</h3>

            <div className="contact-page-links">
              <div className="contact-link">
                <i className="fas fa-envelope contact-icon"></i>
                <a href="mailto:youremail@example.com">youremail@example.com</a>
              </div>

              <div className="contact-link">
                <i className="fab fa-linkedin contact-icon"></i>
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>

              <div className="contact-link">
                <i className="fas fa-calendar-alt contact-icon"></i>
                <a
                  href="https://calendly.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer">
                  Schedule a Meeting
                </a>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
