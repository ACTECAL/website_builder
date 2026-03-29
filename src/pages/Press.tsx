import React from 'react';
import PageHero from '../components/PageHero';

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: 16,
  padding: 24,
  border: '1px solid rgba(0,0,0,0.08)',
  boxShadow: '0 16px 36px rgba(26,26,26,0.08)'
};

const Press: React.FC = () => {
  const announcements = [
    {
      title: 'Nexora raises Series C to accelerate AI copilots',
      date: 'May 8, 2025',
      summary: 'We secured $75M in funding led by Insight Partners to expand industry-specific automation models.'
    },
    {
      title: 'Introducing Nexora Manufacturing Cloud',
      date: 'April 22, 2025',
      summary: 'A dedicated package for factories and supply chain teams with digital twins and predictive maintenance.'
    },
    {
      title: 'Nexora earns ISO 27001 and SOC 2 Type II',
      date: 'March 5, 2025',
      summary: 'Independent audits confirm our commitment to enterprise security and compliance.'
    }
  ];

  const mediaAssets = [
    {
      title: 'Brand guidelines',
      description: 'Download logos, color palettes, and usage guidance for press and partners.'
    },
    {
      title: 'Executive bios',
      description: 'Access approved bios and headshots for interviews or event promotions.'
    },
    {
      title: 'Product screenshots',
      description: 'High-resolution imagery of the Nexora platform across mobile and desktop.'
    }
  ];

  return (
    <main>
      <PageHero
        title="Press & Media"
        subtitle="Stay up to date with Nexora news, download press assets, and get in touch with our communications team."
        emphasize="none"
      />

      <section style={{ padding: '32px 24px', background: 'var(--surface)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {announcements.map((item) => (
            <article key={item.title} style={cardStyle}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{item.date}</span>
              <h3 style={{ margin: '8px 0 12px', fontSize: '1.3rem' }}>{item.title}</h3>
              <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>{item.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ padding: '48px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', marginBottom: 32 }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: 12 }}>Press toolkit</h3>
          <p style={{ color: '#4a5568', lineHeight: 1.7 }}>
            We make it easy to cover Nexora. Download assets or connect with our communications leads for media inquiries.
          </p>
        </div>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gap: 24, gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
          {mediaAssets.map((asset) => (
            <div key={asset.title} style={cardStyle}>
              <h4 style={{ margin: '0 0 12px', fontSize: '1.1rem' }}>{asset.title}</h4>
              <p style={{ margin: 0, color: '#4a5568', lineHeight: 1.6 }}>{asset.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '48px 24px', background: '#ffffff' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.7rem', marginBottom: 16 }}>Media inquiries</h3>
          <p style={{ color: '#4a5568', lineHeight: 1.7, marginBottom: 24 }}>
            Reach our communications team for interviews, speaker requests, or data-driven stories about the future of business operations.
          </p>
          <a
            href="mailto:press@Nexora.app"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 24px',
              background: 'var(--color-primary)',
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              borderRadius: 9999,
              boxShadow: '0 12px 28px rgba(255,107,0,0.25)'
            }}
          >
            Email press@Nexora.app →
          </a>
        </div>
      </section>
    </main>
  );
};

export default Press;
