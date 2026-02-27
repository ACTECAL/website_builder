import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import '../styles/Tutorials.css';

export const Tutorials: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Tutorials"
        subtitle="Step-by-step guides to help you set up, integrate, and ship faster with BizSuite."
        emphasize="none"
      />

      <section className="tutorials-section">
        <div className="tutorials-container">
          <div className="back-link-container">
            <Link to="/community" className="back-link" reloadDocument>← Back to Community</Link>
          </div>
          <h2 className="tutorials-heading">Quick starts</h2>
          <div className="tutorials-grid">
            <div className="tutorial-card">
              <h4 className="tutorial-card-title">Set up your first app</h4>
              <p className="tutorial-card-desc">Install core modules and configure your workspace.</p>
              <Link to="/solutions" className="btn btn-outline-primary" reloadDocument>Explore Solutions</Link>
            </div>
            <div className="tutorial-card">
              <h4 className="tutorial-card-title">Integrate via API</h4>
              <p className="tutorial-card-desc">Authenticate and make your first API call.</p>
              <Link to="/api-reference" className="btn btn-outline-primary" reloadDocument>API Reference</Link>
            </div>
            <div className="tutorial-card">
              <h4 className="tutorial-card-title">Secure your workspace</h4>
              <p className="tutorial-card-desc">Best practices for roles, SSO, and data protection.</p>
              <Link to="/security" className="btn btn-outline-primary" reloadDocument>Read Security</Link>
            </div>
          </div>

          <h2 className="featured-tutorials-heading">Featured tutorials</h2>
          <div className="tutorials-grid">
            {[{
              t: 'Onboarding checklist', d: 'Invite your team, set permissions, and launch fast.', link: '/help-center'
            }, {
              t: 'Connect integrations', d: 'Enable key integrations and automate workflows.', link: '/integrations'
            }, {
              t: 'Track deployments', d: 'Monitor health and releases with Status.', link: '/status'
            }].map((it, i) => (
              <div key={i} className="tutorial-card">
                <h4 className="tutorial-card-title">{it.t}</h4>
                <p className="tutorial-card-desc">{it.d}</p>
                <Link to={it.link} className="btn btn-outline-primary" reloadDocument>Open</Link>
              </div>
            ))}
          </div>

          <div className="tutorials-footer">
            <Link to="/docs" className="btn btn-primary" reloadDocument>Browse all Docs</Link>
            <Link to="/help-center" className="btn btn-outline-primary" reloadDocument>Get Help</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
