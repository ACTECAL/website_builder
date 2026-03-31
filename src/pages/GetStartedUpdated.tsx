import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/GetStarted.css";
import { Select } from "antd";
import { PRODUCTS, Product } from "../data/products";

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

interface ModuleOption {
  value: string;
  label: string;
}

export const GetStartedUpdated: React.FC = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const [searchParams] = useSearchParams();

  // URL se product check karo
  const selectedProductName = searchParams.get("product") || "";
  const selectedProduct: Product | undefined = PRODUCTS.find(
    (p) => p.name.toLowerCase() === selectedProductName.toLowerCase(),
  );

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
    subscription: "basic" as "basic" | "standard" | "premium" | "enterprise",
    modules: [] as string[],
    selectedProduct: "" as string,
  });

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showFormTitle, setShowFormTitle] = useState(false);
  const [showFormDesc, setShowFormDesc] = useState(false);
  const [showFields, setShowFields] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // API Loading States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [apiSuccess, setApiSuccess] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const formSectionRef = useRef<HTMLDivElement>(null);

  // Animation effect
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    const t2 = setTimeout(() => setShowTitle(true), 300);
    const t3 = setTimeout(() => setShowSubtitle(true), 600);
    const t4 = setTimeout(() => setShowForm(true), 900);
    const t5 = setTimeout(() => setShowFormTitle(true), 1200);
    const t6 = setTimeout(() => setShowFormDesc(true), 1400);
    const t7 = setTimeout(() => setShowFields(true), 1600);
    const t8 = setTimeout(() => setShowButtons(true), 2000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(t8);
    };
  }, []);

  // Set selected product from URL
  useEffect(() => {
    if (selectedProduct) {
      setFormData(prev => ({ ...prev, selectedProduct: selectedProduct.name }));
    }
  }, [selectedProduct]);

  // Validation
  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };
    
    if (["name", "companyName", "contactEmail", "contactPhone"].includes(name)) {
      if (!value || (typeof value === "string" && !value.trim())) {
        newErrors[name] = "This field is required";
      } else if (name === "contactEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newErrors[name] = "Invalid email";
      } else if (name === "contactPhone" && !/^\+?[\d\s\-\(\)]{10,}$/.test(value.replace(/\s/g, ""))) {
        newErrors[name] = "Invalid phone number";
      } else {
        delete newErrors[name];
      }
    }

    if (name === "modules" && Array.isArray(value)) {
      if (value.length === 0) {
        newErrors[name] = "Please select at least one module";
      } else {
        delete newErrors[name];
      }
    }

    if (name === "selectedProduct" && !value) {
      newErrors[name] = "Please select a product";
    } else if (name === "selectedProduct" && value) {
      delete newErrors[name];
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
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
      formData.contactEmail.trim() &&
      formData.selectedProduct &&
      formData.modules.length > 0 &&
      !errors.name &&
      !errors.companyName &&
      !errors.contactEmail &&
      !errors.selectedProduct &&
      !errors.modules
    );
  };

  // API CALL ON NEXT FROM STEP 1
  const handleStep1Next = async () => {
    if (!isStep1Valid()) {
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        companyName: true,
        contactEmail: true,
        selectedProduct: true,
        modules: true,
      });
      return;
    }

    setIsCreatingAccount(true);
    setIsSubmitting(true);
    setApiError(null);

    try {
      const payload = {
        name: formData.name,
        email: formData.contactEmail || null,
        company_name: formData.companyName,
        domain: formData.domain,
        industry: formData.industry || null,
        account_type: formData.accountType,
        subscription: formData.subscription,
        product: formData.selectedProduct,
        modules: formData.modules,
      };

      const response = await fetch(
        "https://api-dev.actecal.com/admin/erp/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setApiSuccess(true);
      setTimeout(() => {
        setCurrentStep(2);
        setIsSubmitting(false);
        setIsCreatingAccount(false);
      }, 1500);
    } catch (err: any) {
      setApiError(err.message || "Server error, please try again");
      setIsSubmitting(false);
      setIsCreatingAccount(false);
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

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : "";
  };

  const getSelectedAppsCount = () => formData.selectedApps.length;
  const isSelectionLimitReached = getSelectedAppsCount() >= MAX_APP_SELECTION;

  const availablePlans = selectedProduct
    ? selectedProduct.plans
    : SUBSCRIPTIONS.map((id) => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1) + " Plan",
      }));

  const availableModules: ModuleOption[] = selectedProduct
    ? selectedProduct.modules.map((mod) => ({
        value: mod.id,
        label: mod.name,
      }))
    : [
        { value: "erp:material_management", label: "Material Management" },
        { value: "erp:sales_management", label: "Sales Management" },
        { value: "erp:production_management", label: "Production Management" },
      ];

  return (
    <main className="getstarted-fullpage">
      {isCreatingAccount && (
        <div className="full-screen-loading">
          <div className="loading-card">
            <div className="spinner">
              <i className="fas fa-cog fa-spin fa-3x"></i>
            </div>
            <h2>Please wait…</h2>
            <p className="loading-title">We're preparing your workspace…</p>
            <p className="loading-subtitle">
              This process may take 2–3 minutes.
            </p>
            <div className="progress-bar-small">
              <div className="progress-fill-small"></div>
            </div>
          </div>
        </div>
      )}

      {/* Background & Hero */}
      <div className="background-particles" />
      <div className="floating-elements">
        <div className="floating-element floating-1">
          <i className="fas fa-chart-line"></i>
        </div>
        <div className="floating-element floating-2">
          <i className="fas fa-users"></i>
        </div>
        <div className="floating-element floating-3">
          <i className="fas fa-cog"></i>
        </div>
        <div className="floating-element floating-4">
          <i className="fas fa-lightbulb"></i>
        </div>
        <div className="floating-element floating-5">
          <i className="fas fa-rocket"></i>
        </div>
      </div>

      <section className={`form-section-full ${showForm ? "in" : ""}`}>
        <div className="form-container-full" ref={formSectionRef}>
          <form
            className="multi-step-form"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Progress Bar */}
            <div className="form-progress-container">
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      currentStep === 1
                        ? 25
                        : currentStep === 2
                        ? 50
                        : currentStep === 3
                        ? 75
                        : 100
                    }%`,
                  }}
                />
              </div>
              <div className="progress-header">
                <span className="progress-text">Step {currentStep} of 4</span>
              </div>
            </div>

            {/* STEP 1 - Company Details + Product Selection */}
            {currentStep === 1 && (
              <div className="step-fields">
                <h3 className="step-heading">Company & Product Details</h3>

                <div className="form-row">
                  <div className="field-group-full">
                    <label>
                      Your Name <span className="required">*</span>
                    </label>
                    <input
                      className={`field-input-full ${
                        touched.name && !formData.name ? "error" : ""
                      }`}
                      placeholder="Rahul Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      onBlur={() => handleBlur("name")}
                    />
                    {getFieldError("name") && (
                      <div className="field-error">{getFieldError("name")}</div>
                    )}
                  </div>

                  <div className="field-group-full">
                    <label>Company Email <span className="required">*</span></label>
                    <input
                      type="email"
                      className={`field-input-full ${
                        getFieldError("contactEmail") ? "error" : ""
                      }`}
                      placeholder="your@email.com"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      onBlur={() => handleBlur("contactEmail")}
                    />
                    {getFieldError("contactEmail") && (
                      <div className="field-error">{getFieldError("contactEmail")}</div>
                    )}
                  </div>
                </div>

                <div className="field-group-full">
                  <label>
                    Company / Godown Name <span className="required">*</span>
                  </label>
                  <input
                    className={`field-input-full ${
                      touched.companyName && !formData.companyName
                        ? "error"
                        : ""
                    }`}
                    placeholder="Sharma Enterprises"
                    value={formData.companyName}
                    onChange={(e) =>
                      handleInputChange("companyName", e.target.value)
                    }
                    onBlur={() => handleBlur("companyName")}
                  />
                  {getFieldError("companyName") && (
                    <div className="field-error">{getFieldError("companyName")}</div>
                  )}
                </div>

                <div className="form-row">
                  <div className="field-group-full">
                    <label>Industry</label>
                    <select
                      className="field-input-full field-select"
                      value={formData.industry}
                      onChange={(e) =>
                        handleInputChange("industry", e.target.value)
                      }
                    >
                      <option value="">Select Industry</option>
                      {INDUSTRIES.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group-full">
                    <label>Select Product <span className="required">*</span></label>
                    <select
                      className={`field-input-full field-select ${
                        getFieldError("selectedProduct") ? "error" : ""
                      }`}
                      value={formData.selectedProduct}
                      onChange={(e) =>
                        handleInputChange("selectedProduct", e.target.value)
                      }
                      onBlur={() => handleBlur("selectedProduct")}
                    >
                      <option value="">Select Product</option>
                      {PRODUCTS.map((product) => (
                        <option key={product.name} value={product.name}>
                          {product.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    {getFieldError("selectedProduct") && (
                      <div className="field-error">{getFieldError("selectedProduct")}</div>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="field-group-full">
                    <label>Choose Plan</label>
                    <select
                      className="field-input-full field-select"
                      value={formData.subscription}
                      onChange={(e) =>
                        handleInputChange("subscription", e.target.value as any)
                      }
                    >
                      {availablePlans.map((p: any) => (
                        <option key={p.id} value={p.id}>
                          {p.name.charAt(0).toUpperCase() + p.name.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="field-group-full">
                    <label>Account Type</label>
                    <div
                      style={{ display: "flex", gap: "20px", marginTop: "10px" }}
                    >
                      {ACCOUNT_TYPES.map((t) => (
                        <label
                          key={t}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <input
                            type="radio"
                            name="acct"
                            checked={formData.accountType === t}
                            onChange={() => handleInputChange("accountType", t)}
                          />
                          <span style={{ marginLeft: "8px" }}>
                            {t === "demo" ? "14-Day Free Demo" : "Paid Account"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="field-group-full" style={{ marginTop: "24px" }}>
                  <label>
                    Select Modules <span className="required">*</span>
                    <small
                      style={{
                        display: "block",
                        color: "#64748b",
                        marginTop: "4px",
                      }}
                    >
                      Choose ERP modules you want to enable
                    </small>
                  </label>

                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Select modules (multiple allowed)"
                    value={formData.modules}
                    onChange={(value: any) =>
                      handleInputChange("modules", value)
                    }
                    options={availableModules}
                    maxTagCount="responsive"
                    showSearch
                    allowClear
                    notFoundContent="No modules found"
                  />

                  {getFieldError("modules") && (
                    <div className="field-error" style={{ marginTop: "8px" }}>
                      {getFieldError("modules")}
                    </div>
                  )}
                </div>

                {/* API Status */}
                {apiSuccess && (
                  <div className="success-msg">
                    Account created successfully! Taking you forward...
                  </div>
                )}
                {apiError && (
                  <div className="field-error">Error: {apiError}</div>
                )}
              </div>
            )}

            {/* STEP 2 - App Selection */}
            {currentStep === 2 && (
              <div className="step-fields">
                <h3 className="step-heading">
                  <i className="fas fa-puzzle-piece"></i>
                  App Selection
                </h3>
                <div className="app-selection-container">
                  <div className="selected-apps-summary">
                    <div className="apps-count">
                      <i className="fas fa-check-circle"></i>
                      <span>
                        {getSelectedAppsCount() === 0
                          ? "No apps selected"
                          : `${getSelectedAppsCount()} ${
                              getSelectedAppsCount() === 1 ? "app" : "apps"
                            } selected`}
                      </span>
                    </div>
                    {isSelectionLimitReached && (
                      <div className="selection-limit" role="status">
                        Maximum of {MAX_APP_SELECTION} apps can be selected.
                      </div>
                    )}
                    {getSelectedAppsCount() >= 3 && (
                      <div className="selection-reward" role="status">
                        You qualify for a 15-day free trial with 3+ apps
                        selected.
                      </div>
                    )}
                    {getSelectedAppsCount() === 0 && (
                      <div className="selection-hint">
                        <i className="fas fa-info-circle"></i>
                        Please select at least one app to continue
                      </div>
                    )}
                  </div>

                  <div className="apps-categories">
                    {APP_CATEGORIES.map((category) => (
                      <div key={category.name} className="apps-category">
                        <h4 className="category-title">{category.name}</h4>
                        <div className="apps-grid">
                          {category.tiles.map((app) => {
                            const isSelected = formData.selectedApps.includes(
                              app.key,
                            );
                            return (
                              <div
                                key={app.key}
                                className={`app-tile ${
                                  isSelected ? "selected" : ""
                                }`}
                                onClick={() => toggleAppSelection(app.key)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    toggleAppSelection(app.key);
                                  }
                                }}
                                aria-pressed={isSelected}
                                aria-disabled={
                                  isSelectionLimitReached && !isSelected
                                }
                              >
                                <div
                                  className="app-icon"
                                  style={{ backgroundColor: app.color }}
                                >
                                  <i className={app.icon}></i>
                                </div>
                                <div className="app-label">{app.label}</div>
                                {isSelected && (
                                  <div className="selection-indicator">
                                    <i className="fas fa-check"></i>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 - Contact Information */}
            {currentStep === 3 && (
              <div className="step-fields">
                <h3 className="step-heading">
                  <i className="fas fa-user"></i>
                  Contact Information
                </h3>
                <div className="form-row">
                  <div className="field-group-full">
                    <label>Contact Phone <span className="required">*</span></label>
                    <input
                      type="tel"
                      className={`field-input-full ${
                        getFieldError("contactPhone") ? "error" : ""
                      }`}
                      placeholder="+1 (555) 123-4567"
                      value={formData.contactPhone}
                      onChange={(e) =>
                        handleInputChange("contactPhone", e.target.value)
                      }
                      onBlur={() => handleBlur("contactPhone")}
                    />
                    {getFieldError("contactPhone") && (
                      <div className="field-error">{getFieldError("contactPhone")}</div>
                    )}
                  </div>

                  <div className="field-group-full">
                    <label>Company Domain</label>
                    <input
                      className={`field-input-full ${
                        errors.domain ? "error" : ""
                      }`}
                      placeholder="sharmaenterprises.com"
                      value={formData.domain}
                      onChange={(e) =>
                        handleInputChange("domain", e.target.value)
                      }
                      onBlur={() => handleBlur("domain")}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 - Project Description */}
            {currentStep === 4 && (
              <div className="step-fields">
                <h3 className="step-heading">
                  <i className="fas fa-lightbulb"></i>
                  Project Description
                </h3>
                <div className="field-group-full">
                  <label>
                    Project Description <span className="required">*</span>
                    <span className="character-count">
                      {formData.projectDescription.length}/500
                    </span>
                  </label>
                  <textarea
                    className={`field-textarea-full ${
                      getFieldError("projectDescription") ? "error" : ""
                    }`}
                    placeholder="Describe your business goals, target audience, key features needed, design preferences, and any specific requirements. Please be as detailed as possible to help us create the perfect solution for you..."
                    rows={6}
                    maxLength={500}
                    value={formData.projectDescription}
                    onChange={(e) =>
                      handleInputChange("projectDescription", e.target.value)
                    }
                    onBlur={() => handleBlur("projectDescription")}
                    required
                  />
                  <div className="field-help">
                    <i className="fas fa-info-circle"></i>
                    Minimum 50 characters required
                  </div>
                  {getFieldError("projectDescription") && (
                    <div className="field-error">
                      {getFieldError("projectDescription")}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div
              className={`form-actions-full ${
                showButtons ? "buttons-animate" : ""
              }`}
            >
              <div className="step-buttons">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="btn btn-secondary-full"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                )}

                {currentStep === 1 && (
                  <button
                    type="button"
                    className="btn btn-primary-full"
                    onClick={handleStep1Next}
                    disabled={!isStep1Valid() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        Creating Account...{" "}
                        <i className="fas fa-spinner fa-spin"></i>
                      </>
                    ) : (
                      <>
                        Next Step <i className="fas fa-arrow-right"></i>
                      </>
                    )}
                  </button>
                )}

                {currentStep > 1 && currentStep < 4 && (
                  <button
                    type="button"
                    className="btn btn-primary-full"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                  >
                    Next Step
                  </button>
                )}

                {currentStep === 4 && (
                  <button
                    type="button"
                    className="btn btn-primary-full"
                    onClick={() => navigate("/thank-you")}
                  >
                    Complete Setup
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default GetStartedUpdated;
