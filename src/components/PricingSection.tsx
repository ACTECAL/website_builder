import React, { useState } from 'react';
import ScribbleDecorations from './Scribbles';
import { GothicH2, GothicH3, GothicH4 } from './GothicHeading';
import { DrippingText } from './DrippingText';
import '../styles/PricingSection.css';

type PricingTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
  href: string;
};

type Props = {
  tiers: PricingTier[];
};

export const PricingSection: React.FC<Props> = ({ tiers }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const toNumber = (priceWithCurrency: string) => parseFloat(priceWithCurrency.replace(/[^0-9.]/g, '')) || 0;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

  const getMonthlyDisplay = (baseMonthly: number, annual: boolean) => {
    const monthly = annual ? baseMonthly * 0.8 : baseMonthly;
    return `${formatCurrency(monthly)}`;
  };

  const getYearlyTotal = (baseMonthly: number) => {
    const yearly = baseMonthly * 0.8 * 12;
    return `${formatCurrency(yearly)}`;
  };

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        <div className="pricing-header">
          <GothicH2
            text="Simple Transparent Pricing"
            className="pricing-title"
          />
          <DrippingText
            text="Choose the perfect plan for your team. All plans include a 14-day free trial."
            className="pricing-subtitle"
          />

          {/* Billing toggle */}
          <div className="billing-toggle-wrapper">
            <div className="billing-toggle">
              <button
                onClick={() => setIsAnnual(false)}
                className={`billing-btn ${!isAnnual ? 'active' : ''}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`billing-btn ${isAnnual ? 'active' : ''}`}
              >
                Annual
              </button>
            </div>
            <span className="save-badge">Save 20%</span>
          </div>
        </div>

        <div className="pricing-grid">
          {tiers.map((tier, idx) => {
            const baseMonthly = toNumber(tier.price);
            const monthlyDisplay = getMonthlyDisplay(baseMonthly, isAnnual);
            const yearlyDisplay = getYearlyTotal(baseMonthly);

            return (
              <div
                key={idx}
                className={`pricing-card ${tier.popular ? 'popular' : ''}`}
              >
                {tier.popular && (
                  <div className="popular-badge">
                    Most Popular
                  </div>
                )}

                <div className="card-header">
                  <GothicH3
                    text={tier.name}
                    className="card-title"
                  />

                  <div className="card-price-wrapper">
                    <span className="card-price">
                      <span className="wiggle">{monthlyDisplay}</span>
                    </span>
                    <span className="card-period">
                      /month
                    </span>
                  </div>

                  {isAnnual && (
                    <div className="save-badge-wrapper">
                      <ScribbleDecorations.Note text={`Save 20% → ${yearlyDisplay}/yr`} style={{ position: 'absolute', right: -20, top: -20 }} />
                    </div>
                  )}

                  <p className="card-description">
                    {tier.description}
                  </p>
                </div>

                <ul className="feature-list">
                  {tier.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="feature-item">
                      <div className="check-icon">
                        <span>✓</span>
                      </div>
                      <span className="feature-item-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.href}
                  className={`card-cta ${tier.popular ? 'primary' : ''}`}
                >
                  {tier.cta}
                </a>
              </div>
            );
          })}
        </div>

        {/* FAQ section */}
        <div className="faq-section">
          <GothicH3
            text="Frequently Asked Questions"
            className="faq-title"
          />
          <DrippingText
            text="Can't find what you're looking for? Contact our sales team"
            className="faq-subtitle"
          />

          <div className="faq-grid">
            {[
              { q: 'Can I change plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
              { q: 'Is there a free trial?', a: 'All plans include a 14-day free trial with full access to all features.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' }
            ].map((faq, idx) => (
              <div key={idx} className="faq-item">
                <GothicH4
                  text={faq.q}
                  className="faq-question"
                />
                <p className="faq-answer">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

