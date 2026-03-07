import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GothicH2 } from './GothicHeading';
import { DrippingText } from './DrippingText';
import '../styles/StatsSection.css';

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
      className="stats-section"
      style={{ background }}
    >
      {/* Background decoration */}
      <div className="stats-bg-decoration" />

      <div className="stats-content-wrapper">
        <div className="stats-header">
          <GothicH2
            text={title}
            className="stats-title"
          />
          <DrippingText
            text={subtitle}
            className="stats-subtitle"
          />
        </div>

        <div className="stats-grid">
          {animatedStats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              {stat.icon && (
                <div className="stat-icon-wrapper">
                  {stat.icon}
                </div>
              )}

              <div
                className="stat-number"
                style={{ color: stat.color || 'white' }}
              >
                {stat.prefix || ''}{stat.value.toLocaleString()}{stat.suffix || ''}
              </div>

              <div className="stat-label-text">
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
