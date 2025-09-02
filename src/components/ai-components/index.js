// AI Response Components
// Universal InfoCard component for all dynamic content types

export { InfoCard } from './info-card';

// Component registry for dynamic rendering
import { InfoCard } from './info-card';

/**
 * Component registry mapping component types to their React components
 * Used by the AI response renderer for dynamic component rendering
 * 
 * All component types now use the universal InfoCard component
 */
export const AI_COMPONENT_REGISTRY = {
  // Primary component
  info_card: InfoCard,
  
  // Legacy component type mappings (all point to InfoCard)
  blog_card: InfoCard,
  job_card: InfoCard,
  case_study_card: InfoCard,
  testimonial_card: InfoCard,
  service_card: InfoCard,
  portfolio_item: InfoCard,
  contact_card: InfoCard,
  faq_card: InfoCard,
  
  // Fallback mappings
  cards: InfoCard,
  default: InfoCard,
};

/**
 * Get component by type
 * @param {string} componentType - The component type
 * @returns {React.Component} The InfoCard component (always returns InfoCard)
 */
export const getAIComponent = (componentType) => {
  return InfoCard;
};

/**
 * Check if component type is supported
 * @param {string} componentType - The component type to check
 * @returns {boolean} Always returns true since InfoCard handles all types
 */
export const isComponentTypeSupported = (componentType) => {
  return true;
};
