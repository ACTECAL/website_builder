import React, { useState } from 'react';
import { GothicH2 } from './GothicHeading';
import '../styles/NewsletterSignup.css';

type Props = {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonText?: string;
};

export const NewsletterSignup: React.FC<Props> = ({
  title = "Stay Updated",
  subtitle = "Get the latest news, updates, and exclusive offers delivered to your inbox.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe"
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };


  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <GothicH2
          text={title}
          className="newsletter-title"
        />

        <p className="newsletter-subtitle">
          GET EXCLUSIVE INSIGHTS, PRODUCT UPDATES, AND INDUSTRY TRENDS DELIVERED TO YOUR INBOX. JOIN 50,000+ PROFESSIONALS WHO TRUST US.
        </p>

        {isSubscribed ? (
          <div className="newsletter-success">
            <i className="fa-solid fa-circle-check newsletter-icon-margin"></i>
            Thanks for subscribing! Check your inbox soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="newsletter-input"
            />

            <button
              type="submit"
              disabled={isLoading || !email}
              className="newsletter-button"
            >
              {isLoading ? (
                <div className="newsletter-loading-container">
                  <div className="newsletter-spinner" />
                  Subscribing...
                </div>
              ) : (
                buttonText
              )}
            </button>
          </form>
        )}

        <p className="newsletter-privacy">
          <i className="fa-solid fa-lock newsletter-icon-margin" aria-hidden="true"></i>
          We respect your privacy. Unsubscribe at any time.
        </p>

        {/* Benefits Cards */}
        <div className="newsletter-benefits">
          {[
            { icon: <i className="fa-solid fa-envelope newsletter-icon-margin benefit-icon-blue" aria-hidden="true"></i>, title: 'Weekly Updates', desc: 'Get the latest product news and feature releases' },
            { icon: <i className="fa-solid fa-bullseye newsletter-icon-margin benefit-icon-purple" aria-hidden="true"></i>, title: 'Exclusive Offers', desc: 'Access to special discounts and early access' },
            { icon: <i className="fa-solid fa-lightbulb newsletter-icon-margin benefit-icon-yellow" aria-hidden="true"></i>, title: 'Pro Tips', desc: 'Learn how to get the most out of our platform' }
          ].map((benefit, idx) => (
            <div key={idx} className="newsletter-benefit-card">
              <div className="newsletter-benefit-icon">{benefit.icon}</div>
              <h4 className="newsletter-benefit-title">
                {benefit.title}
              </h4>
              <p className="newsletter-benefit-desc">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
