// import React from 'react';
// import { PricingSection } from '../components/PricingSection';

// export const Pricing: React.FC = () => {
//   const tiers = [
//     {
//       name: 'Starter',
//       price: '₹2,499',
//       period: 'month',
//       description: 'Perfect for small teams getting started',
//       features: [
//         'Up to 5 team members',
//         'Basic analytics',
//         '10 workflow automations',
//         'Email support',
//         'Mobile apps',
//         'Basic integrations'
//       ],
//       cta: 'Start Free Trial',
//       href: '/signup?plan=starter'
//     },
//     {
//       name: 'Professional',
//       price: '₹6,499',
//       period: 'month',
//       description: 'Ideal for growing businesses',
//       features: [
//         'Up to 25 team members',
//         'Advanced analytics',
//         'Unlimited automations',
//         'Priority support',
//         'Advanced integrations',
//         'Custom branding',
//         'API access',
//         'Advanced security'
//       ],
//       popular: true,
//       cta: 'Start Free Trial',
//       href: '/signup?plan=professional'
//     },
//     {
//       name: 'Enterprise',
//       price: '₹16,499',
//       period: 'month',
//       description: 'For large organizations',
//       features: [
//         'Unlimited team members',
//         'Custom analytics',
//         'White-label solution',
//         'Dedicated support',
//         'Custom integrations',
//         'Advanced compliance',
//         'SLA guarantee',
//         'On-premise option'
//       ],
//       cta: 'Contact Sales',
//       href: '/contact-sales?plan=enterprise'
//     }
//   ];

//   return (
//     <div>
//       <PricingSection tiers={tiers} />
//     </div>
//   );
// };




import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Check, X, ChevronDown, ChevronUp,
  Zap, MessageSquare, BookOpen,
  Shield, Database, Globe, HardDrive,
  Users, Key, BarChart2, Settings,
  Headphones, Star, ArrowRight
} from 'lucide-react';
import './Pricing.css';
import { BASE_URL } from './Profile';

/* ─────────────────────────────────────────────────
   COMPARISON TABLE DATA
───────────────────────────────────────────────── */
const sections = [
  {
    group: 'INFRASTRUCTURE & DATABASE',
    rows: [
      { label: 'Database Type',      sub: 'How your data is stored',                  free: 'Shared Database',    ent: 'Dedicated Database',   freeIs: 'text', entIs: 'text-blue' },
      { label: 'Database Isolation', sub: 'Tenant separation',                         free: '✗ Multi-tenant',     ent: '✓ Fully Isolated',     freeIs: 'text-red', entIs: 'text-green' },
      { label: 'Custom URL / Domain', sub: 'Your own branded URL',                     free: false,                ent: true },
      { label: 'Storage',            sub: 'How much you can store',                    free: '5 GB',               ent: 'Unlimited',            freeIs: 'text', entIs: 'text-blue' },
    ],
  },
  {
    group: 'SECURITY & COMPLIANCE',
    rows: [
      { label: 'Security Level',           sub: 'Data protection tier',               free: 'Standard (SSL)',     ent: 'Advanced Encryption',  freeIs: 'text', entIs: 'text-blue' },
      { label: 'GDPR Compliance',          sub: 'EU data regulation',                 free: true,                 ent: true },
      { label: 'HIPAA Ready',              sub: 'Healthcare compliance',              free: true,                 ent: true },
      { label: 'Audit Logs',               sub: 'Activity & log monitoring',          free: '7-day retention',    ent: 'Unlimited retention',  freeIs: 'text', entIs: 'text-blue' },
      { label: 'Two-Factor Authentication',sub: 'Enhanced account security',          free: true,                 ent: true },
    ],
  },
  {
    group: 'USERS & ACCESS',
    rows: [
      { label: 'User Limit',              sub: 'Number of seats',                     free: '1 User (Free)',      ent: 'Unlimited',            freeIs: 'text', entIs: 'text-blue' },
      { label: 'Role-Based Access Control',sub: 'Granular permissions',              free: 'Basic Roles',        ent: 'Custom Roles',         freeIs: 'text', entIs: 'text-blue' },
      { label: 'SSO / Single Sign-On',    sub: 'Unified authentication',             free: false,                ent: true },
    ],
  },
  {
    group: 'APPS & FEATURES',
    rows: [
      { label: 'All 6 Apps Included',     sub: 'HMS, ERP, Accounting, etc.',         free: true,                 ent: true },
      { label: 'White-Label / Custom Branding', sub: 'Your name, your platform',     free: false,                ent: true },
      { label: 'API Access',              sub: 'Integration & dev tools',            free: 'Limited',            ent: 'Full API Access',      freeIs: 'text', entIs: 'text-blue' },
      { label: 'Custom Fields & Workflows',sub: 'Adaptable to any process',          free: false,                ent: true },
    ],
  },
  {
    group: 'SUPPORT & SLA',
    rows: [
      { label: 'Support Channel',         sub: 'How we help you',                    free: 'Community Forum',    ent: 'Priority 24/7 Support',freeIs: 'text', entIs: 'text-blue' },
      { label: 'SLA Guarantee',           sub: 'Uptime commitment',                  free: false,                ent: true },
      { label: 'Dedicated Account Manager',sub: 'Your own success manager',          free: false,                ent: true },
    ],
  },
];

