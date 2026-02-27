import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GothicH2 } from './GothicHeading';
import { DrippingText } from './DrippingText';

type Stat = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: string;
  color?: string;
};

type Props = {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  background?: string;
};

export const StatsSection: React.FC<Props> = ({
  stats,
  title = "our impact in numbers",
  subtitle = "see how we're helping teams around the world succeed",
  background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
}) => {
  const [animatedStats, setAnimatedStats] = useState<Stat[]>(stats.map(s => ({ ...s, value: 0 })));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const animateCounters = useCallback(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats(stats.map(stat => ({
        ...stat,
        value: Math.floor(stat.value * progress)
      })));

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(stats);
      }
    }, stepDuration);
  }, [stats]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounters();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, animateCounters]);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '80px 24px',
        background,
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width=\'120\' height=\'120\' viewBox=\'0 0 120 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M60 60c0-33.137 26.863-60 60-60v120c-33.137 0-60-26.863-60-60z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <GothicH2
            text={title}
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              margin: '0 0 20px',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              color: '#FFFFFF'
            }}
          />
          <DrippingText
            text={subtitle}
            style={{
              fontSize: '1.2rem',
              maxWidth: 600,
              margin: '0 auto',
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.9)'
            }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 40
        }}>
          {animatedStats.map((stat, idx) => (
            <div key={idx} style={{
              textAlign: 'center',
              padding: '32px 24px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 20,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              transition: 'all 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
            }}>

              {stat.icon && (
                <div style={{
                  fontSize: '3rem',
                  marginBottom: 20,
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  {stat.icon}
                </div>
              )}

              <div style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 800,
                marginBottom: 12,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                color: stat.color || 'white'
              }}>
                {stat.prefix || ''}{stat.value.toLocaleString()}{stat.suffix || ''}
              </div>

              <div style={{
                fontSize: '1.1rem',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 600,
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

export default StatsSection;
