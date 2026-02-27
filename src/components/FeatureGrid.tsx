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

export const FeatureGrid: React.FC<Props> = ({ sections }) => {
  return (
    <section className="feature-grid-section">
      <div className="feature-grid-container">
        <div className="feature-grid-header">
          <h2 className="feature-grid-title">Transform your digital workflow</h2>
          <div className="feature-grid-divider" />
          <h3 className="feature-grid-subtitle">Tailored solutions for every digital need</h3>
          <p className="feature-grid-desc">
            Our platform provides powerful experiences to streamline your online processes and boost productivity.
          </p>
        </div>

        <div className="features-grid">
          {[
            { icon: <i className="fa-solid fa-cloud-arrow-up" style={{ color: "#FF7A00" }}></i>, title: 'Cloud Storage', desc: 'Secure, reliable file delivery' },
            { icon: <i className="fa fa-key" style={{ color: "#FF934F" }} aria-hidden="true"></i>, title: 'API Integration', desc: 'Connect your applications' },
            {
              icon: <i className="fa fa-cogs" style={{ color: "#FF5A1F" }} aria-hidden="true"></i>
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
            { icon: <i className="fa fa-users" aria-hidden="true" style={{ color: "#FFB84D" }}></i>, title: 'CRM & Engagement', desc: 'Delight customers at scale' },
            { icon: <i className="fa-solid fa-photo-film" style={{ color: "#FF6F61" }}></i>, title: 'Social Media', desc: 'Build community and amplify' },
            { icon: <i className="fa fa-line-chart" style={{ color: "#FF4D4D" }}></i>, title: 'Analytics & Insights', desc: 'Understand data to drive scale' },
            { icon: <i className="fa-solid fa-people-group" style={{ color: "#FF884D" }}></i>, title: 'Brand Strategy', desc: 'Develop a unique identity and roadmap for growth' },
            { icon: <i className="fa-solid fa-code" style={{ color: "#FF7A45" }}></i>, title: 'Web Development', desc: 'Build responsive, user-friendly websites' },
            { icon: <i className="fa-solid fa-cart-shopping" style={{ color: "#FF5C33" }}></i>, title: 'E-commerce Solutions', desc: 'Launch and scale online store with ease' },
            { icon: <i className="fa-solid fa-lightbulb" style={{ color: "#FF6600" }}></i>, title: 'Digital Marketing', desc: 'Reach target audience effectively' },
            { icon: <i className="fa-solid fa-building-shield" style={{ color: "#CC4400" }}></i>, title: 'Cybersecurity', desc: 'Proactive protection for assets' },
            { icon: <i className="fa-solid fa-pen-fancy" style={{ color: "#FFA366" }}></i>, title: 'Content Creation', desc: 'Build connect applications' }
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
};

export default FeatureGrid;
