import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-5 md:px-[60px] bg-gradient-to-b from-mc-black to-mc-dark-gray">
      <div className="max-w-[1000px] mx-auto text-center">
        {/* Headline */}
        <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-white leading-tight mb-4 animate-fade-in">
          Ready to automate your Instagram sales?
        </h2>

        {/* Subheadline */}
        <p className="font-inter text-base md:text-lg text-white/90 mb-10 max-w-[600px] mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
          Join 500+ e-commerce brands already using Conveero.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <Button
            asChild
            className="bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black font-poppins font-bold 
              text-base px-10 py-4 h-auto rounded-lg transition-all duration-200 
              hover:shadow-yellow hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Link to="/signup">Start Free Now</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="bg-transparent border-2 border-white text-white font-poppins font-bold 
              text-base px-10 py-4 h-auto rounded-lg transition-all duration-200 
              hover:bg-white/10 group w-full sm:w-auto"
          >
            <a href="#demo" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Watch 2-Minute Demo
            </a>
          </Button>
        </div>

        {/* Confidence Message */}
        <p className="font-inter text-sm text-white/80 italic animate-fade-in" style={{ animationDelay: '300ms' }}>
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
