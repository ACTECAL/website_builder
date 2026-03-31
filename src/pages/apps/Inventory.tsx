import React from 'react';
import { appModules } from '../../data/appModules';
import { AppTemplate } from '../AppTemplate';

export const InventoryPage: React.FC = () => {
  const module = appModules.find((item) => item.slug === 'inventory');
  if (!module) return <div>App not found</div>;
  return <AppTemplate module={module} />;
};
