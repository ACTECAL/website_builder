import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import '../styles/Apps.css';

type SuggestionFormData = {
  name: string;
  category: string;
  description: string;
};

// Define the app structure
type AppItem = {
  name: string;
  icon: string; // FontAwesome class
  color: string;
  category: string;
  isInstalled?: boolean;
};

// Full Odoo App List
const allApps: AppItem[] = [
  // Finance
  { name: 'Accounting', icon: 'fa-coins', color: '#00A09D', category: 'FINANCE' },
  { name: 'Invoicing', icon: 'fa-file-invoice-dollar', color: '#00A09D', category: 'FINANCE' },
  { name: 'Expenses', icon: 'fa-receipt', color: '#00A09D', category: 'FINANCE' },
  { name: 'Spreadsheet', icon: 'fa-table', color: '#00A09D', category: 'FINANCE' },
  { name: 'Documents', icon: 'fa-file', color: '#00A09D', category: 'FINANCE' },
  { name: 'Sign', icon: 'fa-signature', color: '#00A09D', category: 'FINANCE' },

  // Sales
  { name: 'CRM', icon: 'fa-handshake', color: '#714B67', category: 'SALES' },
  { name: 'Sales', icon: 'fa-chart-line', color: '#714B67', category: 'SALES' },
  { name: 'Point of Sale', icon: 'fa-cash-register', color: '#714B67', category: 'SALES' },
  { name: 'Subscriptions', icon: 'fa-rotate', color: '#714B67', category: 'SALES' },
  { name: 'Rental', icon: 'fa-key', color: '#714B67', category: 'SALES' },

  // Website
  { name: 'Website', icon: 'fa-globe', color: '#3498DB', category: 'WEBSITES' },
  { name: 'eCommerce', icon: 'fa-cart-shopping', color: '#3498DB', category: 'WEBSITES' },
  { name: 'eLearning', icon: 'fa-graduation-cap', color: '#3498DB', category: 'WEBSITES' },
  { name: 'Live Chat', icon: 'fa-comments', color: '#3498DB', category: 'WEBSITES' },

  // Supply Chain
  { name: 'Inventory', icon: 'fa-boxes-stacked', color: '#E67E22', category: 'SUPPLY CHAIN' },
  { name: 'Manufacturing', icon: 'fa-industry', color: '#E67E22', category: 'SUPPLY CHAIN' },
  { name: 'Purchase', icon: 'fa-cart-plus', color: '#E67E22', category: 'SUPPLY CHAIN' },

  // HR
  { name: 'Employees', icon: 'fa-users', color: '#E74C3C', category: 'HUMAN RESOURCES' },
  { name: 'Recruitment', icon: 'fa-user-plus', color: '#E74C3C', category: 'HUMAN RESOURCES' },
  { name: 'Time Off', icon: 'fa-plane', color: '#E74C3C', category: 'HUMAN RESOURCES' },
  { name: 'Appraisals', icon: 'fa-star', color: '#E74C3C', category: 'HUMAN RESOURCES' },

  // Marketing
  { name: 'Marketing Automation', icon: 'fa-robot', color: '#2ECC71', category: 'MARKETING' },
  { name: 'Email Marketing', icon: 'fa-envelope', color: '#2ECC71', category: 'MARKETING' },
  { name: 'Events', icon: 'fa-calendar-check', color: '#2ECC71', category: 'MARKETING' },

  // Services
  { name: 'Project', icon: 'fa-diagram-project', color: '#F1C40F', category: 'SERVICES' },
  { name: 'Timesheets', icon: 'fa-clock', color: '#F1C40F', category: 'SERVICES' },
  { name: 'Field Service', icon: 'fa-truck-fast', color: '#F1C40F', category: 'SERVICES' },
  { name: 'Helpdesk', icon: 'fa-headset', color: '#F1C40F', category: 'SERVICES' },

  // Productivity
  { name: 'Discuss', icon: 'fa-message', color: '#8E44AD', category: 'PRODUCTIVITY' },
  { name: 'Knowledge', icon: 'fa-book-open', color: '#8E44AD', category: 'PRODUCTIVITY' },
  { name: 'IoT', icon: 'fa-wifi', color: '#8E44AD', category: 'PRODUCTIVITY' },
];

const categories = Array.from(new Set(allApps.map(app => app.category)));

