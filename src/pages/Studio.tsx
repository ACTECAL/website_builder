import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Layout, PenTool, FileText, Settings, ShieldCheck, Database, Sliders, Activity, Cpu } from 'lucide-react';
import { AnimatedBackground } from '../components/AnimatedBackground';
import '../styles/Studio.css';

export const Studio: React.FC = () => {
    return (
        <AnimatedBackground variant="neural">
            <main className="studio-page-v2">
                {/* Tactical HUD Header */}
                <div className="studio-hud-top">
                    <div className="hud-line"></div>
                    <div className="hud-content">
                        <div className="hud-item">
                            <Activity size={14} className="hud-icon pulse" />
                            <span>KERNEL STATUS: OPTIMIZED</span>
                        </div>
                        <div className="hud-divider"></div>
                        <div className="hud-item">
                            <Cpu size={14} className="hud-icon" />
                            <span>NODE: NEX-STUDIO-01</span>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="studio-hero-v2">
                    <div className="container">
                        <div className="studio-badge-v2 animate-fade-in">
                            <Sliders size={16} className="studio-badge-icon" />
                            <span className="studio-badge-text">Nexora Studio Mode</span>
                        </div>
                        <h1 className="studio-title-v2 animate-reveal">
                            Build with <span className="text-gradient">Intelligence.</span>
                        </h1>
                        <p className="studio-subtitle-v2 animate-fade-in-up">
                            Nexora Studio provides an advanced no-code abstraction layer to architect custom ERP modules, automate complex workflows, and design bespoke interfaces with architectural precision.
                        </p>
                        <div className="studio-cta-group-v2 animate-fade-in-up">
                            <Link to="/contact-sales" className="btn-studio-premium">
                                Launch Studio <ChevronRight size={18} />
                            </Link>
                            <Link to="/contact-sales" className="btn-studio-ghost">
                                Technical Overview
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Feature Mockup / Interactive UI Section */}
                <div className="studio-mockup-section animate-reveal-slow">
                    <div className="studio-mockup-frame">
                        <div className="mockup-header">
                            <div className="mockup-dots"><span/><span/><span/></div>
                            <div className="mockup-address">nexus://studio.nexora.ai/architect</div>
                        </div>
                        <div className="studio-mockup-inner">
                            <img
                                src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop"
                                alt="Nexora Studio Interface"
                                className="studio-mockup-img-v2"
                            />
                            <div className="mockup-overlay-hud">
                                <div className="hud-tag">ID: 0x4F2A</div>
                                <div className="hud-tag">READY</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Core Features Grid */}
                <section className="studio-features-v2">
                    <div className="container">
                        <div className="studio-features-grid-v2">
                            <FeatureBlockV2
                                icon={<Layout size={28} />}
                                title="Architectural Modularity"
                                description="Construct complex application logic using pre-validated architectural blocks. Zero-latency deployment to production environments."
                            />
                            <FeatureBlockV2
                                icon={<PenTool size={28} />}
                                title="Interface Abstraction"
                                description="Design high-fidelity user interfaces with a visual editor. Customize every pixel without compromising underlying data integrity."
                            />
                            <FeatureBlockV2
                                icon={<FileText size={28} />}
                                title="Document Synthesis"
                                description="Synthesize dynamic reports and legal documents with a visual engine. Real-time preview with support for complex data bindings."
                            />
                            <FeatureBlockV2
                                icon={<Settings size={28} />}
                                title="Workflow Orchestration"
                                description="Orchestrate cross-module automations with conditional logic and recursive triggers. Eliminate redundant operational overhead."
                            />
                            <FeatureBlockV2
                                icon={<ShieldCheck size={28} />}
                                title="Governance Layers"
                                description="Implement multi-stage approval protocols and role-based access control with visual policy mapping."
                            />
                            <FeatureBlockV2
                                icon={<Database size={28} />}
                                title="Data Matrix Scaling"
                                description="Extend the core data schema with custom entities and relationships. Automatically managed indexing for planetary-scale performance."
                            />
                        </div>
                    </div>
                </section>

                {/* Technical Specifications */}
                <section className="studio-spec-section">
                    <div className="container">
                        <div className="spec-grid">
                            <div className="spec-item">
                                <div className="spec-label">Latency</div>
                                <div className="spec-value">~12ms</div>
                            </div>
                            <div className="spec-item">
                                <div className="spec-label">Abstraction</div>
                                <div className="spec-value">Level 4</div>
                            </div>
                            <div className="spec-item">
                                <div className="spec-label">Security</div>
                                <div className="spec-value">Zero Trust</div>
                            </div>
                            <div className="spec-item">
                                <div className="spec-label">Availability</div>
                                <div className="spec-value">99.999%</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="studio-footer-cta">
                    <div className="container">
                        <div className="glass-banner">
                            <h2 className="banner-title">Evolve your infrastructure.</h2>
                            <p className="banner-desc">Join lead organizations building the future on Nexora Studio.</p>
                            <Link to="/contact-sales" className="btn-banner">
                                Initialize Free Instance <ChevronRight size={20} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </AnimatedBackground>
    );
};

const FeatureBlockV2 = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="feature-card-v2 glass-morphism-premium">
        <div className="feature-icon-v2">
            {icon}
        </div>
        <h3 className="feature-title-v2">{title}</h3>
        <p className="feature-description-v2">{description}</p>
        <div className="feature-corner-accent"></div>
    </div>
);
