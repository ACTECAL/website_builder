import React from 'react';
import '../styles/AppDirectory.css';

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
    <section className="app-directory-section">
      <div className="app-directory-header">
        <h3 className="app-directory-title">{title}</h3>
        <p className="app-directory-subtitle">{subtitle}</p>
      </div>
      <div className="apps-grid-container">
        {items.map((app, idx) => (
          <div key={idx} className="app-card">
            <div className="app-icon-wrapper">
              <span className="app-icon-inner">{app.icon}</span>
            </div>
            <div className="app-name-label">{app.name}</div>
          </div>
        ))}
      </div>

      <div className="app-directory-footer">
        <div className="toggle-info">
          <span className="mock-toggle">
            <span className="mock-toggle-knob" />
          </span>
          <span className="toggle-label">Imagine without bizsuite</span>
        </div>
        <a href="/solutions" className="view-all-apps-link">
          View all Apps <span>→</span>
        </a>
      </div>
    </section>
  );
};

export default AppDirectory;


