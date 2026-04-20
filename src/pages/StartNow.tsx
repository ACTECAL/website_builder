import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/StartNow.css';

export const StartNow: React.FC = () => {
  const [search] = useSearchParams();
  const selected = useMemo(() => {
    const v = (search.get('selected') || '').trim();
    if (!v) return [] as string[];
    const arr = v.split(',').map(s => s.trim()).filter(Boolean);
    // unique
    return Array.from(new Set(arr));
  }, [search]);

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    country: 'India',
    language: 'English',
    size: '1 - 5 employees',
    interest: 'Use it in my company'
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const payload = {
      selected,
      form,
      createdAt: new Date().toISOString()
    };
    try {
      const res = await fetch('/api/start-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const qs = selected.length ? `?selected=${encodeURIComponent(selected.join(','))}` : '';
      navigate(`/get-started${qs}`);
    } catch (err) {
      // Fallback: persist locally so data is not lost
      try {
        const key = 'nexora_start_now_submissions';
        const prev = JSON.parse(localStorage.getItem(key) || '[]');
        prev.push(payload);
        localStorage.setItem(key, JSON.stringify(prev));
        const qs = selected.length ? `?selected=${encodeURIComponent(selected.join(','))}` : '';
        navigate(`/get-started${qs}`);
      } catch (e2) {
        setError('Could not save your submission. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const qsSelected = selected.length ? `?selected=${encodeURIComponent(selected.join(','))}` : '';


  return (
    <main className="start-now-main">
      <section className="start-now-section">
        <div className="container start-now-container">
          <div className="start-now-header">
            <div className="start-now-count">
              {selected.length} {selected.length === 1 ? 'app' : 'apps'} selected
            </div>
            <Link to={`/choose-apps${qsSelected}`} className="start-now-change-btn">
              Change apps selection
            </Link>
          </div>

          {error && (
            <div className="start-now-error">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="start-now-form">
            <input
              name="name"
              placeholder="First and Last Name"
              aria-label="First and Last Name"
              value={form.name}
              onChange={onChange}
              className="start-now-field"
              required
            />
            <input
              name="company"
              placeholder="Company Name"
              aria-label="Company Name"
              value={form.company}
              onChange={onChange}
              className="start-now-field"
              required
            />
            <div className="start-now-row-2">
              <input
                name="email"
                type="email"
                placeholder="Email"
                aria-label="Email"
                value={form.email}
                onChange={onChange}
                className="start-now-field"
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="+91"
                aria-label="Phone number"
                value={form.phone}
                onChange={onChange}
                className="start-now-field"
              />
            </div>
            <div className="start-now-row-2">
              <select name="country" aria-label="Country" value={form.country} onChange={onChange} className="start-now-field">
                {['India', 'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Australia', 'Canada'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select name="language" aria-label="Language" value={form.language} onChange={onChange} className="start-now-field">
                {['English', 'Hindi', 'Spanish', 'French', 'German'].map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div className="start-now-row-2">
              <select name="size" aria-label="Company size" value={form.size} onChange={onChange} className="start-now-field">
                {['1 - 5 employees', '6 - 25 employees', '26 - 100 employees', '100+ employees'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select name="interest" aria-label="Interest" value={form.interest} onChange={onChange} className="start-now-field">
                {['Use it in my company', 'Evaluate for a client', 'Academic use', 'Other'].map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div className="start-now-footer-text">
              By clicking on <strong>Start Now</strong>, you accept our <Link to="/terms">Subscription Agreement</Link> and <Link to="/privacy">Privacy Policy</Link>
            </div>

            <div className="start-now-submit-row">
              <button type="submit" className="start-now-submit-btn" disabled={submitting}>
                {submitting ? 'Processing…' : 'Start Now'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default StartNow;
