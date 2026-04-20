import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';

export const ServicesForPartners: React.FC = () => {
  return (
    <main>
      <section style={{ padding: '40px 24px' }}>
        <div className="community-subpage-container">
          <h1 className="community-card-title-nomargin">Services for Partners</h1>
          <p style={{ color: '#4a5568', marginTop: 10 }}>Enablement, co‑selling, and technical resources to help you win with Nexora.</p>
        </div>
      </section>
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[{t:'Solution enablement', d:'Playbooks, demo kits, and vertical blueprints.'}, {t:'Technical advisory', d:'Architecture reviews and migration guidance.'}, {t:'Co‑marketing', d:'Joint webinars, events, and case studies.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title-nomargin">{it.t}</h4>
                <p className="community-card-desc-mt">{it.d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/contact-sales" className="btn btn-primary" reloadDocument>Request services</Link>
            <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Download guide</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
