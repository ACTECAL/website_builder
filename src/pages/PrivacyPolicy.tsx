import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  return (
    <main className="bg-white min-h-screen text-dark font-sans">
      <PageHero
        title="Privacy Policy"
        subtitle="We're committed to protecting your privacy and being transparent about our data practices."
        emphasize="none"
      />

      <section className="py-5">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 rounded-3 mb-5">
                <div className="card-body p-5">
                  <p className="lead text-secondary mb-4">
                    Your privacy is important to us. This privacy policy explains how BizSuite collects, uses, and protects your personal information when you use our services.
                  </p>

                  <div className="d-flex flex-column gap-5">
                    {[
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
                        content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security assessments.'
                      },
                      {
                        title: 'Your Rights',
                        content: 'You have the right to access the personal information we hold about you, correct inaccurate or incomplete information, request deletion of your personal information, object to or restrict processing of your information, and data portability.'
                      },
                      {
                        title: 'Contact Us',
                        content: 'If you have any questions about this privacy policy or our data practices, please contact us at privacy@bizsuite.com or visit our help center for more information.'
                      }
                    ].map((section, index) => (
                      <div key={index}>
                        <h3 className="fw-bold mb-3 text-dark">{section.title}</h3>
                        <p className="text-secondary mb-0" style={{ lineHeight: 1.7 }}>{section.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link to="/" className="btn btn-outline-primary rounded-pill px-4">
                  <i className="fa-solid fa-arrow-left me-2"></i> Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
