import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/GetStarted.css";
import { getProducts, Product } from "../data/products";
import { productsApi } from "../services/productsApi";

// App selection logic refined for Elite++ grid

export const GetStarted: React.FC = () => {
  const location = useLocation();

  // Parse query params for pre-selected modules and product
  const searchParams = new URLSearchParams(location.search);
  const selectedAppsParam = searchParams.get("selected");
  const selectedProductParam = searchParams.get("product");
  const initialModules = selectedAppsParam ? selectedAppsParam.split(",") : [];

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [subscriptionPlans, setSubscriptionPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
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
    modules: initialModules,
    selectedProduct: selectedProductParam || "",
  });

  
  // Find selected product from form state (reactive)
  const selectedProduct = products.find(
    (p) => p.name.toLowerCase() === formData.selectedProduct?.toLowerCase(),
  );

  // Remove AVAILABLE_MODULES - use only from products.ts

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [showProcessingPopup, setShowProcessingPopup] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState(
    "Initializing Configuration...",
  );
  const [showSuccessState, setShowSuccessState] = useState(false);

  // Fetch subscription plans from API
  const fetchSubscriptionPlans = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/subscriptions/plans', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionPlans(data.data);
        console.log('Available plans:', data.data);
      } else {
        console.error('Failed to fetch plans:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
    }
  };

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [erpResult, setErpResult] = useState<Record<string, boolean>>({});

  // API Loading States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const [currentStep] = useState(1);
  
  // Fetch products and subscription plans on component mount
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
    fetchSubscriptionPlans();
  }, []);

  // Auto-select modules when product is selected from URL
  useEffect(() => {
    if (selectedProduct && selectedProduct.modules && formData.modules.length === 0) {
      // Auto-select all modules for the selected product
      const moduleIds = selectedProduct.modules.map(module => module.id);
      setFormData(prev => ({
        ...prev,
        modules: moduleIds
      }));
    }
  }, [selectedProduct, formData.modules.length]);

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

  // const handleStep1Next = async () => {
  //   if (!isStep1Valid()) return;

  //   // Reset previous errors
  //   setApiError(null);
  //   setIsSubmitting(true);
  //   setIsCreatingAccount(true);
  //   setShowProcessingPopup(true);
  //   setProcessingProgress(15);
  //   setStatusMessage("Initializing Configuration...");
  //   setShowSuccessState(false);

  //   try {
  //     const payload = {
  //       name: formData.name.trim(),
  //       email: formData.contactEmail?.trim() || null,
  //       company_name: formData.companyName.trim(),
  //       // domain: formData.domain || undefined,     // agar backend domain generate kar raha hai toh bhejo mat
  //       industry: formData.selectedProduct?.trim() || "Others",
        
  //       account_type: formData.accountType,
  //       subscription: formData.subscription,
  //       modules: formData.modules,
  //     };

  //     const response =
  //       // await fetch("http://localhost:4000/admin/erp/create", {
  //       await fetch("https://api-admindev.actecal.com/admin/erp/create", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify(payload),
  //       });

  //     // Simulate realistic progress
  //     await new Promise((resolve) => setTimeout(resolve, 800));
  //     setProcessingProgress(40);
  //     setStatusMessage("Creating Database & Domain...");

  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setProcessingProgress(70);
  //     setStatusMessage("Setting up Modules & Admin Account...");

  //     await new Promise((resolve) => setTimeout(resolve, 800));
  //     setProcessingProgress(95);
  //     setStatusMessage("Finalizing Configuration...");

  //     const result = await response.json();

  //     if (!response.ok) {
  //       // ==================== ERROR HANDLING ====================
  //       let errorMsg = result.error || result.message || "Failed to create ERP";

  //       // Special case: Domain already taken
  //       if (
  //         result.error?.includes("Domain already taken") &&
  //         result.suggestions
  //       ) {
  //         errorMsg = `Domain already taken. Suggestions: ${result.suggestions.join(", ")}`;
  //       }

  //       setApiError(errorMsg);

  //       // Close processing modal after small delay so user can see error
  //       setTimeout(() => {
  //         setShowProcessingPopup(false);
  //         setIsSubmitting(false);
  //         setIsCreatingAccount(false);
  //         setProcessingProgress(0);
  //       }, 1200);

  //       return;
  //     }

  //     // ==================== SUCCESS CASE ====================
  //     setProcessingProgress(100);
  //     setStatusMessage("ERP Created Successfully!");
  //     setShowSuccessState(true);

  //     const domain = result.data?.domain;

  //     // Open ERP in new tab
  //     if (domain) {
  //       setTimeout(() => {
  //         window.open(`https://${domain}`, "_blank");
  //       }, 1500);
  //     }

  //     // Show success message with email instruction
  //     setTimeout(() => {
  //       setStatusMessage(
  //         `Your ERP is ready! 🎉\nCheck your email (${formData.contactEmail}) for login details.`,
  //       );
  //     }, 800);

  //     // Auto close modal after 4 seconds and reset
  //     setTimeout(() => {
  //       setShowProcessingPopup(false);
  //       setIsSubmitting(false);
  //       setIsCreatingAccount(false);
  //       setShowSuccessState(false);
  //       setProcessingProgress(0);

  //       // Optional: Navigate to dashboard or success page
  //       // navigate("/success");   // agar success page bana hai toh
  //     }, 4500);
  //   } catch (err: any) {
  //     console.error("Create ERP Error:", err);

  //     const errorMessage =
  //       err.message ||
  //       "Network error. Please check your connection and try again.";

  //     setApiError(errorMessage);

  //     setTimeout(() => {
  //       setShowProcessingPopup(false);
  //       setIsSubmitting(false);
  //       setIsCreatingAccount(false);
  //       setProcessingProgress(0);
  //     }, 1500);
  //   }
  // };

  // Icon mapping helper for modules
  
  const handleStep1Next = async () => {
  if (!isStep1Valid()) return;

  setApiError(null);
  setIsSubmitting(true);
  setIsCreatingAccount(true);
  setShowProcessingPopup(true);
  setProcessingProgress(15);
  setStatusMessage("Initializing Configuration...");
  setShowSuccessState(false);

  try {
    // Ensure selectedProduct is properly taken
    const selectedProductName = formData.selectedProduct?.trim();

    if (!selectedProductName) {
      setApiError("Please select a product");
      setTimeout(() => setShowProcessingPopup(false), 1000);
      setIsSubmitting(false);
      setIsCreatingAccount(false);
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: formData.contactEmail?.trim() || null,
      company_name: formData.companyName.trim(),
      industry: selectedProductName,           // ← Direct aur safe
      product: selectedProductName,            // ← Extra safety (agar backend product field maangta hai)
      account_type: formData.accountType,
      subscription: formData.subscription,
      modules: formData.modules,
    };

    console.log("🚀 Final Payload being sent:", payload);   // ← Ye line zaroori hai debugging ke liye

    // Handle demo account - create normally
    const response = await fetch(
      "http://localhost:4000/admin/erp/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    // Progress simulation
    await new Promise((resolve) => setTimeout(resolve, 800));
    setProcessingProgress(40);
    setStatusMessage("Creating Database & Domain...");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProcessingProgress(70);
    setStatusMessage("Setting up Modules & Admin Account...");

    await new Promise((resolve) => setTimeout(resolve, 800));
    setProcessingProgress(95);
    setStatusMessage("Finalizing Configuration...");

    const result = await response.json();
    setErpResult(result.data);

    if (!response.ok) {
      let errorMsg = result.error || result.message || "Failed to create ERP";

      if (result.error?.includes("Domain already taken") && result.suggestions) {
        errorMsg = `Domain already taken. Suggestions: ${result.suggestions.join(", ")}`;
      }

      setApiError(errorMsg);
      setTimeout(() => {
        setShowProcessingPopup(false);
        setIsSubmitting(false);
        setIsCreatingAccount(false);
        setProcessingProgress(0);
      }, 1200);
      return;
    }

    // Success - ERP created successfully
    setProcessingProgress(100);
    setStatusMessage("ERP Created Successfully!");
    setShowSuccessState(true);

    const domain = result.data?.domain;
    if (domain) {
      setTimeout(() => window.open(`https://${domain}`, "_blank"), 1500);
    }

    setTimeout(() => {
      setStatusMessage(
        `Your ERP is ready! 🎉 Check your email (${formData.contactEmail}) for login details.`
      );
    }, 1000);

    setTimeout(() => {
      setShowProcessingPopup(false);
      setIsSubmitting(false);
      setIsCreatingAccount(false);
      setShowSuccessState(false);
      setProcessingProgress(0);
    }, 1500);

    // Handle paid account - initiate payment after ERP creation
    if (formData.accountType === "paid" && selectedPlan) {
      try {
        const paymentPayload = {
          subscription_id: selectedPlan.id,
          company_id: erpResult.erpId,
          amount: parseFloat(selectedPlan.price),
          customer_name: formData.name.trim() || "User",
          customer_email: formData.contactEmail?.trim() || "",
          customer_phone: formData.contactPhone || "9876543210",
          product_info: `${selectedPlan.name} - ${selectedPlan.billing_cycle || 'Monthly'} Subscription`
        };

        const paymentResponse = await fetch('http://localhost:4000/api/subscriptions/payu/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentPayload)
        });

        const paymentResult = await paymentResponse.json();

        if (!paymentResult.success || !paymentResult.data?.form_data) {
          throw new Error(paymentResult.error || 'Failed to initiate payment with PayU');
        }

        const { payment_url, form_data } = paymentResult.data;

        console.log("🚀 Sending to PayU:", form_data);

        // === Create & Submit Form to PayU ===
        const form = document.createElement('form');
        form.action = payment_url;
        form.method = 'POST';
        form.style.display = 'none';

        Object.keys(form_data).forEach(key => {
          if (form_data[key] !== undefined && form_data[key] !== null) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = String(form_data[key]);
            form.appendChild(input);
          }
        });

        document.body.appendChild(form);
        
        // Submit form
        setTimeout(() => {
          form.submit();
        }, 150);

        return;
      } catch (paymentError) {
        console.error('Payment error:', paymentError);
        setApiError('Payment failed. Please try again.');
        setTimeout(() => setShowProcessingPopup(false), 1000);
        setIsSubmitting(false);
        setIsCreatingAccount(false);
        return;
      }
    }

    } catch (err: any) {
    console.error("Create ERP Error:", err);
    setApiError(err.message || "Network error. Please try again.");
    
    setTimeout(() => {
      setShowProcessingPopup(false);
      setIsSubmitting(false);
      setIsCreatingAccount(false);
    }, 1500);
  }
};
  
  const getModuleIcon = (id: string, name: string) => {
    const n = name.toLowerCase();
    const i = id.toLowerCase();
    
    if (n.includes('finance') || n.includes('accounting') || n.includes('ledger')) return 'fa-calculator';
    if (n.includes('hr') || n.includes('employee') || n.includes('payroll')) return 'fa-users-gears';
    if (n.includes('inventory') || n.includes('stock')) return 'fa-boxes-stacked';
    if (n.includes('sales')) return 'fa-chart-line';
    if (n.includes('crm') || n.includes('customer')) return 'fa-user-tie';
    if (n.includes('procurement') || n.includes('purchase')) return 'fa-cart-shopping';
    if (n.includes('manufacturing') || n.includes('production') || i.includes('mrp')) return 'fa-industry';
    if (n.includes('supply chain') || n.includes('logistics')) return 'fa-truck-fast';
    if (n.includes('warehouse')) return 'fa-warehouse';
    if (n.includes('project')) return 'fa-list-check';
    if (n.includes('asset')) return 'fa-tags';
    if (n.includes('quality')) return 'fa-clipboard-check';
    if (n.includes('maintenance')) return 'fa-screwdriver-wrench';
    if (n.includes('document')) return 'fa-file-invoice';
    if (n.includes('bi') || n.includes('intelligence') || n.includes('analytics')) return 'fa-magnifying-glass-chart';
    if (n.includes('reporting') || n.includes('dashboard')) return 'fa-gauge-high';
    if (n.includes('workflow') || n.includes('automation')) return 'fa-bolt-lightning';
    if (n.includes('compliance') || n.includes('risk')) return 'fa-shield-halved';
    if (n.includes('pos')) return 'fa-cash-register';
    if (n.includes('ecommerce') || n.includes('market')) return 'fa-shop';
    
    // Exam specific
    if (n.includes('exam') || n.includes('grading')) return 'fa-graduation-cap';
    if (n.includes('qbank') || n.includes('question')) return 'fa-file-lines';
    if (n.includes('proctor')) return 'fa-eye';
    
    // Website specific
    if (n.includes('website') || n.includes('landing')) return 'fa-globe';
    if (n.includes('auth')) return 'fa-lock';
    if (n.includes('seo')) return 'fa-rocket';

    return 'fa-cube'; // Fallback
  };

  const getModuleCategoryColor = (id: string) => {
    const i = id.toLowerCase();
    if (i.includes('finance') || i.includes('accounting') || i.includes('budget') || i.includes('ledger') || i.includes('bi')) return '#EAB308'; // Gold
    if (i.includes('hr') || i.includes('employee') || i.includes('payroll')) return '#22C55E'; // Green
    if (i.includes('sales') || i.includes('crm') || i.includes('pos')) return '#3B82F6'; // Blue
    if (i.includes('inventory') || i.includes('warehouse') || i.includes('stock') || i.includes('material')) return '#F97316'; // Orange
    if (i.includes('manufactur') || i.includes('product') || i.includes('supply')) return '#EF4444'; // Red
    if (i.includes('project') || i.includes('asset') || i.includes('maintenance')) return '#8B5CF6'; // Purple
    if (i.includes('exam') || i.includes('school') || i.includes('grad')) return '#06B6D4'; // Cyan
    if (i.includes('website') || i.includes('blog') || i.includes('seo')) return '#EC4899'; // Pink
    return '#64748B'; // Default Slate
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalizing coordinates for tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (centerY - y) / 10;
    const rotateY = (x - centerX) / 10;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.setProperty('--rotate-x', `${rotateX}deg`);
    card.style.setProperty('--rotate-y', `${rotateY}deg`);
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotate-x', `0deg`);
    card.style.setProperty('--rotate-y', `0deg`);
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
                <h3 className="auth-title text-shimmer">
                  Complete your <span className="auth-title-accent">setup</span>
                </h3>
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
                      Company Name *
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
                        {productsLoading ? (
                          <option value="" disabled>Loading products...</option>
                        ) : (
                          products.map((product) => (
                            <option key={product.name} value={product.name}>
                              {product.name.toUpperCase()}
                            </option>
                          ))
                        )}
                      </select>
                      <label
                        htmlFor="selectedProduct"
                        className="auth-label-max"
                      >
                        Select Product *
                      </label>
                      {getFieldError("selectedProduct") && (
                        <div className="field-error">
                          {getFieldError("selectedProduct")}
                        </div>
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
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          handleInputChange("subscription", selectedValue);
                          // Store selected plan details for payment
                          const plan = subscriptionPlans.find(p => p.name.toLowerCase() === selectedValue.toLowerCase());
                          setSelectedPlan(plan);
                        }}
                      >
                        <option value="">Select a plan</option>
                        {subscriptionPlans.map((plan: any) => (
                          <option key={plan.id} value={plan.name.toLowerCase()}>
                            {plan.name} - ₹{plan.price}/{plan.billing_cycle}
                          </option>
                        ))}
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
                      {selectedProduct?.modules ? (
                        selectedProduct.modules.map((mod: any, index: number) => {
                          const isSel = formData.modules.includes(mod.id);
                          return (
                            <div
                              key={mod.id}
                              className={`module-tile-elite ${isSel ? "tile-selected" : ""} animate-scale-in`}
                              style={
                                {
                                  animationDelay: `${0.7 + index * 0.05}s`,
                                  "--module-accent": getModuleCategoryColor(mod.id),
                                  "--product-color": selectedProduct?.color || "#0f172a",
                                } as React.CSSProperties
                              }
                              onClick={() => {
                                const newModules = isSel
                                  ? formData.modules.filter((v) => v !== mod.id)
                                  : [...formData.modules, mod.id];
                                handleInputChange("modules", newModules);
                              }}
                              onMouseMove={handleCardMouseMove}
                              onMouseLeave={handleCardMouseLeave}
                            >
                              <div className="module-tile-gloss"></div>
                              <div className="module-tile-shimmer"></div>
                              <div className="module-tile-interactive-glow"></div>
                              <div className="module-tile-background-glow"></div>

                              <div className="module-icon-wrapper">
                                <div
                                  className="module-icon-glow"
                                  style={{
                                    backgroundColor: isSel
                                      ? getModuleCategoryColor(mod.id)
                                      : "transparent",
                                  }}
                                ></div>
                                <div
                                  className="module-icon"
                                  style={{
                                    borderColor: isSel
                                      ? getModuleCategoryColor(mod.id)
                                      : "rgba(226, 232, 240, 0.8)",
                                  }}
                                >
                                  <i
                                    className={`fa-solid ${getModuleIcon(mod.id, mod.name)}`}
                                    style={{
                                      color: isSel
                                        ? getModuleCategoryColor(mod.id)
                                        : "#64748b",
                                    }}
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                              <div className="module-info-stack">
                                <div className="module-label">{mod.name}</div>
                              </div>

                              {isSel && (
                                <>
                                  <div className="module-holographic-sweep"></div>
                                  <div
                                    className="module-selection-badge"
                                    style={{
                                      backgroundColor: getModuleCategoryColor(mod.id),
                                    }}
                                  >
                                    <i className="fa-solid fa-check"></i>
                                  </div>
                                </>
                              )}

                              <div className="module-tile-border-highlight"></div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="no-modules-message">
                          <p>Please select a product first to see available modules</p>
                        </div>
                      )}
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
               <i className="fa-solid fa-circle-check success-icon"></i>
                </div>
                <h2 className="success-title">ERP Created Successfully!</h2>
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
