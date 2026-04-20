import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const VisitNexora: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Visit Nexora"
        subtitle="Plan a visit to our campus. Meet the team, attend workshops, and explore Nexora in action."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">Plan your visit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{t:'Campus tour', d:'Guided tours of our facilities and demo stations.'}, {t:'Hands-on workshops', d:'Get practical experience with product experts.'}, {t:'Meet the teams', d:'Talk with engineers, designers, and advisors.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title">{it.t}</h4>
                <p className="community-card-desc">{it.d}</p>
              </div>
            ))}
          </div>
          <div className="community-flex-group-nomargin">
            <Link to="/events" className="btn btn-primary" reloadDocument>Upcoming events</Link>
            <Link to="/contact" className="btn btn-outline-primary" reloadDocument>Contact us</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
