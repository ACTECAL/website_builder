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
  Box
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
          <div className="hero-visual">
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
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-header">
          <div className="section-badge">
            <Zap size={16} />
            <span>Our Products</span>
          </div>
          <h2>Choose Your Solution</h2>
          <p>Powerful modules designed for every business need</p>
          <div className="section-divider"></div>
        </div>
        <div className="products-grid">
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
                className="product-card"
                onMouseEnter={() => setHoveredProduct(product.name)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  '--icon-color': getProductIconColor(product.name)
                } as React.CSSProperties}
              >
                <div className="card-icon">
                  {getProductIcon(product.name)}
                </div>
                <h3 className="card-title">{product.name}</h3>
                <p className="card-description">
                  {product.modules.length} powerful modules
                </p>
                <div className="card-arrow">
                  <ArrowRight size={16} />
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

    </div>
  );
};

export default Home;
