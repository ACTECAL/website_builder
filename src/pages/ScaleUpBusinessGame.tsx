import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const ScaleUpBusinessGame: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Scale Up! Business Game"
        subtitle="A hands-on simulation to practice strategy, operations, and finance with Nexora."
        emphasize="none"
      />
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="community-subpage-title">How it works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{t:'Form teams', d:'Collaborate in small teams to run a virtual company.'}, {t:'Make decisions', d:'Control inventory, pricing, hiring, and marketing.'}, {t:'Measure results', d:'Track KPIs and learn from outcomes.'}].map((it, i) => (
              <div key={i} className="community-subpage-card">
                <h4 className="community-card-title">{it.t}</h4>
                <p className="community-card-desc">{it.d}</p>
              </div>
            ))}
          </div>
          <div className="community-flex-group-nomargin">
            <Link to="/events" className="btn btn-primary" reloadDocument>Join a session</Link>
            <Link to="/education-program" className="btn btn-outline-primary" reloadDocument>Curriculum</Link>
            <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Game guide</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
