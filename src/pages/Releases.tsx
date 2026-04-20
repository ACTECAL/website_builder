import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Releases: React.FC = () => {
  const releases = [
    { v: 'v2.1.0', d: '2025-09-15', notes: 'New reporting module, performance improvements.' },
    { v: 'v2.0.0', d: '2025-06-01', notes: 'Major UI refresh, new apps directory.' },
    { v: 'v1.9.3', d: '2025-03-20', notes: 'Bug fixes and security updates.' },
  ];
  return (
    <main>
      <PageHero
        title="Releases"
        subtitle="See what’s new in every Nexora release."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {releases.map((r) => (
              <li key={r.v} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18, marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <strong style={{ marginRight: 8 }}>{r.v}</strong>
                    <span style={{ color: '#718096' }}>{r.d}</span>
                  </div>
                  <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Notes</Link>
                </div>
                <p className="community-card-desc-mt">{r.notes}</p>
              </li>
            ))}
          </ul>
          <div className="community-flex-group">
            <Link to="/upgrades" className="btn btn-outline-primary" reloadDocument>Plan an upgrade</Link>
            <Link to="/security" className="btn btn-outline-primary" reloadDocument>Review security</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
