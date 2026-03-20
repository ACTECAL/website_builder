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
              <a href="#!" className="footer-social-link">TW</a>
              <a href="#!" className="footer-social-link">FB</a>
              <a href="#!" className="footer-social-link">LI</a>
              <a href="#!" className="footer-social-link">IG</a>
            </div>
          </div>

          <div className="footer-links-group neural-cluster">
            <h4 className="footer-links-title">Ecosystem</h4>
            <Link to="/apps/crm" className="footer-link">Customer CRM</Link>
            <Link to="/apps/sales" className="footer-link">Global Sales</Link>
            <Link to="/apps/accounting" className="footer-link">Ledger Sync</Link>
            <Link to="/apps/inventory" className="footer-link">Stock Intelligence</Link>
          </div>

          <div className="footer-links-group neural-cluster">
            <h4 className="footer-links-title">Resources Cluster</h4>
            <Link to="/community" className="footer-link">Neural Forum</Link>
            <Link to="/docs" className="footer-link">Core Docs</Link>
            <Link to="/pricing" className="footer-link">Scaling Plans</Link>
          </div>

          <div className="footer-links-group neural-cluster">
            <h4 className="footer-links-title">Connect</h4>
            <Link to="/contact" className="footer-link">Direct Line</Link>
            <Link to="/meet-an-advisor" className="footer-link">Expert Consult</Link>
            <Link to="/legal" className="footer-link">Governance</Link>
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
