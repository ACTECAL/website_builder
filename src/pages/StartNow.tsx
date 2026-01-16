import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

const fieldStyle: React.CSSProperties = {
  padding: '12px 14px',
  border: '1px solid #e5e7eb',
  borderRadius: 10,
  width: '100%'
};

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
  const [saved, setSaved] = useState(false);
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
        const key = 'actyx_start_now_submissions';
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

  if (saved) {
    return (
      <main>
        <section className="section" style={{ background: 'var(--surface)' }}>
          <div className="container" style={{ maxWidth: 720 }}>
            <div style={{
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 14,
              padding: '22px 24px',
              boxShadow: '0 14px 36px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}>
              <h2 style={{ margin: '0 0 10px' }}>You're all set!</h2>
              <p style={{ margin: 0, color: '#64748b' }}>We saved your details{` and `}{selected.length} {selected.length === 1 ? 'app' : 'apps'} selection.</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16, flexWrap: 'wrap' }}>
                <Link to={`/apps${selected.length ? `?selected=${encodeURIComponent(selected.join(','))}` : ''}`} className="btn btn-primary">Go to Apps</Link>
                <Link to="/" className="btn">Back to Home</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: 12,
            padding: '14px 16px',
            marginBottom: 18,
            boxShadow: '0 6px 16px rgba(0,0,0,0.06)'
          }}>
            <div style={{ fontWeight: 800, color: '#111827' }}>
              {selected.length} {selected.length === 1 ? 'app' : 'apps'} selected
            </div>
            <Link to={`/choose-apps${qsSelected}`} className="btn" style={{ border: '1px solid #e5e7eb', background: '#fff' }}>
              Change apps selection
            </Link>
          </div>

          {error && (
            <div style={{ background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 10, padding: '10px 12px', marginBottom: 10 }}>
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 14 }}>
            <input
              name="name"
              placeholder="First and Last Name"
              value={form.name}
              onChange={onChange}
              style={fieldStyle}
              required
            />
            <input
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={onChange}
              style={fieldStyle}
              required
            />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={onChange}
                style={fieldStyle}
                required
              />
              <input
                name="phone"
                type="tel"
                placeholder="+91"
                value={form.phone}
                onChange={onChange}
                style={fieldStyle}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <select name="country" value={form.country} onChange={onChange} style={fieldStyle}>
                {['India', 'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Australia', 'Canada'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select name="language" value={form.language} onChange={onChange} style={fieldStyle}>
                {['English', 'Hindi', 'Spanish', 'French', 'German'].map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <select name="size" value={form.size} onChange={onChange} style={fieldStyle}>
                {['1 - 5 employees', '6 - 25 employees', '26 - 100 employees', '100+ employees'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select name="interest" value={form.interest} onChange={onChange} style={fieldStyle}>
                {['Use it in my company', 'Evaluate for a client', 'Academic use', 'Other'].map(i => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div style={{ textAlign: 'center', color: '#6b7280', fontSize: '.95rem', marginTop: 6 }}>
              By clicking on <strong>Start Now</strong>, you accept our <Link to="/terms">Subscription Agreement</Link> and <Link to="/privacy">Privacy Policy</Link>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button type="submit" className="btn btn-primary" disabled={submitting} style={{
                background: 'var(--color-primary)',
                color: '#fff',
                fontWeight: 800,
                padding: '14px 28px',
                borderRadius: 12,
                boxShadow: '0 14px 28px rgba(108, 92, 231, 0.25)'
              }}>
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
