import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound: React.FC = () => {
  return (
    <main className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-center bg-light">
      <h1 className="display-1 fw-bold text-dark mb-4">404</h1>
      <p className="lead text-secondary mb-4">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="btn btn-primary rounded-pill px-5 shadow-sm">Go Home</Link>
    </main>
  );
};


