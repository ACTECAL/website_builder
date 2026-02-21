import React from 'react';
import { appModules } from '../../data/appModules';
import { AppTemplate } from '../AppTemplate';

export const LiveChatPage: React.FC = () => {
  const module = appModules.find((item) => item.slug === 'live-chat');
  if (!module) return <div>App not found</div>;
  return <AppTemplate module={module} />;
};
