import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Translations: React.FC = () => {
  const languages = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Arabic', 'Portuguese', 'Chinese'];
  return (
    <main>
      <PageHero
        title="Translations"
        subtitle="Help localize Nexora in your language and improve access worldwide."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Available languages</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
            {languages.map((lng) => (
              <div key={lng} className="community-subpage-card-sm">
                {lng}
              </div>
            ))}
          </div>
          <h2 className="community-subpage-title-mt">Contribute</h2>
          <ol className="community-ordered-list">
            <li>Read our translation guidelines.</li>
            <li>Claim strings in your language.</li>
            <li>Submit for review and track progress.</li>
          </ol>
          <div className="community-flex-group">
            <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Guidelines</Link>
            <Link to="/github" className="btn btn-outline-primary" reloadDocument>Contribute on GitHub</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
