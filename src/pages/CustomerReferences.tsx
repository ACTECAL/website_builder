import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import '../styles/CustomerReferences.css';

export const CustomerReferences: React.FC = () => {
  const [active, setActive] = React.useState<string>('All');
  const cases = [
    { name: 'SmallBiz Solutions', summary: 'Unified sales and inventory, reduced manual work by 40%.', industry: 'Retail' },
    { name: 'TechStart Inc.', summary: 'Automated billing and reporting, saving 20 hrs/week.', industry: 'SaaS' },
    { name: 'LogiCorp', summary: 'Streamlined procurement and warehouse operations.', industry: 'Logistics' },
    { name: 'GreenFoods', summary: 'Improved traceability across suppliers and batches.', industry: 'Food & Beverage' },
    { name: 'Sunrise Clinics', summary: 'Consolidated billing and inventory across 12 clinics.', industry: 'Healthcare' },
    { name: 'QuickShip', summary: 'Optimized picking routes and reduced delivery time by 15%.', industry: 'Logistics' },
  ];
  return (
    <main>
      <PageHero
        title="Customer References"
        subtitle="See how teams use BizSuite to simplify operations and grow."
        emphasize="none"
      />
      <section className="references-section">
        <div className="references-container">
          <div className="back-link-wrapper">
            <Link to="/community" className="back-link" reloadDocument>← Back to Community</Link>
          </div>
          <div className="tags-container">
            {['All', 'Retail', 'SaaS', 'Logistics', 'Healthcare', 'Food & Beverage', 'Manufacturing', 'Services'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActive(tag)}
                className={`tag-btn ${active === tag ? 'active' : 'inactive'}`}
              >{tag}</button>
            ))}
          </div>
          <div className="cases-grid">
            {cases
              .filter((c) => active === 'All' || c.industry === active)
              .map((c) => (
                <div key={c.name} className="case-card">
                  <h4 className="case-name">{c.name}</h4>
                  <p className="case-industry">{c.industry}</p>
                  <p className="case-summary">{c.summary}</p>
                  <div className="case-actions">
                    <Link to="/blog" className="btn btn-outline-primary" reloadDocument>Read story</Link>
                  </div>
                </div>
              ))}
          </div>
          <div className="references-footer">
            <Link to="/contact-sales" className="btn btn-primary" reloadDocument>Talk to sales</Link>
            <Link to="/features" className="btn btn-outline-primary" reloadDocument>Explore features</Link>
            <Link to="/customer-references" className="btn btn-outline-primary" reloadDocument>Submit your story</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
