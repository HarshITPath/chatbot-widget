// Universal InfoCard component for all dynamic content types

import { InfoCard } from './info-card';

const COMPONENT_REGISTRY = {
  info_card: InfoCard,
};

export const getAIComponent = (componentType) => {
  return COMPONENT_REGISTRY[componentType] || InfoCard;
};
