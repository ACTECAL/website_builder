import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SupportLayout from '../components/SupportLayout';

export const HelpCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click the 'Sign Up' button in the top right corner of our homepage. Fill in your details including your name, email address, and password. You'll receive a confirmation email to verify your account."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password?' on the login page. Enter your email address and we'll send you a link to reset your password. The link will expire after 24 hours for security reasons."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our payment partners."
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you'll be charged a prorated amount for the remainder of your billing cycle. Downgrades take effect at the next billing cycle."
    },
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription from your account settings under the 'Billing' section. Your account will remain active until the end of your current billing period, and you won't be charged for the next cycle."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all new subscriptions. If you're not satisfied with our service within the first 30 days, contact our support team for a full refund."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our support team through the contact form on our website, by emailing support@bizsuite.com, or through the live chat feature available on our dashboard during business hours."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take security seriously. All data is encrypted in transit and at rest. We use industry-standard security measures and regular security audits to protect your information."
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SupportLayout
      title="Help Center"
      intro="Browse guides, troubleshoot issues, or reach out to our support squad whenever you need a hand."
    >
      <div className="d-flex flex-column gap-5">

        {/* Search Section */}
        <section className="position-relative p-5 rounded-4 border shadow-sm"
          style={{
            background: 'linear-gradient(135deg, #714B67 0%, #017E84 100%)', // Odoo Gradient
            color: 'white'
          }}>
          <div className="position-relative z-1 container" style={{ maxWidth: '600px' }}>
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search the knowledge base..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control form-control-lg rounded-pill ps-5 border-0 shadow-lg"
                style={{ padding: '1rem 3.5rem', fontSize: '1rem' }}
              />
              <i className="fa-solid fa-magnifying-glass position-absolute top-50 start-0 translate-middle-y ms-4 text-muted fs-5"></i>
            </div>
            <p className="text-center mt-3 mb-0 opacity-75 small fw-bold">
              Search across {faqs.length} FAQs and troubleshooting guides.
            </p>
          </div>
          {/* Decorative overlay */}
          <div className="position-absolute top-0 start-0 w-100 h-100 rounded-4 overflow-hidden z-0">
            <div className="position-absolute top-0 end-0 bg-white opacity-10 rounded-circle" style={{ width: '300px', height: '300px', transform: 'translate(30%, -30%)' }}></div>
            <div className="position-absolute bottom-0 start-0 bg-secondary opacity-25 rounded-circle" style={{ width: '200px', height: '200px', transform: 'translate(-30%, 30%)' }}></div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="container px-0">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h2 fw-bold text-dark mb-0">Frequently Asked Questions</h2>
            <span className="badge bg-primary-subtle text-primary border border-primary-subtle rounded-pill px-3 py-2">Updated weekly</span>
          </div>

          {filteredFAQs.length === 0 ? (
            <div className="text-center mb-5">
              <h1 className="display-4 fw-bold mb-3 ls-tight">Actyx Help Center</h1>
              <p className="lead text-muted mx-auto" style={{ maxWidth: 600 }}>
                Find answers, tutorials, and support for all your Actyx apps.
              </p>
            </div>) : (
            <div className="accordion d-flex flex-column gap-3" id="faqAccordion">
              {filteredFAQs.map((faq, index) => {
                const isOpen = expandedFAQ === index;
                return (
                  <div key={faq.question} className="accordion-item border rounded-4 shadow-sm overflow-hidden">
                    <button
                      onClick={() => setExpandedFAQ(isOpen ? null : index)}
                      className="accordion-button collapsed w-100 d-flex justify-content-between align-items-center p-4 bg-white border-0 text-start shadow-none"
                      type="button"
                    >
                      <span className={`fw-bold fs-5 ${isOpen ? 'text-primary' : 'text-dark'}`}>{faq.question}</span>
                      <i className={`fa-solid fa-chevron-down transition-transform text-muted ${isOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 animate-slide-down">
                        <hr className="my-2 border-secondary opacity-10" />
                        <p className="text-muted mb-0 lh-lg">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Support Callout */}
        <section className="text-center bg-light p-5 rounded-4 border">
          <h3 className="h3 fw-bold text-dark mb-2">Still need help?</h3>
          <p className="text-muted mb-4">Connect with our support engineers for tailored assistance.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/contact" className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
              Contact Support
            </Link>
            <a href="mailto:support@bizsuite.com" className="btn btn-outline-secondary rounded-pill px-4 py-2 fw-bold bg-white">
              Email Us
            </a>
          </div>
        </section>

      </div>
      <style>{`
        .transition-transform { transition: transform 0.2s ease; }
        .rotate-180 { transform: rotate(180deg); }
        .animate-slide-down { animation: slideDown 0.3s ease-out; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </SupportLayout>
  );
};


