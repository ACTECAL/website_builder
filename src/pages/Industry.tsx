import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { industryCategories } from '../data/industries';
import { appModules } from '../data/appModules';
import '../styles/Industry.css';

export const Industry: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [slug]);

  const category = industryCategories.find(c => c.industries.some(i => i.slug === slug));
  const industry = category?.industries.find((i) => i.slug === slug);

  // Use the same category colors defined in IndustriesMegaMenu
  const categoryColorMap: Record<string, string> = {
    'Retail': '#017e84',
    'Food & Hospitality': '#4d6c8b',
    'Real Estate': '#e85a4f',
    'Consulting': '#75628b',
    'Manufacturing': '#65738f',
    'Health & Fitness': '#eb6b45',
    'Trades': '#e66244',
    'Others': '#8b566b'
  };

  const primaryColor = category ? (categoryColorMap[category.name] || '#6366f1') : '#6366f1';

  if (!industry) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center', background: '#fafafa', minHeight: '100vh' }}>
        <h2 style={{ fontSize: '2rem', color: '#111827' }}>Industry not found</h2>
        <p style={{ color: '#6b7280' }}>The industry profile you are looking for does not exist.</p>
        <Link to="/industries" className="btn btn-primary" style={{ marginTop: 24 }}>Browse All Industries</Link>
      </div>
    );
  }

  return (
    <main style={{ background: '#fafafa', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Hero Section */}
      <div style={{
        position: 'relative',
        padding: '120px 24px 80px',
        background: '#111827',
        color: '#fff',
        overflow: 'hidden'
      }}>
        {/* Dynamic Background Glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          background: `radial-gradient(circle, ${primaryColor}40 0%, transparent 70%)`,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          alignItems: 'center'
        }}>
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <nav style={{ marginBottom: 32 }}>
              <Link to="/industries" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}>
                <i className="fa-solid fa-arrow-left"></i> All Industries
              </Link>
            </nav>
            <div style={{
              display: 'inline-block',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: primaryColor,
              fontSize: '0.8rem',
              fontWeight: 700,
              padding: '6px 14px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 999,
              marginBottom: 24,
              border: `1px solid ${primaryColor}50`
            }}>
              {category?.name || 'Industry'}
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, margin: '0 0 24px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              {industry.name}
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, margin: '0 0 40px', maxWidth: 540 }}>
              {industry.longDescription}
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <Link to="/get-started" className="btn" style={{
                background: primaryColor,
                color: '#fff',
                border: 'none',
                padding: '16px 32px',
                fontSize: '1.1rem',
                borderRadius: 999,
                boxShadow: `0 10px 30px ${primaryColor}40`
              }}>
                Start free trial
              </Link>
              <a href="mailto:hello@nexora.com" className="btn" style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '16px 32px',
                fontSize: '1.1rem',
                borderRadius: 999
              }}>
                Contact sales
              </a>
            </div>
          </div>
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s'
          }}>
            <img
              src={industry.imageUrl}
              alt={industry.name}
              style={{
                width: '100%',
                borderRadius: 24,
                boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                objectFit: 'cover',
                aspectRatio: '4/3',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            />
          </div>
        </div>
      </div>

      <section className="industry-page-section" style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
      }}>
        <div className="industry-page-container">

          <div className="content-grid-split">
            {/* Features List */}
            <div className="glass-card">
              <h2 className="section-title">Essential Features for {industry.name}</h2>
              <ul className="premium-features-list">
                {industry.keyFeatures.map((feature, index) => (
                  <li key={index} className="premium-feature-item">
                    <div className="premium-feature-icon" style={{ background: `${primaryColor}15`, color: primaryColor }}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p className="premium-feature-text">{feature}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testimonial & Support */}
            <div className="side-column-stack">
              {industry.testimonial && industry.testimonial.quote && (
                <div className="premium-testimonial-card" style={{ borderTop: `4px solid ${primaryColor}` }}>
                  <div className="quote-mark" style={{ color: `${primaryColor}20` }}>"</div>
                  <p className="testimonial-quote-text">{industry.testimonial.quote}</p>
                  <div className="testimonial-author-block">
                    <div className="author-avatar" style={{ background: primaryColor }}>
                      {industry.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="author-name">{industry.testimonial.author}</p>
                      <p className="author-company">{industry.testimonial.company}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {industry.relatedApps && industry.relatedApps.length > 0 && (
            <div className="related-apps-section">
              <h2 className="section-title">Recommended Apps for {industry.name}</h2>
              <div className="premium-apps-grid">
                {industry.relatedApps.map((appSlug) => {
                  const app = appModules.find((a) => a.slug === appSlug);
                  if (!app) return null;
                  return (
                    <Link to={`/apps/${app.slug}`} key={app.slug} className="premium-app-card">
                      <div className="app-card-header">
                        <div className="app-icon-placeholder" style={{ background: `${primaryColor}15`, color: primaryColor }}>
                          <i className="fa-solid fa-cube"></i>
                        </div>
                        <h4 className="app-card-title">{app.name}</h4>
                      </div>
                      <p className="app-card-desc">{app.description}</p>
                      <span className="app-card-link" style={{ color: primaryColor }}>Learn more <i className="fa-solid fa-arrow-right"></i></span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="premium-cta-section" style={{ background: `linear-gradient(135deg, ${primaryColor} 0%, #111827 100%)` }}>
            <div className="cta-content">
              <h3 className="cta-title">Ready to transform your {industry.name} operations?</h3>
              <p className="cta-subtitle">Join thousands of companies using Nexora to streamline their entire business workflow securely inside one platform.</p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <Link to="/get-started" className="btn" style={{ background: '#fff', color: '#111827', borderRadius: 999, padding: '16px 36px', fontSize: '1.1rem', fontWeight: 600 }}>Start now</Link>
                <Link to="/pricing" className="btn" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 999, padding: '16px 36px', fontSize: '1.1rem', fontWeight: 600 }}>View pricing</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
