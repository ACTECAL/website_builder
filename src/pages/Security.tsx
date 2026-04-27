import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shield, BookOpen, Lock, Database,
  Globe, Server, Smartphone, Monitor,
  CheckCircle2, ArrowRight, Wifi, Key
} from 'lucide-react';
import '../styles/Security.css';

/* ─── Stats bar data ─────────────────────────── */
const stats = [
  { num: '256-bit', lbl: 'AES Encryption' },
  { num: '100%',    lbl: 'Data Isolation' },
  { num: '99.99%',  lbl: 'Uptime SLA' },
  { num: 'GDPR',    lbl: '& HIPAA Ready' },
  { num: 'SOC 2',   lbl: 'Compliant' },
];

/* ─── Enterprise customers for architecture ──── */
const entCustomers = [
  { name: 'Customer A', url: 'acme.acteal.com',   label: 'Custom URL',         items: ['Dedicated DB', 'Isolated storage', 'Custom domain'] },
  { name: 'Customer B', url: 'globex.acteal.com',  label: 'Custom URL',         items: ['Dedicated DB', 'Isolated storage', 'Custom domain'] },
  { name: 'Customer C', url: 'app.medicorp.com',   label: 'Fully Custom Domain', items: ['Dedicated DB', 'Isolated storage', 'White-label URL'] },
];

/* ─── Security features ─────────────────────── */
const features = [
  {
    icon: <Database size={22} />, color: '#2563eb', bg: '#eff6ff',
    title: 'Dedicated Isolated Database',
    desc: 'Every Enterprise customer gets a fully isolated database instance. Your data never shares infrastructure with other tenants — no logical separation, full physical isolation.',
    points: ['One database per customer', 'No cross-tenant data exposure', 'Physical server isolation'],
  },
  {
    icon: <Lock size={22} />, color: '#10b981', bg: '#f0fdf4',
    title: 'End-to-End Encryption',
    desc: 'All data is encrypted in transit using TLS 1.3 and at rest using AES-256. Keys are rotated automatically and managed through a hardware security module (HSM).',
    points: ['TLS 1.3 in transit', 'AES-256 at rest', 'HSM-backed key management'],
  },
  {
    icon: <Globe size={22} />, color: '#f97316', bg: '#fff7ed',
    title: 'Custom URL & Domain',
    desc: "Every Enterprise tenant gets a branded subdomain or fully custom domain. Your users always see your brand — never ours. Perfect for white-label and enterprise procurement.",
    points: ['yourcompany.acteal.com', 'Fully custom domains', 'SSL auto-provisioned'],
  },
  {
    icon: <Shield size={22} />, color: '#8b5cf6', bg: '#faf5ff',
    title: 'GDPR, HIPAA & SOC 2',
    desc: "We're compliant with the world's most stringent data regulations. Regular third-party audits, DPA agreements, and BAAs available for healthcare organizations.",
    points: ['GDPR Data Processing Agreements', 'HIPAA BAA available', 'Annual SOC 2 Type II audit'],
  },
  {
    icon: <Key size={22} />, color: '#14b8a6', bg: '#f0fdfa',
    title: 'Role-Based Access Control',
    desc: 'Fine-grained permissions let you control exactly who can see and do what inside your instance. Custom roles, team hierarchies, and field-level access control.',
    points: ['Custom roles & permissions', 'Field-level access', 'SSO / SAML 2.0 support'],
  },
  {
    icon: <Server size={22} />, color: '#ef4444', bg: '#fef2f2',
    title: 'Audit Logs & Monitoring',
    desc: "Every action taken inside your environment is logged, timestamped, and queryable. Unlimited log retention on Enterprise with real-time alerting for suspicious activity.",
    points: ['Unlimited log retention', 'Real-time anomaly alerts', 'Exportable audit trail'],
  },
];

