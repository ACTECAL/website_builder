import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Github: React.FC = () => {
  return (
    <main>
      <PageHero
        title="GitHub"
        subtitle="Explore the source, contribute, and track development."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[{t:'Repository', d:'Browse code, branches, and tags.'}, {t:'Issues', d:'Report bugs or request features.'}, {t:'Pull Requests', d:'Contribute improvements.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title">{it.t}</h4>
                <p className="community-card-desc">{it.d}</p>
              </div>
            ))}
          </div>
          <h2 style={{ margin: '24px 0 12px' }}>Quick links</h2>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#4a5568' }}>
            <li>Security policy and responsible disclosure</li>
            <li>Code of conduct</li>
            <li>Release workflow and versioning</li>
          </ul>
          <h2 style={{ margin: '24px 0 12px' }}>Contributing</h2>
          <ol style={{ margin: 0, paddingLeft: 18, color: '#4a5568' }}>
            <li>Fork the repository</li>
            <li>Create a branch (feature/fix)</li>
            <li>Open a PR with context and screenshots</li>
          </ol>
          <div className="community-flex-group">
            <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Contributing Guide</Link>
            <Link to="/releases" className="btn btn-outline-primary" reloadDocument>Release notes</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
