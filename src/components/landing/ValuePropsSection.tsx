import { Brain, Rocket, Clock, Shield } from "lucide-react";

const valueProps = [
  {
    icon: Brain,
    title: "AI-Powered Responses",
    description: "Claude 3.5 Sonnet understands customer intent. Semantic matching = 4x conversion uplift.",
  },
  {
    icon: Rocket,
    title: "5-Minute Setup",
    description: "OAuth → Upload products → Go live. No code. No complexity. Seriously.",
  },
  {
    icon: Clock,
    title: "24/7 Sales Automation",
    description: "Respond to every DM instantly. While you sleep. Every single customer gets instant replies.",
  },
  {
    icon: Shield,
    title: "Hallucination-Proof",
    description: "AI only recommends products in YOUR catalog. Row-level security. No fake products. Ever.",
  },
];

const ValuePropsSection = () => {
  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="bg-white border border-border rounded-xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-landing-teal/10 flex items-center justify-center mb-5 group-hover:bg-landing-teal/20 transition-colors duration-300">
                <prop.icon className="w-7 h-7 text-landing-teal" />
              </div>
              <h3 className="font-poppins font-semibold text-lg text-foreground mb-3">
                {prop.title}
              </h3>
              <p className="font-inter text-sm text-muted-foreground leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;
