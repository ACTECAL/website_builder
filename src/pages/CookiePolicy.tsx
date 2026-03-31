import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LegalPages.css';

export const CookiePolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: 'What Are Cookies',
      content: 'Cookies are small text files that are utilized to store pieces of information. They are stored on your device seamlessly when the website is loaded on your browser. These cookies help us make the website function correctly, improve its operational security, provide a significantly better user experience, and analyze how the platform performs.'
    },
    {
      title: 'How We Use Cookies',
      content: 'We use cookies for several vital purposes: essential cookies required for the architecture to function which cannot be switched off; preference cookies that cache your settings; analytics cookies that help us understand how users navigate our systems; and marketing cookies utilized to deliver tailored insights.'
    },
    {
      title: 'Types of Cookies We Use',
      content: 'Essential cookies are structurally crucial to function. Performance cookies allow us to gauge traffic bottlenecks so we can optimize rendering. Functional cookies unlock personalization overlays. Targeting cookies are deployed securely to align with your contextual flow.'
    },
    {
      title: 'Managing Cookies',
      content: 'You maintain absolute control over cookies in various ways. Please note that removing or blocking cookies may degrade the rendering speed of some immersive transitions. Most browsers inherently accept cookies, but you may granularly tune this in your browser settings.'
    },
    {
      title: 'Third-Party Cookies',
      content: 'Select cookies may be injected by authorized third-party services that render across our domain. We advise consulting the relevant third party\'s directives for an exhaustive understanding of their cache mechanisms.'
    },
    {
      title: 'Contact Us',
      content: 'If you require technical clarification regarding our advanced usage of cookies, please contact us securely at privacy@nexora.com.'
    }
  ];

  return (
    <main className="legal-page-container">
      <div className="legal-content-wrapper">
        <h1 style={{ textAlign: 'center', margin: '60px 0 20px', fontSize: '3.5rem', fontWeight: 800, background: 'linear-gradient(to right, #f8fafc, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: '-0.03em' }}>
          Cookie Policy
        </h1>
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '1.2rem', marginBottom: '60px' }}>
          Transparency is key. Learn how we utilize cookies to enhance your structural experience.
        </p>

        <div className="legal-glass-card legal-intro-card" style={{ animationDelay: '0.1s' }}>
          <p className="legal-text" style={{ fontSize: '1.15rem' }}>
            We implement cookies to enhance browser memory caching, analyze rendering traffic, and optimize where our connections are geographically resolved from.
          </p>
        </div>

        {sections.map((section, index) => (
          <div key={index} className="legal-glass-card" style={{ animationDelay: `${(index + 2) * 0.1}s` }}>
            <h3 className="legal-primary-heading">{section.title}</h3>
            <p className="legal-text">{section.content}</p>
          </div>
        ))}

        <div style={{ textAlign: 'center', marginTop: '60px', animation: 'fade-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both', animationDelay: '0.9s' }}>
          <Link to="/" className="legal-back-btn">
            ← Return to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CookiePolicy;
