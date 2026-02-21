// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import "../styles/GetStarted.css";

// // App selection data from ChooseApps page
// type AppTile = { key: string; label: string; icon: string; color: string };
// type AppCategory = { name: string; tiles: AppTile[] };

// const APP_CATEGORIES: AppCategory[] = [
//   {
//     name: "Website",
//     tiles: [
//       {
//         key: "website",
//         label: "Website",
//         icon: "fa-solid fa-globe",
//         color: "#06b6d4",
//       },
//       {
//         key: "ecommerce",
//         label: "eCommerce",
//         icon: "fa-solid fa-cart-shopping",
//         color: "#a855f7",
//       },
//       {
//         key: "blog",
//         label: "Blog",
//         icon: "fa-solid fa-pen-nib",
//         color: "#ef4444",
//       },
//       {
//         key: "forum",
//         label: "Forum",
//         icon: "fa-solid fa-comments",
//         color: "#10b981",
//       },
//       {
//         key: "elearning",
//         label: "eLearning",
//         icon: "fa-solid fa-graduation-cap",
//         color: "#22c55e",
//       },
//       {
//         key: "events",
//         label: "Events",
//         icon: "fa-solid fa-calendar-days",
//         color: "#f97316",
//       },
//     ],
//   },
//   {
//     name: "Sales",
//     tiles: [
//       { key: "crm", label: "CRM", icon: "fa-solid fa-users", color: "#14b8a6" },
//       {
//         key: "sales",
//         label: "Sales",
//         icon: "fa-solid fa-chart-line",
//         color: "#a855f7",
//       },
//       {
//         key: "pos",
//         label: "Point of Sale",
//         icon: "fa-solid fa-store",
//         color: "#f59e0b",
//       },
//       {
//         key: "restaurant",
//         label: "Restaurant",
//         icon: "fa-solid fa-utensils",
//         color: "#f97316",
//       },
//       {
//         key: "subscriptions",
//         label: "Subscriptions",
//         icon: "fa-solid fa-arrows-rotate",
//         color: "#06b6d4",
//       },
//       {
//         key: "rental",
//         label: "Rental",
//         icon: "fa-solid fa-key",
//         color: "#8b5cf6",
//       },
//     ],
//   },
//   {
//     name: "Finance",
//     tiles: [
//       {
//         key: "invoicing",
//         label: "Invoicing",
//         icon: "fa-solid fa-file-invoice-dollar",
//         color: "#3b82f6",
//       },
//       {
//         key: "accounting",
//         label: "Accounting",
//         icon: "fa-solid fa-coins",
//         color: "#10b981",
//       },
//       {
//         key: "expenses",
//         label: "Expenses",
//         icon: "fa-solid fa-wallet",
//         color: "#06b6d4",
//       },
//       {
//         key: "sign",
//         label: "Sign",
//         icon: "fa-solid fa-signature",
//         color: "#0ea5e9",
//       },
//       {
//         key: "equity",
//         label: "Equity",
//         icon: "fa-solid fa-chart-pie",
//         color: "#f59e0b",
//       },
//       { key: "esg", label: "ESG", icon: "fa-solid fa-leaf", color: "#22c55e" },
//     ],
//   },
//   {
//     name: "Services",
//     tiles: [
//       {
//         key: "project",
//         label: "Project",
//         icon: "fa-solid fa-diagram-project",
//         color: "#10b981",
//       },
//       {
//         key: "timesheets",
//         label: "Timesheets",
//         icon: "fa-solid fa-stopwatch",
//         color: "#64748b",
//       },
//       {
//         key: "field-service",
//         label: "Field Service",
//         icon: "fa-solid fa-bolt",
//         color: "#f59e0b",
//       },
//       {
//         key: "helpdesk",
//         label: "Helpdesk",
//         icon: "fa-solid fa-headphones",
//         color: "#10b981",
//       },
//       {
//         key: "appointments",
//         label: "Appointments",
//         icon: "fa-solid fa-calendar-check",
//         color: "#a855f7",
//       },
//       {
//         key: "planning",
//         label: "Planning",
//         icon: "fa-solid fa-calendar-days",
//         color: "#22c55e",
//       },
//     ],
//   },
//   {
//     name: "Productivity",
//     tiles: [
//       {
//         key: "documents",
//         label: "Documents",
//         icon: "fa-regular fa-file-lines",
//         color: "#f97316",
//       },
//       {
//         key: "approvals",
//         label: "Approvals",
//         icon: "fa-solid fa-circle-check",
//         color: "#22c55e",
//       },
//       {
//         key: "knowledge",
//         label: "Knowledge",
//         icon: "fa-solid fa-book",
//         color: "#0ea5e9",
//       },
//     ],
//   },
//   {
//     name: "Supply Chain",
//     tiles: [
//       {
//         key: "inventory",
//         label: "Inventory",
//         icon: "fa-solid fa-box",
//         color: "#a855f7",
//       },
//       {
//         key: "manufacturing",
//         label: "Manufacturing",
//         icon: "fa-solid fa-industry",
//         color: "#10b981",
//       },
//       {
//         key: "purchase",
//         label: "Purchase",
//         icon: "fa-solid fa-cart-shopping",
//         color: "#22c55e",
//       },
//       {
//         key: "maintenance",
//         label: "Maintenance",
//         icon: "fa-solid fa-screwdriver-wrench",
//         color: "#0ea5e9",
//       },
//       {
//         key: "quality",
//         label: "Quality",
//         icon: "fa-solid fa-circle-check",
//         color: "#f59e0b",
//       },
//       {
//         key: "repair",
//         label: "Repair",
//         icon: "fa-solid fa-wrench",
//         color: "#ef4444",
//       },
//     ],
//   },
//   {
//     name: "Marketing",
//     tiles: [
//       {
//         key: "email-marketing",
//         label: "Email Marketing",
//         icon: "fa-solid fa-envelope",
//         color: "#3b82f6",
//       },
//       {
//         key: "sms-marketing",
//         label: "SMS Marketing",
//         icon: "fa-solid fa-comment-dots",
//         color: "#06b6d4",
//       },
//       {
//         key: "survey",
//         label: "Survey",
//         icon: "fa-solid fa-chart-simple",
//         color: "#8b5cf6",
//       },
//       {
//         key: "social-marketing",
//         label: "Social Marketing",
//         icon: "fa-solid fa-heart",
//         color: "#f97316",
//       },
//     ],
//   },
//   {
//     name: "Human Resources",
//     tiles: [
//       {
//         key: "employees",
//         label: "Employees",
//         icon: "fa-solid fa-user-group",
//         color: "#8b5cf6",
//       },
//       {
//         key: "attendances",
//         label: "Attendances",
//         icon: "fa-solid fa-user-check",
//         color: "#f59e0b",
//       },
//       {
//         key: "recruitment",
//         label: "Recruitment",
//         icon: "fa-solid fa-user-plus",
//         color: "#22c55e",
//       },
//       {
//         key: "time-off",
//         label: "Time Off",
//         icon: "fa-solid fa-umbrella-beach",
//         color: "#06b6d4",
//       },
//       {
//         key: "appraisals",
//         label: "Appraisals",
//         icon: "fa-solid fa-star",
//         color: "#f59e0b",
//       },
//       {
//         key: "fleet",
//         label: "Fleet",
//         icon: "fa-solid fa-car-side",
//         color: "#a855f7",
//       },
//       {
//         key: "payroll",
//         label: "Payroll",
//         icon: "fa-solid fa-file-invoice",
//         color: "#ef4444",
//       },
//     ],
//   },
//   {
//     name: "Customizations",
//     tiles: [
//       {
//         key: "studio",
//         label: "Studio",
//         icon: "fa-solid fa-screwdriver-wrench",
//         color: "#06b6d4",
//       },
//     ],
//   },
// ];

