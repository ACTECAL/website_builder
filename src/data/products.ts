// // export interface ProductModule {
// //   id: string;
// //   name: string;
// //   description: string;
// // }

// // export interface ProductPlan {
// //   id: string;
// //   name: string;
// //   description: string;
// //   price?: string;
// //   features?: string[];
// // }

// // export interface Product {
// //   name: string;
// //   modules: ProductModule[];
// //   favIcon?: string;
// //   icon?: string;
// //   plans: ProductPlan[];
// // }

// // export const PRODUCTS: Product[] = [
// //   {
// //     name: "erp",
// //     modules: [
// //       {
// //         id: "erp:sales",
// //         name: "Sales Management",
// //         description: "Manage your sales pipeline, customer relationships, and revenue tracking"
// //       },
// //       {
// //         id: "erp:ppc",
// //         name: "Production Management",
// //         description: "Control production planning, manufacturing processes, and quality control"
// //       },
// //       {
// //         id: "erp:material_management",
// //         name: "Material Management",
// //         description: "Handle inventory, procurement, and supply chain management"
// //       }
// //     ],
// //     plans: [
// //       {
// //         id: "basic",
// //         name: "Basic Plan",
// //         description: "Perfect for small businesses getting started with ERP"
// //       },
// //       {
// //         id: "standard",
// //         name: "Standard Plan",
// //         description: "Ideal for growing businesses needing advanced features"
// //       },
// //       {
// //         id: "premium",
// //         name: "Premium Plan",
// //         description: "Comprehensive solution for large enterprises"
// //       },
// //       {
// //         id: "enterprise",
// //         name: "Enterprise Plan",
// //         description: "Customized solution for enterprise-level operations"
// //       }
// //     ]
// //   }
// // ];

// // src/data/products.ts

// export interface Product {
//   name: string;
//   modules: Array<{ id: string; name: string; description: string }>;
//   "fav-icon": string;
//   icon: string;
//   color: string; // Font Awesome class for Home page icon
//   plans: Array<{ id: string; name: string; description: string }>;
// }

