import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AppModuleMeta } from '../data/appModules';
import '../styles/AppTemplate.css';

interface AppTemplateProps {
  module: AppModuleMeta;
}

export const AppTemplate: React.FC<AppTemplateProps> = ({ module }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [module.slug]);

  // Derive a primary color based on category for subtle accents
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Finance': '#017e84',
      'Sales': '#e85a4f',
      'Websites': '#4d6c8b',
      'Supply Chain': '#75628b',
      'Human Resources': '#65738f',
      'Marketing': '#eb6b45',
      'Services': '#e66244',
      'Productivity': '#8b566b',
    };
    return colors[cat] || '#6366f1';
  };

  const primaryColor = getCategoryColor(module.category);

  return (
    <main
      className="app-template-main"
      style={{
        '--primary-color': primaryColor,
        '--primary-color-alpha': `${primaryColor}15`,
        '--primary-shadow': `0 16px 32px ${primaryColor}40`,
        '--primary-shadow-dark': `0 20px 40px ${primaryColor}30`,
        '--container-opacity': isVisible ? 1 : 0,
        '--container-transform': isVisible ? 'translateY(0)' : 'translateY(20px)'
      } as React.CSSProperties}
    >
      {/* Dynamic Header Background */}
      <div className="dynamic-header-bg" />

      <div className="app-template-container">
        {/* Navigation */}
        <nav className="app-template-nav">
          <Link to="/" className="back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </nav>

        {/* Hero Section */}
        <header className="app-template-header">
          {/* Decorative Glow */}
          <div className="header-decorative-glow" />

          <div className="header-content-row">
            <div className="header-text-block">
              <div className="category-badge">
                {module.category}
              </div>
              <h1 className="app-title">{module.name}</h1>
              <p className="app-long-desc">{module.longDescription}</p>
            </div>
            <div>
              <a
                href={`mailto:hello@nexora.com?subject=${encodeURIComponent(`${module.name} demo request`)}`}
                className="demo-cta-btn"
              >
                {module.ctaLabel ?? 'Book a live demo'}{' '}
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div className="metrics-grid">
            {module.metrics.map((metric) => (
              <div key={metric.label} className="metric-card">
                <p className="metric-label">{metric.label}</p>
                <p className="metric-value">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* Content Section */}
        <section className="app-content-section">
          <div className="sidebar-cards">
            {/* Features Card */}
            <div className="info-card">
              <h2 className="card-title">Why teams choose {module.name}</h2>
              <div className="highlights-list">
                {module.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-item">
                    <div className="highlight-check">
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p className="highlight-text">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Roadmap */}
            <div className="info-card">
              <h2 className="card-title">Implementation Roadmap</h2>
              <div className="roadmap-relative">
                {/* Connecting Line */}
                <div className="roadmap-line" />

                <ol className="roadmap-list">
                  {[
                    'Kickoff discovery to map workflows and integrations.',
                    'Configure modules, import historical data, and QA automations.',
                    'Train administrators and power users; launch with guided checklists.',
                    'Review adoption metrics and optimize with quarterly business reviews.'
                  ].map((step, index) => (
                    <li key={index} className="roadmap-item">
                      <span className="roadmap-number">
                        {index + 1}
                      </span>
                      <div className="roadmap-text-wrapper">
                        <p className="roadmap-text">{step}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="sidebar-cards">
            {/* Integrations Card */}
            <div className="integrations-card">
              <h2 className="small-card-title">Works seamlessly with</h2>
              <div className="integrations-list">
                {module.integrations.map((tool) => (
                  <span key={tool} className="integration-tool">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Support/Contact Card */}
            <div className="custom-workflow-card">
              <div className="workflow-decorative-blob" />
              <h2 className="workflow-title">Need a custom workflow?</h2>
              <p className="workflow-desc">
                Our product architects can help design the perfect{' '}
                {module.name.toLowerCase()} implementation for your team's
                specific requirements.
              </p>
              <a
                href="mailto:hello@nexora.com?subject=Custom%20Nexora%20workflow"
                className="workflow-cta"
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
