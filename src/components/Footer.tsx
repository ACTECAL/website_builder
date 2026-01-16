import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-main-container">
          {/* Column 4: Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-brand-title">Actyx</Link>
            <p className="footer-brand-description">
              Unleash your growth potential with the extensive suite of integrated business apps.
            </p>
            <div className="footer-social-links">
              <a className="footer-social-link" href="https://www.facebook.com" target="_blank" rel="noreferrer">F</a>
              <a className="footer-social-link" href="https://www.twitter.com" target="_blank" rel="noreferrer">X</a>
              <a className="footer-social-link" href="https://www.linkedin.com" target="_blank" rel="noreferrer">in</a>
              <a className="footer-social-link" href="https://github.com" target="_blank" rel="noreferrer">GH</a>
              <a className="footer-social-link" href="https://www.instagram.com" target="_blank" rel="noreferrer">IG</a>
            </div>
          </div>

          {/* Column 1: Community */}
          <div className="footer-links-group">
            <div className="footer-links-title">Community</div>
            <Link to="/tutorials" className="footer-link">Tutorials</Link>
            <Link to="/docs" className="footer-link">Documentation</Link>
            <Link to="/forum" className="footer-link">Forum</Link>
            <Link to="/open-source" className="footer-link">Open Source</Link>
          </div>

          {/* Column 2: Services */}
          <div className="footer-links-group">
            <div className="footer-links-title">Services</div>
            <Link to="/hosting" className="footer-link">Hosting</Link>
            <Link to="/support" className="footer-link">Support</Link>
            <Link to="/upgrade" className="footer-link">Upgrade</Link>
            <Link to="/partners" className="footer-link">Find a Partner</Link>
          </div>

          {/* Column 3: About Us */}
          <div className="footer-links-group">
            <div className="footer-links-title">About us</div>
            <Link to="/company" className="footer-link">Our Company</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/jobs" className="footer-link">Jobs</Link>
            <Link to="/podcast" className="footer-link">Podcast</Link>
            <Link to="/blog" className="footer-link">Blog</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">Copyright © 2024 Actyx Inc.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy</Link>
            <Link to="/terms" className="footer-bottom-link">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
