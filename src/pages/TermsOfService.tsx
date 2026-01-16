import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';

export const TermsOfService: React.FC = () => {
  return (
    <main className="bg-white min-h-screen text-dark font-sans">
      <PageHero
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services."
        emphasize="none"
      />

      <section className="py-5">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 rounded-3 mb-5">
                <div className="card-body p-5">
                  <p className="lead text-secondary mb-4">
                    These terms of service govern your use of BizSuite's services. By accessing or using our services, you agree to be bound by these terms.
                  </p>

                  <div className="d-flex flex-column gap-5">
                    {[
                      {
                        title: 'Acceptance of Terms',
                        content: 'By accessing and using BizSuite\'s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
                      },
                      {
                        title: 'Use License',
                        content: 'Permission is granted to temporarily download one copy of the materials on BizSuite\'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials, use the materials for any commercial purpose or for any public display, attempt to reverse engineer any software contained on the website, or remove any copyright or other proprietary notations from the materials.'
                      },
                      {
                        title: 'User Accounts',
                        content: 'When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account. You agree to immediately notify us of any unauthorized uses of your account or any other breaches of security.'
                      },
                      {
                        title: 'Service Availability',
                        content: 'We strive to provide reliable service, but we do not guarantee that our services will be available at all times. We reserve the right to modify, suspend, or discontinue any service at any time without notice.'
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
                        content: 'The service and its original content, features, and functionality are and will remain the exclusive property of BizSuite and its licensors. The service is protected by copyright, trademark, and other laws.'
                      },
                      {
                        title: 'Disclaimer',
                        content: 'The information on this website is provided on an \'as is\' basis. BizSuite makes no representations or warranties of any kind, express or implied, as to the operation of this site or the information, content, materials, or products included on this site.'
                      },
                      {
                        title: 'Limitation of Liability',
                        content: 'BizSuite will not be liable for any damages of any kind arising from the use of this service, including but not limited to direct, indirect, incidental, punitive, and consequential damages.'
                      },
                      {
                        title: 'Termination',
                        content: 'We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the terms.'
                      },
                      {
                        title: 'Contact Information',
                        content: 'If you have any questions about these terms of service, please contact us at legal@bizsuite.com.'
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
