import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LegalPages.css';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, update your profile, make a purchase, participate in surveys, or contact us for support. This includes personal information (name, email, phone number), payment and billing information, profile information and preferences, and communications you send to us.'
    },
    {
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process transactions and send related information, send technical notices, updates, and support messages, respond to your comments and questions, and communicate with you about products, services, and events.'
    },
    {
      title: 'Information Sharing and Disclosure',
      content: 'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with your explicit consent, to comply with legal obligations, to protect our rights and safety, or in connection with a business transfer.'
    },
    {
      title: 'Data Security',
      content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments mapping to Elite++ standards.'
    },
    {
      title: 'Your Rights',
      content: 'You have the right to access the personal information we hold about you, correct inaccurate or incomplete information, request deletion of your personal information, object to or restrict processing of your information, and data portability.'
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about this privacy policy or our data practices, please contact us at privacy@nexora.com or visit our Help Center for more information.'
    }
  ];

  return (
    <main className="legal-page-container">
      <div className="legal-content-wrapper">
        <h1 style={{ textAlign: 'center', margin: '60px 0 20px', fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(to right, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}>
          Privacy Policy
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.2rem', marginBottom: '60px' }}>
          We're highly committed to protecting your privacy and being fully transparent about our data practices.
        </p>

        <div className="legal-glass-card legal-intro-card" style={{ animationDelay: '0.1s' }}>
          <p className="legal-text" style={{ fontSize: '1.15rem' }}>
            Your privacy is of utmost importance to us. This Privacy Policy explains how Nexora collects, uses, and protects your personal information when you interface with our world-class services.
          </p>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="legal-glass-card" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
            <h3 className="legal-primary-heading">{section.title}</h3>
            <p className="legal-text">{section.content}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '60px', animation: 'fade-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both', animationDelay: '0.8s' }}>
          <Link to="/" className="legal-back-btn">
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
