import { AosInitializer } from "@/components/homepage/AosInitializer";
import { DiscoverSection } from "@/components/homepage/DiscoverSection";
import { FeaturesSection } from "@/components/homepage/FeaturesSection";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HowItWorksSection } from "@/components/homepage/HowItWorksSection";
import { ProblemSection } from "@/components/homepage/ProblemSection";
import { SolutionSection } from "@/components/homepage/SolutionSection";

const isLightTheme = true;

export default function Home() {
  return (
    <>
      <AosInitializer />
      <main
        id="home-top"
        className="overflow-x-hidden bg-gray-100 transition-colors duration-500 md:overflow-x-auto"
      >
        <HeroSection theme={isLightTheme} getStartedHref="/resources" />
        <ProblemSection theme={isLightTheme} />
        <SolutionSection theme={isLightTheme} startLearningHref="/devopsforum" />
        <FeaturesSection theme={isLightTheme} exploreFeaturesHref="/resources" />
        <HowItWorksSection theme={isLightTheme} tryItNowHref="/devopsforum" />
        <DiscoverSection
          theme={isLightTheme}
          startNowHref="/blogs"
          writeBlogHref="/createblog"
        />
      </main>
    </>
  );
}
