import React from 'react';
import { GothicH2 } from './GothicHeading';
import { DrippingText } from './DrippingText';

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
    <section style={{ 
      padding: '80px 24px', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M50 50c0-27.614 22.386-50 50-50v100c-27.614 0-50-22.386-50-50z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3
      }} />
      
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <GothicH2 
            text="Loved by Modern Teams"
            style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              margin: '0 0 20px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: '#FFFFFF'
            }}
          />
          <DrippingText 
            text="See what our customers have to say about their experience with BizSuite"
            style={{ 
              fontSize: '1.2rem', 
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)'
            }}
          />
        </div>

        {/* Company logos */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 40,
          marginBottom: 60,
          flexWrap: 'wrap',
          opacity: 0.7
        }}>
          {['Netflix', 'Spotify', 'Airbnb', 'Uber', 'Slack', 'Zoom'].map((company) => (
            <div key={company} style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '12px 24px',
              borderRadius: 8,
              fontSize: '0.9rem',
              fontWeight: 600,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {company}
            </div>
          ))}
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: 30 
        }}>
          {items.map((t, idx) => (
            <blockquote key={idx} style={{ 
              margin: 0, 
              padding: 32, 
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 20, 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              position: 'relative',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.02) rotateX(4deg) rotateY(-2deg)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.3), 0 0 40px rgba(102, 126, 234, 0.4)';
              e.currentTarget.style.borderColor = 'transparent';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}>
              
              {/* Quote mark */}
              <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                fontSize: '3rem',
                opacity: 0.3,
                lineHeight: 1
              }}>
                "
              </div>

              {/* Rating */}
              {t.rating && (
                <div style={{
                  display: 'flex',
                  gap: 4,
                  marginBottom: 16,
                  justifyContent: 'flex-end'
                }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{
                      color: i < t.rating! ? '#ffd700' : 'rgba(255,255,255,0.3)',
                      fontSize: '1.2rem'
                    }}>
                      ★
                    </span>
                  ))}
                </div>
              )}

              <p style={{ 
                margin: '0 0 24px', 
                color: 'rgba(255,255,255,0.95)',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              
              <footer style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 16
              }}>
                {/* Avatar */}
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: t.avatar ? `url(${t.avatar})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  {!t.avatar && t.author.charAt(0).toUpperCase()}
                </div>
                
                <div>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    marginBottom: 4
                  }}>
                    {t.author}
                  </div>
                  {t.role && (
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.8)',
                      marginBottom: 2
                    }}>
                      {t.role}
                    </div>
                  )}
                  {t.company && (
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 600
                    }}>
                      {t.company}
                    </div>
                  )}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Stats section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40,
          marginTop: 80,
          padding: '40px 0',
          borderTop: '1px solid rgba(255,255,255,0.2)'
        }}>
          {[
            { value: '10,000+', label: 'Active Users' },
            { value: '99.9%', label: 'Uptime' },
            { value: '4.9/5', label: 'Customer Rating' },
            { value: '24/7', label: 'Support' }
          ].map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                marginBottom: 8,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'rgba(255,255,255,0.8)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


