import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { industryCategories } from '../data/industries';

export const AllIndustries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = industryCategories.map(category => ({
    ...category,
    industries: category.industries.filter(industry =>
      industry.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.industries.length > 0);

  return (
    <main style={{ padding: '30px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 700 }}>Choose your Industry</h1>
          <div style={{ position: 'relative', maxWidth: '600px', margin: '24px auto' }}>
            <input
              type="text"
              placeholder="Search for an Industry"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 40px 16px 20px',
                borderRadius: '8px',
                border: '1px solid #E2E8F0',
                fontSize: '1rem',
              }}
            />
            <i className="fas fa-search" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#A0AEC0' }}></i>
          </div>
        </div>

        {filteredCategories.map(category => (
          <div key={category.name} style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '24px' }}>{category.name}</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
            }}>
              {category.industries.map(industry => (
                <Link to={`/industries/${industry.slug}`} key={industry.slug} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '24px',
                  backgroundColor: '#F7FAFC',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}>
                  <div style={{ marginRight: '24px', fontSize: '2rem', color: 'var(--color-primary)' }}>
                    <i className={industry.icon}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, margin: 0 }}>{industry.name}</h3>
                    <p style={{ color: '#4A5568', margin: '4px 0 0' }}>{industry.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};
