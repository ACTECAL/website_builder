import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/ChooseApps.css";

type Tile = { key: string; label: string; icon: string; color?: string };
type Category = { name: string; tiles: Tile[] };

const CATEGORIES: Category[] = [
  {
    name: "Website",
    tiles: [
      {
        key: "website",
        label: "Website",
        icon: "fa-solid fa-globe",
        color: "#06b6d4",
      },
      {
        key: "ecommerce",
        label: "eCommerce",
        icon: "fa-solid fa-cart-shopping",
        color: "#a855f7",
      },
      {
        key: "blog",
        label: "Blog",
        icon: "fa-solid fa-pen-nib",
        color: "#ef4444",
      },
      {
        key: "forum",
        label: "Forum",
        icon: "fa-solid fa-comments",
        color: "#10b981",
      },
      {
        key: "elearning",
        label: "eLearning",
        icon: "fa-solid fa-graduation-cap",
        color: "#22c55e",
      },
      {
        key: "events",
        label: "Events",
        icon: "fa-solid fa-calendar-days",
        color: "#f97316",
      },
    ],
  },
  {
    name: "Sales",
    tiles: [
      { key: "crm", label: "CRM", icon: "fa-solid fa-users", color: "#14b8a6" },
      {
        key: "sales",
        label: "Sales",
        icon: "fa-solid fa-chart-line",
        color: "#a855f7",
      },
      {
        key: "pos",
        label: "Point of Sale",
        icon: "fa-solid fa-store",
        color: "#f59e0b",
      },
      {
        key: "restaurant",
        label: "Restaurant",
        icon: "fa-solid fa-utensils",
        color: "#f97316",
      },
      {
        key: "subscriptions",
        label: "Subscriptions",
        icon: "fa-solid fa-arrows-rotate",
        color: "#06b6d4",
      },
      {
        key: "rental",
        label: "Rental",
        icon: "fa-solid fa-key",
        color: "#8b5cf6",
      },
    ],
  },
  {
    name: "Finance",
    tiles: [
      {
        key: "invoicing",
        label: "Invoicing",
        icon: "fa-solid fa-file-invoice-dollar",
        color: "#3b82f6",
      },
      {
        key: "accounting",
        label: "Accounting",
        icon: "fa-solid fa-coins",
        color: "#10b981",
      },
      {
        key: "expenses",
        label: "Expenses",
        icon: "fa-solid fa-wallet",
        color: "#06b6d4",
      },
      {
        key: "sign",
        label: "Sign",
        icon: "fa-solid fa-signature",
        color: "#0ea5e9",
      },
      {
        key: "equity",
        label: "Equity",
        icon: "fa-solid fa-chart-pie",
        color: "#f59e0b",
      },
      { key: "esg", label: "ESG", icon: "fa-solid fa-leaf", color: "#22c55e" },
    ],
  },
  {
    name: "Services",
    tiles: [
      {
        key: "project",
        label: "Project",
        icon: "fa-solid fa-diagram-project",
        color: "#10b981",
      },
      {
        key: "timesheets",
        label: "Timesheets",
        icon: "fa-solid fa-stopwatch",
        color: "#64748b",
      },
      {
        key: "field-service",
        label: "Field Service",
        icon: "fa-solid fa-bolt",
        color: "#f59e0b",
      },
      {
        key: "helpdesk",
        label: "Helpdesk",
        icon: "fa-solid fa-headphones",
        color: "#10b981",
      },
      {
        key: "appointments",
        label: "Appointments",
        icon: "fa-solid fa-calendar-check",
        color: "#a855f7",
      },
      {
        key: "planning",
        label: "Planning",
        icon: "fa-solid fa-calendar-days",
        color: "#22c55e",
      },
    ],
  },
  {
    name: "Productivity",
    tiles: [
      {
        key: "documents",
        label: "Documents",
        icon: "fa-regular fa-file-lines",
        color: "#f97316",
      },
      {
        key: "approvals",
        label: "Approvals",
        icon: "fa-solid fa-circle-check",
        color: "#22c55e",
      },
      {
        key: "knowledge",
        label: "Knowledge",
        icon: "fa-solid fa-book",
        color: "#0ea5e9",
      },
    ],
  },
  {
    name: "Supply Chain",
    tiles: [
      {
        key: "inventory",
        label: "Inventory",
        icon: "fa-solid fa-box",
        color: "#a855f7",
      },
      {
        key: "manufacturing",
        label: "Manufacturing",
        icon: "fa-solid fa-industry",
        color: "#10b981",
      },
      {
        key: "purchase",
        label: "Purchase",
        icon: "fa-solid fa-cart-shopping",
        color: "#22c55e",
      },
      {
        key: "maintenance",
        label: "Maintenance",
        icon: "fa-solid fa-screwdriver-wrench",
        color: "#0ea5e9",
      },
      {
        key: "quality",
        label: "Quality",
        icon: "fa-solid fa-circle-check",
        color: "#f59e0b",
      },
      {
        key: "repair",
        label: "Repair",
        icon: "fa-solid fa-wrench",
        color: "#ef4444",
      },
    ],
  },
  {
    name: "Marketing",
    tiles: [
      {
        key: "email-marketing",
        label: "Email Marketing",
        icon: "fa-solid fa-envelope",
        color: "#3b82f6",
      },
      {
        key: "sms-marketing",
        label: "SMS Marketing",
        icon: "fa-solid fa-comment-dots",
        color: "#06b6d4",
      },
      {
        key: "survey",
        label: "Survey",
        icon: "fa-solid fa-chart-simple",
        color: "#8b5cf6",
      },
      {
        key: "social-marketing",
        label: "Social Marketing",
        icon: "fa-solid fa-heart",
        color: "#f97316",
      },
    ],
  },
  {
    name: "Human Resources",
    tiles: [
      {
        key: "employees",
        label: "Employees",
        icon: "fa-solid fa-user-group",
        color: "#8b5cf6",
      },
      {
        key: "attendances",
        label: "Attendances",
        icon: "fa-solid fa-user-check",
        color: "#f59e0b",
      },
      {
        key: "recruitment",
        label: "Recruitment",
        icon: "fa-solid fa-user-plus",
        color: "#22c55e",
      },
      {
        key: "time-off",
        label: "Time Off",
        icon: "fa-solid fa-umbrella-beach",
        color: "#06b6d4",
      },
      {
        key: "appraisals",
        label: "Appraisals",
        icon: "fa-solid fa-star",
        color: "#f59e0b",
      },
      {
        key: "fleet",
        label: "Fleet",
        icon: "fa-solid fa-car-side",
        color: "#a855f7",
      },
      {
        key: "payroll",
        label: "Payroll",
        icon: "fa-solid fa-file-invoice",
        color: "#ef4444",
      },
    ],
  },
  {
    name: "Customizations",
    tiles: [
      {
        key: "studio",
        label: "Studio",
        icon: "fa-solid fa-screwdriver-wrench",
        color: "#06b6d4",
      },
    ],
  },
];

