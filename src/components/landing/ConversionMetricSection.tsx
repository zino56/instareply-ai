import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ConversionMetricSection = () => {
  return (
    <section className="w-full bg-[#FFD60A] py-12 md:py-20 px-5 md:px-10">
      <div className="max-w-[800px] mx-auto text-center">
        <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-[#001D3D] mb-4 leading-tight">
          4x Higher Conversion Rate
        </h2>
        <p className="font-inter text-base md:text-lg text-[#001D3D]/90 leading-relaxed mb-8">
          From our average customer: $30k/month shops see +$6k/month additional revenue just by automating Instagram DMs. That's real ROI.
        </p>
        <Button
          asChild
          className="bg-[#001D3D] hover:bg-[#FFD60A] text-[#FFD60A] hover:text-[#001D3D] font-inter font-semibold text-base py-3.5 px-8 h-auto rounded-lg border-2 border-[#001D3D] transition-all duration-200"
        >
          <Link to="/signup">Get Started Free</Link>
        </Button>
      </div>
    </section>
  );
};

export default ConversionMetricSection;
