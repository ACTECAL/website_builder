import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DummyWebsite.css';

const DummyWebsite = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '🚀',
      title: 'Lightning Fast',
      description: 'Incredibly fast performance for all your needs'
    },
    {
      icon: '✨',
      title: 'Modern Design',
      description: 'Sleek and intuitive user interface'
    },
    {
      icon: '🔒',
      title: 'Secure',
      description: 'Enterprise-grade security for your data'
    },
    {
      icon: '🔄',
      title: 'Seamless Integration',
      description: 'Works with your favorite tools'
    }
  ];

  return (
    <div className="dummy-website">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="logo" onClick={() => navigate('/')}>
            <span className="logo-icon">✨</span>
            <span>Actyx</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
            <button className="cta-button" onClick={() => window.open('https://example.com/signup', '_blank')}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>Welcome to Nexora</h1>
          <p className="subtitle">The all-in-one platform to launch your next big idea</p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={() => window.open('https://example.com/demo', '_blank')}>
              Watch Demo
            </button>
            <button className="secondary-button" onClick={() => window.open('https://example.com/signup', '_blank')}>
              Start Free Trial
            </button>
          </div>
          <div className="hero-image">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="dashboard-preview">
              <div className="dashboard-header"></div>
              <div className="dashboard-content"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Powerful Features</h2>
          <p className="section-subtitle">Everything you need to succeed</p>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of satisfied users today</p>
          <button className="primary-button" onClick={() => window.open('https://example.com/signup', '_blank')}>
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-icon">✨</span>
              <span>Nexora</span>
            </div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>Product</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#integrations">Integrations</a>
              </div>
              <div className="footer-column">
                <h4>Resources</h4>
                <a href="#blog">Blog</a>
                <a href="#docs">Documentation</a>
                <a href="#support">Support</a>
              </div>
              <div className="footer-column">
                <h4>Company</h4>
                <a href="#about">About Us</a>
                <a href="#careers">Careers</a>
                <a href="#contact">Contact</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Nexora. All rights reserved.</p>
            <div className="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DummyWebsite;
