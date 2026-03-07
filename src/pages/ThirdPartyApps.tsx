import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';
import '../styles/PlatformPages.css';
import { HandBullets } from '../components/CreativeBits';

export const ThirdPartyApps: React.FC = () => {
    return (
        <main>
            <PageHero
                title="Third Party Apps"
                subtitle="Extend BizSuite with thousands of community-built integrations."
                emphasize="none"
            />
            <section className="platform-page-section">
                <div className="platform-page-container">
                    <h3>1. Endless Integrations</h3>
                    <HandBullets
                        items={[
                            'Connect with your favorite tools seamlessly',
                            'Thousands of ready-to-use apps in the marketplace',
                            'Automate workflows across different platforms'
                        ]}
                    />
                    <p className="platform-page-benefit">
                        <strong>Benefit:</strong> No need to change your existing tech stack. BizSuite adapts to you.
                    </p>

                    <div className="platform-page-actions">
                        <Link to="/contact" className="btn btn-primary">Browse Marketplace</Link>
                        <Link to="/docs" className="btn btn-outline-primary">Developer API</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};
