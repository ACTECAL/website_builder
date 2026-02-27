import React from 'react';
import PageHero from '../components/PageHero';

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: 16,
  padding: 24,
  border: '1px solid rgba(0,0,0,0.08)',
  boxShadow: '0 16px 36px rgba(26,26,26,0.08)'
};

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

  return (
    <main>
      <PageHero
        title="BizSuite Partner Network"
        subtitle="Join a global ecosystem helping organizations modernize operations with BizSuite applications and integrations."
        emphasize="none"
      />

      <section style={{ padding: '32px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {partnerTypes.map((type) => (
            <article key={type.title} style={cardStyle}>
              <h3 style={{ margin: '0 0 12px', fontSize: '1.25rem' }}>{type.title}</h3>
              <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>{type.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.3rem' }}>Partner benefits</h3>
            <ul style={{ margin: 0, paddingLeft: 20, color: '#4a5568', lineHeight: 1.6 }}>
              {benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.3rem' }}>Customer impact</h3>
            <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>
              Our partners collectively support thousands of BizSuite customers through implementation, strategy, and managed services. Together, we drive adoption and measurable ROI.
            </p>
          </div>
          <div style={cardStyle}>
            <h3 style={{ margin: '0 0 16px', fontSize: '1.3rem' }}>Partner spotlight</h3>
            <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>
              Learn how Acme Consulting reduced onboarding time by 45% for a global retail chain using BizSuite automation and custom modules.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.7rem', marginBottom: 16 }}>Become a partner</h3>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 24 }}>
            Ready to transform businesses with BizSuite? Apply below and our partner team will reach out within two business days.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: 'var(--color-primary)',
              color: '#fff',
              fontWeight: 700,
              borderRadius: 9999,
              textDecoration: 'none',
              boxShadow: '0 12px 28px rgba(255,107,0,0.25)'
            }}
          >
            Apply now →
          </a>
        </div>
      </section>
    </main>
  );
};

export default Partners;
