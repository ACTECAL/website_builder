import React from 'react';

type Testimonial = {
  author: string;
  quote: string;
  role?: string;
  company?: string;
  rating?: number;
  avatar?: string;
};

type Props = {
  items: Testimonial[];
};

export const Testimonials: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-5 bg-white font-sans text-dark overflow-hidden">
      <div className="container py-lg-5">

        {/* Section Header */}
        <div className="text-center mb-5">
          <span className="badge bg-[#714B67] bg-opacity-10 text-[#714B67] px-3 py-2 rounded-pill fw-bold text-uppercase small mb-3 ls-wider">Testimonials</span>
          <h2 className="display-5 fw-bold mb-3">
            Trusted by businesses of all sizes
          </h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: 700 }}>
            From startups to enterprises, thousands of companies rely on Actyx to run their business.
          </p>
        </div>

        {/* Logos Strip */}
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-5 gap-md-5 mb-5 opacity-50 grayscale">
          {['Netflix', 'Spotify', 'Airbnb', 'Uber', 'Slack'].map((company, i) => (
            <div key={i} className="h4 fw-bold text-muted text-uppercase m-0" style={{ letterSpacing: '0.15em' }}>{company}</div>
          ))}
        </div>

        {/* Masonry Grid of Quotes */}
        <div className="row g-4 mt-4">
          {items.map((t, i) => (
            <div key={i} className="col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 hover-lift position-relative overflow-hidden bg-light-subtle">
                {/* Quote Icon Background */}
                <div className="position-absolute top-0 start-0 opacity-10 ms-3 mt-2">
                  <i className="fa-solid fa-quote-left display-1 text-secondary"></i>
                </div>

                <div className="card-body position-relative z-1 d-flex flex-column h-100">
                  {/* Stars */}
                  <div className="text-warning mb-3 small">
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                  </div>

                  <p className="mb-4 fs-5 text-dark lh-base fst-italic">
                    "{t.quote}"
                  </p>

                  <div className="mt-auto d-flex align-items-center gap-3 pt-3 border-top border-secondary-subtle">
                    <div
                      className="rounded-circle bg-white shadow-sm d-flex align-items-center justify-content-center fw-bold text-primary flex-shrink-0 border"
                      style={{ width: 48, height: 48, fontSize: '1.2rem', backgroundImage: t.avatar ? `url(${t.avatar})` : 'none', backgroundSize: 'cover' }}
                    >
                      {!t.avatar && t.author.charAt(0)}
                    </div>
                    <div className="lh-1">
                      <div className="fw-bold text-dark">{t.author}</div>
                      <div className="text-muted small mt-1">{t.role}, {t.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      <style>{`
        .ls-wider { letter-spacing: 0.1em; }
        .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 1rem 3rem rgba(0,0,0,.15)!important; }
        .grayscale { filter: grayscale(100%); opacity: 0.5; transition: all 0.5s; }
        .grayscale:hover { filter: grayscale(0%); opacity: 1; }
      `}</style>
    </section>
  );
};


