import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import '../styles/Partners.css';

const Partners: React.FC = () => {
  const partnerTypes = [
    {
      title: 'Solution partners',
      description: 'Consultancies and systems integrators who implement BizSuite for mid-market and enterprise clients.'
    },
    {
      title: 'Technology partners',
      description: 'ISVs who build native integrations, marketplace apps, and custom modules on the BizSuite platform.'
    },
    {
      title: 'Referral partners',
      description: 'Advisors and agencies who recommend BizSuite and earn recurring revenue for successful customers.'
    }
  ];

  const benefits = [
    'Dedicated partner success manager and enablement resources',
    'Joint go-to-market programs and co-marketing funds',
    'Sandbox environments, technical training, and certification badges'
  ];

  const steps = [
    'Apply with your company details and customer focus.',
    'Meet with the partner team to design a joint success plan.',
    'Launch with enablement assets, training, and co-branded marketing.'
  ];

  return (
    <main className="partners-page">
      <PageHero
        title="BizSuite Partner Network"
        subtitle="Join a global ecosystem helping organizations modernize operations with BizSuite applications and integrations."
        emphasize="none"
      />

      <section className="partners-types-section">
        <div className="partners-container">
          <div className="partners-types-grid">
            {partnerTypes.map((type) => (
              <article key={type.title} className="partners-card">
                <h3 className="partners-card-title">{type.title}</h3>
                <p className="partners-card-desc">{type.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="partners-benefits-section">
        <div className="partners-container">
          <div className="partners-benefits-grid">
            <div className="partners-benefits-card">
              <h3 className="partners-benefits-title">Partner benefits</h3>
              <ul className="partners-benefits-list">
                {benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="partners-benefits-card">
              <h3 className="partners-benefits-title">Customer impact</h3>
              <p className="partners-impact-text">
                Our partners collectively support thousands of BizSuite customers through implementation, strategy, and managed services. Together, we drive adoption and measurable ROI.
              </p>
            </div>
            <div className="partners-benefits-card">
              <h3 className="partners-benefits-title">Partner spotlight</h3>
              <p className="partners-spotlight-text">
                Learn how Acme Consulting reduced onboarding time by 45% for a global retail chain using BizSuite automation and custom modules.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="partners-cta-section">
        <div className="partners-cta-inner">
          <h3 className="partners-cta-title">Become a partner</h3>
          <p className="partners-cta-desc">
            Ready to transform businesses with BizSuite? Apply below and our partner team will reach out within two business days.
          </p>
          <Link to="/contact" className="partners-cta-btn">
            Apply now →
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Partners;
