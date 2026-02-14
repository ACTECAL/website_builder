import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { industryCategories } from '../data/industries';
import { Search, ChevronRight, Sparkles, Globe, Filter, X } from 'lucide-react';

export const AllIndustries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCategories = industryCategories.map(category => ({
    ...category,
    industries: category.industries.filter(industry =>
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.industries.length > 0);

  return (
    <div className="all-industries-page bg-white overflow-hidden">
      {/* Background blobs */}
      <div className="fixed-top w-100 h-100 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute top-1/2 right-0 w-1/4 h-1/4 bg-info/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="py-24 md:py-36 relative z-10 border-bottom bg-light/50 backdrop-blur-sm">
        <div className="container text-center">
          <div className="animate-fade-in-up">
            <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill bg-white shadow-sm border mb-6">
              <Sparkles className="text-warning" size={16} />
              <span className="fw-bold small text-uppercase tracking-widest text-muted">Universal Solutions</span>
            </div>
            <h1 className="display-1 fw-black mb-6 text-dark tracking-tighter leading-tight">
              One Framework. <span className="text-gradient">Every Industry.</span>
            </h1>
            <p className="lead text-secondary mb-12 fs-3 fw-normal max-w-3xl mx-auto opacity-90">
              Actyx is the unified operating system for modern business, tailored for the unique challenges of your sector.
            </p>

            <div className="position-relative max-w-2xl mx-auto group perspective-wide">
              <div className="position-absolute start-0 top-50 translate-middle-y ps-5 text-muted group-focus-within:text-primary transition-all">
                <Search size={26} />
              </div>
              <input
                type="text"
                placeholder="Search sectors, workflows, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control form-control-lg ps-14 py-5 rounded-5 shadow-2xl border-0 focus-primary-glow transition-all bg-white"
                style={{ fontSize: '1.25rem' }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="position-absolute end-0 top-50 translate-middle-y me-5 btn btn-link p-2 text-muted hover-text-danger transition-colors border-0"
                >
                  <X size={24} />
                </button>
              )}
            </div>

            <div className="mt-8 d-flex justify-content-center gap-3 flex-wrap animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {['Retail', 'Manufacturing', 'Finance', 'Logistics', 'Healthcare'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="btn btn-white border-white/50 shadow-sm rounded-pill px-5 py-2 fw-bold small text-muted hover-bg-primary hover-text-white transition-all transform hover:-translate-y-1"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-24 relative z-10">
        <div className="container">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, catIdx) => (
              <div key={category.name} className="mb-24 animate-fade-in-up" style={{ animationDelay: `${catIdx * 0.1}s` }}>
                <div className="d-flex align-items-center gap-5 mb-12">
                  <div className="px-5 py-2 rounded-4 bg-dark text-white fw-black text-uppercase tracking-widest small shadow-lg">
                    {category.name}
                  </div>
                  <div className="flex-grow-1 h-px bg-gradient-to-r from-dark/20 to-transparent"></div>
                  <div className="text-muted small fw-bold">{category.industries.length} Solutions</div>
                </div>

                <div className="row g-5">
                  {category.industries.map((industry, indIdx) => (
                    <div key={industry.slug} className="col-md-6 col-lg-4">
                      <Link
                        to={`/industries/${industry.slug}`}
                        className="text-decoration-none group h-100 d-block"
                      >
                        <div className="card h-100 border-0 p-8 transition-all hover-premium rounded-5 bg-white shadow-soft overflow-hidden relative">
                          <div className="d-flex justify-content-between align-items-start mb-8 relative z-10">
                            <div className="w-16 h-16 rounded-4 bg-light text-muted d-flex align-items-center justify-content-center text-3xl group-hover:bg-primary group-hover:text-white transition-all shadow-inner-sm">
                              <i className={industry.icon}></i>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-light d-flex align-items-center justify-content-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                              <ChevronRight className="text-primary" size={20} />
                            </div>
                          </div>
                          <div className="relative z-10">
                            <h4 className="fw-black text-dark mb-4 fs-4 group-hover:text-primary transition-colors">
                              {industry.name}
                            </h4>
                            <p className="text-secondary mb-0 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                              {industry.description}
                            </p>
                          </div>

                          {/* Animated background decoration */}
                          <div className="position-absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-all transform scale-50 group-hover:scale-110"></div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 animate-fade-in-up">
              <div className="w-32 h-32 rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-8 shadow-inner text-muted opacity-50">
                <Search size={64} />
              </div>
              <h2 className="fw-black text-dark mb-4">No sectors found.</h2>
              <p className="text-secondary fs-5 mb-10">We couldn't find any industries matching "{searchTerm}".</p>
              <button
                className="btn btn-primary btn-lg px-8 py-3 rounded-pill fw-black shadow-lg hover-scale transition-all"
                onClick={() => setSearchTerm('')}
              >
                Show All Sectors
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Global Reach CTA */}
      <section className="py-24">
        <div className="container">
          <div className="bg-primary rounded-6 p-12 md:p-24 text-center text-white relative overflow-hidden shadow-3xl">
            <div className="relative z-10 animate-fade-in-up">
              <h2 className="display-4 fw-black mb-8">Deploying globally in minutes.</h2>
              <p className="fs-4 text-white/80 mb-12 max-w-3xl mx-auto">
                Join a worldwide network of high-performance businesses running on the Actyx kernel.
              </p>
              <div className="flex-center flex-wrap gap-4">
                <button className="btn btn-white btn-lg px-10 py-4 fw-black rounded-pill shadow-xl text-primary hover-scale transition-all d-flex align-items-center gap-3">
                  <Globe size={20} /> JOIN THE NETWORK
                </button>
                <Link to="/contact" className="btn btn-outline-light btn-lg px-10 py-4 fw-bold rounded-pill hover-bg-white hover-text-primary transition-all">
                  CONSULTATION
                </Link>
              </div>
            </div>

            {/* Background elements */}
            <div className="position-absolute top-1/2 left-1/2 -translate-middle w-100 h-100 opacity-10 pointer-events-none scale-150 animate-pulse-slow">
              <Globe size={1000} />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .fw-black { font-weight: 900 !important; }
        .text-gradient {
          background: linear-gradient(135deg, #714B67 0%, #017E84 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .rounded-6 { border-radius: 4rem; }
        .focus-primary-glow:focus {
          border: none !important;
          box-shadow: 0 20px 60px -10px rgba(var(--bs-primary-rgb), 0.3) !important;
          outline: none;
        }
        .shadow-soft {
          box-shadow: 0 10px 40px -15px rgba(0,0,0,0.05);
        }
        .hover-premium:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 40px 80px -20px rgba(113, 75, 103, 0.15);
          background-color: #fff !important;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-pulse-slow {
          animation: pulse 12s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
        }
        .shadow-3xl {
          box-shadow: 0 40px 100px -20px rgba(1, 126, 132, 0.4);
        }
        .leading-relaxed { line-height: 1.6; }
        .ps-14 { padding-left: 4.5rem !important; }
        .perspective-wide { perspective: 1000px; }
      `}</style>
    </div>
  );
};
