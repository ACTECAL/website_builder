import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Linkedin, Instagram, ArrowUpRight } from 'lucide-react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* Decorative Aurora Backgrounds */}
      <div className="footer-aurora-glow" />
      <div className="footer-aurora-glow-secondary" />
      <div className="footer-aurora-glow-tertiary" />

      {/* Main Footer Links */}
      <section className="footer-main">
        <div className="footer-main-container">
          <div className="footer-brand">
            <div className="footer-brand-title">Nexora</div>
            <p className="footer-brand-description">
              The world's easiest all-in-one management software. Autonomic, resilient, and engineered for the next generation of global enterprise.
            </p>
            <div className="footer-social-links">
              <a href="#!" className="footer-social-link" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#!" className="footer-social-link" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#!" className="footer-social-link" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#!" className="footer-social-link" aria-label="Instagram"><Instagram size={18} /></a>
            </div>
          </div>

          <div className="footer-links-group neural-cluster">
            <h4 className="footer-links-title">Ecosystem</h4>
            <Link to="/apps/crm" className="footer-link">Customer CRM <span className="status-dot green"></span> <ArrowUpRight size={14} className="link-arrow" /></Link>
            <Link to="/apps/sales" className="footer-link">Global Sales <ArrowUpRight size={14} className="link-arrow" /></Link>
            <Link to="/apps/accounting" className="footer-link">Ledger Sync <span className="status-dot blue"></span> <ArrowUpRight size={14} className="link-arrow" /></Link>
            <Link to="/apps/inventory" className="footer-link">Stock Intelligence <ArrowUpRight size={14} className="link-arrow" /></Link>
          </div>

          <div className="footer-links-group neural-cluster">
            <h4 className="footer-links-title">Resources Cluster</h4>
            <Link to="/community" className="footer-link">Neural Forum <span className="status-dot purple"></span> <ArrowUpRight size={14} className="link-arrow" /></Link>
            <Link to="/docs" className="footer-link">Core Docs <ArrowUpRight size={14} className="link-arrow" /></Link>
            <Link to="/pricing" className="footer-link">Scaling Plans <ArrowUpRight size={14} className="link-arrow" /></Link>
          </div>

          <div className="footer-links-group neural-cluster">
            <h4 className="footer-links-title">Connect</h4>
            <Link to="/contact" className="footer-link">Direct Line <span className="status-dot green"></span> <ArrowUpRight size={14} className="link-arrow" /></Link>
            <Link to="/meet-an-advisor" className="footer-link">Expert Consult <ArrowUpRight size={14} className="link-arrow" /></Link>
            <Link to="/legal" className="footer-link">Governance <ArrowUpRight size={14} className="link-arrow" /></Link>
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
