import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X, User as UserIcon, LogOut, Settings as SettingsIcon, LayoutGrid } from 'lucide-react';
import { ActyxLogoComponent } from './ActyxLogoComponent';
import { useAuth } from '../auth/AuthContext';
import '../styles/navbar-enhanced.css';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getInitials = (userName?: string) => {
    if (!userName) return 'JD';
    const parts = userName.split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  };

  const initials = getInitials(user?.name);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 991);
    const onScroll = () => setScrolled(window.scrollY > 20);

    onResize();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);


  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const megaMenus = useMemo(
    () =>
      [
        {
          key: 'products',
          label: 'Apps',
          to: '/apps',
          sections: [

            {
              title: 'Categories',
              links: [
                { label: 'Finance', to: '/apps?category=FINANCE' },
                { label: 'Sales', to: '/apps?category=SALES' },
                { label: 'Websites', to: '/apps?category=WEBSITES' },
                { label: 'Supply Chain', to: '/apps?category=SUPPLY CHAIN' },
                { label: 'Human Resources', to: '/apps?category=HUMAN RESOURCES' },
                { label: 'Marketing', to: '/apps?category=MARKETING' },
                { label: 'Services', to: '/apps?category=SERVICES' },
                { label: 'Productivity', to: '/apps?category=PRODUCTIVITY' }
              ]
            }
          ]
        },
        {
          key: 'industries',
          label: 'Industries',
          sections: [
            {
              title: 'Use Cases',
              links: [
                { label: 'All Industries', to: '/industries' },
                { label: 'Accounting Firm', to: '/industries/accounting-firm' },
                { label: 'Retail', to: '/industries/retail' },
                { label: 'Manufacturing', to: '/industries/manufacturing' },
                { label: 'Healthcare', to: '/industries/healthcare' }
              ]
            }
          ]
        },
        {
          key: 'resources',
          label: 'Resources',
          sections: [
            {
              title: 'Learn',
              links: [
                { label: 'Docs', to: '/docs' },
                { label: 'Tutorials', to: '/tutorials' },
                { label: 'Blog', to: '/blog' }
              ]
            },
            {
              title: 'Community',
              links: [
                { label: 'Community', to: '/community' },
                { label: 'Forum', to: '/forum' },
                { label: 'Events', to: '/events' }
              ]
            }
          ]
        }
      ],
    []
  );

  const utilityLinks = useMemo(
    () =>
      [
        { label: 'Pricing', to: '/pricing' },
        { label: 'Contact', to: '/contact' }
      ],
    []
  );

  const scheduleClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
    }
    closeTimerRef.current = window.setTimeout(() => setOpenMenu(null), 120);
  };

  const cancelClose = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  return (
    <nav
      className={`navbar sticky-top bg-white transition-all ${scrolled ? 'shadow-sm py-2' : 'py-3 border-bottom'} odoo-header`}
      style={{ zIndex: 1000 }}
    >
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="d-flex align-items-center text-decoration-none me-5">
          <ActyxLogoComponent style={{ fontSize: '1.75rem' }} />
        </Link>

        {!isMobile && (
          <div className="d-flex align-items-center gap-4 flex-grow-1">
            {megaMenus.map((m) => (
              <div
                key={m.key}
                className="odoo-mega-wrap"
                onMouseEnter={() => {
                  cancelClose();
                  setOpenMenu(m.key);
                }}
                onMouseLeave={scheduleClose}
              >
                {/* If the menu item acts as a link, we render Link, else a button */
                  (m as any).to ? (
                    <Link
                      to={(m as any).to}
                      className={`odoo-nav-link odoo-mega-trigger ${openMenu === m.key ? 'open' : ''}`}
                      onClick={() => setOpenMenu(null)} // Close menu when clicking the top-level link itself
                    >
                      {m.label}
                      <ChevronDown size={16} className="odoo-chev" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={`odoo-nav-link odoo-mega-trigger ${openMenu === m.key ? 'open' : ''}`}
                      aria-haspopup="true"
                      aria-expanded={openMenu === m.key}
                      onClick={() => setOpenMenu((prev) => (prev === m.key ? null : m.key))}
                    >
                      {m.label}
                      <ChevronDown size={16} className="odoo-chev" />
                    </button>
                  )}

                {openMenu === m.key && (
                  <div
                    className="odoo-mega-panel"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="odoo-mega-inner">
                      {m.sections.map((s) => (
                        <div key={s.title} className="odoo-mega-col">
                          <div className="odoo-mega-title">{s.title}</div>
                          <div className="odoo-mega-links">
                            {s.links.map((l) => (
                              <Link
                                key={l.to}
                                to={l.to}
                                className="odoo-mega-link"
                                onClick={() => setOpenMenu(null)}
                              >
                                {l.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {utilityLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `odoo-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        )}

        <div className="d-flex align-items-center gap-3">
          {user ? (
            <div className="position-relative">
              <button
                className="btn d-flex align-items-center gap-2 p-1 border-0"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{ background: 'none' }}
              >
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                  style={{
                    width: '38px',
                    height: '38px',
                    background: 'linear-gradient(135deg, #714B67 0%, #017E84 100%)',
                    fontSize: '0.85rem'
                  }}
                >
                  {initials}
                </div>
              </button>

              {showProfileMenu && (
                <>
                  <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ zIndex: 999 }}
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div
                    className="position-absolute end-0 mt-2 bg-white rounded-3 shadow-lg border py-2"
                    style={{ zIndex: 1000, width: '220px', animation: 'slideInDown 0.2s ease-out' }}
                  >
                    <div className="px-3 py-2 border-bottom mb-1">
                      <div className="fw-bold text-dark text-truncate">{user.name || user.email}</div>
                      <div className="small text-muted text-truncate">{user.email}</div>
                    </div>
                    <Link to="/profile" className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 hover-bg-light text-decoration-none text-dark" onClick={() => setShowProfileMenu(false)}>
                      <UserIcon size={16} className="text-muted" />
                      <span>My Profile</span>
                    </Link>
                    <Link to="/apps" className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 hover-bg-light text-decoration-none text-dark" onClick={() => setShowProfileMenu(false)}>
                      <LayoutGrid size={16} className="text-muted" />
                      <span>My Apps</span>
                    </Link>
                    <Link to="/settings" className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 hover-bg-light text-decoration-none text-dark" onClick={() => setShowProfileMenu(false)}>
                      <SettingsIcon size={16} className="text-muted" />
                      <span>Settings</span>
                    </Link>
                    <div className="border-top mt-1 pt-1">
                      <button
                        className="dropdown-item d-flex align-items-center gap-2 py-2 px-3 hover-bg-light w-100 text-start border-0 bg-transparent text-danger"
                        onClick={() => {
                          logout();
                          setShowProfileMenu(false);
                        }}
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              {!isMobile && (
                <Link to="/login" className="odoo-nav-link">
                  Sign in
                </Link>
              )}
              {!isMobile && (
                <Link to="/contact-sales" className="odoo-nav-link">
                  Contact Sales
                </Link>
              )}
              <Link to="/get-started" className="btn btn-primary fw-bold px-4 py-2 shadow-sm" style={{ borderRadius: '4px' }}>
                Try it free
              </Link>
            </>
          )}


          {isMobile && (
            <button
              className="btn btn-light ms-2 p-2 border-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </div>

      {isMobile && mobileMenuOpen && (
        <div className="odoo-mobile-drawer">
          <div className="odoo-mobile-inner">
            {megaMenus.map((m) => (
              <div key={m.key} className="odoo-mobile-section">
                <div className="odoo-mobile-title">{m.label}</div>
                {m.sections.flatMap((s) => s.links).map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="odoo-mobile-link"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            ))}

            {utilityLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="odoo-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <div className="odoo-mobile-divider" />

            {user ? (
              <div className="odoo-mobile-section shadow-sm p-3 mb-3 bg-white rounded border">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle text-white fw-bold"
                    style={{
                      width: '48px',
                      height: '48px',
                      background: 'linear-gradient(135deg, #714B67 0%, #017E84 100%)',
                      fontSize: '1rem'
                    }}
                  >
                    {initials}
                  </div>
                  <div className="overflow-hidden">
                    <div className="fw-bold text-dark text-truncate">{user.name || user.email}</div>
                    <div className="small text-muted text-truncate">{user.email}</div>
                  </div>
                </div>
                <Link to="/profile" className="odoo-mobile-link py-2" onClick={() => setMobileMenuOpen(false)}>
                  My Profile
                </Link>
                <Link to="/apps" className="odoo-mobile-link py-2" onClick={() => setMobileMenuOpen(false)}>
                  My Apps
                </Link>
                <button
                  className="odoo-mobile-link py-2 border-0 bg-transparent text-start text-danger"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="odoo-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  Sign in
                </Link>
                <Link to="/contact-sales" className="odoo-mobile-link" onClick={() => setMobileMenuOpen(false)}>
                  Contact Sales
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
