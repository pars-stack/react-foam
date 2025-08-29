import CodeExampleSection from "@/components/template/home/code-example-section";
import FeaturedSection from "@/components/template/home/featured-section";
import GettingStartedSection from "@/components/template/home/getting-started-section";
import HeroSection from "@/components/template/home/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedSection />
      <CodeExampleSection />
      {/* <StatsSection /> */}
      <GettingStartedSection />
    </div>
  );
}
