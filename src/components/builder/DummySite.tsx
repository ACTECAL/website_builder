import React from 'react';
import './DummySite.css';

export const DummySite: React.FC = () => {
    return (
        <div className="dummy-site">
            <div className="blobs">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>
            <header className="dummy-header">
                <h1>My Awesome Site</h1>
                <nav className="dummy-nav">
                    <a href="#!">Home</a>
                    <a href="#!">Features</a>
                    <a href="#!">Pricing</a>
                    <a href="#!">Contact</a>
                </nav>
            </header>
            <section className="dummy-hero">
                <h2>Welcome to the future</h2>
                <p>Experience a premium, scalable website built with modern design.</p>
                <button className="dummy-cta">Get Started</button>
            </section>
            <section className="dummy-content">
                <div className="dummy-card">
                    <h3>Premium Design</h3>
                    <p>Beautiful, responsive, and ready for your brand.</p>
                </div>
                <div className="dummy-card">
                    <h3>AI Powered</h3>
                    <p>Built with the latest AI technology to help you grow.</p>
                </div>
                <div className="dummy-card">
                    <h3>Fast Performance</h3>
                    <p>Optimized for speed and SEO out of the box.</p>
                </div>
            </section>
            <footer className="dummy-footer">
                © 2025 My Awesome Site. All rights reserved.
            </footer>
        </div>
    );
};
