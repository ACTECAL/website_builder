import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppsMegaMenu } from './AppsMegaMenu';
import { IndustriesMegaMenu } from './IndustriesMegaMenu';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isAppsMenuOpen, setIsAppsMenuOpen] = useState(false);
  const [isIndustriesMenuOpen, setIsIndustriesMenuOpen] = useState(false);
  const closeAppsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeIndustriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  const handleAppsMouseEnter = () => {
    if (closeAppsTimeoutRef.current) clearTimeout(closeAppsTimeoutRef.current);
    setIsAppsMenuOpen(true);
  };

  const handleAppsMouseLeave = () => {
    closeAppsTimeoutRef.current = setTimeout(() => {
      setIsAppsMenuOpen(false);
    }, 150);
  };

  const handleIndustriesMouseEnter = () => {
    if (closeIndustriesTimeoutRef.current) clearTimeout(closeIndustriesTimeoutRef.current);
    setIsIndustriesMenuOpen(true);
  };

  const handleIndustriesMouseLeave = () => {
    closeIndustriesTimeoutRef.current = setTimeout(() => {
      setIsIndustriesMenuOpen(false);
    }, 150);
  };

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (isMobileMenuOpen) { setIsHidden(false); return; }
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 0) setIsHidden(false);
      else if (delta > 5 && currentScrollY > 100) setIsHidden(true);
      else if (delta < -5) setIsHidden(false);

      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobileMenuOpen]);

  return (
    <nav className="navbar-container" style={{ transform: isHidden ? 'translateY(-100%)' : 'translateY(0)' }}>
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/" className="brand">
          <span>Nexora</span>
          <div className="brand-dot" />
        </Link>

        {/* Desktop Links */}
        {!isMobile && (
          <div className="nav-links-center">
            <div
              onMouseEnter={handleAppsMouseEnter}
              onMouseLeave={handleAppsMouseLeave}
              className={`nav-link-item ${isAppsMenuOpen ? 'active' : ''}`}
            >
              Applications
            </div>
            <div
              onMouseEnter={handleIndustriesMouseEnter}
              onMouseLeave={handleIndustriesMouseLeave}
              className={`nav-link-item ${isIndustriesMenuOpen ? 'active' : ''}`}
            >
              Industries
            </div>
            <NavLink to="/community" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              Community
            </NavLink>
            <NavLink to="/pricing" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              Pricing
            </NavLink>
          </div>
        )}

        {/* Desktop Actions */}
        {!isMobile && (
          <div className="nav-actions-right">
            <Link to="/login" className="btn-login">Log in</Link>
            <Link to="/signup" className="btn btn-primary">Sign up</Link>
          </div>
        )}

        {/* Mobile Toggle */}
        {isMobile && (
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        )}
      </div>

      <AppsMegaMenu
        isOpen={isAppsMenuOpen}
        onMouseEnter={handleAppsMouseEnter}
        onMouseLeave={handleAppsMouseLeave}
      />
      <IndustriesMegaMenu
        isOpen={isIndustriesMenuOpen}
        onMouseEnter={handleIndustriesMouseEnter}
        onMouseLeave={handleIndustriesMouseLeave}
      />

      {/* Mobile Menu Content */}
      {isMobile && isMobileMenuOpen && (
        <div className="mobile-menu">
          <div onClick={() => setIsAppsMenuOpen(!isAppsMenuOpen)} className="nav-link-item">
            Applications
          </div>
          <div onClick={() => setIsIndustriesMenuOpen(!isIndustriesMenuOpen)} className="nav-link-item">
            Industries
          </div>
          <NavLink to="/community" className="nav-link-item" onClick={() => setIsMobileMenuOpen(false)}>
            Community
          </NavLink>
          <NavLink to="/pricing" className="nav-link-item" onClick={() => setIsMobileMenuOpen(false)}>
            Pricing
          </NavLink>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 10 }}>
            <Link to="/login" className="btn" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
            <Link to="/signup" className="btn btn-primary" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

