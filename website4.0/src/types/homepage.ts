import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface ThemedSectionProps {
  theme?: boolean;
}

export interface HeroSectionProps extends ThemedSectionProps {
  getStartedHref?: string;
}

export interface DiscoverSectionProps extends ThemedSectionProps {
  startNowHref?: string;
  writeBlogHref?: string;
}

export interface FeaturesSectionProps extends ThemedSectionProps {
  exploreFeaturesHref?: string;
}

export interface HowItWorksSectionProps extends ThemedSectionProps {
  tryItNowHref?: string;
}

export interface SolutionSectionProps extends ThemedSectionProps {
  startLearningHref?: string;
}

export interface HighlightCard {
  icon: IconDefinition;
  title: string;
  description: string;
}

export interface BlogPreview {
  title: string;
  author: string;
  snippet: string;
  tag: string;
}

export interface FeatureCard {
  icon: IconDefinition;
  title: string;
  description: string;
  isPopular?: boolean;
}

export interface StepCard {
  number: string;
  icon: IconDefinition;
  title: string;
  description: string;
}

export interface ProblemPoint {
  icon: IconDefinition;
  text: string;
}

export interface SolutionPoint {
  icon: IconDefinition;
  title: string;
  text: string;
}
