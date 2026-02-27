import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import '../styles/Auth.css';

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login } = useAuth();

	const handleSocialLogin = async (provider: string) => {
		setError(null);
		setIsSubmitting(true);
		try {
			// Simulate social login delay
			await new Promise(resolve => setTimeout(resolve, 1000));
			// Mock successful login
			await login(`mock-token-${provider}-${Date.now()}`);
			navigate('/');
		} catch (err: any) {
			setError(`Failed to sign in with ${provider}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
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

	return (
		<div className="auth-page">
			{/* Sidebar Section */}
			<div className="auth-sidebar">
				<div className="auth-sidebar-content">
					<div className="auth-glass-badge">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
						<span>Actyx Enterprise</span>
					</div>

					<h2 className="auth-sidebar-title">
						Professional business management, simplified.
					</h2>

					<div className="auth-feature-list">
						<div className="auth-feature-item">
							<div className="auth-feature-icon-wrapper">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
							</div>
							<div className="auth-feature-text">Integrated App Ecosystem</div>
						</div>

						<div className="auth-feature-item">
							<div className="auth-feature-icon-wrapper">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
							</div>
							<div className="auth-feature-text">Enterprise-Grade Security</div>
						</div>

						<div className="auth-feature-item">
							<div className="auth-feature-icon-wrapper">
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m13 2-2 10h9L7 22l2-10H1L13 2z" /></svg>
							</div>
							<div className="auth-feature-text">Ultra-Fast Cloud Infrastructure</div>
						</div>
					</div>
				</div>
			</div>

			{/* Form Section */}
			<div className="auth-form-container">
				<div className="auth-form-box">
					<h1 className="auth-title">Welcome back</h1>
					<p className="auth-subtitle" style={{ '--delay': '100ms' } as any}>Enter your credentials to access your account</p>

					{error && <div className="auth-error">{error}</div>}

					<form onSubmit={onSubmit} className="auth-form" style={{ '--delay': '200ms' } as any}>
						<div className="auth-input-group">
							<input
								type="email"
								required
								className="auth-input"
								placeholder="Email"
								aria-label="Email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="auth-input-group">
							<input
								type={showPassword ? 'text' : 'password'}
								required
								className="auth-input"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							<button
								type="button"
								className="auth-password-toggle"
								onClick={() => setShowPassword(!showPassword)}
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								<i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
							</button>
						</div>

						<button type="submit" className="auth-primary-btn" disabled={isSubmitting}>
							{isSubmitting ? 'Logging in...' : 'Login'}
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
						Already have an account? <Link to="/signup">Sign up</Link>
					</div>


				</div>
			</div>
		</div>
	);
};
