import React, { useState } from 'react';

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
    <section className="py-5 bg-dark text-white position-relative overflow-hidden">

      <div className="container position-relative z-1 text-center" style={{ maxWidth: 800 }}>
        <h2 className="display-4 fw-bold mb-3">{title}</h2>

        <p className="lead text-white-50 mb-5 mx-auto text-uppercase" style={{ maxWidth: 600, letterSpacing: '0.5px', fontSize: '0.9rem' }}>
          GET EXCLUSIVE INSIGHTS, PRODUCT UPDATES, AND INDUSTRY TRENDS DELIVERED TO YOUR INBOX. JOIN 50,000+ PROFESSIONALS WHO TRUST US.
        </p>

        <form onSubmit={handleSubmit} className="d-flex flex-wrap justify-content-center gap-3 mx-auto" style={{ maxWidth: 500 }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            className="form-control form-control-lg bg-white bg-opacity-10 text-white border-white border-opacity-25"
            style={{ flex: '1 1 300px', backdropFilter: 'blur(10px)' }}
          />

          <button
            type="submit"
            disabled={isLoading || !email}
            className="btn btn-warning btn-lg fw-bold px-4"
            style={{ minWidth: 140 }}
          >
            {isLoading ? (
              <span className="d-flex align-items-center justify-content-center gap-2">
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Subscribing...
              </span>
            ) : (
              buttonText
            )}
          </button>
        </form>

        <p className="small text-white-50 mt-3">
          <i className="fa-solid fa-lock me-2" aria-hidden="true"></i>
          We respect your privacy. Unsubscribe at any time.
        </p>

        {/* Benefits Cards */}
        <div className="d-flex justify-content-center flex-wrap gap-4 mt-5">
          {[
            { icon: <i className="fa-solid fa-envelope" aria-hidden="true" style={{ color: '#3B82F6' }}></i>, title: 'Weekly Updates', desc: 'Get the latest product news and feature releases' },
            { icon: <i className="fa-solid fa-bullseye" aria-hidden="true" style={{ color: '#8B5CF6' }}></i>, title: 'Exclusive Offers', desc: 'Access to special discounts and early access' },
            { icon: <i className="fa-solid fa-lightbulb" aria-hidden="true" style={{ color: '#EAB308' }}></i>, title: 'Pro Tips', desc: 'Learn how to get the most out of our platform' }
          ].map((benefit, idx) => (
            <div key={idx} className="p-4 rounded-3 bg-white bg-opacity-10 border border-white border-opacity-10 text-center" style={{ minWidth: 180, maxWidth: 220 }}>
              <div className="display-6 mb-3">{benefit.icon}</div>
              <h4 className="h6 fw-bold mb-2">{benefit.title}</h4>
              <p className="small text-white-50 mb-0 lh-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