export const ChooseApps: React.FC = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const initialSelected = useMemo(() => {
    const v = (search.get("selected") || "").trim();
    if (!v) return [] as string[];
    return Array.from(
      new Set(
        v
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      )
    );
  }, [search]);
  const [selected, setSelected] = useState<string[]>(initialSelected);
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES[0].name);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  const tilesMap = useMemo(() => {
    const m = new Map<string, Tile>();
    CATEGORIES.forEach((cat) => cat.tiles.forEach((t) => m.set(t.key, t)));
    return m;
  }, []);

  const toggle = (key: string) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return CATEGORIES.filter((cat) => cat.name === activeCategory);
    }

    const lowerSearch = searchTerm.toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      tiles: cat.tiles.filter(
        (tile) =>
          tile.label.toLowerCase().includes(lowerSearch) ||
          tile.key.toLowerCase().includes(lowerSearch)
      ),
    })).filter((cat) => cat.tiles.length > 0);
  }, [activeCategory, searchTerm]);

  const onKeyToggle: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const key = (e.currentTarget as HTMLDivElement).getAttribute("data-key");
      if (key) toggle(key);
    }
  };

  const onContinue = () => {
    const qs = selected.length
      ? `?selected=${encodeURIComponent(selected.join(","))}`
      : "";
    navigate(`/get-started${qs}`);
  };

  const count = selected.length;

  return (
    <div className="choose-apps-page auth-page">
      {/* Sidebar Section - Replicating Login aesthetic exactly */}
      <div className="auth-sidebar">
        <div className="auth-sidebar-content">
          <div className="auth-glass-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
            <span>Actyx Enterprise</span>
          </div>

          <h2 className="auth-sidebar-title">
            Professional business management, simplified.
          </h2>

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
        </div>
      </div>

      {/* Form Section - Aligning with Login.tsx structure */}
      <div className="auth-form-container choose-apps-content-wrapper">
        <div className="auth-form-box choose-apps-form-box">
          <header className="choose-head stagger-0">
            <h1 className="auth-title">Choose your apps</h1>
            <p className="auth-subtitle">Select the tools you need to build your perfect workspace.</p>
          </header>

          <div className="choose-search-container stagger-1">
            <div className="choose-search-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                placeholder="Search apps (e.g. CRM, Accounting...)"
                className="choose-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="search-clear-btn"
                  onClick={() => setSearchTerm("")}
                  title="Clear search"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          <div className="choose-tabs-wrapper stagger-2">
            <div className="choose-tabs">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.name}
                  className={`choose-tab ${activeCategory === cat.name ? "tab-active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat.name);
                    setSearchTerm(""); // Optional: clear search on tab change
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="choose-layout stagger-3">
            <div className="choose-main">
              {filteredCategories.map((cat) => (
                <div key={cat.name} className="choose-cat">
                  {searchTerm && <h3 className="search-result-category">{cat.name}</h3>}
                  <div className="choose-grid">
                    {cat.tiles.map((t) => {
                      const isSel = selected.includes(t.key);
                      return (
                        <div
                          key={t.key}
                          className={`choose-tile ${isSel ? "tile-selected" : ""}`}
                          role="button"
                          tabIndex={0}
                          aria-pressed={isSel ? "true" : "false"}
                          data-key={t.key}
                          onClick={() => toggle(t.key)}
                          onKeyDown={onKeyToggle}
                        >
                          <div className="choose-tile-glass"></div>
                          <div className="choose-icon-wrapper">
                            <div className="choose-icon" style={{ borderColor: isSel ? t.color : '#e2e8f0' }}>
                              <i className={t.icon} style={{ color: t.color }} aria-hidden="true"></i>
                            </div>
                            {isSel && (
                              <div className="choose-selection-badge" style={{ backgroundColor: t.color }}>
                                <i className="fa-solid fa-check"></i>
                              </div>
                            )}
                          </div>
                          <div className="choose-label">{t.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {filteredCategories.length === 0 && (
                <div className="no-results">
                  <i className="fa-solid fa-circle-info"></i>
                  <p>No apps found matching "<strong>{searchTerm}</strong>"</p>
                  <button className="clear-search-link" onClick={() => setSearchTerm("")}>Clear search</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Selection Panel - Restyled for the new layout */}
        {count > 0 && (
          <aside className="choose-aside">
            <div className="choose-selected-header">
              <span>{count} {count === 1 ? "App" : "Apps"}</span>
              <span style={{ fontSize: '12px', opacity: 0.7 }}>Ready to go</span>
            </div>

            <div className="choose-selected-list">
              {selected.map((key) => {
                const t = tilesMap.get(key);
                if (!t) return null;
                return (
                  <div key={key} className="choose-selected-item">
                    <div className="choose-selected-icon" style={{ color: t.color }}>
                      <i className={t.icon} aria-hidden="true"></i>
                    </div>
                    <div className="choose-selected-label">{t.label}</div>
                  </div>
                );
              })}
            </div>

            <div className="choose-info">
              <strong>Free forever</strong> with unlimited users and storage.
            </div>

            <button className="continue-btn" onClick={onContinue}>
              Continue →
            </button>
          </aside>
        )}
      </div>
    </div>
  );
};

export default ChooseApps;
