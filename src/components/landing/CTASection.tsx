import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-[100px] px-5 md:px-10 bg-gradient-to-br from-[#FFD60A] to-[#ffc800]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-poppins font-bold text-[32px] md:text-[44px] text-[#001D3D] mb-4 leading-tight">
          Ready to Automate Your Instagram Sales?
        </h2>
        <p className="font-inter text-lg text-[#001D3D] mb-8 md:mb-10">
          Join 500+ e-commerce brands already using InstaAI.
        </p>

        {/* CTA Button */}
        <Button
          asChild
          className="bg-[#001D3D] hover:bg-[#FFD60A] text-[#FFD60A] hover:text-[#001D3D] font-inter font-semibold text-lg py-4 px-10 h-auto rounded-lg border-2 border-[#001D3D] shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Link to="/signup">Start Free Now</Link>
        </Button>

        {/* Secondary Link */}
        <div className="mt-5">
          <a
            href="#demo"
            className="font-inter text-sm text-[#001D3D] underline hover:no-underline transition-all duration-200"
          >
            Watch 2-minute demo
          </a>
        </div>

        {/* Confidence Text */}
        <p className="font-inter text-xs text-[#001D3D] italic mt-5">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
