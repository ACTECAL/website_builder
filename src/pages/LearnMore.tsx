import React from 'react';
import { PageHero } from '../components/PageHero';
import { HandBullets } from '../components/CreativeBits';
import '../styles/LearnMore.css';

const MODULES = [
  { title: 'CRM', desc: 'Leads, pipeline, quotes', icon: 'fa-solid fa-handshake', accent: 'linear-gradient(90deg, #0ea5e9, #22d3ee)', iconBg: '#e0f2fe', iconColor: '#0ea5e9' },
  { title: 'Finance', desc: 'Invoices, expenses, reporting', icon: 'fa-solid fa-coins', accent: 'linear-gradient(90deg, #10b981, #34d399)', iconBg: '#dcfce7', iconColor: '#10b981' },
  { title: 'HR', desc: 'Directory, time off, reviews', icon: 'fa-solid fa-users', accent: 'linear-gradient(90deg, #ec4899, #f472b6)', iconBg: '#fce7f3', iconColor: '#ec4899' },
  { title: 'Operations', desc: 'Projects, tasks, field service', icon: 'fa-solid fa-gears', accent: 'linear-gradient(90deg, #f97316, #fb923c)', iconBg: '#ffedd5', iconColor: '#f97316' },
  { title: 'Marketing', desc: 'Email, social, automation', icon: 'fa-solid fa-bullhorn', accent: 'linear-gradient(90deg, #8b5cf6, #a78bfa)', iconBg: '#ede9fe', iconColor: '#8b5cf6' },
  { title: 'Support', desc: 'Helpdesk, SLAs, knowledge base', icon: 'fa-solid fa-headset', accent: 'linear-gradient(90deg, #6366f1, #818cf8)', iconBg: '#eef2ff', iconColor: '#6366f1' },
];

const SNAPSHOTS = [
  { name: 'Acme Retail', impact: 'Consolidated 7 tools → 1 platform; 22% faster order cycle' },
  { name: 'Northwind Labs', impact: 'Closed-loop analytics; +18% sales productivity' },
  { name: 'Globex Services', impact: 'Cut onboarding from weeks to days; CSAT +14 pts' },
];

const FAQS = [
  { q: 'How do migrations work?', a: 'Import from CSV or via API. Our team provides migration playbooks and optional services.' },
  { q: 'Can we host data in our region?', a: 'Yes. Regional data residency options are available on select plans.' },
  { q: 'What about custom workflows?', a: 'Use the automation builder or build extensions with the API & webhooks.' },
];

export const LearnMore: React.FC = () => {
  return (
    <main className="learn-more-page">
      <PageHero
        title="Learn More About Nexora"
        subtitle="Understand our platform's capabilities, architecture, and how it fits your business."
        imageUrl="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop"
      />

      <div className="learn-more-content">

        {/* What you'll discover */}
        <div className="lm-section">
          <div className="lm-section-badge"><i className="fa-solid fa-compass" /> Explore</div>
          <h2 className="lm-section-title">What you'll discover</h2>
          <HandBullets items={[
            'How modular apps reduce risk and speed up adoption',
            'Security model, data ownership, and compliance',
            'Integration patterns and API-first design',
            'Example rollouts for SMBs and mid-market',
            'Total cost of ownership vs. traditional suites',
          ]} />
        </div>

        {/* Why teams choose */}
        <div className="lm-section">
          <div className="lm-section-badge"><i className="fa-solid fa-trophy" /> Why Nexora</div>
          <h2 className="lm-section-title">Why teams choose Nexora</h2>
          <HandBullets items={[
            'Start small, grow fast: add apps as needs evolve',
            'Unified UX: one login, one data model, one experience',
            'Lower TCO: fewer vendors, simpler integration, faster onboarding',
            'Enterprise-grade security with role-based access and audit trails',
          ]} />
        </div>

        {/* Architecture */}
        <div className="lm-section">
          <div className="lm-section-badge"><i className="fa-solid fa-microchip" /> Architecture</div>
          <h2 className="lm-section-title">Architecture at a glance</h2>
          <HandBullets items={[
            'API-first: REST + webhooks for real-time workflows',
            'Extensible schema: custom fields and views without code',
            'Automation engine: triggers, conditions, actions',
            'Integrations: email, payments, storage, messaging',
          ]} />
        </div>

        {/* Modules */}
        <div className="lm-section">
          <div className="lm-section-badge"><i className="fa-solid fa-layer-group" /> Platform</div>
          <h2 className="lm-section-title">Modules overview</h2>
          <div className="modules-grid">
            {MODULES.map(m => (
              <div
                key={m.title}
                className="module-card"
                style={{ '--module-accent': m.accent, '--module-icon-bg': m.iconBg, '--module-icon-color': m.iconColor } as React.CSSProperties}
              >
                <div className="module-card-icon" style={{ background: m.iconBg, color: m.iconColor }}>
                  <i className={m.icon} />
                </div>
                <div className="module-card-title">{m.title}</div>
                <div className="module-card-desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="lm-section">
          <div className="lm-section-badge"><i className="fa-solid fa-shield-halved" /> Security</div>
          <h2 className="lm-section-title">Security & compliance</h2>
          <HandBullets items={[
            'Encryption in transit and at rest',
            'Granular RBAC and SSO (OAuth/SAML)',
            'Audit logs and IP allowlisting',
            'Backups and regional data residency options',
          ]} />
        </div>

        {/* Customer Snapshots */}
        <div className="lm-section">
          <div className="lm-section-badge"><i className="fa-solid fa-star" /> Results</div>
          <h2 className="lm-section-title">Customer snapshots</h2>
          <div className="snapshots-grid">
            {SNAPSHOTS.map(c => (
              <div key={c.name} className="snapshot-card">
                <div className="snapshot-company">{c.name}</div>
                <div className="snapshot-impact">{c.impact}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="lm-section">
          <div className="lm-section-badge"><i className="fa-solid fa-circle-question" /> FAQ</div>
          <h2 className="lm-section-title">Frequently asked questions</h2>
          <div className="faq-stack">
            {FAQS.map(f => (
              <div key={f.q} className="faq-card">
                <div className="faq-question">{f.q}</div>
                <div className="faq-answer">{f.a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Row */}
        <div className="lm-cta-row">
          <a href="/get-started" className="lm-btn-primary">
            Get started now <i className="fa-solid fa-arrow-right" />
          </a>
          <a href="/contact-sales" className="lm-btn-secondary">
            Contact sales <i className="fa-solid fa-phone" />
          </a>
        </div>

        {/* Explore Next */}
        <div className="explore-next">
          <h3>Explore next</h3>
          <p>
            Compare features on the <a href="/features">Features</a> page or dive into the <a href="/api-reference">API Reference</a>.
          </p>
        </div>

      </div>
    </main>
  );
};

export default LearnMore;
