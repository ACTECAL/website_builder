import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import SiteLayout from './components/SiteLayout';
import Home from './pages/Home';
import Apps from './pages/Apps';
import { AppDetail } from './pages/AppDetail';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { ContactSales } from './pages/ContactSales';
import { GetStarted } from './pages/GetStarted';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Blog } from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { Careers } from './pages/Careers';
import Partners from './pages/Partners';
import { Docs } from './pages/Docs';
import { Community } from './pages/Community';
import { RegisterYourAccountingFirm } from './pages/RegisterYourAccountingFirm';
import { BecomeAPartner } from './pages/BecomeAPartner';
import './App.css';
import './styles/navbar-enhanced.css';
import './styles/Footer.css';
import './styles/Home.css';
import './styles/Apps.css';
import './styles/Pricing.css';
import './styles/Docs.css';
import './styles/Careers.css';
import './styles/Partners.css';
import './styles/Blog.css';
import './styles/BlogPost.css';
import './styles/enhancements.css';
import './styles/premium.css';
import './styles/ultra-premium.css';

function App() {
  const location = useLocation();
  const hideChrome =
    location.pathname.startsWith('/get-started') ||
    location.pathname.startsWith('/choose-apps') ||
    location.pathname.startsWith('/contact-sales');
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apps" element={<Apps />} />
        <Route path="/apps/:slug" element={<AppDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/choose-apps" element={<GetStarted />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-sales" element={<ContactSales />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/community" element={<Community />} />
        <Route path="/register-your-accounting-firm" element={<RegisterYourAccountingFirm />} />
        <Route path="/become-a-partner" element={<BecomeAPartner />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!hideChrome && <Footer />}
    </SiteLayout>
  );
}

export default App;
