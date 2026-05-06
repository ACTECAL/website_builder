import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { appModules } from "../data/appModules";
import { Product } from "../data/products";
import { productsApi } from "../services/productsApi";
import { AdvisorDropdown } from '../components/AdvisorDropdown';
import {
  Cpu,
  ShoppingCart,
  Users,
  Activity,
  ArrowRight,
  MousePointer2,
  Mail,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Layers,
  TrendingUp,
  Monitor,
  Box,
  Headphones,
  Link2,
  Lock,
  Settings2,
  Star,
  Play,
} from "lucide-react";
import { BASE_URL } from "./Profile";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
const [plans, setPlans] = useState<any[]>([]);
const [plansLoading, setPlansLoading] = useState<boolean>(true);
const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);


  useEffect(() => {
    const loadProducts = async () => {
      try {
        setProductsLoading(true);
        const fetchedProducts = await productsApi.getCachedProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();
  }, []);

useEffect(() => {
  const loadPlans = async () => {
    try {
      setPlansLoading(true);

      const response = await fetch(
        `${BASE_URL}/api/subscriptions/plans`
      );
      const result = await response.json();

      if (result.success) {
        const formattedPlans = result.data.map((plan: any) => {
          let parsedFeatures = {};

          try {
            parsedFeatures = plan.features
              ? JSON.parse(plan.features)
              : {};
          } catch (e) {
            console.error("Feature parse error:", e);
          }

          return {
            ...plan,
            features: parsedFeatures,
          };
        });

        setPlans(formattedPlans);
      }
    } catch (error) {
      console.error("Failed to load plans:", error);
    } finally {
      setPlansLoading(false);
    }
  };

  loadPlans();
}, []);
  const getProductIconColor = (productName: string) => {
    const colors: Record<string, string> = {
      'ERP':           '#2563eb',
      'Exam':          '#14b8a6',
      'Account':       '#10b981',
      'Website':       '#f97316',
      'CRM':           '#ef4444',
      'HR':            '#ec4899',
      'Inventory':     '#8b5cf6',
      'Manufacturing': '#f59e0b',
    };
    for (const key of Object.keys(colors)) {
      if (productName.toLowerCase().includes(key.toLowerCase())) return colors[key];
    }
    return '#2563eb';
  };

  const getProductIconBg = (productName: string) => {
    const bgs: Record<string, string> = {
      'ERP':           '#eff6ff',
      'Exam':          '#f0fdfa',
      'Account':       '#f0fdf4',
      'Website':       '#fff7ed',
      'CRM':           '#fef2f2',
      'HR':            '#fdf2f8',
      'Inventory':     '#faf5ff',
      'Manufacturing': '#fffbeb',
    };
    for (const key of Object.keys(bgs)) {
      if (productName.toLowerCase().includes(key.toLowerCase())) return bgs[key];
    }
    return '#eff6ff';
  };

  const getProductIcon = (productName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'ERP':           <Monitor size={22} />,
      'Exam':          <ShieldCheck size={22} />,
      'Account':       <Activity size={22} />,
      'Website':       <Box size={22} />,
      'CRM':           <Users size={22} />,
      'HR':            <ShieldCheck size={22} />,
      'Inventory':     <Box size={22} />,
      'Manufacturing': <Cpu size={22} />,
    };
    for (const key of Object.keys(icons)) {
      if (productName.toLowerCase().includes(key.toLowerCase())) return icons[key];
    }
    return <Box size={22} />;
  };

  const whyFeatures = [
    {
      icon: <Link2 size={22} />,
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
      title: 'Single URL, Multiple Apps',
      desc: 'Access all your business tools from one domain. Centralized management means faster onboarding, unified SSO, and a simpler IT footprint.',
      bullets: ['Unified login across all apps', 'Centralized user management', 'Single billing & subscription'],
    },
    {
      icon: <Lock size={22} />,
      iconBg: '#f0fdf4',
      iconColor: '#10b981',
      title: 'Secure & Isolated',
      desc: "Each environment gets its own dedicated database. Your data is never co-mingled with other tenants — enterprise-grade isolation by default.",
      bullets: ['Dedicated database per tenant', 'End-to-end encryption at rest', 'GDPR & HIPAA compliance ready'],
    },
    {
      icon: <Settings2 size={22} />,
      iconBg: '#faf5ff',
      iconColor: '#8b5cf6',
      title: 'Fully Customizable',
      desc: 'Tailor every module to your specific workflows. Custom fields, reports, automations, and role-based access — no code required.',
      bullets: ['Custom fields & views', 'Drag-and-drop automation builder', 'Role-based access control'],
    },
  ];

  const testimonials = [
    {
      initials: 'JD',
      text: '"This platform transformed how we manage our entire business. The integration is seamless and the support is incredible."',
      name: 'John Davidson',
      role: 'CEO, TechCorp',
      stars: 5,
    },
    {
      initials: 'SM',
      text: '"The best investment we made for our business. Everything works perfectly together and our efficiency has increased by 40%."',
      name: 'Sarah Martinez',
      role: 'Operations Manager, Global Inc',
      stars: 5,
    },
    {
      initials: 'MC',
      text: '"Finally, a solution that understands our needs. The customization options are endless and the user interface is intuitive."',
      name: 'Michael Chen',
      role: 'Founder, StartupHub',
      stars: 4,
    },
  ];

  const faqs = [
    { q: 'How long does setup take?', a: 'Setup typically takes less than 30 minutes. Our guided onboarding process walks you through every step, and our support team is available to help if needed.' },
    { q: 'Can I customize the platform?', a: 'Yes! Our platform is highly customizable. You can tailor workflows, create custom fields, design dashboards, and integrate with your existing tools.' },
    { q: 'Is my data secure?', a: 'Absolutely. We use bank-level encryption, regular security audits, and comply with all major data protection regulations including GDPR and SOC 2.' },
    { q: 'What about customer support?', a: 'We offer 24/7 support via chat, email, and phone. Our response time is under 2 hours, and we have a comprehensive knowledge base and video tutorials.' },
    { q: 'Can I integrate with other tools?', a: 'Yes! We integrate with 100+ popular tools including Slack, Google Workspace, Microsoft 365, QuickBooks, and more. We also offer a robust API for custom integrations.' },
    { q: 'Is there a free trial?', a: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can also start with our free forever plan for small teams.' },
  ];
const getFeatureList = (plan: any) => {
  const f = plan.features || {};

  return [
    f.modules ? `Modules: ${f.modules.join(", ")}` : null,
    f.support ? `Support: ${f.support}` : null,
    f.storage ? `Storage: ${f.storage}` : null,
    plan.max_users === -1
      ? "Unlimited users"
      : `Up to ${plan.max_users} users`,
    plan.max_devices === -1
      ? "Unlimited devices"
      : `Up to ${plan.max_devices} devices`,
  ].filter(Boolean);
};
  return (
    <div className="home-container">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="h-hero">
        <div className="h-container h-hero-inner">
          <div className="h-hero-badge">
            <span className="h-badge-dot" />
            6-Month Free Trial · No Credit Card Required
          </div>

          <h1 className="h-hero-title">
            One Platform.<br />
            <span className="h-hero-title-blue">All Your Business Apps.</span>
          </h1>

          <p className="h-hero-desc">
            Launch your entire business stack from a single URL. Enjoy a{' '}
            <strong>3-month free trial</strong> on all plans — or use the platform{' '}
            <strong>completely free forever</strong> if you're a single user.
          </p>

          <div className="h-hero-actions">
            <Link to="/get-started" className="h-btn h-btn-blue">
              <Zap size={16} /> Get Started — It's Free
            </Link>
            <button className="h-btn h-btn-ghost">
              <Play size={12} className="h-play-icon" /> Watch Demo
            </button>
          </div>

          {/* Stats bar */}
          <div className="h-hero-stats">
            <div className="h-stat">
              <span className="h-stat-num">10K+</span>
              <span className="h-stat-lbl">Active Users</span>
            </div>
            <div className="h-stat-divider" />
            <div className="h-stat">
              <span className="h-stat-num">99.9%</span>
              <span className="h-stat-lbl">Uptime</span>
            </div>
            <div className="h-stat-divider" />
            <div className="h-stat">
              <span className="h-stat-num">24/7</span>
              <span className="h-stat-lbl">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR APPLICATIONS (Products) ────────────────────────── */}
      <section className="h-apps" id="apps">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">OUR APPLICATIONS</p>
            <h2 className="h-section-title">Everything Your Business Needs</h2>
            <p className="h-section-sub">
              Powerful apps, one unified platform. Deploy what you need, when you need it.
            </p>
          </div>

          {productsLoading ? (
            <div className="h-loading">
              <div className="h-spinner" />
              <p>Loading products…</p>
            </div>
          ) : (
            <div className="h-apps-grid">
              {products.map((product, idx) => {
                const color = getProductIconColor(product.name);
                const bg    = getProductIconBg(product.name);
                return (
                  <Link
                    key={product.name}
                    to={`/get-started?product=${encodeURIComponent(product.name)}`}
                    className="h-app-card"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="h-app-icon" style={{ background: bg, color }}>
                      {getProductIcon(product.name)}
                    </div>
                    <div>
                      <div className="h-app-name">{product.name}</div>
                      <div className="h-app-cat" style={{ color }}>
                        {product.modules?.length
                          ? `${product.modules.length} MODULES`
                          : 'BUSINESS SUITE'}
                      </div>
                    </div>
                    <p className="h-app-desc">
                      Complete {product.name.toLowerCase()} solution with advanced analytics,
                      reporting, and seamless integrations built-in.
                    </p>
                    <span className="h-app-link" style={{ color }}>
                      Explore {product.name} →
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────── */}
      <section className="h-why">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">WHY US</p>
            <h2 className="h-section-title">Built Different. Built Better.</h2>
            <p className="h-section-sub">
              A platform designed around the way modern businesses actually operate.
            </p>
          </div>

          <div className="h-why-grid">
            {whyFeatures.map((f) => (
              <div key={f.title} className="h-why-card">
                <div className="h-why-icon" style={{ background: f.iconBg, color: f.iconColor }}>
                  {f.icon}
                </div>
                <h3 className="h-why-title">{f.title}</h3>
                <p className="h-why-desc">{f.desc}</p>
                <ul className="h-why-list">
                  {f.bullets.map((b) => (
                    <li key={b} className="h-why-item">
                      <CheckCircle2 size={14} style={{ color: '#22c55e', flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────── */}
     <section className="h-pricing" id="pricing">
  <div className="h-container">
    <div className="h-section-hdr">
      <p className="h-section-label">PRICING</p>
      <h2 className="h-section-title">Simple, Transparent Pricing</h2>
      <p className="h-section-sub">
        Start free, scale as you grow. Every plan includes a trial.
      </p>
    </div>

    {plansLoading ? (
      <div className="h-loading">
        <div className="h-spinner" />
        <p>Loading plans…</p>
      </div>
    ) : (
      <div className="h-pricing-grid">
        {plans.map((plan: any, idx: number) => {
          const isFree = plan.price === "0.00";

          return (
            <div
         key={plan.id}
  className={`h-price-card ${selectedPlanId === plan.id ? "h-price-selected" : ""}`}
  onClick={() => setSelectedPlanId(plan.id)}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* {plan.name === "Standard" && (
  <div className="h-plan-badge h-plan-badge-pop">
    ⭐ Most Popular
  </div>
)} */}
              {/* PLAN NAME */}
              <h3 className="h-plan-name">{plan.name}</h3>

              {/* DESCRIPTION */}
              <p className="h-plan-tag">{plan.description}</p>

              {/* PRICE */}
              <div className="h-plan-price">
                <span className="h-price-dollar">₹</span>
                <span className="h-price-amt"> {Number(plan.price)}</span>
                <span className="h-price-per">
                  /{plan.billing_cycle}
                </span>
              </div>

              {/* FEATURES */}
     <ul className="h-plan-feats">
  {getFeatureList(plan).map((feature, i) => (
    <li key={i} className="h-plan-feat">
      <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
      {feature}
    </li>
  ))}
</ul>
              {/* BUTTON */}
              <Link
                to={`/get-started?planId=${plan.id}&planName=${plan.name}`}
                className="h-plan-btn"
              >
                {isFree ? "Get Started Free" : `Buy ${plan.name}`}
              </Link>
            </div>
          );
        })}
      </div>
    )}

    <p className="h-pricing-note">
      🔒 No credit card required for free plan.
    </p>
  </div>
</section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="h-testimonials">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">TESTIMONIALS</p>
            <h2 className="h-section-title">What Our Clients Say</h2>
            <p className="h-section-sub">Real stories from real businesses.</p>
          </div>
          <div className="h-testi-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="h-testi-card">
                <div className="h-testi-stars">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <p className="h-testi-text">{t.text}</p>
                <div className="h-testi-author">
                  <div className="h-testi-avatar">{t.initials}</div>
                  <div>
                    <div className="h-testi-name">{t.name}</div>
                    <div className="h-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="h-stats">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">BY THE NUMBERS</p>
            <h2 className="h-section-title">Impressive Results</h2>
            <p className="h-section-sub">Join thousands of successful businesses.</p>
          </div>
          <div className="h-stats-grid">
            {[
              { icon: <Users size={28} />, num: '10,000+', lbl: 'Active Users',    desc: 'Growing daily' },
              { icon: <CheckCircle2 size={28} />, num: '99.9%',  lbl: 'Uptime',       desc: 'Reliable service' },
              { icon: <Headphones size={28} />, num: '24/7',   lbl: 'Support',      desc: 'Always here' },
              { icon: <Zap size={28} />,         num: '150+',   lbl: 'Features',     desc: 'Powerful tools' },
            ].map((s) => (
              <div key={s.lbl} className="h-stat-card">
                <div className="h-stat-icon">{s.icon}</div>
                <div className="h-stat-num2">{s.num}</div>
                <div className="h-stat-lbl2">{s.lbl}</div>
                <div className="h-stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="h-faq">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">FAQ</p>
            <h2 className="h-section-title">Frequently Asked Questions</h2>
            <p className="h-section-sub">Everything you need to know about our platform.</p>
          </div>
          <div className="h-faq-grid">
            {faqs.map((f) => (
              <div key={f.q} className="h-faq-card">
                <div className="h-faq-q">
                  <h4>{f.q}</h4>
                  <span className="h-faq-icon">+</span>
                </div>
                <div className="h-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ──────────────────────────────────────────── */}
      {/* <section className="h-resources">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">RESOURCES</p>
            <h2 className="h-section-title">Learn & Grow</h2>
            <p className="h-section-sub">Podcasts, guides, and insights for your business.</p>
          </div>
          <div className="h-res-grid">
            {[
              { title: 'Digital Transformation Success Stories', dur: '45 min', date: '2 days ago', desc: 'Learn how businesses transformed their operations with our platform.' },
              { title: 'Future of Business Management', dur: '32 min', date: '1 week ago', desc: 'Industry experts discuss trends and innovations in business software.' },
              { title: 'Scaling Your Business Smartly', dur: '28 min', date: '2 weeks ago', desc: 'Tips and strategies for sustainable business growth.' },
            ].map((r) => (
              <div key={r.title} className="h-res-card">
                <div className="h-res-thumb">
                  <div className="h-play-btn"><Play size={20} /></div>
                </div>
                <div className="h-res-body">
                  <span className="h-res-type">Podcast</span>
                  <h3 className="h-res-title">{r.title}</h3>
                  <p className="h-res-desc">{r.desc}</p>
                  <div className="h-res-meta">
                    <span>{r.dur}</span>
                    <span>{r.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ── CTA ────────────────────────────────────────────────── */}
      {/* <section className="h-cta">
        <div className="h-container">
          <div className="h-cta-inner">
            <p className="h-section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>READY TO START?</p>
            <h2 className="h-cta-title">Transform Your Business Today</h2>
            <p className="h-cta-sub">Join thousands of successful businesses using our platform.</p>
            <div className="h-cta-actions">
              <Link to="/get-started" className="h-btn h-btn-cta-white">
                Get Started Free <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="h-btn h-btn-cta-ghost">
                Talk to Sales <Users size={16} />
              </Link>
            </div>
            <div className="h-cta-checks">
              {['No credit card required', '14-day free trial', 'Cancel anytime'].map((c) => (
                <span key={c} className="h-cta-check">
                  <CheckCircle2 size={15} style={{ color: '#22c55e' }} /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* ── TRUSTED BY ─────────────────────────────────────────── */}
      <section className="h-trusted">
        <div className="h-container">
          <p className="h-trusted-lbl">Trusted by growing businesses worldwide</p>
          <div className="h-trusted-logos">
            {[
              { icon: '🏥', name: 'HealthPlus' },
              { icon: '🚀', name: 'NovaCorp' },
              { icon: '🧬', name: 'BioSynth' },
              { icon: '🎓', name: 'EduGroup' },
              { icon: '🚛', name: 'LogiTrans' },
              { icon: '🏦', name: 'FinBridge' },
            ].map((l) => (
              <div key={l.name} className="h-trusted-logo">
                <span>{l.icon}</span> {l.name}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;