import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import "../styles/Home.css";
import { Boxes, Globe, GraduationCap, ShoppingCart, Users } from "lucide-react";

const Typewriter: React.FC<{
  text: string;
  speed?: number;
  className?: string;
}> = ({ text, speed = 60, className }) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (index < text.length) {
      const t = setTimeout(() => setIndex((v) => v + 1), speed);
      return () => clearTimeout(t);
    }
  }, [index, text, speed]);
  return (
    <span className={className ? className + " typewriter" : "typewriter"}>
      {text.slice(0, index)}
      <span className="caret" aria-hidden="true"></span>
    </span>
  );
};

const apps = [
  {
    name: "Website",
    // icon: <i className="fa-solid fa-globe" aria-hidden="true"></i>,
    icon: <Globe />,
    color: "#0984E3",
  },
  {
    name: "Purchase",
    // icon: <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>,
    icon: <ShoppingCart />,
    color: "#00B894",
  },
  {
    name: "Inventory",
    // icon: <i className="fa-solid fa-box" aria-hidden="true"></i>,
    icon: <Boxes />,
    color: "#E17055",
  },
  {
    name: "HR",
    // icon: <i className="fa-solid fa-user" aria-hidden="true"></i>,
    icon: <Users />,
    color: "#A29BFE",
  },
  {
    name: "Exam",
    icon: <GraduationCap />,
    color: "#6C5CE7",
  },
  // {
  //   name: "Accounting",
  //   icon: <i className="fa-solid fa-coins" aria-hidden="true"></i>,
  //   color: "#FF6B6B",
  // },
  // {
  //   name: "Knowledge",
  //   icon: <i className="fa-solid fa-book" aria-hidden="true"></i>,
  //   color: "#4ECDC4",
  // },
  // {
  //   name: "Sign",
  //   icon: <i className="fa-solid fa-pen" aria-hidden="true"></i>,
  //   color: "#45B7D1",
  // },
  // {
  //   name: "CRM",
  //   icon: <i className="fa-solid fa-users" aria-hidden="true"></i>,
  //   color: "#96CEB4",
  // },
  // {
  //   name: "Studio",
  //   icon: <i className="fa-solid fa-palette" aria-hidden="true"></i>,
  //   color: "#FFEAA7",
  // },
  // {
  //   name: "Subscriptions",
  //   icon: <i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i>,
  //   color: "#DFE6E9",
  // },
  // {
  //   name: "Rental",
  //   icon: <i className="fa-solid fa-key" aria-hidden="true"></i>,
  //   color: "#74B9FF",
  // },
  // {
  //   name: "Point of Sale",
  //   icon: <i className="fa-solid fa-store" aria-hidden="true"></i>,
  //   color: "#A29BFE",
  // },
  // {
  //   name: "Discuss",
  //   icon: <i className="fa-solid fa-comments" aria-hidden="true"></i>,
  //   color: "#FD79A8",
  // },
  // {
  //   name: "Documents",
  //   icon: <i className="fa-regular fa-file-lines" aria-hidden="true"></i>,
  //   color: "#FDCB6E",
  // },
  // {
  //   name: "Project",
  //   icon: <i className="fa-solid fa-chart-column" aria-hidden="true"></i>,
  //   color: "#6C5CE7",
  // },
  // {
  //   name: "Timesheets",
  //   icon: <i className="fa-solid fa-stopwatch" aria-hidden="true"></i>,
  //   color: "#0984E3",
  // },
  // {
  //   name: "Field Service",
  //   icon: <i className="fa-solid fa-bolt" aria-hidden="true"></i>,
  //   color: "#E17055",
  // },
  // {
  //   name: "Planning",
  //   icon: <i className="fa-solid fa-calendar-days" aria-hidden="true"></i>,
  //   color: "#00B894",
  // },
  // {
  //   name: "Helpdesk",
  //   icon: <i className="fa-solid fa-headphones" aria-hidden="true"></i>,
  //   color: "#00CEC9",
  // },

  // {
  //   name: "Social Marketing",
  //   icon: <i className="fa-solid fa-heart" aria-hidden="true"></i>,
  //   color: "#FD79A8",
  // },
  // {
  //   name: "Email Marketing",
  //   icon: <i className="fa-solid fa-envelope" aria-hidden="true"></i>,
  //   color: "#6C5CE7",
  // },

  // {
  //   name: "Manufacturing",
  //   icon: <i className="fa-solid fa-industry" aria-hidden="true"></i>,
  //   color: "#00CEC9",
  // },
  // {
  //   name: "Sales",
  //   icon: <i className="fa-solid fa-chart-line" aria-hidden="true"></i>,
  //   color: "#FDCB6E",
  // },

  // {
  //   name: "Dashboard",
  //   icon: <i className="fa-solid fa-gauge" aria-hidden="true"></i>,
  //   color: "#74B9FF",
  // },
];

