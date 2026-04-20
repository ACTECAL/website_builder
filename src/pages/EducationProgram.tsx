import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const EducationProgram: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Education Program"
        subtitle="Empowering students and educators with access to Nexora resources and learning materials."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">What you get</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{t:'Free access', d:'Students and educators get free sandbox access.'}, {t:'Curriculum kits', d:'Ready-to-use modules and labs.'}, {t:'Certification vouchers', d:'Discounts for eligible participants.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title">{it.t}</h4>
                <p className="community-card-desc">{it.d}</p>
              </div>
            ))}
          </div>
          <div className="community-flex-group-nomargin">
            <Link to="/training" className="btn btn-primary" reloadDocument>View learning tracks</Link>
            <Link to="/certifications" className="btn btn-outline-primary" reloadDocument>Certifications</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
