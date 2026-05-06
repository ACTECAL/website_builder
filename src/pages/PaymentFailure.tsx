import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { XCircle, AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import '../styles/PaymentFailure.css';

export const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get payment error details from location state or use defaults
  const paymentData = location.state || {
    planName: 'Premium',
    amount: '₹4,999.00',
    transactionId: `TXN_${Date.now()}`,
    error: 'Payment gateway timeout',
    date: new Date().toLocaleDateString()
  };

  const handleRetry = () => {
    navigate('/profile', { state: { retryPayment: true } });
  };

  return (
    <div className="pf-page">
      <div className="pf-container">
        <div className="pf-card">
          {/* Failure Icon */}
          <div className="pf-failure-icon">
            <div className="pf-icon-circle">
              <XCircle size={48} className="pf-x-icon" />
            </div>
          </div>

          {/* Failure Message */}
          <div className="pf-content">
            <h1 className="pf-title">Payment Failed</h1>
            <p className="pf-subtitle">
              We couldn't process your payment. Please try again or contact support.
            </p>

            {/* Error Details */}
            <div className="pf-error-details">
              <div className="pf-detail-item">
                <span className="pf-detail-label">Plan</span>
                <span className="pf-detail-value">{paymentData.planName}</span>
              </div>
              <div className="pf-detail-item">
                <span className="pf-detail-label">Amount</span>
                <span className="pf-detail-value pf-amount">{paymentData.amount}</span>
              </div>
              <div className="pf-detail-item">
                <span className="pf-detail-label">Transaction ID</span>
                <span className="pf-detail-value pf-mono">{paymentData.transactionId}</span>
              </div>
              <div className="pf-detail-item">
                <span className="pf-detail-label">Error</span>
                <span className="pf-detail-value pf-error">{paymentData.error}</span>
              </div>
              <div className="pf-detail-item">
                <span className="pf-detail-label">Date</span>
                <span className="pf-detail-value">{paymentData.date}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pf-actions">
              <button 
                className="pf-btn-primary"
                onClick={handleRetry}
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              <Link to="/" className="pf-btn-secondary">
                <Home size={18} />
                Go to Dashboard
              </Link>
            </div>

            {/* Help Section */}
            <div className="pf-help-box">
              <div className="pf-help-icon">
                <AlertTriangle size={16} />
              </div>
              <div className="pf-help-text">
                <strong>Need Help?</strong> If payment continues to fail, contact our support team at support@actecal.com or call +91-XXXXXXXXXX.
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button 
            className="pf-back-btn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
