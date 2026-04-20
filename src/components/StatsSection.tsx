import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GothicH2 } from './GothicHeading';
import { DrippingText } from './DrippingText';
import '../styles/StatsSection.css';

type Stat = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode;
  color?: string;
};

type Props = {
  stats: Stat[];
  title?: string;
  subtitle?: string;
};

export const StatsSection: React.FC<Props> = React.memo(({
  stats,
  title = "our impact in numbers",
  subtitle = "measured by the success of our global partners"
}) => {
  const [animatedStats, setAnimatedStats] = useState<Stat[]>(stats.map(s => ({ ...s, value: 0 })));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  const animateCounters = useCallback(() => {
    const duration = 2500; // 2.5s for more perceived "Elite" weight
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function: Cubic Out for a smooth finish
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      setAnimatedStats(stats.map(stat => ({
        ...stat,
        value: Math.floor(stat.value * easedProgress)
      })));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(update);
      } else {
        setAnimatedStats(stats);
      }
    };

    rafRef.current = requestAnimationFrame(update);
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [hasAnimated, animateCounters]);

  return (
    <section ref={sectionRef} className="stats-section">
      {/* Elite++ Aurora System */}
      <div className="stats-aurora-glow stats-aurora-purple"></div>
      <div className="stats-aurora-glow stats-aurora-cyan"></div>
      <div className="stats-aurora-glow stats-aurora-indigo"></div>
      
      <div className="stats-content-wrapper">
        <div className="stats-header">
          <GothicH2 text={title} className="stats-title" />
          <DrippingText text={subtitle} className="stats-subtitle" />
        </div>

        <div className="stats-grid">
          {animatedStats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-card-inner">
                {stat.icon && (
                  <div className="stat-icon-aura">
                    <div className="icon-glow" style={{ '--stat-color': stat.color || 'var(--aura-primary)' } as React.CSSProperties}></div>
                    <div className="stat-icon-symbol">{stat.icon}</div>
                  </div>
                )}

                <div className="stat-number-wrapper">
                  <span className="stat-number-text" style={{ '--stat-color': stat.color || 'white' } as React.CSSProperties}>
                    {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
                  </span>
                </div>

                <div className="stat-label-box">
                  <div className="stat-label-separator"></div>
                  <span className="stat-label-name">{stat.label}</span>
                </div>
              </div>
              
              {/* Card visual depth */}
              <div className="stat-card-border-glow"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default StatsSection;
