import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { industryCategories, Industry } from '../data/industries';
import { CheckCircle2, Zap, Activity, Layers, Database, Lock, Cpu, Box, Globe } from 'lucide-react';
import '../styles/Industry.css';

interface IndustryTemplateProps {
  industry: Industry;
  isVisible: boolean;
}

export const IndustryTemplate: React.FC<IndustryTemplateProps> = ({ industry, isVisible }) => {
  const [activeTab, setActiveTab] = useState<'capabilities' | 'architecture' | 'integration'>('capabilities');
  const category = industryCategories.find(c => c.industries.some(i => i.slug === industry.slug));

  const categoryColorMap: Record<string, string> = {
    'Retail': '#017e84',
    'Food & Hospitality': '#4d6c8b',
    'Real Estate': '#e85a4f',
    'Consulting': '#75628b',
    'Manufacturing': '#65738f',
    'Health & Fitness': '#eb6b45',
    'Trades': '#e66244',
    'Others': '#8b566b'
  };

  const primaryColor = category ? (categoryColorMap[category.name] || '#6366f1') : '#6366f1';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [industry.slug]);

  return (
    <div className="industry-template-page bg-light/30 overflow-hidden">
      {/* Kernel Live Feed Background */}
      <div className="fixed-top w-100 h-100 pointer-events-none z-0 overflow-hidden">
        <div className="data-stream-container absolute inset-0 opacity-10">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="data-packet" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              background: `linear-gradient(to bottom, transparent, ${primaryColor}, transparent)`
            }}></div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 z-10 bg-white border-bottom">
        <div className="container relative z-10">
          <nav className="mb-12 animate-fade-in-up">
            <Link to="/industries" className="text-decoration-none d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill bg-light text-muted hover-primary transition-all fw-bold small text-uppercase tracking-widest border">
              <i className="fa-solid fa-arrow-left"></i> All Industries
            </Link>
          </nav>

          <div className="row align-items-center g-5">
            <div className="col-lg-7 animate-fade-in-up">
              <div className="d-inline-flex align-items-center gap-3 px-4 py-2 border rounded-pill bg-white shadow-sm mb-6 relative">
                <Activity size={16} className="text-primary animate-pulse" />
                <span className="fw-bold small text-uppercase tracking-widest text-muted">Distributed Kernel Active</span>
                <div className="absolute -right-1 -top-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
              </div>
              <h1 className="display-2 fw-black mb-8 text-dark tracking-tight leading-tight">
                {industry.name} <span style={{ color: primaryColor }}>Infrastructure.</span>
              </h1>
              <p className="lead text-secondary-emphasis mb-10 fs-4 fw-normal leading-relaxed opacity-75 max-w-2xl">
                {industry.longDescription}
              </p>

              {/* Core Stats Bar */}
              <div className="row g-4 mb-12 py-8 px-4 bg-light/50 backdrop-blur-md rounded-5 border shadow-sm">
                {[
                  { label: 'Uptime', value: '99.99%', icon: <Lock size={18} /> },
                  { label: 'Latency', value: '< 2ms', icon: <Zap size={18} /> },
                  { label: 'Sync Rate', value: 'Instant', icon: <Globe size={18} /> }
                ].map((stat, i) => (
                  <div key={i} className="col-4 border-end last-border-none">
                    <div className="text-muted x-small fw-black text-uppercase tracking-widest mb-1 d-flex align-items-center gap-2">
                      {stat.icon} {stat.label}
                    </div>
                    <div className="h4 fw-black text-dark mb-0">{stat.value}</div>
                  </div>
                ))}
              </div>

              <div className="d-flex flex-wrap gap-4">
                <Link to="/get-started" className="btn btn-primary px-10 py-4 fw-bold rounded-pill shadow-xl hover-scale transition-all" style={{ background: primaryColor, borderColor: primaryColor }}>
                  DEPLOY INSTANCE
                </Link>
                <Link to="/contact" className="btn btn-outline-dark px-10 py-4 fw-bold rounded-pill transition-all">
                  VIEW DOCUMENTATION
                </Link>
              </div>
            </div>

            <div className="col-lg-5 animate-fade-in-right">
              <div className="position-relative">
                <div className="rounded-5 overflow-hidden shadow-3xl border-8 border-white group">
                  <img
                    src={industry.imageUrl}
                    alt={industry.name}
                    className="img-fluid w-100 object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ height: '550px' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                {/* Floating Metrics Card */}
                <div className="position-absolute -bottom-10 -left-10 p-6 glass-morphism rounded-5 shadow-2xl border max-w-xs animate-float">
                  <div className="d-flex align-items-center gap-4">
                    <div className="w-14 h-14 rounded-4 bg-primary text-white d-flex align-items-center justify-content-center shadow-lg" style={{ background: primaryColor }}>
                      <Layers size={24} />
                    </div>
                    <div>
                      <div className="fw-black text-dark mb-1">Grid Nodes</div>
                      <div className="text-primary fw-bold fs-3" style={{ color: primaryColor }}>3.2k</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Deep-Dive Section */}
      <section className="py-24 relative z-10 bg-light/50">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="display-4 fw-black mb-4">Technical Architecture</h2>
            <p className="fs-5 text-secondary max-w-2xl mx-auto opacity-75">
              Explore the underlying kernel specifications optimized for the {industry.name} vertical.
            </p>
          </div>

          {/* Deep-Dive Tabs */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="d-flex justify-content-center gap-2 p-2 bg-white rounded-pill border shadow-sm">
              {[
                { id: 'capabilities', label: 'Capabilities', icon: <Cpu size={18} /> },
                { id: 'architecture', label: 'Architecture', icon: <Layers size={18} /> },
                { id: 'integration', label: 'Integration', icon: <Database size={18} /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`btn rounded-pill px-8 py-3 fw-bold d-flex align-items-center gap-2 transition-all ${activeTab === tab.id ? 'btn-dark shadow-md' : 'text-muted hover:bg-light'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="bg-white p-12 rounded-[3rem] border shadow-soft animate-fade-in">
                {activeTab === 'capabilities' && (
                  <div className="row g-5">
                    <div className="col-md-6">
                      <h3 className="fw-black mb-6">Vertical Capacities</h3>
                      <div className="space-y-6">
                        {industry.keyFeatures.map((f, i) => (
                          <div key={i} className="d-flex align-items-center gap-4 group">
                            <div className="w-10 h-10 rounded-circle bg-primary/10 text-primary d-flex align-items-center justify-content-center group-hover:bg-primary group-hover:text-white transition-all" style={{ color: primaryColor }}>
                              <CheckCircle2 size={18} />
                            </div>
                            <span className="fw-bold text-dark fs-5">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="p-8 bg-light rounded-4 h-100 d-flex flex-column justify-content-center">
                        <div className="fw-black text-muted x-small tracking-widest mb-4">ENGINEERING NOTE</div>
                        <p className="fs-5 leading-relaxed italic opacity-70 mb-0">
                          "The {industry.name} kernel instance is pre-configured with industry-standard protocols, guaranteeing zero-configuration setup for immediate deployment."
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'architecture' && (
                  <div className="row g-5 align-items-center">
                    <div className="col-md-6">
                      <h3 className="fw-black mb-6">Kernel Blueprint</h3>
                      <p className="fs-5 text-secondary opacity-75 mb-8">
                        Our distributed ledger technology ensures that every transaction is verified across multiple nodes in real-time.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 border rounded-4 bg-light/50">
                          <div className="fw-black mb-1">State Sync</div>
                          <div className="x-small text-muted">Delta-based replication</div>
                        </div>
                        <div className="p-6 border rounded-4 bg-light/50">
                          <div className="fw-black mb-1">Auth Layer</div>
                          <div className="x-small text-muted">mTLS & Zero-Trust</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 text-center">
                      <div className="relative inline-block">
                        <div className="w-64 h-64 rounded-full border-[10px] border-primary/20 d-flex align-items-center justify-content-center animate-spin-slow" style={{ borderColor: `${primaryColor}20` }}>
                          <Box size={80} className="text-primary" style={{ color: primaryColor }} />
                        </div>
                        <div className="absolute top-0 right-0 p-4 bg-white rounded-4 border shadow-md animate-bounce">
                          <Zap size={24} className="text-warning" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'integration' && (
                  <div className="row g-5">
                    <div className="col-md-12">
                      <h3 className="fw-black mb-8">Ecosystem Connectors</h3>
                      <div className="row g-4">
                        {industry.relatedApps.map((app, i) => (
                          <div key={i} className="col-md-4">
                            <div className="p-6 border rounded-4 bg-light hover-bg-white hover-shadow-md transition-all group">
                              <div className="d-flex align-items-center justify-content-between mb-4">
                                <Database size={20} className="text-muted group-hover:text-primary transition-colors" />
                                <span className="x-small fw-black text-success">API READY</span>
                              </div>
                              <h5 className="fw-black mb-1 text-capitalize">{app.replace(/-/g, ' ')}</h5>
                              <div className="smaller text-muted">Native Core v4.1</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Banner */}
      <section className="py-32">
        <div className="container text-center">
          <div className="bg-dark rounded-[4rem] p-16 text-white relative overflow-hidden shadow-3xl">
            <div className="relative z-10 animate-fade-in-up">
              <h2 className="display-3 fw-black mb-8">Ready to deploy?</h2>
              <p className="fs-3 text-white/50 mb-12 max-w-2xl mx-auto fw-light">
                Join 50k+ companies operating on the Actyx distributed kernel.
              </p>
              <div className="d-flex justify-content-center flex-wrap gap-4">
                <Link to="/get-started" className="btn btn-primary px-12 py-4 fw-black rounded-pill shadow-xl hover-scale transition-all" style={{ background: primaryColor, borderColor: primaryColor }}>
                  START INSTANCE
                </Link>
                <Link to="/contact" className="btn btn-outline-light px-12 py-4 fw-bold rounded-pill transition-all">
                  TALK TO R&D
                </Link>
              </div>
            </div>
            <div className="absolute inset-0 opacity-10 pointer-events-none grid-dots-white"></div>
          </div>
        </div>
      </section>

      <style>{`
        .fw-black { font-weight: 950 !important; }
        .x-small { font-size: 0.7rem; }
        .smaller { font-size: 0.6rem; }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        .shadow-soft { box-shadow: 0 4px 20px -5px rgba(0,0,0,0.05); }
        .shadow-3xl { box-shadow: 0 32px 100px -20px rgba(0,0,0,0.3); }

        .last-border-none:last-child { border-right: none !important; }
        
        .grid-dots-white {
          background-image: radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .data-packet {
          position: absolute;
          width: 2px;
          height: 60px;
          top: -60px;
          animation: data-fall linear infinite;
        }
        @keyframes data-fall {
          to { transform: translateY(100vh); }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-in-right {
          animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-fade-in { animation: fadeIn 0.5s ease both; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
