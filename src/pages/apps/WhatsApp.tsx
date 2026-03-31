import React from 'react';
import { appModules } from '../../data/appModules';
import { AppTemplate } from '../AppTemplate';

export const WhatsAppPage: React.FC = () => {
  const module = appModules.find((item) => item.slug === 'whatsapp');
  if (!module) return <div>App not found</div>;
  return <AppTemplate module={module} />;
};
