import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Training: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Training"
        subtitle="Learn Nexora with guided courses, workshops, and hands-on labs."
        emphasize="none"
      />

      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Learning tracks</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{t:'Administrator', d:'Configure org settings, access, and security.'}, {t:'Developer', d:'Build integrations and extensions.'}, {t:'Business User', d:'Master everyday workflows and reporting.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title">{it.t}</h4>
                <p className="community-card-desc-mb">{it.d}</p>
                <Link to="/docs" className="btn btn-outline-primary" reloadDocument>View syllabus</Link>
              </div>
            ))}
          </div>

          <h2 className="community-subpage-title-mt">Workshops & labs</h2>
          <div className="community-subpage-card">
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
              {['Admin bootcamp','API integrations lab','Reporting masterclass','Security best practices'].map((s, i) => (
                <li key={i} className="community-list-item">• {s}</li>
              ))}
            </ul>
          </div>

          <div className="community-flex-group-nomargin">
            <Link to="/certifications" className="btn btn-primary" reloadDocument>Prepare for certification</Link>
            <Link to="/help-center" className="btn btn-outline-primary" reloadDocument>Ask for guidance</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
