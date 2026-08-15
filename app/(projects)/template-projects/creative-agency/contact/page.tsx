import AgencyContactForm from '../components/AgencyContactForm';
import '../styles/AgencyContactPage.css';

export default function ContactPage() {
  return (
    <div className="agency-contact-page">
      <div className="agency-contact-page-header">
        <h1 className="agency-contact-page-title">
          Let's build something that doesn't blend in.
        </h1>
      </div>

      <div className="agency-contact-page-body">
        <AgencyContactForm />

        <div className="agency-contact-page-info">
          <div className="agency-contact-page-info-block">
            <span className="agency-contact-page-info-label">Email</span>
            <a href="mailto:hello@glyphstudio.com" className="agency-contact-page-email">
              hello@glyphstudio.com
            </a>
          </div>

          <div className="agency-contact-page-info-block">
            <span className="agency-contact-page-info-label">Social</span>
            <div className="agency-contact-page-socials">
              <a href="#" className="agency-contact-page-social">Instagram</a>
              <a href="#" className="agency-contact-page-social">LinkedIn</a>
              <a href="#" className="agency-contact-page-social">Twitter</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}