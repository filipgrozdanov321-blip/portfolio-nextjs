import ContactForm from "../../../components/ComponentsUsedAroundTheWebSite/ContactForm/ContactFrom";
import "../../../styles/pages/Contact.css";

export default function Contact() {
  return (
    <section id="contact-page">
      <div className="contact-page-container">
        <div>      
          <h1 className="contact-page-title">Let’s Work Together</h1>
          <p className="contact-page-intro">
          Tell me what you're building or what's not working, and I'll get
          back to you personally with real next steps.
        </p>
        </div>




        <ContactForm />

        <div className="contact-info">
            <h3 className="title-of-alternative">Prefer email or social?</h3>

            <div className="contact-page-links">
              <div className="contact-link">
                <i className="fas fa-envelope contact-icon"></i>
                <a href="mailto:filip.grozdanov.web@gmail.com">filip.grozdanov.web@gmail.com</a>
              </div>

              <div className="contact-link">
                <i className="fab fa-whatsapp contact-icon"></i>
                <a href="/api/whatsapp" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>

              {/* <div className="contact-link">
                <i className="fab fa-linkedin contact-icon"></i>
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div> */}
            </div>
          </div>
      </div>
    </section>
  );
}