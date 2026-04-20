import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Solutions.css';
import { industryCategories } from '../data/industries';

export const Solutions: React.FC = () => {
  return (
    <main className="solutions-main">
      <div className="solutions-container">
        <div className="solutions-grid">
          {industryCategories.map((category) => (
            <div key={category.name}>
              <h3 className="solutions-category-title">
                {category.name}
              </h3>
              <div className="solutions-links-grid">
                {category.industries.map((industry) => (
                  <Link
                    key={industry.slug}
                    to={`/industries/${industry.slug}`}
                    className="industry-link"
                  >
                    {industry.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="solutions-footer">
          <Link
            to="/industries"
            className="btn btn-primary solutions-browse-btn"
          >
            Browse all Industries
          </Link>
        </div>
      </div>
    </main>
  );
};


