import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import '../styles/Pricing.css';

type PricingTier = {
  name: string;
  subtitle?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
  highlight?: string;
  isFree?: boolean;
};

type Props = {
  tiers: PricingTier[];
};

export const PricingSection: React.FC<Props> = ({ tiers }) => {
  const [isAnnual, setIsAnnual] = useState(true);

  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const container = document.querySelector('.pricing-particles');
      if (!container) return;

      // Clear existing particles
      container.innerHTML = '';

      // Create new particles
      for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'pricing-particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        container.appendChild(particle);
      }
    };

    createParticles();
  }, []);

  return (
    <section className="pricing-page">
      <div className="pricing-particles"></div>
      
      <div className="pricing-header">
        <div className="pricing-header-inner">
          <h1 className="pricing-title">Pricing</h1>
          <p className="pricing-subtitle">Open Source. No credit card required. Instant access.</p>
          <div className="pricing-toggle">
            <button
              className={`pricing-toggle-btn ${!isAnnual ? 'active' : ''}`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`pricing-toggle-btn ${isAnnual ? 'active' : ''}`}
              onClick={() => setIsAnnual(true)}
            >
              Yearly <span className="pricing-toggle-discount">-20%</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pricing-grid">
        {tiers.map((tier, idx) => (
          <div key={idx} className={`pricing-card ${tier.popular ? 'popular' : ''}`}>
            {tier.highlight && (
              <div className="pricing-badge">{tier.highlight}</div>
            )}
            <div className="pricing-card-body">
              <div>
                <h3 className="pricing-name">{tier.name}</h3>
                {tier.subtitle && (
                  <p className="pricing-subtitle">{tier.subtitle}</p>
                )}
                <div className="pricing-price-row">
                  <span className="pricing-price">
                    {isAnnual && !tier.isFree && tier.price !== 'Free' ? (parseFloat(tier.price.replace(/[^\d.]/g, '')) * 0.8).toFixed(0) : tier.price}
                  </span>
                  {tier.price !== 'Free' && (
                    <span className="pricing-period">/{tier.period}</span>
                  )}
                </div>
                {isAnnual && !tier.isFree && tier.price !== 'Free' && (
                  <p className="pricing-billed">billed annually</p>
                )}
              </div>

              <ul className="pricing-features">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="pricing-feature">
                    <Check size={20} className="pricing-feature-icon" />
                    <span className="pricing-feature-text">{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href={tier.href}
                className="pricing-cta"
              >
                {tier.cta}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="pricing-trust">
        <p className="pricing-trust-text">Trusted by <strong>7 million</strong> users worldwide</p>
        <div className="pricing-logos">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="pricing-logo-placeholder"></div>
          ))}
        </div>
      </div>
    </section>
  );
};
