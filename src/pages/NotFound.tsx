import React from 'react';
import { Link } from 'react-router-dom';
import { GothicH1 } from '../components/GothicHeading';
import '../styles/NotFound.css';

export const NotFound: React.FC = () => {
  return (
    <main className="notfound-main">
      <GothicH1 text="404 - Page not found" className="notfound-title" />
      <p>The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="notfound-link">Go home</Link>
    </main>
  );
};


