import React from 'react';
import { PageHero } from '../components/PageHero';

const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="list-unstyled">
    {items.map((item, idx) => (
      <li key={idx} className="d-flex align-items-start mb-3">
        <i className="fa-solid fa-check text-primary mt-1 me-3"></i>
        <span className="fs-5 text-secondary">{item}</span>
      </li>
    ))}
  </ul>
);

export const LearnMore: React.FC = () => {
  return (
    <main>
      <PageHero
        title="Learn More About Actyx"
        subtitle="Understand our platform's capabilities, architecture, and how it fits your business."
        imageUrl="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop"
      />
      <section className="py-5" style={{ padding: '0 24px 40px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="mb-4 fw-bold">What you'll discover</h2>
          <BulletList
            items={[
              'How modular apps reduce risk and speed up adoption',
              'Security model, data ownership, and compliance',
              'Integration patterns and API-first design',
              'Example rollouts for SMBs and mid-market',
              'Total cost of ownership vs. traditional suites'
            ]}
          />

          <h2 className="mt-5 mb-4 fw-bold">Why teams choose Actyx</h2>
          <BulletList
            items={[
              'Start small, grow fast: add apps as needs evolve',
              'Unified UX: one login, one data model, one experience',
              'Lower TCO: fewer vendors, simpler integration, faster onboarding',
              'Enterprise‑grade security with role‑based access and audit trails'
            ]}
          />

          <h2 className="mt-5 mb-4 fw-bold">Architecture at a glance</h2>
          <BulletList
            items={[
              'API‑first: REST + webhooks for real‑time workflows',
              'Extensible schema: custom fields and views without code',
              'Automation engine: triggers, conditions, actions',
              'Integrations: email, payments, storage, messaging'
            ]}
          />

          <h2 className="mt-5 mb-4 fw-bold">Modules overview</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {[
              { title: 'CRM', desc: 'Leads, pipeline, quotes' },
              { title: 'Finance', desc: 'Invoices, expenses, reporting' },
              { title: 'HR', desc: 'Directory, time off, reviews' },
              { title: 'Operations', desc: 'Projects, tasks, field service' },
              { title: 'Marketing', desc: 'Email, social, automation' },
              { title: 'Support', desc: 'Helpdesk, SLAs, knowledge base' }
            ].map(m => (
              <div key={m.title} className="p-4 bg-white border rounded-3 shadow-sm hover-shadow transition">
                <div className="fw-bold mb-2">{m.title}</div>
                <div className="text-muted small">{m.desc}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-5 mb-4 fw-bold">Security & compliance</h2>
          <BulletList
            items={[
              'Encryption in transit and at rest',
              'Granular RBAC and SSO (OAuth/SAML)',
              'Audit logs and IP allowlisting',
              'Backups and regional data residency options'
            ]}
          />

          <h2 className="mt-5 mb-4 fw-bold">Customer snapshots</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {[
              { name: 'Acme Retail', impact: 'Consolidated 7 tools → 1 platform; 22% faster order cycle' },
              { name: 'Northwind Labs', impact: 'Closed‑loop analytics; +18% sales productivity' },
              { name: 'Globex Services', impact: 'Cut onboarding from weeks to days; CSAT +14 pts' }
            ].map(c => (
              <div key={c.name} className="p-4 bg-white border rounded-3 shadow-sm">
                <div className="fw-bold text-dark">{c.name}</div>
                <div className="text-secondary mt-2 small">{c.impact}</div>
              </div>
            ))}
          </div>

          <h2 className="mt-5 mb-4 fw-bold">FAQs</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { q: 'How do migrations work?', a: 'Import from CSV or via API. Our team provides migration playbooks and optional services.' },
              { q: 'Can we host data in our region?', a: 'Yes. Regional data residency options are available on select plans.' },
              { q: 'What about custom workflows?', a: 'Use the automation builder or build extensions with the API & webhooks.' }
            ].map(f => (
              <div key={f.q} className="p-4 bg-white border rounded-3 shadow-sm">
                <div className="fw-bold mb-2">{f.q}</div>
                <div className="text-muted small">{f.a}</div>
              </div>
            ))}
          </div>

          <div className="d-flex flex-wrap gap-3 mt-5">
            <a href="/get-started" className="btn btn-primary px-4 py-2 fw-bold">Get started now</a>
            <a href="/contact-sales" className="btn btn-outline-primary px-4 py-2 fw-bold">Contact sales</a>
          </div>

          <h3 className="mt-5 h5 fw-bold">Explore next</h3>
          <p className="text-muted">
            Compare features on the <a href="/features" className="text-primary text-decoration-none fw-semibold">Features</a> page or dive into the <a href="/api-reference" className="text-primary text-decoration-none fw-semibold">API Reference</a>.
          </p>
        </div>
        <style>{`
          .hover-shadow:hover { box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
          .transition { transition: all 0.2s ease-in-out; }
        `}</style>
      </section>
    </main>
  );
};

export default LearnMore;
