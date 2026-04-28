import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/Auth.css';
import {
  Eye, EyeOff, Shield, Zap, Link2,
  CheckCircle2, ArrowRight
} from 'lucide-react';

export const Login: React.FC = () => {
  const navigate     = useNavigate();
  const { login }    = useAuth();

  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState<string | null>(null);

  /* ── social login ── */
  const handleSocialLogin = async (provider: string) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await new Promise(r => setTimeout(r, 1000));
      await login(`mock-token-${provider}-${Date.now()}`);
      navigate('/');
    } catch {
      setError(`Failed to sign in with ${provider}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── email login ── */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const res  = await fetch('/api/auth/login', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) throw new Error(data.message || 'Invalid credentials');
        throw new Error(data.message || `Login failed (code ${res.status})`);
      }
      const data = await res.json();
      await login(data.token);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* ── sidebar features ── */
  const features = [
    { icon: <Shield size={20} />,   iconBg: '#f0fdf4', iconColor: '#16a34a', text: 'Enterprise-Grade Security' },
    { icon: <Zap    size={20} />,   iconBg: '#eff6ff', iconColor: '#2563eb', text: 'Ultra-Fast Cloud Infrastructure' },
    { icon: <Link2  size={20} />,   iconBg: '#faf5ff', iconColor: '#7c3aed', text: 'Integrated App Ecosystem' },
  ];

  return (
    <div className="al-page">

      {/* ══ LEFT SIDEBAR ════════════════════════════════ */}
      <aside className="al-sidebar">
        {/* subtle grid texture */}
        <div className="al-sidebar-grid" />

        <div className="al-sidebar-content">
          {/* Logo */}
          <div className="al-logo">
            <div className="al-logo-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L4 14h8l-1 8 9-12h-8l1-8z" fill="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="al-logo-name">Acteal</span>
          </div>

          {/* Badge */}
          <div className="al-badge">
            <CheckCircle2 size={13} />
            <span>Acteal Enterprise Platform</span>
          </div>

          {/* Headline */}
          <h2 className="al-sidebar-title">
            Professional business management,{' '}
            <span className="al-sidebar-title-blue">simplified.</span>
          </h2>

          <p className="al-sidebar-desc">
            One platform, all your business apps. Manage operations, teams,
            and finances from a single secure URL.
          </p>

          {/* Feature cards */}
          <div className="al-feature-list">
            {features.map(f => (
              <div key={f.text} className="al-feature-item">
                <div className="al-feature-icon" style={{ background: f.iconBg, color: f.iconColor }}>
                  {f.icon}
                </div>
                <span className="al-feature-text">{f.text}</span>
              </div>
            ))}
          </div>

          {/* Trusted by */}
          <div className="al-trusted">
            <p className="al-trusted-lbl">Trusted by growing businesses worldwide</p>
            <div className="al-trusted-logos">
              {['HealthPlus', 'NovaCorp', 'BioSynth', 'EduGroup'].map(n => (
                <span key={n} className="al-trusted-logo">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* ══ RIGHT FORM ══════════════════════════════════ */}
      <main className="al-form-side">
        <div className="al-form-box">

          {/* Header */}
          <div className="al-form-header">
            <h1 className="al-title">Welcome back</h1>
            <p className="al-subtitle">Enter your credentials to access your account</p>
          </div>

          {/* Error */}
          {error && (
            <div className="al-error" role="alert">{error}</div>
          )}

          {/* Email / password form */}
          <form onSubmit={onSubmit} className="al-form" noValidate>
            <div className="al-field">
              <label className="al-label" htmlFor="email">Email address</label>
              <input
                id="email" type="email" required
                className="al-input"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="al-field">
              <div className="al-label-row">
                <label className="al-label" htmlFor="password">Password</label>
                <Link to="/forgot-password" className="al-forgot">Forgot password?</Link>
              </div>
              <div className="al-input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="al-input al-input-pw"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="al-pw-toggle"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="al-primary-btn" disabled={isSubmitting}>
              {isSubmitting
                ? <><span className="al-spinner" /> Logging in…</>
                : <>Login <ArrowRight size={15} /></>
              }
            </button>
          </form>

          {/* Divider */}
          <div className="al-divider"><span>or continue with</span></div>

          {/* Social buttons */}
          <div className="al-social-grid">
            {/* Google */}
            <button className="al-social-btn" onClick={() => handleSocialLogin('Google')} disabled={isSubmitting}>
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>

            {/* Apple */}
            <button className="al-social-btn" onClick={() => handleSocialLogin('Apple')} disabled={isSubmitting}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.14-2.2 1.28-2.18 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.35 2.77M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>

            {/* Twitter / X */}
            <button className="al-social-btn" onClick={() => handleSocialLogin('Twitter')} disabled={isSubmitting}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              Twitter
            </button>
          </div>

          {/* Switch to signup */}
          <p className="al-switch">
            Don't have an account?{' '}
            <Link to="/signup" className="al-switch-link">Create one free</Link>
          </p>

        </div>
      </main>
    </div>
  );
};

export default Login;