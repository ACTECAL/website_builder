import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, HelpCircle, Mail, ArrowUp } from 'lucide-react';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="ft-footer">
      {/* ── MAIN ─────────────────────────────────────────────── */}
      <div className="ft-main">
        <div className="ft-container">

          {/* LEFT – brand */}
          <div className="ft-brand">
            <div className="ft-logo">
              <div className="ft-logo-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z" fill="white" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="ft-logo-name">Acteal</span>
            </div>
            <p className="ft-brand-desc">
              The modern scheduling and calendar platform built for fast-moving teams.
              Simplify coordination, boost productivity.
            </p>
            <div className="ft-socials">
              <a href="#" className="ft-social-btn" aria-label="Help">
                <HelpCircle size={16} />
              </a>
              <a href="#" className="ft-social-btn" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="#" className="ft-social-btn" aria-label="GitHub">
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* RIGHT – link columns */}
          <div className="ft-cols">

            {/* PRODUCT */}
            <div className="ft-col">
              <h4 className="ft-col-title">PRODUCT</h4>
              <ul className="ft-col-links">
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/security">Security</Link></li>
                <li><Link to="/roadmap">Roadmap</Link></li>
                <li>
                  <Link to="/changelog">
                    Changelog <span className="ft-badge ft-badge-new">New</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* COMPANY */}
            <div className="ft-col">
              <h4 className="ft-col-title">COMPANY</h4>
              <ul className="ft-col-links">
                <li><Link to="/about">About Us</Link></li>
                <li>
                  <Link to="/careers">
                    Careers <span className="ft-badge ft-badge-hiring">Hiring</span>
                  </Link>
                </li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/partners">Partners</Link></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div className="ft-col">
              <h4 className="ft-col-title">LEGAL</h4>
              <ul className="ft-col-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/cookies">Cookie Policy</Link></li>
                <li><Link to="/gdpr">GDPR</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ───────────────────────────────────────── */}
      <div className="ft-bottom">
        <div className="ft-container ft-bottom-inner">
          {/* left */}
          <span className="ft-copy">© 2025 Acteal, Inc. All rights reserved.</span>

          {/* email */}
          <a href="mailto:info@acteal.com" className="ft-email">
            <Mail size={13} /> info@acteal.com
          </a>

          {/* right */}
          <div className="ft-bottom-right">
            <span className="ft-status">
              <span className="ft-status-dot" /> All systems operational
            </span>
            <button className="ft-back-top" onClick={scrollToTop}>
              <ArrowUp size={13} /> Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;