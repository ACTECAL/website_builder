import React from 'react';
import { appModules } from '../../data/appModules';
import { AppTemplate } from '../AppTemplate';

export const ApprovalsPage: React.FC = () => {
  const module = appModules.find((item) => item.slug === 'approvals');
  if (!module) return <div>App not found</div>;
  return <AppTemplate module={module} />;
};
