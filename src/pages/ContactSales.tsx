import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../styles/ContactSales.css';

const useQuery = () => new URLSearchParams(useLocation().search);

export const ContactSales: React.FC = () => {
  const q = useQuery();
  const plan = q.get('plan') || 'enterprise';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-sales-fullpage">
        <div className={`success-section-full ${isAnimating ? 'in' : ''}`}>
          <div className="success-container-full">
            <div className="success-content">
              <div className="success-icon">
                <span aria-hidden="true">✓</span>
              </div>
              <h1 className="success-title">Thanks! We'll be in touch</h1>
              <p className="success-subtitle">
                Our sales team will contact you shortly about the {plan} plan.
              </p>
              <div className="success-actions">
                <Link to="/" className="btn-primary-full">
                  Return home
                </Link>
                <Link to="/pricing" className="btn-secondary-full">
                  Back to Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-sales-fullpage">
      <div className={`contact-sales-shell ${isAnimating ? 'in' : ''}`}>
        <div className="contact-sales-grid">
          <div className="contact-sales-aside">
            <h1 className="contact-sales-title">Contact Sales</h1>
            <p className="contact-sales-lead">
              Tell us about your needs and we'll tailor the {plan} plan for you.
            </p>
            <div className="contact-sales-aside-card">
              <div className="contact-sales-aside-kicker">What happens next</div>
              <ul className="contact-sales-aside-list">
                <li>We review your request.</li>
                <li>We contact you within 24 hours.</li>
                <li>We recommend the best plan for your team.</li>
              </ul>
            </div>
          </div>

          <div className="contact-sales-form">
            <div className="form-container-full">
              <div className="form-header-full">
                <div className="form-title-full">Get in touch</div>
                <p className="form-description-full">
                  Fill out the form below and our team will get back to you.
                </p>
              </div>

              <form onSubmit={onSubmit} className="form-full-data-only">
                <div className="form-fields-full">
                  <div className="form-row">
                    <div className="field-group-full">
                      <label className="field-label-full">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        required
                        type="text"
                        className="field-input-full"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="field-group-full">
                      <label className="field-label-full">
                        Work Email <span className="required">*</span>
                      </label>
                      <input
                        required
                        type="email"
                        className="field-input-full"
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field-group-full">
                    <label className="field-label-full">
                      Your Message <span className="required">*</span>
                    </label>
                    <textarea
                      required
                      className="field-textarea-full"
                      placeholder="What challenges are you trying to solve?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                    />
                    <div className="character-count">{message.length} characters</div>
                  </div>
                </div>

                <div className="form-actions-full">
                  <button type="submit" className="btn-primary-full">
                    Send request
                  </button>
                  <Link to="/pricing" className="btn-secondary-full">
                    Back to Pricing
                  </Link>
                </div>

                <div className="form-footer">
                  <div className="security-badge">
                    <span>Secure & Encrypted</span>
                  </div>
                  <div className="response-time">
                    <span>Response within 24 hours</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
