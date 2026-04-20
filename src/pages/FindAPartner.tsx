import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const FindAPartner: React.FC = () => {
  const partners = [
    { name: 'Acme Solutions', city: 'San Francisco, USA', tier: 'Gold', services: ['Implementation','Training','Customization'] },
    { name: 'Northwind Tech', city: 'Berlin, DE', tier: 'Silver', services: ['Customization','Support'] },
    { name: 'Delta Systems', city: 'Mumbai, IN', tier: 'Registered', services: ['Implementation','Accounting'] },
    { name: 'BrightScale', city: 'London, UK', tier: 'Gold', services: ['Implementation','Support','Training'] },
    { name: 'Cobalt IT', city: 'Toronto, CA', tier: 'Silver', services: ['Customization','Accounting'] },
    { name: 'ZenWare', city: 'Sydney, AU', tier: 'Registered', services: ['Implementation'] },
  ];
  const [tier, setTier] = React.useState<string>('All');
  const [svc, setSvc] = React.useState<string>('All');
  return (
    <main>
      <PageHero
        title="Find a Partner"
        subtitle="Work with certified partners for implementation, training, and support."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
            <div>
              <strong style={{ marginRight: 8 }}>Tier:</strong>
              {['All','Registered','Silver','Gold'].map((t) => (
                <button key={t} type="button" onClick={() => setTier(t)}
                  style={{ border: '1px solid #e2e8f0', borderRadius: 999, padding: '6px 10px', marginRight: 6, background: tier===t?'#edf2ff':'#fff', color: tier===t?'#2b6cb0':'#2d3748', cursor:'pointer', fontSize:12 }}>
                  {t}
                </button>
              ))}
            </div>
            <div>
              <strong style={{ marginRight: 8 }}>Service:</strong>
              {['All','Implementation','Training','Customization','Support','Accounting'].map((s) => (
                <button key={s} type="button" onClick={() => setSvc(s)}
                  style={{ border: '1px solid #e2e8f0', borderRadius: 999, padding: '6px 10px', marginRight: 6, background: svc===s?'#edf2ff':'#fff', color: svc===s?'#2b6cb0':'#2d3748', cursor:'pointer', fontSize:12 }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {partners
              .filter((p) => (tier === 'All' || p.tier === tier) && (svc === 'All' || p.services.includes(svc)))
              .map((p) => (
              <div key={p.name} className="community-subpage-card">
                <h4 style={{ margin: '0 0 6px' }}>{p.name}</h4>
                <p className="community-card-desc">{p.city}</p>
                <p style={{ margin: '6px 0 10px', color: '#4a5568' }}><strong>Tier:</strong> {p.tier}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                  {p.services.map((s) => (
                    <span key={s} style={{ border: '1px solid #e2e8f0', borderRadius: 999, padding: '4px 8px', fontSize: 12 }}>{s}</span>
                  ))}
                </div>
                <button className="btn btn-outline-primary" type="button">Contact</button>
              </div>
            ))}
          </div>
          <div className="community-flex-group">
            <Link to="/become-a-partner" className="btn btn-outline-primary" reloadDocument>Become a Partner</Link>
            <Link to="/services-for-partners" className="btn btn-outline-primary" reloadDocument>Partner Services</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
