import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Profile.css';
import {
  User, Mail, Shield, Calendar, LogOut, Edit2,
  CheckCircle2, AlertCircle, Settings, ChevronRight,
  Bell, Lock, Zap,
  Database
} from 'lucide-react';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, userAttributes, signOut, isAuthenticated, getJwtToken } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [backendUser, setBackendUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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

      const response = await fetch('https://api-admindev.actecal.com/admin/auth/me', {
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

  // Fetch backend data when component mounts
  React.useEffect(() => {
    if (isAuthenticated && userAttributes?.email) {
      fetchBackendUserData();
    }
  }, [isAuthenticated, userAttributes?.email]);

  /* initials from email */
  const initials = userAttributes?.email
    ? userAttributes.email.slice(0, 2).toUpperCase()
    : 'ME';


    const getModules = (modulesData: any): string[] => {
  if (!modulesData) return [];

  // Agar already array hai
  if (Array.isArray(modulesData)) {
    return modulesData;
  }

  // Agar string hai (JSON string)
  if (typeof modulesData === 'string') {
    try {
      const parsed = JSON.parse(modulesData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      console.error('Failed to parse modules:', e);
      return [];
    }
  }

  return [];
};
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

        {/* Modules Information */}
     {/* Modules Information */}
<div className="pf-card">
  <div className="pf-card-hdr">
    <h2 className="pf-card-title">
      <div className="pf-card-title-icon" style={{ background: '#f0fdf4', color: '#16a34a' }}>
        <Zap size={18} />
      </div>
      Modules & Permissions
    </h2>
  </div>
  <div className="pf-card-body">
    {(() => {
      const modulesList = getModules(backendUser?.modules);
      
      return modulesList.length > 0 ? (
        <div className="pf-modules-grid">
          {modulesList.map((module: string, index: number) => (
            <div key={index} className="pf-module-badge">
              <span className="pf-module-icon">📦</span>
              <span className="pf-module-name">
                {module.replace('erp:', '').replace('_', ' ')}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="pf-info-value">
          No modules assigned yet
        </div>
      );
    })()}
  </div>
</div>
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
              {/* <button className="pf-edit-btn">
                <Edit2 size={14} /> Edit
              </button> */}
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

                {/* <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Domain</div>
                  <div className="pf-info-value pf-mono">
                  "https://  {backendUser?.domain || 'Not available'}
                  </div>
                </div> */}

<div className="pf-info-item">
  <div className="pf-info-label">
    <Calendar size={14} /> Domain
  </div>


  <div className="pf-info-value pf-mono" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    {backendUser?.domain ? (
      <>
        <a
          href={`https://${backendUser.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#2563eb', textDecoration: 'none', flex: 1 }}
          onMouseOver={(e) => (e.currentTarget.style.textDecoration = 'underline')}
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = 'none')}
        >
          https://{backendUser.domain}
        </a>

        <button
          onClick={() => {
            navigator.clipboard.writeText(`https://${backendUser.domain}`);
            // You can replace alert with a proper toast notification
            const btn = document.activeElement as HTMLButtonElement;
            if (btn) {
              btn.style.color = '#16a34a';
              setTimeout(() => btn.style.color = '#64748b', 1500);
            }
            alert('✅ Domain copied to clipboard');
          }}
          title="Copy to clipboard"
          style={{
            background: 'none',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            padding: '4px 8px',
            cursor: 'pointer',
            fontSize: '13px',
            color: '#64748b',
          }}
        >
          Copy
        </button>
      </>
    ) : (
      'Not available'
    )}
  </div>

</div>
                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Subscription</div>
                  <div className="pf-info-value">
                    <span className ="pf-badge pf-badge-blue">
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

                <div className="pf-info-item">
                  <div className="pf-info-label"><Database size={14} /> Database</div>
                  <div className="pf-info-value pf-mono">
                    {backendUser?.db_name || 'Not available'}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Shield size={14} /> Contact Name</div>
                  <div className="pf-info-value">
                    {backendUser?.contact_name || 'Not available'}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Industry</div>
                  <div className="pf-info-value">
                    {backendUser?.industry || 'Not available'}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Created At</div>
                  <div className="pf-info-value">
                    {backendUser?.created_at ? formatDate(backendUser.created_at) : 'Not available'}
                  </div>
                </div>

                <div className="pf-info-item">
                  <div className="pf-info-label"><Calendar size={14} /> Code</div>
                  <div className="pf-info-value pf-mono">
                    {backendUser?.code || 'Not available'}
                  </div>
                </div>

              </div>
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
      </div>
    </div>
  );
};

export default Profile;