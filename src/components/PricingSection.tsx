import React, { useState } from 'react';
import { ArrowNote } from './Scribbles';
import { GothicH2, GothicH3, GothicH4 } from './GothicHeading';
import { DrippingText } from './DrippingText';

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
    <section style={{
      padding: '40px 24px',
      background: 'var(--surface)'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <GothicH2
            text="Simple Transparent Pricing"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              margin: '0 0 20px'
            }}
          />
          <DrippingText
            text="Choose the perfect plan for your team. All plans include a 14-day free trial."
            style={{
              fontSize: '1.2rem',
              maxWidth: 600,
              margin: '0 auto 20px',
              lineHeight: 1.6,
              color: '#4a5568'
            }}
          />

          {/* Billing toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{
              display: 'inline-flex',
              background: 'white',
              borderRadius: 999,
              padding: 4,
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              border: '1px solid rgba(0,0,0,0.06)'
            }}>
              <button onClick={() => setIsAnnual(false)} style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: 999,
                background: !isAnnual ? '#111827' : 'transparent',
                color: !isAnnual ? '#fff' : '#111827',
                cursor: 'pointer',
                fontWeight: 700
              }}>Monthly</button>
              <button onClick={() => setIsAnnual(true)} style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: 999,
                background: isAnnual ? '#111827' : 'transparent',
                color: isAnnual ? '#fff' : '#111827',
                cursor: 'pointer',
                fontWeight: 700
              }}>Annual</button>
            </div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 10px',
              background: 'rgba(255,107,0,0.12)',
              color: 'var(--color-primary)',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: '0.8rem'
            }}>Save 20%</span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20,
          alignItems: 'start'
        }}>
          {tiers.map((tier, idx) => {
            const baseMonthly = toNumber(tier.price);
            const monthlyDisplay = getMonthlyDisplay(baseMonthly, isAnnual);
            const yearlyDisplay = getYearlyTotal(baseMonthly);

            return (
              <div key={idx} style={{
                background: 'white',
                borderRadius: 20,
                padding: 24,
                boxShadow: '0 16px 50px rgba(0,0,0,0.08)',
                border: tier.popular ? '2px solid var(--color-primary)' : '1px solid rgba(0,0,0,0.06)',
                position: 'relative',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 22px 70px rgba(0,0,0,0.14)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 16px 50px rgba(0,0,0,0.08)';
              }}>

                {tier.popular && (
                  <div style={{
                    position: 'absolute',
                    top: -12,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--color-primary)',
                    color: 'white',
                    padding: '8px 24px',
                    borderRadius: 20,
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    Most Popular
                  </div>
                )}

                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <GothicH3
                    text={tier.name}
                    style={{
                      fontSize: '1.5rem',
                      margin: '0 0 12px'
                    }}
                  />

                  <div style={{ marginBottom: 8 }}>
                    <span style={{
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: 'var(--color-primary)'
                    }}>
                      <span className="wiggle">{monthlyDisplay}</span>
                    </span>
                    <span style={{
                      fontSize: '1.1rem',
                      color: '#4a5568',
                      marginLeft: 8
                    }}>
                      /month
                    </span>
                  </div>

                  {isAnnual && (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <ArrowNote text={`Save 20% → ${yearlyDisplay}/yr`} style={{ position: 'absolute', right: -20, top: -20 }} />
                    </div>
                  )}

                  <p style={{
                    color: '#4a5568',
                    lineHeight: 1.6,
                    margin: 12
                  }}>
                    {tier.description}
                  </p>
                </div>

                <ul style={{
                  margin: '0 0 32px',
                  paddingLeft: 0,
                  listStyle: 'none'
                }}>
                  {tier.features.map((feature, featureIdx) => (
                    <li key={featureIdx} style={{
                      marginBottom: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      color: '#4a5568'
                    }}>
                      <div style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <span style={{ color: 'white', fontSize: '0.8rem' }}>✓</span>
                      </div>
                      <span style={{ fontSize: '0.95rem' }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href={tier.href} style={{
                  display: 'block',
                  width: '100%',
                  padding: '16px 24px',
                  background: tier.popular ? 'var(--color-primary)' : 'transparent',
                  color: tier.popular ? 'white' : 'var(--color-primary)',
                  textDecoration: 'none',
                  borderRadius: 12,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: '2px solid var(--color-primary)',
                  transition: 'all 0.3s ease'
                }} onMouseEnter={(e) => {
                  if (!tier.popular) { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white'; }
                }} onMouseLeave={(e) => {
                  if (!tier.popular) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-primary)'; }
                }}>
                  {tier.cta}
                </a>
              </div>
            );
          })}
        </div>

        {/* FAQ section */}
        <div style={{
          marginTop: 40,
          textAlign: 'center'
        }}>
          <GothicH3
            text="Frequently Asked Questions"
            style={{
              fontSize: '1.5rem',
              margin: '0 0 16px'
            }}
          />
          <DrippingText
            text="Can't find what you're looking for? Contact our sales team"
            style={{
              margin: '0 0 32px',
              color: '#4a5568'
            }}
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
            maxWidth: 800,
            margin: '0 auto'
          }}>
            {[
              { q: 'Can I change plans anytime?', a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.' },
              { q: 'Is there a free trial?', a: 'All plans include a 14-day free trial with full access to all features.' },
              { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.' }
            ].map((faq, idx) => (
              <div key={idx} style={{
                background: 'white',
                padding: 24,
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                textAlign: 'left'
              }}>
                <GothicH4
                  text={faq.q}
                  style={{
                    fontSize: '1rem',
                    margin: '0 0 8px'
                  }}
                />
                <p style={{
                  fontSize: '0.9rem',
                  color: '#4a5568',
                  margin: 0,
                  lineHeight: 1.5
                }}>
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
