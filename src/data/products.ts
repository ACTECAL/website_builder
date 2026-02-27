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
