import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const RegisterYourAccountingFirm: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Register your Accounting Firm"
        subtitle="Join our directory to reach new clients and collaborate on Nexora implementations."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">How registration works</h2>
          <ol className="community-ordered-list">
            <li>Submit your firm details and service specialties.</li>
            <li>Verification by our partner team (2–5 business days).</li>
            <li>Get listed in the directory and receive client leads.</li>
          </ol>
          <div className="community-flex-group">
            <Link to="/signup?type=accounting" className="btn btn-primary">Start registration</Link>
            <Link to="/become-a-partner" className="btn btn-outline-primary" reloadDocument>Partner program</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
