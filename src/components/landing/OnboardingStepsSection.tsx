import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: 1,
    emoji: "✅",
    title: "Sign Up Free",
    description: "Create account in 2 minutes. No credit card. Start 14-day trial.",
  },
  {
    number: 2,
    emoji: "📱",
    title: "Connect Instagram",
    description: "OAuth login. Grant DM permissions. One click.",
  },
  {
    number: 3,
    emoji: "📦",
    title: "Go Live",
    description: "Upload products CSV. Set AI tone. Automation starts instantly.",
  },
];

const OnboardingStepsSection = () => {
  return (
    <section className="py-16 md:py-[100px] px-5 md:px-10 bg-white">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[32px] md:text-[40px] text-black text-center mb-12 md:mb-[70px]">
          Get started in 3 steps
        </h2>

        {/* Steps */}
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 relative">
            {/* Connecting Lines (Desktop only) */}
            <div className="hidden md:flex absolute top-10 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] items-center justify-between">
              <div className="flex-1 h-[3px] bg-manychat-yellow relative">
                <ArrowRight className="absolute -right-1 -top-2.5 w-6 h-6 text-manychat-yellow" />
              </div>
              <div className="w-20" />
              <div className="flex-1 h-[3px] bg-manychat-yellow relative">
                <ArrowRight className="absolute -right-1 -top-2.5 w-6 h-6 text-manychat-yellow" />
              </div>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative">
                {/* Number Circle */}
                <div className="w-[70px] h-[70px] md:w-20 md:h-20 rounded-full bg-manychat-yellow flex items-center justify-center mb-6 shadow-lg">
                  <span className="font-poppins font-bold text-[40px] md:text-[48px] text-black">
                    {step.number}
                  </span>
                </div>

                {/* Emoji Icon */}
                <span className="text-[40px] mb-4">{step.emoji}</span>

                {/* Content */}
                <h3 className="font-poppins font-semibold text-lg md:text-xl text-black mb-3">
                  {step.title}
                </h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden mt-8 mb-2">
                    <ArrowDown className="w-6 h-6 text-manychat-yellow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-[60px]">
          <Button 
            asChild
            className="bg-manychat-yellow hover:bg-[#E5D600] text-black font-inter font-semibold text-base py-3.5 px-8 h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link to="/signup">Get Started Free Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OnboardingStepsSection;
