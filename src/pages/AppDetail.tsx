import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { appModules } from '../data/appModules';
import { AppTemplate } from './AppTemplate';

export const AppDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const module = appModules.find((item) => item.slug === slug);

  if (!module) {
    return <Navigate to="/" replace />;
  }

  return <AppTemplate module={module} />;
};
