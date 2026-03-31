import React from 'react';
import { appModules } from '../../data/appModules';
import { AppTemplate } from '../AppTemplate';

export const AppraisalsPage: React.FC = () => {
  const module = appModules.find((item) => item.slug === 'appraisals');
  if (!module) return <div>App not found</div>;
  return <AppTemplate module={module} />;
};
