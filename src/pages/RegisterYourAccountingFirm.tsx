import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const RegisterYourAccountingFirm: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Register your Accounting Firm"
        subtitle="Join our directory to reach new clients and collaborate on BizSuite implementations."
        emphasize="none"
      />
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>How registration works</h2>
          <ol style={{ margin: 0, paddingLeft: 20, color: '#4a5568' }}>
            <li>Submit your firm details and service specialties.</li>
            <li>Verification by our partner team (2–5 business days).</li>
            <li>Get listed in the directory and receive client leads.</li>
          </ol>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 }}>
            <Link to="/get-started" className="btn btn-primary">Start registration</Link>
            <Link to="/become-a-partner" className="btn btn-outline-primary" reloadDocument>Partner program</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
