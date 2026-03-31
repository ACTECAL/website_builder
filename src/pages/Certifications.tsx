import React from 'react';
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

      <section style={{ padding: '10px 24px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 12 }}>
            <Link to="/community" style={{ textDecoration: 'none', color: '#667eea' }} reloadDocument>← Back to Community</Link>
          </div>
          <h2 style={{ margin: '0 0 16px' }}>Certification paths</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[{
              t: 'Admin Associate', d: 'Master core setup, security, and configuration.'
            },{
              t: 'Admin Professional', d: 'Advanced governance, automation, and scalability.'
            },{
              t: 'Developer Associate', d: 'APIs, integrations, and custom extensions.'
            }].map((it, i) => (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18 }}>
                <h4 style={{ margin: '0 0 8px' }}>{it.t}</h4>
                <p style={{ margin: '0 0 12px', color: '#4a5568' }}>{it.d}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link to="/training" className="btn btn-outline-primary" reloadDocument>View training</Link>
                  <Link to="/docs" className="btn btn-outline-primary" reloadDocument>Docs</Link>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ margin: '24px 0 16px' }}>Exam details</h2>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: 10, padding: 18, marginBottom: 24 }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
              {[['Format', 'Proctored, multiple-choice'], ['Duration', '90 minutes'], ['Passing score', '70%'], ['Price', '$149 / attempt']].map((row, i) => (
                <li key={i} style={{ color: '#4a5568' }}><strong style={{ color: '#2d3748' }}>{row[0]}:</strong> {row[1]}</li>
              ))}
            </ul>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/training" className="btn btn-primary" reloadDocument>Start preparing</Link>
            <Link to="/help-center" className="btn btn-outline-primary" reloadDocument>Get help</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
