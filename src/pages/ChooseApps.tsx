import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/ChooseApps.css";

type Tile = { key: string; label: string; icon: string; color?: string; desc?: string; popular?: boolean };
type Category = { name: string; icon: string; tiles: Tile[] };

const CATEGORIES: Category[] = [
  {
    name: "Website",
    icon: "fa-solid fa-globe",
    tiles: [
      { key: "website", label: "Website", icon: "fa-solid fa-globe", color: "#06b6d4", desc: "Build stunning, SEO-ready websites", popular: true },
      { key: "ecommerce", label: "eCommerce", icon: "fa-solid fa-cart-shopping", color: "#a855f7", desc: "Full-featured online store", popular: true },
      { key: "blog", label: "Blog", icon: "fa-solid fa-pen-nib", color: "#ef4444", desc: "Publish rich editorial content" },
      { key: "forum", label: "Forum", icon: "fa-solid fa-comments", color: "#10b981", desc: "Community-driven discussions" },
      { key: "elearning", label: "eLearning", icon: "fa-solid fa-graduation-cap", color: "#22c55e", desc: "Deliver and monetize courses" },
      { key: "events", label: "Events", icon: "fa-solid fa-calendar-days", color: "#f97316", desc: "Plan and sell ticketed events" },
    ],
  },
  {
    name: "Sales",
    icon: "fa-solid fa-chart-line",
    tiles: [
      { key: "crm", label: "CRM", icon: "fa-solid fa-users", color: "#14b8a6", desc: "Manage leads, pipelines & deals", popular: true },
      { key: "sales", label: "Sales", icon: "fa-solid fa-chart-line", color: "#a855f7", desc: "Automate quotes and orders" },
      { key: "pos", label: "Point of Sale", icon: "fa-solid fa-store", color: "#f59e0b", desc: "Retail & restaurant in-store POS" },
      { key: "restaurant", label: "Restaurant", icon: "fa-solid fa-utensils", color: "#f97316", desc: "Table & menu management" },
      { key: "subscriptions", label: "Subscriptions", icon: "fa-solid fa-arrows-rotate", color: "#06b6d4", desc: "Automate recurring billing" },
      { key: "rental", label: "Rental", icon: "fa-solid fa-key", color: "#8b5cf6", desc: "Track rentals and returns" },
    ],
  },
  {
    name: "Finance",
    icon: "fa-solid fa-coins",
    tiles: [
      { key: "invoicing", label: "Invoicing", icon: "fa-solid fa-file-invoice-dollar", color: "#3b82f6", desc: "Send professional invoices fast", popular: true },
      { key: "accounting", label: "Accounting", icon: "fa-solid fa-coins", color: "#10b981", desc: "Complete double-entry accounting", popular: true },
      { key: "expenses", label: "Expenses", icon: "fa-solid fa-wallet", color: "#06b6d4", desc: "Track and approve expenses" },
      { key: "sign", label: "Sign", icon: "fa-solid fa-signature", color: "#0ea5e9", desc: "eSign documents instantly" },
      { key: "equity", label: "Equity", icon: "fa-solid fa-chart-pie", color: "#f59e0b", desc: "Cap table & share management" },
      { key: "esg", label: "ESG", icon: "fa-solid fa-leaf", color: "#22c55e", desc: "Sustainability reporting" },
    ],
  },
  {
    name: "Services",
    icon: "fa-solid fa-headphones",
    tiles: [
      { key: "project", label: "Project", icon: "fa-solid fa-diagram-project", color: "#10b981", desc: "Plan & execute projects on time", popular: true },
      { key: "timesheets", label: "Timesheets", icon: "fa-solid fa-stopwatch", color: "#64748b", desc: "Log and approve team hours" },
      { key: "field-service", label: "Field Service", icon: "fa-solid fa-bolt", color: "#f59e0b", desc: "Dispatch technicians on-site" },
      { key: "helpdesk", label: "Helpdesk", icon: "fa-solid fa-headphones", color: "#10b981", desc: "Resolve tickets with SLA tracking" },
      { key: "appointments", label: "Appointments", icon: "fa-solid fa-calendar-check", color: "#a855f7", desc: "Online booking & scheduling" },
      { key: "planning", label: "Planning", icon: "fa-solid fa-calendar-days", color: "#22c55e", desc: "Shift planning & resource allocation" },
    ],
  },
  {
    name: "Productivity",
    icon: "fa-solid fa-bolt",
    tiles: [
      { key: "documents", label: "Documents", icon: "fa-regular fa-file-lines", color: "#f97316", desc: "Centralize all files & contracts" },
      { key: "approvals", label: "Approvals", icon: "fa-solid fa-circle-check", color: "#22c55e", desc: "Streamline multi-step approvals" },
      { key: "knowledge", label: "Knowledge", icon: "fa-solid fa-book", color: "#0ea5e9", desc: "Internal wiki & team docs" },
    ],
  },
  {
    name: "Supply Chain",
    icon: "fa-solid fa-industry",
    tiles: [
      { key: "inventory", label: "Inventory", icon: "fa-solid fa-box", color: "#a855f7", desc: "Real-time multi-warehouse stock", popular: true },
      { key: "manufacturing", label: "Manufacturing", icon: "fa-solid fa-industry", color: "#10b981", desc: "Production orders, BOM & MRP" },
      { key: "purchase", label: "Purchase", icon: "fa-solid fa-cart-shopping", color: "#22c55e", desc: "Vendor management & POs" },
      { key: "maintenance", label: "Maintenance", icon: "fa-solid fa-screwdriver-wrench", color: "#0ea5e9", desc: "Preventive & corrective maintenance" },
      { key: "quality", label: "Quality", icon: "fa-solid fa-circle-check", color: "#f59e0b", desc: "QA checks, alerts & reporting" },
      { key: "repair", label: "Repair", icon: "fa-solid fa-wrench", color: "#ef4444", desc: "After-sales repair orders" },
    ],
  },
  {
    name: "Marketing",
    icon: "fa-solid fa-envelope",
    tiles: [
      { key: "email-marketing", label: "Email Marketing", icon: "fa-solid fa-envelope", color: "#3b82f6", desc: "Design & send email campaigns" },
      { key: "sms-marketing", label: "SMS Marketing", icon: "fa-solid fa-comment-dots", color: "#06b6d4", desc: "Mass SMS at scale" },
      { key: "survey", label: "Survey", icon: "fa-solid fa-chart-simple", color: "#8b5cf6", desc: "Collect actionable feedback" },
      { key: "social-marketing", label: "Social Marketing", icon: "fa-solid fa-heart", color: "#f97316", desc: "Schedule posts across platforms" },
    ],
  },
  {
    name: "Human Resources",
    icon: "fa-solid fa-user-group",
    tiles: [
      { key: "employees", label: "Employees", icon: "fa-solid fa-user-group", color: "#8b5cf6", desc: "Company directory & org chart", popular: true },
      { key: "attendances", label: "Attendances", icon: "fa-solid fa-user-check", color: "#f59e0b", desc: "Clock-in, kiosk & tracking" },
      { key: "recruitment", label: "Recruitment", icon: "fa-solid fa-user-plus", color: "#22c55e", desc: "Applicant tracking & pipeline" },
      { key: "time-off", label: "Time Off", icon: "fa-solid fa-umbrella-beach", color: "#06b6d4", desc: "Leave requests & approvals" },
      { key: "appraisals", label: "Appraisals", icon: "fa-solid fa-star", color: "#f59e0b", desc: "360° performance reviews" },
      { key: "fleet", label: "Fleet", icon: "fa-solid fa-car-side", color: "#a855f7", desc: "Company vehicle management" },
      { key: "payroll", label: "Payroll", icon: "fa-solid fa-file-invoice", color: "#ef4444", desc: "Run payroll & generate payslips" },
    ],
  },
  {
    name: "Customizations",
    icon: "fa-solid fa-screwdriver-wrench",
    tiles: [
      { key: "studio", label: "Studio", icon: "fa-solid fa-screwdriver-wrench", color: "#06b6d4", desc: "Build custom apps with no code" },
    ],
  },
];

