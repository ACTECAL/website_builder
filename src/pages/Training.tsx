import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Training: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Training"
        subtitle="Learn Nexora with guided courses, workshops, and hands-on labs."
        emphasize="none"
      />

      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>Learning tracks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{t:'Administrator', d:'Configure org settings, access, and security.'}, {t:'Developer', d:'Build integrations and extensions.'}, {t:'Business User', d:'Master everyday workflows and reporting.'}].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: '0 0 8px' }}>{it.t}</h4>
                <p style={{ margin: '0 0 12px', color: '#4a5568' }}>{it.d}</p>
                <Link to="/docs" className="btn btn-outline-primary" reloadDocument>View syllabus</Link>
              </div>
            ))}
          </div>

          <h2 style={{ margin: '24px 0 16px' }}>Workshops & labs</h2>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18, marginBottom: 24 }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {['Admin bootcamp','API integrations lab','Reporting masterclass','Security best practices'].map((s, i) => (
                <li key={i} style={{ color: '#2d3748' }}>• {s}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/certifications" className="btn btn-primary" reloadDocument>Prepare for certification</Link>
            <Link to="/help-center" className="btn btn-outline-primary" reloadDocument>Ask for guidance</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