// export const PRODUCTS: Product[] = [
//   {
//     name: "ERP",
//     color: "#0984E3",
//     modules: [
//       {
//         id: "erp:finance",
//         name: "Finance Management",
//         description: "Manage accounts, ledgers, and real-time financial health.",
//       },
//       {
//         id: "erp:hr",
//         name: "HR Management",
//         description: "Employee lifecycle, payroll, attendance, and performance.",
//       },
//       {
//         id: "erp:inventory",
//         name: "Inventory Management",
//         description: "Real-time stock tracking, barcode operations, and replenishment.",
//       },
//       {
//         id: "erp:sales",
//         name: "Sales Management",
//         description: "Pipeline, quotations, sales orders, and revenue tracking.",
//       },
//       {
//         id: "erp:crm",
//         name: "CRM (Customer Management)",
//         description: "Customer interactions, lead scoring, and relations management.",
//       },
//       {
//         id: "erp:procurement",
//         name: "Procurement (Purchase)",
//         description: "RFQ, vendor management, and automated purchase orders.",
//       },
//       {
//         id: "erp:manufacturing",
//         name: "Manufacturing / Production",
//         description: "MRP, BoM, work orders, and shop floor control.",
//       },
//       {
//         id: "erp:supply_chain",
//         name: "Supply Chain Management",
//         description: "End-to-end logistics, supplier coordination, and routing.",
//       },
//       {
//         id: "erp:warehouse",
//         name: "Warehouse Management",
//         description: "Multi-warehouse ops, wave picking, and automated packing.",
//       },
//       {
//         id: "erp:project",
//         name: "Project Management",
//         description: "Task tracking, Gantt charts, and resource allocation.",
//       },
//       {
//         id: "erp:asset",
//         name: "Asset Management",
//         description: "Track and maintain company equipment and high-value assets.",
//       },
//       {
//         id: "erp:quality",
//         name: "Quality Management",
//         description: "Quality checkpoints, digital trails, and compliance alerts.",
//       },
//       {
//         id: "erp:maintenance",
//         name: "Maintenance Management",
//         description: "Preventive maintenance, MTBF tracking, and equipment lifecycle.",
//       },
//       {
//         id: "erp:documents",
//         name: "Document Management",
//         description: "Centralized secure storage and automated document workflows.",
//       },
//       {
//         id: "erp:bi",
//         name: "Business Intelligence (BI)",
//         description: "Advanced data analytics, pivot tables, and insights.",
//       },
//       {
//         id: "erp:reporting",
//         name: "Reporting & Dashboard",
//         description: "Custom visual reports and real-time interactive dashboards.",
//       },
//       {
//         id: "erp:workflow",
//         name: "Workflow Automation",
//         description: "Automate repetitive tasks and complex business processes.",
//       },
//       {
//         id: "erp:compliance",
//         name: "Risk & Compliance",
//         description: "Policy management, audit readiness, and regulatory tracking.",
//       },
//       {
//         id: "erp:pos",
//         name: "POS (Point of Sale)",
//         description: "Integrated retail, restaurant, and checkout operations.",
//       },
//       {
//         id: "erp:ecommerce",
//         name: "E-Commerce Integration",
//         description: "Seamlessly sync with online stores and digital marketplaces.",
//       },
//     ],
//     "fav-icon": "/icons/erp-favicon.png",
//     icon: "fa-solid fa-industry",
//     plans: [
//       {
//         id: "basic",
//         name: "Basic Plan",
//         description: "Core ERP features + 5 users + basic reporting",
//       },
//       {
//         id: "standard",
//         name: "Standard Plan",
//         description:
//           "Everything in Basic + advanced analytics + unlimited users",
//       },
//       {
//         id: "premium",
//         name: "Premium Plan",
//         description: "Custom modules + API access + priority support",
//       },
//       {
//         id: "enterprise",
//         name: "Enterprise Plan",
//         description: "Dedicated instance + SLA + on-premise option",
//       },
//     ],
//   },
//   {
//     name: "HMS",
//     color: "#00B894",
//     modules: [
//       {
//         id: "erp:hms",
//         name: "HMS Core",
//         description:
//           "Manage patients, appointments, billing, and hospital operations",
//       },
//       {
//         id: "erp:hmsai",
//         name: "HMS AI",
//         description:
//           "AI-powered insights, reports, and smart hospital automation",
//       },
//     ],
//     "fav-icon": "/icons/hms-favicon.png",
//     icon: "fa-solid fa-hospital",
//     plans: [
//       {
//         id: "basic",
//         name: "Basic Plan",
//         description: "Core HMS features for small clinics",
//       },
//       {
//         id: "standard",
//         name: "Standard Plan",
//         description: "Advanced management with reports and staff handling",
//       },
//       {
//         id: "premium",
//         name: "Premium Plan",
//         description: "Full HMS with analytics and automation",
//       },
//       {
//         id: "enterprise",
//         name: "Enterprise Plan",
//         description: "Multi-branch setup with custom integrations",
//       },
//     ],
//   },
//   {
//     name: "Exam",
//     color: "#0984E3",
//     modules: [
//       { id: "exam:planning", name: "Exam Planning", description: "Define exam cycles, academic terms, and broad evaluation strategies." },
//       { id: "exam:scheduling", name: "Exam Scheduling", description: "Automated timetable generation and conflict-free slot management." },
//       { id: "exam:qbank", name: "Question Bank", description: "Centralized repository for MCQs, theory, and multimedia questions." },
//       { id: "exam:qpaper", name: "Question Paper Generation", description: "Automated paper set generation with difficulty balancing." },
//       { id: "exam:reg", name: "Student Registration", description: "Streamlined signup and data collection for examination candidates." },
//       { id: "exam:enroll", name: "Exam Enrollment", description: "Link students to specific subjects and examination instances." },
//       { id: "exam:admit", name: "Admit Card Generation", description: "Automated generation and digital distribution of hall tickets." },
//       { id: "exam:center", name: "Exam Center Allocation", description: "Intelligent mapping of candidates to available regional centers." },
//       { id: "exam:seating", name: "Seating Arrangement", description: "Dynamic floor-wise and room-wise seating plan generation." },
//       { id: "exam:online", name: "Online Exam System", description: "Cloud-based secure environment for conducting digital examinations." },
//       { id: "exam:timer", name: "Timer & Auto Submit", description: "Built-in session management with periodic auto-save and submission." },
//       { id: "exam:proctor", name: "Anti-Cheating / Proctoring", description: "AI-driven monitoring, tab-lock, and video supervision." },
//       { id: "exam:eval", name: "Answer Evaluation", description: "Digital onscreen marking for subjective and theory papers." },
//       { id: "exam:grading", name: "Auto Grading (MCQ)", description: "Instant high-accuracy evaluation for objective-type questions." },
//       { id: "exam:process", name: "Result Processing", description: "Secure aggregation of marks and automated calculation logic." },
//       { id: "exam:rank", name: "Rank / Merit List", description: "Real-time generation of percentile, GPA, and merit standings." },
//       { id: "exam:marksheet", name: "Marksheet Generation", description: "Automated generation of secure digital and printable transcripts." },
//       { id: "exam:cert", name: "Certificate Generation", description: "Blockchain-verifiable digital completion certificates." },
//       { id: "exam:publish", name: "Result Publishing", description: "Controlled release of results via secure student portals." },
//       { id: "exam:analytics", name: "Performance Analytics", description: "Detailed cohort analysis and individual progress tracking." },
//       { id: "exam:notify", name: "Notification System", description: "Multi-channel alerts for schedules, results, and deadlines." },
//       { id: "exam:roles", name: "User & Role Management", description: "Granular access control for admins, evaluators, and students." },
//     ],
//     "fav-icon": "/icons/exam-favicon.png",
//     icon: "fa-solid fa-graduation-cap",
//     plans: [
//       {
//         id: "basic",
//         name: "Basic Plan",
//         description: "Up to 100 students + 50 exams/month + basic reports",
//       },
//       {
//         id: "standard",
//         name: "Standard Plan",
//         description: "Unlimited students + 500 exams/month + result analytics",
//       },
//       {
//         id: "premium",
//         name: "Premium Plan",
//         description: "AI proctoring + certificate generation + custom branding",
//       },
//       {
//         id: "enterprise",
//         name: "Enterprise Plan",
//         description: "White-label + API + dedicated support + bulk import",
//       },
//     ],
//   },

