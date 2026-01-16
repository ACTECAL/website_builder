import React from 'react';
import { useParams } from 'react-router-dom';
import { industryCategories } from '../data/industries';
import { PageHero } from '../components/PageHero';
import { appModules } from '../data/appModules';
import '../styles/Industry.css';

export const Industry: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const industry = industryCategories
    .flatMap((category) => category.industries)
    .find((industry) => industry.slug === slug);

  if (!industry) {
    return (
      <div style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2>Industry not found</h2>
        <p>The industry you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <main>
      <PageHero
        title={industry.name}
        subtitle={industry.longDescription}
        imageUrl={industry.imageUrl}
      />
      <section className="industry-page-section">
        <div className="industry-page-container">
          <div className="key-features-grid">
            <div>
              <h2 className="section-title">Key Features for {industry.name}</h2>
              <ul className="key-features-list">
                {industry.keyFeatures.map((feature, index) => (
                  <li key={index} className="key-feature-item">
                    <div className="key-feature-icon">
                      <i className="fas fa-check-circle"></i>
                    </div>
                    <p className="key-feature-text">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img src={industry.imageUrl} alt={industry.name} className="industry-image" />
            </div>
          </div>

          {industry.testimonial && industry.testimonial.quote && (
            <div className="testimonial-section">
              <p className="testimonial-quote">"{industry.testimonial.quote}"</p>
              <p className="testimonial-author">- {industry.testimonial.author}, {industry.testimonial.company}</p>
            </div>
          )}

          {industry.relatedApps && industry.relatedApps.length > 0 && (
            <div className="related-apps-section">
              <h2 className="section-title" style={{ textAlign: 'center' }}>Related Apps for {industry.name}</h2>
              <div className="related-apps-grid">
                {industry.relatedApps.map((appSlug) => {
                  const app = appModules.find((app) => app.slug === appSlug);
                  if (!app) return null;
                  return (
                    <a href={`/apps/${app.slug}`} key={app.slug} className="related-app-card">
                      <h4>{app.name}</h4>
                      <p>{app.description}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          <div className="cta-section">
            <h3 className="cta-title">Ready to Streamline Your {industry.name} Business?</h3>
            <p className="cta-subtitle">Discover how Actyx can be tailored to fit your unique needs.</p>
            <a href="/get-started" className="btn btn-primary cta-button">Get Started</a>
          </div>
        </div>
      </section>
    </main>
  );
};