/* ─────────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────────── */
const faqs = [
  {
    icon: <Zap size={18} />,
    color: '#2563eb',
    q: 'How does the 3-month free trial for teams work?',
    a: "When you sign up — even on the Free plan — your entire team gets full access to all features for 3 months at no cost. No credit card is required to start. After 3 months, individual users can continue using the platform for free (1-user limit), while teams can upgrade to an Enterprise plan that fits their scale.",
  },
  {
    icon: <Database size={18} />,
    color: '#10b981',
    q: "What's the difference between a Shared and Dedicated Database?",
    a: "On the Free plan, your data is stored in a shared multi-tenant environment — it's logically separated but sits on the same infrastructure as other plans. On Enterprise, your organization gets a completely dedicated database instance with physical isolation, meaning no other customer's data is ever on the same server. This provides dramatically improved performance, security, and compliance readiness.",
  },
  {
    icon: <ArrowRight size={18} />,
    color: '#f97316',
    q: 'Can I migrate my data if I upgrade from Free to Enterprise?',
    a: "Absolutely. When you upgrade to Enterprise, our team handles the full data migration for you — from the shared environment to your dedicated database server — with zero downtime. All your existing individual users, configurations, users, and historical data are preserved exactly as-is. We'll schedule migration during off-peak hours and provide a dedicated engineer to guide you through the transition.",
  },
  {
    icon: <Shield size={18} />,
    color: '#8b5cf6',
    q: 'How secure is my data on the Free plan?',
    a: 'All plans — including Free — use SSL encryption for data-in-transit and AES-256 encryption at rest. The Free plan also includes essential security controls including two-factor authentication, login audit logs (7-day retention), and GDPR-compliant data handling. Enterprise adds advanced features like physical database isolation, extended audit logs, HIPAA readiness, SOC 2 compliance, and a dedicated security configuration review.',
  },
  {
    icon: <Globe size={18} />,
    color: '#14b8a6',
    q: 'What is the Custom URL feature in the Enterprise plan?',
    a: 'Every Enterprise customer gets their own branded subdomain (e.g., yourcompany.acteal.com) — or even a fully custom domain like app.yourcompany.com. This creates a seamless branded experience for your users, strengthens trust, and is critical for enterprise procurement and compliance sign-offs.',
  },
  {
    icon: <Key size={18} />,
    color: '#ef4444',
    q: 'Is there any lock-in or hidden fees?',
    a: "None. The Free plan is genuinely free for individual users — forever. Enterprise plans are quoted transparently based on your specific team size and requirements, with no surprise charges. You can export your data at any time, and we guarantee a clean offboarding process if you ever decide to leave. We believe in long-term partnerships, not lock-in.",
  },
];

/* ─────────────────────────────────────────────────
   CELL RENDERER
───────────────────────────────────────────────── */
const Cell: React.FC<{ val: any; type?: string }> = ({ val, type }) => {
  if (val === true)  return <span className="pc-check"><Check size={16} /></span>;
  if (val === false) return <span className="pc-cross"><X size={16} /></span>;
  return <span className={`pc-text ${type || ''}`}>{val}</span>;
};

/* ─────────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────────── */
export const Pricing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  
  
//   useEffect(() => {
//   const fetchPlans = async () => {
//     try {
//       const res = await fetch('http://localhost:4000/api/subscriptions/plans', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });// apna endpoint
//       const data = await res.json();

//       if (data.success) {
//         setPlans(data.data);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setPlansLoading(false);
//     }
//   };

