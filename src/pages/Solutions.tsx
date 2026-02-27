import React from 'react';
import { Link } from 'react-router-dom';
import { industryCategories } from '../data/industries';

export const Solutions: React.FC = () => {
  return (
    <main style={{ padding: '40px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '50px',
        }}>
          {industryCategories.map((category) => (
            <div key={category.name}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                borderBottom: '2px solid var(--color-primary-light)',
                paddingBottom: '12px',
                marginBottom: '20px',
              }}>
                {category.name}
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {category.industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    to={`/industries/${industry.slug}`}
                    className="industry-link"
                    style={{
                      textDecoration: 'none',
                      color: '#4A5568',
                      fontSize: '1rem',
                      fontWeight: 500,
                      transition: 'color 0.2s ease, transform 0.2s ease',
                    }}
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            to="/industries"
            className="btn btn-primary"
            style={{
              padding: '14px 32px',
              fontSize: '1rem',
            }}
          >
            Browse all Industries
          </Link>
        </div>
      </div>
      <style>{`
        .industry-link:hover {
          color: var(--color-primary);
          transform: translateX(5px);
        }
      `}</style>
    </main>
  );
};


