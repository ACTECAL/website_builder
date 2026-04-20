import React from 'react';
import PageHero from '../components/PageHero';
import '../styles/Partners.css';

const Partners: React.FC = () => {
  const partnerTypes = [
    {
      title: 'Solution partners',
      description: 'Consultancies and systems integrators who implement Nexora for mid-market and enterprise clients.'
    },
    {
      title: 'Technology partners',
      description: 'ISVs who build native integrations, marketplace apps, and custom modules on the Nexora platform.'
    },
    {
      title: 'Referral partners',
      description: 'Advisors and agencies who recommend Nexora and earn recurring revenue for successful customers.'
    }
  ];

  const benefits = [
    'Dedicated partner success manager and enablement resources',
    'Joint go-to-market programs and co-marketing funds',
    'Sandbox environments, technical training, and certification badges'
  ];

  return (
    <main>
      <PageHero
        title="Nexora Partner Network"
        subtitle="Join a global ecosystem helping organizations modernize operations with Nexora applications and integrations."
        emphasize="none"
      />

      <section className="partners-section-surface">
        <div className="partners-card-grid">
          {partnerTypes.map((type) => (
            <article key={type.title} className="partners-card">
              <h3 className="partners-card-title">{type.title}</h3>
              <p className="partners-card-text">{type.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="partners-section-benefits">
        <div className="partners-benefits-grid">
          <div className="partners-card">
            <h3 className="partners-card-title-lg">Partner benefits</h3>
            <ul className="partners-benefits-list">
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="partners-card">
            <h3 className="partners-card-title-lg">Customer impact</h3>
            <p className="partners-card-text">
              Our partners collectively support thousands of Nexora customers through implementation, strategy, and managed services. Together, we drive adoption and measurable ROI.
            </p>
          </div>
          <div className="partners-card">
            <h3 className="partners-card-title-lg">Partner spotlight</h3>
            <p className="partners-card-text">
              Learn how Acme Consulting reduced onboarding time by 45% for a global retail chain using Nexora automation and custom modules.
            </p>
          </div>
        </div>
      </section>

      <section className="partners-section-cta">
        <div className="partners-cta-center">
          <h3 className="partners-cta-title">Become a partner</h3>
          <p className="partners-cta-text">
            Ready to transform businesses with Nexora? Apply below and our partner team will reach out within two business days.
          </p>
          <a href="/contact" className="partners-apply-btn">
            Apply now →
          </a>
        </div>
      </section>
    </main>
  );
};

export default Partners;
