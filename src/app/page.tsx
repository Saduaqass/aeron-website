import { HeroSection } from "@/components/sections/hero-section";
import { StorySection } from "@/components/sections/story-section";
import { DesignSection } from "@/components/sections/design-section";
import { PerformanceSection } from "@/components/sections/performance-section";
import { InteriorSection, TechnologySection } from "@/components/sections/interior-technology";
import { ConfiguratorSection } from "@/components/sections/configurator-section";
import { ContactSection, SiteFooter } from "@/components/sections/contact-footer";

export default function Home() {
  return <><main><HeroSection /><StorySection /><DesignSection /><PerformanceSection /><InteriorSection /><TechnologySection /><ConfiguratorSection /><ContactSection /></main><SiteFooter /></>;
}
