import React from 'react';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';

export const CookiePolicy: React.FC = () => {
  return (
    <main className="bg-white min-h-screen text-dark font-sans">
      <PageHero
        title="Cookie Policy"
        subtitle="Learn about how we use cookies to improve your experience."
        emphasize="none"
      />

      <section className="py-5">
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm border-0 rounded-3 mb-5">
                <div className="card-body p-5">
                  <p className="lead text-secondary mb-4">
                    We use cookies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from.
                  </p>

                  <div className="d-flex flex-column gap-5">
                    {[
                      {
                        title: 'What Are Cookies',
                        content: 'Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make it more secure, provide better user experience, and understand how the website performs.'
                      },
                      {
                        title: 'How We Use Cookies',
                        content: 'We use cookies for several purposes: essential cookies required for the website to function and cannot be switched off in our systems; preference cookies that remember your settings and preferences; analytics cookies that help us understand how visitors interact with our website; and marketing cookies used to deliver relevant advertisements.'
                      },
                      {
                        title: 'Types of Cookies We Use',
                        content: 'Essential cookies are necessary for the website to function and cannot be switched off. Performance cookies allow us to count visits and traffic sources so we can measure and improve performance. Functional cookies enable enhanced functionality and personalization. Targeting cookies may be set by our advertising partners to build a profile of your interests.'
                      },
                      {
                        title: 'Managing Cookies',
                        content: 'You can control and manage cookies in various ways. Please note that removing or blocking cookies can negatively affect your user experience and parts of our website may no longer be fully accessible. Most web browsers automatically accept cookies, but you can modify your browser setting to decline cookies if you prefer.'
                      },
                      {
                        title: 'Third-Party Cookies',
                        content: 'Some cookies may be set by third-party services that appear on our pages. We have no control over these cookies, and you should check the relevant third party\'s website for more information about their cookies.'
                      },
                      {
                        title: 'Contact Us',
                        content: 'If you have any questions about our use of cookies or this cookie policy, please contact us at privacy@bizsuite.com.'
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
