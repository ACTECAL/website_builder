import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';
import {
  User, Mail, Shield, Calendar, LogOut, Edit2,
  CheckCircle2, AlertCircle, Settings, ChevronRight,
  Bell, Lock, Zap, X, Users
} from 'lucide-react';
 export const BASE_URL =
  process.env.REACT_APP_ENV === "local"
    ? "http://localhost:4000"
    : "https://api-admindev.actecal.com"
export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, userAttributes, signOut, isAuthenticated, getJwtToken } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [backendUser, setBackendUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out error:', error);
      setMessage({ type: 'error', text: 'Failed to sign out. Please try again.' });
      setIsSigningOut(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  // Fetch backend user data
  const fetchBackendUserData = async () => {
    if (!userAttributes?.email) return;
    
    setIsLoading(true);
    try {
      // Get the JWT token from AWS Cognito
      const jwtToken = await getJwtToken();
      
      if (!jwtToken) {
        console.error('No JWT token available');
        return;
      }

      const response = await fetch(`${BASE_URL}/admin/auth/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          email: userAttributes.email
        })
      });

      if (response.ok) {
        const data = await response.json();
        setBackendUser(data.user);
        console.log('Backend user data:', data.user);
      } else {
        console.error('Failed to fetch backend user data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching backend user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch subscription data
  const fetchSubscriptionData = async () => {
    if (!backendUser?.id) return;
    
    try {
      const response = await fetch(`${BASE_URL}/api/subscriptions/current/${backendUser.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSubscriptionData(data.data);
        console.log('Subscription data:', data.data);
      } else {
        console.error('Failed to fetch subscription data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching subscription data:', error);
    }
  };

  // Fetch backend data when component mounts
  React.useEffect(() => {
    if (isAuthenticated && userAttributes?.email) {
      fetchBackendUserData();
    }
  }, [isAuthenticated, userAttributes?.email]);

  // Fetch subscription plans
  const fetchPlans = async () => {
    setIsLoadingPlans(true);
    try {
      const response = await fetch(`${BASE_URL}/api/subscriptions/plans`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPlans(data.data);
        console.log('Available plans:', data.data);
      } else {
        console.error('Failed to fetch plans:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  // Handle upgrade button click
  const handleUpgradeClick = () => {
    setShowUpgradeModal(true);
    fetchPlans();
  };

  // Handle plan selection
  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
  if (!selectedPlan || !backendUser) {
    setMessage({ type: 'error', text: 'Please select a plan and try again.' });
    return;
  }

  setIsProcessingPayment(true);
  setMessage(null);

  try {
    const payload = {
      subscription_id: selectedPlan.id,
      company_id: backendUser.id || backendUser.company_id,
      amount: parseFloat(selectedPlan.price),
      customer_name: backendUser.name || userAttributes?.email?.split('@')[0] || "User",
      customer_email: backendUser.email || userAttributes?.email,
      customer_phone: backendUser.phone || "9876543210",
      product_info: `${selectedPlan.name} - ${selectedPlan.billing_cycle || 'Monthly'} Subscription`
    };

    const response = await fetch(`${BASE_URL}/api/subscriptions/payu/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!result.success || !result.data?.form_data) {
      throw new Error(result.error || 'Failed to initiate payment with PayU');
    }

    const { payment_url, form_data } = result.data;

    console.log("🚀 Sending to PayU:", form_data);

    // === Create & Submit Form to PayU ===
    const form = document.createElement('form');
    form.action = payment_url;
    form.method = 'POST';
    form.style.display = 'none';

    Object.keys(form_data).forEach(key => {
      if (form_data[key] !== undefined && form_data[key] !== null) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(form_data[key]);
        form.appendChild(input);
      }
    });

    document.body.appendChild(form);
    
    // Submit form
    setTimeout(() => {
      form.submit();
    }, 150);

  } catch (error: any) {
    console.error('Payment initiation error:', error);
    setMessage({
      type: 'error',
      text: error.message || 'Payment gateway failed. Please try again.'
    });
  } finally {
    setIsProcessingPayment(false);
  }
};
  // Initiate PayU payment
  const initiatePayUPayment = async (plan: any, paymentId: string) => {
    try {
      // For now, simulate PayU payment
      // In production, this would integrate with actual PayU SDK/API
      console.log('Initiating PayU payment for plan:', plan.name, 'Payment ID:', paymentId);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful payment (90% success rate for demo)
      const isSuccess = Math.random() > 0.1;
      
      if (isSuccess) {
        return { 
          success: true, 
          paymentId: paymentId,
          transactionId: `TXN_${Date.now()}`,
          amount: plan.price
        };
      } else {
        return { 
          success: false, 
          error: 'Payment failed' 
        };
      }
    } catch (error) {
      console.error('PayU payment error:', error);
      return { success: false, error: 'PayU payment failed' };
    }
  };

  // Process payment through backend API
  const processPayment = async (subscriptionId: number, amount: number, providerPaymentId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/payment/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
          amount: amount,
          provider: 'manual',
          provider_payment_id: providerPaymentId
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Payment processed successfully:', data);
        return { success: true, data };
      } else {
        console.error('Payment processing failed:', response.status, response.statusText);
        return { success: false, error: 'API call failed' };
      }
    } catch (error) {
      console.error('Payment API error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  // Fetch subscription data when backend user is loaded
  React.useEffect(() => {
    if (backendUser?.id) {
      fetchSubscriptionData();
    }
  }, [backendUser?.id]);

  /* initials from email */
  const initials = userAttributes?.email
    ? userAttributes.email.slice(0, 2).toUpperCase()
    : 'ME';

  /* not authenticated */
  if (!isAuthenticated) {
    return (
      <div className="pf-gate">
        <div className="pf-gate-card">
          <div className="pf-gate-icon"><Lock size={28} /></div>
          <h2 className="pf-gate-title">Not Authenticated</h2>
          <p className="pf-gate-sub">Please sign in to view your profile.</p>
          <Link to="/login" className="pf-btn pf-btn-blue">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pf-page">
      <div className="pf-container">

        {/* ── HEADER ──────────────────────────────────── */}
        <div className="pf-header">
          <div className="pf-header-left">
            <div className="pf-avatar">{initials}</div>
            <div>
              <h1 className="pf-title">My Profile</h1>
              <p className="pf-subtitle">Manage your account settings and preferences</p>
            </div>
          </div>
          <button
            className="pf-signout-btn"
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut
              ? <><span className="pf-spinner" /> Signing out…</>
              : <><LogOut size={15} /> Sign Out</>}
          </button>
        </div>

        {/* ── MESSAGE ─────────────────────────────────── */}
        {message && (
          <div className={`pf-msg pf-msg-${message.type}`} role="alert">
            {message.type === 'success'
              ? <CheckCircle2 size={15} />
              : <AlertCircle size={15} />}
            {message.text}
          </div>
        )}

        {/* ── CONTENT GRID ────────────────────────────── */}
        <div className="pf-grid">

          {/* User Information */}
          <div className="pf-card">
            <div className="pf-card-hdr">
              <h2 className="pf-card-title">
                <div className="pf-card-title-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                  <User size={18} />
                </div>
                User Information
              </h2>
              <button className="pf-edit-btn">
                <Edit2 size={14} /> Edit
              </button>
            </div>
            <div className="pf-card-body">
              <div className="pf-info-grid">

                <div className="pf-info-item">
                  <div className="pf-info-label"><Mail size={14} /> Email Address</div>
                  <div className="pf-info-value">
                    {backendUser?.email || userAttributes?.email || 'Not available'}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><User size={14} /> User ID</div>
                  <div className="pf-info-value pf-mono">
                    {backendUser?.id || user?.userId || userAttributes?.sub || 'Not available'}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Shield size={14} /> Account Status</div>
                  <div className="pf-info-value">
                    <span className={`pf-badge pf-badge-${backendUser?.status === 'active' ? 'green' : 'yellow'}`}>
                      <CheckCircle2 size={12} /> {backendUser?.status || 'Active'}
                    </span>
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Mail size={14} /> Email Verified</div>
                  <div className="pf-info-value">
                    {userAttributes?.email_verified === 'true' ? (
                      <span className="pf-badge pf-badge-green">
                        <CheckCircle2 size={12} /> Verified
                      </span>
                    ) : (
                      <span className="pf-badge pf-badge-red">
                        <AlertCircle size={12} /> Not Verified
                      </span>
                    )}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Company Name</div>
                  <div className="pf-info-value">
                    {backendUser?.company_name || 'Not available'}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Domain</div>
                  <div className="pf-info-value pf-mono">
                    {backendUser?.domain || 'Not available'}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Subscription</div>
                  <div className="pf-info-value">
                    <span className="pf-badge pf-badge-blue">
                      {backendUser?.subscription || 'Basic'}
                    </span>
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Account Type</div>
                  <div className="pf-info-value">
                    <span className="pf-badge pf-badge-green">
                      {backendUser?.account_type || 'Demo'}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Subscription & Billing */}
          <div className="pf-card">
            <div className="pf-card-hdr">
              <h2 className="pf-card-title">
                <div className="pf-card-title-icon" style={{ background: '#fef3c7', color: '#f59e0b' }}>
                  <Zap size={18} />
                </div>
                Subscription & Billing
              </h2>
            </div>
            <div className="pf-card-body">
              {subscriptionData ? (
                <div className="pf-subscription-content">
                  <div className="pf-subscription-header">
                    <div className="pf-subscription-plan">
                      <span className="pf-plan-label">Plan:</span>
                      <span className={`pf-plan-name pf-plan-${subscriptionData.status}`}>
                        {subscriptionData.status === 'trial' ? 'Trial' : 
                         subscriptionData.status === 'active' ? 'Premium' : 'Basic'}
                      </span>
                    </div>
                    {subscriptionData.status === 'trial' && (
                      <div className="pf-trial-badge">
                        ⚠️ Trial Period
                      </div>
                    )}
                  </div>
                  
                  <div className="pf-subscription-details">
                    <div className="pf-subscription-item">
                      <div className="pf-subscription-label">Expires:</div>
                      <div className="pf-subscription-value">
                        {subscriptionData.access_valid_till ? 
                          new Date(subscriptionData.access_valid_till).toLocaleDateString('en-US', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          }) : 'Not available'
                        }
                      </div>
                    </div>
                    
                    <div className="pf-subscription-item">
                      <div className="pf-subscription-label">Days Left:</div>
                      <div className="pf-subscription-value">
                        {subscriptionData.access_valid_till ? (
                          <span className={`pf-days-left ${
                            Math.ceil((new Date(subscriptionData.access_valid_till).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) <= 3 ? 'pf-days-critical' : 'pf-days-normal'
                          }`}>
                            {Math.ceil((new Date(subscriptionData.access_valid_till).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                          </span>
                        ) : 'Not available'
                        }
                      </div>
                    </div>
                  </div>

                  <div className="pf-subscription-actions">
                    <button className="pf-upgrade-btn" onClick={handleUpgradeClick}>
                      <Zap size={16} />
                      Upgrade Plan
                    </button>
                  </div>

                  {subscriptionData.status === 'trial' && (
                    <div className="pf-trial-features">
                      <div className="pf-trial-features-title">
                        <Lock size={14} />
                        Premium Features Available:
                      </div>
                      <ul className="pf-trial-features-list">
                        <li>🔒 Advanced Analytics Dashboard</li>
                        <li>🔒 Unlimited User Accounts</li>
                        <li>🔒 Priority Support</li>
                        <li>🔒 Custom Integrations</li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="pf-info-value">
                  Loading subscription information...
                </div>
              )}
            </div>
          </div>

          {/* Account Settings */}
          <div className="pf-card">
            <div className="pf-card-hdr">
              <h2 className="pf-card-title">
                <div className="pf-card-title-icon" style={{ background: '#faf5ff', color: '#7c3aed' }}>
                  <Settings size={18} />
                </div>
                Account Settings
              </h2>
            </div>
            <div className="pf-card-body pf-card-body-flush">
              {[
                {
                  to: '/change-password',
                  icon: <Lock size={18} />,
                  iconBg: '#eff6ff', iconColor: '#2563eb',
                  title: 'Change Password',
                  desc: 'Update your account password',
                },
                {
                  to: '/preferences',
                  icon: <Settings size={18} />,
                  iconBg: '#faf5ff', iconColor: '#7c3aed',
                  title: 'Preferences',
                  desc: 'Manage your application preferences',
                },
                {
                  to: '/notifications',
                  icon: <Bell size={18} />,
                  iconBg: '#fff7ed', iconColor: '#f97316',
                  title: 'Notifications',
                  desc: 'Configure notification settings',
                },
              ].map(item => (
                <Link key={item.to} to={item.to} className="pf-setting-row">
                  <div className="pf-setting-left">
                    <div className="pf-setting-icon"
                      style={{ background: item.iconBg, color: item.iconColor }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="pf-setting-title">{item.title}</div>
                      <div className="pf-setting-desc">{item.desc}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} className="pf-setting-arrow" />
                </Link>
              ))}
            </div>
          </div>

          {/* Session Information */}
          <div className="pf-card">
            <div className="pf-card-hdr">
              <h2 className="pf-card-title">
                <div className="pf-card-title-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
                  <Zap size={18} />
                </div>
                Session Information
              </h2>
            </div>
            <div className="pf-card-body">
              <div className="pf-info-grid">
                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Last Sign In</div>
                  <div className="pf-info-value">{formatDate()}</div>
                </div>
                <div className="pf-info-item">
                  <div className="pf-info-label"><Shield size={14} /> Authentication Method</div>
                  <div className="pf-info-value">
                    <span className="pf-badge pf-badge-blue">AWS Cognito</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Upgrade Modal */}
        {/* {showUpgradeModal && (
          <div className="pf-modal-overlay" onClick={() => setShowUpgradeModal(false)}>
            <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
              <div className="pf-modal-header">
                <h2 className="pf-modal-title">Choose Your Plan</h2>
                <button className="pf-modal-close" onClick={() => setShowUpgradeModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="pf-modal-body">
                {isLoadingPlans ? (
                  <div className="pf-loading-plans">
                    <div className="pf-spinner"></div>
                    <p>Loading available plans...</p>
                  </div>
                ) : (
                  <div className="pf-plans-grid">
                    {plans.map((plan) => (
                      <div 
                        key={plan.id}
                        className={`pf-plan-card ${selectedPlan?.id === plan.id ? 'pf-plan-selected' : ''}`}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        <div className="pf-plan-header">
                          <h3 className="pf-plan-name">{plan.name}</h3>
                          <div className="pf-plan-price">
                            <span className="pf-price-amount">₹{plan.price}</span>
                            <span className="pf-price-period">/{plan.billing_cycle}</span>
                          </div>
                        </div>
                        
                        <p className="pf-plan-description">{plan.description}</p>

                        <button className={`pf-plan-select-btn ${selectedPlan?.id === plan.id ? 'pf-btn-selected' : ''}`}>
                          {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pf-modal-footer">
                <button className="pf-cancel-btn" onClick={() => setShowUpgradeModal(false)}>
                  Cancel
                </button>
                <button 
                  className="pf-pay-btn" 
                  onClick={handlePayment}
                  disabled={!selectedPlan || isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="pf-payment-spinner"></div>
                      Processing Payment...
                    </>
                  ) : (
                    'Proceed to Payment'
                  )}
                </button>
              </div>
            </div>
          </div>
        )} */}

        {showUpgradeModal && (
          <div className="pf-modal-overlay" onClick={() => setShowUpgradeModal(false)}>
            <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
              <div className="pf-modal-header">
                <h2 className="pf-modal-title">Choose Your Plan</h2>
                <button className="pf-modal-close" onClick={() => setShowUpgradeModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="pf-modal-body">
                {isLoadingPlans ? (
                  <div className="pf-loading-plans">
                    <div className="pf-spinner"></div>
                    <p>Loading available plans...</p>
                  </div>
                ) : (
                  <div className="pf-plans-grid">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={`pf-plan-card ${selectedPlan?.id === plan.id ? 'pf-plan-selected' : ''}`}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        <div className="pf-plan-header">
                          <h3 className="pf-plan-name">{plan.name}</h3>
                          <div className="pf-plan-price">
                            <span className="pf-price-amount">₹{plan.price}</span>
                            <span className="pf-price-period">/{plan.billing_cycle}</span>
                          </div>
                        </div>
                        <p className="pf-plan-description">{plan.description}</p>

                        <button className={`pf-plan-select-btn ${selectedPlan?.id === plan.id ? 'pf-btn-selected' : ''}`}>
                          {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pf-modal-footer">
                <button className="pf-cancel-btn" onClick={() => setShowUpgradeModal(false)}>
                  Cancel
                </button>
                <button
                  className="pf-pay-btn"
                  onClick={handlePayment}
                  disabled={!selectedPlan || isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    <>
                      <div className="pf-payment-spinner"></div>
                      Redirecting to PayU...
                    </>
                  ) : (
                    'Proceed to PayU Payment'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;