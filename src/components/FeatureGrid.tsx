import React from 'react';
import '../styles/FeatureGrid.css';

type Section = {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon?: string;
  color?: string;
  cta?: { label: string; href: string };
};

type Props = {
  sections: Section[];
};

export const FeatureGrid: React.FC<Props> = React.memo(({ sections }) => {
  return (
    <section className="feature-grid-section">
      <div className="feature-grid-container">
        <div className="feature-grid-header">
          <div className="feature-grid-badge">
            <i className="fa-solid fa-bolt" /> Platform Capabilities
          </div>
          <h2 className="feature-grid-title">Transform your digital workflow</h2>
          <div className="feature-grid-divider" />
          <h3 className="feature-grid-subtitle">Tailored solutions for every digital need</h3>
          <p className="feature-grid-desc">
            Our platform provides powerful experiences to streamline your online processes and boost productivity.
          </p>
        </div>

        <div className="features-grid">
          {[
            { icon: <i className="fa-solid fa-cloud-arrow-up icon-cloud"></i>, title: 'Cloud Storage', desc: 'Secure, reliable file delivery' },
            { icon: <i className="fa fa-key icon-key" aria-hidden="true"></i>, title: 'API Integration', desc: 'Connect your applications' },
            {
              icon: <i className="fa fa-cogs icon-cogs" aria-hidden="true"></i>
              , title: 'Automation', desc: 'Automate repetitive workflows'
            }
          ].map((item, idx) => (
            <article key={idx} className="feature-card">
              <div className="feature-icon-wrapper">
                <span>{item.icon}</span>
              </div>
              <h3 className="feature-card-title">{item.title}</h3>
              <p className="feature-card-desc">{item.desc}</p>
            </article>
          ))}
        </div>

        <div className="features-grid features-grid-spacer">
          {[
            { icon: <i className="fa fa-users icon-users" aria-hidden="true"></i>, title: 'CRM & Engagement', desc: 'Delight customers at scale' },
            { icon: <i className="fa-solid fa-photo-film icon-photo"></i>, title: 'Social Media', desc: 'Build community and amplify' },
            { icon: <i className="fa fa-line-chart icon-chart"></i>, title: 'Analytics & Insights', desc: 'Understand data to drive scale' },
            { icon: <i className="fa-solid fa-people-group icon-people"></i>, title: 'Brand Strategy', desc: 'Develop a unique identity and roadmap for growth' },
            { icon: <i className="fa-solid fa-code icon-code"></i>, title: 'Web Development', desc: 'Build responsive, user-friendly websites' },
            { icon: <i className="fa-solid fa-cart-shopping icon-cart"></i>, title: 'E-commerce Solutions', desc: 'Launch and scale online store with ease' },
            { icon: <i className="fa-solid fa-lightbulb icon-lightbulb"></i>, title: 'Digital Marketing', desc: 'Reach target audience effectively' },
            { icon: <i className="fa-solid fa-building-shield icon-shield"></i>, title: 'Cybersecurity', desc: 'Proactive protection for assets' },
            { icon: <i className="fa-solid fa-pen-fancy icon-pen"></i>, title: 'Content Creation', desc: 'Build connect applications' }
          ].map((item, idx) => (
            <article key={`second-${idx}`} className="feature-card">
              <div className="feature-icon-wrapper">
                <span>{item.icon}</span>
              </div>
              <h3 className="feature-card-title">{item.title}</h3>
              <p className="feature-card-desc">{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeatureGrid;
