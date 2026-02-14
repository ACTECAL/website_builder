export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

export interface Industry {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  keyFeatures: string[];
  imageUrl: string;
  testimonial?: Testimonial;
  relatedApps: string[];
}

export interface IndustryCategory {
  name: string;
  industries: Industry[];
}

export const industryCategories: IndustryCategory[] = [
  {
    name: 'Business Services',
    industries: [
      {
        name: 'Accounting Firm',
        slug: 'accounting-firm',
        description: 'For accountants, fiduciaries, auditors, and financial advisors',
        longDescription: 'A complete ERP solution for accounting firms, providing tools for financial management, client billing, and compliance tracking. Streamline your workflows and deliver exceptional service.',
        icon: 'fas fa-calculator',
        keyFeatures: ['Automated Invoicing', 'Bank Reconciliation', 'Tax Preparation', 'Client Portal'],
        imageUrl: '/images/industries/accounting.jpg',
        testimonial: {
          quote: 'BizSuite has revolutionized our firm. The automation features have saved us countless hours, allowing us to focus on our clients.',
          author: 'John Smith',
          company: 'Smith & Co. Accounting',
        },
        relatedApps: ['accounting', 'invoicing', 'expenses', 'documents'],
      },
      {
        name: 'Billboard Rental',
        slug: 'billboard-rental',
        description: 'For advertising companies, media agencies, and outdoor space owners',
        longDescription: 'Manage your billboard inventory, bookings, and client contracts with a dedicated solution. Track availability, automate billing, and get real-time analytics on your assets.',
        icon: 'fas fa-ad',
        keyFeatures: ['Inventory Management', 'Booking Calendar', 'Automated Invoicing', 'Client Contract Management'],
        imageUrl: '/images/industries/billboard.jpg',
        relatedApps: ['crm', 'sales', 'subscriptions', 'accounting'],
      },
      {
        name: 'Audit & Certification',
        slug: 'audit-certification',
        description: 'For auditors, certification bodies, and compliance specialists',
        longDescription: 'A comprehensive platform for managing audits, certifications, and compliance. Schedule audits, track findings, and generate reports with ease.',
        icon: 'fas fa-stamp',
        keyFeatures: ['Audit Planning & Scheduling', 'Non-conformance Tracking', 'Corrective Action Plans', 'Certification Management'],
        imageUrl: '/images/industries/audit.jpg',
        relatedApps: ['project', 'documents', 'approvals', 'quality'],
      },
    ],
  },
  {
    name: 'Culture & Arts',
    industries: [
      {
        name: 'Arts & Crafts Store',
        slug: 'arts-crafts-store',
        description: 'For art dealers, exhibition spaces, and cultural institutions',
        longDescription: 'Manage your arts and crafts store with tools for inventory, sales, and consignment. Track unique pieces, manage artist payouts, and sell online effortlessly.',
        icon: 'fas fa-paint-brush',
        keyFeatures: ['Consignment Management', 'Inventory Tracking for Unique Items', 'Artist Payout Reports', 'eCommerce Integration'],
        imageUrl: '/images/industries/arts-crafts.jpg',
        relatedApps: ['inventory', 'point-of-sale', 'accounting', 'e-commerce'],
      },
      {
        name: 'Museum',
        slug: 'museum',
        description: 'For museums, heritage sites, and cultural institutions',
        longDescription: 'A unified platform for museum management, from collection cataloging to ticketing and membership programs. Enhance visitor experience and streamline your operations.',
        icon: 'fas fa-landmark',
        keyFeatures: ['Collection Management', 'Ticketing & Admissions', 'Membership Management', 'Event Planning'],
        imageUrl: '/images/industries/museum.jpg',
        relatedApps: ['point-of-sale', 'event', 'crm', 'inventory'],
      },
    ],
  },
  {
    name: 'Education & Training',
    industries: [
      {
        name: 'eLearning Platform',
        slug: 'elearning-platform',
        description: 'For online courses, coaches, and digital academies',
        longDescription: 'Create, market, and sell online courses with a fully integrated eLearning solution. Manage content, students, and payments all in one place.',
        icon: 'fas fa-laptop',
        keyFeatures: ['Course Creation & Management', 'Student Enrollment', 'Online Payments', 'Quizzes & Certifications'],
        imageUrl: '/images/industries/elearning.jpg',
        testimonial: {
          quote: 'BizSuite made it possible to launch our online academy in record time. The platform is intuitive for both us and our students.',
          author: 'Jane Doe',
          company: 'Creative Academy',
        },
        relatedApps: ['e-learning', 'website', 'e-commerce', 'crm'],
      },
      {
        name: 'Driving School',
        slug: 'driving-school',
        description: 'For driving academies, instructors, and vehicle training centers',
        longDescription: 'Manage your driving school with ease. Schedule lessons, track student progress, manage instructor availability, and handle billing seamlessly.',
        icon: 'fas fa-car',
        keyFeatures: ['Lesson Scheduling', 'Student & Instructor Management', 'Vehicle Fleet Tracking', 'Online Booking & Payments'],
        imageUrl: '/images/industries/driving-school.jpg',
        relatedApps: ['appointments', 'subscriptions', 'accounting', 'fleet'],
      },
    ],
  },
  {
    name: 'Events, Community & Nonprofits',
    industries: [
      {
        name: 'Event Management',
        slug: 'event-management',
        description: 'For event planners, agencies, and professional organizers',
        longDescription: 'Organize, promote, and sell tickets for your events with an all-in-one event management platform. From conferences to concerts, we have you covered.',
        icon: 'fas fa-calendar-alt',
        keyFeatures: ['Online Ticketing', 'Agenda & Speaker Management', 'Email Marketing', 'On-site Check-in'],
        imageUrl: '/images/industries/event-management.jpg',
        testimonial: {
          quote: 'We run multiple large-scale conferences a year, and BizSuite\'s event management tools are indispensable. It simplifies everything.',
          author: 'Emily White',
          company: 'Global Tech Summit',
        },
        relatedApps: ['event', 'marketing-automation', 'crm', 'website'],
      },
      {
        name: 'Nonprofit Organisation',
        slug: 'nonprofit-organisation',
        description: 'For charities, NGOs, and associations',
        longDescription: 'Manage your nonprofit with tools for fundraising, donor management, and accounting. Focus on your mission, and let BizSuite handle the operations.',
        icon: 'fas fa-heart',
        keyFeatures: ['Donation Management', 'Grant Tracking', 'Volunteer Management', 'Fundraising Campaigns'],
        imageUrl: '/images/industries/nonprofit.jpg',
        relatedApps: ['accounting', 'crm', 'donations', 'email-marketing'],
      },
    ],
  },
  {
    name: 'Food & Beverage',
    industries: [
      {
        name: 'Fine Dining Restaurant',
        slug: 'fine-dining-restaurant',
        description: 'For gourmet restaurants and culinary houses',
        longDescription: 'Elevate your restaurant with a complete management suite. Handle reservations, table management, inventory, and point of sale from a single, elegant interface.',
        icon: 'fas fa-utensils',
        keyFeatures: ['Reservation & Table Management', 'Point of Sale', 'Inventory Control', 'Menu Engineering'],
        imageUrl: '/images/industries/fine-dining.jpg',
        testimonial: {
          quote: 'The attention to detail in BizSuite matches our own. It has streamlined our operations, allowing us to focus on creating an unforgettable dining experience.',
          author: 'Marco Bianchi',
          company: 'The Gourmet Table',
        },
        relatedApps: ['point-of-sale', 'inventory', 'purchase', 'accounting'],
      },
      {
        name: 'Food Trucks',
        slug: 'food-trucks',
        description: 'For mobile kitchens, street food vendors, and catering trucks',
        longDescription: 'Run your food truck business on the go. Take orders, process payments, track inventory, and manage your locations, all from a mobile-friendly platform.',
        icon: 'fas fa-truck-moving',
        keyFeatures: ['Mobile Point of Sale', 'Real-time Inventory', 'Location Management', 'Sales Analytics'],
        imageUrl: '/images/industries/food-truck.jpg',
        relatedApps: ['point-of-sale', 'inventory', 'fleet', 'sales'],
      },
    ],
  },
  {
    name: 'Health, Wellness & Personal Care',
    industries: [
      {
        name: 'Fitness Center',
        slug: 'fitness-center',
        description: 'For gyms, wellness clubs, and personal training studios',
        longDescription: 'Manage your gym or fitness studio with tools for memberships, class scheduling, and personal training appointments. Keep your members engaged and your business healthy.',
        icon: 'fas fa-dumbbell',
        keyFeatures: ['Membership Management', 'Class Scheduling', 'Personal Trainer Booking', 'Automated Billing'],
        imageUrl: '/images/industries/fitness-center.jpg',
        relatedApps: ['subscriptions', 'appointments', 'point-of-sale', 'crm'],
      },
      {
        name: 'Hair Salon',
        slug: 'hair-salon',
        description: 'For hair salons, barbershops, and hairstyling studios',
        longDescription: 'Run your salon smoothly with appointment booking, client management, and inventory control for your retail products. Focus on making your clients look and feel great.',
        icon: 'fas fa-cut',
        keyFeatures: ['Online Appointment Booking', 'Stylist Schedules', 'Client History', 'Product Inventory'],
        imageUrl: '/images/industries/hair-salon.jpg',
        relatedApps: ['appointments', 'point-of-sale', 'inventory', 'crm'],
      },
    ],
  },
  {
    name: 'Hospitality, Tourism & Leisure',
    industries: [
      {
        name: 'Hotel',
        slug: 'hotel',
        description: 'For hotels, resorts, and hospitality chains',
        longDescription: 'A complete property management system for hotels of all sizes. Manage bookings, front desk, housekeeping, and billing in a single, integrated solution.',
        icon: 'fas fa-hotel',
        keyFeatures: ['Property Management System (PMS)', 'Online Booking Engine', 'Channel Manager', 'Housekeeping Management'],
        imageUrl: '/images/industries/hotel.jpg',
        testimonial: {
          quote: 'BizSuite\'s hotel management software is powerful yet easy to use. It has given us a 360-degree view of our operations and improved guest satisfaction.',
          author: 'Maria Rodriguez',
          company: 'The Grand Coastal Hotel',
        },
        relatedApps: ['point-of-sale', 'inventory', 'website', 'accounting'],
      },
      {
        name: 'Campsite',
        slug: 'campsite',
        description: 'For campgrounds, glamping accommodations and cabin rentals',
        longDescription: 'Manage your campsite or RV park with booking charts, site management, and automated billing. Provide a seamless booking experience for your guests.',
        icon: 'fas fa-campground',
        keyFeatures: ['Visual Booking Chart', 'Site & Unit Management', 'Seasonal Pricing', 'Online Reservations'],
        imageUrl: '/images/industries/campsite.jpg',
        relatedApps: ['appointments', 'point-of-sale', 'website', 'accounting'],
      },
    ],
  },
  {
    name: 'Manufacturing & Supply Chain',
    industries: [
      {
        name: 'Custom Furniture Production',
        slug: 'custom-furniture-production',
        description: 'For bespoke furniture makers, carpentry workshops, and design studios',
        longDescription: 'Manage your entire furniture production process, from custom orders and bills of materials to manufacturing and delivery. Streamline your workshop for maximum efficiency.',
        icon: 'fas fa-couch',
        keyFeatures: ['Bill of Materials (BoM)', 'Manufacturing Orders', 'Work Center Management', 'Inventory & Procurement'],
        imageUrl: '/images/industries/furniture-production.jpg',
        relatedApps: ['manufacturing', 'inventory', 'purchase', 'sales'],
      },
      {
        name: 'Food Distribution',
        slug: 'food-distribution',
        description: 'For food factories, artisanal producers, and distribution businesses',
        longDescription: 'A complete solution for food distributors, handling inventory, lot traceability, sales, and purchasing. Ensure compliance and optimize your supply chain.',
        icon: 'fas fa-truck-loading',
        keyFeatures: ['Lot & Serial Number Tracking', 'Warehouse Management', 'Sales & Purchase Orders', 'Quality Control'],
        imageUrl: '/images/industries/food-distribution.jpg',
        relatedApps: ['inventory', 'sales', 'purchase', 'quality'],
      },
      {
        name: 'Manufacturing',
        slug: 'manufacturing',
        description: 'For industrial production, factory management, and assembly lines',
        longDescription: 'Optimize your manufacturing operations with advanced MRP, quality control, and maintenance tools. Actyx provides a unified platform to manage complex production cycles and supply chains from a single interface.',
        icon: 'fas fa-industry',
        keyFeatures: ['Advanced MRP', 'Quality Control', 'Maintenance Management', 'PLM Integration'],
        imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000',
        relatedApps: ['manufacturing', 'inventory', 'purchase', 'quality', 'maintenance'],
      },
    ],
  },
  {
    name: 'Real Estate, Construction & Maintenance',
    industries: [
      {
        name: 'Construction',
        slug: 'construction',
        description: 'For builders, contractors, and construction project firms',
        longDescription: 'Manage your construction projects from start to finish. Track project progress, manage budgets and subcontractors, and handle billing, all in one place.',
        icon: 'fas fa-hard-hat',
        keyFeatures: ['Project Management', 'Budgeting & Costing', 'Subcontractor Management', 'Timesheets & Billing'],
        imageUrl: '/images/industries/construction.jpg',
        relatedApps: ['project', 'timesheets', 'purchase', 'accounting'],
      },
      {
        name: 'Real Estate Agency',
        slug: 'real-estate-agency',
        description: 'For real estate agencies, real estate professionals',
        longDescription: 'A CRM and sales platform for real estate agencies. Manage listings, track leads, and automate your sales pipeline to close more deals.',
        icon: 'fas fa-building',
        keyFeatures: ['Listing Management', 'Lead Nurturing', 'Sales Pipeline', 'Commission Tracking'],
        imageUrl: '/images/industries/real-estate.jpg',
        relatedApps: ['crm', 'sales', 'sign', 'marketing-automation'],
      },
    ],
  },
  {
    name: 'Retail & eCommerce',
    industries: [
      {
        name: 'Clothing Store',
        slug: 'clothing-store',
        description: 'For fashion retailers, boutiques, and apparel shops',
        longDescription: 'Manage your fashion retail business with an integrated solution for point of sale, inventory, and eCommerce. Handle variants like size and color with ease.',
        icon: 'fas fa-tshirt',
        keyFeatures: ['Point of Sale', 'Inventory Management with Variants', 'eCommerce Integration', 'Customer Loyalty Programs'],
        imageUrl: '/images/industries/clothing-store.jpg',
        relatedApps: ['point-of-sale', 'inventory', 'e-commerce', 'crm'],
      },
      {
        name: 'Grocery Store',
        slug: 'grocery-store',
        description: 'For supermarkets, local shops, and small retailers',
        longDescription: 'A fast and reliable point of sale system for grocery stores. Manage thousands of SKUs, track inventory in real-time, and speed up your checkout process.',
        icon: 'fas fa-shopping-cart',
        keyFeatures: ['Fast Point of Sale', 'Barcode Scanning', 'Inventory & Stock Management', 'Supplier Management'],
        imageUrl: '/images/industries/grocery-store.jpg',
        relatedApps: ['point-of-sale', 'inventory', 'purchase', 'accounting'],
      },
      {
        name: 'Retail',
        slug: 'retail',
        description: 'For modern retail chains, boutiques, and multi-channel stores',
        longDescription: 'Power your retail business with an integrated solution for POS, inventory, and eCommerce. Actyx helps you deliver a seamless omnichannel experience to your customers while optimizing your back-office operations.',
        icon: 'fas fa-store',
        keyFeatures: ['Multi-channel Sales', 'Real-time Stock Sync', 'Customer Loyalty', 'Advanced POS'],
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000',
        relatedApps: ['point-of-sale', 'inventory', 'e-commerce', 'crm', 'sales'],
      },
    ],
  },
  {
    name: 'Trades & Home Services',
    industries: [
      {
        name: 'Cleaning Services',
        slug: 'cleaning-services',
        description: 'For cleaning companies and janitorial services',
        longDescription: 'Manage your cleaning service business with scheduling, dispatching, and invoicing tools. Optimize your team\'s routes and provide excellent service to your clients.',
        icon: 'fas fa-broom',
        keyFeatures: ['Job Scheduling & Dispatching', 'Route Optimization', 'Recurring Invoices', 'Mobile App for Field Workers'],
        imageUrl: '/images/industries/cleaning-services.jpg',
        relatedApps: ['field-service', 'sales', 'inventory', 'accounting'],
      },
      {
        name: 'Gardening',
        slug: 'gardening',
        description: 'For landscaping, groundskeeping and outdoor service providers',
        longDescription: 'A complete toolkit for gardening and landscaping businesses. Plan jobs, manage your team, track equipment, and handle billing with a single application.',
        icon: 'fas fa-leaf',
        keyFeatures: ['Job Costing & Quoting', 'Team Scheduling', 'Equipment Tracking', 'Invoicing & Payments'],
        imageUrl: '/images/industries/gardening.jpg',
        relatedApps: ['field-service', 'project', 'inventory', 'sales'],
      },
    ],
  },
  {
    name: 'On the way!',
    industries: [
      {
        name: 'Veterinary Clinic',
        slug: 'veterinary-clinic',
        description: 'For veterinary hospitals, animal hospitals, and pet care providers',
        longDescription: 'Manage your veterinary clinic with appointment scheduling, patient records, and billing. Provide the best care for your furry, feathered, or scaled patients.',
        icon: 'fas fa-paw',
        keyFeatures: ['Appointment Scheduling', 'Electronic Health Records (EHR)', 'Billing & Invoicing', 'Inventory for Medication'],
        imageUrl: '/images/industries/veterinary.jpg',
        relatedApps: ['appointments', 'health', 'inventory', 'accounting'],
      },
      {
        name: 'Catering',
        slug: 'catering',
        description: 'For catering companies, event caterers, and food service providers',
        longDescription: 'From menu planning and quoting to kitchen production and event delivery, manage your entire catering business with one integrated solution.',
        icon: 'fas fa-utensils',
        keyFeatures: ['Event & Menu Planning', 'Quote Generation', 'Kitchen Production Orders', 'Delivery Management'],
        imageUrl: '/images/industries/catering.jpg',
        relatedApps: ['sales', 'manufacturing', 'inventory', 'project'],
      },
      {
        name: 'Healthcare',
        slug: 'healthcare',
        description: 'For hospitals, clinics, and medical practitioners',
        longDescription: 'Deliver better patient care with a comprehensive healthcare management system. Manage appointments, patient records, and hospital operations efficiently while maintaining complete data security and compliance.',
        icon: 'fas fa-stethoscope',
        keyFeatures: ['Patient Records (EMR)', 'Appointment Scheduling', 'Billing & Claims', 'Inventory Management'],
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d670db?auto=format&fit=crop&q=80&w=1000',
        relatedApps: ['appointments', 'documents', 'accounting', 'inventory'],
      },
    ],
  },
];
