import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ConversionMetricSection = () => {
  return (
    <section className="w-full bg-manychat-yellow py-16 md:py-24 px-5 md:px-10">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="font-poppins font-bold text-[40px] md:text-[56px] text-black mb-4 leading-tight">
          4x Higher Conversion Rate
        </h2>
        <p className="font-inter text-lg md:text-xl text-black/80 leading-relaxed mb-10 max-w-[700px] mx-auto">
          From our average customer: $30k/month shops see +$6k/month additional revenue just by automating Instagram DMs. That's real ROI.
        </p>
        <Button
          asChild
          className="bg-black hover:bg-manychat-yellow text-manychat-yellow hover:text-black font-inter font-semibold text-lg py-4 px-10 h-auto rounded-xl border-2 border-black transition-all duration-200"
        >
          <Link to="/signup">Get Started Free</Link>
        </Button>
      </div>
    </section>
  );
};

export default ConversionMetricSection;
