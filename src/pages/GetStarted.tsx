import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Check, User, Grid3X3, FileText, Rocket } from 'lucide-react';
import '../styles/GetStarted.css';

type AppItem = {
  key: string;
  label: string;
  icon: string;
  color: string;
  category: string;
};

type Category = {
  name: string;
  tiles: AppItem[];
};

const CATEGORIES: Category[] = [
  {
    name: 'Website',
    tiles: [
      { key: 'website', label: 'Website', icon: 'fa-solid fa-globe', color: '#00A09D', category: 'Website' },
      { key: 'ecommerce', label: 'eCommerce', icon: 'fa-solid fa-cart-shopping', color: '#00A09D', category: 'Website' },
      { key: 'blog', label: 'Blog', icon: 'fa-solid fa-pen-nib', color: '#00A09D', category: 'Website' },
      { key: 'forum', label: 'Forum', icon: 'fa-solid fa-comments', color: '#00A09D', category: 'Website' },
      { key: 'elearning', label: 'eLearning', icon: 'fa-solid fa-graduation-cap', color: '#00A09D', category: 'Website' },
      { key: 'events', label: 'Events', icon: 'fa-solid fa-calendar-days', color: '#00A09D', category: 'Website' },
    ],
  },
  {
    name: 'Sales',
    tiles: [
      { key: 'crm', label: 'CRM', icon: 'fa-solid fa-users', color: '#714B67', category: 'Sales' },
      { key: 'sales', label: 'Sales', icon: 'fa-solid fa-chart-line', color: '#714B67', category: 'Sales' },
      { key: 'pos', label: 'Point of Sale', icon: 'fa-solid fa-store', color: '#714B67', category: 'Sales' },
      { key: 'restaurant', label: 'Restaurant', icon: 'fa-solid fa-utensils', color: '#714B67', category: 'Sales' },
      { key: 'subscriptions', label: 'Subscriptions', icon: 'fa-solid fa-arrows-rotate', color: '#714B67', category: 'Sales' },
      { key: 'rental', label: 'Rental', icon: 'fa-solid fa-key', color: '#714B67', category: 'Sales' },
    ],
  },
  {
    name: 'Finance',
    tiles: [
      { key: 'invoicing', label: 'Invoicing', icon: 'fa-solid fa-file-invoice-dollar', color: '#F0AD4E', category: 'Finance' },
      { key: 'accounting', label: 'Accounting', icon: 'fa-solid fa-coins', color: '#F0AD4E', category: 'Finance' },
      { key: 'expenses', label: 'Expenses', icon: 'fa-solid fa-wallet', color: '#F0AD4E', category: 'Finance' },
      { key: 'sign', label: 'Sign', icon: 'fa-solid fa-signature', color: '#F0AD4E', category: 'Finance' },
    ],
  },
  {
    name: 'Services',
    tiles: [
      { key: 'project', label: 'Project', icon: 'fa-solid fa-diagram-project', color: '#5BC0DE', category: 'Services' },
      { key: 'timesheets', label: 'Timesheets', icon: 'fa-solid fa-stopwatch', color: '#5BC0DE', category: 'Services' },
      { key: 'field-service', label: 'Field Service', icon: 'fa-solid fa-bolt', color: '#5BC0DE', category: 'Services' },
      { key: 'helpdesk', label: 'Helpdesk', icon: 'fa-solid fa-headphones', color: '#5BC0DE', category: 'Services' },
    ],
  },
];

