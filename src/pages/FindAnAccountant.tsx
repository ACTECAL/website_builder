import React from 'react';
import '../styles/CommunitySubpage.css';
import { Link } from 'react-router-dom';

export const FindAnAccountant: React.FC = () => {
  const accountants = [
    { name: 'LedgerPro Associates', city: 'London, UK', specialties: ['SMB Accounting','VAT','Payroll'] },
    { name: 'BrightBooks LLP', city: 'Toronto, CA', specialties: ['Tax','Audit','Reporting'] },
    { name: 'Harmony Finance', city: 'Sydney, AU', specialties: ['Bookkeeping','Automation','Advisory'] },
  ];
  const [filter, setFilter] = React.useState<string>('All');
  return (
    <main>
      <section style={{ padding: '40px 24px' }}>
        <div className="community-subpage-container">
          <h1 className="community-card-title-nomargin">Find an Accountant</h1>
          <p style={{ color: '#4a5568', marginTop: 10 }}>Work with Nexora‑ready accountants for bookkeeping, tax, and advisory.</p>
        </div>
      </section>
      <section className="community-subpage-section">
        <div className="community-subpage-container">
          <div className="community-subpage-mb">
            <Link to="/community" className="community-back-link" reloadDocument>← Back to Community</Link>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {['All','Bookkeeping','Tax','Audit','Automation','Advisory','Payroll'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                style={{ border: '1px solid #e2e8f0', borderRadius: 999, padding: '6px 10px', fontSize: 12, background: filter===tag?'#edf2ff':'#fff', color: filter===tag?'#2b6cb0':'#2d3748', cursor:'pointer' }}
              >{tag}</button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
            {accountants
              .filter((a) => filter==='All' || a.specialties.includes(filter))
              .map((a) => (
              <div key={a.name} className="community-subpage-card">
                <h4 style={{ margin: '0 0 6px' }}>{a.name}</h4>
                <p className="community-card-desc">{a.city}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 10 }}>
                  {a.specialties.map((s) => (
                    <span key={s} style={{ border: '1px solid #e2e8f0', borderRadius: 999, padding: '4px 8px', fontSize: 12 }}>{s}</span>
                  ))}
                </div>
                <button className="btn btn-outline-primary" type="button" style={{ marginTop: 10 }}>Contact</button>
              </div>
            ))}
          </div>
          <div className="community-flex-group">
            <Link to="/find-a-partner" className="btn btn-outline-primary" reloadDocument>Browse Partners</Link>
            <Link to="/support" className="btn btn-outline-primary" reloadDocument>Need help?</Link>
          </div>
        </div>
      </section>
    </main>
  );
};
