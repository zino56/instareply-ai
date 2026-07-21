import LandingNavbar from "@/components/landing/LandingNavbar";
import HeroSection from "@/components/landing/HeroSection";
import BeforeAfterSection from "@/components/landing/BeforeAfterSection";
import OnboardingStepsSection from "@/components/landing/OnboardingStepsSection";
import WorkflowPreviewSection from "@/components/landing/WorkflowPreviewSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import PricingSection from "@/components/landing/PricingSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingNavbar />
      <main>
        <HeroSection />
        <BeforeAfterSection />
        <OnboardingStepsSection />
        <WorkflowPreviewSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
