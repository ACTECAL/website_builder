import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { AppModuleMeta } from '../data/appModules';

interface AppTemplateProps {
  module: AppModuleMeta;
}

export const AppTemplate: React.FC<AppTemplateProps> = ({ module }) => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const backUrl = category ? `/apps?category=${category}` : '/apps';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [module.slug]);

  // Derive a primary color based on category for subtle accents
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      'Finance': '#017e84',
      'Sales': '#e85a4f',
      'Websites': '#4d6c8b',
      'Supply Chain': '#75628b',
      'Human Resources': '#65738f',
      'Marketing': '#eb6b45',
      'Services': '#e66244',
      'Productivity': '#8b566b',
    };
    return colors[cat] || '#6366f1';
  };

  const primaryColor = getCategoryColor(module.category);

  return (
    <main style={{
      background: '#fafafa',
      minHeight: '100vh',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#1f2937'
    }}>
      {/* Dynamic Header Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '600px',
        background: `linear-gradient(135deg, ${primaryColor}15 0%, rgba(255,255,255,0) 100%)`,
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '60px 24px 120px',
        position: 'relative',
        zIndex: 1,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>

        {/* Navigation */}
        <nav style={{ marginBottom: 40, display: 'flex', alignItems: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: '#6b7280',
              textDecoration: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              padding: '8px 16px',
              borderRadius: 999,
              background: '#fff',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = primaryColor;
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#6b7280';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
            }}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to Home
          </Link>
        </nav>

        {/* Hero Section */}
        <header style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 32,
          padding: '64px',
          display: 'grid',
          gap: 32,
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Glow */}
          <div style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            background: primaryColor,
            opacity: 0.1,
            filter: 'blur(100px)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '700px' }}>
              <div style={{
                display: 'inline-block',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: primaryColor,
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '6px 12px',
                background: `${primaryColor}15`,
                borderRadius: 999,
                marginBottom: 20
              }}>
                {module.category}
              </div>
              <h1 style={{
                margin: '0 0 20px',
                fontSize: 'clamp(3rem, 5vw, 4rem)',
                fontWeight: 800,
                color: '#111827',
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}>
                {module.name}
              </h1>
              <p style={{
                margin: 0,
                color: '#4b5563',
                fontSize: '1.25rem',
                lineHeight: 1.6,
                fontWeight: 400
              }}>
                {module.longDescription}
              </p>
            </div>
            <div>
              <a
                href={`mailto:hello@nexora.com?subject=${encodeURIComponent(`${module.name} demo request`)}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '16px 32px',
                  borderRadius: 999,
                  background: primaryColor,
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  boxShadow: `0 16px 32px ${primaryColor}40`,
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${primaryColor}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 16px 32px ${primaryColor}40`;
                }}
              >
                {module.ctaLabel ?? 'Book a live demo'} <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginTop: 16 }}>
            {module.metrics.map((metric) => (
              <div key={metric.label} style={{
                background: '#fff',
                borderRadius: 20,
                padding: '24px',
                border: '1px solid rgba(0,0,0,0.04)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)';
                }}
              >
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>{metric.label}</p>
                <p style={{ margin: '8px 0 0', fontSize: '1.8rem', fontWeight: 800, color: primaryColor }}>{metric.value}</p>
              </div>
            ))}
          </div>
        </header>

        {/* Content Section */}
        <section style={{ marginTop: 60, display: 'grid', gap: 40, gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)' }}>
          <div style={{ display: 'grid', gap: 40 }}>
            {/* Features Card */}
            <div style={{
              background: '#fff',
              borderRadius: 32,
              padding: '48px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.03)'
            }}>
              <h2 style={{ margin: '0 0 32px', fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
                Why teams choose {module.name}
              </h2>
              <div style={{ display: 'grid', gap: 24 }}>
                {module.highlights.map((highlight, index) => (
                  <div key={index} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                    <div style={{
                      minWidth: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `${primaryColor}15`,
                      color: primaryColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}>
                      <i className="fa-solid fa-check"></i>
                    </div>
                    <p style={{ margin: 0, color: '#4b5563', fontSize: '1.1rem', lineHeight: 1.6, paddingTop: 6 }}>{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Implementation Roadmap */}
            <div style={{
              background: '#fff',
              borderRadius: 32,
              padding: '48px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.03)'
            }}>
              <h2 style={{ margin: '0 0 32px', fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em' }}>
                Implementation Roadmap
              </h2>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 32, position: 'relative' }}>
                {/* Connecting Line */}
                <div style={{
                  position: 'absolute',
                  top: 20,
                  bottom: 20,
                  left: 23,
                  width: 2,
                  background: '#e5e7eb',
                  zIndex: 0
                }} />

                {[
                  'Kickoff discovery to map workflows and integrations.',
                  'Configure modules, import historical data, and QA automations.',
                  'Train administrators and power users; launch with guided checklists.',
                  'Review adoption metrics and optimize with quarterly business reviews.'
                ].map((step, index) => (
                  <li key={index} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
                    <span style={{
                      minWidth: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: '#fff',
                      border: `2px solid ${primaryColor}`,
                      color: primaryColor,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                    }}>
                      {index + 1}
                    </span>
                    <div style={{ paddingTop: 12 }}>
                      <p style={{ margin: 0, color: '#374151', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 500 }}>{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div style={{ display: 'grid', gap: 40, alignContent: 'start' }}>
            {/* Integrations Card */}
            <div style={{
              background: '#fff',
              borderRadius: 32,
              padding: '40px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.03)'
            }}>
              <h2 style={{ margin: '0 0 24px', fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>
                Works seamlessly with
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                {module.integrations.map((tool) => (
                  <span
                    key={tool}
                    style={{
                      padding: '10px 18px',
                      borderRadius: 12,
                      background: '#f3f4f6',
                      color: '#374151',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease',
                      border: '1px solid transparent',
                      cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f3f4f6';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Support/Contact Card */}
            <div style={{
              background: `linear-gradient(135deg, ${primaryColor} 0%, #111827 100%)`,
              borderRadius: 32,
              padding: '40px',
              boxShadow: `0 20px 40px ${primaryColor}30`,
              color: '#fff',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20%',
                right: '-20%',
                width: '60%',
                height: '60%',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                filter: 'blur(40px)'
              }} />
              <h2 style={{ margin: '0 0 16px', fontSize: '1.25rem', fontWeight: 800 }}>
                Need a custom workflow?
              </h2>
              <p style={{ margin: '0 0 24px', color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Our product architects can help design the perfect {module.name.toLowerCase()} implementation for your team's specific requirements.
              </p>
              <a
                href="mailto:hello@nexora.com?subject=Custom%20Nexora%20workflow"
                style={{
                  display: 'inline-block',
                  background: '#fff',
                  color: '#111827',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '12px 24px',
                  borderRadius: 999,
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                Talk to Sales
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
