import React from 'react';
import { appModules } from '../../data/appModules';
import { AppTemplate } from '../AppTemplate';

export const FleetPage: React.FC = () => {
  const module = appModules.find((item) => item.slug === 'fleet');
  if (!module) return <div>App not found</div>;
  return <AppTemplate module={module} />;
};
