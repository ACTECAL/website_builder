import React from 'react';
import PageHero from '../components/PageHero';

const Roadmap: React.FC = () => {
  const quarters = [
    {
      label: 'Q2 2025',
      status: 'In Progress',
      items: [
        'Workflow Builder 2.0 with conditional branching',
        'Native WhatsApp and SMS automations',
        'Advanced analytics dashboards for executives'
      ]
    },
    {
      label: 'Q3 2025',
      status: 'Planned',
      items: [
        'Custom AI copilots for finance and sales teams',
        'Global data residency options in APAC & EU',
        'One-click marketplace for partner-built modules'
      ]
    },
    {
      label: 'Q4 2025',
      status: 'Planned',
      items: [
        'Offline-first mobile apps',
        'Predictive forecasting with embedded ML',
        'Enterprise-grade audit center and policy engine'
      ]
    }
  ];

  const feedbackChannels = [
    {
      title: 'Community board',
      description: 'Vote on features and share use cases with peers in our open roadmap community.'
    },
    {
      title: 'Customer council',
      description: 'Enterprise customers can join quarterly briefings with product leadership.'
    },
    {
      title: 'Early access',
      description: 'Opt in to beta programs to test new capabilities before public release.'
    }
  ];

  return (
    <main>
      <PageHero
        title="Product Roadmap"
        subtitle="See what the Nexora team is building next. We release updates every week to keep your operations humming."
        emphasize="none"
      />

      <section style={{ padding: '32px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {quarters.map((quarter) => (
            <article
              key={quarter.label}
              style={{
                background: '#ffffff',
                borderRadius: 18,
                padding: 24,
                border: '1px solid rgba(0,0,0,0.08)',
                boxShadow: '0 16px 40px rgba(0,0,0,0.06)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{quarter.label}</h3>
                <span style={{
                  background: quarter.status === 'In Progress' ? 'rgba(255,107,0,0.12)' : 'rgba(26,26,26,0.08)',
                  color: quarter.status === 'In Progress' ? 'var(--color-primary)' : '#4a4a4a',
                  padding: '6px 12px',
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: '0.85rem'
                }}>
                  {quarter.status}
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, color: '#4a5568', lineHeight: 1.6 }}>
                {quarter.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', marginBottom: 32 }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: 12 }}>How we prioritize</h3>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
            We combine customer feedback, product analytics, and market research to determine the most impactful work. Share your ideas—we review every submission.
          </p>
        </div>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
          {feedbackChannels.map((channel) => (
            <div key={channel.title} style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: 24,
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.05)'
            }}>
              <h4 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>{channel.title}</h4>
              <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>{channel.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '48px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.7rem', marginBottom: 16 }}>Stay in the loop</h3>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 24 }}>
            Subscribe to monthly roadmap updates and get early invites to alpha and beta programs tailored to your industry.
          </p>
          <a
            href="/signup"
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
            Join beta list →
          </a>
        </div>
      </section>
    </main>
  );
};

export default Roadmap;
