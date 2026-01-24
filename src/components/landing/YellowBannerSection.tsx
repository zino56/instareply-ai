import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const YellowBannerSection = () => {
  return (
    <section className="w-full bg-manychat-yellow py-16 md:py-20">
      <div className="max-w-4xl mx-auto px-5 text-center">
        <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-black leading-tight mb-4">
          Turn comments into conversations that sell
        </h2>
        <p className="font-inter text-base md:text-lg text-black/80 max-w-[900px] mx-auto mb-8 italic">
          "How much is this?" or "Do you ship to Mars?" Instant reply. Boom — wallets open, money lands, and you didn't even blink.
        </p>
        <Button
          asChild
          className="bg-black hover:bg-black/90 text-manychat-yellow font-inter font-semibold text-base py-3.5 px-8 h-auto rounded-lg transition-all duration-200"
        >
          <Link to="/signup">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};

export default YellowBannerSection;
