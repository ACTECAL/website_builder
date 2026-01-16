import React from 'react';
import Navbar from './Navbar';
import { AIAssistant } from './AIAssistant';
import { useLocation } from 'react-router-dom';

interface SiteLayoutProps {
  children: React.ReactNode;
}

// Shared site layout with clean sticky navbar and cream background
export const SiteLayout: React.FC<SiteLayoutProps> = ({ children }) => {
  const location = useLocation();
  const hideChrome =
    location.pathname.startsWith('/get-started') ||
    location.pathname.startsWith('/choose-apps') ||
    location.pathname.startsWith('/contact-sales');
  return (
    <div style={{ background: 'var(--surface)', minHeight: '100vh' }}>
      {!hideChrome && <Navbar />}
      <div>
        {children}
      </div>
      {!hideChrome && <AIAssistant />}
    </div>
  );
};

export default SiteLayout;


