import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Podcast: React.FC = () => {
  const episodes = [
    { title: 'Scaling ERP for SMBs', desc: 'Strategies to scale operations without complexity.', slug: 'scaling-erp-smbs' },
    { title: 'Automation in Accounting', desc: 'How to automate routine accounting tasks safely.', slug: 'automation-accounting' },
    { title: 'Integrations 101', desc: 'Connecting Nexora with your existing tools.', slug: 'integrations-101' },
  ];
  return (
    <main>
      <PageHero
        title="Podcast"
        subtitle="Conversations with experts on running and growing modern businesses."
        emphasize="none"
      />
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>Latest episodes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {episodes.map((ep) => (
              <div key={ep.slug} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: '0 0 8px' }}>{ep.title}</h4>
                <p style={{ margin: 0, color: '#4a5568' }}>{ep.desc}</p>
                <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
                  <button className="btn btn-primary" type="button">Play</button>
                  <Link to="/blog" className="btn btn-outline-primary" reloadDocument>Read transcript</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
