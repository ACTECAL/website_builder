import React from 'react';
import '../styles/FloatingCTA.css';

interface FloatingCTAProps {
  title: string;
  subtitle?: string;
  ctaText: string;
  href: string;
  secondaryCta?: { text: string; href: string };
  eyebrow?: string;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({
  title,
  subtitle,
  ctaText,
  href,
  secondaryCta,
  eyebrow = 'Ready to transform your business?',
}) => {
  return (
    <section className="floating-cta-section">
      <div className="floating-cta-wrapper">
        <div className="floating-cta-card">
          <div className="cta-eyebrow-label">
            <i className="fa-solid fa-bolt" />
            {eyebrow}
          </div>
          <h2 className="cta-title-main">{title}</h2>
          {subtitle && <p className="cta-subtitle-main">{subtitle}</p>}
          <div className="cta-btn-group">
            <a href={href} className="cta-primary-btn">
              {ctaText}
              <i className="fa-solid fa-arrow-right" />
            </a>
            {secondaryCta && (
              <a href={secondaryCta.href} className="cta-secondary-btn">
                {secondaryCta.text}
                <i className="fa-solid fa-compass" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FloatingCTA;
