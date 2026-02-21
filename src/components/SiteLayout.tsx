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
  const hideChrome = location.pathname.startsWith('/get-started') ||
    location.pathname === '/login' ||
    location.pathname === '/signup';
  return (
    <div style={{
      background: 'var(--surface)',
      height: hideChrome ? '100vh' : 'auto',
      minHeight: '100vh',
      overflow: hideChrome ? 'hidden' : 'visible'
    }}>
      {!hideChrome && <Navbar />}
      <div style={{ height: hideChrome ? '100%' : 'auto' }}>
        {children}
      </div>
      {!hideChrome && <AIAssistant />}
    </div>
  );
};

export default SiteLayout;


