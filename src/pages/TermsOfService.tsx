import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LegalPages.css';

export const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using Nexora\'s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
    },
    {
      title: 'Use License',
      content: 'Permission is granted to temporarily download one copy of the materials on Nexora\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose or for any public display, attempt to reverse engineer any software contained on the website, or remove any copyright or other proprietary notations from the materials.'
    },
    {
      title: 'User Accounts',
      content: 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree to immediately notify us of any unauthorized uses of your account or any other breaches of security.'
    },
    {
      title: 'Service Availability',
      content: 'We strive to provide highly reliable service mapped to Elite++ SLAs, but we do not guarantee that our services will be available at all times. We reserve the right to modify, suspend, or discontinue any service at any time without notice.'
    },
    {
      title: 'Payment Terms',
      content: 'Some parts of the service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. A valid payment method is required to process the payment for your subscription. You may cancel your subscription at any time, but no refunds will be provided for partial months or unused portions.'
    },
    {
      title: 'Prohibited Uses',
      content: 'You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances. Prohibited activities include, but are not limited to: violating laws or regulations, transmitting viruses or malicious code, attempting to gain unauthorized access to our systems, and interfering with or disrupting our services.'
    },
    {
      title: 'Intellectual Property',
      content: 'The service and its original content, features, and functionality are and will remain the exclusive property of Nexora and its licensors. The service is protected by copyright, trademark, and other laws.'
    },
    {
      title: 'Disclaimer',
      content: 'The information on this platform is provided on an \'as is\' basis. Nexora makes no representations or warranties of any kind, express or implied, as to the operation of this site or the information, content, materials, or products included on this site.'
    },
    {
      title: 'Limitation of Liability',
      content: 'Nexora will not be liable for any damages of any kind arising from the use of this service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.'
    },
    {
      title: 'Termination',
      content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms.'
    },
    {
      title: 'Contact Information',
      content: 'If you have any questions about these terms of service, please contact us at legal@nexora.com.'
    }
  ];

  return (
    <main className="legal-page-container">
      <div className="legal-content-wrapper">
        <h1 style={{ textAlign: 'center', margin: '60px 0 20px', fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(to right, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}>
          Terms of Service
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.2rem', marginBottom: '60px' }}>
          Please read these terms carefully before accessing Nexora's Elite++ services.
        </p>

        <div className="legal-glass-card legal-intro-card" style={{ animationDelay: '0.1s' }}>
          <p className="legal-text" style={{ fontSize: '1.15rem' }}>
            These terms of service govern your use of Nexora's platform. By accessing or utilizing our services, you strictly agree to be bound by these foundational terms.
          </p>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="legal-glass-card" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
            <h3 className="legal-primary-heading">{section.title}</h3>
            <p className="legal-text">{section.content}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '60px', animation: 'fade-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both', animationDelay: '1.2s' }}>
          <Link to="/" className="legal-back-btn">
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default TermsOfService;
