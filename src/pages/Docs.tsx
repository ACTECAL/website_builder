import React from 'react';
import SupportLayout from '../components/SupportLayout';

const sectionStyle: React.CSSProperties = {
  display: 'grid',
  gap: 18,
  padding: '26px 28px',
  borderRadius: 24,
  border: '1px solid rgba(249, 115, 22, 0.18)',
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 247, 236, 0.92) 100%)',
  boxShadow: '0 22px 45px rgba(249, 115, 22, 0.1)'
};

const headingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.45rem',
  fontWeight: 700,
  color: '#1f2937'
};

const codeBlockStyle: React.CSSProperties = {
  fontFamily: '"Fira Code", "JetBrains Mono", monospace',
  fontSize: '0.95rem',
  background: '#111827',
  borderRadius: 16,
  border: '1px solid rgba(17, 24, 39, 0.45)',
  padding: '18px 20px',
  whiteSpace: 'pre-wrap',
  color: '#f9fafb',
  boxShadow: '0 14px 30px rgba(15, 23, 42, 0.25)'
};

export const Docs: React.FC = () => {
  return (
    <SupportLayout
      title="Documentation"
      intro="Your definitive guide for configuring, extending, and launching Nexora in production."
    >
      <div style={{ display: 'grid', gap: 30 }}>
        <section style={sectionStyle}>
          <h2 style={headingStyle}>Quick Start</h2>
          <p style={{ margin: 0, color: '#4b5563' }}>
            Install the SDK with your package manager and initialize the client with your workspace credentials.
          </p>
          <div style={codeBlockStyle}>
            npm install @Nexora/sdk

            {`
import { createClient } from '@Nexora/sdk';

const client = createClient({
  baseUrl: 'https://api.Nexora.com',
  apiKey: process.env.Nexora_KEY,
});

await client.auth.verify();
`}
          </div>
        </section>

        <section style={{ ...sectionStyle, border: '1px solid rgba(251, 191, 36, 0.35)', background: 'linear-gradient(135deg, rgba(255, 250, 235, 0.95) 0%, rgba(255, 243, 214, 0.92) 100%)' }}>
          <h2 style={headingStyle}>Configuration</h2>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#4b5563', lineHeight: 1.8 }}>
            <li>Define environments (`development`, `staging`, `production`) under <code>Settings → Environments</code>.</li>
            <li>Rotate API keys regularly and scope them by access level.</li>
            <li>Sync user permissions using SCIM or the Admin Graph API.</li>
          </ul>
        </section>

        <section style={{ ...sectionStyle, border: '1px solid rgba(59, 130, 246, 0.28)', background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.95) 0%, rgba(219, 234, 254, 0.92) 100%)' }}>
          <h2 style={headingStyle}>Deployment Checklist</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {[ 'Connect status webhooks to your incident channel',
               'Enable audit logging for enterprise workspaces',
               'Configure regional data residency requirements',
               'Verify SSO domains before granting team access' ].map((item) => (
              <div
                key={item}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  background: '#fff',
                  borderRadius: 16,
                  padding: '14px 18px',
                  border: '1px solid rgba(59, 130, 246, 0.28)',
                  boxShadow: '0 12px 28px rgba(59, 130, 246, 0.12)'
                }}
              >
                <span style={{ fontSize: '1.2rem', color: '#38a169' }}>✅</span>
                <span style={{ color: '#1f2937' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section style={{ ...sectionStyle, border: '1px solid rgba(251, 146, 60, 0.35)', background: 'linear-gradient(135deg, rgba(255, 247, 237, 0.95) 0%, rgba(255, 236, 220, 0.9) 100%)' }}>
          <h2 style={headingStyle}>Resources</h2>
          <div style={{ display: 'grid', gap: 18 }}>
            {[{
              title: 'Integration Cookbook',
              description: 'Recipes for embedding dashboards, syncing data, and orchestrating workflows.'
            },{
              title: 'CLI Reference',
              description: 'Automate provisioning, migrations, and monitoring via the Nexora CLI.'
            },{
              title: 'Design Tokens',
              description: 'Align the Nexora UI kit with your brand using the Figma-ready token library.'
            }].map((resource) => (
              <div
                key={resource.title}
                style={{
                  display: 'grid',
                  gap: 6,
                  background: '#fff',
                  borderRadius: 18,
                  padding: '18px 20px',
                  border: '1px solid rgba(249, 115, 22, 0.25)',
                  boxShadow: '0 15px 30px rgba(249, 115, 22, 0.12)'
                }}
              >
                <strong style={{ color: '#1f2937', fontSize: '1.08rem' }}>{resource.title}</strong>
                <span style={{ color: '#4b5563' }}>{resource.description}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </SupportLayout>
  );
};


