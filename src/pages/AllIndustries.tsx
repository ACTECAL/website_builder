import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { industryCategories } from '../data/industries';
import { Search, ChevronRight, ArrowUpRight, Box, Cpu, Activity, Database, Zap } from 'lucide-react';

// Specialized Component for 3D Tilt Card with Data Overlay
const IndustryCard3D: React.FC<{ industry: any }> = ({ industry }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 15, y: y * -15 });
  };

  return (
    <div
      ref={cardRef}
      className="col-md-6 stagger-item"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      style={{
        perspective: '1000px',
        zIndex: isHovered ? 20 : 1
      }}
    >
      <Link to={`/industries/${industry.slug}`} className="text-decoration-none h-100 d-block group">
        <div
          className="technical-card h-100 p-8 rounded-5 bg-white border border-light shadow-sm transition-all relative overflow-hidden"
          style={{
            transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${isHovered ? 1.05 : 1})`,
            transition: isHovered ? 'none' : 'all 0.5s ease'
          }}
        >
          {/* Data Overlay Background */}
          <div className={`absolute inset-0 bg-dark/95 z-20 p-8 transition-opacity duration-300 flex flex-column justify-content-center ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="text-primary fw-black x-small tracking-widest mb-4 d-flex align-items-center gap-2">
              <Activity size={12} /> LIVE KERNEL METRICS
            </div>
            <div className="space-y-4">
              {[
                { label: 'Active Nodes', value: (Math.random() * 2000 + 500).toFixed(0), icon: <Box size={14} /> },
                { label: 'Throughput', value: (Math.random() * 2 + 0.5).toFixed(1) + ' GB/s', icon: <Zap size={14} /> },
                { label: 'Sync Status', value: '100% Core', icon: <Database size={14} /> }
              ].map((m, i) => (
                <div key={i} className="d-flex justify-content-between align-items-center border-bottom border-white/10 pb-2">
                  <span className="text-white/40 smaller fw-bold d-flex align-items-center gap-2">{m.icon} {m.label}</span>
                  <span className="text-white fw-black x-small">{m.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 d-flex align-items-center gap-2 text-primary fw-black smaller tracking-widest">
              VIEW FULL SPECS <ArrowUpRight size={14} />
            </div>
          </div>

          <div className="d-flex gap-5 relative z-10">
            <div className="flex-shrink-0">
              <div className="icon-frame w-16 h-16 rounded-4 bg-light d-flex align-items-center justify-content-center text-3xl text-secondary group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                <i className={industry.icon}></i>
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h4 className="fw-black text-dark mb-0 fs-5 group-hover:text-primary transition-colors">
                  {industry.name}
                </h4>
                <ArrowUpRight size={18} className="text-primary" />
              </div>
              <p className="text-muted small leading-relaxed opacity-70 mb-4">
                {industry.description}
              </p>
              <div className="d-flex gap-2 flex-wrap">
                {['Actyx v4.2', 'Real-time'].map(tag => (
                  <span key={tag} className="px-2 py-1 rounded bg-light text-muted smaller fw-bold text-uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid-dots"></div>
        </div>
      </Link>
    </div>
  );
};

export const AllIndustries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState<{ [key: string]: number }>({});
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-100px 0px -40% 0px' }
    );

    const sections = document.querySelectorAll('.industry-sector-section');
    sections.forEach((section) => observer.current?.observe(section));

    return () => observer.current?.disconnect();
  }, [searchTerm]);

  // Handle scroll progress calculation for side-nav
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.industry-sector-section');
      const newProgress: { [key: string]: number } = {};
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.min(100, Math.max(0, (windowHeight - rect.top) / (rect.height + windowHeight) * 100));
        newProgress[section.id] = progress;
      });
      setScrollProgress(newProgress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredCategories = industryCategories.map(category => ({
    ...category,
    industries: category.industries.filter(industry =>
      industry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      industry.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.industries.length > 0);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="all-industries-page bg-light/30 overflow-hidden">
      {/* Kernel Data Stream Animation */}
      <div className="fixed-top w-100 h-100 pointer-events-none z-0">
        <div className="data-stream-container absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="data-packet" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}></div>
          ))}
        </div>
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-blob"></div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-32 relative z-10 border-bottom bg-white/50 backdrop-blur-md">
        <div className="container relative z-10">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8 animate-fade-in-up">
              <div className="d-inline-flex align-items-center gap-3 px-4 py-2 border rounded-pill bg-white shadow-sm mb-8 relative">
                <span className="p-1 rounded-circle bg-primary/10 d-flex"><Activity size={14} className="text-primary animate-pulse" /></span>
                <span className="fw-bold small text-uppercase tracking-widest text-muted">Distributed Kernel Active</span>
                <div className="absolute -right-1 -top-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
              </div>
              <h1 className="display-2 fw-black mb-6 text-dark tracking-tight leading-tight">
                Industrial <span className="text-gradient-premium">Intelligence.</span>
              </h1>
              <p className="lead text-secondary-emphasis mb-12 fs-3 fw-normal opacity-75 max-w-2xl mx-auto">
                The world's first operating system designed for the scale of global multi-vertical infrastructure.
              </p>

              <div className="position-relative max-w-xl mx-auto group">
                <div className="glass-search p-1 rounded-pill border bg-white shadow-lg transition-all focus-within:ring-4 focus-within:ring-primary/5">
                  <div className="d-flex align-items-center gap-2 ps-4">
                    <Search className="text-muted" size={20} />
                    <input
                      type="text"
                      placeholder="Find your vertical..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control border-0 bg-transparent py-3 shadow-none fw-medium"
                    />
                    <button className="btn btn-dark rounded-pill px-6 py-2 fw-bold text-uppercase tracking-wider small">
                      FILTER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 relative z-10">
        <div className="container">
          <div className="row g-5">
            {/* Side Navigation with Progress */}
            <div className="col-lg-3 d-none d-lg-block">
              <div className="sticky-sidebar pt-4">
                <div className="mb-10 ps-4">
                  <h6 className="text-uppercase tracking-widest fw-black text-muted small mb-6 opacity-50">Industrial Segments</h6>
                  <div className="d-flex flex-column gap-2">
                    {industryCategories.map(cat => {
                      const id = cat.name.replace(/\s+/g, '-');
                      const progress = scrollProgress[id] || 0;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => scrollToCategory(id)}
                          className={`btn border-0 text-start px-4 py-3 rounded-4 fw-bold transition-all d-flex align-items-center justify-content-between group relative overflow-hidden ${activeCategory === id ? 'bg-white shadow-sm text-primary' : 'text-secondary hover-bg-white/50'}`}
                        >
                          <span className="relative z-10">{cat.name}</span>
                          {/* Progress Bar Background */}
                          <div
                            className="absolute bottom-0 left-0 h-[2px] bg-primary/20 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                          <ChevronRight size={16} className={`relative z-10 transition-transform ${activeCategory === id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="p-8 rounded-5 bg-dark text-white shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10">
                    <Cpu className="text-primary mb-4" size={24} />
                    <h5 className="fw-black mb-3">Custom Instance</h5>
                    <p className="small opacity-60 mb-6">Deploy a private kernel cluster for specialized industrial needs.</p>
                    <Link to="/contact" className="btn btn-primary btn-sm w-100 py-3 rounded-pill fw-bold text-uppercase tracking-widest">REQUEST CONFIG</Link>
                  </div>
                  <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform"><Database size={120} /></div>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="col-lg-9">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <div
                    id={category.name.replace(/\s+/g, '-')}
                    key={category.name}
                    className="industry-sector-section mb-32"
                  >
                    <div className="d-flex align-items-center gap-4 mb-10">
                      <div className="px-4 py-1 rounded-pill bg-dark text-white fw-black text-uppercase tracking-[0.2em] x-small">
                        {category.name}
                      </div>
                      <div className="flex-grow-1 border-bottom border-light"></div>
                    </div>

                    <div className="row g-4">
                      {category.industries.map((industry) => (
                        <IndustryCard3D key={industry.slug} industry={industry} />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-32 bg-white rounded-5 shadow-sm border">
                  <div className="w-24 h-24 rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-6 text-muted"><Search size={48} /></div>
                  <h3 className="fw-black text-dark mb-4">No sectors found.</h3>
                  <p className="text-secondary">Try adjusting your technical search filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Global Reach */}
      <section className="py-24 border-top bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h2 className="display-4 fw-black mb-8">Synchronized at the speed of light.</h2>
              <p className="fs-4 text-secondary mb-10 fw-light">Actyx Kernel uses a peer-to-peer event log to ensure every industrial node is perfectly synced across any vertical.</p>
              <div className="d-flex gap-4">
                <button className="btn btn-primary btn-lg px-10 py-4 fw-black rounded-pill">LEARN ARCHITECTURE</button>
                <button className="btn btn-outline-dark btn-lg px-10 py-4 fw-black rounded-pill">VIEW NODES</button>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="p-10 rounded-[3rem] bg-light relative overflow-hidden group">
                <div className="relative z-10 flex flex-column gap-6">
                  {[
                    { l: 'Network Latency', v: '< 1ms', p: 98 },
                    { l: 'Node Integrity', v: '99.99%', p: 99 },
                    { l: 'Data Replication', v: 'Active', p: 100 }
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="fw-black x-small tracking-widest text-muted uppercase">{s.l}</span>
                        <span className="fw-black x-small text-primary">{s.v}</span>
                      </div>
                      <div className="progress h-1 bg-dark/5 rounded-pill overflow-hidden">
                        <div className="progress-bar bg-primary" style={{ width: `${s.p}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute -bottom-20 -right-20 text-[20rem] opacity-[0.03] group-hover:scale-110 transition-transform"><Activity /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
                .fw-black { font-weight: 950 !important; }
                .text-gradient-premium {
                    background: linear-gradient(135deg, #714B67 0%, #017E84 50%, #4A90E2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .smaller { font-size: 0.65rem; }
                .x-small { font-size: 0.75rem; }
                .tracking-widest { letter-spacing: 0.2em !important; }
                
                .sticky-sidebar {
                    position: sticky;
                    top: 100px;
                    max-height: calc(100vh - 120px);
                }

                .technical-card {
                    transform-style: preserve-3d;
                }

                .grid-dots {
                    background-image: radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px);
                    background-size: 30px 30px;
                }

                /* Data Packet Animation */
                .data-stream-container { position: relative; }
                .data-packet {
                    position: absolute;
                    width: 2px;
                    height: 40px;
                    background: linear-gradient(to bottom, transparent, var(--bs-primary), transparent);
                    top: -40px;
                    animation: data-fall linear infinite;
                }
                @keyframes data-fall {
                    to { transform: translateY(100vh); }
                }

                .animate-blob {
                    position: absolute;
                    animation: blob 10s infinite;
                }
                @keyframes blob {
                    0% { transform: scale(1) translate(0, 0); }
                    33% { transform: scale(1.1) translate(30px, -50px); }
                    66% { transform: scale(0.9) translate(-20px, 20px); }
                    100% { transform: scale(1) translate(0, 0); }
                }

                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) both;
                }
                .stagger-item {
                    opacity: 0;
                    animation: fadeInUp 0.8s cubic-bezier(0.2, 1, 0.3, 1) forwards;
                }
            `}</style>
    </div>
  );
};
