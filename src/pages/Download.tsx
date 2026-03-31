import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import '../styles/Download.css';

export const Download: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Download"
        subtitle="Get Nexora for your platform. Choose the edition that fits your needs."
        emphasize="none"
      />
      <section className="download-section">
        <div className="download-container">
          <div className="back-link-wrapper">
            <Link to="/community" className="back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="section-title">Choose platform</h2>
          <div className="platform-grid">
            {['Windows', 'macOS', 'Linux', 'Docker'].map((p) => (
              <div key={p} className="platform-card">
                <h4 className="platform-name">{p}</h4>
                <button className="btn btn-primary btn-download" type="button">Download</button>
              </div>
            ))}
          </div>
          <h2 className="secondary-title">Before you download</h2>
          <ul className="info-list">
            <li>Compare features in different editions.</li>
            <li>Review latest release notes.</li>
          </ul>
          <div className="download-footer">
            <Link to="/compare-editions" className="btn btn-outline-primary" reloadDocument>Compare Editions</Link>
            <Link to="/releases" className="btn btn-outline-primary" reloadDocument>View Releases</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