export const Apps: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'All';
  const [filter, setFilter] = useState(currentCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [suggestionForm, setSuggestionForm] = useState<SuggestionFormData>({
    name: '',
    category: '',
    description: ''
  });

  const filteredApps = allApps.filter(app => {
    const matchesCategory = filter === 'All' || app.category === filter;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSuggestAppClick = () => {
    setShowPopup(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSuggestionForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you could send the suggestion to a server or handle it as needed
    alert('Thank you for your app suggestion!');
    setSuggestionForm({ name: '', category: '', description: '' });
    setShowPopup(false);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSuggestionForm({ name: '', category: '', description: '' });
  };

  return (
    <div className="apps-catalog">
      {/* Header Bar */}
      <header className="apps-header">
        <div className="apps-header-inner">
          <div className="apps-search-wrap">
            <i className="fa-solid fa-search apps-search-icon"></i>
            <input
              type="text"
              className="apps-search-input"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="apps-category-pills">
            <button
              className={`apps-category-pill ${filter === 'All' ? 'active' : ''}`}
              onClick={() => { setFilter('All'); setSearchParams({}); }}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                className={`apps-category-pill ${filter === cat ? 'active' : ''}`}
                onClick={() => { setFilter(cat); setSearchParams({ category: cat }); }}
              >
                {cat.charAt(0) + cat.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Layout: Sidebar + Grid */}
      <main className="apps-main">
        {/* Sidebar */}
        <aside className="apps-sidebar">
          <div className="apps-sidebar-section">
            <div className="apps-sidebar-title">Categories</div>
            <div className="apps-sidebar-list">
              <button
                className={`apps-sidebar-item ${filter === 'All' ? 'active' : ''}`}
                onClick={() => { setFilter('All'); setSearchParams({}); }}
              >
                All Apps
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`apps-sidebar-item ${filter === cat ? 'active' : ''}`}
                  onClick={() => { setFilter(cat); setSearchParams({ category: cat }); }}
                >
                  {cat.charAt(0) + cat.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <section className="apps-grid-section">
          <div className="apps-grid-header">
            <h2 className="apps-grid-title">
              {filter === 'All' ? 'All Apps' : `${filter.charAt(0) + filter.slice(1).toLowerCase()} Apps`}
            </h2>
            <p className="apps-grid-subtitle">
              {filteredApps.length} app{filteredApps.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div className="apps-grid">
            {filteredApps.map((app) => (
              <Link key={app.name} to={`/apps/${app.name.toLowerCase()}`} className="apps-grid-item">
                <div className="apps-grid-icon" style={{ backgroundColor: app.color }}>
                  <i className={`fa-solid ${app.icon}`}></i>
                </div>
                <div className="apps-grid-name">{app.name}</div>
                <div className="apps-grid-desc">{app.category}</div>
              </Link>
            ))}
            <button className="apps-suggest" onClick={handleSuggestAppClick}>
              <div className="apps-suggest-icon">
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="apps-suggest-label">Suggest App</div>
            </button>
          </div>
          {filteredApps.length === 0 && (
            <div className="apps-empty">
              <i className="fa-regular fa-folder-open apps-empty-icon"></i>
              <div className="apps-empty-text">No apps found matching "{searchQuery}"</div>
            </div>
          )}
        </section>
      </main>

      {/* Suggestion Popup Modal */}
      {showPopup && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }} onClick={handleClosePopup}>
          <div className="bg-white rounded-3 shadow-lg p-4" style={{ maxWidth: '500px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Suggest an App</h5>
              <button type="button" className="btn-close" onClick={handleClosePopup}></button>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="appName" className="form-label">App Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="appName"
                  name="name"
                  value={suggestionForm.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="appCategory" className="form-label">Category</label>
                <select
                  className="form-select"
                  id="appCategory"
                  name="category"
                  value={suggestionForm.category}
                  onChange={handleFormChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0) + cat.slice(1).toLowerCase()}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="appDescription" className="form-label">Description</label>
                <textarea
                  className="form-control"
                  id="appDescription"
                  name="description"
                  rows={3}
                  value={suggestionForm.description}
                  onChange={handleFormChange}
                  placeholder="Describe the app you want to suggest..."
                  required
                ></textarea>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary">Submit Suggestion</button>
                <button type="button" className="btn btn-secondary" onClick={handleClosePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Apps;
