import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const apps = [
  { name: 'Accounting', icon: 'fa-coins', color: '#714B67' },
  { name: 'CRM', icon: 'fa-handshake', color: '#017E84' },
  { name: 'Sales', icon: 'fa-chart-line', color: '#00A09D' },
  { name: 'Project', icon: 'fa-diagram-project', color: '#714B67' },
  { name: 'Website', icon: 'fa-globe', color: '#017E84' },
  { name: 'HR', icon: 'fa-users', color: '#00A09D' },
];

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero">
        <div className="home-hero-bg">
          <div className="home-hero-blob home-hero-blob-1"></div>
          <div className="home-hero-blob home-hero-blob-2"></div>
        </div>
        <div className="home-hero-inner">
          <h1 className="home-hero-title">
            All your business on <span style={{ color: 'var(--o-color-secondary)' }}>one platform.</span>
          </h1>
          <p className="home-hero-subtitle">
            The only platform you'll ever need to run your business: integrated apps, simple to use, and loved by millions.
          </p>
          <div className="home-hero-actions">
            <Link to="/get-started" className="btn btn-primary btn-lg px-5 py-3 fw-bold">
              Start Now - It's Free
            </Link>
            <Link to="/contact-sales" className="btn btn-outline-secondary btn-lg px-5 py-3 fw-bold">
              Schedule a Demo
            </Link>
          </div>
          <div className="home-hero-claims">
            <div className="home-hero-claim">
              <i className="fa-solid fa-check"></i>
              <span>Free forever for 1 app</span>
            </div>
            <div className="home-hero-claim">
              <i className="fa-solid fa-check"></i>
              <span>Unlimited users</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Bar */}
      <section className="home-social-proof">
        <div className="container">
          <p className="home-social-proof-text">
            Trusted by <strong>12M+ users</strong> worldwide
          </p>
        </div>
      </section>

      {/* Apps Switcher */}
      <section className="home-apps-section">
        <div className="home-apps-inner">
          <h2 className="home-section-title">Pick your apps</h2>
          <p className="home-section-subtitle">Start with what you need, add more as you grow</p>
          <div className="home-apps-grid">
            {apps.map((app) => (
              <Link key={app.name} to="/apps" className="home-app-card">
                <div className="home-app-icon" style={{ backgroundColor: app.color }}>
                  <i className={`fa-solid ${app.icon}`}></i>
                </div>
                <div className="home-app-name">{app.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="home-value-section">
        <div className="home-value-inner">
          <div className="home-value-content">
            <h2>Focus on what matters</h2>
            <p>
              We handle the heavy lifting so you can focus on your business. Our automated workflows and integrated data mean you never have to enter the same information twice.
            </p>
            <div className="home-value-list">
              <div className="home-value-item">
                <i className="fa-solid fa-check-circle"></i>
                <span className="home-value-text">Automated accounting & invoicing</span>
              </div>
              <div className="home-value-item">
                <i className="fa-solid fa-check-circle"></i>
                <span className="home-value-text">Real-time inventory management</span>
              </div>
              <div className="home-value-item">
                <i className="fa-solid fa-check-circle"></i>
                <span className="home-value-text">Integrated CRM and Sales</span>
              </div>
            </div>
          </div>
          <div className="home-value-visual">
            <i className="fa-solid fa-laptop-code"></i>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta-section">
        <div className="home-cta-inner">
          <h2 className="home-cta-title">Level up your business today</h2>
          <p className="home-cta-subtitle">Join the millions of users who organize their business with Actyx.</p>
          <Link to="/get-started" className="btn btn-light btn-lg px-5 py-3 fw-bold">
            Start Now - It's Free
          </Link>
          <p className="home-cta-note">No credit card required • Instant access</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
