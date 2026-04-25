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
  Headphones
} from "lucide-react";

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  // Fetch products on component mount
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

  // Product icon colors
  const getProductIconColor = (productName: string) => {
    const colors: Record<string, string> = {
      'ERP': '#6366f1',
      'Exam': '#8b5cf6',
      'Account': '#10b981',
      'Website': '#f59e0b',
      'CRM': '#ef4444',
      'HR': '#ec4899',
      'Inventory': '#14b8a6',
      'Manufacturing': '#f97316'
    };
    return colors[productName] || '#6b7280';
  };

  const getProductIcon = (productName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'ERP': <Monitor size={20} />,
      'Exam': <ShieldCheck size={20} />,
      'Account': <Activity size={20} />,
      'Website': <Box size={20} />,
      'CRM': <Users size={20} />,
      'HR': <ShieldCheck size={20} />,
      'Inventory': <Box size={20} />,
      'Manufacturing': <Cpu size={20} />
    };
    return icons[productName] || <Box size={20} />;
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span>🚀</span>
              <span>AI-Powered Business Management</span>
            </div>
            <h1 className="hero-title">
              Transform Your Business with
              <span className="gradient-text"> Intelligent Software</span>
            </h1>
            <p className="hero-subtitle">
              Complete business management platform that adapts to your needs. 
              Streamline operations, boost efficiency, and drive growth.
            </p>
            <div className="hero-actions">
              <Link to="/get-started" className="btn-primary">
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <button className="btn-secondary">
                <Monitor size={16} />
                Watch Demo
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Support</div>
              </div>
            </div>
          </div>
          {/* <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="dashboard-header">
                <div className="window-controls">
                  <span className="control red"></span>
                  <span className="control yellow"></span>
                  <span className="control green"></span>
                </div>
                <div className="dashboard-title">Business Dashboard</div>
              </div>
              <div className="dashboard-content">
                <div className="dashboard-sidebar">
                  <div className="sidebar-item active">
                    <Monitor size={16} />
                    <span>Overview</span>
                  </div>
                  <div className="sidebar-item">
                    <Users size={16} />
                    <span>Customers</span>
                  </div>
                  <div className="sidebar-item">
                    <ShoppingCart size={16} />
                    <span>Sales</span>
                  </div>
                  <div className="sidebar-item">
                    <Box size={16} />
                    <span>Inventory</span>
                  </div>
                </div>
                <div className="dashboard-main">
                  <div className="dashboard-cards">
                    <div className="dash-card">
                      <div className="dash-icon">
                        <TrendingUp size={20} />
                      </div>
                      <div className="dash-content">
                        <div className="dash-value">$24,580</div>
                        <div className="dash-label">Total Revenue</div>
                        <div className="dash-trend positive">+12.5%</div>
                      </div>
                    </div>
                    <div className="dash-card">
                      <div className="dash-icon">
                        <Users size={20} />
                      </div>
                      <div className="dash-content">
                        <div className="dash-value">1,428</div>
                        <div className="dash-label">New Customers</div>
                        <div className="dash-trend positive">+8.2%</div>
                      </div>
                    </div>
                    <div className="dash-card">
                      <div className="dash-icon">
                        <Activity size={20} />
                      </div>
                      <div className="dash-content">
                        <div className="dash-value">89.3%</div>
                        <div className="dash-label">Efficiency Rate</div>
                        <div className="dash-trend positive">+5.1%</div>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-chart">
                    <div className="chart-header">
                      <span>Performance Analytics</span>
                      <div className="chart-period">
                        <span className="period active">Week</span>
                        <span className="period">Month</span>
                        <span className="period">Year</span>
                      </div>
                    </div>
                    <div className="chart-container">
                      <svg viewBox="0 0 400 200" className="chart-svg">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                        <path 
                          d="M0,180 L0,120 C50,100 100,80 150,90 C200,100 250,60 300,75 C350,90 400,40 400,55 L400,180 Z" 
                          fill="url(#chartGradient)"
                        />
                        <path 
                          d="M0,120 C50,100 100,80 150,90 C200,100 250,60 300,75 C350,90 400,40 400,55" 
                          stroke="#6366f1" 
                          strokeWidth="3" 
                          fill="none"
                        />
                        <circle cx="0" cy="120" r="4" fill="#6366f1" />
                        <circle cx="100" cy="80" r="4" fill="#6366f1" />
                        <circle cx="200" cy="100" r="4" fill="#6366f1" />
                        <circle cx="300" cy="75" r="4" fill="#6366f1" />
                        <circle cx="400" cy="55" r="4" fill="#6366f1" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section-new">
        <div className="section-header">
          <div className="section-badge">
            <Zap size={16} />
            <span>Our Products</span>
          </div>
          <h2>Choose Your Solution</h2>
          <p>Powerful modules designed for every business need</p>
          <div className="section-divider"></div>
        </div>
        <div className="products-grid-new">
          {productsLoading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading amazing products...</p>
            </div>
          ) : (
            products.map((product) => (
              <Link
                key={product.name}
                to={`/get-started?product=${encodeURIComponent(product.name)}`}
                className="product-card-new"
                onMouseEnter={() => setHoveredProduct(product.name)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  '--icon-color': getProductIconColor(product.name)
                } as React.CSSProperties}
              >
                <div className="product-icon-new">
                  {getProductIcon(product.name)}
                </div>
                <div className="product-content-new">
                  <h3 className="product-title-new">{product.name}</h3>
                  <p className="product-description-new">
                    Complete {product.name.toLowerCase()} solution with {product.modules.length} modules
                  </p>
                  <div className="product-features-new">
                    <span className="feature-tag">Advanced</span>
                    <span className="feature-tag">Scalable</span>
                    <span className="feature-tag">Secure</span>
                  </div>
                </div>
                <div className="product-arrow-new">
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header-alt">
          <div className="section-badge-alt">
            <Layers size={16} />
            <span>Why Choose Us</span>
          </div>
          <h2>Built for Excellence</h2>
          <p>Experience the difference with our cutting-edge features</p>
          <div className="section-divider-alt"></div>
        </div>
        <div className="features-grid-alt">
          <div className="feature-item-alt">
            <div className="feature-icon-alt">
              <Zap size={24} />
            </div>
            <h3 className="feature-title-alt">Lightning Fast</h3>
            <p className="feature-description-alt">
              Optimized performance for seamless experience
            </p>
          </div>
          <div className="feature-item-alt">
            <div className="feature-icon-alt">
              <ShieldCheck size={24} />
            </div>
            <h3 className="feature-title-alt">Secure & Reliable</h3>
            <p className="feature-description-alt">
              Enterprise-grade security with 99.9% uptime
            </p>
          </div>
          <div className="feature-item-alt">
            <div className="feature-icon-alt">
              <Layers size={24} />
            </div>
            <h3 className="feature-title-alt">Fully Integrated</h3>
            <p className="feature-description-alt">
              All modules work together perfectly
            </p>
          </div>
          <div className="feature-item-alt">
            <div className="feature-icon-alt">
              <TrendingUp size={24} />
            </div>
            <h3 className="feature-title-alt">Scalable Growth</h3>
            <p className="feature-description-alt">
              Grows with your business needs
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="comparison-section">
        <div className="section-header">
          <div className="section-badge">
            <Layers size={16} />
            <span>Compare Plans</span>
          </div>
          <h2>Choose Your Perfect Plan</h2>
          <p>Flexible pricing designed for businesses of all sizes</p>
          <div className="section-divider"></div>
        </div>
        <div className="comparison-container">
          <div className="comparison-grid">
            <div className="comparison-card">
              <div className="plan-header">
                <h3>Starter</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">29</span>
                  <span className="period">/mo</span>
                </div>
                <p className="plan-description">Perfect for small teams getting started</p>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>Up to 10 users</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>Basic features</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>Email support</span>
                </div>
              </div>
              <button className="btn-outline">Start Free Trial</button>
            </div>
            
            <div className="comparison-card featured">
              <div className="popular-badge">Most Popular</div>
              <div className="plan-header">
                <h3>Professional</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">79</span>
                  <span className="period">/mo</span>
                </div>
                <p className="plan-description">Ideal for growing businesses</p>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>Up to 50 users</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>All features</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>Priority support</span>
                </div>
              </div>
              <button className="btn-primary">Start Free Trial</button>
            </div>
            
            <div className="comparison-card">
              <div className="plan-header">
                <h3>Enterprise</h3>
                <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">199</span>
                  <span className="period">/mo</span>
                </div>
                <p className="plan-description">For large organizations</p>
              </div>
              <div className="plan-features">
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>Unlimited users</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>All features</span>
                </div>
                <div className="feature-item">
                  <CheckCircle2 size={14} />
                  <span>24/7 support</span>
                </div>
              </div>
              <button className="btn-outline">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <div className="section-badge">
            <Users size={16} />
            <span>Testimonials</span>
          </div>
          <h2>What Our Clients Say</h2>
          <p>Real stories from real businesses</p>
          <div className="section-divider"></div>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-text">
                "This platform transformed how we manage our entire business. The integration is seamless and the support is incredible."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <div className="author-name">John Davidson</div>
                  <div className="author-role">CEO, TechCorp</div>
                  <div className="author-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-text">
                "The best investment we made for our business. Everything works perfectly together and our efficiency has increased by 40%."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">SM</div>
                <div className="author-info">
                  <div className="author-name">Sarah Martinez</div>
                  <div className="author-role">Operations Manager, Global Inc</div>
                  <div className="author-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="testimonial-text">
                "Finally, a solution that understands our needs. The customization options are endless and the user interface is intuitive."
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">MC</div>
                <div className="author-info">
                  <div className="author-name">Michael Chen</div>
                  <div className="author-role">Founder, StartupHub</div>
                  <div className="author-rating">
                    {[...Array(4)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-header">
            <div className="section-badge">
              <TrendingUp size={16} />
              <span>By the Numbers</span>
            </div>
            <h2>Impressive Results</h2>
            <p>Join thousands of successful businesses</p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Users size={32} />
              </div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Active Users</div>
              <div className="stat-description">Growing daily</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <CheckCircle2 size={32} />
              </div>
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Uptime</div>
              <div className="stat-description">Reliable service</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Headphones size={32} />
              </div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
              <div className="stat-description">Always here</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Zap size={32} />
              </div>
              <div className="stat-number">150+</div>
              <div className="stat-label">Features</div>
              <div className="stat-description">Powerful tools</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="section-header">
          <div className="section-badge">
            <Mail size={16} />
            <span>FAQ</span>
          </div>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about our platform</p>
          <div className="section-divider"></div>
        </div>
        <div className="faq-grid">
          <div className="faq-card">
            <div className="faq-question">
              <h4>How long does setup take?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>Setup typically takes less than 30 minutes. Our guided onboarding process walks you through every step, and our support team is available to help if needed.</p>
            </div>
          </div>
          <div className="faq-card">
            <div className="faq-question">
              <h4>Can I customize the platform?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>Yes! Our platform is highly customizable. You can tailor workflows, create custom fields, design dashboards, and integrate with your existing tools.</p>
            </div>
          </div>
          <div className="faq-card">
            <div className="faq-question">
              <h4>Is my data secure?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>Absolutely. We use bank-level encryption, regular security audits, and comply with all major data protection regulations including GDPR and SOC 2.</p>
            </div>
          </div>
          <div className="faq-card">
            <div className="faq-question">
              <h4>What about customer support?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>We offer 24/7 support via chat, email, and phone. Our response time is under 2 hours, and we have a comprehensive knowledge base and video tutorials.</p>
            </div>
          </div>
          <div className="faq-card">
            <div className="faq-question">
              <h4>Can I integrate with other tools?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>Yes! We integrate with over 100+ popular tools including Slack, Google Workspace, Microsoft 365, QuickBooks, and more. We also offer a robust API for custom integrations.</p>
            </div>
          </div>
          <div className="faq-card">
            <div className="faq-question">
              <h4>Is there a free trial?</h4>
              <span className="faq-icon">+</span>
            </div>
            <div className="faq-answer">
              <p>Yes! We offer a 14-day free trial with full access to all features. No credit card required. You can also start with our free forever plan for small teams.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Podcast/Resources Section */}
      <section className="resources-section">
        <div className="section-header-alt">
          <div className="section-badge-alt">
            <Monitor size={16} />
            <span>Resources</span>
          </div>
          <h2>Learn & Grow</h2>
          <p>Podcasts, guides, and insights for your business</p>
          <div className="section-divider-alt"></div>
        </div>
        <div className="resources-grid">
          <div className="resource-card">
            <div className="resource-image">
              <div className="play-button">▶</div>
            </div>
            <div className="resource-content">
              <div className="resource-type">Podcast</div>
              <h3 className="resource-title">Digital Transformation Success Stories</h3>
              <p className="resource-description">Learn how businesses transformed their operations with our platform</p>
              <div className="resource-meta">
                <span className="duration">45 min</span>
                <span className="date">2 days ago</span>
              </div>
            </div>
          </div>
          <div className="resource-card">
            <div className="resource-image">
              <div className="play-button">▶</div>
            </div>
            <div className="resource-content">
              <div className="resource-type">Podcast</div>
              <h3 className="resource-title">Future of Business Management</h3>
              <p className="resource-description">Industry experts discuss trends and innovations in business software</p>
              <div className="resource-meta">
                <span className="duration">32 min</span>
                <span className="date">1 week ago</span>
              </div>
            </div>
          </div>
          <div className="resource-card">
            <div className="resource-image">
              <div className="play-button">▶</div>
            </div>
            <div className="resource-content">
              <div className="resource-type">Podcast</div>
              <h3 className="resource-title">Scaling Your Business Smartly</h3>
              <p className="resource-description">Tips and strategies for sustainable business growth</p>
              <div className="resource-meta">
                <span className="duration">28 min</span>
                <span className="date">2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <div className="section-badge">
              <Zap size={16} />
              <span>Ready to Start?</span>
            </div>
            <h2>Transform Your Business Today</h2>
            <p>Join thousands of successful businesses using our platform</p>
            <div className="cta-actions">
              <Link to="/get-started" className="btn-primary btn-large">
                Get Started Free
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-secondary btn-large">
                Talk to Sales
                <Users size={16} />
              </Link>
            </div>
            <div className="cta-features">
              <div className="cta-feature">
                <CheckCircle2 size={16} />
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <CheckCircle2 size={16} />
                <span>14-day free trial</span>
              </div>
              <div className="cta-feature">
                <CheckCircle2 size={16} />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

  
   

    </div>
  );
};

export default Home;
