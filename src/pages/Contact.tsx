import React, { useState } from 'react';
import SupportLayout from '../components/SupportLayout';
import { Link } from 'react-router-dom';
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

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 14,
    border: '1px solid rgba(249, 115, 22, 0.35)',
    background: '#ffffff',
    color: '#1f2937',
    fontSize: '0.95rem',
    outline: 'none',
    boxShadow: '0 12px 24px rgba(249, 115, 22, 0.08)'
  };

  const cardStyle: React.CSSProperties = {
    borderRadius: 26,
    border: '1px solid rgba(251, 146, 60, 0.3)',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 247, 237, 0.92) 100%)',
    padding: '20px 24px',
    display: 'grid',
    gap: 18,
    boxShadow: '0 28px 60px rgba(249, 115, 22, 0.14)'
  };

  return (
    <SupportLayout
      title="Contact"
      intro="Reach our customer success team, solution architects, or billing specialists. We respond to every request within one business day."
    >
      <div
        style={{
          display: 'grid',
          gap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'
        }}
      >
        <form
          style={{
            display: 'grid',
            gap: 20,
            borderRadius: 30,
            border: '1px solid rgba(251, 146, 60, 0.4)',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 244, 229, 0.92) 100%)',
            padding: '24px 28px',
            boxShadow: '0 40px 85px rgba(249, 115, 22, 0.18)'
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <div style={{ display: 'grid', gap: 10 }}>
            <label style={{ fontWeight: 600, color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Full name</label>
            <input placeholder="Your name" required style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <label style={{ fontWeight: 600, color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Work email</label>
            <input id="contact-email-input" placeholder="you@example.com" type="email" required style={inputStyle} />
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <label style={{ fontWeight: 600, color: '#f97316', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>How can we help?</label>
            <textarea
              placeholder="Share a bit about your question or project"
              rows={6}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleSendMessage}
              style={{
                border: 'none',
                borderRadius: 999,
                padding: '12px 28px',
                background: '#f97316',
                color: '#fff',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 18px 36px rgba(249, 115, 22, 0.28)'
              }}
            >
              Send message
            </button>
            <span style={{ fontSize: '0.85rem', color: '#6b7280' }}>
              We’ll follow up within 24 hours.
            </span>
          </div>
          {statusMessage && (
            <p
              style={{
                margin: '8px 0 0',
                fontSize: '0.85rem',
                color: isError ? '#dc2626' : '#16a34a'
              }}
            >
              {statusMessage}
            </p>
          )}
        </form>

        <div style={{ display: 'grid', gap: 20 }}>
          <div style={cardStyle}>
            <div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                Contact channels
              </p>
              <h3 style={{ margin: '6px 0 0', fontSize: '1.25rem', color: '#1f2937' }}>We’d love to connect</h3>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
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
                <div key={item.label} style={{ display: 'grid', gap: 4 }}>
                  <span style={{ fontSize: '0.8rem', color: '#f97316', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {item.label}
                  </span>
                  <strong style={{ color: '#1f2937', fontSize: '1.05rem' }}>{item.value}</strong>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                to="/status"
                style={{
                  borderRadius: 999,
                  padding: '10px 20px',
                  border: '1px solid rgba(249, 115, 22, 0.45)',
                  color: '#f97316',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                View system status
              </Link>
              <a
                href="https://cal.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderRadius: 999,
                  padding: '10px 20px',
                  border: '1px solid rgba(34, 197, 94, 0.35)',
                  color: '#16a34a',
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Book a demo
              </a>
            </div>
          </div>

          <div
            style={{
              borderRadius: 26,
              overflow: 'hidden',
              border: '1px solid rgba(251, 146, 60, 0.25)',
              background: '#fff',
              boxShadow: '0 24px 50px rgba(249, 115, 22, 0.12)'
            }}
          >
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=29.5892407,79.646666&t=k&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="320"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </SupportLayout>
  );
};


