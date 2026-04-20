import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';
import '../styles/PlatformPages.css';
import { HandBullets } from '../components/CreativeBits';

export const CloudPlatform: React.FC = () => {
    return (
        <main>
            <PageHero
                title="Nexora Cloud Platform"
                subtitle="Enterprise-grade hosting, security, and performance for your business."
                emphasize="none"
            />
            <section className="platform-page-section">
                <div className="platform-page-container">
                    <h3>1. Fully Managed Infrastructure</h3>
                    <HandBullets
                        items={[
                            'Automated daily backups across multiple regions',
                            'Seamless upgrades with zero downtime',
                            '99.9% uptime SLA with 24/7 monitoring'
                        ]}
                    />
                    <p className="platform-page-benefit">
                        <strong>Benefit:</strong> Focus on growing your business while we handle the servers, security, and maintenance.
                    </p>

                    <div className="platform-page-actions">
                        <Link to="/pricing" className="btn btn-primary">View Hosting Plans</Link>
                        <Link to="/security" className="btn btn-outline-primary">Security Overview</Link>
                    </div>
                </div>
            </section>
        </main>
    );
};
