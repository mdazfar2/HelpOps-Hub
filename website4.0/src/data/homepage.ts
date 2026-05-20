import {
  faArrowRight,
  faArrowTrendUp,
  faBolt,
  faBookOpen,
  faBug,
  faChartLine,
  faCircleCheck,
  faCloud,
  faCodeBranch,
  faCodeFork,
  faClock,
  faLightbulb,
  faMagnifyingGlass,
  faPenNib,
  faRocket,
  faScrewdriverWrench,
  faSliders,
  faTriangleExclamation,
  faUsers,
  faWandSparkles,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";
import type {
  BlogPreview,
  FeatureCard,
  HighlightCard,
  ProblemPoint,
  SolutionPoint,
  StepCard,
} from "@/types/homepage";

export const homepageIcons = {
  arrowRight: faArrowRight,
  arrowTrendUp: faArrowTrendUp,
  bolt: faBolt,
  rocket: faRocket,
  wandMagicSparkles: faWandMagicSparkles,
} as const;

export const highlights: readonly HighlightCard[] = [
  {
    icon: faBookOpen,
    title: "Explore DevOps Blogs",
    description:
      "Read high-quality blogs on Docker, Kubernetes, CI/CD, Cloud, and more.",
  },
  {
    icon: faLightbulb,
    title: "Learn from Real Experiences",
    description:
      "Gain insights from real-world problems and practical solutions shared by developers.",
  },
  {
    icon: faPenNib,
    title: "Create & Share Your Knowledge",
    description:
      "Write and publish your own blogs to help others and build your personal brand.",
  },
  {
    icon: faChartLine,
    title: "Stay Updated",
    description:
      "Keep up with the latest DevOps trends, tools, and best practices.",
  },
] as const;

export const blogPreviews: readonly BlogPreview[] = [
  {
    title: "Kubernetes CrashLoopBackOff: Practical Fix Guide",
    author: "By Aisha Khan",
    snippet:
      "A quick diagnostic checklist to identify and resolve recurring pod restarts.",
    tag: "Kubernetes",
  },
  {
    title: "CI/CD Pipeline Failures: 7 Root Causes",
    author: "By Aryan DevOps",
    snippet:
      "Learn the most common deployment blockers and how teams fix them fast.",
    tag: "CI/CD",
  },
  {
    title: "From Docker Errors to Stable Builds",
    author: "By Meera S.",
    snippet:
      "A field-tested method to reduce image build breaks and speed up feedback loops.",
    tag: "Docker",
  },
] as const;

export const featureCards: readonly FeatureCard[] = [
  {
    icon: faBolt,
    title: "Fix DevOps Errors Instantly",
    description:
      "Access ready-made solutions for common issues in Docker, Kubernetes, CI/CD, and more.",
    isPopular: true,
  },
  {
    icon: faBookOpen,
    title: "Explore Learning Resources",
    description:
      "Read structured blogs and guides to improve your DevOps and cloud skills.",
  },
  {
    icon: faUsers,
    title: "Ask & Get Help from Community",
    description:
      "Post your issues and get solutions from experienced developers.",
  },
  {
    icon: faMagnifyingGlass,
    title: "Smart Search for Issues",
    description:
      "Quickly find solutions by searching error messages or keywords.",
  },
  {
    icon: faCodeFork,
    title: "Contribute to Open Source",
    description:
      "Collaborate, contribute, and grow with the DevOps community.",
  },
  {
    icon: faScrewdriverWrench,
    title: "Real-World Problem Solving",
    description:
      "Learn by solving actual DevOps challenges faced by developers.",
  },
] as const;

export const steps: readonly StepCard[] = [
  {
    number: "01",
    icon: faMagnifyingGlass,
    title: "Search or Ask Your Issue",
    description: "Enter your DevOps error or post your issue to get started.",
  },
  {
    number: "02",
    icon: faBolt,
    title: "Get Instant Solutions",
    description:
      "Discover ready-made fixes or get answers from the community.",
  },
  {
    number: "03",
    icon: faRocket,
    title: "Implement & Learn",
    description:
      "Apply the solution, fix your issue, and level up your skills.",
  },
] as const;

export const problemPoints: readonly ProblemPoint[] = [
  {
    icon: faBug,
    text: "Frequent Docker build and runtime errors",
  },
  {
    icon: faCloud,
    text: "Kubernetes pods crashing without clear logs",
  },
  {
    icon: faCodeBranch,
    text: "CI/CD pipelines failing unexpectedly",
  },
  {
    icon: faSliders,
    text: "Configuration issues across environments",
  },
  {
    icon: faClock,
    text: "Debugging takes too much time",
  },
  {
    icon: faTriangleExclamation,
    text: "Lack of clear, centralized solutions",
  },
] as const;

export const solutionPoints: readonly SolutionPoint[] = [
  {
    icon: faCircleCheck,
    title: "Ready-to-use fixes",
    text: "Get proven solutions for common DevOps errors without trial-and-error.",
  },
  {
    icon: faUsers,
    title: "Community Q&A support",
    text: "Ask questions and receive real-time help from experienced practitioners.",
  },
  {
    icon: faWandSparkles,
    title: "Structured learning",
    text: "Explore practical blogs and guided resources to upskill faster.",
  },
  {
    icon: faMagnifyingGlass,
    title: "Instant error discovery",
    text: "Search exact issue patterns and find working fixes in seconds.",
  },
  {
    icon: faCodeFork,
    title: "Open-source collaboration",
    text: "Contribute, improve solutions, and grow with a DevOps-first ecosystem.",
  },
] as const;
