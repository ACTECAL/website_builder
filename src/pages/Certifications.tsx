import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const Certifications: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Certifications"
        subtitle="Validate your Nexora skills with industry-recognized credentials."
        emphasize="none"
      />

      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Certification paths</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{
              t: 'Admin Associate', d: 'Master core setup, security, and configuration.'
            },{
              t: 'Admin Professional', d: 'Advanced governance, automation, and scalability.'
            },{
              t: 'Developer Associate', d: 'APIs, integrations, and custom extensions.'
            }].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title">{it.t}</h4>
                <p className="community-card-desc-mb">{it.d}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link to="/training" className="btn btn-outline-primary" reloadDocument>View training</Link>
                  <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Docs</Link>
                </div>
              </div>
            ))}
          </div>

          <h2 className="community-subpage-title-mt">Exam details</h2>
          <div className="community-subpage-card">
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[['Format', 'Proctored, multiple-choice'], ['Duration', '90 minutes'], ['Passing score', '70%'], ['Price', '$149 / attempt']].map((row, i) => (
                <li key={i} style={{ color: '#4a5568' }}><strong className="community-list-item">{row[0]}:</strong> {row[1]}</li>
              ))}
            </ul>
          </div>

          <div className="community-flex-group-nomargin">
            <Link to="/training" className="btn btn-primary" reloadDocument>Start preparing</Link>
            <Link to="/help-center" className="btn btn-outline-primary" reloadDocument>Get help</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
