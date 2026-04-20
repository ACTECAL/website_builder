import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Upgrades: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Upgrades"
        subtitle="Plan your upgrade with confidence: assess, test, migrate, and go live with minimal downtime."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Recommended path</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[{t:'1) Assess', d:'Review current version, customizations, and integrations.'}, {t:'2) Sandbox', d:'Spin up a test environment and import sample data.'}, {t:'3) Validate', d:'Run critical workflows, data checks, and performance tests.'}, {t:'4) Migrate', d:'Schedule cutover, back up data, and monitor post‑go‑live.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title-nomargin">{it.t}</h4>
                <p className="community-card-desc-mt">{it.d}</p>
              </div>
            ))}
          </div>

          <h2 className="community-subpage-title-mt">Resources</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[{t:'Release notes', link:'/releases', d:'See what changed in each version.'}, {t:'Security', link:'/security', d:'Review security changes and hardening steps.'}, {t:'Implementation services', link:'/implementation-services', d:'Get expert help for complex upgrades.'}].map((card) => (
              <Link key={card.t} to={card.link} className="blog-card" style={{ textDecoration: 'none' }} reloadDocument>
                <h4 className="community-card-title-nomargin">{card.t}</h4>
                <p className="community-card-desc-mt">{card.d}</p>
              </Link>
            ))}
          </div>

          <div className="community-flex-group">
            <Link to="/contact-sales" className="btn btn-primary" reloadDocument>Talk to sales</Link>
            <Link to="/support" className="btn btn-outline-primary" reloadDocument>Open a support ticket</Link>
            <Link to="/customer-references" className="btn btn-outline-primary" reloadDocument>Read customer stories</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
