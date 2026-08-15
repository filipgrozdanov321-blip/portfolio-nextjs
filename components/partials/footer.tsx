"use client";

import "./footer.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3>Filip Grozdanov</h3>
            <p>
              Web Developer & Digital Strategist helping businesses build
              high-performing, conversion-focused websites.
            </p>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/demo-projects">Demo Projects</a></li>
              <li><a href="/template-projects">Template Projects</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-and-conditions">Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="mailto:youremail@example.com">
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://calendly.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schedule a Meeting
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Filip Grozdanov. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
