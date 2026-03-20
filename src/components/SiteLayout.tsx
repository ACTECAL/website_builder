import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar';
import { AIAssistant } from './AIAssistant';
import { InfiniteAura } from './visuals/InfiniteAura';
import { useLocation } from 'react-router-dom';
import '../styles/SiteLayout.css';

interface SiteLayoutProps {
  children: React.ReactNode;
}

// Shared site layout with clean sticky navbar and cream background
export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const location = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const hideChrome = location.pathname.startsWith('/get-started') ||
    location.pathname.startsWith('/choose-apps') ||
    location.pathname === '/login' ||
    location.pathname === '/signup';

  useEffect(() => {
    if (hideChrome) return;

    const handleMouseMoveLocal = (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (wrapper) {
        wrapper.style.setProperty('--global-mouse-x', `${e.clientX}px`);
        wrapper.style.setProperty('--global-mouse-y', `${e.clientY}px`);
      }
    };
    window.addEventListener('mousemove', handleMouseMoveLocal, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMoveLocal);
  }, [hideChrome]);

  return (
    <div 
      ref={wrapperRef}
      className={`site-layout-wrapper ${hideChrome ? 'chrome-hidden' : 'chrome-visible'}`}
    >
      <InfiniteAura />
      {!hideChrome && <Navbar />}
      <div className={`site-content ${hideChrome ? 'chrome-hidden' : ''}`}>
        {children}
      </div>
      {!hideChrome && <AIAssistant />}
    </div>
  );
};

export default SiteLayout;


