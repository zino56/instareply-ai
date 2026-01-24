import { Brain, Clock, Shield, Rocket, BarChart3, Link2 } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Responses",
    description: "Claude 3.5 understands customer intent and responds intelligently. No more robotic replies.",
  },
  {
    icon: Clock,
    title: "24/7 Automation",
    description: "Respond instantly while you sleep. Never miss a sale or leave a customer waiting.",
  },
  {
    icon: Shield,
    title: "Zero Hallucinations",
    description: "AI only recommends products in your catalog. 100% accurate, 100% on-brand.",
  },
  {
    icon: Rocket,
    title: "5-Minute Setup",
    description: "OAuth → Products → Live. No code required. Start automating in minutes.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Track conversations, conversions, and customer intent with detailed dashboards.",
  },
  {
    icon: Link2,
    title: "Seamless Integration",
    description: "Connect to Instagram, email, Slack, and more. Works with your existing tools.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-[60px] md:py-[100px] px-5 md:px-[60px] bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-mc-black leading-tight mb-4">
            Scale up your best conversations
          </h2>
          <p className="font-inter text-base md:text-[17px] text-mc-gray max-w-[600px] mx-auto">
            Everything you need to automate Instagram sales and provide exceptional customer experiences.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-mc-yellow flex items-center justify-center mb-4 
                group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-mc-black" />
              </div>

              {/* Content */}
              <h3 className="font-poppins font-bold text-xl md:text-2xl text-mc-black mb-3">
                {feature.title}
              </h3>
              <p className="font-inter text-base md:text-[17px] text-mc-gray leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
