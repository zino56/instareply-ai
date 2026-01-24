import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-gradient-to-br from-landing-teal to-teal-700">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-poppins font-bold text-3xl md:text-4xl text-white mb-4">
          Ready to automate your Instagram sales?
        </h2>
        <p className="font-inter text-lg text-white/90 mb-8">
          Join 500+ e-commerce brands already using InstaAI.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            asChild
            className="bg-white text-landing-teal hover:bg-white/90 font-inter font-medium text-base py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Link to="/signup">Start free now</Link>
          </Button>
          <Button
            variant="ghost"
            className="text-white hover:text-white hover:bg-white/10 font-inter font-medium text-sm underline underline-offset-4"
          >
            <Play className="w-4 h-4 mr-2" />
            Watch 2-minute demo
          </Button>
        </div>

        <p className="font-inter text-sm text-white/80 italic">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
