import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/GetStarted.css";
import "../styles/ChooseApps.css";
import PRODUCTS, { Product } from "../data/products";
import { industryCategories } from "../data/industries";
import ModuleGrid from "../components/ModuleGrid";

export const GetStarted: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // URL parsing for initial state if they somehow land here with URL params
  const searchParams = new URLSearchParams(location.search);
  const selectedAppsParam = searchParams.get("selected");
  const initialModules = selectedAppsParam ? selectedAppsParam.split(",") : [];

  // ============================================
  // STEPPER STATE
  // 1 = App Selection (Pipeline Step 1)
  // 2 = Company Data (Pipeline Step 2)
  // 3 = Provisioning / Success
  // ============================================
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState("forward");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(initialModules);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    domain: "",
    companyName: "",
    industry: "",
    contactEmail: "",
    contactPhone: "",
    projectDescription: "",
    name: "",
    accountType: "paid" as "demo" | "paid",
    subscription: "premium" as "basic" | "standard" | "premium" | "enterprise",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Initializing Configuration...");
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Scroll to top on step change seamlessly
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // ============================================
  // APP TICKING LOGIC (Step 1)
  // ============================================
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return selectedProduct ? [selectedProduct] : [];
    const lower = searchTerm.toLowerCase();
    return PRODUCTS.map((prod) => ({
      ...prod,
      modules: prod.modules.filter(
        (mod) =>
          mod.name.toLowerCase().includes(lower) ||
          mod.description.toLowerCase().includes(lower) ||
          mod.id.toLowerCase().includes(lower)
      ),
    })).filter((prod) => prod.modules.length > 0);
  }, [selectedProduct, searchTerm]);

  const handleToggleModule = (id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]);
  };

  const handleToggleAllModules = (product: Product) => {
    const moduleIds = product.modules.map(m => m.id);
    const allSelected = moduleIds.length > 0 && moduleIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(k => !moduleIds.includes(k)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...moduleIds])));
    }
  };

  const count = selectedIds.length;

  const goToForm = () => {
    if (count > 0) {
      setDirection("forward");
      setCurrentStep(2);
    }
  };

  const goBackToApps = () => {
    setDirection("backward");
    setCurrentStep(1);
  };

  // ============================================
  // FORM VALIDATION LOGIC (Step 2)
  // ============================================
  const validateField = (name: string, value: any) => {
    const newErrors = { ...errors };
    if (["domain", "companyName", "name", "contactEmail", "industry"].includes(name)) {
      if (!value || (typeof value === "string" && !value.trim())) {
        newErrors[name] = "This field is required";
      } else if (name === "contactEmail" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
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

  const handleInputMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.companyName.trim() &&
      formData.contactEmail.trim() &&
      formData.domain.trim() &&
      formData.industry.trim() &&
      Object.keys(errors).length === 0
    );
  };

  const getFieldError = (fieldName: string) => touched[fieldName] && errors[fieldName] ? errors[fieldName] : "";

  // ============================================
  // SUBMISSION LOGIC (Step 3)
  // ============================================
  const handleFinalSubmit = async () => {
    if (!isFormValid() || count === 0) return;

    setDirection("forward");
    setCurrentStep(3);
    setIsCreatingAccount(true);
    setProcessingProgress(15);
    setStatusMessage("Initializing Configuration...");
    setApiError(null);

    try {
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
        email: formData.contactEmail,
        company_name: formData.companyName,
        domain: formData.domain,
        industry: formData.industry,
        contact_phone: formData.contactPhone,
        project_description: formData.projectDescription,
        account_type: formData.accountType,
        subscription: formData.subscription,
        modules: selectedIds,
      };

      const [response] = await Promise.all([
        fetch("https://api-admindev.actecal.com/admin/erp/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

      const newTab = window.open("", "_blank");
      if (newTab) newTab.location.href = `https://${result.data.domain}`;

      setTimeout(() => {
        setStatusMessage(`Your ERP is ready! Check your email for login details. Domain: ${result.data.domain}`);
      }, 5000);

    } catch (err: any) {
      setApiError(err.message || "Server error, please try again");
      setIsCreatingAccount(false);
      setProcessingProgress(0);
      setCurrentStep(2); // Jump back to form naturally
    }
  };

  // FULL SCREEN LOADING OVERLAY (Step 3)
  if (isCreatingAccount) {
    return (
      <main className="getstarted-fullpage">
        <div className="full-screen-loading">
          <div className="loading-card">
            <div className="spinner">
              <i className="fas fa-cog fa-spin fa-3x"></i>
            </div>
            {showSuccessState ? (
              <>
                <div className="success-icon-wrapper animate-bounce">
                  <i className="fas fa-check-circle fa-4x text-green-400"></i>
                </div>
                <h2>Setup Complete!</h2>
              </>
            ) : (
              <>
                <h2>Please wait…</h2>
                <p className="loading-title">We’re preparing your workspace…</p>
                <p className="loading-subtitle">This process may take 2–3 minutes.</p>
              </>
            )}
            
            <div className="progress-bar-small">
              <div className="progress-fill-small" style={{ width: `${processingProgress}%` }}></div>
            </div>
            
            <div className="status-terminal">
              <div className="terminal-header">
                <div className="mac-dot r"></div>
                <div className="mac-dot y"></div>
                <div className="mac-dot g"></div>
                <span className="terminal-title">system_init</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="cmd"></span> {statusMessage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="choose-apps-page auth-page">
      {/* LEFT SIDEBAR ALWAYS VISIBLE */}
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
                left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`, opacity: 0.1 + Math.random() * 0.3
              }}></div>
            ))}
          </div>

          <h2 className="auth-sidebar-title">
            {currentStep === 1 ? "Build your perfect business stack." : "The foundation of your digital ecosystem."}
          </h2>
          <p className="auth-sidebar-subtitle">
            {currentStep === 1 ? "Choose the tools that fit your workflow — all connected out of the box." : "A few final details and your private workspace architecture will be provisioned."}
          </p>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper"><i className="fas fa-rocket"></i></div>
              <div className="auth-feature-text">Rapid Deployment Architecture</div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper"><i className="fas fa-shield-alt"></i></div>
              <div className="auth-feature-text">Bank-Grade Infrastructure</div>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper"><i className="fas fa-sync"></i></div>
              <div className="auth-feature-text">Real-time Data Synchronization</div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div className="auth-form-container choose-apps-content-wrapper">
        <div className="auth-form-box choose-apps-form-box" style={{ maxWidth: currentStep === 2 ? '650px' : '100%' }}>
          
          <div className="choose-step-indicator stagger-0">
            <div className={`step-item ${currentStep > 1 ? 'step-done' : 'step-active'}`}>
              <div className="step-dot">{currentStep > 1 ? <i className="fa-solid fa-check"></i> : <span>1</span>}</div>
              <span>Choose Apps</span>
            </div>
            <div className={`step-line ${currentStep > 1 ? 'step-done-line' : ''}`}></div>
            <div className={`step-item ${currentStep === 2 ? 'step-active' : ''}`}>
              <div className="step-dot"><span>2</span></div>
              <span>Setup</span>
            </div>
            <div className="step-line"></div>
            <div className="step-item"><div className="step-dot"><span>3</span></div><span>Launch</span></div>
          </div>

          {/* ======================= PIPELINE STEP 1: CHOOSE APPS ======================= */}
          {currentStep === 1 && (
            <div className="step-fields animate-fade-slide-in">
              <header className="choose-head stagger-0" style={{ paddingBottom: '20px' }}>
                <h1 className="auth-title">Choose your apps</h1>
                <p className="auth-subtitle">Pick the tools you need — everything connects automatically.</p>
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
                  {PRODUCTS.map((prod) => {
                    const prodSelectedCount = prod.modules.filter(m => selectedIds.includes(m.id)).length;
                    return (
                      <button
                        key={prod.name}
                        className={`choose-tab ${selectedProduct?.name === prod.name && !searchTerm ? "tab-active" : ""}`}
                        onClick={() => { setSelectedProduct(prod); setSearchTerm(""); }}
                      >
                        <i className={`${prod.icon} tab-icon`}></i>
                        {prod.name}
                        {prodSelectedCount > 0 && <span className="tab-count">{prodSelectedCount}</span>}
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
                      {filteredProducts.reduce((acc, p) => acc + p.modules.length, 0)} results for "<strong>{searchTerm}</strong>"
                    </div>
                  )}

                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((prod) => (
                      <div key={prod.name} style={{ marginBottom: searchTerm ? '40px' : '0' }}>
                        <ModuleGrid 
                          modules={prod.modules}
                          selectedIds={selectedIds}
                          onToggle={handleToggleModule}
                          onToggleAll={() => handleToggleAllModules(prod)}
                          accentColor={prod.color}
                          icon={prod.icon}
                          isSwitching={false}
                          titleOverride={searchTerm ? `${prod.name} (${prod.modules.length})` : undefined}
                        />
                      </div>
                    ))
                  ) : searchTerm ? (
                    <div className="no-results">
                      <div className="no-results-icon"><i className="fa-solid fa-magnifying-glass"></i></div>
                      <p>No apps matching "<strong>{searchTerm}</strong>"</p>
                      <button className="clear-search-link" onClick={() => setSearchTerm("")}>Clear search</button>
                    </div>
                  ) : (
                    <div className="choose-empty-prompt animate-fade-in">
                      <div className="empty-prompt-icon"><i className="fa-solid fa-layer-group"></i></div>
                      <h3>Select a workspace category</h3>
                      <p>Click on ERP, Exam, Website, or Accounting above to view the available enterprise apps.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ======================= PIPELINE STEP 2: FORM DETAILS ======================= */}
          {currentStep === 2 && (
            <div className="step-fields animate-fade-slide-in">
              <header className="form-header-full stagger-0" style={{ paddingBottom: '24px' }}>
                <div className="auth-title-wrapper" style={{ justifyContent: 'flex-start', marginBottom: '8px' }}>
                  <h1 className="auth-title text-shimmer">
                    Complete your <span className="auth-title-accent">setup</span>
                  </h1>
                </div>
                <p className="auth-subtitle">Just a few company details to build your private cloud.</p>
                {apiError && (
                  <div className="auth-api-error">
                    <i className="fas fa-exclamation-circle"></i> {apiError}
                  </div>
                )}
              </header>

              <form className="auth-form stagger-1" onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                  <div className="auth-input-group" onMouseMove={handleInputMouseMove}>
                    <i className="fa-regular fa-user auth-input-icon"></i>
                    <input
                      id="name"
                      className={`auth-input-max with-icon ${touched.name && !formData.name ? "error" : ""}`}
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                    />
                    <label htmlFor="name" className="auth-label-max">Your Name *</label>
                  </div>
                  <div className="auth-input-group" onMouseMove={handleInputMouseMove}>
                    <i className="fa-regular fa-envelope auth-input-icon"></i>
                    <input
                      id="contactEmail" type="email"
                      className={`auth-input-max with-icon ${getFieldError("contactEmail") ? "error" : ""}`}
                      placeholder=" "
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      onBlur={() => handleBlur("contactEmail")}
                    />
                    <label htmlFor="contactEmail" className="auth-label-max">Company Email *</label>
                  </div>
                </div>

                <div className="auth-input-group" onMouseMove={handleInputMouseMove}>
                  <i className="fa-regular fa-building auth-input-icon"></i>
                  <input
                    id="companyName"
                    className={`auth-input-max with-icon ${touched.companyName && !formData.companyName ? "error" : ""}`}
                    placeholder=" "
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    onBlur={() => handleBlur("companyName")}
                  />
                  <label htmlFor="companyName" className="auth-label-max">Company / Organization *</label>
                </div>

                <div className="auth-input-group" onMouseMove={handleInputMouseMove}>
                  <i className="fa-solid fa-globe auth-input-icon"></i>
                  <input
                    id="domain"
                    className={`auth-input-max with-icon ${touched.domain && !formData.domain ? "error" : ""}`}
                    placeholder=" "
                    value={formData.domain}
                    onChange={(e) => handleInputChange("domain", e.target.value)}
                    onBlur={() => handleBlur("domain")}
                  />
                  <label htmlFor="domain" className="auth-label-max">Subdomain Identifier * (e.g. yourcompany)</label>
                </div>

                <div className="form-row">
                  <div className="auth-input-group" onMouseMove={handleInputMouseMove}>
                    <i className="fa-solid fa-phone auth-input-icon"></i>
                    <input
                      id="contactPhone"
                      className="auth-input-max with-icon"
                      placeholder=" "
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                    />
                    <label htmlFor="contactPhone" className="auth-label-max">Phone Number</label>
                  </div>
                  <div className="auth-input-group" onMouseMove={handleInputMouseMove}>
                    <i className="fa-solid fa-briefcase auth-input-icon"></i>
                    <select
                      id="industry"
                      className={`auth-input-max field-select with-icon ${touched.industry && !formData.industry ? "error" : ""}`}
                      value={formData.industry}
                      onChange={(e) => handleInputChange("industry", e.target.value)}
                      onBlur={() => handleBlur("industry")}
                    >
                      <option value="">Select Industry *</option>
                      {industryCategories.flatMap(cat => cat.industries).map(ind => (
                        <option key={ind.slug} value={ind.name}>{ind.name}</option>
                      ))}
                    </select>
                    <label htmlFor="industry" className="auth-label-max">Industry *</label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="auth-input-group" onMouseMove={handleInputMouseMove}>
                    <i className="fa-solid fa-server auth-input-icon"></i>
                    <select
                      id="accountType"
                      className="auth-input-max field-select with-icon"
                      value={formData.accountType}
                      onChange={(e) => handleInputChange("accountType", e.target.value as any)}
                    >
                      <option value="demo">Demo Cluster</option>
                      <option value="paid">Production Cluster</option>
                    </select>
                    <label htmlFor="accountType" className="auth-label-max">Cluster Type</label>
                  </div>

                  <div className="auth-input-group" onMouseMove={handleInputMouseMove}>
                    <i className="fa-regular fa-credit-card auth-input-icon"></i>
                    <select
                      id="subscription"
                      className="auth-input-max field-select with-icon"
                      value={formData.subscription}
                      onChange={(e) => handleInputChange("subscription", e.target.value as any)}
                    >
                      <option value="basic">Basic Tier</option>
                      <option value="standard">Standard Tier</option>
                      <option value="premium">Premium Tier</option>
                      <option value="enterprise">Enterprise Tier</option>
                    </select>
                    <label htmlFor="subscription" className="auth-label-max">Subscription Plan</label>
                  </div>
                </div>

                <div className="auth-input-group textarea-group" onMouseMove={handleInputMouseMove}>
                  <i className="fa-regular fa-message auth-input-icon"></i>
                  <textarea
                    id="projectDescription"
                    className="auth-input-max with-icon auth-textarea"
                    placeholder=" "
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                  />
                  <label htmlFor="projectDescription" className="auth-label-max">Notes / Custom Requirements</label>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* ======================= ASIDE NAVIGATION CART ======================= */}
        {count > 0 && (
          <aside className="choose-aside" style={{ right: '16px' }}>
            <div className="choose-selected-header">
              <div className="aside-header-left">
                <div className="aside-count-circle">{count}</div>
                <div>
                  <div className="aside-title">{count === 1 ? "App" : "Apps"} selected</div>
                  <div className="aside-subtitle">Cart Value</div>
                </div>
              </div>
              <button className="aside-clear-btn" onClick={() => { setSelectedIds([]); setCurrentStep(1); }} title="Clear all">
                Clear all
              </button>
            </div>

            <div className="choose-selected-list" style={{ maxHeight: currentStep === 2 ? '250px' : '400px' }}>
              {selectedIds.map((key) => {
                let foundModule = null;
                let foundProduct = null;
                for (let p of PRODUCTS) {
                  const m = p.modules.find(mod => mod.id === key);
                  if (m) {
                    foundModule = m;
                    foundProduct = p;
                    break;
                  }
                }
                if (!foundModule || !foundProduct) return null;
                return (
                  <div key={key} className="choose-selected-item">
                    <div className="choose-selected-icon-wrap" style={{ backgroundColor: `${foundProduct.color}22` }}>
                      <i className={foundProduct.icon} style={{ color: foundProduct.color }} aria-hidden="true"></i>
                    </div>
                    <div className="choose-selected-label">{foundModule.name}</div>
                    <button className="choose-selected-remove" onClick={() => handleToggleModule(key)} title={`Remove ${foundModule.name}`}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="choose-info">
              <i className="fa-solid fa-bolt"></i>
              <span>{currentStep === 1 ? "Next: Configure Workspace Details" : "Ready for Instance Provisioning"}</span>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              {currentStep === 2 && (
                <button className="continue-btn" style={{ flex: '0 0 auto', background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }} onClick={goBackToApps}>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              )}
              {currentStep === 1 && (
                <button className="continue-btn" style={{ flex: '1' }} onClick={goToForm}>
                  <span>Continue</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              )}
              {currentStep === 2 && (
                <button className="continue-btn" style={{ flex: '1', background: '#10b981' }} onClick={handleFinalSubmit} disabled={!isFormValid()}>
                  <span>Launch Workspace</span>
                  <i className="fa-solid fa-rocket"></i>
                </button>
              )}
            </div>
          </aside>
        )}

      </div>
    </div>
  );
};
