import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { industryCategories } from '../data/industries';
import { CheckCircle2, ArrowRight, Star, Play, Sparkles, Zap, Shield, Globe } from 'lucide-react';

export const IndustryDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // Find the industry across all categories
    const industry = industryCategories
        .flatMap(cat => cat.industries)
        .find(ind => ind.slug === slug);

    if (!industry) {
        return <Navigate to="/industries" replace />;
    }

    return (
        <div className="industry-detail-page bg-white overflow-hidden">
            {/* Dynamic Background Element */}
            <div className="fixed-top w-100 h-100 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse-slow"></div>
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-info/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-24 md:py-40 z-10">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-7">
                            <nav className="mb-10 animate-fade-in-up">
                                <Link to="/industries" className="text-muted text-decoration-none d-inline-flex align-items-center gap-3 py-2 px-4 rounded-pill bg-light hover-primary transition-all shadow-sm">
                                    <i className="fa-solid fa-arrow-left small"></i>
                                    <span className="fw-bold small text-uppercase tracking-wider">Industries</span>
                                </Link>
                            </nav>

                            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-primary/10 text-primary fw-bold small text-uppercase tracking-widest mb-6">
                                    <Sparkles size={14} />
                                    <span>Actyx for {industry.name}</span>
                                </div>
                                <h1 className="display-2 fw-black mb-8 text-dark tracking-tighter leading-tight">
                                    The OS for {industry.name.split(' ')[0]} <span className="text-gradient">Excellence.</span>
                                </h1>
                                <p className="lead text-secondary-emphasis mb-10 fs-4 fw-normal leading-relaxed opacity-90 max-w-2xl">
                                    {industry.longDescription}
                                </p>

                                <div className="d-flex flex-wrap gap-4 align-items-center mb-12">
                                    <Link to="/get-started" className="btn btn-primary btn-lg px-10 py-4 fw-black rounded-4 shadow-xl hover-scale transition-all d-flex align-items-center gap-3">
                                        Deploy Now <ArrowRight size={20} />
                                    </Link>
                                    <Link to="/contact" className="btn btn-outline-dark btn-lg px-8 py-4 fw-bold rounded-4 hover-lift transition-all">
                                        Talk to an Expert
                                    </Link>
                                </div>

                                <div className="row g-4 pt-4 border-top">
                                    <div className="col-auto">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="w-10 h-10 rounded-circle bg-success/10 text-success d-flex align-items-center justify-content-center">
                                                <Shield size={18} />
                                            </div>
                                            <span className="small fw-bold text-muted text-uppercase tracking-wider">Enterprise Grade</span>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="w-10 h-10 rounded-circle bg-info/10 text-info d-flex align-items-center justify-content-center">
                                                <Globe size={18} />
                                            </div>
                                            <span className="small fw-bold text-muted text-uppercase tracking-wider">Global Compliance</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5 animate-fade-in-right">
                            <div className="position-relative perspective-wide">
                                <div className="floating-card rounded-5 overflow-hidden shadow-3xl border-0">
                                    <div className="position-relative">
                                        <img
                                            src={industry.imageUrl || `https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000`}
                                            alt={industry.name}
                                            className="img-fluid w-100 object-cover"
                                            style={{ height: '600px' }}
                                        />
                                        <div className="bg-overlay-gradient"></div>
                                        <div className="position-absolute bottom-0 start-0 w-100 p-8 text-white z-10">
                                            <div className="glass-morphism-dark p-6 rounded-4 border-white/10">
                                                <div className="d-flex align-items-center gap-3 mb-3">
                                                    <div className="w-12 h-12 rounded-3 bg-primary d-flex align-items-center justify-content-center text-2xl shadow-lg">
                                                        <i className={industry.icon}></i>
                                                    </div>
                                                    <div>
                                                        <h4 className="fw-black mb-0">{industry.name}</h4>
                                                        <p className="small mb-0 opacity-75">Cloud Infrastructure v4.2</p>
                                                    </div>
                                                </div>
                                                <div className="progress h-1 bg-white/20 rounded-pill mb-4">
                                                    <div className="progress-bar bg-primary w-75 rounded-pill"></div>
                                                </div>
                                                <div className="d-flex justify-content-between small fw-bold">
                                                    <span>Efficiency Optimized</span>
                                                    <span className="text-primary">98.4%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="position-absolute -top-10 -right-10 w-24 h-24 glass-morphism rounded-4 d-flex flex-column align-items-center justify-content-center shadow-xl animate-float" style={{ animationDelay: '1s' }}>
                                    <Zap className="text-warning mb-1" size={32} />
                                    <span className="small fw-black">FAST</span>
                                </div>
                                <div className="position-absolute -bottom-6 -left-10 px-6 py-4 glass-morphism rounded-4 shadow-xl animate-float-slow">
                                    <div className="d-flex align-items-center gap-3">
                                        <div className="avatar-group d-flex">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-circle border-2 border-white bg-secondary overflow-hidden -ms-2">
                                                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-100 h-100" />
                                                </div>
                                            ))}
                                        </div>
                                        <span className="small fw-bold">Joined by 2k+ firms</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-dark text-white relative">
                <div className="container relative z-10">
                    <div className="text-center mb-20 animate-fade-in-up">
                        <h2 className="display-4 fw-black mb-6">Precision Engineering.</h2>
                        <p className="text-white-50 fs-4 max-w-3xl mx-auto">
                            Our {industry.name.toLowerCase()} suite is built on a decade of research into industry-specific bottlenecks.
                        </p>
                    </div>

                    <div className="row g-5">
                        {industry.keyFeatures.map((feature, idx) => (
                            <div key={idx} className="col-md-6 col-lg-3 animate-fade-in-up" style={{ animationDelay: `${0.1 * idx}s` }}>
                                <div className="card h-100 bg-white/5 border-white/10 p-8 rounded-5 hover-bg-primary transition-all group overflow-hidden relative">
                                    <div className="w-16 h-16 rounded-4 bg-primary/20 text-primary d-flex align-items-center justify-content-center mb-8 fs-2 group-hover:bg-white group-hover:text-primary transition-all">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="fw-black mb-4 group-hover:text-white transition-all">{feature}</h3>
                                    <p className="text-white-50 mb-0 group-hover:text-white/80 transition-all leading-relaxed">
                                        Automated workflows designed for next-generation {industry.name.toLowerCase()} standards.
                                    </p>
                                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            {industry.testimonial && (
                <section className="py-32 relative overflow-hidden">
                    <div className="container relative z-10">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <div className="glass-morphism p-12 md:p-24 rounded-5 shadow-3xl text-center relative animate-fade-in-up">
                                    <Star className="text-warning mb-10 mx-auto" size={64} fill="currentColor" />
                                    <blockquote className="display-4 fw-bold mb-12 text-dark leading-tight tracking-tight italic">
                                        "{industry.testimonial.quote}"
                                    </blockquote>
                                    <div className="d-flex align-items-center justify-content-center gap-5">
                                        <div className="w-24 h-24 rounded-circle border-4 border-primary p-1">
                                            <div className="w-100 h-100 rounded-circle bg-gradient-to-tr from-primary to-info d-flex align-items-center justify-content-center fw-black text-4xl text-white">
                                                {industry.testimonial.author[0]}
                                            </div>
                                        </div>
                                        <div className="text-start">
                                            <div className="fw-black fs-3 text-dark mb-1">{industry.testimonial.author}</div>
                                            <div className="text-primary fw-bold text-uppercase tracking-widest">{industry.testimonial.company}</div>
                                        </div>
                                    </div>

                                    {/* Floating particles background inside card */}
                                    <div className="position-absolute top-10 right-10 opacity-20"><Sparkles size={100} /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* App Ecosystem */}
            <section className="py-24 bg-light">
                <div className="container">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <div className="badge bg-dark px-3 py-1 rounded-pill mb-4 fw-bold text-uppercase tracking-widest">Ecosystem</div>
                        <h2 className="display-5 fw-black mb-4 text-dark">Proprietary Modules</h2>
                        <p className="text-secondary fs-5 max-w-2xl mx-auto">Selected high-performance integrations for {industry.name.toLowerCase()}.</p>
                    </div>

                    <div className="row g-4 mb-20">
                        {industry.relatedApps.map((appSlug, idx) => (
                            <div key={idx} className="col-md-6 col-lg-3 animate-fade-in-up" style={{ animationDelay: `${0.05 * idx}s` }}>
                                <Link to={`/apps/${appSlug}`} className="text-decoration-none group">
                                    <div className="card h-100 border-0 p-8 hover-shadow-xl transition-all rounded-5 bg-white overflow-hidden relative">
                                        <div className="w-20 h-20 rounded-4 bg-light group-hover:bg-primary/5 d-flex align-items-center justify-content-center text-4xl mb-6 transition-all group-hover:scale-110">
                                            <i className="fa-solid fa-layer-group text-primary"></i>
                                        </div>
                                        <h5 className="fw-black text-dark mb-3 text-capitalize fs-4">{appSlug.replace(/-/g, ' ')}</h5>
                                        <p className="text-secondary small mb-6">Tier-1 integration with core datasets.</p>
                                        <div className="d-flex align-items-center gap-2 text-primary fw-bold small opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                            EXPLORE <ArrowRight size={16} />
                                        </div>
                                        <div className="position-absolute -top-4 -right-4 w-12 h-12 bg-primary/10 rounded-circle blur-lg"></div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/apps" className="btn btn-outline-primary btn-lg px-10 py-3 fw-black rounded-pill hover-scale transition-all d-inline-flex align-items-center gap-3">
                            Explore All 200+ Apps <Globe size={20} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final Conversion Section */}
            <section className="py-24 relative">
                <div className="container">
                    <div className="bg-dark rounded-6 p-12 md:p-32 text-center text-white relative overflow-hidden shadow-3xl">
                        <div className="relative z-10 animate-fade-in-up">
                            <h2 className="display-2 fw-black mb-8 leading-tight">Future-proof your <br />{industry.name.toLowerCase()} today.</h2>
                            <p className="fs-3 text-white-50 mb-16 max-w-3xl mx-auto fw-light">
                                Secure the competitive advantage in the new digital economy with cloud-native infrastructure.
                            </p>
                            <div className="d-flex flex-wrap justify-content-center gap-5">
                                <Link to="/get-started" className="btn btn-primary btn-pill-wide px-14 py-5 fw-black shadow-2xl hover-scale transition-all d-flex align-items-center gap-4">
                                    START FREE TRIAL <Zap size={24} fill="currentColor" />
                                </Link>
                                <Link to="/contact" className="btn btn-glass px-10 py-5 fw-black rounded-pill border-white/20 transition-all">
                                    DEMO CONSOLE
                                </Link>
                            </div>
                        </div>

                        {/* Visual background details */}
                        <div className="position-absolute bottom-0 left-0 w-100 h-64 bg-gradient-to-t from-primary/20 to-transparent"></div>
                        <div className="position-absolute top-1/2 left-1/2 -translate-middle w-100 h-100 opacity-20 pointer-events-none">
                            <div className="grid-pattern-dark w-100 h-100"></div>
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
        .perspective-wide { perspective: 2000px; }
        .floating-card {
          transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
          transform: rotateX(5deg) rotateY(-10deg) rotateZ(2deg);
        }
        .floating-card:hover {
          transform: rotateX(0) rotateY(0) rotateZ(0) scale(1.02);
        }
        .bg-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 60%);
          z-index: 5;
        }
        .glass-morphism {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .glass-morphism-dark {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .rounded-6 { rounded-radius: 4rem; }
        .btn-pill-wide { border-radius: 100px; }
        .btn-glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          color: white;
        }
        .btn-glass:hover {
          background: rgba(255, 255, 255, 0.15);
          color: white;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float 10s ease-in-out infinite;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-pulse-slow {
          animation: pulse 12s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.2); }
        }
        .shadow-3xl {
          box-shadow: 0 40px 100px -20px rgba(0,0,0,0.4);
        }
        .hover-shadow-xl:hover {
          box-shadow: 0 30px 60px -12px rgba(0,0,0,0.12);
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .animate-fade-in-right {
          animation: fadeInRight 1s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .grid-pattern-dark {
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
        </div>
    );
};
