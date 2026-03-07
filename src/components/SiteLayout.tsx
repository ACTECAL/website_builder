import React from 'react';
import Navbar from './Navbar';
import { AIAssistant } from './AIAssistant';
import { useLocation } from 'react-router-dom';
import '../styles/SiteLayout.css';

interface SiteLayoutProps {
  children: React.ReactNode;
}

// Shared site layout with clean sticky navbar and cream background
export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideChrome = location.pathname.startsWith('/get-started') ||
    location.pathname.startsWith('/choose-apps') ||
    location.pathname === '/login' ||
    location.pathname === '/signup';
  return (
    <div className={`site-layout-wrapper ${hideChrome ? 'chrome-hidden' : 'chrome-visible'}`}>
      {!hideChrome && <Navbar />}
      <div className={`site-content ${hideChrome ? 'chrome-hidden' : ''}`}>
        {children}
      </div>
      {!hideChrome && <AIAssistant />}
    </div>
  );
};

export default SiteLayout;


