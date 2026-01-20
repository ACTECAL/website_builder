import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { ActyxLogo } from './ActyxLogo';
import '../styles/navbar-enhanced.css';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

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

  // Initialize theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
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
                { label: 'Retail', to: '/industries/retail' },
                { label: 'Manufacturing', to: '/industries/manufacturing' }
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
          <ActyxLogo showBadge style={{ fontSize: '1.75rem' }} />
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

          <button
            className="btn btn-light ms-2"
            onClick={() => {
              const isDark = document.body.classList.toggle('dark-mode');
              localStorage.setItem('theme', isDark ? 'dark' : 'light');
            }}
            title="Toggle dark mode"
          >
            {document.body.classList.contains('dark-mode') ? '🌙' : '☀️'}
          </button>

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

            <Link to="/login" className="odoo-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Sign in
            </Link>
            <Link to="/contact-sales" className="odoo-mobile-link" onClick={() => setMobileMenuOpen(false)}>
              Contact Sales
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