/* ══════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════ */
const Security: React.FC = () => {
  return (
    <div className="sec-page">

      {/* ── HERO ─────────────────────────────────── */}
      <section className="sec-hero">
        <div className="sec-container">
          <div className="sec-hero-badge">
            <Shield size={13} /> Enterprise-Grade Infrastructure
          </div>

          <h1 className="sec-hero-title">
            Enterprise-Grade Security<br />
            <span className="sec-hero-blue">for Every Business</span>
          </h1>

          <p className="sec-hero-sub">
            Your data deserves the highest standard of protection. From isolated databases
            to end-to-end encryption, Acteal is built on a security-first architecture —
            at every tier.
          </p>

          <div className="sec-hero-actions">
            <Link to="/get-started" className="sec-btn sec-btn-blue">
              <Shield size={15} /> Learn About Enterprise Security
            </Link>
            <Link to="/docs" className="sec-btn sec-btn-ghost">
              <BookOpen size={15} /> Read Our Docs
            </Link>
          </div>

          {/* Stats bar */}
          <div className="sec-stats-bar">
            {stats.map((s, i) => (
              <React.Fragment key={s.lbl}>
                <div className="sec-stat">
                  <span className="sec-stat-num">{s.num}</span>
                  <span className="sec-stat-lbl">{s.lbl}</span>
                </div>
                {i < stats.length - 1 && <div className="sec-stat-div" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURE ─────────────────────────── */}
      <section className="sec-arch">
        <div className="sec-container">
          <div className="sec-section-hdr">
            <p className="sec-section-label">ARCHITECTURE</p>
            <h2 className="sec-section-title">How Your Data Stays Isolated</h2>
            <p className="sec-section-sub">
              A single secure gateway routes every request to a completely separate, isolated
              database per customer — no shared infrastructure, no cross-tenant exposure.
            </p>
          </div>

          {/* Diagram */}
          <div className="sec-diagram">

            {/* Entry points */}
            <div className="sec-diag-entry">
              {[
                { icon: <Monitor size={20} />, lbl: 'Browser' },
                { icon: <Smartphone size={20} />, lbl: 'Mobile' },
                { icon: <Wifi size={20} />, lbl: 'API' },
              ].map((e) => (
                <div key={e.lbl} className="sec-entry-node">
                  <div className="sec-entry-icon">{e.icon}</div>
                  <span className="sec-entry-lbl">{e.lbl}</span>
                </div>
              ))}
            </div>

            {/* Arrow down */}
            <div className="sec-arrow-down">↓</div>

            {/* Central gateway */}
            <div className="sec-gateway">
              <div className="sec-gateway-icon"><Shield size={20} /></div>
              <div>
                <div className="sec-gateway-name">Central Gateway</div>
                <div className="sec-gateway-url">app.acteal.com</div>
              </div>
              <div className="sec-gateway-tags">
                <span className="sec-gtag">SSL/TLS</span>
                <span className="sec-gtag">WAF</span>
                <span className="sec-gtag">Auth Layer</span>
                <span className="sec-gtag">Rate Limiting</span>
              </div>
            </div>

            {/* Routes label */}
            <div className="sec-routes-label">
              <span className="sec-routes-line" />
              ROUTES TO ISOLATED ENVIRONMENTS
              <span className="sec-routes-line" />
            </div>

            {/* Customer nodes */}
            <div className="sec-customers-row">
              {entCustomers.map((c) => (
                <div key={c.name} className="sec-customer-card sec-customer-ent">
                  <div className="sec-cust-badge">Enterprise</div>
                  <div className="sec-cust-icon"><Database size={20} /></div>
                  <div className="sec-cust-name">{c.name}</div>
                  <div className="sec-cust-url">{c.url}</div>
                  <div className="sec-cust-url-lbl">{c.label}</div>
                  <ul className="sec-cust-items">
                    {c.items.map((item) => (
                      <li key={item}><CheckCircle2 size={12} /> {item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* VS separator */}
              <div className="sec-vs">vs</div>

              {/* Free / Shared */}
              <div className="sec-customer-card sec-customer-free">
                <div className="sec-cust-badge sec-cust-badge-free">Free / Shared</div>
                <div className="sec-cust-icon sec-cust-icon-free"><Database size={20} /></div>
                <div className="sec-cust-name">Customers D, E, F…</div>
                <div className="sec-cust-url">app.acteal.com</div>
                <div className="sec-cust-url-lbl">Shared</div>
                <ul className="sec-cust-items sec-cust-items-free">
                  <li><CheckCircle2 size={12} /> Shared DB pool</li>
                  <li><CheckCircle2 size={12} /> Logical separation</li>
                  <li><CheckCircle2 size={12} /> SSL encrypted</li>
                </ul>
              </div>
            </div>

            {/* Legend */}
            <div className="sec-legend">
              <span className="sec-legend-item"><span className="sec-leg-dot sec-leg-blue" /> Enterprise — Dedicated &amp; Isolated DB</span>
              <span className="sec-legend-item"><span className="sec-leg-dot sec-leg-grey" /> Free Tier — Secure Shared Environment</span>
              <span className="sec-legend-item"><span className="sec-leg-dot sec-leg-green" /> Central Gateway (Single URL Entry Point)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECURITY FEATURES ────────────────────── */}
      <section className="sec-features">
        <div className="sec-container">
          <div className="sec-section-hdr">
            <p className="sec-section-label">SECURITY FEATURES</p>
            <h2 className="sec-section-title">Built to Protect at Every Layer</h2>
            <p className="sec-section-sub">
              Six pillars of enterprise security — each engineered from the ground up
              to exceed compliance requirements.
            </p>
          </div>

          <div className="sec-feat-grid">
            {features.map((f) => (
              <div key={f.title} className="sec-feat-card">
                <div className="sec-feat-icon" style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <h3 className="sec-feat-title">{f.title}</h3>
                <p className="sec-feat-desc">{f.desc}</p>
                <ul className="sec-feat-points">
                  {f.points.map((p) => (
                    <li key={p}>
                      <CheckCircle2 size={13} style={{ color: '#22c55e', flexShrink: 0 }} /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="sec-cta">
        <div className="sec-container">
          <div className="sec-cta-card">
            <div className="sec-cta-left">
              <p className="sec-section-label" style={{ color: 'rgba(255,255,255,.7)' }}>READY TO GO ENTERPRISE?</p>
              <h2 className="sec-cta-title">Get a Security Briefing</h2>
              <p className="sec-cta-sub">
                Our security team will walk you through our architecture, compliance posture,
                and custom deployment options for your organization.
              </p>
            </div>
            <div className="sec-cta-actions">
              <Link to="/contact" className="sec-btn sec-btn-cta-w">Talk to Security Team <ArrowRight size={15} /></Link>
              <Link to="/docs" className="sec-btn sec-btn-cta-ghost">Read Security Docs</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Security;