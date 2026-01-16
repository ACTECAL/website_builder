import React from 'react';
import '../styles/odoo-theme.css';

export const Features: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-dark">
      {/* Hero Section */}
      <div className="position-relative py-5 overflow-hidden bg-light-subtle">
        <div className="container py-5 text-center position-relative z-10">
          <h1 className="display-3 fw-bold mb-4 tracking-tight text-dark">
            Unleash your
            <span className="text-primary d-block mt-2">Growth Potential</span>
          </h1>
          <p className="lead text-muted max-w-2xl mx-auto mb-5 leading-relaxed">
            No more painful integrations. One app for every need.
            <br />
            They all work together. Perfectly.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="/get-started" className="btn btn-primary btn-lg px-5 py-3 fw-bold shadow-lg hvr-grow">
              Start Now - It's Free
            </a>
            <a href="/pricing" className="btn btn-outline-secondary btn-lg px-5 py-3 fw-bold">
              View Pricing
            </a>
          </div>
        </div>

        {/* Abstract bg elements */}
        <div className="position-absolute top-0 start-0 w-64 h-64 bg-primary opacity-10 rounded-circle blur-3xl translate-middle"></div>
        <div className="position-absolute bottom-0 end-0 w-96 h-96 bg-success opacity-10 rounded-circle blur-3xl translate-middle-x"></div>
      </div>

      {/* Bento Grid Features */}
      <div className="container py-5 my-5">
        <div className="row g-4">

          {/* Large Card 1 - Finance */}
          <div className="col-md-8">
            <div className="h-100 bg-primary text-white rounded-4 p-5 position-relative overflow-hidden group hover-scale transition">
              <div className="position-relative z-10" style={{ maxWidth: '450px' }}>
                <h3 className="h2 fw-bold mb-3">Finance Done Right</h3>
                <p className="lead opacity-75 mb-4">Automate invoicing, expense tracking, and accounting. Get real-time financial reports without the headache.</p>
                <span className="badge bg-white bg-opacity-25 backdrop-blur rounded-pill fs-6 px-3 py-2 fw-normal">Accounting • Invoicing • Expenses</span>
              </div>
              <div className="position-absolute end-0 bottom-0 w-50 h-100 opacity-25 bg-gradient-to-l from-black-50 to-transparent"></div>
              <i className="fa-solid fa-coins position-absolute bottom-0 end-0 text-white opacity-10" style={{ fontSize: '150px', transform: 'translate(20%, 20%) rotate(12deg)' }}></i>
            </div>
          </div>

          {/* Tall Card - CRM */}
          <div className="col-md-4">
            <div className="h-100 bg-white border shadow-sm rounded-4 p-4 d-flex flex-column justify-content-between hover-shadow transition">
              <div>
                <div className="icon-box bg-success bg-opacity-10 text-success rounded-3 d-flex align-items-center justify-content-center mb-4" style={{ width: 48, height: 48 }}>
                  <i className="fa-solid fa-users fs-4"></i>
                </div>
                <h3 className="h4 fw-bold mb-2">CRM & Sales</h3>
                <p className="text-muted small">Track leads, close opportunities, and get accurate forecasts.</p>
              </div>
              <div className="mt-4 position-relative bg-light rounded-3 overflow-hidden border border-light" style={{ height: 120 }}>
                <div className="position-absolute bottom-0 w-100 d-flex align-items-end justify-content-around px-2 pb-1 h-100">
                  <div className="bg-success rounded-top" style={{ width: '15%', height: '30%' }}></div>
                  <div className="bg-success rounded-top" style={{ width: '15%', height: '50%' }}></div>
                  <div className="bg-success rounded-top" style={{ width: '15%', height: '70%' }}></div>
                  <div className="bg-success rounded-top" style={{ width: '15%', height: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card - Website */}
          <div className="col-md-4">
            <div className="h-100 bg-white border shadow-sm rounded-4 p-4 hover-shadow transition">
              <div className="icon-box bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center mb-4" style={{ width: 48, height: 48 }}>
                <i className="fa-solid fa-globe fs-4"></i>
              </div>
              <h3 className="h4 fw-bold mb-2">Website Builder</h3>
              <p className="text-muted small mb-3">Drag & drop your way to a stunning website.</p>
              <ul className="list-unstyled small text-muted d-flex flex-column gap-2 mb-0">
                <li><i className="fa-solid fa-check text-success me-2"></i> eCommerce included</li>
                <li><i className="fa-solid fa-check text-success me-2"></i> SEO optimized</li>
                <li><i className="fa-solid fa-check text-success me-2"></i> Mobile responsive</li>
              </ul>
            </div>
          </div>

          {/* Wide Card - Operations */}
          <div className="col-md-8">
            <div className="h-100 bg-dark text-white rounded-4 p-5 position-relative overflow-hidden group hover-scale transition">
              <div className="position-relative z-10 d-flex flex-column flex-md-row align-items-center gap-4">
                <div className="flex-grow-1">
                  <h3 className="h2 fw-bold mb-3">Operations Hub</h3>
                  <p className="lead opacity-75 mb-4">Inventory, Manufacturing, Purchase, and more. All integrated in real-time.</p>
                  <a href="/apps" className="btn btn-outline-light rounded-pill px-4 fw-bold">Explore Apps</a>
                </div>
                <div className="flex-shrink-0 bg-white bg-opacity-10 rounded-4 p-4 d-flex align-items-center justify-content-center" style={{ width: 120, height: 120 }}>
                  <i className="fa-solid fa-gears fs-1 opacity-75 fa-spin-pulse" style={{ '--fa-animation-duration': '3s' } as React.CSSProperties}></i>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Testimonial Strip */}
      <div className="bg-secondary text-white py-5">
        <div className="container text-center py-4">
          <i className="fa-solid fa-quote-left display-4 opacity-25 mb-4"></i>
          <h2 className="display-6 fw-bold mb-4">
            "It completely transformed how we work. We replaced 7 different apps with just Actyx."
          </h2>
          <div className="d-flex align-items-center justify-content-center gap-3">
            <div className="rounded-circle bg-white" style={{ width: 48, height: 48 }}></div>
            <div className="text-start">
              <div className="fw-bold">Sarah Jenkins</div>
              <div className="small opacity-75">CEO, TechFlow Inc.</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .blur-3xl { filter: blur(64px); }
        .hover-scale:hover { transform: scale(1.01); }
        .hover-shadow:hover { box-shadow: 0 1rem 3rem rgba(0,0,0,.175)!important; }
        .transition { transition: all 0.3s ease; }
      `}</style>
    </div>
  );
};
