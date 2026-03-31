import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LegalPages.css';
import { Network, Database, Layers, CloudLightning } from 'lucide-react';

const Integrations: React.FC = () => {
  const suites = [
    {
      title: 'Productivity Suite',
      icon: <Layers className="legal-icon" />,
      description: 'Connect Google Workspace, Microsoft 365, Slack, and Zoom to synchronize calendars, automate meetings, and keep conversations in one place.',
      badges: ['Calendars', 'Chat', 'Automation']
    },
    {
      title: 'Finance & Accounting',
      icon: <Database className="legal-icon" />,
      description: 'Sync sales, invoices, and expenses directly with QuickBooks, Xero, Zoho Books, Razorpay, and Stripe for real-time ledgers.',
      badges: ['Billing', 'Payments', 'Compliance']
    },
    {
      title: 'E-commerce & CRM',
      icon: <Network className="legal-icon" />,
      description: 'Bring Shopify, WooCommerce, HubSpot, Salesforce, and Mailchimp together so customer data is always up to date.',
      badges: ['Commerce', 'CRM', 'Marketing']
    },
    {
      title: 'Developer Tools',
      icon: <CloudLightning className="legal-icon" />,
      description: 'Ship faster with GitHub, GitLab, Jira, Linear, and Notion automation blocks tailored to your engineering workflows.',
      badges: ['DevOps', 'Planning', 'Docs']
    }
  ];

  const steps = [
    {
      title: 'Plug-and-play connectors',
      description: 'Prebuilt connectors with guided setup let teams launch integrations in minutes, not weeks.'
    },
    {
      title: 'Unified data model',
      description: 'Normalize data across apps automatically so reporting stays consistent and reliable.'
    },
    {
      title: 'Secure automation',
      description: 'Granular permissions, audit logs, and encryption keep every integration enterprise-ready.'
    }
  ];

  return (
    <main className="legal-page-container">
      <div className="legal-glow-blob blob-top" />
      <div className="legal-glow-blob blob-bottom" style={{ background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 60%)' }} />

      <div className="legal-hero">
        <h1 className="legal-title">Seamless Integrations</h1>
        <p className="legal-subtitle">
          Bring every tool into a single operating system. Nexora connects the apps your teams love with point-and-click simplicity and enterprise reliability.
        </p>
      </div>

      <div className="legal-content-wrapper" style={{ maxWidth: 1200 }}>
        
        {/* Suites Grid */}
        <section className="legal-section">
          <h2 className="legal-section-title">Ecosystem Hubs</h2>
          <div className="legal-grid-320">
            {suites.map((suite) => (
              <article key={suite.title} className="legal-glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="legal-flex-header">
                  <div className="legal-icon-box purple">
                    {suite.icon}
                  </div>
                  <h3 className="legal-card-title">{suite.title}</h3>
                </div>
                
                <p className="legal-desc-text">
                  {suite.description}
                </p>
                
                <div className="legal-badge-container">
                  {suite.badges.map((badge) => (
                    <span key={badge} className="legal-badge-purple">
                      {badge}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Features/Steps */}
        <section className="legal-section" style={{ marginTop: 64 }}>
          <h2 className="legal-section-title">Integration Standards</h2>
          <div className="legal-grid-280">
            {steps.map((step) => (
              <div key={step.title} className="legal-step-card">
                <h4 className="legal-step-title">{step.title}</h4>
                <p className="legal-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call To Action */}
        <section className="legal-cta-section">
          <div className="legal-glass-card legal-cta-card">
            <h3 className="legal-cta-title-lg">Build your own integration</h3>
            <p className="legal-cta-desc">
              Developers can use our REST and GraphQL APIs to orchestrate bespoke workflows. Webhooks, SDKs, and event streams help you push and pull data securely.
            </p>
            <Link to="/api-reference" className="legal-back-btn blue">
              View API Reference &rarr;
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default Integrations;
