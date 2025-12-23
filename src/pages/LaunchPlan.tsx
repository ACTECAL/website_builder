import React from 'react';
import { BuilderProvider } from '../components/builder/BuilderContext';
import { BuilderLayout } from '../components/builder/BuilderLayout';

const LaunchPlan: React.FC = () => {
  return (
    <BuilderProvider>
      <BuilderLayout />
    </BuilderProvider>
  );
};

export default LaunchPlan;
