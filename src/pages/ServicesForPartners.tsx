import React from 'react';
import { Link } from 'react-router-dom';

export const ServicesForPartners: React.FC = () => {
  return (
    <main>
      <section style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h1 style={{ margin: 0 }}>Services for Partners</h1>
          <p style={{ color: '#4a5568', marginTop: 10 }}>Enablement, co‑selling, and technical resources to help you win with Nexora.</p>
        </div>
      </section>
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[{t:'Solution enablement', d:'Playbooks, demo kits, and vertical blueprints.'}, {t:'Technical advisory', d:'Architecture reviews and migration guidance.'}, {t:'Co‑marketing', d:'Joint webinars, events, and case studies.'}].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: 0 }}>{it.t}</h4>
                <p style={{ margin: '8px 0 0', color: '#4a5568' }}>{it.d}</p>
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
