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
    <main className="choose-apps-page">
      <section className="section">
        <div className="container" style={{ maxWidth: 1120 }}>
          <header className="choose-head">
            <h1 className="choose-title">
              <span>Choose your </span>
              <span className="choose-title-accent">Apps</span>
            </h1>
            <p className="choose-subtitle">
              Free instant access. No credit card required.
            </p>
          </header>
          <div className={`choose-layout ${count === 0 ? "no-aside" : ""}`}>
            <div className="choose-main">
              {CATEGORIES.map((cat) => (
                <div key={cat.name} className="choose-cat">
                  <h2 className="choose-cat-title">{cat.name}</h2>
                  <div className="choose-grid">
                    {cat.tiles.map((t) => {
                      const isSel = selected.includes(t.key);
                      return (
                        <div
                          key={t.key}
                          className={`choose-tile ${
                            isSel ? "tile-selected" : ""
                          }`}
                          role="button"
                          tabIndex={0}
                          aria-pressed={isSel}
                          data-key={t.key}
                          onClick={() => toggle(t.key)}
                          onKeyDown={onKeyToggle}
                        >
                          <div
                            className="choose-icon"
                            style={{ color: t.color }}
                          >
                            <i className={t.icon} aria-hidden="true"></i>
                          </div>
                          <div className="choose-label">{t.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {count > 0 && (
              <aside className="choose-aside">
                <div className="choose-selected-header">
                  {count} {count === 1 ? "App" : "Apps"} selected
                </div>
                <div className="choose-selected-list">
                  {selected.map((key) => {
                    const t = tilesMap.get(key);
                    if (!t) return null;
                    return (
                      <div key={key} className="choose-selected-item">
                        <div
                          className="choose-selected-icon"
                          style={{ color: t.color }}
                        >
                          <i className={t.icon} aria-hidden="true"></i>
                        </div>
                        <div className="choose-selected-label">{t.label}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="choose-info">
                  <strong>Free</strong>, with <strong>unlimited</strong> users,{" "}
                  <strong>forever</strong>.
                </div>
                <button className="continue-btn" onClick={onContinue}>
                  Continue
                </button>
              </aside>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ChooseApps;
