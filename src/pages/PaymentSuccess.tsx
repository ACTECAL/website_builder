// import React from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { CheckCircle, Home, Receipt, ArrowLeft } from 'lucide-react';
// import '../styles/PaymentSuccess.css';

// export const PaymentSuccess: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   // Get payment details from location state or use defaults
//   const paymentData = location.state || {
//     planName: 'Premium',
//     amount: '₹4,999.00',
//     transactionId: `TXN_${Date.now()}`,
//     date: new Date().toLocaleDateString()
//   };

//   return (
//     <div className="ps-page">
//       <div className="ps-container">
//         <div className="ps-card">
//           {/* Success Icon */}
//           <div className="ps-success-icon">
//             <div className="ps-icon-circle">
//               <CheckCircle size={48} className="ps-check-icon" />
//             </div>
//           </div>

//           {/* Success Message */}
//           <div className="ps-content">
//             <h1 className="ps-title">Payment Successful!</h1>
//             <p className="ps-subtitle">
//               Your subscription has been activated successfully.
//             </p>

//             {/* Payment Details */}
//             <div className="ps-payment-details">
//               <div className="ps-detail-item">
//                 <span className="ps-detail-label">Plan</span>
//                 <span className="ps-detail-value">{paymentData.planName}</span>
//               </div>
//               <div className="ps-detail-item">
//                 <span className="ps-detail-label">Amount</span>
//                 <span className="ps-detail-value ps-amount">{paymentData.amount}</span>
//               </div>
//               <div className="ps-detail-item">
//                 <span className="ps-detail-label">Transaction ID</span>
//                 <span className="ps-detail-value ps-mono">{paymentData.transactionId}</span>
//               </div>
//               <div className="ps-detail-item">
//                 <span className="ps-detail-label">Date</span>
//                 <span className="ps-detail-value">{paymentData.date}</span>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="ps-actions">
//               <button 
//                 className="ps-btn-primary"
//                 onClick={() => navigate('/profile')}
//               >
//                 <Receipt size={18} />
//                 View Profile
//               </button>
//               <Link to="/" className="ps-btn-secondary">
//                 <Home size={18} />
//                 Go to Dashboard
//               </Link>
//             </div>

//             {/* Additional Info */}
//             <div className="ps-info-box">
//               <div className="ps-info-icon">
//                 <CheckCircle size={16} />
//               </div>
//               <div className="ps-info-text">
//                 <strong>Next Steps:</strong> You can now access all features included in your {paymentData.planName} plan. Your subscription will auto-renew at the end of the billing period.
//               </div>
//             </div>
//           </div>

//           {/* Back Button */}
//           <button 
//             className="ps-back-btn"
//             onClick={() => navigate(-1)}
//           >
//             <ArrowLeft size={16} />
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;


import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Home, Receipt, ArrowLeft } from 'lucide-react';
import '../styles/PaymentSuccess.css';

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ GET QUERY PARAMS
  const searchParams = new URLSearchParams(location.search);

  const transactionId =
    searchParams.get("transaction_id") ||
    searchParams.get("txnid") || // PayU default
    `TXN_${Date.now()}`;

  const amount =
    searchParams.get("amount") ||
    "0.00";

  const status = searchParams.get("status") || "success";

  // Optional: plan name (if you pass)
  const planName =
    searchParams.get("plan") || "Premium";

  const paymentData = {
    planName,
    amount: `₹${amount}`,
    transactionId,
    date: new Date().toLocaleDateString(),
    status
  };

  return (
    <div className="ps-page">
      <div className="ps-container">
        <div className="ps-card">

          {/* Success Icon */}
          <div className="ps-success-icon">
            <div className="ps-icon-circle">
              <CheckCircle size={48} className="ps-check-icon" />
            </div>
          </div>

          {/* Content */}
          <div className="ps-content">
            <h1 className="ps-title">
              {paymentData.status === "success"
                ? "Payment Successful!"
                : "Payment Failed"}
            </h1>

            <p className="ps-subtitle">
              {paymentData.status === "success"
                ? "Your subscription has been activated successfully."
                : "Something went wrong with your payment."}
            </p>

            {/* Payment Details */}
            {/* <div className="ps-payment-details">
              <div className="ps-detail-item">
                <span className="ps-detail-label">Plan</span>
                <span className="ps-detail-value">{paymentData.planName}</span>
              </div>

              <div className="ps-detail-item">
                <span className="ps-detail-label">Amount</span>
                <span className="ps-detail-value ps-amount">
                  {paymentData.amount}
                </span>
              </div>

              <div className="ps-detail-item">
                <span className="ps-detail-label">Transaction ID</span>
                <span className="ps-detail-value ps-mono">
                  {paymentData.transactionId}
                </span>
              </div>

              <div className="ps-detail-item">
                <span className="ps-detail-label">Date</span>
                <span className="ps-detail-value">
                  {paymentData.date}
                </span>
              </div>
            </div> */}

            {/* Actions */}
            <div className="ps-actions">
              <button
                className="ps-btn-primary"
                onClick={() => navigate('/profile')}
              >
                <Receipt size={18} />
                View Profile
              </button>

              <Link to="/" className="ps-btn-secondary">
                <Home size={18} />
                Go to Dashboard
              </Link>
            </div>

            {/* Info */}
            <div className="ps-info-box">
              <div className="ps-info-icon">
                <CheckCircle size={16} />
              </div>
              <div className="ps-info-text">
                <strong>Next Steps:</strong> You can now access all features in your {paymentData.planName} plan.
              </div>
            </div>
          </div>

          {/* Back */}
          <button
            className="ps-back-btn"
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

export default PaymentSuccess;