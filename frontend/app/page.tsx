import HeroSectionOne from "@/features/landing/components/hero-section";
import TrustedBy from "@/features/landing/components/trusted-by";
import FeatureTodo from "@/features/landing/components/feature-todo";
import FeatureBento from "@/features/landing/components/feature-bento";
import Testimonials from "@/features/landing/components/testimonials";
import CtaAndFooter from "@/features/landing/components/cta-footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSectionOne/>
      <TrustedBy />
      <FeatureTodo />
      <FeatureBento />
      <Testimonials />
      <CtaAndFooter />
    </div>
  );
}
