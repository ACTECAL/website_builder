import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <main className="bg-white min-h-screen text-dark font-sans">
      <PageHero
        title="About Actyx"
        subtitle="We build modern, modular business apps so teams can move faster and work as one."
        emphasize="none"
      />

      {/* Mission Section */}
      <section className="py-5">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p className="lead text-secondary mb-4" style={{ lineHeight: '1.8' }}>
                At Actyx, we believe the best software doesn't just help businesses run—it helps them thrive. In a world where companies are overloaded with tools, logins, and scattered data, we set out to create a unified platform that feels intuitive, scales with your needs, and makes collaboration effortless.
              </p>
              <p className="fw-bold fs-5 text-dark">
                Our mission is simple: Give every business the power of enterprise-level systems without the complexity, cost, or rigidity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-5 bg-light-subtle">
        <div className="container py-4">
          <h2 className="fw-bold text-center mb-5">Our Story</h2>
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <div className="p-4 bg-white rounded-3 shadow-sm border">
                <h4 className="fw-bold mb-3 text-primary">The Spark</h4>
                <p className="text-secondary mb-0">
                  Every company has an origin story, and ours began with a simple pain point. A small group of us—entrepreneurs and developers—were frustrated by how much time was wasted on repetitive tasks like invoicing. We wanted something better: a lightweight tool that automated invoices without needing a full IT team to maintain it.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-4 bg-white rounded-3 shadow-sm border">
                <h4 className="fw-bold mb-3 text-info">The Evolution</h4>
                <p className="text-secondary mb-0">
                  That first tool was small, but it made a big difference. Customers began asking for more: could we add customer tracking? What about expense management? Could we handle HR processes, too? One by one, we answered those requests. But instead of bolting on clunky features, we reimagined what a business platform should be.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="py-5">
        <div className="container py-4">
          <h2 className="fw-bold text-center mb-5">Our Principles</h2>
          <div className="row g-4">
            {[
              {
                title: "Modular First",
                subtitle: "Start small, expand when you need",
                content: "Business software shouldn't be 'all or nothing.' With Nexora, you can begin with one app—like CRM or finance—and expand as your company grows.",
                icon: "fa-puzzle-piece",
                color: "var(--color-primary)"
              },
              {
                title: "Open by Default",
                subtitle: "API-first with clean integrations",
                content: "We believe businesses should own their data. Nexora is API-first and designed for seamless integrations with the tools you already use.",
                icon: "fa-link",
                color: "var(--color-info)"
              },
              {
                title: "Delightfully Usable",
                subtitle: "Craft and polish matter",
                content: "We obsess over details—clean interfaces, simple workflows, and thoughtful design—because small touches have a big impact.",
                icon: "fa-wand-magic-sparkles",
                color: "var(--color-warning)"
              },
              {
                title: "One Coherent System",
                subtitle: "Not a pile of tabs",
                content: "Nexora is designed to feel like one connected brain for your company. No jumping between tabs, no hunting for files—just one seamless experience.",
                icon: "fa-brain",
                color: "var(--color-secondary)"
              }
            ].map((item, idx) => (
              <div key={idx} className="col-md-6">
                <div className="h-100 p-4 border rounded-3 hover-shadow transition-all bg-white">
                  <div className="d-flex align-items-start gap-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 64, height: 64, backgroundColor: `${item.color}15`, color: item.color }}>
                      <i className={`fa-solid ${item.icon} fs-3`}></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1">{item.title}</h4>
                      <p className="text-primary fw-medium small mb-2">{item.subtitle}</p>
                      <p className="text-secondary small mb-0">{item.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-5 bg-dark text-white text-center">
        <div className="container py-4">
          <h2 className="fw-bold mb-5">Our Impact</h2>
          <div className="row justify-content-center mb-5">
            <div className="col-lg-10">
              <div className="row g-4">
                {[
                  "Save time by automating tasks",
                  "Cut costs by reducing tool sprawl",
                  "Improve collaboration",
                  "Scale faster with modular apps"
                ].map((text, i) => (
                  <div key={i} className="col-md-3">
                    <div className="p-3 border border-secondary rounded-3 bg-white bg-opacity-10 h-100 d-flex flex-column justify-content-center align-items-center">
                      <i className="fa-solid fa-check-circle text-success mb-3 fs-4"></i>
                      <span className="fw-medium">{text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <figure className="text-center">
                <blockquote className="blockquote">
                  <p className="fs-5 fst-italic opacity-75">
                    "We finally have visibility across departments. Our team feels more connected, and we've reduced manual work by half."
                  </p>
                </blockquote>
                <figcaption className="blockquote-footer text-white-50 mt-3">
                  Customer Feedback
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light">
        <div className="container py-4 text-center">
          <h2 className="fw-bold mb-3">Ready to transform your business?</h2>
          <p className="lead text-secondary mb-4">
            Join thousands of companies growing with Nexora.
          </p>
          <Link to="/apps" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm hover-translate">
            Get Started for Free
          </Link>
        </div>
      </section>

      <style>{`
        .hover-translate:hover { transform: translateY(-2px); }
        .hover-shadow:hover { box-shadow: 0 1rem 3rem rgba(0,0,0,.1)!important; transform: translateY(-4px); }
        .transition-all { transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); }
      `}</style>
    </main>
  );
};