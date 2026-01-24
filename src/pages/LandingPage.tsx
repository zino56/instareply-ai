import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import YellowBannerSection from "@/components/landing/YellowBannerSection";
import ValuePropsSection from "@/components/landing/ValuePropsSection";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import OnboardingStepsSection from "@/components/landing/OnboardingStepsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import FAQSection from "@/components/landing/FAQSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <main>
        <HeroSection />
        <YellowBannerSection />
        <div id="features">
          <ValuePropsSection />
        </div>
        <BeforeAfterSection />
        <OnboardingStepsSection />
        <TestimonialsSection />
        <div id="faq">
          <FAQSection />
        </div>
        <div id="pricing">
          <PricingSection />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
