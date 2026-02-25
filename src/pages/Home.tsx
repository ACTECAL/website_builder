import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { appModules } from "../data/appModules";
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
  BarChart3,
  ShieldCheck,
  Zap,
  Layers,
  TrendingUp,
  Monitor,
  Box
} from "lucide-react";

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Dashboard" | "Analytics" | "Reports">("Dashboard");
  const [isIntegrated, setIsIntegrated] = useState(true);

  // Icon mapping for featured apps
  const iconMap: Record<string, React.ReactNode> = {
    'accounting': <Activity size={28} />,
    'crm': <Users size={28} />,
    'sales': <TrendingUp size={28} />,
    'inventory': <Box size={28} />,
    'manufacturing': <Cpu size={28} />,
    'website-builder': <Monitor size={28} />,
    'ecommerce': <ShoppingCart size={28} />,
    'project': <Layers size={28} />,
    'timesheets': <MousePointer2 size={28} />,
    'helpdesk': <ShieldCheck size={28} />,
    'hr': <Users size={28} />,
    'marketing-automation': <Mail size={28} />
  };

  const featuredAppSlugs = [
    'accounting', 'crm', 'sales', 'inventory', 'manufacturing',
    'website-builder', 'ecommerce', 'project', 'timesheets',
    'helpdesk', 'hr', 'marketing-automation'
  ];

  const featuredApps = appModules.filter(app => featuredAppSlugs.includes(app.slug));

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="pricing-badge">Free for 1 user, forever</div>
            <h1 className="hero-title">
              Manage your entire business <br />
              <span className="accent-text">with one platform.</span>
              <span className="handwritten-accent">integrated</span>
            </h1>
            <p className="hero-subtitle">
              The world's easiest all-in-one management software. <br />
              User-friendly, affordable, and highly customizable.
            </p>
            <div className="hero-cta">
              <Link to="/choose-apps" className="btn btn-primary btn-large">
                Start now — It's free
              </Link>
              <Link to="/meet-an-advisor" className="btn btn-secondary btn-large">
                Meet an advisor
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="dashboard-window hero-float">
              <div className="window-header">
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="window-tabs">
                  <button className={activeTab === 'Dashboard' ? 'active' : ''} onClick={() => setActiveTab('Dashboard')}>Dashboard</button>
                  <button className={activeTab === 'Analytics' ? 'active' : ''} onClick={() => setActiveTab('Analytics')}>Analytics</button>
                </div>
              </div>
              <div className="window-body">
                <div className="mock-grid">
                  <div className="mock-card">
                    <div className="mock-label">Monthly Revenue</div>
                    <div className="mock-value">$124,500</div>
                    <div className="mock-trend positive">+14%</div>
                  </div>
                  <div className="mock-card">
                    <div className="mock-label">Active Orders</div>
                    <div className="mock-value">842</div>
                    <div className="mock-trend positive">+8%</div>
                  </div>
                  <div className="mock-chart">
                    <div className="chart-bars">
                      {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                        <div key={i} className="bar" style={{ height: `${h}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Marquee */}
      <section className="marquee-section">
        <div className="marquee-container">
          <div className="marquee-content">
            <span>TRUSTED BY OVER 12,000+ COMPANIES WORLDWIDE</span>
            <div className="logo-placeholder">MICROSOFT</div>
            <div className="logo-placeholder">ADOBE</div>
            <div className="logo-placeholder">TESLA</div>
            <div className="logo-placeholder">NETFLIX</div>
            <div className="logo-placeholder">AIRBNB</div>
            <div className="logo-placeholder">UBER</div>
          </div>
        </div>
      </section>

      {/* App Grid Section */}
      <section className="apps-grid-section">
        <div className="container">
          <div className="section-header-lite">
            <div className="badge-alt">The Complete Suite</div>
            <h2>Everything you need, <br />in one simplified suite</h2>
            <p>Ditch the fragmented apps. Get a unified system that grows with you.</p>
          </div>

          <div className="apps-grid-wrapper">
            <div className="apps-grid">
              {featuredApps.map((app, index) => (
                <Link
                  to={`/apps/${app.slug}`}
                  key={app.slug}
                  className="app-card"
                  style={{ '--delay': `${index * 100}ms` } as React.CSSProperties}
                >
                  <div className="app-icon-box">
                    <div className="app-icon-placeholder" style={{ backgroundColor: `var(--color-primary-lighter)` }}>
                      {iconMap[app.slug] || <Box size={28} color="var(--color-primary)" />}
                    </div>
                  </div>
                  <h3 className="app-name-label">{app.name}</h3>
                </Link>
              ))}
              <Link
                to="/choose-apps"
                className="app-card view-all"
                style={{ '--delay': `${featuredApps.length * 100}ms` } as React.CSSProperties}
              >
                <div className="app-icon-box">
                  <div className="app-icon-placeholder more">
                    <ArrowRight size={28} />
                  </div>
                </div>
                <h3 className="app-name-label">View all apps</h3>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Integrated vs Fragmented */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header-lite">
            <h2 className="title-handwritten">Imagine without Nexora <span className="handwritten-accent alt">fragmented</span></h2>
            <div className="toggle-switch-container">
              <span className={!isIntegrated ? 'active-label' : ''}>Traditional</span>
              <div className={`toggle-switch ${isIntegrated ? 'on' : ''}`} onClick={() => setIsIntegrated(!isIntegrated)}>
                <div className="toggle-knob"></div>
              </div>
              <span className={isIntegrated ? 'active-label' : ''}>Nexora</span>
            </div>
          </div>

          <div className={`comparison-content ${isIntegrated ? 'integrated' : 'fragmented'}`}>
            <div className="comparison-card fragmented-view">
              <div className="pain-points">
                <div className="pain-item"><XCircle color="#ff5f57" size={20} /> Manual data reentry between apps</div>
                <div className="pain-item"><XCircle color="#ff5f57" size={20} /> Expensive multi-vendor subscriptions</div>
                <div className="pain-item"><XCircle color="#ff5f57" size={20} /> Fragmented team workflows</div>
                <div className="pain-item"><XCircle color="#ff5f57" size={20} /> Messy API integrations that break</div>
              </div>
              <div className="pain-visual">
                <div className="messy-nodes">
                  <div className="m-node">App A</div>
                  <div className="m-node">App B</div>
                  <div className="m-node">App C</div>
                  <div className="m-node">App D</div>
                </div>
              </div>
            </div>

            <div className="comparison-card integrated-view">
              <div className="solution-points">
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Zero manual entry — data flows instantly</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> One predictable, affordable price</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Unified UX means zero retraining</div>
                <div className="solution-item"><CheckCircle2 color="#28c940" size={20} /> Built-in security & compliance</div>
              </div>
              <div className="solution-visual">
                <div className="clean-nodes">
                  <div className="c-node core">Nexora</div>
                  <div className="c-node sub">All Apps</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop: Integrated Section */}
      <section className="value-prop-section">
        <div className="container">
          <div className="prop-row">
            <div className="prop-text">
              <div className="badge-alt">Unified Platform</div>
              <h2>Integrated by design, <br />not by accident.</h2>
              <p>
                When you install a new app, it's already connected to your existing data.
                Accounting talks to Sales. Inventory talks to Manufacturing.
              </p>
              <ul className="prop-list">
                <li><Zap size={18} /> Real-time sync across all modules</li>
                <li><Layers size={18} /> Single source of truth for your data</li>
                <li><ShieldCheck size={18} /> Consistent team experience</li>
              </ul>
            </div>
            <div className="prop-visual">
              <div className="integration-illustration">
                <div className="node core">ERP</div>
                <div className="node leaf p1">CRM</div>
                <div className="node leaf p2">FIN</div>
                <div className="node leaf p3">HR</div>
                <div className="node leaf p4">INV</div>
                <div className="connection c1"></div>
                <div className="connection c2"></div>
                <div className="connection c3"></div>
                <div className="connection c4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="why-us-section">
        <div className="container">
          <div className="why-grid">
            <div className="why-item">
              <BarChart3 size={32} className="why-icon" />
              <h3>Data-Driven</h3>
              <p>Advanced BI dashboards for every single module, out of the box.</p>
            </div>
            <div className="why-item">
              <TrendingUp size={32} className="why-icon" />
              <h3>Scalable</h3>
              <p>Start with one app. Add more as your business reaches new heights.</p>
            </div>
            <div className="why-item">
              <Monitor size={32} className="why-icon" />
              <h3>Modern UI</h3>
              <p>The cleanest interface in the ERP market, designed for speed.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="cta-content-box">
            <h2>Ready to transform your business?</h2>
            <p>Join the thousands of companies that switched for a better UX.</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-large">Start your free trial</Link>
              <Link to="/meet-an-advisor" className="btn btn-secondary btn-large">View pricing</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
