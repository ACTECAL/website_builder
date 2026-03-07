import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/GetStarted.css";
import { Select } from "antd";

// App selection data
type AppTile = { key: string; label: string; icon: string; color: string };
type AppCategory = { name: string; tiles: AppTile[] };

const APP_CATEGORIES: AppCategory[] = [
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

const MAX_APP_SELECTION = 10;

const ACCOUNT_TYPES = ["demo", "paid"] as const;
const SUBSCRIPTIONS = ["basic", "standard", "premium", "enterprise"] as const;
const INDUSTRIES = [
  "Manufacturing",
  "Retail",
  "E-commerce",
  "Logistics",
  "FMCG",
  "Pharmaceuticals",
  "Automotive",
  "Electronics",
  "Textiles",
  "Cold Storage",
  "Exam",
  "Others",
];

export const GetStarted: React.FC = () => {
  const navigate = useNavigate();
  useSearchParams();

  const [formData, setFormData] = useState({
    domain: "",
    companyName: "",
    industry: "",
    contactEmail: "",
    contactPhone: "",
    projectDescription: "",
    selectedApps: [] as string[],
    name: "",
    accountType: "demo" as "demo" | "paid",
    subscription: "starter" as "basic" | "standard" | "premium" | "enterprise",
    modules: [] as string[],
  });

  const AVAILABLE_MODULES = [
    { value: "erp:material_management", label: "Material Management" },
    { value: "erp:sales_management", label: "Sales Management" },
    { value: "erp:production_management", label: "Production Management" },
  ];

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Initializing Configuration...");
  const [showSuccessState, setShowSuccessState] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // API Loading States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const formSectionRef = useRef<HTMLDivElement>(null);

  // Validation
  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };
    if (
      [
        "domain",
        "companyName",
        "name",
        "contactEmail",
        "contactPhone",
      ].includes(name)
    ) {
      if (!value || (typeof value === "string" && !value.trim())) {
        newErrors[name] = "This field is required";
      } else if (
        name === "contactEmail" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[name] = "Invalid email";
      } else {
        delete newErrors[name];
      }
    }
    setErrors(newErrors);
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  // Step 1 Validation
  const isStep1Valid = () => {
    return (
      formData.name.trim() &&
      formData.companyName.trim() &&
      !errors.name &&
      !errors.companyName
    );
  };

  const handleStep1Next = async () => {
    if (!isStep1Valid()) return;

    setIsCreatingAccount(true);
    setIsSubmitting(true);
    setShowProcessingPopup(true);
    setProcessingProgress(15);
    setStatusMessage("Initializing Configuration...");
    setApiError(null);

    try {
      // Simulate multi-stage progress while waiting for API
      const progressSimulation = async () => {
        await new Promise(r => setTimeout(r, 800));
        setProcessingProgress(35);
        setStatusMessage("Provisioning ERP Instance...");
        await new Promise(r => setTimeout(r, 1200));
        setProcessingProgress(65);
        setStatusMessage("Configuring Selected Modules...");
        await new Promise(r => setTimeout(r, 1000));
        setProcessingProgress(90);
        setStatusMessage("Finalizing Setup...");
      };

      const payload = {
        name: formData.name,
        email: formData.contactEmail || null,
        company_name: formData.companyName,
        domain: formData.domain,
        industry: formData.industry || null,
        account_type: formData.accountType,
        subscription: formData.subscription,
        modules: formData.modules,
      };

      const [response] = await Promise.all([
        fetch("http://127.0.0.1:4001/erp/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }),
        progressSimulation()
      ]);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setProcessingProgress(100);
      setStatusMessage("System Ready!");
      setApiSuccess(true);
      setShowSuccessState(true);

      setTimeout(() => {
        setCurrentStep(2);
        setIsSubmitting(false);
        setIsCreatingAccount(false);
        setShowProcessingPopup(false);
        setShowSuccessState(false);
        setProcessingProgress(0);
      }, 2500);
    } catch (err: any) {
      setApiError(err.message || "Server error, please try again");
      setIsSubmitting(false);
      setIsCreatingAccount(false);
      setShowProcessingPopup(false);
      setProcessingProgress(0);
    }
  };

  // Toggle App Selection
  const toggleAppSelection = (appKey: string) => {
    setFormData((prev) => {
      const selected = prev.selectedApps.includes(appKey);
      if (selected) {
        return {
          ...prev,
          selectedApps: prev.selectedApps.filter((k) => k !== appKey),
        };
      } else if (prev.selectedApps.length < MAX_APP_SELECTION) {
        return { ...prev, selectedApps: [...prev.selectedApps, appKey] };
      }
      return prev;
    });
  };

  const getFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : "";
  };

  const getSelectedAppsCount = () => formData.selectedApps.length;

  const isSelectionLimitReached = getSelectedAppsCount() >= MAX_APP_SELECTION;

  return (
    <main className="getstarted-fullpage">
      {isCreatingAccount && (
        <div className="full-screen-loading">
          <div className="loading-card">
            <div className="spinner">
              <i className="fas fa-cog fa-spin fa-3x"></i>
            </div>
            <h2>Please wait…</h2>
            <p className="loading-title">We’re preparing your workspace…</p>
            <p className="loading-subtitle">
              This process may take 2–3 minutes.
            </p>
            <div className="progress-bar-small">
              <div className="progress-fill-small"></div>
            </div>
          </div>
        </div>
      )}

      <div className="getstarted-page auth-page">
        {/* Sidebar Section - Replicating Login aesthetic exactly */}
        <div className="auth-sidebar">
          <div className="auth-sidebar-content">
            <div className="auth-glass-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
              <span>Actyx Enterprise</span>
            </div>

            <h2 className="auth-sidebar-title">
              The foundation of your digital ecosystem.
            </h2>

            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="auth-feature-icon-wrapper">
                  <i className="fas fa-rocket" style={{ color: '#4ade80' }}></i>
                </div>
                <div className="auth-feature-text">Rapid Deployment Architecture</div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon-wrapper">
                  <i className="fas fa-shield-alt" style={{ color: '#4ade80' }}></i>
                </div>
                <div className="auth-feature-text">Bank-Grade Infrastructure</div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon-wrapper">
                  <i className="fas fa-sync" style={{ color: '#4ade80' }}></i>
                </div>
                <div className="auth-feature-text">Real-time Data Synchronization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section - Aligning with Login.tsx structure */}
        <div className="auth-form-container getstarted-content-wrapper">
          <div className="auth-form-box getstarted-form-box">
            <header className="form-header-full">
              <h1 className="auth-title">Complete your setup</h1>
              <p className="auth-subtitle">Just a few more details to customize your workspace.</p>
            </header>

            <form
              className="auth-form"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* STEP 1 - Company Details */}
              {currentStep === 1 && (
                <div className="step-fields animate-fade-in">
                  <div className="form-row">
                    <div className="field-group-full">
                      <label className="field-label-full">
                        Your Name <span className="required">*</span>
                      </label>
                      <input
                        className={`auth-input ${touched.name && !formData.name ? "error" : ""}`}
                        placeholder="Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        onBlur={() => handleBlur("name")}
                      />
                    </div>

                    <div className="field-group-full">
                      <label className="field-label-full">Company Email</label>
                      <input
                        type="email"
                        className={`auth-input ${getFieldError("contactEmail") ? "error" : ""}`}
                        placeholder="your@email.com"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        onBlur={() => handleBlur("contactEmail")}
                      />
                    </div>
                  </div>

                  <div className="field-group-full" style={{ marginBottom: '1.5rem' }}>
                    <label className="field-label-full">
                      Company / Godown Name <span className="required">*</span>
                    </label>
                    <input
                      className={`auth-input ${touched.companyName && !formData.companyName ? "error" : ""}`}
                      placeholder="Sharma Enterprises"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      onBlur={() => handleBlur("companyName")}
                    />
                  </div>

                  <div className="form-row">
                    <div className="field-group-full">
                      <label className="field-label-full">Industry</label>
                      <select
                        title="Select Industry"
                        className="auth-input field-select"
                        value={formData.industry}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                      >
                        <option value="">Select Industry</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Retail">Retail</option>
                        <option value="Services">Services</option>
                        <option value="Logistics">Logistics</option>
                      </select>
                    </div>

                    <div className="field-group-full">
                      <label className="field-label-full">Choose Plan</label>
                      <select
                        title="Choose Subscription Plan"
                        className="auth-input field-select"
                        value={formData.subscription}
                        onChange={(e) => handleInputChange("subscription", e.target.value as any)}
                      >
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                    </div>
                  </div>

                  <div className="field-group-full" style={{ marginBottom: '1.5rem' }}>
                    <label className="field-label-full">Account Type</label>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
                        <input
                          type="radio"
                          name="accountType"
                          value="demo"
                          checked={formData.accountType === "demo"}
                          onChange={() => handleInputChange("accountType", "demo")}
                        />
                        14-Day Free Demo
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
                        <input
                          type="radio"
                          name="accountType"
                          value="paid"
                          checked={formData.accountType === "paid"}
                          onChange={() => handleInputChange("accountType", "paid")}
                        />
                        Paid Account
                      </label>
                    </div>
                  </div>

                  <div className="field-group-full" style={{ marginBottom: '2.5rem' }}>
                    <div className="legacy-label-row">
                      <div className="legacy-label-title-group">
                        <span className="legacy-label-title">Select Modules</span>
                        <span className="legacy-label-star">*</span>
                        {formData.modules.length > 0 && (
                          <span className="module-counter">Selected: {formData.modules.length}</span>
                        )}
                      </div>
                      <span className="legacy-label-subtitle">Choose the ERP modules you want to enable</span>
                    </div>
                    <select
                      title="Select ERP Modules"
                      multiple
                      className="legacy-multi-select"
                      value={formData.modules}
                      onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, (option) => option.value);
                        handleInputChange("modules", values);
                      }}
                    >
                      <option value="Inventory">Inventory Management</option>
                      <option value="Sales">Sales & CRM</option>
                      <option value="Purchase">Purchase & Procurement</option>
                      <option value="Accounting">Financial Accounting</option>
                      <option value="HRM">HR & Payroll</option>
                      <option value="Manufacturing">Manufacturing / MRP</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="form-actions-full" style={{ marginTop: '1rem' }}>
                {currentStep === 1 && (
                  <button
                    type="button"
                    className="auth-primary-btn"
                    style={{ width: '100%' }}
                    onClick={handleStep1Next}
                    disabled={!isStep1Valid() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>Creating Account... <i className="fas fa-spinner fa-spin"></i></>
                    ) : (
                      <>Next Step <i className="fas fa-arrow-right"></i></>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>

      {showProcessingPopup && (
        <div className="processing-modal-overlay">
          <div className="processing-modal-content">
            {!showSuccessState ? (
              <>
                <div className="processing-spinner"></div>
                <h2 className="processing-text">Wait for few minutes</h2>
                <div className="processing-progress-container">
                  <div className="processing-progress-bar">
                    <div
                      className="processing-progress-fill"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                  <p className="processing-status-text">{statusMessage}</p>
                </div>
              </>
            ) : (
              <div className="success-state">
                <div className="success-checkmark-container">
                  <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
                <h2 className="success-title">Success!</h2>
                <p className="success-subtitle">{statusMessage}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default GetStarted;
