import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/GetStarted.css";
import { PRODUCTS } from "../data/products";

// App selection logic refined for Elite++ grid

export const GetStarted: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse query params for pre-selected modules and product
  const searchParams = new URLSearchParams(location.search);
  const selectedAppsParam = searchParams.get("selected");
  const selectedProductParam = searchParams.get("product");
  const initialModules = selectedAppsParam ? selectedAppsParam.split(",") : [];

  // Find selected product from URL
  const selectedProduct = PRODUCTS.find(
    (p) => p.name.toLowerCase() === selectedProductParam?.toLowerCase()
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
    subscription: "starter" as "basic" | "standard" | "premium" | "enterprise",
    modules: initialModules,
    selectedProduct: selectedProductParam || "",
  });

  const AVAILABLE_MODULES = [
    {
      value: "Inventory",
      label: "Inventory Management",
      icon: "fa-solid fa-box",
      color: "#a855f7",
    },
    {
      value: "Sales",
      label: "Sales & CRM",
      icon: "fa-solid fa-chart-line",
      color: "#14b8a6",
    },
    {
      value: "Purchase",
      label: "Purchase & Procurement",
      icon: "fa-solid fa-cart-shopping",
      color: "#22c55e",
    },
    {
      value: "Accounting",
      label: "Financial Accounting",
      icon: "fa-solid fa-coins",
      color: "#10b981",
    },
    {
      value: "HRM",
      label: "HR & Payroll",
      icon: "fa-solid fa-user-group",
      color: "#ef4444",
    },
    {
      value: "Manufacturing",
      label: "Manufacturing / MRP",
      icon: "fa-solid fa-industry",
      color: "#f97316",
    },
  ];

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "Initializing Configuration...",
  );
  const [showSuccessState, setShowSuccessState] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // API Loading States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [currentStep] = useState(1);

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
    // Product validation
    if (name === "selectedProduct") {
      if (!value) {
        newErrors[name] = "Please select a product";
      } else {
        delete newErrors[name];
      }
    }

    // Modules validation
    if (name === "modules") {
      if (!Array.isArray(value) || value.length === 0) {
        newErrors[name] = "Please select at least one module";
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

  const handleInputMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  // Step 1 Validation
  const isStep1Valid = () => {
    return (
      formData.name.trim() &&
      formData.companyName.trim() &&
      formData.selectedProduct &&
      formData.modules.length > 0 &&
      !errors.name &&
      !errors.companyName &&
      !errors.selectedProduct &&
      !errors.modules
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
        await new Promise((r) => setTimeout(r, 800));
        setProcessingProgress(35);
        setStatusMessage("Provisioning ERP Instance...");
        await new Promise((r) => setTimeout(r, 1200));
        setProcessingProgress(65);
        setStatusMessage("Configuring Selected Modules...");
        await new Promise((r) => setTimeout(r, 1000));
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
        fetch("https://api-admindev.actecal.com/admin/erp/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }),
        progressSimulation(),
      ]);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setProcessingProgress(100);
      setStatusMessage("System Ready!");
      setShowSuccessState(true);

      setTimeout(() => {
        setIsSubmitting(false);
        setIsCreatingAccount(false);
        setShowProcessingPopup(false);
        setShowSuccessState(false);
        setProcessingProgress(0);
        // After success, navigate to the dashboard or clear
        navigate("/dashboard");
      }, 2500);
    } catch (err: any) {
      setApiError(err.message || "Server error, please try again");
      setIsSubmitting(false);
      setIsCreatingAccount(false);
      setShowProcessingPopup(false);
      setProcessingProgress(0);
    }
  };

  const getFieldError = (fieldName: string) => {
    return touched[fieldName] && errors[fieldName] ? errors[fieldName] : "";
  };

  // getSelectedAppsCount and other app selection functions removed as they are no longer used in the new module grid logic

  return (
    <main className="getstarted-fullpage">
      {isCreatingAccount && (
        <div className="full-screen-loading">
          <div className="loading-card">
            <div className="spinner">
              <i className="fas fa-cog fa-spin fa-3x"></i>
            </div>
            <h2>Please waitâ€¦</h2>
            <p className="loading-title">Weâ€™re preparing your workspaceâ€¦</p>
            <p className="loading-subtitle">
              This process may take 2â€“3 minutes.
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
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m5 12 5 5L20 7" />
              </svg>
              <span>Actyx Enterprise</span>
            </div>

            {/* Ambient Background Elements */}
            <div className="auth-ambient-blob blob-1"></div>
            <div className="auth-ambient-blob blob-2"></div>
            <div className="auth-ambient-blob blob-3"></div>

            {/* Cinematic Light Streaks */}
            <div className="auth-light-streaks">
              <div className="light-streak streak-1"></div>
              <div className="light-streak streak-2"></div>
              <div className="light-streak streak-3"></div>
            </div>

            {/* Floating Particle System */}
            <div className="auth-particles">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className={`particle p-${i % 5}`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    opacity: 0.1 + Math.random() * 0.4,
                    transform: `scale(${0.5 + Math.random()})`,
                  }}
                ></div>
              ))}
            </div>

            <h2 className="auth-sidebar-title">
              The foundation of your digital ecosystem.
            </h2>

            <div className="auth-feature-list">
              <div className="auth-feature-item">
                <div className="auth-feature-icon-wrapper">
                  <i className="fas fa-rocket"></i>
                </div>
                <div className="auth-feature-text">
                  Rapid Deployment Architecture
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon-wrapper">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="auth-feature-text">
                  Bank-Grade Infrastructure
                </div>
              </div>

              <div className="auth-feature-item">
                <div className="auth-feature-icon-wrapper">
                  <i className="fas fa-sync"></i>
                </div>
                <div className="auth-feature-text">
                  Real-time Data Synchronization
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section - Aligning with Login.tsx structure */}
        <div className="auth-form-container getstarted-content-wrapper">
          <div className="auth-form-box getstarted-form-box">
            {/* Step indicator */}
            <div
              className="setup-step-indicator animate-slide-up"
              style={{ animationDelay: "0.05s" }}
            >
              <div className="step-item step-done">
                <div className="step-dot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <span>Account</span>
              </div>
              <div className="step-line step-done-line"></div>
              <div className="step-item step-done">
                <div className="step-dot">
                  <i className="fa-solid fa-check"></i>
                </div>
                <span>Choose Apps</span>
              </div>
              <div className="step-line step-done-line"></div>
              <div className="step-item step-active">
                <div className="step-dot">
                  <span>3</span>
                </div>
                <span>Setup</span>
              </div>
            </div>

            <header
              className="form-header-full animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="auth-title-wrapper">
                <h1 className="auth-title text-shimmer">
                  Complete your <span className="auth-title-accent">setup</span>
                </h1>
                <div className="title-glass-accent"></div>
              </div>
              <p className="auth-subtitle">
                Just a few more details to customize your workspace.
              </p>
              {apiError && (
                <div className="auth-api-error">
                  <i className="fas fa-exclamation-circle"></i> {apiError}
                </div>
              )}
            </header>

            <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
              {/* STEP 1 - Company Details */}
              {currentStep === 1 && (
                <div className="step-fields animate-fade-in">
                  <div className="form-row">
                    <div
                      className="auth-input-group animate-slide-up"
                      style={{ animationDelay: "0.1s" }}
                      onMouseMove={handleInputMouseMove}
                    >
                      <i className="fa-regular fa-user auth-input-icon"></i>
                      <input
                        id="name"
                        className={`auth-input-max with-icon ${touched.name && !formData.name ? "error" : ""}`}
                        placeholder=" "
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        onBlur={() => handleBlur("name")}
                      />
                      <label htmlFor="name" className="auth-label-max">
                        Your Name *
                      </label>
                    </div>

                    <div
                      className="auth-input-group animate-slide-up"
                      style={{ animationDelay: "0.2s" }}
                      onMouseMove={handleInputMouseMove}
                    >
                      <i className="fa-regular fa-envelope auth-input-icon"></i>
                      <input
                        id="contactEmail"
                        type="email"
                        className={`auth-input-max with-icon ${getFieldError("contactEmail") ? "error" : ""}`}
                        placeholder=" "
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        onBlur={() => handleBlur("contactEmail")}
                      />
                      <label htmlFor="contactEmail" className="auth-label-max">
                        Company Email
                      </label>
                    </div>
                  </div>

                  <div
                    className="auth-input-group animate-slide-up"
                    style={{ animationDelay: "0.3s" }}
                    onMouseMove={handleInputMouseMove}
                  >
                    <i className="fa-regular fa-building auth-input-icon"></i>
                    <input
                      id="companyName"
                      className={`auth-input-max with-icon ${touched.companyName && !formData.companyName ? "error" : ""}`}
                      placeholder=" "
                      value={formData.companyName}
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                      onBlur={() => handleBlur("companyName")}
                    />
                    <label htmlFor="companyName" className="auth-label-max">
                      Company / Godown Name *
                    </label>
                  </div>

                  <div className="form-row">
                    <div
                      className="auth-input-group animate-slide-up"
                      style={{ animationDelay: "0.4s" }}
                      onMouseMove={handleInputMouseMove}
                    >
                      <i className="fa-solid fa-industry auth-input-icon"></i>
                      <select
                        id="selectedProduct"
                        title="Select Product"
                        className={`auth-input-max field-select with-icon ${getFieldError("selectedProduct") ? "error" : ""}`}
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
                      <label htmlFor="selectedProduct" className="auth-label-max">
                        Select Product *
                      </label>
                      {getFieldError("selectedProduct") && (
                        <div className="field-error">{getFieldError("selectedProduct")}</div>
                      )}
                    </div>

                    <div
                      className="auth-input-group animate-slide-up"
                      style={{ animationDelay: "0.5s" }}
                      onMouseMove={handleInputMouseMove}
                    >
                      <i className="fa-regular fa-credit-card auth-input-icon"></i>
                      <select
                        id="subscription"
                        title="Choose Subscription Plan"
                        className="auth-input-max field-select with-icon"
                        value={formData.subscription}
                        onChange={(e) =>
                          handleInputChange(
                            "subscription",
                            e.target.value as any,
                          )
                        }
                      >
                        <option value="basic">Basic</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                        <option value="enterprise">Enterprise</option>
                      </select>
                      <label htmlFor="subscription" className="auth-label-max">
                        Choose Plan
                      </label>
                    </div>
                  </div>

                  <div
                    className="field-group-full animate-slide-up"
                    style={{ animationDelay: "0.6s" }}
                  >
                    <label className="field-label-full">Account Type</label>
                    <div className="account-type-grid">
                      <div
                        className={`account-card-max ${formData.accountType === "demo" ? "active" : ""}`}
                        onClick={() => handleInputChange("accountType", "demo")}
                      >
                        <div className="card-glow"></div>
                        <div className="account-card-icon">
                          <i className="fa-solid fa-flask"></i>
                        </div>
                        <div className="account-card-content">
                          <div className="account-card-title">
                            14-Day Free Demo
                          </div>
                          <div className="account-card-desc">
                            Try all features with sample data. No credit card
                            required.
                          </div>
                        </div>
                      </div>
                      <div
                        className={`account-card-max ${formData.accountType === "paid" ? "active" : ""}`}
                        onClick={() => handleInputChange("accountType", "paid")}
                      >
                        <div className="card-glow"></div>
                        <div className="account-card-icon">
                          <i className="fa-solid fa-building-shield"></i>
                        </div>
                        <div className="account-card-content">
                          <div className="account-card-title">Paid Account</div>
                          <div className="account-card-desc">
                            Create your official production environment.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="field-group-full module-selection-group">
                    <div
                      className="module-header-max animate-slide-up"
                      style={{ animationDelay: "0.65s" }}
                    >
                      <div className="module-header-title-row">
                        <h3 className="module-title-max">Select Modules</h3>
                        {formData.modules.length > 0 && (
                          <span className="module-badge-max">
                            {formData.modules.length}
                          </span>
                        )}
                      </div>
                      <p className="module-subtitle-max">
                        Tailor your workspace by enabling core business modules.
                      </p>
                    </div>

                    <div className="module-grid-elite">
                      {AVAILABLE_MODULES.map((mod, index) => {
                        const isSel = formData.modules.includes(mod.value);
                        return (
                          <div
                            key={mod.value}
                            className={`module-tile-elite ${isSel ? "tile-selected" : ""} animate-scale-in`}
                            style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                            onClick={() => {
                              const newModules = isSel
                                ? formData.modules.filter(
                                    (v) => v !== mod.value,
                                  )
                                : [...formData.modules, mod.value];
                              handleInputChange("modules", newModules);
                            }}
                          >
                            <div className="module-tile-shimmer"></div>
                            <div className="module-icon-wrapper">
                              <div
                                className="module-icon-glow"
                                style={{
                                  backgroundColor: isSel
                                    ? mod.color
                                    : "transparent",
                                }}
                              ></div>
                              <div
                                className="module-icon"
                                style={{
                                  borderColor: isSel ? mod.color : "#e2e8f0",
                                }}
                              >
                                <i
                                  className={mod.icon}
                                  style={{ color: mod.color }}
                                  aria-hidden="true"
                                ></i>
                              </div>
                            </div>
                            <div className="module-label">{mod.label}</div>
                            {isSel && (
                              <div
                                className="module-selection-badge"
                                style={{ backgroundColor: mod.color }}
                              >
                                <i className="fa-solid fa-check"></i>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div
                className="form-actions-full animate-slide-up"
                style={{ animationDelay: "0.7s" }}
              >
                {currentStep === 1 && (
                  <button
                    type="button"
                    className="getstarted-btn-max"
                    onClick={handleStep1Next}
                    disabled={!isStep1Valid() || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        Processing Your Setup{" "}
                        <i className="fas fa-spinner fa-spin"></i>
                      </>
                    ) : (
                      <>
                        Complete Setup{" "}
                        <i className="fa-solid fa-check-circle"></i>
                      </>
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
                  <svg
                    className="checkmark"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 52 52"
                  >
                    <circle
                      className="checkmark-circle"
                      cx="26"
                      cy="26"
                      r="25"
                      fill="none"
                    />
                    <path
                      className="checkmark-check"
                      fill="none"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                    />
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