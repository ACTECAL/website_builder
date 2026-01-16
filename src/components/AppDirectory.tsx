import React from 'react';

type AppItem = {
  name: string;
  icon: React.ReactNode;
};

interface AppDirectoryProps {
  items?: AppItem[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_APPS: AppItem[] = [
  { name: 'Accounting', icon: <i className="fa-solid fa-coins" aria-hidden="true"></i> },
  { name: 'Knowledge', icon: <i className="fa-solid fa-book-open" aria-hidden="true"></i> },
  { name: 'Sign', icon: <i className="fa-solid fa-pen" aria-hidden="true"></i> },
  { name: 'CRM', icon: <i className="fa-solid fa-handshake" aria-hidden="true"></i> },
  { name: 'Studio', icon: <i className="fa-solid fa-puzzle-piece" aria-hidden="true"></i> },
  { name: 'Subscriptions', icon: <i className="fa-solid fa-arrows-rotate" aria-hidden="true"></i> },
  { name: 'Rental', icon: <i className="fa-solid fa-key" aria-hidden="true"></i> },
  { name: 'Point of Sale', icon: <i className="fa-solid fa-store" aria-hidden="true"></i> },
  { name: 'Discuss', icon: <i className="fa-solid fa-comments" aria-hidden="true"></i> },
  { name: 'Documents', icon: <i className="fa-regular fa-folder-open" aria-hidden="true"></i> },
  { name: 'Project', icon: <i className="fa-solid fa-diagram-project" aria-hidden="true"></i> },
  { name: 'Timesheets', icon: <i className="fa-solid fa-stopwatch" aria-hidden="true"></i> },
  { name: 'Field Service', icon: <i className="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i> },
  { name: 'Planning', icon: <i className="fa-solid fa-calendar-days" aria-hidden="true"></i> },
  { name: 'Helpdesk', icon: <i className="fa-solid fa-headset" aria-hidden="true"></i> },
  { name: 'Website', icon: <i className="fa-solid fa-globe" aria-hidden="true"></i> },
  { name: 'Social Marketing', icon: <i className="fa-solid fa-bullhorn" aria-hidden="true"></i> },
  { name: 'Email Marketing', icon: <i className="fa-solid fa-envelope" aria-hidden="true"></i> },
  { name: 'Purchase', icon: <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i> },
  { name: 'Inventory', icon: <i className="fa-solid fa-box" aria-hidden="true"></i> },
  { name: 'Manufacturing', icon: <i className="fa-solid fa-industry" aria-hidden="true"></i> },
  { name: 'Sales', icon: <i className="fa-solid fa-chart-line" aria-hidden="true"></i> },
  { name: 'HR', icon: <i className="fa-solid fa-users" aria-hidden="true"></i> },
  { name: 'Dashboard', icon: <i className="fa-solid fa-gauge" aria-hidden="true"></i> }
];

export const AppDirectory: React.FC<AppDirectoryProps> = ({ items = DEFAULT_APPS, title = 'Choose your apps', subtitle = 'Start with one. Add more anytime.' }) => {
  return (
    <section style={{ background: '#f8fafc', padding: '28px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto 10px', textAlign: 'center' }}>
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Powered by Actyx</h2>
          <p className="text-muted">Extensible, scalable, and fully integrated.</p>
        </div>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: 24,
        maxWidth: 1100,
        margin: '0 auto'
      }}>
        {items.map((app, idx) => (
          <div key={idx} style={{ textAlign: 'center', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 14px 30px rgba(0,0,0,0.08)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; }}
          >
            <div style={{
              width: 72,
              height: 72,
              margin: '0 auto 10px',
              borderRadius: 12,
              background: 'linear-gradient(180deg, #ffffff 0%, #f1f5f9 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: 28, lineHeight: 0, color: '#4f46e5' }}>{app.icon}</span>
            </div>
            <div style={{ fontSize: 12, color: '#111827' }}>{app.name}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '16px auto 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#64748b' }}>
          <span style={{ display: 'inline-block', width: 36, height: 18, background: '#e5e7eb', borderRadius: 9999, position: 'relative' }}>
            <span style={{ position: 'absolute', top: 2, left: 2, width: 14, height: 14, background: 'white', borderRadius: '50%' }} />
          </span>
          <span style={{ fontSize: 13 }}>Imagine without bizsuite</span>
        </div>
        <a href="/apps" style={{ color: '#0f766e', textDecoration: 'none', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          View all Apps <span>→</span>
        </a>
      </div>
    </section>
  );
};

export default AppDirectory;


