import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Main Footer Links */}
      <section className="footer-main">
        <div className="footer-main-container">
          <div className="footer-brand">
            <div className="footer-brand-title">Nexora</div>
            <p className="footer-brand-description">
              The world's easiest all-in-one management software. It's integrated, open-source, and loved by millions.
            </p>
            <div className="footer-social-links">
              <a href="#" className="footer-social-link">TW</a>
              <a href="#" className="footer-social-link">FB</a>
              <a href="#" className="footer-social-link">LI</a>
              <a href="#" className="footer-social-link">IG</a>
            </div>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-links-title">Applications</h4>
            <Link to="/apps/crm" className="footer-link">CRM</Link>
            <Link to="/apps/sales" className="footer-link">Sales</Link>
            <Link to="/apps/accounting" className="footer-link">Accounting</Link>
            <Link to="/apps/inventory" className="footer-link">Inventory</Link>
            <Link to="/choose-apps" className="footer-link">View all apps</Link>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-links-title">Community</h4>
            <Link to="/blog" className="footer-link">Tutorials</Link>
            <Link to="/community" className="footer-link">Forum</Link>
            <Link to="/events" className="footer-link">Events</Link>
            <Link to="/podcast" className="footer-link">Podcast</Link>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-links-title">Support</h4>
            <Link to="/help" className="footer-link">Documentation</Link>
            <Link to="/contact" className="footer-link">Contact Us</Link>
            <Link to="/pricing" className="footer-link">Pricing</Link>
            <Link to="/status" className="footer-link">System Status</Link>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <section className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">© 2026 Nexora Inc. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
            <Link to="/legal" className="footer-bottom-link">Legal</Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
