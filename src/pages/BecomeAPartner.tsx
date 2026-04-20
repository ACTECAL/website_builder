import React from 'react';
import '../styles/CommunitySubpage.css';
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
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Why partner with us</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[{t:'Enablement', d:'Training, certifications, and solution playbooks.'}, {t:'Marketing', d:'Co-marketing and directory listings.'}, {t:'Support', d:'Priority partner support and success managers.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title-nomargin">{it.t}</h4>
                <p className="community-card-desc-mt">{it.d}</p>
              </div>
            ))}
          </div>
          <h2 className="community-subpage-title-mt">Program tiers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[{t:'Registered', p:'Listing + enablement starter.'}, {t:'Silver', p:'Lead sharing + advanced benefits.'}, {t:'Gold', p:'Highest benefits and co-selling.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title-nomargin">{it.t}</h4>
                <p className="community-card-desc-mt">{it.p}</p>
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
