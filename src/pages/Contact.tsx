import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SupportLayout from '../components/SupportLayout';

export const Contact: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const validateEmail = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(trimmed);
  };

  const handleSendMessage = () => {
    const emailInput = document.getElementById('contact-email-input') as HTMLInputElement | null;
    const emailValue = emailInput?.value ?? '';
    if (!validateEmail(emailValue)) {
      setIsError(true);
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    setIsError(false);
    setStatusMessage('Thank you for your feedback. We will contact you soon.');
  };

  return (
    <SupportLayout
      title="Contact Us"
      intro="Reach our customer success team, solution architects, or billing specialists. We respond to every request within one business day."
    >
      <div className="row g-5">
        {/* Contact Form */}
        <div className="col-lg-7">
          <form className="p-5 bg-white rounded-4 shadow-sm border" onSubmit={(e) => e.preventDefault()}>
            <h1 className="fw-bold display-5 mb-4">Contact Actyx Support</h1>
            <p className="lead text-muted mb-5">We'd love to hear from you. Please fill out this form or shoot us an email.</p>

            <div className="floating-label mb-3">
              <input
                id="contact-name"
                placeholder=" "
                required
                className="form-control form-control-lg bg-light border-0"
              />
              <label htmlFor="contact-name" className="form-label fw-bold small text-secondary text-uppercase">Full name</label>
            </div>

            <div className="floating-label mb-3">
              <input
                id="contact-email-input"
                placeholder=" "
                type="email"
                required
                className="form-control form-control-lg bg-light border-0"
              />
              <label htmlFor="contact-email-input" className="form-label fw-bold small text-secondary text-uppercase">Work email</label>
            </div>

            <div className="floating-label mb-4">
              <textarea
                id="contact-message"
                placeholder=" "
                rows={5}
                className="form-control form-control-lg bg-light border-0"
              />
              <label htmlFor="contact-message" className="form-label fw-bold small text-secondary text-uppercase">How can we help?</label>
            </div>

            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                onClick={handleSendMessage}
                className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm"
              >
                Send Message
              </button>
              <span className="text-muted small">
                Response within 24 hours.
              </span>
            </div>

            {statusMessage && (
              <div className={`mt-3 alert ${isError ? 'alert-danger' : 'alert-success'} py-2 small rounded-3`}>
                <i className={`fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-check-circle'} me-2`}></i>
                {statusMessage}
              </div>
            )}
          </form>
        </div>

        {/* Info & Map */}
        <div className="col-lg-5">
          <div className="d-flex flex-column gap-4">
            <div className="p-4 bg-light rounded-4 shadow-sm border">
              <h4 className="fw-bold mb-4 text-dark">Get in touch</h4>

              <div className="mb-4">
                <span className="d-block small text-muted fw-bold text-uppercase mb-1">Email</span>
                <span className="fs-5 fw-bold text-dark">hello@actyx.com</span>
              </div>

              <div className="mb-4">
                <span className="d-block small text-muted fw-bold text-uppercase mb-1">Phone</span>
                <span className="fs-5 fw-bold text-dark">+1 (555) 000-0000</span>
              </div>

              <div className="mb-4">
                <span className="d-block small text-muted fw-bold text-uppercase mb-1">HQ</span>
                <span className="fs-5 fw-bold text-dark">San Francisco, CA</span>
              </div>

              <div className="d-flex gap-2">
                <Link to="/status" className="btn btn-outline-secondary btn-sm rounded-pill fw-bold bg-white">System Status</Link>
                <Link to="/contact-sales" className="btn btn-outline-success btn-sm rounded-pill fw-bold bg-white">Book a Demo</Link>
              </div>
            </div>

            <div className="rounded-4 overflow-hidden shadow-sm border h-100 min-vh-25">
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=San+Francisco&t=m&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="300"
                style={{ border: 0, display: 'block' }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .shadow-sm-hover:focus { box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075); background-color: #fff; }
        .form-control:focus { border: 1px solid var(--o-color-primary) !important; box-shadow: 0 0 0 4px rgba(113, 75, 103, 0.1); }
      `}</style>
    </SupportLayout>
  );
};


