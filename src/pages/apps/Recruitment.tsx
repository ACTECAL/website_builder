import React from 'react';
import { appModules } from '../../data/appModules';
import { AppTemplate } from '../AppTemplate';

export const RecruitmentPage: React.FC = () => {
  const module = appModules.find((item) => item.slug === 'recruitment');
  if (!module) return <div>App not found</div>;
  return <AppTemplate module={module} />;
};
