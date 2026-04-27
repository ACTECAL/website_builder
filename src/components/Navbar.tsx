import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppsMegaMenu } from './AppsMegaMenu';
import { IndustriesMegaMenu } from './IndustriesMegaMenu';
import { NexoraLogo } from './NexoraLogo';
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
  const navItemsRef = useRef<{ element: HTMLElement; rect: DOMRect }[]>([]);
  const rafId = useRef<number>(0);

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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateItemPositions = () => {
      const items = document.querySelectorAll('.nav-link-item');
      navItemsRef.current = Array.from(items).map(item => ({
        element: item as HTMLElement,
        rect: item.getBoundingClientRect()
      }));
    };

    updateItemPositions();

    const onScroll = () => {
      if (isMobileMenuOpen) { setIsHidden(false); return; }
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (currentScrollY > 20) setIsScrolled(true);
      else setIsScrolled(false);

      if (currentScrollY <= 0) setIsHidden(false);
      else if (delta > 5 && currentScrollY > 100) setIsHidden(true);
      else if (delta < -5) setIsHidden(false);

      lastScrollY.current = currentScrollY;
      updateItemPositions(); // Recalculate on scroll
    };

    let mousePos = { x: 0, y: 0 };
    let mouseMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos = { x: e.clientX, y: e.clientY };
      mouseMoved = true;
      if (rafId.current === 0) {
        rafId.current = requestAnimationFrame(processMouseMove);
      }
    };

    const processMouseMove = () => {
      if (!mouseMoved) {
        rafId.current = 0;
        return;
      }

      navItemsRef.current.forEach(({ element, rect }) => {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.sqrt((mousePos.x - centerX) ** 2 + (mousePos.y - centerY) ** 2);
        const intensity = Math.max(0, 1 - dist / 200);
        element.style.setProperty('--proximity', intensity.toFixed(2));
      });

      // Neural Breadcrumbs logic - Optimized
      if (Math.random() > 0.95) { // Reduced frequency
        const crumb = document.createElement('div');
        crumb.className = 'neural-crumb';
        crumb.style.left = `${mousePos.x}px`;
        crumb.style.top = `${mousePos.y}px`;
        document.body.appendChild(crumb);
        setTimeout(() => crumb.remove(), 1000);
      }

      mouseMoved = false;
      rafId.current = requestAnimationFrame(processMouseMove);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateItemPositions);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateItemPositions);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navbar ${isHidden ? 'hidden' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        {/* Brand */}
        <Link to="/" className="nav-logo">
          <NexoraLogo size={36} />
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
            {/* <div
              onMouseEnter={handleIndustriesMouseEnter}
              onMouseLeave={handleIndustriesMouseLeave}
              className={`nav-link-item ${isIndustriesMenuOpen ? 'active' : ''}`}
            >
              Industries
            </div> */}
               <NavLink to="/security" className={({ isActive }) => `nav-link-item ${isActive ? 'active' : ''}`}>
              Security
            </NavLink>
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
            <Link to="/signup" className="btn-nav-cta">Sign up</Link>
          </div>
        )}

      {/* Mobile Toggle */}
      {isMobile && (
        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      )}

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
          <div className="mobile-actions">
            <Link to="/login" className="btn-login" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
            <Link to="/signup" className="btn-nav-cta" style={{width: '100%', textAlign: 'center', marginTop: '10px'}} onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

