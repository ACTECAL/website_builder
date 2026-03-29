import React from 'react';
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
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>How it works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{t:'Form teams', d:'Collaborate in small teams to run a virtual company.'}, {t:'Make decisions', d:'Control inventory, pricing, hiring, and marketing.'}, {t:'Measure results', d:'Track KPIs and learn from outcomes.'}].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: '0 0 8px' }}>{it.t}</h4>
                <p style={{ margin: 0, color: '#4a5568' }}>{it.d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/events" className="btn btn-primary" reloadDocument>Join a session</Link>
            <Link to="/education-program" className="btn btn-outline-primary" reloadDocument>Curriculum</Link>
            <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Game guide</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
