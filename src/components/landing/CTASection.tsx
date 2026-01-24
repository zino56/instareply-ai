import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-16 md:py-[100px] px-5 md:px-10 bg-manychat-green">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-poppins font-bold text-[32px] md:text-[44px] text-white mb-4 leading-tight">
          Try InstaAI for free
        </h2>
        <p className="font-inter text-lg text-white/90 mb-8 md:mb-10">
          Transform more conversations into sales, leads, and conversions today.
        </p>

        {/* CTA Button */}
        <Button
          asChild
          className="bg-manychat-yellow hover:bg-[#E5D600] text-black font-inter font-semibold text-lg py-4 px-10 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Link to="/signup">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
