// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "../styles/Home.css";
// import { appModules } from "../data/appModules";
// import { Product } from "../data/products";
// import { productsApi } from "../services/productsApi";
// import { AdvisorDropdown } from '../components/AdvisorDropdown';
// import {
//   Cpu,
//   ShoppingCart,
//   Users,
//   Activity,
//   ArrowRight,
//   MousePointer2,
//   Mail,
//   CheckCircle2,
//   XCircle,
//   ShieldCheck,
//   Zap,
//   Layers,
//   TrendingUp,
//   Monitor,
//   Box,
//   Headphones
// } from "lucide-react";

// const Home: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [productsLoading, setProductsLoading] = useState(true);
//   const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

//   // Fetch products on component mount
//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         setProductsLoading(true);
//         const fetchedProducts = await productsApi.getCachedProducts();
//         setProducts(fetchedProducts);
//       } catch (error) {
//         console.error('Failed to load products:', error);
//       } finally {
//         setProductsLoading(false);
//       }
//     };

//     loadProducts();
//   }, []);

//   // Product icon colors
//   const getProductIconColor = (productName: string) => {
//     const colors: Record<string, string> = {
//       'ERP': '#6366f1',
//       'Exam': '#8b5cf6',
//       'Account': '#10b981',
//       'Website': '#f59e0b',
//       'CRM': '#ef4444',
//       'HR': '#ec4899',
//       'Inventory': '#14b8a6',
//       'Manufacturing': '#f97316'
//     };
//     return colors[productName] || '#6b7280';
//   };

//   const getProductIcon = (productName: string) => {
//     const icons: Record<string, React.ReactNode> = {
//       'ERP': <Monitor size={20} />,
//       'Exam': <ShieldCheck size={20} />,
//       'Account': <Activity size={20} />,
//       'Website': <Box size={20} />,
//       'CRM': <Users size={20} />,
//       'HR': <ShieldCheck size={20} />,
//       'Inventory': <Box size={20} />,
//       'Manufacturing': <Cpu size={20} />
//     };
//     return icons[productName] || <Box size={20} />;
//   };

//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero">
//         <div className="container hero-inner">
//           <div className="hero-content">
//             <div className="hero-badge">
//               <span>🚀</span>
//               <span>AI-Powered Business Management</span>
//             </div>
//             <h1 className="hero-title">
//               Transform Your Business with
//               <span className="gradient-text"> Intelligent Software</span>
//             </h1>
//             <p className="hero-subtitle">
//               Complete business management platform that adapts to your needs. 
//               Streamline operations, boost efficiency, and drive growth.
//             </p>
//             <div className="hero-actions">
//               <Link to="/get-started" className="btn-primary">
//                 Get Started Free
//                 <ArrowRight size={16} />
//               </Link>
//               <button className="btn-secondary">
//                 <Monitor size={16} />
//                 Watch Demo
//               </button>
//             </div>
//             <div className="hero-stats">
//               <div className="stat-item">
//                 <div className="stat-number">10K+</div>
//                 <div className="stat-label">Active Users</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-number">99.9%</div>
//                 <div className="stat-label">Uptime</div>
//               </div>
//               <div className="stat-item">
//                 <div className="stat-number">24/7</div>
//                 <div className="stat-label">Support</div>
//               </div>
//             </div>
//           </div>
//           {/* <div className="hero-visual">
//             <div className="dashboard-preview">
//               <div className="dashboard-header">
//                 <div className="window-controls">
//                   <span className="control red"></span>
//                   <span className="control yellow"></span>
//                   <span className="control green"></span>
//                 </div>
//                 <div className="dashboard-title">Business Dashboard</div>
//               </div>
//               <div className="dashboard-content">
//                 <div className="dashboard-sidebar">
//                   <div className="sidebar-item active">
//                     <Monitor size={16} />
//                     <span>Overview</span>
//                   </div>
//                   <div className="sidebar-item">
//                     <Users size={16} />
//                     <span>Customers</span>
//                   </div>
//                   <div className="sidebar-item">
//                     <ShoppingCart size={16} />
//                     <span>Sales</span>
//                   </div>
//                   <div className="sidebar-item">
//                     <Box size={16} />
//                     <span>Inventory</span>
//                   </div>
//                 </div>
//                 <div className="dashboard-main">
//                   <div className="dashboard-cards">
//                     <div className="dash-card">
//                       <div className="dash-icon">
//                         <TrendingUp size={20} />
//                       </div>
//                       <div className="dash-content">
//                         <div className="dash-value">$24,580</div>
//                         <div className="dash-label">Total Revenue</div>
//                         <div className="dash-trend positive">+12.5%</div>
//                       </div>
//                     </div>
//                     <div className="dash-card">
//                       <div className="dash-icon">
//                         <Users size={20} />
//                       </div>
//                       <div className="dash-content">
//                         <div className="dash-value">1,428</div>
//                         <div className="dash-label">New Customers</div>
//                         <div className="dash-trend positive">+8.2%</div>
//                       </div>
//                     </div>
//                     <div className="dash-card">
//                       <div className="dash-icon">
//                         <Activity size={20} />
//                       </div>
//                       <div className="dash-content">
//                         <div className="dash-value">89.3%</div>
//                         <div className="dash-label">Efficiency Rate</div>
//                         <div className="dash-trend positive">+5.1%</div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="dashboard-chart">
//                     <div className="chart-header">
//                       <span>Performance Analytics</span>
//                       <div className="chart-period">
//                         <span className="period active">Week</span>
//                         <span className="period">Month</span>
//                         <span className="period">Year</span>
//                       </div>
//                     </div>
//                     <div className="chart-container">
//                       <svg viewBox="0 0 400 200" className="chart-svg">
//                         <defs>
//                           <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//                             <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
//                             <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
//                           </linearGradient>
//                         </defs>
//                         <path 
//                           d="M0,180 L0,120 C50,100 100,80 150,90 C200,100 250,60 300,75 C350,90 400,40 400,55 L400,180 Z" 
//                           fill="url(#chartGradient)"
//                         />
//                         <path 
//                           d="M0,120 C50,100 100,80 150,90 C200,100 250,60 300,75 C350,90 400,40 400,55" 
//                           stroke="#6366f1" 
//                           strokeWidth="3" 
//                           fill="none"
//                         />
//                         <circle cx="0" cy="120" r="4" fill="#6366f1" />
//                         <circle cx="100" cy="80" r="4" fill="#6366f1" />
//                         <circle cx="200" cy="100" r="4" fill="#6366f1" />
//                         <circle cx="300" cy="75" r="4" fill="#6366f1" />
//                         <circle cx="400" cy="55" r="4" fill="#6366f1" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </section>

