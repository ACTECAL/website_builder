import React from 'react';
import { industryCategories } from '../../data/industries';
import { IndustryTemplate } from '../IndustryTemplate';

export const FurnitureStorePage: React.FC = () => {
  const industry = industryCategories.flatMap(c => c.industries).find(i => i.slug === 'furniture-store');
  if (!industry) return <div>Industry not found</div>;
  return <IndustryTemplate industry={industry} isVisible={true} />;
};
