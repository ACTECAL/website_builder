import React from 'react';
import { appModules } from '../../data/appModules';
import { AppTemplate } from '../AppTemplate';

export const PayrollPage: React.FC = () => {
  const module = appModules.find((item) => item.slug === 'payroll');
  if (!module) return <div>App not found</div>;
  return <AppTemplate module={module} />;
};
