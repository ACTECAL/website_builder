import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const ImplementationServices: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Implementation Services"
        subtitle="From discovery to deployment, our experts help you launch Nexora smoothly."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Our approach</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[{t:'Discovery', d:'Assess goals, processes, and data sources.'}, {t:'Design', d:'Blueprint architecture and security.'}, {t:'Deployment', d:'Configure apps, migrate data, integrate systems.'}, {t:'Enablement', d:'Train users and transition to steady state.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title-nomargin">{it.t}</h4>
                <p className="community-card-desc-mt">{it.d}</p>
              </div>
            ))}
          </div>
          <h2 className="community-subpage-title-mt">Packages</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[{t:'Starter', p:'For up to 25 users', i:['Scoping','Configuration','Light migration']}, {t:'Standard', p:'For growing teams', i:['Workshops','Integrations','Data migration']}, {t:'Enterprise', p:'Complex programs', i:['Solution design','Custom dev','Change management']}].map((pkg, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title-nomargin">{pkg.t}</h4>
                <p style={{ margin: '8px 0 10px', color: '#4a5568' }}>{pkg.p}</p>
                <ul style={{ margin: 0, paddingLeft: 18, color: '#4a5568' }}>
                  {pkg.i.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 24 }}>
            <Link to="/contact-sales" className="btn btn-primary" reloadDocument>Talk to sales</Link>
            <Link to="/find-a-partner" className="btn btn-outline-primary" reloadDocument>Find a Partner</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
