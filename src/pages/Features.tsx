import React from 'react';
import { PageHero } from '../components/PageHero';
import '../styles/Features.css';

const FEATURES = [
  {
    num: '01',
    icon: 'fa-solid fa-layer-group',
    title: 'Modular Apps – Start Small, Scale Confidently',
    benefit: 'Flexibility without the overwhelm',
    bullets: [
      'Start with one app and expand when ready',
      'Choose from CRM, Finance, HR, or Operations',
      'Add modules without messy migrations',
    ],
    accent: 'linear-gradient(90deg, #6366f1, #a855f7)',
    iconBg: '#ede9fe',
    iconColor: '#6366f1',
  },
  {
    num: '02',
    icon: 'fa-solid fa-handshake',
    title: 'Unified CRM – Build Stronger Relationships',
    benefit: 'No lost emails, no missed opportunities',
    bullets: [
      'Centralized customer database',
      'Automated reminders and follow-ups',
      'Integrated sales pipeline tracking',
    ],
    accent: 'linear-gradient(90deg, #0ea5e9, #22d3ee)',
    iconBg: '#e0f2fe',
    iconColor: '#0ea5e9',
  },
  {
    num: '03',
    icon: 'fa-solid fa-coins',
    title: 'Finance & Accounting – Simplified Money Management',
    benefit: 'Spend less time crunching numbers',
    bullets: [
      'Smart invoicing and recurring billing',
      'Expense tracking and approvals',
      'Real-time financial dashboards',
    ],
    accent: 'linear-gradient(90deg, #10b981, #34d399)',
    iconBg: '#dcfce7',
    iconColor: '#10b981',
  },
  {
    num: '04',
    icon: 'fa-solid fa-gears',
    title: 'Operations Hub – Streamline How Work Gets Done',
    benefit: "Everyone knows who's responsible and when",
    bullets: [
      'Task and project management',
      'Workflow automation',
      'Cross-team visibility',
    ],
    accent: 'linear-gradient(90deg, #f97316, #fb923c)',
    iconBg: '#ffedd5',
    iconColor: '#f97316',
  },
  {
    num: '05',
    icon: 'fa-solid fa-users',
    title: 'Human Resources – Put People First',
    benefit: 'A workplace where people feel supported',
    bullets: [
      'Employee onboarding and digital records',
      'Leave management and payroll integration',
      'Performance tracking',
    ],
    accent: 'linear-gradient(90deg, #ec4899, #f472b6)',
    iconBg: '#fce7f3',
    iconColor: '#ec4899',
  },
  {
    num: '06',
    icon: 'fa-solid fa-plug',
    title: 'Open Integrations – Connect Everything You Use',
    benefit: 'No data silos. Everything works together',
    bullets: [
      'API-first and ecosystem-friendly',
      'Sync data across your existing stack',
      'Extend with custom integrations',
    ],
    accent: 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
    iconBg: '#ede9fe',
    iconColor: '#8b5cf6',
  },
  {
    num: '07',
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'Delightful Design – Tools Your Team Actually Loves',
    benefit: 'When software feels good, adoption soars',
    bullets: [
      'Clean, modern interface',
      'Mobile-friendly for work on the go',
      'Designed for speed and simplicity',
    ],
    accent: 'linear-gradient(90deg, #14b8a6, #2dd4bf)',
    iconBg: '#ccfbf1',
    iconColor: '#14b8a6',
  },
  {
    num: '08',
    icon: 'fa-solid fa-shield-halved',
    title: 'Enterprise-Grade Security – Built on Trust',
    benefit: 'Peace of mind knowing your business is safe',
    bullets: [
      'Bank-level encryption',
      'Role-based access control',
      'Regular security audits',
    ],
    accent: 'linear-gradient(90deg, #64748b, #94a3b8)',
    iconBg: '#f1f5f9',
    iconColor: '#64748b',
  },
  {
    num: '09',
    icon: 'fa-solid fa-brain',
    title: 'AI-Powered Insights – Smarter Decisions, Faster',
    benefit: 'Make better decisions backed by real-time intelligence',
    bullets: [
      'Predictive analytics for sales and finance',
      'Automated workflow suggestions',
      'Smart recommendations for efficiency',
    ],
    accent: 'linear-gradient(90deg, #6366f1, #ec4899)',
    iconBg: '#f5f3ff',
    iconColor: '#6366f1',
  },
  {
    num: '10',
    icon: 'fa-solid fa-circle-nodes',
    title: 'One System, Endless Possibilities',
    benefit: 'Finally—business software on your side',
    bullets: [
      'One login, one platform, one experience',
      'No jumping between tabs',
      'A coherent system for the entire company',
    ],
    accent: 'linear-gradient(90deg, #0f172a, #334155)',
    iconBg: '#f8fafc',
    iconColor: '#334155',
  },
];

const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop',
];

export const Features: React.FC = () => {
  return (
    <main className="features-page">
      <PageHero
        title="Nexora Features"
        subtitle="At Nexora, we don't just give you tools—we give you a connected system that grows with your business."
        imageUrl="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop"
      />

      {/* Intro */}
      <div className="features-intro">
        <div className="features-intro-badge">
          <i className="fa-solid fa-bolt" />
          10 Core Capabilities
        </div>
        <h2 className="features-intro-title">
          Everything your business needs, <span>beautifully unified</span>
        </h2>
        <p className="features-intro-subtitle">
          Every feature is built with a single goal: to help your team move faster and work as one.
        </p>
      </div>

      {/* Gallery */}
      <div className="features-gallery">
        {GALLERY_IMAGES.map((src, i) => (
          <img key={i} src={src} alt="" className="gallery-img" loading="lazy" />
        ))}
      </div>

      {/* Feature Cards */}
      <section className="features-grid-section">
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div
              key={f.num}
              className="feature-showcase-card"
              style={{
                '--card-accent': f.accent,
                '--card-icon-bg': f.iconBg,
                '--card-icon-color': f.iconColor,
              } as React.CSSProperties}
            >
              <div className="fsc-number">Feature {f.num}</div>
              <div className="fsc-icon" style={{ background: f.iconBg, color: f.iconColor }}>
                <i className={f.icon} />
              </div>
              <h3 className="fsc-title">{f.title}</h3>
              <div className="fsc-benefit">
                <i className="fa-solid fa-star" />
                {f.benefit}
              </div>
              <ul className="fsc-bullets">
                {f.bullets.map((b, bi) => (
                  <li key={bi}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <div className="features-cta-banner">
        <div className="features-cta-inner">
          <p className="cta-eyebrow">Ready to Transform?</p>
          <h2 className="cta-title">The operating system for your business</h2>
          <p className="cta-subtitle">Modular, open, secure, and delightfully easy to use.</p>
          <div className="cta-btn-row">
            <a href="/get-started" className="cta-btn-primary">
              Get Started Free <i className="fa-solid fa-arrow-right" />
            </a>
            <a href="/solutions" className="cta-btn-secondary">
              Explore Solutions <i className="fa-solid fa-compass" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Features;
