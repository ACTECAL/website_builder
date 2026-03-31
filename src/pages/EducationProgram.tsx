import React from 'react';
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
      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>What you get</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{t:'Free access', d:'Students and educators get free sandbox access.'}, {t:'Curriculum kits', d:'Ready-to-use modules and labs.'}, {t:'Certification vouchers', d:'Discounts for eligible participants.'}].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: '0 0 8px' }}>{it.t}</h4>
                <p style={{ margin: 0, color: '#4a5568' }}>{it.d}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/training" className="btn btn-primary" reloadDocument>View learning tracks</Link>
            <Link to="/certifications" className="btn btn-outline-primary" reloadDocument>Certifications</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
