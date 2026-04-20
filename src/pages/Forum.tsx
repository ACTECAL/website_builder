import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Forum: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Forum"
        subtitle="Ask questions, share solutions, and learn from the community."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Popular topics</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
            {['Getting Started','Integrations','Accounting','Inventory','HR & Payroll','Reporting'].map((t) => (
              <div key={t} className="community-subpage-card">
                <h4 className="community-card-title-nomargin">{t}</h4>
              </div>
            ))}
          </div>
          <h2 style={{ margin: '24px 0 12px' }}>Guidelines</h2>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#4a5568' }}>
            <li>Search before posting; include steps and screenshots.</li>
            <li>Be respectful and keep discussions on-topic.</li>
            <li>Mark the best answer to help others.</li>
          </ul>
          <div className="community-flex-group">
            <button type="button" className="btn btn-primary">Ask a question</button>
            <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Browse Docs</Link>
            <Link to="/support" className="btn btn-outline-primary" reloadDocument>Contact Support</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
