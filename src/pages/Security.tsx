import React from 'react';
import '../styles/LegalPages.css';
import { Shield, Lock, CheckCircle, Server, Eye, FileText } from 'lucide-react';

const Security: React.FC = () => {
  const pillars = [
    {
      title: 'Data protection',
      icon: <Lock className="legal-icon" />,
      points: [
        'AES-256 encryption at rest with managed keys',
        'TLS 1.3 enforced for all traffic',
        'Field-level encryption for sensitive records'
      ]
    },
    {
      title: 'Identity & access',
      icon: <Eye className="legal-icon" />,
      points: [
        'Single Sign-On with SAML 2.0 and OAuth',
        'Granular role-based access controls',
        'Adaptive MFA across web and mobile'
      ]
    },
    {
      title: 'Compliance & trust',
      icon: <CheckCircle className="legal-icon" />,
      points: [
        'ISO 27001 and SOC 2 Type II certified data centers',
        'GDPR, HIPAA, and PCI readiness programs',
        'Independent third-party penetration testing twice yearly'
      ]
    }
  ];

  return (
    <main className="legal-page-container">
      <div className="legal-glow-blob blob-top" />
      <div className="legal-glow-blob blob-bottom" />

      <div className="legal-hero">
        <h1 className="legal-title">Enterprise Security</h1>
        <p className="legal-subtitle">
          Nexora safeguards your business with layered security controls, continuous monitoring, and auditable compliance.
        </p>
      </div>

      <div className="legal-content-wrapper" style={{ maxWidth: 1200 }}>
        
        {/* Core Pillars */}
        <section className="legal-section">
          <h2 className="legal-section-title">Core Security Architecture</h2>
          <div className="legal-grid-300">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="legal-glass-card">
                <div className="legal-flex-header">
                  <div className="legal-icon-box blue">
                    {pillar.icon}
                  </div>
                  <h3 className="legal-card-title">{pillar.title}</h3>
                </div>
                <ul className="legal-list">
                  {pillar.points.map((point) => (
                    <li key={point} className="legal-list-item-sm">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Operational Controls */}
        <section className="legal-section" style={{ marginTop: 64 }}>
          <div className="legal-grid-split">
            <div className="legal-glass-card">
              <div className="legal-flex-header">
                <Server style={{ color: '#8b5cf6' }} size={28} />
                <h3 className="legal-card-title-lg">Security Operations</h3>
              </div>
              <ul className="legal-list">
                <li className="legal-list-item">24/7 monitoring with automated alerting and on-call response.</li>
                <li className="legal-list-item">SIEM ingestion across application, network, and infrastructure logs.</li>
                <li>Quarterly tabletop exercises and incident response rehearsals.</li>
              </ul>
            </div>
            
            <div className="legal-glass-card">
              <div className="legal-flex-header">
                <Shield style={{ color: '#10b981' }} size={28} />
                <h3 className="legal-card-title-lg">Customer Controls</h3>
              </div>
              <ul className="legal-list">
                <li className="legal-list-item">Custom data residency with regional hosting options.</li>
                <li className="legal-list-item">Audit logs streamed to your SIEM of choice.</li>
                <li>Bring-your-own-key options for highly regulated workloads.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="legal-cta-section">
          <div className="legal-glass-card legal-cta-card">
            <FileText size={48} className="legal-cta-icon" />
            <h3 className="legal-cta-title">Security Resources</h3>
            <p className="legal-cta-desc">
              Need our latest security whitepaper, signed agreements, or penetration-test summary? Our trust engineering team is ready to assist.
            </p>
            <a href="mailto:security@nexora.app" className="legal-back-btn pink">
              Contact Security Team &rarr;
            </a>
          </div>
        </section>
        
      </div>
    </main>
  );
};

export default Security;
