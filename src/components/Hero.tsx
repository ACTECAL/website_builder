import React, { useState, useEffect } from 'react';
import { NexoraLogoExact } from './NexoraLogo';
import { FloatingElement, FloatingElements } from './FloatingElements';
import { CreativeCard } from './CreativeCard';
import { AdvisorDropdown } from './AdvisorDropdown';
import '../styles/Hero.css';

type HeroData = {
  heading: string;
  subheading: string;
  cta: { label: string; href: string };
  stats?: { label: string; value: string }[];
  badges?: string[];
};

type Props = {
  data: HeroData | null;
};

export const Hero: React.FC<Props> = ({ data }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!data) return null;

  return (
    <FloatingElements>
      <section className="hero-section">

        {/* Animated background elements */}
        <div className="hero-bg-overlay" />

        <div className="hero-content">
          {/* Animated badges */}
          {data.badges && (
            <div className={`hero-badges ${isVisible ? 'revealed' : ''}`}>
              {data.badges.map((badge, idx) => (
                <FloatingElement
                  key={idx}
                  delay={idx * 0.2}
                  direction="up"
                  intensity="low"
                >
                  <span className="hero-badge">
                    {badge}
                  </span>
                </FloatingElement>
              ))}
            </div>
          )}

          {/* Animated logo */}
          <div className={`hero-logo-wrapper ${isVisible ? 'revealed' : ''}`}>
            <FloatingElement direction="up" intensity="low" duration={4}>
              <NexoraLogoExact className="hero-logo" />
            </FloatingElement>
          </div>

          {/* Animated heading */}
          <h1 className={`hero-heading ${isVisible ? 'revealed' : ''}`}>
            {data.heading}
          </h1>

          {/* Animated subheading */}
          <p className={`hero-subheading ${isVisible ? 'revealed' : ''}`}>
            {data.subheading}
          </p>

          {/* Animated divider */}
          <div className={`hero-divider ${isVisible ? 'revealed' : ''}`} />

          {/* Animated CTA buttons */}
          <div className={`hero-cta ${isVisible ? 'revealed' : ''}`}>
            <CreativeCard
              variant="glass"
              hoverEffect="glow"
              size="small"
              className="hero-cta-card"
            >
              <a href={data.cta.href} className="hero-btn">
                {data.cta.label}
              </a>
            </CreativeCard>

            <CreativeCard
              variant="glass"
              hoverEffect="lift"
              size="small"
              className="hero-cta-card secondary"
            >
              <AdvisorDropdown variant="on-card" />
            </CreativeCard>
          </div>

          {/* Animated statistics */}
          {data.stats && (
            <div className={`hero-stats ${isVisible ? 'revealed' : ''}`}>
              {data.stats.map((stat, idx) => (
                <FloatingElement
                  key={idx}
                  delay={idx * 0.2}
                  direction="up"
                  intensity="low"
                >
                  <CreativeCard
                    variant="glass"
                    hoverEffect="lift"
                    size="small"
                    className="stat-card"
                  >
                    <div className="stat-value">
                      {stat.value}
                    </div>
                    <div className="stat-label">
                      {stat.label}
                    </div>
                  </CreativeCard>
                </FloatingElement>
              ))}
            </div>
          )}
        </div>
      </section>
    </FloatingElements>
  );
};



