import React from 'react';
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
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>Available languages</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
            {languages.map((lng) => (
              <div key={lng} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 14 }}>
                {lng}
              </div>
            ))}
          </div>
          <h2 style={{ margin: '24px 0 16px' }}>Contribute</h2>
          <ol style={{ margin: 0, paddingLeft: 20, color: '#4a5568' }}>
            <li>Read our translation guidelines.</li>
            <li>Claim strings in your language.</li>
            <li>Submit for review and track progress.</li>
          </ol>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Guidelines</Link>
            <Link to="/github" className="btn btn-outline-primary" reloadDocument>Contribute on GitHub</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