// const MAX_APP_SELECTION = 10;

// export const GetStarted: React.FC = () => {
//   const [formData, setFormData] = useState({
//     domain: "",
//     companyName: "",
//     industry: "",
//     contactEmail: "",
//     contactPhone: "",
//     projectDescription: "",
//     selectedApps: [] as string[],

//     // ←← YE 6 NEW FIELDS ADD KAR DO
//     name: "",
//     accountType: "demo" as "demo" | "paid",
//     subscription: "starter" as "basic" | "starter" | "premium" | "enterprise",
//     // companyName already hai, email bhi hai → bas name aur ye 3 naye
//   });

//   // 2. Account types aur subscriptions define kar do (file ke upar)
//   const ACCOUNT_TYPES = ["demo", "paid"] as const;
//   const SUBSCRIPTIONS = ["basic", "starter", "premium", "enterprise"] as const;
//   const INDUSTRIES = [
//     "Manufacturing",
//     "Retail",
//     "E-commerce",
//     "Logistics",
//     "FMCG",
//     "Pharmaceuticals",
//     "Automotive",
//     "Electronics",
//     "Textiles",
//     "Cold Storage",
//     "Others",
//   ];
//   const [mounted, setMounted] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [showTitle, setShowTitle] = useState(false);
//   const [showSubtitle, setShowSubtitle] = useState(false);
//   const [showFormTitle, setShowFormTitle] = useState(false);
//   const [showFormDesc, setShowFormDesc] = useState(false);
//   const [showFields, setShowFields] = useState(false);
//   const [showButtons, setShowButtons] = useState(false);
//   const navigate = useNavigate();
//   const [search] = useSearchParams();

//   // Form validation states
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [touched, setTouched] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     const t = setTimeout(() => setMounted(true), 100);
//     const t2 = setTimeout(() => setShowTitle(true), 300);
//     const t3 = setTimeout(() => setShowSubtitle(true), 600);
//     const t4 = setTimeout(() => setShowForm(true), 900);
//     const t5 = setTimeout(() => setShowFormTitle(true), 1200);
//     const t6 = setTimeout(() => setShowFormDesc(true), 1400);
//     const t7 = setTimeout(() => setShowFields(true), 1600);
//     const t8 = setTimeout(() => setShowButtons(true), 2000);
//     return () => {
//       clearTimeout(t);
//       clearTimeout(t2);
//       clearTimeout(t3);
//       clearTimeout(t4);
//       clearTimeout(t5);
//       clearTimeout(t6);
//       clearTimeout(t7);
//       clearTimeout(t8);
//     };
//   }, []);

//   const validateField = (name: string, value: string | string[]) => {
//     const newErrors = { ...errors };

