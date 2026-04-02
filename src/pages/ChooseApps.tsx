import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/ChooseApps.css";
import ModuleGrid from "../components/ModuleGrid";
import PRODUCTS, { Product } from "../data/products";

export const ChooseApps: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const v = searchParams.get("selected");
    if (v) {
      setSelectedIds(v.split(",").map(s => s.trim()).filter(Boolean));
    }
  }, [searchParams]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

  const handleToggleAll = (product: Product) => {
    const moduleIds = product.modules.map(m => m.id);
    const allSelected = moduleIds.length > 0 && moduleIds.every(id => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds(prev => prev.filter(k => !moduleIds.includes(k)));
    } else {
      setSelectedIds(prev => Array.from(new Set([...prev, ...moduleIds])));
    }
  };

  const onContinue = () => {
    const qs = selectedIds.length ? `?selected=${encodeURIComponent(selectedIds.join(","))}` : "";
    navigate(`/get-started${qs}`);
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return selectedProduct ? [selectedProduct] : [];
    }
    const lower = searchTerm.toLowerCase();
    return PRODUCTS.map((prod) => ({
      ...prod,
      modules: prod.modules.filter(
        (mod) =>
          mod.name.toLowerCase().includes(lower) ||
          mod.description.toLowerCase().includes(lower) ||
          mod.id.toLowerCase().includes(lower)
      ),
    })).filter((prod) => prod.modules.length > 0);
  }, [selectedProduct, searchTerm]);

  const count = selectedIds.length;

  return (
    <div className="choose-apps-page auth-page">
      {/* Sidebar */}
      <div className="auth-sidebar">
        <div className="auth-sidebar-content">
          <div className="auth-glass-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5L20 7" /></svg>
            <span>Actyx Enterprise</span>
          </div>

          <div className="auth-ambient-blob blob-1"></div>
          <div className="auth-ambient-blob blob-2"></div>
          <div className="auth-ambient-blob blob-3"></div>

          <div className="auth-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`particle p-${i % 5}`} style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.1 + Math.random() * 0.3
              }}></div>
            ))}
          </div>

          <h2 className="auth-sidebar-title">Build your perfect business stack.</h2>
          <p className="auth-sidebar-subtitle">Choose the tools that fit your workflow — all connected out of the box.</p>

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

          {count > 0 && (
            <div className="sidebar-apps-count">
              <div className="sidebar-count-badge">{count}</div>
              <span>{count === 1 ? "app" : "apps"} selected</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="auth-form-container choose-apps-content-wrapper">
        <div className="auth-form-box choose-apps-form-box">
          
          <div className="choose-step-indicator stagger-0">
            <div className="step-item step-done"><div className="step-dot"><i className="fa-solid fa-check"></i></div><span>Account</span></div>
            <div className="step-line"></div>
            <div className="step-item step-active"><div className="step-dot"><span>2</span></div><span>Choose Apps</span></div>
            <div className="step-line"></div>
            <div className="step-item"><div className="step-dot"><span>3</span></div><span>Setup</span></div>
          </div>

          <header className="choose-head stagger-0">
            <div className="choose-head-row">
              <div>
                <h1 className="auth-title">Choose your apps</h1>
                <p className="auth-subtitle">Pick the tools you need — everything connects automatically.</p>
              </div>
              {count > 0 && (
                <div className="choose-count-pill" onClick={onContinue} title="Continue">
                  <span className="count-num">{count}</span>
                  <span className="count-label">{count === 1 ? "app" : "apps"}</span>
                  <i className="fa-solid fa-arrow-right count-arrow"></i>
                </div>
              )}
            </div>
          </header>

          <div className="choose-search-container stagger-1">
            <div className="choose-search-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                type="text"
                placeholder="Search apps by name or feature..."
                className="choose-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="search-clear-btn" onClick={() => setSearchTerm("")} title="Clear">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          <div className="choose-tabs-wrapper stagger-2">
            <div className="choose-tabs">
              {PRODUCTS.map((prod) => {
                const prodSelectedCount = prod.modules.filter(m => selectedIds.includes(m.id)).length;
                return (
                  <button
                    key={prod.name}
                    className={`choose-tab ${selectedProduct?.name === prod.name && !searchTerm ? "tab-active" : ""}`}
                    onClick={() => { setSelectedProduct(prod); setSearchTerm(""); }}
                  >
                    <i className={`${prod.icon} tab-icon`}></i>
                    {prod.name}
                    {prodSelectedCount > 0 && <span className="tab-count">{prodSelectedCount}</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="choose-layout stagger-3">
            <div className="choose-main">
              {searchTerm && (
                <div className="search-count-bar">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  {filteredProducts.reduce((acc, p) => acc + p.modules.length, 0)} results for "<strong>{searchTerm}</strong>"
                </div>
              )}

              {filteredProducts.length > 0 ? (
                filteredProducts.map((prod) => (
                  <div key={prod.name} style={{ marginBottom: searchTerm ? '40px' : '0' }}>
                    <ModuleGrid 
                      modules={prod.modules}
                      selectedIds={selectedIds}
                      onToggle={handleToggle}
                      onToggleAll={() => handleToggleAll(prod)}
                      accentColor={prod.color}
                      icon={prod.icon}
                      isSwitching={false}
                      titleOverride={searchTerm ? `${prod.name} (${prod.modules.length})` : undefined}
                    />
                  </div>
                ))
              ) : searchTerm ? (
                <div className="no-results">
                  <div className="no-results-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </div>
                  <p>
                    No apps matching "<strong>{searchTerm}</strong>"
                  </p>
                  <button className="clear-search-link" onClick={() => setSearchTerm("")}>
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="choose-empty-prompt animate-fade-in">
                  <div className="empty-prompt-icon">
                    <i className="fa-solid fa-layer-group"></i>
                  </div>
                  <h3>Select a workspace to get started</h3>
                  <p>Choose a category above to view and select the modules you need for your business.</p>
                </div>
              )}
            </div>
          </div>

        {/* Floating Selection Panel remains mostly the same, tailored to IDs instead of Tiles */}
        {count > 0 && (
          <aside className="choose-aside">
            <div className="choose-selected-header">
              <div className="aside-header-left">
                <div className="aside-count-circle">{count}</div>
                <div>
                  <div className="aside-title">{count === 1 ? "App" : "Apps"} selected</div>
                  <div className="aside-subtitle">Ready to configure</div>
                </div>
              </div>
              <button className="aside-clear-btn" onClick={() => setSelectedIds([])} title="Clear all">
                Clear all
              </button>
            </div>

            <div className="choose-selected-list">
              {selectedIds.map((key) => {
                // Find module info from PRODUCTS for selected tags
                let foundModule = null;
                let foundProduct = null;
                for (let p of PRODUCTS) {
                  const m = p.modules.find(mod => mod.id === key);
                  if (m) {
                    foundModule = m;
                    foundProduct = p;
                    break;
                  }
                }
                if (!foundModule || !foundProduct) return null;
                
                return (
                  <div key={key} className="choose-selected-item">
                    <div className="choose-selected-icon-wrap" style={{ backgroundColor: `${foundProduct.color}22` }}>
                      <i className={foundProduct.icon} style={{ color: foundProduct.color }} aria-hidden="true"></i>
                    </div>
                    <div className="choose-selected-label">{foundModule.name}</div>
                    <button className="choose-selected-remove" onClick={() => handleToggle(key)} title={`Remove ${foundModule.name}`}>
                      <i className="fa-solid fa-xmark"></i>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="choose-info">
              <i className="fa-solid fa-infinity"></i>
              <span><strong>Free forever</strong> — unlimited users & storage.</span>
            </div>

            <button className="continue-btn" onClick={onContinue}>
              <span>Continue with {count} {count === 1 ? "app" : "apps"}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </aside>
        )}
      </div>
    </div>
  </div>
  );
};

export default ChooseApps;