export const GetStarted: React.FC = () => {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const initialSelectedApps = (search.get('selected') || '').split(',').filter(Boolean);

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedApps, setSelectedApps] = useState<string[]>(initialSelectedApps);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    companyName: '',
    phone: '',
    interest: 'Use it in my company',
    employees: 'Less than 5 employees',
    appDescription: ''
  });

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Tell us about yourself', icon: User },
    { id: 2, title: 'Select Apps', description: 'Choose your business apps', icon: Grid3X3 },
    { id: 3, title: 'Describe Your App', description: 'Tell us your business needs', icon: FileText },
    { id: 4, title: 'Build Your App', description: 'Ready to launch', icon: Rocket }
  ];

  useEffect(() => {
    // Auto-navigate to step 2 if apps are pre-selected
    if (initialSelectedApps.length > 0 && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [initialSelectedApps, currentStep]);

  const toggleAppSelection = (appKey: string) => {
    setSelectedApps(prev =>
      prev.includes(appKey)
        ? prev.filter(key => key !== appKey)
        : [...prev, appKey]
    );
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to launch plan with all data
    navigate('/launch-plan', {
      state: {
        formData,
        selectedApps
      }
    });
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.companyName;
      case 2:
        return selectedApps.length > 0;
      case 3:
        return formData.appDescription.trim().length >= 10;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-fields">
            <div className="step-heading">
              <User size={24} />
              Personal Information
            </div>

            <div className="form-fields-full fields-animate">
              <div className="form-row">
                <div className="field-group-full">
                  <label className="field-label-full">
                    <i className="fa-solid fa-user"></i>
                    Name <span className="required">*</span>
                  </label>
                  <input
                    required
                    className="field-input-full"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="field-group-full">
                  <label className="field-label-full">
                    <i className="fa-solid fa-envelope"></i>
                    Email <span className="required">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    className="field-input-full"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="field-group-full">
                <label className="field-label-full">
                  <i className="fa-solid fa-building"></i>
                  Company Name <span className="required">*</span>
                </label>
                <input
                  required
                  className="field-input-full"
                  placeholder="Acme Inc."
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="field-group-full">
                  <label className="field-label-full">
                    <i className="fa-solid fa-phone"></i>
                    Phone Number
                  </label>
                  <input
                    className="field-input-full"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="field-group-full">
                  <label className="field-label-full">
                    <i className="fa-solid fa-users"></i>
                    Company Size
                  </label>
                  <select
                    className="field-input-full field-select"
                    value={formData.employees}
                    onChange={e => setFormData({ ...formData, employees: e.target.value })}
                  >
                    <option>Less than 5 employees</option>
                    <option>5 - 20 employees</option>
                    <option>20 - 50 employees</option>
                    <option>50 - 250 employees</option>
                    <option>250+ employees</option>
                  </select>
                </div>
              </div>

              <div className="field-group-full">
                <label className="field-label-full">
                  <i className="fa-solid fa-bullseye"></i>
                  Primary Interest
                </label>
                <select
                  className="field-input-full field-select"
                  value={formData.interest}
                  onChange={e => setFormData({ ...formData, interest: e.target.value })}
                >
                  <option>Use it in my company</option>
                  <option>Offer it to my customers</option>
                  <option>Student / Education</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-fields">
            <div className="step-heading">
              <Grid3X3 size={24} />
              Select Your Apps
            </div>

            <div className="app-selection-container">
              <div className="selected-apps-summary">
                <div className="apps-count">
                  <i className="fa-solid fa-check-circle"></i>
                  {selectedApps.length} app{selectedApps.length !== 1 ? 's' : ''} selected
                </div>
                {selectedApps.length === 0 && (
                  <div className="selection-hint">
                    <i className="fa-solid fa-exclamation-triangle"></i>
                    Please select at least one app
                  </div>
                )}
              </div>

              <div className="apps-categories">
                {CATEGORIES.map((category) => (
                  <div key={category.name} className="apps-category">
                    <h3 className="category-title">{category.name}</h3>
                    <div className="apps-grid">
                      {category.tiles.map((app) => {
                        const isSelected = selectedApps.includes(app.key);
                        return (
                          <div
                            key={app.key}
                            className={`app-tile ${isSelected ? 'selected' : ''}`}
                            onClick={() => toggleAppSelection(app.key)}
                          >
                            {isSelected && (
                              <div className="selection-indicator">
                                <Check size={14} />
                              </div>
                            )}
                            <div
                              className="app-icon"
                              style={{ backgroundColor: app.color }}
                            >
                              <i className={app.icon}></i>
                            </div>
                            <span className="app-label">{app.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-fields">
            <div className="step-heading">
              <FileText size={24} />
              Describe Your App
            </div>

            <div className="field-group-full">
              <label className="field-label-full">
                <i className="fa-solid fa-file-alt"></i>
                Business Description <span className="required">*</span>
              </label>
              <textarea
                required
                className="field-textarea-full"
                placeholder="Describe your business needs, what you want to achieve with your app, and any specific requirements..."
                value={formData.appDescription}
                onChange={e => setFormData({ ...formData, appDescription: e.target.value })}
                rows={8}
              />
              <div className="character-count">
                {formData.appDescription.length} characters (minimum 10)
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-fields">
            <div className="step-heading">
              <Rocket size={24} />
              Ready to Build Your App
            </div>

            <div className="text-center">
              <div className="mb-4">
                <h4 className="text-success mb-3">
                  <Check size={32} className="me-2" />
                  All set! Your app will be built based on your selections.
                </h4>
                <p className="text-muted">
                  We'll use your personal information, selected apps, and business description to create a customized solution.
                </p>
              </div>

              <div className="bg-light p-4 rounded mb-4">
                <h5 className="mb-3">Summary:</h5>
                <div className="text-start">
                  <p><strong>Name:</strong> {formData.name}</p>
                  <p><strong>Company:</strong> {formData.companyName}</p>
                  <p><strong>Selected Apps:</strong> {selectedApps.join(', ')}</p>
                  <p><strong>Description:</strong> {formData.appDescription.substring(0, 100)}...</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="getstarted-fullpage">
      {/* Background Elements */}

      <div className="hero-section-full in">
        <div className="hero-content-full">
          <div className="hero-title-full">
            <span>Build Your App</span>
            <span>in Minutes</span>
          </div>
          <p className="hero-subtitle-full">
            Tell us about your business, select the apps you need, and describe your requirements. We'll build a customized solution just for you.
          </p>
        </div>
      </div>

      <div className="form-section-full in">
        <div className="form-container-full">
          {/* Progress Indicator */}
          <div className="form-progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
            <div className="progress-header">
              <div className="progress-text">
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
              </div>
            </div>
          </div>

          {/* Step Navigation */}
          <div className="step-navigation">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isCompleted = currentStep > step.id;
              const isActive = currentStep === step.id;
              const isAccessible = step.id <= currentStep || (step.id === currentStep + 1 && canProceedToNext());

              return (
                <button
                  key={step.id}
                  className={`step-nav-item ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} ${isAccessible ? 'accessible' : ''}`}
                  onClick={() => isAccessible && setCurrentStep(step.id)}
                  disabled={!isAccessible}
                >
                  <div className="step-info">
                    <div className="step-icon">
                      {isCompleted ? <Check size={16} /> : <IconComponent size={16} />}
                    </div>
                    <div className="step-title">{step.title}</div>
                    <div className="step-description">{step.description}</div>
                  </div>
                  {isCompleted && <Check size={16} className="step-check" />}
                </button>
              );
            })}
          </div>

          {/* Step Content */}
          <div className="step-content">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="form-actions-full">
            <div className="step-buttons">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="btn-secondary-full"
                  onClick={prevStep}
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>
              )}

              {currentStep < steps.length ? (
                <button
                  type="button"
                  className="btn-primary-full"
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                >
                  Next
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-primary-full"
                  onClick={handleSubmit}
                  disabled={!canProceedToNext()}
                >
                  <Rocket size={18} />
                  Build My App
                </button>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-4 small text-muted">
            By proceeding, you agree to our <Link to="/terms" className="text-muted text-decoration-underline">Terms of Service</Link> and <Link to="/privacy" className="text-muted text-decoration-underline">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};