//   {
//     name: "Account",
//     color: "#0984E3",
//     modules: [
//       { id: "account:gl", name: "General Ledger", description: "Fundamental accounting record for all financial transactions." },
//       { id: "account:ap", name: "Accounts Payable", description: "Manage vendor liabilities and ensure timely payment cycles." },
//       { id: "account:ar", name: "Accounts Receivable", description: "Track customer balances and streamline collections." },
//       { id: "account:billing", name: "Billing & Invoicing", description: "Professional GST-compliant invoicing and billing workflows." },
//       { id: "account:tax", name: "Tax Management", description: "Automated calculations and reporting for GST, VAT, and TDS." },
//       { id: "account:budget", name: "Budgeting", description: "Set financial targets and track variance in real-time." },
//       { id: "account:reporting", name: "Financial Reporting", description: "Generate P&L, Balance Sheets, and Cash Flow statements." },
//       { id: "account:expense", name: "Expense Management", description: "Track operational costs and employee reimbursement requests." },
//       { id: "account:reco", name: "Bank Reconciliation", description: "Effortless matching of internal ledgers with bank statements." },
//       { id: "account:payroll", name: "Payroll Accounting", description: "Detailed salary journals and statutory contribution tracking." },
//     ],
//     "fav-icon": "/icons/account-favicon.png",
//     icon: "fa-solid fa-coins",
//     plans: [
//       {
//         id: "basic",
//         name: "Basic Plan",
//         description: "Single company + basic accounting + GST invoicing",
//       },
//       {
//         id: "standard",
//         name: "Standard Plan",
//         description: "Multi-company + advanced reports + bank integration",
//       },
//       {
//         id: "premium",
//         name: "Premium Plan",
//         description: "Unlimited companies + custom reports + API access",
//       },
//       {
//         id: "enterprise",
//         name: "Enterprise Plan",
//         description: "Audit trail + role-based access + dedicated support",
//       },
//     ],
//   },

//   {
//     name: "Website",
//     color: "#0984E3",
//     modules: [
//       { id: "website:auth", name: "User Authentication", description: "Secure Login/Register system with OAuth and MFA support." },
//       { id: "website:cms", name: "CMS (Content Management System)", description: "Powerful editor for managing dynamic site content and pages." },
//       { id: "website:landing", name: "Landing Pages", description: "High-conversion page builder for marketing and lead generation." },
//       { id: "website:blog", name: "Blog Management", description: "Complete editorial workflow for articles and publications." },
//       { id: "website:media", name: "Media Management", description: "Optimized central storage and delivery for images and video." },
//       { id: "website:seo", name: "SEO Management", description: "Built-in tools for meta-tags, sitemaps, and search visibility." },
//       { id: "website:forms", name: "Contact Forms", description: "Customizable data collection and automated email routing." },
//       { id: "website:newsletter", name: "Newsletter System", description: "Audience subscription management and email campaign delivery." },
//       { id: "website:analytics", name: "Analytics Integration", description: "Seamless connection to Google Analytics and heatmaps." },
//       { id: "website:admin", name: "Admin Dashboard", description: "Central control center for all site settings and user data." },
//     ],
//     "fav-icon": "/icons/website-favicon.png",
//     icon: "fa-solid fa-globe",
//     plans: [
//       {
//         id: "basic",
//         name: "Basic Plan",
//         description: "5 pages + blog + contact form + basic hosting",
//       },

