import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const CompareEditions: React.FC = () => {
  const rows = [
    { k: 'Core apps', c: 'Included', e: 'Included + advanced modules' },
    { k: 'Users', c: 'Up to 25', e: 'Unlimited' },
    { k: 'Support', c: 'Community forum', e: 'Email + Priority support' },
    { k: 'Customization', c: 'Basic', e: 'Advanced + APIs' },
    { k: 'SLA', c: '—', e: '99.9% uptime SLA' },
    { k: 'Price', c: '$0', e: 'See pricing' },
  ];
  return (
    <main>
      <PageHero
        title="Compare Editions"
        subtitle="Choose the plan that fits your team and growth."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 0, border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: 12, background: '#f7fafc', fontWeight: 700 }}>Feature</div>
            <div style={{ padding: 12, background: '#f7fafc', fontWeight: 700 }}>Community</div>
            <div style={{ padding: 12, background: '#f7fafc', fontWeight: 700 }}>Enterprise</div>
            {rows.map((r, i) => (
              <React.Fragment key={i}>
                <div style={{ padding: 12, borderTop: '1px solid #e2e8f0' }}>{r.k}</div>
                <div style={{ padding: 12, borderTop: '1px solid #e2e8f0' }}>{r.c}</div>
                <div style={{ padding: 12, borderTop: '1px solid #e2e8f0' }}>{r.e}</div>
              </React.Fragment>
            ))}
          </div>

          <div className="community-flex-group">
            <Link to="/pricing" className="btn btn-primary" reloadDocument>View Pricing</Link>
            <Link to="/download" className="btn btn-outline-primary" reloadDocument>Download</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
