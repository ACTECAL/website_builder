import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SupportLayout from '../components/SupportLayout';
import '../styles/HelpCenter.css';

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
      answer: "You can reach our support team through the contact form on our website, by emailing support@Nexora.com, or through the live chat feature available on our dashboard during business hours."
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
      <div style={{ display: 'grid', gap: 36 }}>
        <section className="help-center-search-section">
          <div className="search-input-wrapper">
            <input
              type="text"
              placeholder="Search the knowledge base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="help-search-input"
            />
            <span className="search-icon">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            </span>
          </div>
          <p className="search-hint">
            Search across {faqs.length} FAQs and troubleshooting guides.
          </p>
        </section>

        <section style={{ display: 'grid', gap: 20 }}>
          <header className="faq-header">
            <h2 className="faq-title">
              Frequently Asked Questions
            </h2>
            <span className="faq-update-badge">
              Updated weekly
            </span>
          </header>

          {filteredFAQs.length === 0 ? (
            <div className="faq-no-results">
              No results for "{searchTerm}". Try a broader keyword.
            </div>
          ) : (
            <div className="faq-list">
              {filteredFAQs.map((faq, index) => {
                const isOpen = expandedFAQ === index;
                return (
                  <div
                    key={faq.question}
                    className={`faq-item ${isOpen ? 'open' : ''}`}
                  >
                    <button
                      onClick={() => setExpandedFAQ(isOpen ? null : index)}
                      className="faq-question-btn"
                    >
                      <span className="faq-question-text">
                        {faq.question}
                      </span>
                      <span className="faq-chevron">
                        ▼
                      </span>
                    </button>
                    <div className="faq-answer-wrapper">
                      <div className="faq-answer-inner">
                        <div className="faq-answer-content">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="help-connect-section">
          <h3 className="help-connect-title">
            Still need help?
          </h3>
          <p className="help-connect-desc">
            Connect with our support engineers for tailored assistance.
          </p>
          <div className="help-connect-actions">
            <Link
              to="/contact"
              className="help-btn-primary"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@Nexora.com"
              className="help-btn-secondary"
            >
              Email Us
            </a>
          </div>
        </section>
      </div>
    </SupportLayout>
  );
};


