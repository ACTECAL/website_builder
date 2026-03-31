import React from 'react';
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
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>Our approach</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 24 }}>
            {[{t:'Discovery', d:'Assess goals, processes, and data sources.'}, {t:'Design', d:'Blueprint architecture and security.'}, {t:'Deployment', d:'Configure apps, migrate data, integrate systems.'}, {t:'Enablement', d:'Train users and transition to steady state.'}].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: 0 }}>{it.t}</h4>
                <p style={{ margin: '8px 0 0', color: '#4a5568' }}>{it.d}</p>
              </div>
            ))}
          </div>
          <h2 style={{ margin: '24px 0 16px' }}>Packages</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[{t:'Starter', p:'For up to 25 users', i:['Scoping','Configuration','Light migration']}, {t:'Standard', p:'For growing teams', i:['Workshops','Integrations','Data migration']}, {t:'Enterprise', p:'Complex programs', i:['Solution design','Custom dev','Change management']}].map((pkg, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: 0 }}>{pkg.t}</h4>
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
