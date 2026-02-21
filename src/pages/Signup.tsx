import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/Auth.css';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    logo: null as File | null,
    companyName: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { login } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxBytes = 2 * 1024 * 1024;
      if (!/^image\//.test(file.type)) {
        setErrors((prev: any) => ({ ...prev, form: 'Logo must be an image file.' }));
        return;
      }
      if (file.size > maxBytes) {
        setErrors((prev: any) => ({ ...prev, form: 'Logo must be less than 2MB.' }));
        return;
      }
      setFormData({ ...formData, logo: file });
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setErrors({});
    setIsSubmitting(true);
    try {
      // Simulate social login delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock successful login
      await login(`mock-token-${provider}-${Date.now()}`);
      navigate('/');
    } catch (err: any) {
      setErrors({ form: `Failed to sign up with ${provider}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('companyName', formData.companyName);
      if (formData.logo) {
        payload.append('logo', formData.logo);
      }

      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          body: payload,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || `Failed to create account (code ${res.status})`);
        }

        const data = await res.json();
        await login(data.token);
        setSubmitted(true);
      } catch (err: any) {
        setErrors({ form: err.message || 'Something went wrong' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="auth-page">
        <div className="auth-form-container">
          <div className="auth-form-box" style={{ textAlign: 'center' }}>
            <h1 className="auth-title">Success!</h1>
            <p style={{ color: '#64748b', marginBottom: 24 }}>Registration Successful!</p>
            <p style={{ color: '#64748b', marginBottom: 32 }}>Thank you for signing up. You are now logged in.</p>
            <button onClick={() => navigate('/')} className="auth-primary-btn" style={{ width: '100%' }}>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      {/* Sidebar Section */}
      <div className="auth-sidebar">
        <div className="auth-sidebar-content">
          <div className="auth-glass-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L7 22l2-10H1L13 2z" /></svg>
            <span>Join Actyx</span>
          </div>

          <h2 className="auth-sidebar-title">
            Start scaling your business with Actyx.
          </h2>

          <div className="auth-feature-list">
            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <div className="auth-feature-text">Over 10,000 active users</div>
            </div>

            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              </div>
              <div className="auth-feature-text">Available in 50+ countries</div>
            </div>

            <div className="auth-feature-item">
              <div className="auth-feature-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l4-4V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v10z" /><path d="M3 19v-7a4 4 0 0 1 4-4h3" /></svg>
              </div>
              <div className="auth-feature-text">24/7 Expert Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="auth-form-container">
        <div className="auth-form-box">
          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle" style={{ '--delay': '100ms' } as any}>Join thousands of businesses managing with Actyx</p>

          {errors.form && <div className="auth-error">{errors.form}</div>}

          <form onSubmit={handleSubmit} className="auth-form" style={{ '--delay': '200ms' } as any}>
            <div className="auth-input-group">
              <input
                type="text"
                name="name"
                required
                className="auth-input"
                placeholder="Full name"
                value={formData.name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name && <small style={{ color: '#c53030', marginTop: 4, display: 'block' }}>{errors.name}</small>}
            </div>

            <div className="auth-input-group">
              <input
                type="email"
                name="email"
                required
                className="auth-input"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <small style={{ color: '#c53030', marginTop: 4, display: 'block' }}>{errors.email}</small>}
            </div>

            <div className="auth-input-group">
              <input
                type="text"
                name="companyName"
                required
                className="auth-input"
                placeholder="Company name"
                value={formData.companyName}
                onChange={handleChange}
              />
              {errors.companyName && <small style={{ color: '#c53030', marginTop: 4, display: 'block' }}>{errors.companyName}</small>}
            </div>

            <div className="auth-input-group">
              <label style={{ fontSize: 13, color: '#64748b', fontWeight: 600, marginBottom: 8, display: 'block' }}>Company Logo (Optional)</label>
              <input
                id="file-upload"
                type="file"
                name="logo"
                onChange={handleFileChange}
                className="auth-input"
                style={{ padding: '10px' }}
                accept="image/*"
              />
              {formData.logo && <small style={{ color: '#64748b', marginTop: 4, display: 'block' }}>{formData.logo.name}</small>}
            </div>

            <button type="submit" className="auth-primary-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider" style={{ '--delay': '300ms' } as any}>
            <span>or</span>
          </div>

          <div className="auth-social-list" style={{ '--delay': '400ms' } as any}>
            <button className="auth-social-btn" onClick={() => handleSocialLogin('Google')}>
              <i className="fa-brands fa-google" style={{ color: '#EA4335' }}></i>
              Google
            </button>
            <button className="auth-social-btn" onClick={() => handleSocialLogin('Apple')}>
              <i className="fa-brands fa-apple" style={{ fontSize: 20 }}></i>
              Apple
            </button>
            <button className="auth-social-btn" onClick={() => handleSocialLogin('Twitter')}>
              <i className="fa-brands fa-x-twitter" style={{ fontSize: 18 }}></i>
              Twitter
            </button>
          </div>

          <div className="auth-switch" style={{ '--delay': '500ms' } as any}>
            Already have an account? <Link to="/login">Sign in</Link>
          </div>



          <p style={{ marginTop: 32, textAlign: 'center', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
            By signing up, you agree to our <Link to="/terms" style={{ color: '#0f172a', fontWeight: 700 }}>Terms</Link> and <Link to="/privacy" style={{ color: '#0f172a', fontWeight: 700 }}>Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};
