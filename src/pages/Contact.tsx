import React, { useState } from 'react';
import SupportLayout from '../components/SupportLayout';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';

export const Contact: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  const validateEmail = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    const pattern = /^[^\s@]+@gmail\.com$/;
    return pattern.test(trimmed);
  };

  const handleSendMessage = () => {
    const emailInput = document.getElementById('contact-email-input') as HTMLInputElement | null;
    const emailValue = emailInput?.value ?? '';
    if (!validateEmail(emailValue)) {
      setIsError(true);
      setStatusMessage('Invalid email.');
      return;
    }

    setIsError(false);
    setStatusMessage('Thank you for your feedback.');
    window.location.href = `mailto:aarunim.nn.pant@gmail.com?subject=BizSuite%20Contact%20Request&body=${encodeURIComponent(`From: ${emailValue}`)}`;
  };

  return (
    <SupportLayout
      title="Contact"
      intro="Reach our customer success team, solution architects, or billing specialists. We respond to every request within one business day."
    >
      <div className="contact-grid">
        <form
          className="contact-form"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="form-field-group">
            <label className="form-field-label">Full name</label>
            <input placeholder="Your name" required className="contact-input" />
          </div>
          <div className="form-field-group">
            <label className="form-field-label">Work email</label>
            <input id="contact-email-input" placeholder="you@example.com" type="email" required className="contact-input" />
          </div>
          <div className="form-field-group">
            <label className="form-field-label">How can we help?</label>
            <textarea
              placeholder="Share a bit about your question or project"
              rows={6}
              className="contact-input contact-textarea"
            />
          </div>
          <div className="form-actions">
            <button
              type="button"
              onClick={handleSendMessage}
              className="btn-send"
            >
              Send message
            </button>
            <span className="follow-up-text">
              We’ll follow up within 24 hours.
            </span>
          </div>
          {statusMessage && (
            <p className={`status-message ${isError ? 'error' : 'success'}`}>
              {statusMessage}
            </p>
          )}
        </form>

        <div className="channels-column">
          <div className="contact-card">
            <div>
              <p className="card-header-label">
                Contact channels
              </p>
              <h3 className="card-title">We’d love to connect</h3>
            </div>
            <div className="channels-list">
              {[
                {
                  label: 'Email',
                  value: 'hello@bizsuite.app'
                },
                {
                  label: 'Phone',
                  value: '+1 (415) 555-2789'
                },
                {
                  label: 'HQ',
                  value: '123 Market Street, San Francisco, CA'
                }
              ].map((item) => (
                <div key={item.label} className="channel-item">
                  <span className="channel-label">
                    {item.label}
                  </span>
                  <strong className="channel-value">{item.value}</strong>
                </div>
              ))}
            </div>
            <div className="card-actions">
              <Link
                to="/status"
                className="btn-outline btn-outline-orange"
              >
                View system status
              </Link>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline btn-outline-green"
              >
                Book a demo
              </a>
            </div>
          </div>

          <div className="map-container">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=29.5892407,79.646666&t=k&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="320"
              className="map-iframe"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SupportLayout>
  );
};


