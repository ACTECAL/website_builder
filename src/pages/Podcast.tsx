import React from 'react';
import '../styles/CommunitySubpage.css';
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
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Latest episodes</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {episodes.map((ep) => (
              <div key={ep.slug} className="community-subpage-card">
                <h4 className="community-card-title">{ep.title}</h4>
                <p className="community-card-desc">{ep.desc}</p>
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
