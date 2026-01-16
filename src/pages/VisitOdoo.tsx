import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';

export const VisitOdoo: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Visit Actyx"
        subtitle="Plan a visit to our campus. Meet the team, attend workshops, and explore BizSuite in action."
        emphasize="none"
      />
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>Plan your visit</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{t:'Campus tour', d:'Guided tours of our facilities and demo stations.'}, {t:'Hands-on workshops', d:'Get practical experience with product experts.'}, {t:'Meet the teams', d:'Talk with engineers, designers, and advisors.'}].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: '0 0 8px' }}>{it.t}</h4>
                <p style={{ margin: 0, color: '#4a5568' }}>{it.d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/events" className="btn btn-primary" reloadDocument>Upcoming events</Link>
            <Link to="/contact" className="btn btn-outline-primary" reloadDocument>Contact us</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