const POPULAR_KEYS = ["crm", "accounting", "project", "inventory", "employees", "website"];

export const ChooseApps: React.FC = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const initialSelected = useMemo(() => {
    const v = (search.get("selected") || "").trim();
    if (!v) return [] as string[];
    return Array.from(new Set(v.split(",").map((s) => s.trim()).filter(Boolean)));
  }, [search]);

  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [activeCategory, setActiveCategory] = useState<string>("Popular");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => { setSelected(initialSelected); }, [initialSelected]);

  const tilesMap = useMemo(() => {
    const m = new Map<string, Tile>();
    CATEGORIES.forEach((cat) => cat.tiles.forEach((t) => m.set(t.key, t)));
    return m;
  }, []);

  const toggle = (key: string) => {
    setSelected((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const popularCategory: Category = useMemo(() => ({
    name: "Popular",
    icon: "fa-solid fa-fire",
    tiles: POPULAR_KEYS.map(k => tilesMap.get(k)).filter(Boolean) as Tile[],
  }), [tilesMap]);

  const allCategories = useMemo(() => [popularCategory, ...CATEGORIES], [popularCategory]);

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return allCategories.filter((cat) => cat.name === activeCategory);
    }
    const lower = searchTerm.toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      tiles: cat.tiles.filter(
        (tile) =>
          tile.label.toLowerCase().includes(lower) ||
          tile.key.toLowerCase().includes(lower) ||
          (tile.desc || "").toLowerCase().includes(lower)
      ),
    })).filter((cat) => cat.tiles.length > 0);
  }, [activeCategory, searchTerm, allCategories]);

  const onKeyToggle: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const key = (e.currentTarget as HTMLDivElement).getAttribute("data-key");
      if (key) toggle(key);
    }
  };

  const toggleCategory = (cat: Category) => {
    const catKeys = cat.tiles.map(t => t.key);
    const allSelected = catKeys.every(k => selected.includes(k));
    if (allSelected) {
      setSelected(prev => prev.filter(k => !catKeys.includes(k)));
    } else {
      setSelected(prev => Array.from(new Set([...prev, ...catKeys])));
    }
  };

  const onContinue = () => {
    const qs = selected.length ? `?selected=${encodeURIComponent(selected.join(","))}` : "";
    navigate(`/get-started${qs}`);
  };

  const count = selected.length;

  return (
    <div className="choose-apps-page auth-page">
      {/* Sidebar */}
      <div className="auth-sidebar">
        <div className="auth-sidebar-content">
          <div className="auth-glass-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
            <span>Actyx Enterprise</span>
          </div>

          <div className="auth-ambient-blob blob-1"></div>
          <div className="auth-ambient-blob blob-2"></div>
          <div className="auth-ambient-blob blob-3"></div>

          <div className="auth-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`particle p-${i % 5}`} style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.1 + Math.random() * 0.3
              }}></div>
            ))}
          </div>

          <h2 className="auth-sidebar-title">Build your perfect business stack.</h2>
          <p className="auth-sidebar-subtitle">Choose the tools that fit your workflow — all connected out of the box.</p>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div className="auth-feature-text">Integrated App Ecosystem</div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <div className="auth-feature-text">Enterprise-Grade Security</div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L7 22l2-10H1L13 2z" /></svg>
              </div>
              <div className="auth-feature-text">Ultra-Fast Cloud Infrastructure</div>
            </div>
          </div>

          {count > 0 && (
            <div className="sidebar-apps-count">
              <div className="sidebar-count-badge">{count}</div>
              <span>{count === 1 ? "app" : "apps"} selected</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="auth-form-container choose-apps-content-wrapper">
        <div className="auth-form-box choose-apps-form-box">

          {/* Step indicator */}
          <div className="choose-step-indicator stagger-0">
            <div className="step-item step-done"><div className="step-dot"><i className="fa-solid fa-check"></i></div><span>Account</span></div>
            <div className="step-line"></div>
            <div className="step-item step-active"><div className="step-dot"><span>2</span></div><span>Choose Apps</span></div>
            <div className="step-line"></div>
            <div className="step-item"><div className="step-dot"><span>3</span></div><span>Setup</span></div>
          </div>

          <header className="choose-head stagger-0">
            <div className="choose-head-row">
              <div>
                <h1 className="auth-title">Choose your apps</h1>
                <p className="auth-subtitle">Pick the tools you need — everything connects automatically.</p>
              </div>
              {count > 0 && (
                <div className="choose-count-pill" onClick={onContinue} title="Continue">
                  <span className="count-num">{count}</span>
                  <span className="count-label">{count === 1 ? "app" : "apps"}</span>
                  <i className="fa-solid fa-arrow-right count-arrow"></i>
                </div>
              )}
            </div>
          </header>

          <div className="choose-search-container stagger-1">
            <div className="choose-search-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                placeholder="Search apps by name or feature..."
                className="choose-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="search-clear-btn" onClick={() => setSearchTerm("")} title="Clear">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          <div className="choose-tabs-wrapper stagger-2">
            <div className="choose-tabs">
              {allCategories.map((cat) => {
                const catSelected = cat.tiles.filter(t => selected.includes(t.key)).length;
                return (
                  <button
                    key={cat.name}
                    className={`choose-tab ${activeCategory === cat.name && !searchTerm ? "tab-active" : ""}`}
                    onClick={() => { setActiveCategory(cat.name); setSearchTerm(""); }}
                  >
                    <i className={`${cat.icon} tab-icon`}></i>
                    {cat.name}
                    {catSelected > 0 && <span className="tab-count">{catSelected}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="choose-layout stagger-3">
            <div className="choose-main">
              {searchTerm && (
                <div className="search-count-bar">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  {filteredCategories.reduce((acc, c) => acc + c.tiles.length, 0)} results for "<strong>{searchTerm}</strong>"
                </div>
              )}
              {!searchTerm && activeCategory === "Popular" && (
                <div className="popular-banner">
                  <div className="popular-banner-icon"><i className="fa-solid fa-fire"></i></div>
                  <div>
                    <div className="popular-banner-title">Popular starter pack</div>
                    <div className="popular-banner-sub">These 6 apps are chosen together by 80% of businesses to get started.</div>
                  </div>
                </div>
              )}
              {filteredCategories.map((cat) => {
                const catKeys = cat.tiles.map((t) => t.key);
                const allSelected = catKeys.length > 0 && catKeys.every((k) => selected.includes(k));

                return (
                  <div key={cat.name} className="choose-cat">
                    {searchTerm && (
                      <div className="search-result-category-header">
                        <h3 className="search-result-category">
                          <i className={cat.icon}></i> {cat.name}
                        </h3>
                        <button className="cat-select-all-btn" onClick={() => toggleCategory(cat)}>
                          {allSelected ? "Deselect all" : "Select all"}
                        </button>
                      </div>
                    )}
                    {!searchTerm && activeCategory !== "Popular" && (
                      <div className="search-result-category-header">
                        <h3 className="search-result-category">
                          <i className={cat.icon}></i> {cat.name} Apps
                        </h3>
                        <button className="cat-select-all-btn" onClick={() => toggleCategory(cat)}>
                          {allSelected ? "Deselect all" : "Select all"}
                        </button>
                      </div>
                    )}
                    <div className="choose-grid">
                      {cat.tiles.map((t, idx) => {
                        const isSel = selected.includes(t.key);
                        const staggerClass = `stagger-item-${Math.min(idx, 12)}`;

                        return (
                          <div
                            key={t.key}
                            className={`choose-tile ${isSel ? "tile-selected" : ""} ${staggerClass}`}
                            role="button"
                            tabIndex={0}
                            aria-pressed={isSel ? "true" : "false"}
                            data-key={t.key}
                            onClick={() => toggle(t.key)}
                            onKeyDown={onKeyToggle}
                            style={{ "--accent-color": t.color } as React.CSSProperties}
                          >
                            <div className="choose-tile-shimmer"></div>

                            <div className="choose-icon-wrapper">
                              <div className="choose-icon-glow"></div>
                              <div className="choose-icon">
                                <i className={t.icon} style={{ color: t.color }} aria-hidden="true"></i>
                              </div>
                            </div>

                            <div className="choose-tile-text">
                              <div className="choose-label-row">
                                <div className="choose-label">{t.label}</div>
                                {t.popular && !searchTerm && activeCategory !== "Popular" && (
                                  <span className="popular-chip">Popular</span>
                                )}
                              </div>
                              {t.desc && <div className="choose-desc">{t.desc}</div>}
                            </div>

                            <div
                              className={`choose-check ${isSel ? "check-active" : ""}`}
                              style={{ 
                                backgroundColor: isSel ? 'var(--accent-color)' : 'transparent', 
                                borderColor: isSel ? 'var(--accent-color)' : '#dde3ed' 
                              }}
                            >
                              {isSel && <i className="fa-solid fa-check"></i>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              {filteredCategories.length === 0 && (
                <div className="no-results">
                  <div className="no-results-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <p>
                    No apps matching "<strong>{searchTerm}</strong>"
                  </p>
                  <button className="clear-search-link" onClick={() => setSearchTerm("")}>
                    Clear search
                  </button>
                </div>
              )}
            </div>
          </div>

        {/* Floating Selection Panel */}
        {count > 0 && (
          <aside className="choose-aside">
            <div className="choose-selected-header">
              <div className="aside-header-left">
                <div className="aside-count-circle">{count}</div>
                <div>
                  <div className="aside-title">{count === 1 ? "App" : "Apps"} selected</div>
                  <div className="aside-subtitle">Ready to configure</div>
                </div>
              </div>
              <button className="aside-clear-btn" onClick={() => setSelected([])} title="Clear all">
                Clear all
              </button>
            </div>

            <div className="choose-selected-list">
              {selected.map((key) => {
                const t = tilesMap.get(key);
                if (!t) return null;
                return (
                  <div key={key} className="choose-selected-item">
                    <div className="choose-selected-icon-wrap" style={{ backgroundColor: `${t.color}22` }}>
                      <i className={t.icon} style={{ color: t.color }} aria-hidden="true"></i>
                    </div>
                    <div className="choose-selected-label">{t.label}</div>
                    <button className="choose-selected-remove" onClick={() => toggle(key)} title={`Remove ${t.label}`}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="choose-info">
              <i className="fa-solid fa-infinity"></i>
              <span><strong>Free forever</strong> — unlimited users & storage.</span>
            </div>

            <button className="continue-btn" onClick={onContinue}>
              <span>Continue with {count} {count === 1 ? "app" : "apps"}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </aside>
        )}
      </div>
    </div>
  </div>
  );
};

export default ChooseApps;
