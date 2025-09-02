// AI Response Components
// Centralized exports for all AI response component types

export { BlogCard } from './blog-card';
export { JobCard } from './job-card';
export { CaseStudyCard } from './case-study-card';
export { TestimonialCard } from './testimonial-card';
export { PortfolioCard } from './portfolio-card';

// Component registry for dynamic rendering
import { BlogCard } from './blog-card';
import { JobCard } from './job-card';
import { CaseStudyCard } from './case-study-card';
import { TestimonialCard } from './testimonial-card';
import { PortfolioCard } from './portfolio-card';

/**
 * Component registry mapping component types to their React components
 * Used by the AI response renderer for dynamic component rendering
 */
export const AI_COMPONENT_REGISTRY = {
  // Cards format mappings
  blog_card: BlogCard,
  job_card: JobCard,
  case_study_card: CaseStudyCard,
  testimonial_card: TestimonialCard,
  service_card: CaseStudyCard, // Use case study card for solutions
  portfolio_item: PortfolioCard,
};

/**
 * Get component by type
 * @param {string} componentType - The component type
 * @returns {React.Component|null} The component or null if not found
 */
export const getAIComponent = (componentType) => {
  return AI_COMPONENT_REGISTRY[componentType] || null;
};

/**
 * Check if component type is supported
 * @param {string} componentType - The component type to check
 * @returns {boolean} Whether the component type is supported
 */
export const isComponentTypeSupported = (componentType) => {
  return componentType in AI_COMPONENT_REGISTRY;
};
