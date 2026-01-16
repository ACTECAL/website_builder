import React from 'react';
import { PricingSection } from '../components/PricingSection';
import '../styles/Pricing.css';

export const Pricing: React.FC = () => {
  const tiers = [
    {
      name: 'One App',
      subtitle: 'Free Forever',
      price: 'Free',
      period: 'forever',
      description: 'The perfect plan to get started.',
      features: [
        '1 App included',
        'Unlimited users',
        'Cloud hosting included',
        'Support included',
        'No credit card required'
      ],
      cta: 'Start Now',
      href: '/signup?plan=free',
      isFree: true
    },
    {
      name: 'Standard',
      subtitle: 'All Apps',
      price: '585',
      period: 'user/month',
      description: 'Best for growing businesses needing all apps.',
      features: [
        'All Applications',
        'Online Hosting',
        'Unlimited Support',
        'Mobile App Access',
        'Multi-company denied',
        'External API denied'
      ],
      cta: 'Start Free Trial',
      href: '/signup?plan=standard',
      popular: true,
      highlight: 'Best Value'
    },
    {
      name: 'Custom',
      subtitle: 'For Advanced Needs',
      price: '895',
      period: 'user/month',
      description: 'For companies with custom requirements.',
      features: [
        'All Applications',
        'Odoo Studio included',
        'Multi-Company',
        'External API',
        'On-premise / Odoo.sh',
        'Custom Development'
      ],
      cta: 'Contact Sales',
      href: '/contact-sales?plan=custom'
    }
  ];

  return (
    <div className="bg-light-subtle min-h-screen">
      <PricingSection tiers={tiers} />
    </div>
  );
};