//   fetchPlans();
// }, []);
useEffect(() => {
  const fetchPlans = async () => {
    try {
      const res =await fetch(`${BASE_URL}/api/subscriptions/plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }); // apna endpoint
      const data = await res.json();

      const parsedPlans = data.data.map((plan: any) => {
        let featuresObj = {};

        try {
          featuresObj = JSON.parse(plan.features);
        } catch (e) {
          console.log("Feature parse error", e);
        }

        return {
          ...plan,
          featuresObj,
        };
      });

      setPlans(parsedPlans);
    } catch (err) {
      console.log(err);
    } finally {
      setPlansLoading(false);
    }
  };

  fetchPlans();
}, []);
const getFeatures = (plan: any): string[] => {
  try {
    const parsed = JSON.parse(plan.features || "{}");

    const modules = parsed.modules?.join(", ") || "";
    const support = parsed.support ? `Support: ${parsed.support}` : "";
    const storage = parsed.storage ? `Storage: ${parsed.storage}` : "";

    return [modules, support, storage].filter(Boolean);
  } catch {
    return [];
  }
};

  return (
    <div className="pr-page">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="pr-hero">
        <div className="pr-container">
          <div className="pr-hero-badge">
            <span className="pr-badge-dot" />
            Simple, Transparent · Cancel anytime
          </div>
          <h1 className="pr-hero-title">
            Simple, Transparent<br />
            <span className="pr-hero-title-blue">Pricing</span>
          </h1>
          <p className="pr-hero-sub">
            Start free, scale as you grow. Every plan includes a 3-month trial with full access —
            no credit card required.
          </p>
          <div className="pr-hero-links">
            <a href="#compare" className="pr-link">↓ Compare plans · pricing details</a>
          </div>
        </div>
      </section>

      {/* ══ PLAN CARDS ══════════════════════════════════════ */}
      {/* <section className="pr-cards-section">
        <div className="pr-container pr-cards-grid">

         
          <div className="pr-card pr-card-free">
            <div className="pr-card-badge pr-badge-free">✦ Free Forever</div>
            <h2 className="pr-card-name">Free</h2>
            <p className="pr-card-desc">
              Perfect for independent professionals and solo operators who need full power without the cost.
            </p>
            <div className="pr-card-price">
              <span className="pr-price-dollar">$</span>
              <span className="pr-price-amt">0</span>
              <span className="pr-price-per">/mo</span>
            </div>

            <div className="pr-trial-banner">
              🎉 3-Month Team Trial Included — invite your team free
            </div>

            <ul className="pr-card-feats">
              <li><Check size={15} className="pr-feat-chk" /><span><strong>1 User</strong> — Free for individual use</span></li>
              <li><Check size={15} className="pr-feat-chk" /><span><strong>Shared Environment</strong> — Multi-tenant infrastructure</span></li>
              <li><Check size={15} className="pr-feat-chk" /><span><strong>Standard Security</strong> — SSL &amp; data protection</span></li>
              <li><Check size={15} className="pr-feat-chk" /><span><strong>All 6 Apps Included</strong> — Full access, no limits</span></li>
              <li><Check size={15} className="pr-feat-chk" /><span><strong>3-Month Trial</strong> — Try with your team</span></li>
              <li><Check size={15} className="pr-feat-chk" /><span>Standard community support</span></li>
            </ul>

            <Link to="/get-started" className="pr-btn pr-btn-outline">Get Started Free</Link>
            <p className="pr-no-cc">No credit card required</p>
          </div>

        
          <div className="pr-card pr-card-ent">
            <div className="pr-card-badge pr-badge-pop">⭐ Most Popular</div>
            <h2 className="pr-card-name pr-card-name-white">Enterprise</h2>
            <p className="pr-card-desc pr-card-desc-white">
              For organizations that need dedicated infrastructure, advanced security, and full customization.
            </p>
            <div className="pr-card-price">
              <span className="pr-price-custom">Custom</span>
              <span className="pr-price-custom-sub">Pricing</span>
            </div>

            <ul className="pr-card-feats pr-feats-white">
              <li><Check size={15} className="pr-feat-chk-w" /><span><strong>Unlimited 6-month trial</strong> — start immediately</span></li>
              <li><Check size={15} className="pr-feat-chk-w" /><span><strong>Unlimited Users</strong> — Scale your entire org</span></li>
              <li><Check size={15} className="pr-feat-chk-w" /><span><strong>Dedicated Database</strong> — Isolated, Custom URL, DMARC</span></li>
              <li><Check size={15} className="pr-feat-chk-w" /><span><strong>Advanced Security &amp; Encryption</strong> — GDPR, HIPAA</span></li>
              <li><Check size={15} className="pr-feat-chk-w" /><span><strong>Full Customization</strong> — White-label &amp; custom branding</span></li>
              <li><Check size={15} className="pr-feat-chk-w" /><span><strong>Priority Support</strong> — 24/7 dedicated team</span></li>
              <li><Check size={15} className="pr-feat-chk-w" /><span>SLA guarantee &amp; uptime commitment</span></li>
            </ul>

            <Link to="/contact" className="pr-btn pr-btn-white">Contact Sales</Link>
            <p className="pr-no-cc pr-no-cc-white">This is not self-service</p>
          </div>

        </div>
      </section> */}
    <div className="pr-cards-grid">
  {plans.map((plan, i) => {
    const f = plan.featuresObj;

    return (
      <div
        key={plan.id}
        className={`pr-card ${
          plan.name === "Enterprise" ? "pr-card-ent" : "pr-card-free"
        }`}
      >
        <div className="pr-card-badge">
          {plan.price === "0.00" ? "✦ Free" : "⭐ Popular"}
        </div>

        <h2 className="pr-card-name">{plan.name}</h2>
        <p className="pr-card-desc">{plan.description}</p>

        <div className="pr-card-price">
          <span className="pr-price-dollar">₹</span>
          <span className="pr-price-amt"> {Number(plan.price)}</span>
          <span className="pr-price-per">/mo</span>
        </div>

        <ul className="pr-card-feats">
          <li>Modules: {f.modules?.join(", ") || "-"}</li>
          <li>Support: {f.support || "-"}</li>
          <li>Storage: {f.storage || "-"}</li>
          <li>Users: {plan.max_users === -1 ? "Unlimited" : plan.max_users}</li>
          <li>Devices: {plan.max_devices === -1 ? "Unlimited" : plan.max_devices}</li>
        </ul>

        <button className={`pr-btn  ${
          plan.name === "Enterprise" ? "pr-btn-white" : "pr-btn-blue"
        }`}>
          {plan.price === "0.00" ? "Get Started" : "Buy Now"}
        </button>
      </div>
    );
  })}
</div>

      {/* ══ COMPARISON TABLE ════════════════════════════════ */}
      <section className="pr-compare" id="compare">
        <div className="pr-container">
          <div className="pr-compare-hdr">
            <p className="pr-section-label">COMPARE PLANS</p>
            <h2 className="pr-section-title">Everything Side by Side</h2>
            <p className="pr-section-sub">
              A detailed breakdown of what's included in each plan so you can choose with confidence.
            </p>
          </div>

          <div className="pr-table-wrap">
            <table className="pr-table">
              <thead>
                <tr>
                  <th className="pr-th-feat"></th>
                  <th className="pr-th-plan">
                    <span className="pr-plan-col-name">Free</span>
                    <span className="pr-plan-col-price">$0 / mo</span>
                  </th>
                  <th className="pr-th-plan pr-th-ent">
                    <span className="pr-ent-pill">Enterprise</span>
                    <span className="pr-plan-col-price-w">Custom</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sections.map((sec) => (
                  <React.Fragment key={sec.group}>
                    <tr className="pr-group-row">
                      <td colSpan={3} className="pr-group-label">{sec.group}</td>
                    </tr>
                    {sec.rows.map((row) => (
                      <tr key={row.label} className="pr-data-row">
                        <td className="pr-feat-cell">
                          <span className="pr-feat-name">{row.label}</span>
                          {row.sub && <span className="pr-feat-sub">{row.sub}</span>}
                        </td>
                        <td className="pr-val-cell"><Cell val={row.free} type={(row as any).freeIs} /></td>
                        <td className="pr-val-cell pr-val-ent"><Cell val={row.ent} type={(row as any).entIs} /></td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
              <tfoot>
                <tr className="pr-cta-row">
                  <td></td>
                  <td className="pr-cta-cell">
                    <Link to="/get-started" className="pr-btn pr-btn-outline pr-tbl-btn">Get Started Free</Link>
                  </td>
                  <td className="pr-cta-cell">
                    <Link to="/contact" className="pr-btn pr-btn-blue pr-tbl-btn">Contact Sales</Link>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* ══ FAQ ════════════════════════════════════════════ */}
      {/* <section className="pr-faq">
        <div className="pr-container pr-faq-inner">
          <div className="pr-compare-hdr">
            <p className="pr-section-label">FAQ</p>
            <h2 className="pr-section-title">Frequently Asked Questions</h2>
            <p className="pr-section-sub">
              Everything you need to know before getting started. Still have questions? We're here to help.
            </p>
          </div>

          <div className="pr-faq-list">
            {faqs.map((f, i) => (
              <div key={i} className={`pr-faq-item ${openFaq === i ? 'pr-faq-open' : ''}`}>
                <button className="pr-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="pr-faq-icon" style={{ background: `${f.color}18`, color: f.color }}>
                    {f.icon}
                  </span>
                  <span className="pr-faq-qtext">{f.q}</span>
                  <span className="pr-faq-toggle">
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pr-faq-a">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══ STILL HAVE QUESTIONS CTA ═══════════════════════ */}
      {/* <section className="pr-still">
        <div className="pr-container">
          <div className="pr-still-card">
            <div className="pr-still-left">
              <h3 className="pr-still-title">Still have questions?</h3>
              <p className="pr-still-sub">
                Our team is happy to walk you through any plan and find the right fit.
              </p>
            </div>
            <div className="pr-still-actions">
              <Link to="/contact" className="pr-btn pr-btn-blue">Talk to Sales</Link>
              <Link to="/docs" className="pr-btn pr-btn-outline">Read Docs</Link>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  );
};

export default Pricing;