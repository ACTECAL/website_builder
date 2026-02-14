import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ActyxLogoComponent } from '../components/ActyxLogoComponent';
import { ArrowLeft } from 'lucide-react';

export const Login: React.FC = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { login } = useAuth();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);
		try {
			await login(email, password);
			navigate('/');
		} catch (err: any) {
			setError(err.message || 'Something went wrong');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="d-flex min-vh-100 bg-white">
			{/* Left Side: Illustrative/Info */}
			<div className="d-none d-lg-flex flex-column justify-content-between col-lg-6 p-5 text-white position-relative overflow-hidden"
				style={{ backgroundColor: '#714B67' }}>
				<div className="position-relative z-1">
					<ActyxLogoComponent />
					<p className="lead opacity-75 mt-4" style={{ maxWidth: '400px' }}>
						The all-in-one suite of business apps.
						<br />
						No more painful integrations.
					</p>
				</div>

				{/* Abstract Shapes/Design */}
				<div className="position-absolute top-0 end-0 bg-white opacity-10 rounded-circle"
					style={{ width: '600px', height: '600px', filter: 'blur(80px)', transform: 'translate(30%, -30%)', background: '#875A7B' }}></div>
				<div className="position-absolute bottom-0 start-0 bg-secondary opacity-25 rounded-circle"
					style={{ width: '400px', height: '400px', filter: 'blur(60px)', transform: 'translate(-30%, 30%)', background: '#00A09D' }}></div>

				<div className="position-relative z-1">
					<p className="small opacity-75 mb-0"> 2024 Actyx Inc.</p>
				</div>
			</div>

			{/* Right Side: Form */}
			<div className="col-12 col-lg-6 d-flex flex-column justify-content-center px-4 px-md-5 bg-white">
				<div className="w-100 mx-auto" style={{ maxWidth: '400px' }}>
					<Link to="/" className="d-inline-flex align-items-center text-muted text-decoration-none mb-5 hover-text-primary transition-colors small fw-medium">
						<ArrowLeft size={16} className="me-2" />
						Back to Home
					</Link>

					<h2 className="display-6 fw-bold mb-3 ls-tight">Log in to Actyx</h2>
					<p className="text-muted mb-5">Welcome back! Please enter your details.</p>

					{error && (
						<div className="alert alert-danger d-flex align-items-center small py-2 mb-4" role="alert">
							<i className="fa-solid fa-circle-exclamation me-2"></i>
							{error}
						</div>
					)}

					<form onSubmit={onSubmit} className="d-flex flex-column gap-3">
						<div>
							<label className="form-label small fw-bold text-secondary">Email</label>
							<input
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="form-control form-control-lg fs-6"
								placeholder="name@company.com"
								style={{ borderColor: '#DEE2E6', padding: '0.75rem 1rem' }}
							/>
						</div>

						<div>
							<label className="form-label small fw-bold text-secondary">Password</label>
							<input
								type={showPassword ? 'text' : 'password'}
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="form-control form-control-lg fs-6"
								placeholder="••••••••"
								style={{ borderColor: '#DEE2E6', padding: '0.75rem 1rem' }}
							/>
						</div>

						<div className="d-flex justify-content-between align-items-center mb-2">
							<div className="form-check">
								<input
									type="checkbox"
									className="form-check-input"
									id="showPasswordCheck"
									checked={showPassword}
									onChange={(e) => setShowPassword(e.target.checked)}
									style={{ cursor: 'pointer' }}
								/>
								<label className="form-check-label small text-muted cursor-pointer" htmlFor="showPasswordCheck">
									Show password
								</label>
							</div>
							<Link to="/forgot-password" className="small text-primary text-decoration-none fw-bold hover-underline">Forgot password?</Link>
						</div>

						<button
							type="submit"
							disabled={isSubmitting}
							className="btn btn-primary btn-lg w-100 fw-bold py-3 mt-2 shadow-sm"
							style={{ fontSize: '1rem' }}
						>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
						</button>
					</form>

					<p className="text-center mt-5 mb-0 text-muted small">
						Don't have an account? <Link to="/signup" className="text-primary fw-bold text-decoration-none hover-underline">Sign up for Actyx</Link>
					</p>
				</div>
			</div>

			<style>{`
        .hover-text-primary:hover { color: var(--o-color-primary) !important; }
        .hover-underline:hover { text-decoration: underline !important; }
        .form-control:focus { border-color: var(--o-color-primary); box-shadow: 0 0 0 0.25rem rgba(113, 75, 103, 0.15); }
      `}</style>
		</div>
	);
};