//       {/* Products Section */}
//       <section className="products-section-new">
//         <div className="section-header">
//           <div className="section-badge">
//             <Zap size={16} />
//             <span>Our Products</span>
//           </div>
//           <h2>Choose Your Solution</h2>
//           <p>Powerful modules designed for every business need</p>
//           <div className="section-divider"></div>
//         </div>
//         <div className="products-grid-new">
//           {productsLoading ? (
//             <div className="loading-state">
//               <div className="spinner"></div>
//               <p>Loading amazing products...</p>
//             </div>
//           ) : (
//             products.map((product) => (
//               <Link
//                 key={product.name}
//                 to={`/get-started?product=${encodeURIComponent(product.name)}`}
//                 className="product-card-new"
//                 onMouseEnter={() => setHoveredProduct(product.name)}
//                 onMouseLeave={() => setHoveredProduct(null)}
//                 style={{
//                   '--icon-color': getProductIconColor(product.name)
//                 } as React.CSSProperties}
//               >
//                 <div className="product-icon-new">
//                   {getProductIcon(product.name)}
//                 </div>
//                 <div className="product-content-new">
//                   <h3 className="product-title-new">{product.name}</h3>
//                   <p className="product-description-new">
//                     Complete {product.name.toLowerCase()} solution with {product.modules.length} modules
//                   </p>
//                   <div className="product-features-new">
//                     <span className="feature-tag">Advanced</span>
//                     <span className="feature-tag">Scalable</span>
//                     <span className="feature-tag">Secure</span>
//                   </div>
//                 </div>
//                 <div className="product-arrow-new">
//                   <ArrowRight size={20} />
//                 </div>
//               </Link>
//             ))
//           )}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <div className="section-header-alt">
//           <div className="section-badge-alt">
//             <Layers size={16} />
//             <span>Why Choose Us</span>
//           </div>
//           <h2>Built for Excellence</h2>
//           <p>Experience the difference with our cutting-edge features</p>
//           <div className="section-divider-alt"></div>
//         </div>
//         <div className="features-grid-alt">
//           <div className="feature-item-alt">
//             <div className="feature-icon-alt">
//               <Zap size={24} />
//             </div>
//             <h3 className="feature-title-alt">Lightning Fast</h3>
//             <p className="feature-description-alt">
//               Optimized performance for seamless experience
//             </p>
//           </div>
//           <div className="feature-item-alt">
//             <div className="feature-icon-alt">
//               <ShieldCheck size={24} />
//             </div>
//             <h3 className="feature-title-alt">Secure & Reliable</h3>
//             <p className="feature-description-alt">
//               Enterprise-grade security with 99.9% uptime
//             </p>
//           </div>
//           <div className="feature-item-alt">
//             <div className="feature-icon-alt">
//               <Layers size={24} />
//             </div>
//             <h3 className="feature-title-alt">Fully Integrated</h3>
//             <p className="feature-description-alt">
//               All modules work together perfectly
//             </p>
//           </div>
//           <div className="feature-item-alt">
//             <div className="feature-icon-alt">
//               <TrendingUp size={24} />
//             </div>
//             <h3 className="feature-title-alt">Scalable Growth</h3>
//             <p className="feature-description-alt">
//               Grows with your business needs
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Comparison Section */}
//       <section className="comparison-section">
//         <div className="section-header">
//           <div className="section-badge">
//             <Layers size={16} />
//             <span>Compare Plans</span>
//           </div>
//           <h2>Choose Your Perfect Plan</h2>
//           <p>Flexible pricing designed for businesses of all sizes</p>
//           <div className="section-divider"></div>
//         </div>
//         <div className="comparison-container">
//           <div className="comparison-grid">
//             <div className="comparison-card">
//               <div className="plan-header">
//                 <h3>Starter</h3>
//                 <div className="plan-price">
//                   <span className="currency">$</span>
//                   <span className="amount">29</span>
//                   <span className="period">/mo</span>
//                 </div>
//                 <p className="plan-description">Perfect for small teams getting started</p>
//               </div>
//               <div className="plan-features">
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>Up to 10 users</span>
//                 </div>
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>Basic features</span>
//                 </div>
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>Email support</span>
//                 </div>
//               </div>
//               <button className="btn-outline">Start Free Trial</button>
//             </div>
            