//       {
//         id: "standard",
//         name: "Standard Plan",
//         description: "Unlimited pages + e-commerce + SEO tools",
//       },
//       {
//         id: "premium",
//         name: "Premium Plan",
//         description: "Custom domain + analytics + priority support",
//       },
//       {
//         id: "enterprise",
//         name: "Enterprise Plan",
//         description: "Multi-language + team access + custom development",
//       },
//     ],
//   },
// ];

// export default PRODUCTS;

// export interface ProductModule {
//   id: string;
//   name: string;
//   description: string;
// }

// export interface ProductPlan {
//   id: string;
//   name: string;
//   description: string;
//   price?: string;
//   features?: string[];
// }

// export interface Product {
//   name: string;
//   modules: ProductModule[];
//   favIcon?: string;
//   icon?: string;
//   plans: ProductPlan[];
// }

// export const PRODUCTS: Product[] = [
//   {
//     name: "erp",
//     modules: [
//       {
//         id: "erp:sales",
//         name: "Sales Management",
//         description: "Manage your sales pipeline, customer relationships, and revenue tracking"
//       },
//       {
//         id: "erp:ppc",
//         name: "Production Management",
//         description: "Control production planning, manufacturing processes, and quality control"
//       },
//       {
//         id: "erp:material_management",
//         name: "Material Management",
//         description: "Handle inventory, procurement, and supply chain management"
//       }
//     ],
//     plans: [
//       {
//         id: "basic",
//         name: "Basic Plan",
//         description: "Perfect for small businesses getting started with ERP"
//       },
//       {
//         id: "standard",
//         name: "Standard Plan",
//         description: "Ideal for growing businesses needing advanced features"
//       },
//       {
//         id: "premium",
//         name: "Premium Plan",
//         description: "Comprehensive solution for large enterprises"
//       },
//       {
//         id: "enterprise",
//         name: "Enterprise Plan",
//         description: "Customized solution for enterprise-level operations"
//       }
//     ]
//   }
// ];

// src/data/products.ts

export interface Product {
  name: string;
  modules: Array<{ id: string; name: string; description: string }>;
  "fav-icon": string;
  icon: string;
  color: string; // Font Awesome class for Home page icon
  plans: Array<{ id: string; name: string; description: string }>;
}

