import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { XCircle, AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import '../styles/PaymentFailure.css';

export const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  

const searchParams = new URLSearchParams(location.search);

const paymentData = {
  planName: searchParams.get("plan") || "Premium",
  amount: searchParams.get("amount") || "₹0.00",
  transactionId: searchParams.get("transaction_id") || `TXN_${Date.now()}`,
  error: searchParams.get("error") || "Payment failed",
  date: new Date().toLocaleDateString()
};

  const handleRetry = () => {
    navigate('/profile', { state: { retryPayment: true } });
  };

  return (
    <div className="pff-page">
      <div className="pff-container">
        <div className="pff-card">
          {/* Failure Icon */}
          <div className="pff-failure-icon">
            <div className="pff-icon-circle">
              <XCircle size={48} className="pff-x-icon" />
            </div>
          </div>

          {/* Failure Message */}
          <div className="pff-content">
            <h1 className="pff-title">Payment Failed</h1>
            <p className="pff-subtitle">
              We couldn't process your payment. Please try again or contact support.
            </p>

            {/* Error Details */}
            <div className="pff-error-details">
              {/* <div className="pff-detail-item">
                <span className="pff-detail-label">Plan</span>
                <span className="pff-detail-value">{paymentData.planName}</span>
              </div> */}
              <div className="pff-detail-item">
                <span className="pff-detail-label">Amount</span>
                <span className="pff-detail-value pff-amount">{paymentData.amount}</span>
              </div>
              <div className="pff-detail-item">
                <span className="pff-detail-label">Transaction ID</span>
                <span className="pff-detail-value pff-mono">{paymentData.transactionId}</span>
              </div>
              {/* <div className="pff-detail-item">
                <span className="pff-detail-label">Error</span>
                <span className="pff-detail-value pff-error">{paymentData.error}</span>
              </div> */}
              {/* <div className="pff-detail-item">
                <span className="pff-detail-label">Date</span>
                <span className="pff-detail-value">{paymentData.date}</span>
              </div> */}
            </div>

            {/* Action Buttons */}
            <div className="pff-actions">
              <button 
                className="pff-btn-primary"
                onClick={handleRetry}
              >
                <RefreshCw size={18} />
                Try Again
              </button>
              <Link to="/" className="pff-btn-secondary">
                <Home size={18} />
                Go to Dashboard
              </Link>
            </div>

            {/* Help Section */}
            <div className="pff-help-box">
              <div className="pff-help-icon">
                <AlertTriangle size={16} />
              </div>
              <div className="pff-help-text">
                <strong>Need Help?</strong> If payment continues to fail, contact our support team at support@actecal.com or call +91-XXXXXXXXXX.
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button 
            className="pff-back-btn"
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