//             <div className="comparison-card featured">
//               <div className="popular-badge">Most Popular</div>
//               <div className="plan-header">
//                 <h3>Professional</h3>
//                 <div className="plan-price">
//                   <span className="currency">$</span>
//                   <span className="amount">79</span>
//                   <span className="period">/mo</span>
//                 </div>
//                 <p className="plan-description">Ideal for growing businesses</p>
//               </div>
//               <div className="plan-features">
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>Up to 50 users</span>
//                 </div>
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>All features</span>
//                 </div>
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>Priority support</span>
//                 </div>
//               </div>
//               <button className="btn-primary">Start Free Trial</button>
//             </div>
            
//             <div className="comparison-card">
//               <div className="plan-header">
//                 <h3>Enterprise</h3>
//                 <div className="plan-price">
//                   <span className="currency">$</span>
//                   <span className="amount">199</span>
//                   <span className="period">/mo</span>
//                 </div>
//                 <p className="plan-description">For large organizations</p>
//               </div>
//               <div className="plan-features">
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>Unlimited users</span>
//                 </div>
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>All features</span>
//                 </div>
//                 <div className="feature-item">
//                   <CheckCircle2 size={14} />
//                   <span>24/7 support</span>
//                 </div>
//               </div>
//               <button className="btn-outline">Contact Sales</button>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="testimonials-section">
//         <div className="section-header">
//           <div className="section-badge">
//             <Users size={16} />
//             <span>Testimonials</span>
//           </div>
//           <h2>What Our Clients Say</h2>
//           <p>Real stories from real businesses</p>
//           <div className="section-divider"></div>
//         </div>
//         <div className="testimonials-grid">
//           <div className="testimonial-card">
//             <div className="testimonial-content">
//               <div className="testimonial-text">
//                 "This platform transformed how we manage our entire business. The integration is seamless and the support is incredible."
//               </div>
//               <div className="testimonial-author">
//                 <div className="author-avatar">JD</div>
//                 <div className="author-info">
//                   <div className="author-name">John Davidson</div>
//                   <div className="author-role">CEO, TechCorp</div>
//                   <div className="author-rating">
//                     {[...Array(5)].map((_, i) => (
//                       <span key={i} className="star">⭐</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-content">
//               <div className="testimonial-text">
//                 "The best investment we made for our business. Everything works perfectly together and our efficiency has increased by 40%."
//               </div>
//               <div className="testimonial-author">
//                 <div className="author-avatar">SM</div>
//                 <div className="author-info">
//                   <div className="author-name">Sarah Martinez</div>
//                   <div className="author-role">Operations Manager, Global Inc</div>
//                   <div className="author-rating">
//                     {[...Array(5)].map((_, i) => (
//                       <span key={i} className="star">⭐</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="testimonial-card">
//             <div className="testimonial-content">
//               <div className="testimonial-text">
//                 "Finally, a solution that understands our needs. The customization options are endless and the user interface is intuitive."
//               </div>
//               <div className="testimonial-author">
//                 <div className="author-avatar">MC</div>
//                 <div className="author-info">
//                   <div className="author-name">Michael Chen</div>
//                   <div className="author-role">Founder, StartupHub</div>
//                   <div className="author-rating">
//                     {[...Array(4)].map((_, i) => (
//                       <span key={i} className="star">⭐</span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="stats-section">
//         <div className="stats-container">
//           <div className="stats-header">
//             <div className="section-badge">
//               <TrendingUp size={16} />
//               <span>By the Numbers</span>
//             </div>
//             <h2>Impressive Results</h2>
//             <p>Join thousands of successful businesses</p>
//           </div>
//           <div className="stats-grid">
//             <div className="stat-card">
//               <div className="stat-icon">
//                 <Users size={32} />
//               </div>
//               <div className="stat-number">10,000+</div>
//               <div className="stat-label">Active Users</div>
//               <div className="stat-description">Growing daily</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">
//                 <CheckCircle2 size={32} />
//               </div>
//               <div className="stat-number">99.9%</div>
//               <div className="stat-label">Uptime</div>
//               <div className="stat-description">Reliable service</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">
//                 <Headphones size={32} />
//               </div>
//               <div className="stat-number">24/7</div>
//               <div className="stat-label">Support</div>
//               <div className="stat-description">Always here</div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">
//                 <Zap size={32} />
//               </div>
//               <div className="stat-number">150+</div>
//               <div className="stat-label">Features</div>
//               <div className="stat-description">Powerful tools</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="faq-section">
//         <div className="section-header">
//           <div className="section-badge">
//             <Mail size={16} />
//             <span>FAQ</span>
//           </div>
//           <h2>Frequently Asked Questions</h2>
//           <p>Everything you need to know about our platform</p>
//           <div className="section-divider"></div>
//         </div>
//         <div className="faq-grid">
//           <div className="faq-card">
//             <div className="faq-question">
//               <h4>How long does setup take?</h4>
//               <span className="faq-icon">+</span>
//             </div>
//             <div className="faq-answer">
//               <p>Setup typically takes less than 30 minutes. Our guided onboarding process walks you through every step, and our support team is available to help if needed.</p>
//             </div>
//           </div>
//           <div className="faq-card">
//             <div className="faq-question">
//               <h4>Can I customize the platform?</h4>
//               <span className="faq-icon">+</span>
//             </div>
//             <div className="faq-answer">
//               <p>Yes! Our platform is highly customizable. You can tailor workflows, create custom fields, design dashboards, and integrate with your existing tools.</p>
//             </div>
//           </div>
//           <div className="faq-card">
//             <div className="faq-question">
//               <h4>Is my data secure?</h4>
//               <span className="faq-icon">+</span>
//             </div>
//             <div className="faq-answer">
//               <p>Absolutely. We use bank-level encryption, regular security audits, and comply with all major data protection regulations including GDPR and SOC 2.</p>
//             </div>
//           </div>
//           <div className="faq-card">
//             <div className="faq-question">
//               <h4>What about customer support?</h4>
//               <span className="faq-icon">+</span>
//             </div>
//             <div className="faq-answer">
//               <p>We offer 24/7 support via chat, email, and phone. Our response time is under 2 hours, and we have a comprehensive knowledge base and video tutorials.</p>
//             </div>
//           </div>
//           <div className="faq-card">
//             <div className="faq-question">
//               <h4>Can I integrate with other tools?</h4>
//               <span className="faq-icon">+</span>
//             </div>
//             <div className="faq-answer">
//               <p>Yes! We integrate with over 100+ popular tools including Slack, Google Workspace, Microsoft 365, QuickBooks, and more. We also offer a robust API for custom integrations.</p>
//             </div>
//           </div>
//           <div className="faq-card">
//             <div className="faq-question">
//               <h4>Is there a free trial?</h4>
//               <span className="faq-icon">+</span>
//             </div>
//             <div className="faq-answer">
//               <p>Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can also start with our free forever plan for small teams.</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Podcast/Resources Section */}
//       <section className="resources-section">
//         <div className="section-header-alt">
//           <div className="section-badge-alt">
//             <Monitor size={16} />
//             <span>Resources</span>
//           </div>
//           <h2>Learn & Grow</h2>
//           <p>Podcasts, guides, and insights for your business</p>
//           <div className="section-divider-alt"></div>
//         </div>
//         <div className="resources-grid">
//           <div className="resource-card">
//             <div className="resource-image">
//               <div className="play-button">▶</div>
//             </div>
//             <div className="resource-content">
//               <div className="resource-type">Podcast</div>
//               <h3 className="resource-title">Digital Transformation Success Stories</h3>
//               <p className="resource-description">Learn how businesses transformed their operations with our platform</p>
//               <div className="resource-meta">
//                 <span className="duration">45 min</span>
//                 <span className="date">2 days ago</span>
//               </div>
//             </div>
//           </div>
//           <div className="resource-card">
//             <div className="resource-image">
//               <div className="play-button">▶</div>
//             </div>
//             <div className="resource-content">
//               <div className="resource-type">Podcast</div>
//               <h3 className="resource-title">Future of Business Management</h3>
//               <p className="resource-description">Industry experts discuss trends and innovations in business software</p>
//               <div className="resource-meta">
//                 <span className="duration">32 min</span>
//                 <span className="date">1 week ago</span>
//               </div>
//             </div>
//           </div>
//           <div className="resource-card">
//             <div className="resource-image">
//               <div className="play-button">▶</div>
//             </div>
//             <div className="resource-content">
//               <div className="resource-type">Podcast</div>
//               <h3 className="resource-title">Scaling Your Business Smartly</h3>
//               <p className="resource-description">Tips and strategies for sustainable business growth</p>
//               <div className="resource-meta">
//                 <span className="duration">28 min</span>
//                 <span className="date">2 weeks ago</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Final CTA Section */}
//       <section className="cta-section">
//         <div className="cta-container">
//           <div className="cta-content">
//             <div className="section-badge">
//               <Zap size={16} />
//               <span>Ready to Start?</span>
//             </div>
//             <h2>Transform Your Business Today</h2>
//             <p>Join thousands of successful businesses using our platform</p>
//             <div className="cta-actions">
//               <Link to="/get-started" className="btn-primary btn-large">
//                 Get Started Free
//                 <ArrowRight size={16} />
//               </Link>
//               <Link to="/contact" className="btn-secondary btn-large">
//                 Talk to Sales
//                 <Users size={16} />
//               </Link>
//             </div>
//             <div className="cta-features">
//               <div className="cta-feature">
//                 <CheckCircle2 size={16} />
//                 <span>No credit card required</span>
//               </div>
//               <div className="cta-feature">
//                 <CheckCircle2 size={16} />
//                 <span>14-day free trial</span>
//               </div>
//               <div className="cta-feature">
//                 <CheckCircle2 size={16} />
//                 <span>Cancel anytime</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

  
   