//     switch (name) {
//       case "domain":
//         if (!value || typeof value !== "string") {
//           newErrors.domain = "Domain is required";
//         } else if (
//           !/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.[a-zA-Z]{2,}$/.test(value)
//         ) {
//           newErrors.domain =
//             "Please enter a valid domain (e.g., yourcompany.com)";
//         } else {
//           delete newErrors.domain;
//         }
//         break;
//       case "companyName":
//         if (!value || typeof value !== "string" || !value.trim()) {
//           newErrors.companyName = "Company name is required";
//         } else {
//           delete newErrors.companyName;
//         }
//         break;
//       case "contactEmail":
//         if (!value || typeof value !== "string") {
//           newErrors.contactEmail = "Email is required";
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           newErrors.contactEmail = "Please enter a valid email address";
//         } else {
//           delete newErrors.contactEmail;
//         }
//         break;
//       case "contactPhone":
//         if (!value || typeof value !== "string") {
//           newErrors.contactPhone = "Phone number is required";
//         } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(value.replace(/\s/g, ""))) {
//           newErrors.contactPhone = "Please enter a valid phone number";
//         } else {
//           delete newErrors.contactPhone;
//         }
//         break;
//       case "projectDescription":
//         if (!value || typeof value !== "string" || !value.trim()) {
//           newErrors.projectDescription = "Project description is required";
//         } else if (value.trim().length < 50) {
//           newErrors.projectDescription =
//             "Please provide at least 50 characters";
//         } else {
//           delete newErrors.projectDescription;
//         }
//         break;
//       default:
//         delete newErrors[name];
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (name: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (touched[name]) {
//       validateField(name, value);
//     }
//   };

//   const handleBlur = (name: string) => {
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     validateField(name, formData[name as keyof typeof formData]);
//   };

//   const canContinue = Boolean(
//     formData.domain &&
//       formData.companyName.trim() &&
//       formData.contactEmail &&
//       formData.contactPhone &&
//       formData.projectDescription.trim().length >= 50 &&
//       formData.selectedApps.length > 0 &&
//       Object.keys(errors).length === 0
//   );

//   // App selection functionality
//   const toggleAppSelection = (appKey: string) => {
//     setFormData((prev) => {
//       const isAlreadySelected = prev.selectedApps.includes(appKey);
//       if (!isAlreadySelected && prev.selectedApps.length >= MAX_APP_SELECTION) {
//         return prev;
//       }

//       return {
//         ...prev,
//         selectedApps: isAlreadySelected
//           ? prev.selectedApps.filter((key) => key !== appKey)
//           : [...prev.selectedApps, appKey],
//       };
//     });
//   };

//   const getSelectedAppsCount = () => formData.selectedApps.length;
//   const isSelectionLimitReached = getSelectedAppsCount() >= MAX_APP_SELECTION;

//   const scrollToForm = () => {
//     formSectionRef.current?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   const onContinue = () => {
//     if (!canContinue) return;
//     navigate("/launch-plan");
//     handleSuccessfulSubmit();
//   };

// const getFieldError = (fieldName: string) => {
//   return touched[fieldName] && errors[fieldName] ? errors[fieldName] : "";
// };

//   // Multi-step form functionality
//   const [currentStep, setCurrentStep] = useState(1);
//   const [completedSteps, setCompletedSteps] = useState<Set<number>>(
//     new Set([])
//   );

//   const steps = [
//     {
//       id: 1,
//       title: "Company Details",
//       description: "Basic information about your company",
//       fields: ["domain", "companyName", "industry"],
//       icon: "fas fa-building",
//     },
//     {
//       id: 2,
//       title: "App Selection",
//       description: "Choose the apps you need",
//       fields: ["selectedApps"],
//       icon: "fas fa-puzzle-piece",
//     },
//     {
//       id: 3,
//       title: "Contact Information",
//       description: "How we can reach you",
//       fields: ["contactEmail", "contactPhone"],
//       icon: "fas fa-user",
//     },
//     {
//       id: 4,
//       title: "Project Description",
//       description: "Tell us about your vision",
//       fields: ["projectDescription"],
//       icon: "fas fa-lightbulb",
//     },
//   ];

//   const getStepFields = (stepId: number) => {
//     return steps.find((step) => step.id === stepId)?.fields || [];
//   };

//   const isStepValid = (stepId: number) => {
//     const stepFields = getStepFields(stepId);
//     return stepFields.every((field) => {
//       const value = formData[field as keyof typeof formData];
//       if (field === "projectDescription") {
//         return typeof value === "string" && value.trim().length >= 50;
//       }
//       if (field === "selectedApps") {
//         return Array.isArray(value) && value.length > 0;
//       }
//       return field === "domain" ||
//         field === "companyName" ||
//         field === "contactEmail" ||
//         field === "contactPhone"
//         ? typeof value === "string" && Boolean(value)
//         : true; // Optional fields
//     });
//   };

//   const canGoToStep = (stepId: number) => {
//     // Can go to previous steps or next step if current step is valid
//     if (stepId < currentStep) return true;
//     if (stepId === currentStep + 1) return isStepValid(currentStep);
//     return false;
//   };

//   const goToStep = (stepId: number) => {
//     if (canGoToStep(stepId)) {
//       setCurrentStep(stepId);
//       if (isStepValid(currentStep) && !completedSteps.has(currentStep)) {
//         setCompletedSteps(
//           (prev) => new Set([...Array.from(prev), currentStep])
//         );
//       }
//     }
//   };

//   const nextStep = () => {
//     if (currentStep < steps.length && isStepValid(currentStep)) {
//       setCompletedSteps((prev) => new Set([...Array.from(prev), currentStep]));
//       setCurrentStep((prev) => prev + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep((prev) => prev - 1);
//     }
//   };

//   // Check if all steps are completed
//   const allStepsCompleted = () => {
//     return steps.every((step) => isStepValid(step.id));
//   };

//   const getProgressPercentage = () => {
//     const requiredFields = [
//       "domain",
//       "companyName",
//       "contactEmail",
//       "contactPhone",
//       "projectDescription",
//     ];
//     const filledRequired = requiredFields.filter((field) => {
//       const value = formData[field as keyof typeof formData];
//       return field === "projectDescription"
//         ? typeof value === "string" && value.trim().length >= 50
//         : typeof value === "string" && Boolean(value);
//     }).length;
//     const optionalFields = ["industry"];
//     const filledOptional = optionalFields.filter((field) => {
//       const value = formData[field as keyof typeof formData];
//       return typeof value === "string" && Boolean(value);
//     }).length;
//     const filledApps = formData.selectedApps.length > 0 ? 1 : 0;

//     const requiredProgress = (filledRequired / requiredFields.length) * 60;
//     const optionalProgress = optionalFields.length
//       ? (filledOptional / optionalFields.length) * 30
//       : 0;
//     const appsProgress = filledApps * 10;
//     return Math.round(requiredProgress + optionalProgress + appsProgress);
//   };

//   // Auto-save functionality
//   const [lastSaved, setLastSaved] = useState<Date | null>(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
//   const formSectionRef = useRef<HTMLDivElement | null>(null);

//   // Load draft on component mount
//   useEffect(() => {
//     const savedDraft = localStorage.getItem("getStartedDraft");
//     if (savedDraft) {
//       try {
//         const parsedData = JSON.parse(savedDraft);
//         const savedTime = new Date(parsedData.timestamp);
//         const hoursSinceSave =
//           (Date.now() - savedTime.getTime()) / (1000 * 60 * 60);

//         // Only restore if saved within last 24 hours
//         if (hoursSinceSave < 24) {
//           setFormData({
//             domain: parsedData.domain || "",
//             companyName: parsedData.companyName || "",
//             industry: parsedData.industry || "",
//             contactEmail: parsedData.contactEmail || "",
//             contactPhone: parsedData.contactPhone || "",
//             projectDescription: parsedData.projectDescription || "",
//             selectedApps: parsedData.selectedApps || [],
//             accountType: parsedData.accountType || "demo",
//             name: parsedData.name || "",
//             subscription: parsedData.subscription || "",
//           });
//           setLastSaved(savedTime);
//         } else {
//           // Clear old draft
//           localStorage.removeItem("getStartedDraft");
//         }
//       } catch (error) {
//         console.error("Error loading draft:", error);
//         localStorage.removeItem("getStartedDraft");
//       }
//     }
//   }, []);

//   // Clear draft when form is successfully submitted
//   const handleSuccessfulSubmit = () => {
//     localStorage.removeItem("getStartedDraft");
//     setLastSaved(null);
//   };

//   const clearForm = () => {
//     setFormData({
//       domain: "",
//       companyName: "",
//       industry: "",
//       contactEmail: "",
//       contactPhone: "",
//       projectDescription: "",
//       selectedApps: [],
//       accountType: "demo",
//       name: "",
//       subscription: "basic",
//     });
//     setErrors({});
//     setTouched({});
//     setCurrentStep(1);
//     setCompletedSteps(new Set([]));
//   };

//   const autoSave = useCallback(() => {
//     if (
//       Object.values(formData).some((value) => {
//         if (Array.isArray(value)) return value.length > 0;
//         return typeof value === "string" && value.trim() !== "";
//       })
//     ) {
//       setIsSaving(true);
//       const draftData = {
//         ...formData,
//         timestamp: new Date().toISOString(),
//       };

//       try {
//         localStorage.setItem("getStartedDraft", JSON.stringify(draftData));
//         setLastSaved(new Date());

//         // Simulate save delay for better UX
//         setTimeout(() => {
//           setIsSaving(false);
//         }, 500);
//       } catch (error) {
//         console.error("Error saving draft:", error);
//         setIsSaving(false);
//       }
//     }
//   }, [formData]);

//   // Trigger auto-save on form data changes
//   useEffect(() => {
//     if (saveTimeoutRef.current) {
//       clearTimeout(saveTimeoutRef.current);
//     }

//     saveTimeoutRef.current = setTimeout(() => {
//       autoSave();
//     }, 2000); // Auto-save after 2 seconds of inactivity

//     return () => {
//       if (saveTimeoutRef.current) {
//         clearTimeout(saveTimeoutRef.current);
//       }
//     };
//   }, [formData, autoSave]);

//   return (
//     <main className="getstarted-fullpage">
//       {/* Ambient Gradient and Floating Accents */}
//       <div className="background-particles" />
//       <div className="floating-elements">
//         <div className="floating-element floating-1">
//           <i className="fas fa-chart-line"></i>
//         </div>
//         <div className="floating-element floating-2">
//           <i className="fas fa-users"></i>
//         </div>
//         <div className="floating-element floating-3">
//           <i className="fas fa-cog"></i>
//         </div>
//         <div className="floating-element floating-4">
//           <i className="fas fa-lightbulb"></i>
//         </div>
//         <div className="floating-element floating-5">
//           <i className="fas fa-rocket"></i>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <section className={`hero-section-full ${mounted ? "in" : ""}`}>
//         <div className="hero-content-full">
//           <h1 className="hero-title-full">
//             <span className={`text-animate ${showTitle ? "animate-in" : ""}`}>
//               Start Your
//             </span>
//             <span
//               className={`text-animate delay-1 ${
//                 showTitle ? "animate-in" : ""
//               }`}
//             >
//               Digital Journey
//             </span>
//           </h1>
//           <p
//             className={`hero-subtitle-full ${
//               showSubtitle ? "subtitle-animate" : ""
//             }`}
//           >
//             Transform your business with a professional website that drives
//             results. Tell us about your project and we'll create something
//             exceptional together.
//           </p>

//           <div className="hero-meta">
//             <div className="hero-cta">
//               <button
//                 type="button"
//                 className="btn btn-primary hero-cta-btn"
//                 onClick={scrollToForm}
//               >
//                 Start your project
//                 <i className="fas fa-arrow-right"></i>
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary hero-cta-btn"
//                 onClick={() => navigate("/apps")}
//               >
//                 Explore apps catalogue
//                 <i className="fas fa-th-large"></i>
//               </button>
//             </div>

//             <div className="hero-metrics">
//               <div className="hero-metric-card">
//                 <span className="metric-value">250+</span>
//                 <span className="metric-label">Projects delivered</span>
//               </div>
//               <div className="hero-metric-card">
//                 <span className="metric-value">40%</span>
//                 <span className="metric-label">Faster launch</span>
//               </div>
//               <div className="hero-metric-card">
//                 <span className="metric-value">24/7</span>
//                 <span className="metric-label">Expert support</span>
//               </div>
//             </div>
//           </div>

//           <div className="hero-features">
//             <div className="feature-item">
//               <i className="fas fa-lightbulb"></i>
//               <span>Strategy workshop</span>
//             </div>
//             <div className="feature-item">
//               <i className="fas fa-layer-group"></i>
//               <span>Modular architecture</span>
//             </div>
//             <div className="feature-item">
//               <i className="fas fa-mobile-alt"></i>
//               <span>Responsive by default</span>
//             </div>
//             <div className="feature-item">
//               <i className="fas fa-headset"></i>
//               <span>Dedicated success team</span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Form Section */}
//       <section className={`form-section-full ${showForm ? "in" : ""}`}>
//         <div className="form-container-full" ref={formSectionRef}>
//           <div className="form-header-full">
//             <h2
//               className={`form-title-full ${
//                 showFormTitle ? "title-animate" : ""
//               }`}
//             >
//               <span className="title-word">Get</span>{" "}
//               <span className="title-word">Started</span>
//             </h2>
//           </div>

//           <form
//             className="multi-step-form"
//             onSubmit={(e) => e.preventDefault()}
//           >
//             {/* Progress Indicator */}
//             <div className="form-progress-container">
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${getProgressPercentage()}%` }}
//                 />
//               </div>
//               <div className="progress-header">
//                 <span className="progress-text">
//                   {getProgressPercentage()}% Complete
//                 </span>
//                 <div className="auto-save-status">
//                   {isSaving ? (
//                     <>
//                       <i className="fas fa-spinner fa-spin"></i>
//                       <span>Saving...</span>
//                     </>
//                   ) : lastSaved ? (
//                     <>
//                       <i className="fas fa-check-circle"></i>
//                       <span>Saved {lastSaved.toLocaleTimeString()}</span>
//                     </>
//                   ) : null}
//                 </div>
//               </div>
//             </div>

//             {/* Step Content */}
//             <div
//               className={`step-content ${showFields ? "fields-animate" : ""}`}
//             >
//               {/* {currentStep === 1 && (
//                 <div className="step-fields">
//                   <h3 className="step-heading">
//                     <i className="fas fa-building"></i>
//                     Company Details
//                   </h3>
//                   <div className="form-row">
//                     <div className="field-group-full">
//                       <label className="field-label-full">
//                         <i className="fas fa-globe"></i>
//                         <span className="label-word">Company Domain</span>
//                         <span className="required">*</span>
//                       </label>
//                       <input
//                         className={`field-input-full ${
//                           getFieldError("domain") ? "error" : ""
//                         }`}
//                         placeholder="yourcompany.com"
//                         value={formData.domain}
//                         onChange={(e) =>
//                           handleInputChange("domain", e.target.value)
//                         }
//                         onBlur={() => handleBlur("domain")}
//                         autoFocus
//                         aria-required="true"
//                         aria-invalid={Boolean(getFieldError("domain"))}
//                         aria-describedby={
//                           getFieldError("domain") ? "domain-error" : undefined
//                         }
//                       />
//                       {getFieldError("domain") && (
//                         <div
//                           className="field-error"
//                           id="domain-error"
//                           role="alert"
//                         >
//                           <i className="fas fa-exclamation-circle"></i>
//                           {getFieldError("domain")}
//                         </div>
//                       )}
//                     </div>

//                     <div className="field-group-full">
//                       <label className="field-label-full">
//                         <i className="fas fa-building"></i>
//                         <span className="label-word">Company Name</span>
//                         <span className="required">*</span>
//                       </label>
//                       <input
//                         className={`field-input-full ${
//                           getFieldError("companyName") ? "error" : ""
//                         }`}
//                         placeholder="Your Company Name"
//                         value={formData.companyName}
//                         onChange={(e) =>
//                           handleInputChange("companyName", e.target.value)
//                         }
//                         onBlur={() => handleBlur("companyName")}
//                         aria-required="true"
//                         aria-invalid={Boolean(getFieldError("companyName"))}
//                         aria-describedby={
//                           getFieldError("companyName")
//                             ? "company-error"
//                             : undefined
//                         }
//                       />
//                       {getFieldError("companyName") && (
//                         <div
//                           className="field-error"
//                           id="company-error"
//                           role="alert"
//                         >
//                           <i className="fas fa-exclamation-circle"></i>
//                           {getFieldError("companyName")}
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <div className="field-group-full">
//                     <label className="field-label-full">
//                       <i className="fas fa-industry"></i>
//                       <span className="label-word">Industry</span>
//                     </label>
//                     <select
//                       className="field-input-full field-select"
//                       value={formData.industry}
//                       onChange={(e) =>
//                         handleInputChange("industry", e.target.value)
//                       }
//                     >
//                       <option value="">Select your industry</option>
//                       <option value="technology">Technology</option>
//                       <option value="healthcare">Healthcare</option>
//                       <option value="finance">Finance</option>
//                       <option value="retail">Retail</option>
//                       <option value="education">Education</option>
//                       <option value="manufacturing">Manufacturing</option>
//                       <option value="real-estate">Real Estate</option>
//                       <option value="hospitality">Hospitality</option>
//                       <option value="consulting">Consulting</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>
//                 </div>
//               )} */}
//               {currentStep === 1 && (
//                 <div className="step-fields">
//                   <h3 className="step-heading">Company Details</h3>

//                   {/* Tumhara purana domain field */}
//                   <div className="form-row">
//                     <div className="field-group-full">
//                       <label className="field-label-full">
//                         Company Domain <span className="required">*</span>
//                       </label>
//                       <input
//                         className={`field-input-full ${
//                           getFieldError("domain") ? "error" : ""
//                         }`}
//                         placeholder="yourcompany.com"
//                         value={formData.domain}
//                         onChange={(e) =>
//                           handleInputChange("domain", e.target.value)
//                         }
//                         onBlur={() => handleBlur("domain")}
//                       />
//                       {getFieldError("domain") && (
//                         <div className="field-error">
//                           {getFieldError("domain")}
//                         </div>
//                       )}
//                     </div>

//                     {/* NEW: Name field */}
//                     <div className="field-group-full">
//                       <label className="field-label-full">
//                         Your Name <span className="required">*</span>
//                       </label>
//                       <input
//                         className="field-input-full"
//                         placeholder="Rahul Sharma"
//                         value={formData.name}
//                         onChange={(e) =>
//                           handleInputChange("name", e.target.value)
//                         }
//                         onBlur={() => handleBlur("name")}
//                       />
//                     </div>
//                   </div>

//                   {/* Company Name */}
//                   <div className="field-group-full">
//                     <label className="field-label-full">
//                       Company Name <span className="required">*</span>
//                     </label>
//                     <input
//                       className={`field-input-full ${
//                         getFieldError("companyName") ? "error" : ""
//                       }`}
//                       placeholder="Sharma Enterprises"
//                       value={formData.companyName}
//                       onChange={(e) =>
//                         handleInputChange("companyName", e.target.value)
//                       }
//                       onBlur={() => handleBlur("companyName")}
//                     />
//                     {getFieldError("companyName") && (
//                       <div className="field-error">
//                         {getFieldError("companyName")}
//                       </div>
//                     )}
//                   </div>

//                   {/* Industry */}
//                   <div className="field-group-full">
//                     <label className="field-label-full">Industry</label>
//                     <select
//                       className="field-input-full field-select"
//                       value={formData.industry}
//                       onChange={(e) =>
//                         handleInputChange("industry", e.target.value)
//                       }
//                     >
//                       <option value="">Select Industry</option>
//                       {INDUSTRIES.map((ind) => (
//                         <option key={ind} value={ind}>
//                           {ind}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Account Type Radio */}
//                   <div className="field-group-full">
//                     <label className="field-label-full">
//                       Account Type <span className="required">*</span>
//                     </label>
//                     <div
//                       style={{
//                         display: "flex",
//                         gap: "20px",
//                         marginTop: "10px",
//                       }}
//                     >
//                       {ACCOUNT_TYPES.map((type) => (
//                         <label
//                           key={type}
//                           style={{
//                             display: "flex",
//                             alignItems: "center",
//                             cursor: "pointer",
//                           }}
//                         >
//                           <input
//                             type="radio"
//                             name="accountType"
//                             checked={formData.accountType === type}
//                             onChange={() =>
//                               handleInputChange("accountType", type)
//                             }
//                             style={{ marginRight: "8px" }}
//                           />
//                           <span>
//                             {type === "demo"
//                               ? "14-Day Free Demo"
//                               : "Paid Account"}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Subscription Plan */}
//                   <div className="field-group-full">
//                     <label className="field-label-full">
//                       Choose Plan <span className="required">*</span>
//                     </label>
//                     <select
//                       className="field-input-full field-select"
//                       value={formData.subscription}
//                       onChange={(e) =>
//                         handleInputChange("subscription", e.target.value as any)
//                       }
//                     >
//                       {SUBSCRIPTIONS.map((plan) => (
//                         <option key={plan} value={plan}>
//                           {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               )}

//               {currentStep === 2 && (
//                 <div className="step-fields">
//                   <h3 className="step-heading">
//                     <i className="fas fa-puzzle-piece"></i>
//                     App Selection
//                   </h3>
//                   <div className="app-selection-container">
//                     <div className="selected-apps-summary">
//                       <div className="apps-count">
//                         <i className="fas fa-check-circle"></i>
//                         <span>
//                           {getSelectedAppsCount() === 0
//                             ? "No apps selected"
//                             : `${getSelectedAppsCount()} ${
//                                 getSelectedAppsCount() === 1 ? "app" : "apps"
//                               } selected`}
//                         </span>
//                       </div>
//                       {isSelectionLimitReached && (
//                         <div className="selection-limit" role="status">
//                           Maximum of {MAX_APP_SELECTION} apps can be selected.
//                         </div>
//                       )}
//                       {getSelectedAppsCount() >= 3 && (
//                         <div className="selection-reward" role="status">
//                           You qualify for a 15-day free trial with 3+ apps
//                           selected.
//                         </div>
//                       )}
//                       {getSelectedAppsCount() === 0 && (
//                         <div className="selection-hint">
//                           <i className="fas fa-info-circle"></i>
//                           Please select at least one app to continue
//                         </div>
//                       )}
//                     </div>

//                     <div className="apps-categories">
//                       {APP_CATEGORIES.map((category) => (
//                         <div key={category.name} className="apps-category">
//                           <h4 className="category-title">{category.name}</h4>
//                           <div className="apps-grid">
//                             {category.tiles.map((app) => {
//                               const isSelected = formData.selectedApps.includes(
//                                 app.key
//                               );
//                               return (
//                                 <div
//                                   key={app.key}
//                                   className={`app-tile ${
//                                     isSelected ? "selected" : ""
//                                   }`}
//                                   onClick={() => toggleAppSelection(app.key)}
//                                   role="button"
//                                   tabIndex={0}
//                                   onKeyDown={(e) => {
//                                     if (e.key === "Enter" || e.key === " ") {
//                                       e.preventDefault();
//                                       toggleAppSelection(app.key);
//                                     }
//                                   }}
//                                   aria-pressed={isSelected}
//                                   aria-disabled={
//                                     isSelectionLimitReached && !isSelected
//                                   }
//                                 >
//                                   <div
//                                     className="app-icon"
//                                     style={{ backgroundColor: app.color }}
//                                   >
//                                     <i className={app.icon}></i>
//                                   </div>
//                                   <div className="app-label">{app.label}</div>
//                                   {isSelected && (
//                                     <div className="selection-indicator">
//                                       <i className="fas fa-check"></i>
//                                     </div>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {currentStep === 3 && (
//                 <div className="step-fields">
//                   <h3 className="step-heading">
//                     <i className="fas fa-user"></i>
//                     Contact Information
//                   </h3>
//                   <div className="form-row">
//                     <div className="field-group-full">
//                       <label className="field-label-full">
//                         <i className="fas fa-envelope"></i>
//                         <span className="label-word">Contact Email</span>
//                         <span className="required">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         className={`field-input-full ${
//                           getFieldError("contactEmail") ? "error" : ""
//                         }`}
//                         placeholder="your@email.com"
//                         value={formData.contactEmail}
//                         onChange={(e) =>
//                           handleInputChange("contactEmail", e.target.value)
//                         }
//                         onBlur={() => handleBlur("contactEmail")}
//                         aria-required="true"
//                         aria-invalid={Boolean(getFieldError("contactEmail"))}
//                         aria-describedby={
//                           getFieldError("contactEmail")
//                             ? "email-error"
//                             : undefined
//                         }
//                       />
//                       {getFieldError("contactEmail") && (
//                         <div
//                           className="field-error"
//                           id="email-error"
//                           role="alert"
//                         >
//                           <i className="fas fa-exclamation-circle"></i>
//                           {getFieldError("contactEmail")}
//                         </div>
//                       )}
//                     </div>

//                     <div className="field-group-full">
//                       <label className="field-label-full">
//                         <i className="fas fa-phone"></i>
//                         <span className="label-word">Contact Phone</span>
//                         <span className="required">*</span>
//                       </label>
//                       <input
//                         type="tel"
//                         className={`field-input-full ${
//                           getFieldError("contactPhone") ? "error" : ""
//                         }`}
//                         placeholder="+1 (555) 123-4567"
//                         value={formData.contactPhone}
//                         onChange={(e) =>
//                           handleInputChange("contactPhone", e.target.value)
//                         }
//                         onBlur={() => handleBlur("contactPhone")}
//                         aria-required="true"
//                         aria-invalid={Boolean(getFieldError("contactPhone"))}
//                         aria-describedby={
//                           getFieldError("contactPhone")
//                             ? "phone-error"
//                             : undefined
//                         }
//                       />
//                       {getFieldError("contactPhone") && (
//                         <div
//                           className="field-error"
//                           id="phone-error"
//                           role="alert"
//                         >
//                           <i className="fas fa-exclamation-circle"></i>
//                           {getFieldError("contactPhone")}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {currentStep === 4 && (
//                 <div className="step-fields">
//                   <h3 className="step-heading">
//                     <i className="fas fa-lightbulb"></i>
//                     Project Description
//                   </h3>
//                   <div className="field-group-full">
//                     <label className="field-label-full">
//                       <i className="fas fa-edit"></i>
//                       <span className="label-word">Project Description</span>
//                       <span className="required">*</span>
//                       <span className="character-count">
//                         {formData.projectDescription.length}/500
//                       </span>
//                     </label>
//                     <textarea
//                       className={`field-textarea-full ${
//                         getFieldError("projectDescription") ? "error" : ""
//                       }`}
//                       placeholder="Describe your business goals, target audience, key features needed, design preferences, and any specific requirements. Please be as detailed as possible to help us create the perfect solution for you..."
//                       rows={6}
//                       maxLength={500}
//                       value={formData.projectDescription}
//                       onChange={(e) =>
//                         handleInputChange("projectDescription", e.target.value)
//                       }
//                       onBlur={() => handleBlur("projectDescription")}
//                       required
//                       aria-required="true"
//                       aria-invalid={Boolean(
//                         getFieldError("projectDescription")
//                       )}
//                       aria-describedby={
//                         getFieldError("projectDescription")
//                           ? "description-error"
//                           : "description-help"
//                       }
//                     />
//                     <div className="field-help" id="description-help">
//                       <i className="fas fa-info-circle"></i>
//                       Minimum 50 characters required
//                     </div>
//                     {getFieldError("projectDescription") && (
//                       <div
//                         className="field-error"
//                         id="description-error"
//                         role="alert"
//                       >
//                         <i className="fas fa-exclamation-circle"></i>
//                         {getFieldError("projectDescription")}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Step Navigation Buttons */}
//             <div
//               className={`form-actions-full ${
//                 showButtons ? "buttons-animate" : ""
//               }`}
//             >
//               <div className="step-buttons">
//                 {currentStep > 1 && (
//                   <button
//                     type="button"
//                     className="btn btn-secondary-full"
//                     onClick={prevStep}
//                   >
//                     <i className="fas fa-arrow-left"></i>
//                     <span className="button-text">Previous</span>
//                   </button>
//                 )}

//                 {currentStep < steps.length ? (
//                   <button
//                     type="button"
//                     className="btn btn-primary-full"
//                     onClick={nextStep}
//                     disabled={!isStepValid(currentStep)}
//                   >
//                     <span className="button-text">Next Step</span>
//                     <i className="fas fa-arrow-right"></i>
//                   </button>
//                 ) : (
//                   <button
//                     type="submit"
//                     className="btn btn-primary-full brief-continue"
//                     disabled={!allStepsCompleted()}
//                     onClick={onContinue}
//                   >
//                     <i className="fas fa-paper-plane"></i>
//                     <span className="button-text">Start Project</span>
//                   </button>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-secondary-full clear-btn"
//                 onClick={clearForm}
//               >
//                 <i className="fas fa-trash"></i>
//                 <span className="button-text">Clear Form</span>
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default GetStarted;

import React, { useEffect, useState, useRef, useCallback } from "react";
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
  const [search] = useSearchParams();

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

  const handleInputChange = (name: string, value: string) => {
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
      // formData.domain.trim() &&
      formData.name.trim() &&
      formData.companyName.trim() &&
      // !errors.domain &&
      !errors.name &&
      !errors.companyName
    );
  };

  // API CALL ON NEXT FROM STEP 1
  // const handleStep1Next = async () => {
  //   if (!isStep1Valid()) return;
  //   setIsCreatingAccount(true);
  //   setIsSubmitting(true);
  //   setApiError(null);

  //   try {
  //     const payload = {
  //       name: formData.name,
  //       email: formData.contactEmail || null,
  //       company_name: formData.companyName,
  //       domain: formData.domain,
  //       industry: formData.industry || null,
  //       account_type: formData.accountType,
  //       subscription: formData.subscription,
  //     };

  //     const response = await fetch("http://127.0.0.1:4001/erp/create", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || "Something went wrong");
  //     }

  //     setApiSuccess(true);
  //     setTimeout(() => {
  //       setCurrentStep(1); // Next step pe jao
  //       setIsSubmitting(false);
  //       setIsCreatingAccount(false);
  //     }, 1500);
  //   } catch (err: any) {
  //     setApiError(err.message || "Server error, please try again");
  //     setIsSubmitting(false);
  //     setIsCreatingAccount(false);
  //   }
  // };

  const handleStep1Next = async () => {
    if (!isStep1Valid()) return;

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
        modules: formData.modules, // ← NEW: array jaise ["erp:material_management", "erp:sales_management"]
      };

      const response = await fetch("http://127.0.0.1:4001/erp/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }

      setApiSuccess(true);
      setTimeout(() => {
        setCurrentStep(2); // ya jo next step hai
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
      {/* Background & Hero same rahega */}
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

      {/* <section className={`hero-section-full ${mounted ? "in" : ""}`}>
     
        <div className="hero-content-full">
          <h1 className="hero-title-full">
            <span className={`text-animate ${showTitle ? "animate-in" : ""}`}>
              Actecal Warehouse
            </span>
            <span
              className={`text-animate delay-1 ${
                showTitle ? "animate-in" : ""
              }`}
            >
              India ka #1 Cloud Godown Software
            </span>
          </h1>
          <p
            className={`hero-subtitle-full ${
              showSubtitle ? "subtitle-animate" : ""
            }`}
          >
            14 Days Free Demo • GST Billing • Barcode • Multi-Godown • Mobile
            App
          </p>
          <button
            className="btn btn-primary hero-cta-btn"
            onClick={scrollToForm}
          >
            Start Free Demo <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </section> */}

      <section className={`form-section-full ${showForm ? "in" : ""}`}>
        <div className="form-container-full" ref={formSectionRef}>
          {/* <h2
            className={`form-title-full ${
              showFormTitle ? "title-animate" : ""
            }`}
          >
            <span className="title-word">Get</span>{" "}
            <span className="title-word">Started</span>
          </h2> */}

          <form
            className="multi-step-form"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* Progress Bar */}
            {/* <div className="form-progress-container">
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
            </div> */}

            {/* STEP 1 - Company Details + API Call */}
            {currentStep === 1 && (
              <div className="step-fields">
                <h3 className="step-heading">Company & Plan Details</h3>

                <div className="form-row">
                  <div className="field-group-full">
                    <label>
                      Your Name <span className="required">*</span>
                    </label>
                    <input
                      className={`field-input-full ${touched.name && !formData.name ? "error" : ""
                        }`}
                      placeholder="Rahul Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      onBlur={() => handleBlur("name")}
                    />
                  </div>

                  {/* <div className="field-group-full">
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
                  </div> */}
                  <div className="field-group-full">
                    <label className="field-label-full">
                      {/* <i className="fas fa-envelope"></i> */}
                      <label>Company Email</label>
                      {/* <span className="label-word">Contact Email</span> */}
                      <span className="required"></span>
                    </label>
                    <input
                      type="email"
                      className={`field-input-full ${getFieldError("contactEmail") ? "error" : ""
                        }`}
                      placeholder="your@email.com"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      onBlur={() => handleBlur("contactEmail")}
                      aria-required="true"
                      aria-invalid={Boolean(getFieldError("contactEmail"))}
                      aria-describedby={
                        getFieldError("contactEmail")
                          ? "email-error"
                          : undefined
                      }
                    />
                    {getFieldError("contactEmail") && (
                      <div
                        className="field-error"
                        id="email-error"
                        role="alert"
                      >
                        <i className="fas fa-exclamation-circle"></i>
                        {getFieldError("contactEmail")}
                      </div>
                    )}
                  </div>
                </div>

                <div className="field-group-full">
                  <label>
                    Company / Godown Name <span className="required">*</span>
                  </label>
                  <input
                    className={`field-input-full ${touched.companyName && !formData.companyName
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
                    <label>Choose Plan</label>
                    <select
                      className="field-input-full field-select"
                      value={formData.subscription}
                      onChange={(e) =>
                        handleInputChange("subscription", e.target.value as any)
                      }
                    >
                      {SUBSCRIPTIONS.map((p) => (
                        <option key={p} value={p}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
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
                <div className="field-group-full" style={{ marginTop: "24px" }}>
                  <label className="field-label-full">
                    Select Modules <span className="required">*</span>
                    <small
                      style={{
                        display: "block",
                        color: "#64748b",
                        marginTop: "4px",
                      }}
                    >
                      Choose the ERP modules you want to enable
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
                    options={AVAILABLE_MODULES}
                    maxTagCount="responsive"
                    showSearch
                    allowClear
                    notFoundContent="No modules found"
                  />

                  {touched.modules && formData.modules.length === 0 && (
                    <div className="field-error" style={{ marginTop: "8px" }}>
                      Please select at least one module
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

            {/* Baaki Steps 2, 3, 4 same rahenge... (App Selection, Contact, Description) */}

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
                          : `${getSelectedAppsCount()} ${getSelectedAppsCount() === 1 ? "app" : "apps"
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
                                className={`app-tile ${isSelected ? "selected" : ""
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

            {currentStep === 3 && (
              <div className="step-fields">
                <h3 className="step-heading">
                  <i className="fas fa-user"></i>
                  Contact Information
                </h3>
                <div className="form-row">
                  <div className="field-group-full">
                    <label className="field-label-full">
                      <i className="fas fa-envelope"></i>
                      <span className="label-word">Contact Email</span>
                      <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      className={`field-input-full ${getFieldError("contactEmail") ? "error" : ""
                        }`}
                      placeholder="your@email.com"
                      value={formData.contactEmail}
                      onChange={(e) =>
                        handleInputChange("contactEmail", e.target.value)
                      }
                      onBlur={() => handleBlur("contactEmail")}
                      aria-required="true"
                      aria-invalid={Boolean(getFieldError("contactEmail"))}
                      aria-describedby={
                        getFieldError("contactEmail")
                          ? "email-error"
                          : undefined
                      }
                    />
                    {getFieldError("contactEmail") && (
                      <div
                        className="field-error"
                        id="email-error"
                        role="alert"
                      >
                        <i className="fas fa-exclamation-circle"></i>
                        {getFieldError("contactEmail")}
                      </div>
                    )}
                  </div>

                  <div className="field-group-full">
                    <label className="field-label-full">
                      <i className="fas fa-phone"></i>
                      <span className="label-word">Contact Phone</span>
                      <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`field-input-full ${getFieldError("contactPhone") ? "error" : ""
                        }`}
                      placeholder="+1 (555) 123-4567"
                      value={formData.contactPhone}
                      onChange={(e) =>
                        handleInputChange("contactPhone", e.target.value)
                      }
                      onBlur={() => handleBlur("contactPhone")}
                      aria-required="true"
                      aria-invalid={Boolean(getFieldError("contactPhone"))}
                      aria-describedby={
                        getFieldError("contactPhone")
                          ? "phone-error"
                          : undefined
                      }
                    />
                    {getFieldError("contactPhone") && (
                      <div
                        className="field-error"
                        id="phone-error"
                        role="alert"
                      >
                        <i className="fas fa-exclamation-circle"></i>
                        {getFieldError("contactPhone")}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="step-fields">
                <h3 className="step-heading">
                  <i className="fas fa-lightbulb"></i>
                  Project Description
                </h3>
                <div className="field-group-full">
                  <label className="field-label-full">
                    <i className="fas fa-edit"></i>
                    <span className="label-word">Project Description</span>
                    <span className="required">*</span>
                    <span className="character-count">
                      {formData.projectDescription.length}/500
                    </span>
                  </label>
                  <textarea
                    className={`field-textarea-full ${getFieldError("projectDescription") ? "error" : ""
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
                    aria-required="true"
                    aria-invalid={Boolean(getFieldError("projectDescription"))}
                    aria-describedby={
                      getFieldError("projectDescription")
                        ? "description-error"
                        : "description-help"
                    }
                  />
                  <div className="field-help" id="description-help">
                    <i className="fas fa-info-circle"></i>
                    Minimum 50 characters required
                  </div>
                  {getFieldError("projectDescription") && (
                    <div
                      className="field-error"
                      id="description-error"
                      role="alert"
                    >
                      <i className="fas fa-exclamation-circle"></i>
                      {getFieldError("projectDescription")}
                    </div>
                  )}
                </div>
              </div>
            )}
            {/* Navigation Buttons */}
            <div
              className={`form-actions-full ${showButtons ? "buttons-animate" : ""
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

export default GetStarted;