export const PRODUCTS: Product[] = [
  {
    name: "ERP",
    color: "#0984E3",
    modules: [
      {
        id: "erp:sales_management",
        name: "Sales Management",
        description:
          "Lead to opportunity to quotation to sales order & invoicing",
      },
      {
        id: "erp:production_management",
        name: "Production Management",
        description: "MRP, Work orders, Manufacturing orders, BOM & routing",
      },
      {
        id: "erp:material_management",
        name: "Material Management",
        description: "RFQ, Purchase orders, Vendor management & bills",
      },
      {
        id: "erp:inventory",
        name: "Inventory",
        description: "Stock tracking, Multi-warehouse, Serial/Lot numbers",
      },
      {
        id: "erp:accounting",
        name: "Accounting",
        description: "Journal entries, Multi-currency, Bank reconciliation",
      },
      {
        id: "erp:hr",
        name: "HR & Payroll",
        description: "Employee management, Attendance, Payroll & expenses",
      },
    ],
    "fav-icon": "/icons/erp-favicon.png",
    icon: "fa-solid fa-industry",
    plans: [
      {
        id: "basic",
        name: "Basic Plan",
        description: "Core ERP features + 5 users + basic reporting",
      },
      {
        id: "standard",
        name: "Standard Plan",
        description:
          "Everything in Basic + advanced analytics + unlimited users",
      },
      {
        id: "premium",
        name: "Premium Plan",
        description: "Custom modules + API access + priority support",
      },
      {
        id: "enterprise",
        name: "Enterprise Plan",
        description: "Dedicated instance + SLA + on-premise option",
      },
    ],
  },
  {
    name: "HMS",
    color: "#00B894",
    modules: [
      {
        id: "erp:hms",
        name: "HMS Core",
        description:
          "Manage patients, appointments, billing, and hospital operations",
      },
      {
        id: "erp:hmsai",
        name: "HMS AI",
        description:
          "AI-powered insights, reports, and smart hospital automation",
      },
    ],
    "fav-icon": "/icons/hms-favicon.png",
    icon: "fa-solid fa-hospital",
    plans: [
      {
        id: "basic",
        name: "Basic Plan",
        description: "Core HMS features for small clinics",
      },
      {
        id: "standard",
        name: "Standard Plan",
        description: "Advanced management with reports and staff handling",
      },
      {
        id: "premium",
        name: "Premium Plan",
        description: "Full HMS with analytics and automation",
      },
      {
        id: "enterprise",
        name: "Enterprise Plan",
        description: "Multi-branch setup with custom integrations",
      },
    ],
  },
  {
    name: "Exam",
    color: "#0984E3",
    modules: [
      {
        id: "exam:question_bank",
        name: "Question Bank",
        description: "Create & manage MCQ, subjective, true/false questions",
      },
      {
        id: "exam:exam_builder",
        name: "Exam Builder",
        description: "Create online/offline exams with timer & randomization",
      },
      {
        id: "exam:result_analysis",
        name: "Result Analysis",
        description: "Performance reports, rank list, graphical analysis",
      },
      {
        id: "exam:student_portal",
        name: "Student Portal",
        description: "Online exam giving, view results & certificates",
      },
      {
        id: "exam:proctoring",
        name: "AI Proctoring",
        description: "Live monitoring, face detection & cheating prevention",
      },
    ],
    "fav-icon": "/icons/exam-favicon.png",
    icon: "fa-solid fa-graduation-cap",
    plans: [
      {
        id: "basic",
        name: "Basic Plan",
        description: "Up to 100 students + 50 exams/month + basic reports",
      },
      {
        id: "standard",
        name: "Standard Plan",
        description: "Unlimited students + 500 exams/month + result analytics",
      },
      {
        id: "premium",
        name: "Premium Plan",
        description: "AI proctoring + certificate generation + custom branding",
      },
      {
        id: "enterprise",
        name: "Enterprise Plan",
        description: "White-label + API + dedicated support + bulk import",
      },
    ],
  },

  {
    name: "Account",
    color: "#0984E3",
    modules: [
      {
        id: "account:ledger",
        name: "General Ledger",
        description: "Journal entries, trial balance, ledger management",
      },
      {
        id: "account:invoicing",
        name: "Invoicing & Billing",
        description: "Create GST invoices, recurring bills, payment reminders",
      },
      {
        id: "account:expenses",
        name: "Expenses & Reimbursement",
        description: "Track expenses, approvals, reimbursement workflow",
      },
      {
        id: "account:bank_reco",
        name: "Bank Reconciliation",
        description: "Auto bank feed matching & reconciliation",
      },
      {
        id: "account:reports",
        name: "Financial Reports",
        description: "P&L, Balance Sheet, Cash Flow, GST reports",
      },
    ],
    "fav-icon": "/icons/account-favicon.png",
    icon: "fa-solid fa-coins",
    plans: [
      {
        id: "basic",
        name: "Basic Plan",
        description: "Single company + basic accounting + GST invoicing",
      },
      {
        id: "standard",
        name: "Standard Plan",
        description: "Multi-company + advanced reports + bank integration",
      },
      {
        id: "premium",
        name: "Premium Plan",
        description: "Unlimited companies + custom reports + API access",
      },
      {
        id: "enterprise",
        name: "Enterprise Plan",
        description: "Audit trail + role-based access + dedicated support",
      },
    ],
  },

  {
    name: "Website",
    color: "#0984E3",
    modules: [
      {
        id: "website:builder",
        name: "Drag & Drop Builder",
        description: "No-code page builder with templates & sections",
      },
      {
        id: "website:blog",
        name: "Blog & CMS",
        description: "Create & manage blog posts, categories & SEO",
      },
      {
        id: "website:ecommerce",
        name: "E-commerce Store",
        description: "Product catalog, cart, payment gateway integration",
      },
      {
        id: "website:forms",
        name: "Forms & Leads",
        description: "Contact forms, lead capture & email notifications",
      },
      {
        id: "website:seo",
        name: "SEO & Analytics",
        description: "Meta tags, sitemap, Google Analytics integration",
      },
    ],
    "fav-icon": "/icons/website-favicon.png",
    icon: "fa-solid fa-globe",
    plans: [
      {
        id: "basic",
        name: "Basic Plan",
        description: "5 pages + blog + contact form + basic hosting",
      },

      {
        id: "standard",
        name: "Standard Plan",
        description: "Unlimited pages + e-commerce + SEO tools",
      },
      {
        id: "premium",
        name: "Premium Plan",
        description: "Custom domain + analytics + priority support",
      },
      {
        id: "enterprise",
        name: "Enterprise Plan",
        description: "Multi-language + team access + custom development",
      },
    ],
  },
];

export default PRODUCTS;
