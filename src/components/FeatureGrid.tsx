import React from 'react';

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
    <section className="py-5 bg-light-subtle">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3 text-dark">
            Transform your digital workflow
          </h2>
          <div className="mx-auto mb-4" style={{
            width: '120px',
            height: '4px',
            background: 'linear-gradient(90deg, var(--color-primary, #714B67) 0%, var(--color-secondary, #017E84) 100%)',
            borderRadius: '2px'
          }} />
          <h3 className="h4 text-primary fw-semibold mb-3">
            Tailored solutions for every digital need
          </h3>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: 600 }}>
            Our platform provides powerful experiences to streamline your online processes and boost productivity.
          </p>
        </div>

        <div className="row g-4 justify-content-center mb-5">
          {[
            { icon: <i className="fa-solid fa-cloud-arrow-up" style={{ color: "#FF7A00" }}></i>, title: 'Cloud Storage', desc: 'Secure, reliable file delivery' },
            { icon: <i className="fa fa-key" style={{ color: "#FF934F" }} aria-hidden="true"></i>, title: 'API Integration', desc: 'Connect your applications' },
            { icon: <i className="fa fa-cogs" style={{ color: "#FF5A1F" }} aria-hidden="true"></i>, title: 'Automation', desc: 'Automate repetitive workflows' }
          ].map((item, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 feature-card">
                <div className="card-body p-4 text-center text-md-start">
                  <div className="mb-3 display-6">{item.icon}</div>
                  <h3 className="h5 fw-bold mb-2 text-dark">{item.title}</h3>
                  <p className="text-secondary mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4 justify-content-center">
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
            <div key={`second-${idx}`} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 feature-card">
                <div className="card-body p-4 text-center text-md-start">
                  <div className="mb-3 display-6">{item.icon}</div>
                  <h3 className="h5 fw-bold mb-2 text-dark">{item.title}</h3>
                  <p className="text-secondary mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .feature-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .feature-card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
      `}</style>
    </section>
  );
};