//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { appModules } from "../data/appModules";
import { Product } from "../data/products";
import { productsApi } from "../services/productsApi";
import { AdvisorDropdown } from '../components/AdvisorDropdown';
import {
  Cpu,
  ShoppingCart,
  Users,
  Activity,
  ArrowRight,
  MousePointer2,
  Mail,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Zap,
  Layers,
  TrendingUp,
  Monitor,
  Box,
  Headphones,
  Link2,
  Lock,
  Settings2,
  Star,
  Play,
} from "lucide-react";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

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
  }, []);

  const getProductIconColor = (productName: string) => {
    const colors: Record<string, string> = {
      'ERP':           '#2563eb',
      'Exam':          '#14b8a6',
      'Account':       '#10b981',
      'Website':       '#f97316',
      'CRM':           '#ef4444',
      'HR':            '#ec4899',
      'Inventory':     '#8b5cf6',
      'Manufacturing': '#f59e0b',
    };
    for (const key of Object.keys(colors)) {
      if (productName.toLowerCase().includes(key.toLowerCase())) return colors[key];
    }
    return '#2563eb';
  };

  const getProductIconBg = (productName: string) => {
    const bgs: Record<string, string> = {
      'ERP':           '#eff6ff',
      'Exam':          '#f0fdfa',
      'Account':       '#f0fdf4',
      'Website':       '#fff7ed',
      'CRM':           '#fef2f2',
      'HR':            '#fdf2f8',
      'Inventory':     '#faf5ff',
      'Manufacturing': '#fffbeb',
    };
    for (const key of Object.keys(bgs)) {
      if (productName.toLowerCase().includes(key.toLowerCase())) return bgs[key];
    }
    return '#eff6ff';
  };

  const getProductIcon = (productName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'ERP':           <Monitor size={22} />,
      'Exam':          <ShieldCheck size={22} />,
      'Account':       <Activity size={22} />,
      'Website':       <Box size={22} />,
      'CRM':           <Users size={22} />,
      'HR':            <ShieldCheck size={22} />,
      'Inventory':     <Box size={22} />,
      'Manufacturing': <Cpu size={22} />,
    };
    for (const key of Object.keys(icons)) {
      if (productName.toLowerCase().includes(key.toLowerCase())) return icons[key];
    }
    return <Box size={22} />;
  };

  const whyFeatures = [
    {
      icon: <Link2 size={22} />,
      iconBg: '#eff6ff',
      iconColor: '#2563eb',
      title: 'Single URL, Multiple Apps',
      desc: 'Access all your business tools from one domain. Centralized management means faster onboarding, unified SSO, and a simpler IT footprint.',
      bullets: ['Unified login across all apps', 'Centralized user management', 'Single billing & subscription'],
    },
    {
      icon: <Lock size={22} />,
      iconBg: '#f0fdf4',
      iconColor: '#10b981',
      title: 'Secure & Isolated',
      desc: "Each environment gets its own dedicated database. Your data is never co-mingled with other tenants — enterprise-grade isolation by default.",
      bullets: ['Dedicated database per tenant', 'End-to-end encryption at rest', 'GDPR & HIPAA compliance ready'],
    },
    {
      icon: <Settings2 size={22} />,
      iconBg: '#faf5ff',
      iconColor: '#8b5cf6',
      title: 'Fully Customizable',
      desc: 'Tailor every module to your specific workflows. Custom fields, reports, automations, and role-based access — no code required.',
      bullets: ['Custom fields & views', 'Drag-and-drop automation builder', 'Role-based access control'],
    },
  ];

  const testimonials = [
    {
      initials: 'JD',
      text: '"This platform transformed how we manage our entire business. The integration is seamless and the support is incredible."',
      name: 'John Davidson',
      role: 'CEO, TechCorp',
      stars: 5,
    },
    {
      initials: 'SM',
      text: '"The best investment we made for our business. Everything works perfectly together and our efficiency has increased by 40%."',
      name: 'Sarah Martinez',
      role: 'Operations Manager, Global Inc',
      stars: 5,
    },
    {
      initials: 'MC',
      text: '"Finally, a solution that understands our needs. The customization options are endless and the user interface is intuitive."',
      name: 'Michael Chen',
      role: 'Founder, StartupHub',
      stars: 4,
    },
  ];

  const faqs = [
    { q: 'How long does setup take?', a: 'Setup typically takes less than 30 minutes. Our guided onboarding process walks you through every step, and our support team is available to help if needed.' },
    { q: 'Can I customize the platform?', a: 'Yes! Our platform is highly customizable. You can tailor workflows, create custom fields, design dashboards, and integrate with your existing tools.' },
    { q: 'Is my data secure?', a: 'Absolutely. We use bank-level encryption, regular security audits, and comply with all major data protection regulations including GDPR and SOC 2.' },
    { q: 'What about customer support?', a: 'We offer 24/7 support via chat, email, and phone. Our response time is under 2 hours, and we have a comprehensive knowledge base and video tutorials.' },
    { q: 'Can I integrate with other tools?', a: 'Yes! We integrate with 100+ popular tools including Slack, Google Workspace, Microsoft 365, QuickBooks, and more. We also offer a robust API for custom integrations.' },
    { q: 'Is there a free trial?', a: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can also start with our free forever plan for small teams.' },
  ];

  return (
    <div className="home-container">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="h-hero">
        <div className="h-container h-hero-inner">
          <div className="h-hero-badge">
            <span className="h-badge-dot" />
            6-Month Free Trial · No Credit Card Required
          </div>

          <h1 className="h-hero-title">
            One Platform.<br />
            <span className="h-hero-title-blue">All Your Business Apps.</span>
          </h1>

          <p className="h-hero-desc">
            Launch your entire business stack from a single URL. Enjoy a{' '}
            <strong>3-month free trial</strong> on all plans — or use the platform{' '}
            <strong>completely free forever</strong> if you're a single user.
          </p>

          <div className="h-hero-actions">
            <Link to="/get-started" className="h-btn h-btn-blue">
              <Zap size={16} /> Get Started — It's Free
            </Link>
            <button className="h-btn h-btn-ghost">
              <Play size={12} className="h-play-icon" /> Watch Demo
            </button>
          </div>

          {/* Stats bar */}
          <div className="h-hero-stats">
            <div className="h-stat">
              <span className="h-stat-num">10K+</span>
              <span className="h-stat-lbl">Active Users</span>
            </div>
            <div className="h-stat-divider" />
            <div className="h-stat">
              <span className="h-stat-num">99.9%</span>
              <span className="h-stat-lbl">Uptime</span>
            </div>
            <div className="h-stat-divider" />
            <div className="h-stat">
              <span className="h-stat-num">24/7</span>
              <span className="h-stat-lbl">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR APPLICATIONS (Products) ────────────────────────── */}
      <section className="h-apps" id="apps">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">OUR APPLICATIONS</p>
            <h2 className="h-section-title">Everything Your Business Needs</h2>
            <p className="h-section-sub">
              Powerful apps, one unified platform. Deploy what you need, when you need it.
            </p>
          </div>

          {productsLoading ? (
            <div className="h-loading">
              <div className="h-spinner" />
              <p>Loading products…</p>
            </div>
          ) : (
            <div className="h-apps-grid">
              {products.map((product, idx) => {
                const color = getProductIconColor(product.name);
                const bg    = getProductIconBg(product.name);
                return (
                  <Link
                    key={product.name}
                    to={`/get-started?product=${encodeURIComponent(product.name)}`}
                    className="h-app-card"
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    <div className="h-app-icon" style={{ background: bg, color }}>
                      {getProductIcon(product.name)}
                    </div>
                    <div>
                      <div className="h-app-name">{product.name}</div>
                      <div className="h-app-cat" style={{ color }}>
                        {product.modules?.length
                          ? `${product.modules.length} MODULES`
                          : 'BUSINESS SUITE'}
                      </div>
                    </div>
                    <p className="h-app-desc">
                      Complete {product.name.toLowerCase()} solution with advanced analytics,
                      reporting, and seamless integrations built-in.
                    </p>
                    <span className="h-app-link" style={{ color }}>
                      Explore {product.name} →
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────── */}
      <section className="h-why">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">WHY US</p>
            <h2 className="h-section-title">Built Different. Built Better.</h2>
            <p className="h-section-sub">
              A platform designed around the way modern businesses actually operate.
            </p>
          </div>

          <div className="h-why-grid">
            {whyFeatures.map((f) => (
              <div key={f.title} className="h-why-card">
                <div className="h-why-icon" style={{ background: f.iconBg, color: f.iconColor }}>
                  {f.icon}
                </div>
                <h3 className="h-why-title">{f.title}</h3>
                <p className="h-why-desc">{f.desc}</p>
                <ul className="h-why-list">
                  {f.bullets.map((b) => (
                    <li key={b} className="h-why-item">
                      <CheckCircle2 size={14} style={{ color: '#22c55e', flexShrink: 0 }} /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ────────────────────────────────────────────── */}
      <section className="h-pricing" id="pricing">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">PRICING</p>
            <h2 className="h-section-title">Simple, Transparent Pricing</h2>
            <p className="h-section-sub">
              Start free, scale as you grow. Every plan includes a 3-month trial with full access.
            </p>
          </div>

          <div className="h-pricing-grid">
            {/* Starter */}
            <div className="h-price-card h-price-starter">
              <div className="h-plan-badge h-plan-badge-free">✦ Free Forever</div>
              <h3 className="h-plan-name">Starter</h3>
              <p className="h-plan-tag">Perfect for solopreneurs and independent professionals.</p>
              <div className="h-plan-price">
                <span className="h-price-dollar">$</span>
                <span className="h-price-amt">0</span>
                <span className="h-price-per">/ forever</span>
              </div>
              <ul className="h-plan-feats">
                {['1 user included', 'Access to all apps', 'Standard support', '5 GB storage'].map(f => (
                  <li key={f} className="h-plan-feat">
                    <CheckCircle2 size={14} style={{ color: '#22c55e', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/get-started" className="h-plan-btn h-plan-btn-outline">Get Started Free</Link>
            </div>

            {/* Professional */}
            <div className="h-price-card h-price-pro">
              <div className="h-plan-badge h-plan-badge-pop">⭐ Most Popular</div>
              <h3 className="h-plan-name h-plan-name-white">Professional</h3>
              <p className="h-plan-tag h-plan-tag-white">Advanced security, customization, and priority support for growing teams.</p>
              <div className="h-plan-price">
                <span className="h-price-dollar h-price-white">$</span>
                <span className="h-price-amt h-price-white">79</span>
                <span className="h-price-per h-price-white-soft">/mo</span>
              </div>
              <ul className="h-plan-feats">
                {['Up to 50 users', 'All modules unlocked', 'Priority support', 'Custom domain'].map(f => (
                  <li key={f} className="h-plan-feat h-plan-feat-white">
                    <CheckCircle2 size={14} style={{ color: 'rgba(255,255,255,0.8)', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/get-started" className="h-plan-btn h-plan-btn-white">Start Free Trial</Link>
            </div>

            {/* Enterprise */}
            <div className="h-price-card h-price-starter">
              <div className="h-plan-badge h-plan-badge-ent">⚡ Enterprise</div>
              <h3 className="h-plan-name">Enterprise</h3>
              <p className="h-plan-tag">For large organizations with custom needs.</p>
              <div className="h-plan-price">
                <span className="h-price-custom">Custom</span>
              </div>
              <ul className="h-plan-feats">
                {['Unlimited users', 'Dedicated database', 'Advanced compliance', 'White-label', '24/7 support'].map(f => (
                  <li key={f} className="h-plan-feat">
                    <CheckCircle2 size={14} style={{ color: '#22c55e', flexShrink: 0 }} /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="h-plan-btn h-plan-btn-outline">Contact Sales</Link>
            </div>
          </div>

          <p className="h-pricing-note">
            🔒 All paid plans include a <strong>3-month free trial</strong> — no credit card required.{' '}
            <Link to="/pricing" className="h-pricing-link">See full pricing →</Link>
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────────────────────── */}
      <section className="h-testimonials">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">TESTIMONIALS</p>
            <h2 className="h-section-title">What Our Clients Say</h2>
            <p className="h-section-sub">Real stories from real businesses.</p>
          </div>
          <div className="h-testi-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="h-testi-card">
                <div className="h-testi-stars">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" stroke="none" />
                  ))}
                </div>
                <p className="h-testi-text">{t.text}</p>
                <div className="h-testi-author">
                  <div className="h-testi-avatar">{t.initials}</div>
                  <div>
                    <div className="h-testi-name">{t.name}</div>
                    <div className="h-testi-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="h-stats">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">BY THE NUMBERS</p>
            <h2 className="h-section-title">Impressive Results</h2>
            <p className="h-section-sub">Join thousands of successful businesses.</p>
          </div>
          <div className="h-stats-grid">
            {[
              { icon: <Users size={28} />, num: '10,000+', lbl: 'Active Users',    desc: 'Growing daily' },
              { icon: <CheckCircle2 size={28} />, num: '99.9%',  lbl: 'Uptime',       desc: 'Reliable service' },
              { icon: <Headphones size={28} />, num: '24/7',   lbl: 'Support',      desc: 'Always here' },
              { icon: <Zap size={28} />,         num: '150+',   lbl: 'Features',     desc: 'Powerful tools' },
            ].map((s) => (
              <div key={s.lbl} className="h-stat-card">
                <div className="h-stat-icon">{s.icon}</div>
                <div className="h-stat-num2">{s.num}</div>
                <div className="h-stat-lbl2">{s.lbl}</div>
                <div className="h-stat-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="h-faq">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">FAQ</p>
            <h2 className="h-section-title">Frequently Asked Questions</h2>
            <p className="h-section-sub">Everything you need to know about our platform.</p>
          </div>
          <div className="h-faq-grid">
            {faqs.map((f) => (
              <div key={f.q} className="h-faq-card">
                <div className="h-faq-q">
                  <h4>{f.q}</h4>
                  <span className="h-faq-icon">+</span>
                </div>
                <div className="h-faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESOURCES ──────────────────────────────────────────── */}
      <section className="h-resources">
        <div className="h-container">
          <div className="h-section-hdr">
            <p className="h-section-label">RESOURCES</p>
            <h2 className="h-section-title">Learn & Grow</h2>
            <p className="h-section-sub">Podcasts, guides, and insights for your business.</p>
          </div>
          <div className="h-res-grid">
            {[
              { title: 'Digital Transformation Success Stories', dur: '45 min', date: '2 days ago', desc: 'Learn how businesses transformed their operations with our platform.' },
              { title: 'Future of Business Management', dur: '32 min', date: '1 week ago', desc: 'Industry experts discuss trends and innovations in business software.' },
              { title: 'Scaling Your Business Smartly', dur: '28 min', date: '2 weeks ago', desc: 'Tips and strategies for sustainable business growth.' },
            ].map((r) => (
              <div key={r.title} className="h-res-card">
                <div className="h-res-thumb">
                  <div className="h-play-btn"><Play size={20} /></div>
                </div>
                <div className="h-res-body">
                  <span className="h-res-type">Podcast</span>
                  <h3 className="h-res-title">{r.title}</h3>
                  <p className="h-res-desc">{r.desc}</p>
                  <div className="h-res-meta">
                    <span>{r.dur}</span>
                    <span>{r.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section className="h-cta">
        <div className="h-container">
          <div className="h-cta-inner">
            <p className="h-section-label" style={{ color: 'rgba(255,255,255,0.7)' }}>READY TO START?</p>
            <h2 className="h-cta-title">Transform Your Business Today</h2>
            <p className="h-cta-sub">Join thousands of successful businesses using our platform.</p>
            <div className="h-cta-actions">
              <Link to="/get-started" className="h-btn h-btn-cta-white">
                Get Started Free <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="h-btn h-btn-cta-ghost">
                Talk to Sales <Users size={16} />
              </Link>
            </div>
            <div className="h-cta-checks">
              {['No credit card required', '14-day free trial', 'Cancel anytime'].map((c) => (
                <span key={c} className="h-cta-check">
                  <CheckCircle2 size={15} style={{ color: '#22c55e' }} /> {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ─────────────────────────────────────────── */}
      <section className="h-trusted">
        <div className="h-container">
          <p className="h-trusted-lbl">Trusted by growing businesses worldwide</p>
          <div className="h-trusted-logos">
            {[
              { icon: '🏥', name: 'HealthPlus' },
              { icon: '🚀', name: 'NovaCorp' },
              { icon: '🧬', name: 'BioSynth' },
              { icon: '🎓', name: 'EduGroup' },
              { icon: '🚛', name: 'LogiTrans' },
              { icon: '🏦', name: 'FinBridge' },
            ].map((l) => (
              <div key={l.name} className="h-trusted-logo">
                <span>{l.icon}</span> {l.name}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
