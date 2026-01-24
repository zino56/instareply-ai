import { Button } from "@/components/ui/button";
import { UserPlus, Instagram, Package, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    number: 1,
    icon: UserPlus,
    title: "Sign up for free",
    description: "Create your account in 2 minutes. No credit card required. Start your 14-day free trial.",
  },
  {
    number: 2,
    icon: Instagram,
    title: "Connect to Instagram",
    description: "OAuth login. Click 'Connect'. Grant InstaAI permission to reply to DMs. That's it.",
  },
  {
    number: 3,
    icon: Package,
    title: "Go live in minutes",
    description: "Upload your product CSV. Set your AI tone (friendly/professional). Automation starts instantly.",
  },
];

const OnboardingStepsSection = () => {
  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-landing-headline">
            Get up and running in 3 simple steps
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
          {/* Connecting Lines (Desktop only) */}
          <div className="hidden md:block absolute top-8 left-1/3 right-1/3 h-0.5 bg-landing-teal/30">
            <ArrowRight className="absolute -right-3 -top-2.5 w-5 h-5 text-landing-teal" />
          </div>
          <div className="hidden md:block absolute top-8 left-2/3 right-0 w-1/3 h-0.5 bg-landing-teal/30">
            <ArrowRight className="absolute right-[33%] -top-2.5 w-5 h-5 text-landing-teal" />
          </div>

          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center relative">
              {/* Number Circle */}
              <div className="w-16 h-16 rounded-full bg-landing-teal text-white flex items-center justify-center mb-6 shadow-lg">
                <span className="font-poppins font-bold text-2xl">{step.number}</span>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-landing-teal/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-landing-teal" />
              </div>

              {/* Content */}
              <h3 className="font-poppins font-semibold text-lg text-foreground mb-3">
                {step.title}
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed max-w-xs">
                {step.description}
              </p>

              {/* Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden mt-6 mb-2">
                  <ArrowRight className="w-5 h-5 text-landing-teal rotate-90" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Button 
            asChild
            className="bg-landing-teal hover:bg-landing-teal/90 text-white font-inter font-medium text-base py-4 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link to="/signup">Start free now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OnboardingStepsSection;
