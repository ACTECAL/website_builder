import React from 'react';
import SupportLayout from '../components/SupportLayout';
import '../styles/Docs.css';

export const Docs: React.FC = () => {
  return (
    <SupportLayout
      title="Documentation"
      intro="Your definitive guide for configuring, extending, and launching BizSuite in production."
    >
      <div className="docs-container">
        <div className="docs-grid">
          <section className="docs-section">
            <h2 className="docs-section-title">Quick Start</h2>
            <p className="docs-section-desc">
              Install the SDK with your package manager and initialize the client with your workspace credentials.
            </p>
            <div className="docs-code-block">
              npm install @bizsuite/sdk

              {`
import { createClient } from '@bizsuite/sdk';

const client = createClient({
  baseUrl: 'https://api.bizsuite.com',
  apiKey: process.env.BIZSUITE_KEY,
});

await client.auth.verify();
`}
            </div>
          </section>

          <section className="docs-section config">
            <h2 className="docs-section-title">Configuration</h2>
            <ul className="docs-list">
              <li>Define environments (`development`, `staging`, `production`) under <code>Settings → Environments</code>.</li>
              <li>Rotate API keys regularly and scope them by access level.</li>
              <li>Sync user permissions using SCIM or the Admin Graph API.</li>
            </ul>
          </section>

          <section className="docs-section checklist">
            <h2 className="docs-section-title">Deployment Checklist</h2>
            <div className="docs-checklist">
              {['Connect status webhooks to your incident channel',
                'Enable audit logging for enterprise workspaces',
                'Configure regional data residency requirements',
                'Verify SSO domains before granting team access'].map((item) => (
                <div key={item} className="docs-checklist-item">
                  <span className="docs-checklist-icon">✅</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="docs-section resources">
            <h2 className="docs-section-title">Resources</h2>
            <div className="docs-resources-grid">
              {[
                {
                  title: 'Integration Cookbook',
                  description: 'Recipes for embedding dashboards, syncing data, and orchestrating workflows.'
                },
                {
                  title: 'CLI Reference',
                  description: 'Automate provisioning, migrations, and monitoring via the BizSuite CLI.'
                },
                {
                  title: 'Design Tokens',
                  description: 'Align the BizSuite UI kit with your brand using the Figma-ready token library.'
                }
              ].map((resource) => (
                <div key={resource.title} className="docs-resource-card">
                  <h3 className="docs-resource-title">{resource.title}</h3>
                  <p className="docs-resource-desc">{resource.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </SupportLayout>
  );
};


