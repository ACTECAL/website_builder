import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const BecomeAPartner: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Become a Partner"
        subtitle="Grow with Nexora. Get access to resources, enablement, and leads."
        emphasize="none"
      />
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>Why partner with us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[{t:'Enablement', d:'Training, certifications, and solution playbooks.'}, {t:'Marketing', d:'Co-marketing and directory listings.'}, {t:'Support', d:'Priority partner support and success managers.'}].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: 0 }}>{it.t}</h4>
                <p style={{ margin: '8px 0 0', color: '#4a5568' }}>{it.d}</p>
              </div>
            ))}
          </div>
          <h2 style={{ margin: '24px 0 16px' }}>Program tiers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[{t:'Registered', p:'Listing + enablement starter.'}, {t:'Silver', p:'Lead sharing + advanced benefits.'}, {t:'Gold', p:'Highest benefits and co-selling.'}].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: 0 }}>{it.t}</h4>
                <p style={{ margin: '8px 0 0', color: '#4a5568' }}>{it.p}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <Link to="/services-for-partners" className="btn btn-primary" reloadDocument>View partner services</Link>
            <Link to="/contact-sales" className="btn btn-outline-primary" reloadDocument>Talk to partner team</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
