import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ActyxLogo } from '../components/ActyxLogo';
import { ArrowLeft, Upload, CheckCircle } from 'lucide-react';

export const Signup: React.FC = () => {
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
      newErrors.email = 'Invalid email address';
    }
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
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
          throw new Error(data.message || `Failed to create account(code ${res.status})`);
        }

        const data = await res.json();
        await login(data.token);
        setSubmitted(true);
      } catch (err: any) {
        setErrors({ form: err.message || 'Something went wrong. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (submitted) {
    return (
      <div className="d-flex min-vh-100 bg-light align-items-center justify-content-center p-4">
        <div className="bg-white p-5 rounded-4 shadow text-center w-100" style={{ maxWidth: '480px' }}>
          <div className="d-inline-flex align-items-center justify-content-center mb-4 rounded-circle bg-success-subtle text-success"
            style={{ width: '64px', height: '64px' }}>
            <CheckCircle size={32} />
          </div>
          <h2 className="display-6 fw-bold mb-3 text-dark">Welcome aboard!</h2>
          <p className="text-muted mb-5">
            Your account has been created successfully. You are now logged in and ready to start your journey.
          </p>
          <Link
            to="/"
            className="btn btn-primary btn-lg w-100 py-3 fw-bold"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex min-vh-100 bg-white">
      {/* Left Side */}
      <div className="d-none d-lg-flex flex-column justify-content-between col-lg-6 p-5 text-white position-relative overflow-hidden"
        style={{ backgroundColor: '#714B67' }}>
        <div className="position-relative z-1">
          <ActyxLogo className="mb-4" style={{ height: '48px' }} />
          <p className="lead opacity-90" style={{ maxWidth: '400px' }}>
            Join 15 million users who grow their business with Actyx.
          </p>
          <ul className="list-unstyled mt-5 d-flex flex-column gap-3 opacity-75 lead fs-6">
            <li className="d-flex align-items-center gap-3"><CheckCircle size={20} /> Integrated apps</li>
            <li className="d-flex align-items-center gap-3"><CheckCircle size={20} /> Simple and user-friendly</li>
            <li className="d-flex align-items-center gap-3"><CheckCircle size={20} /> Loved by users</li>
          </ul>
        </div>

        {/* Abstract Shapes */}
        <div className="position-absolute top-0 end-0 bg-secondary opacity-25 rounded-circle"
          style={{ width: '600px', height: '600px', filter: 'blur(80px)', transform: 'translate(30%, -30%)', background: '#00A09D' }}></div>
        <div className="position-absolute bottom-0 start-0 bg-dark opacity-10 rounded-circle"
          style={{ width: '400px', height: '400px', filter: 'blur(60px)', transform: 'translate(-30%, 30%)', background: '#53354D' }}></div>

        <div className="position-relative z-1">
          <p className="small opacity-75 mb-0">© 2024 Actyx Inc.</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="col-12 col-lg-6 d-flex flex-column justify-content-center px-4 px-md-5 bg-white">
        <div className="w-100 mx-auto py-5" style={{ maxWidth: '440px' }}>
          <Link to="/" className="d-inline-flex align-items-center text-muted text-decoration-none mb-5 hover-text-primary transition-colors small fw-medium">
            <ArrowLeft size={16} className="me-2" />
            Back to Home
          </Link>

          <h2 className="display-6 fw-bold mb-3 ls-tight">Get started with Actyx</h2>
          <p className="text-muted mb-5">Create your free account. No credit card required.</p>

          {errors.form && (
            <div className="alert alert-danger small py-2 mb-4" role="alert">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div style={{display:"flex",flexDirection:"column"}}>
              <label className="form-label small fw-bold text-secondary">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`form - control form - control - lg fs - 6 ${errors.name ? 'is-invalid' : ''} `}
                style={{ padding: '0.75rem 1rem' }}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div style={{display:"flex",flexDirection:"column"}}>
              <label className="form-label small fw-bold text-secondary">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className={`form - control form - control - lg fs - 6 ${errors.email ? 'is-invalid' : ''} `}
                style={{ padding: '0.75rem 1rem' }}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div style={{display:"flex",flexDirection:"column"}}>
              <label className="form-label small fw-bold text-secondary">Company Name</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Acme Inc."
                className={`form - control form - control - lg fs - 6 ${errors.companyName ? 'is-invalid' : ''} `}
                style={{ padding: '0.75rem 1rem' }}
              />
              {errors.companyName && <div className="invalid-feedback">{errors.companyName}</div>}
            </div>

            {/* File Upload */}
            <div>
              <label className="form-label small fw-bold text-secondary">Company Logo (Optional)</label>
              <div className="d-flex align-items-center gap-3">
                <label className="d-flex align-items-center justify-content-center w-100 p-3 border border-2 border-dashed rounded text-muted cursor-pointer hover-bg-light transition-colors"
                  style={{ borderColor: '#dee2e6' }}>
                  <input type="file" name="logo" onChange={handleFileChange} className="d-none" accept="image/*" />
                  <div className="d-flex align-items-center gap-2 small fw-medium">
                    <Upload size={18} />
                    <span>{formData.logo ? 'Change file' : 'Upload logo'}</span>
                  </div>
                </label>
                {logoPreview && (
                  <div className="flex-shrink-0" style={{ width: '48px', height: '48px' }}>
                    <img src={logoPreview} alt="Preview" className="w-100 h-100 rounded object-fit-cover border" />
                  </div>
                )}
              </div>
              {formData.logo && <div className="small text-muted mt-1 text-truncate">{formData.logo.name}</div>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg w-100 fw-bold py-3 mt-3 shadow-sm"
              style={{ fontSize: '1rem' }}
            >
              {isSubmitting ? 'Creating account...' : 'Start Free Trial'}
            </button>
          </form>

          <p className="text-center mt-5 mb-0 text-muted small">
            Already have an account? <Link to="/login" className="text-primary fw-bold text-decoration-none hover-underline">Log in to Actyx</Link>
          </p>

          <p className="mt-4 text-center text-muted" style={{ fontSize: '0.75rem' }}>
            By signing up, you agree to our <Link to="/terms" className="text-muted text-decoration-underline">Terms</Link> and <Link to="/privacy" className="text-muted text-decoration-underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      <style>{`
  .hover - bg - light:hover { background - color: #f8f9fa; border - color: var(--o - color - primary)!important; color: var(--o - color - primary); }
        .hover - text - primary:hover { color: var(--o - color - primary)!important; }
        .hover - underline:hover { text - decoration: underline!important; }
        .form - control:focus { border - color: var(--o - color - primary); box - shadow: 0 0 0 0.25rem rgba(113, 75, 103, 0.15); }
`}</style>
    </div>
  );
};
