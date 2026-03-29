import React from 'react';
import { GothicH2 } from './GothicHeading';
import { DrippingText } from './DrippingText';
import './Testimonials.css';

type Testimonial = { 
  author: string; 
  quote: string;
  role?: string;
  company?: string;
  rating?: number;
  avatar?: string;
  logo?: string;
};

type Props = {
  items: Testimonial[];
};

export const Testimonials: React.FC<Props> = ({ items }) => {
  if (!items || items.length === 0) return null;
  
  return (
    <section className="testimonials-section">
      <div className="testimonials-aurora" />
      
      <div className="testimonials-container">
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <GothicH2 
            text="Loved by Modern Teams"
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              margin: '0 0 24px',
              fontWeight: 900,
              color: 'var(--color-text)'
            }}
          />
          <DrippingText 
            text="Global leaders trust Nexora to power their next billion-dollar operations."
            style={{ 
              fontSize: '1.25rem', 
              maxWidth: 720,
              margin: '0 auto',
              lineHeight: 1.7,
              color: 'var(--color-muted)'
            }}
          />
        </div>

        <div className="testimonials-grid">
          {items.map((t, idx) => (
            <blockquote key={idx} className="testimonial-card">
              {t.rating && (
                <div style={{
                  display: 'flex',
                  gap: 4,
                  marginBottom: 20,
                  justifyContent: 'flex-end'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{
                      color: i < t.rating! ? '#ffd700' : 'rgba(0,0,0,0.1)',
                      fontSize: '1.2rem'
                    }}>
                      ★
                    </span>
                  ))}
                </div>
              )}

              <p className="testimonial-quote">
                {t.quote}
              </p>
              
              <footer className="testimonial-footer">
                <div className="testimonial-avatar">
                  {t.avatar ? <img src={t.avatar} alt={t.author} /> : t.author.charAt(0).toUpperCase()}
                </div>
                
                <div className="testimonial-info">
                  <h4>{t.author}</h4>
                  <p>{t.role} @ {t.company}</p>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};


