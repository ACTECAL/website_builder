import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ChevronRight, Layout, PenTool, FileText, Settings, ShieldCheck, Database, Sliders } from 'lucide-react';
import '../styles/Studio.css';

export const Studio: React.FC = () => {
    return (
        <main className="studio-page">
            {/* Hero Section */}
            <div className="studio-hero">
                <div className="studio-hero-content">
                    <div className="studio-badge">
                        <Sliders size={16} className="studio-badge-icon" />
                        <span className="studio-badge-text">Odoo Studio</span>
                    </div>
                    <h1 className="studio-title">
                        Build it. <span className="studio-title-accent">Don't code it.</span>
                    </h1>
                    <p className="studio-subtitle">
                        Odoo Studio gives you the tools to create new fields, customize views, and streamline workflows – all without writing a single line of code.
                    </p>
                    <div className="studio-cta-group">
                        <Link to="/contact-sales" className="btn-studio-primary">
                            Start now - It's free <ChevronRight size={18} style={{ marginLeft: 8 }} />
                        </Link>
                        <Link to="/contact-sales" className="btn-studio-secondary">
                            Meet an advisor
                        </Link>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="studio-hero-glow-1" />
                <div className="studio-hero-glow-2" />
            </div>

            {/* Feature Image / App Builder Mockup */}
            <div className="studio-mockup-wrapper">
                <div className="studio-mockup-container">
                    <img
                        src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2070&auto=format&fit=crop"
                        alt="App Builder Interface"
                        className="studio-mockup-img"
                    />
                </div>
            </div>

            {/* Core Features Grid */}
            <div className="studio-features-container">
                <div className="studio-features-grid">
                    <FeatureBlock
                        icon={<Layout size={32} color="#8b5cf6" />}
                        title="Your new app, not from scratch"
                        description="Create your app in no time. Just choose which features you need and Odoo does the rest!"
                    />
                    <FeatureBlock
                        icon={<PenTool size={32} color="#ec4899" />}
                        title="No more one-size-fits-all"
                        description="Add fields with a simple drag and drop and customize your screens: label, type, appearance, functionality, and more. It's all in your hands!"
                    />
                    <FeatureBlock
                        icon={<FileText size={32} color="#10b981" />}
                        title="Make your documents truly yours"
                        description="Customize every aspect of your documents from aesthetics to content. Fine-tune invoices, reshape overviews, and create new documents from scratch."
                    />
                    <FeatureBlock
                        icon={<Settings size={32} color="#f59e0b" />}
                        title="Let Odoo Studio do the work for you"
                        description="Define triggers and automated actions for any record changes. Automate the busy work so your team can focus on what matters."
                    />
                    <FeatureBlock
                        icon={<ShieldCheck size={32} color="#3b82f6" />}
                        title="Set up approval flows"
                        description="Verify critical actions before they're executed. Set up notifications to be triggered when specific actions are initiated and direct them to specific users."
                    />
                    <FeatureBlock
                        icon={<Database size={32} color="#6366f1" />}
                        title="All the features done right."
                        description="Create custom applications in minutes rather than weeks. Expand as you grow with a modular, scalable architecture."
                    />
                </div>
            </div>

            {/* Deep Dive Features */}
            <div className="deep-dive-section">
                <div className="deep-dive-container">
                    <div className="deep-dive-header">
                        <h2 className="deep-dive-title">
                            All the features done right.
                        </h2>
                        <p className="deep-dive-subtitle">
                            Everything you need to build powerful, enterprise-grade applications visually.
                        </p>
                    </div>

                    <div className="deep-dive-grid">
                        <DeepDiveFeature
                            title="No programming needed"
                            description="Create custom applications in minutes rather than weeks."
                        />
                        <DeepDiveFeature
                            title="Menu editor"
                            description="Reorganize your app's menu with drag and drops, and create new menus in just a click."
                        />
                        <DeepDiveFeature
                            title="Conditional properties"
                            description="Make your fields invisible, required, or read-only under certain conditions."
                        />
                        <DeepDiveFeature
                            title="XML editor"
                            description="Use the XML editor for advanced reporting customizations when you need ultimate control."
                        />
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="studio-bottom-cta">
                <h2 className="studio-bottom-title">
                    One need, one app.
                </h2>
                <p className="studio-bottom-subtitle">
                    Join 15 million happy users building the future of their businesses with Odoo Studio. Expand as you grow.
                </p>
                <Link to="/contact-sales" className="btn-bottom-cta">
                    Start your free trial <ChevronRight size={20} style={{ marginLeft: 8 }} />
                </Link>
            </div>
        </main>
    );
};

const FeatureBlock = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="feature-block">
        <div className="feature-icon-wrapper">
            {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
    </div>
);

const DeepDiveFeature = ({ title, description }: { title: string, description: string }) => (
    <div className="deep-dive-item">
        <div className="deep-dive-icon">
            <CheckCircle2 size={24} color="#8b5cf6" />
        </div>
        <div>
            <h4 className="deep-dive-item-title">{title}</h4>
            <p className="deep-dive-item-desc">{description}</p>
        </div>
    </div>
);
