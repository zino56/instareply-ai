import { UserCheck, Instagram, Rocket, ArrowRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: 1,
    icon: UserCheck,
    title: "Sign up for free",
    description: "Create your account in 2 minutes. No credit card required. Start your 14-day free trial.",
  },
  {
    number: 2,
    icon: Instagram,
    title: "Connect to Instagram",
    description: "OAuth login. Grant Conveero permission. Click 'Connect' and you're done.",
  },
  {
    number: 3,
    icon: Rocket,
    title: "Go live in minutes",
    description: "Upload your product CSV. Set your AI tone. Automation starts instantly.",
  },
];

const OnboardingStepsSection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-5 md:px-[60px] bg-mc-light-gray">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-mc-black text-center mb-12 md:mb-20">
          Get started in 3 simple steps
        </h2>

        {/* Steps */}
        <div className="relative max-w-[1000px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
            {/* Connecting Lines (Desktop only) */}
            <div className="hidden md:flex absolute top-10 left-[calc(16.67%+50px)] right-[calc(16.67%+50px)] items-center justify-between">
              <div className="flex-1 h-[2px] bg-mc-yellow relative animate-draw-line">
                <ArrowRight className="absolute -right-1 -top-3 w-6 h-6 text-mc-yellow" />
              </div>
              <div className="w-20" />
              <div className="flex-1 h-[2px] bg-mc-yellow relative animate-draw-line" style={{ animationDelay: '400ms' }}>
                <ArrowRight className="absolute -right-1 -top-3 w-6 h-6 text-mc-yellow" />
              </div>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative">
                {/* Number Circle */}
                <div 
                  className="w-20 h-20 rounded-full bg-mc-yellow flex items-center justify-center mb-6 
                    shadow-yellow animate-scale-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <span className="font-poppins font-bold text-[48px] text-mc-black">
                    {step.number}
                  </span>
                </div>

                {/* Icon */}
                <div 
                  className="mb-5 animate-fade-in"
                  style={{ animationDelay: `${index * 200 + 100}ms` }}
                >
                  <step.icon className="w-12 h-12 text-mc-black" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 
                  className="font-poppins font-bold text-lg md:text-[22px] text-mc-black mb-3 animate-fade-in"
                  style={{ animationDelay: `${index * 200 + 200}ms` }}
                >
                  {step.title}
                </h3>
                <p 
                  className="font-inter text-sm md:text-base text-mc-gray leading-relaxed max-w-xs animate-fade-in"
                  style={{ animationDelay: `${index * 200 + 300}ms` }}
                >
                  {step.description}
                </p>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="md:hidden mt-8 mb-2">
                    <ArrowDown className="w-6 h-6 text-mc-yellow" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12 md:mt-16">
          <Button 
            asChild
            className="bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black font-poppins font-bold 
              text-base md:text-lg py-4 px-10 h-auto rounded-lg shadow-yellow 
              hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <Link to="/signup">Start Free Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OnboardingStepsSection;
