import React from 'react';
import { Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import '../styles/Tutorials.css';

const QUICK_STARTS = [
  {
    step: 'Quick Start 01',
    icon: 'fa-solid fa-rocket',
    title: 'Set up your first app',
    desc: 'Install core modules and configure your workspace in minutes.',
    link: '/solutions',
    label: 'Explore Solutions',
  },
  {
    step: 'Quick Start 02',
    icon: 'fa-solid fa-plug',
    title: 'Integrate via API',
    desc: 'Authenticate and make your first API call with our REST interface.',
    link: '/api-reference',
    label: 'API Reference',
  },
  {
    step: 'Quick Start 03',
    icon: 'fa-solid fa-shield-halved',
    title: 'Secure your workspace',
    desc: 'Best practices for roles, SSO, and data protection at every level.',
    link: '/security',
    label: 'Read Security',
  },
];

const FEATURED_TUTORIALS = [
  {
    step: 'Tutorial 01',
    icon: 'fa-solid fa-clipboard-list',
    title: 'Onboarding checklist',
    desc: 'Invite your team, set permissions, and launch fast.',
    link: '/help-center',
    label: 'Open Guide',
  },
  {
    step: 'Tutorial 02',
    icon: 'fa-solid fa-link',
    title: 'Connect integrations',
    desc: 'Enable key integrations and automate workflows across your stack.',
    link: '/integrations',
    label: 'View Integrations',
  },
  {
    step: 'Tutorial 03',
    icon: 'fa-solid fa-gauge-high',
    title: 'Track deployments',
    desc: 'Monitor health and releases with the Nexora Status dashboard.',
    link: '/status',
    label: 'Check Status',
  },
];

export const Tutorials: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Tutorials"
        subtitle="Step-by-step guides to help you set up, integrate, and ship faster with Nexora."
        emphasize="none"
      />

      <section className="tutorials-section">
        <div className="tutorials-container">

          {/* Back Link */}
          <div className="back-link-container">
            <Link to="/community" className="back-link" reloadDocument>
              <i className="fa-solid fa-arrow-left" /> Back to Community
            </Link>
          </div>

          {/* Quick Starts */}
          <h2 className="tutorials-heading">Quick starts</h2>
          <div className="tutorials-grid">
            {QUICK_STARTS.map((item) => (
              <div key={item.title} className="tutorial-card">
                <div className="tutorial-card-icon">
                  <i className={item.icon} />
                </div>
                <div className="tutorial-card-step">{item.step}</div>
                <h4 className="tutorial-card-title">{item.title}</h4>
                <p className="tutorial-card-desc">{item.desc}</p>
                <Link to={item.link} className="btn btn-outline-primary" reloadDocument>
                  {item.label} <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            ))}
          </div>

          {/* Featured Tutorials */}
          <h2 className="featured-tutorials-heading">Featured tutorials</h2>
          <div className="tutorials-grid">
            {FEATURED_TUTORIALS.map((item) => (
              <div key={item.title} className="tutorial-card">
                <div className="tutorial-card-icon">
                  <i className={item.icon} />
                </div>
                <div className="tutorial-card-step">{item.step}</div>
                <h4 className="tutorial-card-title">{item.title}</h4>
                <p className="tutorial-card-desc">{item.desc}</p>
                <Link to={item.link} className="btn btn-outline-primary" reloadDocument>
                  {item.label} <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="tutorials-footer">
            <Link to="/docs" className="btn btn-primary" reloadDocument>
              <i className="fa-solid fa-book" /> Browse all Docs
            </Link>
            <Link to="/help-center" className="btn btn-outline-primary" reloadDocument>
              <i className="fa-solid fa-circle-question" /> Get Help
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
};

export default Tutorials;