const features = [
  {
    icon: <i className="fa-solid fa-chart-column" aria-hidden="true"></i>,
    title: "Analytics",
    description: "Get detailed insights and analytics for your business.",
  },
  {
    icon: <i className="fa-solid fa-bolt" aria-hidden="true"></i>,
    title: "Performance",
    description: "Lightning fast performance for all your business needs.",
  },
  {
    icon: <i className="fa-solid fa-lock" aria-hidden="true"></i>,
    title: "Security",
    description: "Enterprise-grade security to protect your data.",
  },
  {
    icon: <i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i>,
    title: "Integration",
    description: "Seamlessly integrate with your favorite tools.",
  },
];

const techPlatforms = [
  {
    name: "Shop Floor",
    image: <i className="fa-solid fa-industry" aria-hidden="true"></i>,
    description: "Manage your shop floor operations",
  },

  {
    name: "Expenses",
    image: <i className="fa-solid fa-credit-card" aria-hidden="true"></i>,
    description: "Track and manage expenses",
  },
  {
    name: "Point of Sale",
    image: <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>,
    description: "Complete POS solution",
  },
  {
    name: "IoT",
    image: <i className="fa-solid fa-satellite" aria-hidden="true"></i>,
    description: "IoT device integration",
  },
  {
    name: "Kiosk",
    image: <i className="fa-solid fa-desktop" aria-hidden="true"></i>,
    description: "Self-service kiosk",
  },
  {
    name: "Barcode Scanner",
    image: (
      <i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i>
    ),
    description: "Mobile scanning solution",
  },
];

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "Dashboard" | "Analytics" | "Reports"
  >("Dashboard");

  const chartSeries: Record<string, number[]> = {
    Dashboard: [10, 22, 18, 34, 28, 36, 31, 42, 38, 46, 52, 60],
    Analytics: [8, 12, 9, 18, 16, 22, 19, 24, 21, 27, 26, 32],
  };

  const data = chartSeries[activeTab] || chartSeries["Dashboard"];
  const max = Math.max(...data) || 1;
  const xStep = 100 / (data.length - 1);
  const pointsAttr = data
    .map((y, i) => {
      const x = i * xStep;
      const yScaled = 100 - ((y / max) * 80 + 10);
      return `${x},${yScaled}`;
    })
    .join(" ");

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title-animated">
            <Typewriter text="Business Solutions Made Simple" speed={35} />
          </h1>
          <p className="hero-subtitle">
            <Typewriter
              text="Streamline your operations with our powerful suite of business tools designed for modern enterprises."
              speed={16}
            />
          </p>
          <div className="hero-cta">
            <Link
              to="/choose-apps"
              className="btn btn-primary btn-large"
              style={{
                background: "linear-gradient(180deg, #f97316 0%, #ea580c 100%)",
                color: "#fff",
                border: "none",
                boxShadow: "0 12px 24px rgba(234, 88, 12, 0.25)",
                borderRadius: 10,
              }}
            >
              Get Started
            </Link>
            <Link
              to="/learn-more"
              className="btn btn-outline btn-large"
              style={{
                background: "#ffffff",
                borderColor: "#e5e7eb",
                color: "#1f2937",
                borderRadius: 10,
                boxShadow: "0 8px 20px rgba(0,0,0,0.04)",
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <Link to="/" style={{ display: "block" }}>
            <div className="dashboard-preview hero-float">
              {/* Placeholder for dashboard image */}
              <div className="dashboard-placeholder">
                <div className="dashboard-header">
                  <div className="dashboard-tabs">
                    <span
                      className={`tab ${
                        activeTab === "Dashboard" ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveTab("Dashboard");
                      }}
                    >
                      Dashboard
                    </span>
                    <span
                      className={`tab ${
                        activeTab === "Analytics" ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveTab("Analytics");
                      }}
                    >
                      Analytics
                    </span>
                    <span
                      className={`tab ${
                        activeTab === "Reports" ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveTab("Reports");
                      }}
                    >
                      Reports
                    </span>
                  </div>
                </div>
                <div className="dashboard-content">
                  {activeTab !== "Reports" ? (
                    <>
                      <div className="metric-cards">
                        {activeTab === "Dashboard" ? (
                          <>
                            <div className="metric-card">
                              <div className="metric-value">1,240</div>
                              <div className="metric-label">Active Users</div>
                            </div>
                            <div className="metric-card">
                              <div className="metric-value">89%</div>
                              <div className="metric-label">Uptime</div>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="metric-card">
                              <div className="metric-value">3.7k</div>
                              <div className="metric-label">Visitors</div>
                            </div>
                            <div className="metric-card">
                              <div className="metric-value">24%</div>
                              <div className="metric-label">Conversion</div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="chart-placeholder">
                        <div className="chart-line"></div>
                        <svg
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          style={{ position: "absolute", inset: 0, zIndex: 1 }}
                        >
                          <defs>
                            <linearGradient
                              id="lineFill"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="var(--primary-color)"
                                stopOpacity="0.35"
                              />
                              <stop
                                offset="100%"
                                stopColor="var(--primary-color)"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                          <polyline
                            points={pointsAttr}
                            fill="none"
                            stroke="var(--primary-color)"
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                          <polygon
                            points={`0,100 ${pointsAttr} 100,100`}
                            fill="url(#lineFill)"
                          />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div className="report-card">
                      <span className="report-status">Reports</span>
                      <h3>Monthly report</h3>
                      <p>Your performance report is ready to download</p>
                      <a
                        href="reports/monthly-report.pdf"
                        target="_blank"
                        className="btn btn-primary report-download"
                        download
                        onClick={(e) => e.stopPropagation()}
                      >
                        <i className="fa fa-download" aria-hidden="true" />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Apps Grid Section */}
      <section className="apps-section">
        <div className="apps-container">
          <div className="apps-grid">
            {apps.map((app, index) => (
              <div key={index} className="app-card">
                <div
                  className="app-icon-wrapper"
                  // style={{ backgroundColor: app.color }}
                >
                  <span className="app-icon" style={{ color: app.color }}>
                    {app.icon}
                  </span>
                </div>
                <h3 className="app-name">{app.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apps Info Section */}
      <section className="apps-info-section">
        <div className="apps-info-container">
          <h2 className="apps-info-title">
            Imagine a vast collection of business apps at your disposal.
          </h2>
          <p className="apps-info-subtitle">
            Got something to improve? There is an app for that.
          </p>
          <p className="apps-info-subtitle">
            No complexity, no cost, just a one-click install.
          </p>

          <div className="apps-info-description">
            <p>Each app simplifies a process and empowers more people.</p>
            <p>
              Imagine the impact when everyone gets the right tool for the job,
              with perfect integration.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Powerful Features</h2>
          <p>Everything you need to grow your business</p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center", margin: "0 0 20px" }}>
            What our customers say
          </h2>
          <div className="testimonials-grid">
            {[
              {
                q: "Switched from 7 tools to 1 — onboarding dropped from weeks to days.",
                a: "Ops Director, Acme Retail",
              },
              {
                q: "Revenue ops finally runs on one source of truth. Team loves the UX.",
                a: "Head of RevOps, Northwind Labs",
              },
              {
                q: "Dashboards gave us visibility we were missing. Decisions are faster.",
                a: "COO, Globex Services",
              },
            ].map((t) => (
              <div className="card testimonial-mini" key={t.a}>
                <p className="testimonial-quote-mini">“{t.q}”</p>
                <p className="testimonial-author-mini">{t.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section">
        <div className="container">
          <h2 style={{ textAlign: "center", margin: "0 0 20px" }}>
            Frequently asked questions
          </h2>
          <div className="faq-grid">
            {[
              {
                q: "How fast can we get started?",
                a: "Most teams set up in under a day using a starter template.",
              },
              {
                q: "Do we need to migrate data?",
                a: "Import CSVs or use the API. Start small and expand with no re‑platforming.",
              },
              {
                q: "Is there a free trial?",
                a: "Yes — invite teammates and explore core features during the trial.",
              },
              {
                q: "Can we add more apps later?",
                a: "Absolutely. Add modules anytime — all apps share one data model.",
              },
              {
                q: "How secure is it?",
                a: "Encryption in transit/at rest, RBAC/SSO, audit logs, and backups by default.",
              },
              {
                q: "Do you integrate with our tools?",
                a: "Yes — email, payments, storage, messaging, and custom APIs/webhooks.",
              },
            ].map((f) => (
              <div className="faq-item-card" key={f.q}>
                <div className="faq-q">{f.q}</div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-text">
              <h3>Run your business on one platform</h3>
              <p>
                Start free today — add apps as you grow. No migrations, no
                chaos.
              </p>
            </div>
            <div className="cta-actions">
              <Link
                to="/choose-apps"
                className="btn btn-primary"
                style={{
                  background:
                    "linear-gradient(180deg, #f97316 0%, #ea580c 100%)",
                  color: "#fff",
                  border: "none",
                  boxShadow: "0 10px 24px rgba(234, 88, 12, 0.25)",
                  borderRadius: 10,
                }}
              >
                Get started
              </Link>
              <Link
                to="/learn-more"
                className="btn btn-secondary"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  color: "#1f2937",
                  borderRadius: 10,
                }}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Platform Section */}
      <section className="tech-platform-section">
        <div className="tech-platform-container">
          <h2 className="tech-platform-title">
            <span className="highlight-text">All the tech</span> in one platform
          </h2>
          <div className="tech-grid">
            {techPlatforms.map((platform, index) => (
              <div key={index} className="tech-card">
                <div className="tech-image-wrapper">
                  <div className="tech-image-bg"></div>
                  <div className="tech-image">{platform.image}</div>
                </div>
                <h3 className="tech-name">{platform.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
