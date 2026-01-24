const valueProps = [
  {
    emoji: "🧠",
    title: "AI-Powered Responses",
    description: "Claude 3.5 Sonnet understands customer intent. Semantic matching = 4x conversion uplift.",
  },
  {
    emoji: "🚀",
    title: "5-Minute Setup",
    description: "OAuth → Upload products → Go live. No code. No complexity.",
  },
  {
    emoji: "⏰",
    title: "24/7 Sales Automation",
    description: "Respond to every DM instantly. While you sleep. Every customer gets instant replies.",
  },
  {
    emoji: "🛡️",
    title: "Hallucination-Proof",
    description: "AI only recommends products in YOUR catalog. Row-level security. No fake products.",
  },
];

const ValuePropsSection = () => {
  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="bg-white border border-[#e5e7eb] border-t-4 border-t-[#FFD60A] rounded-xl p-10 shadow-[0px_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0px_4px_16px_rgba(0,0,0,0.1)] hover:border-t-[#FFEB3B] transition-all duration-300 group"
            >
              <span className="text-[50px] block mb-4">{prop.emoji}</span>
              <h3 className="font-poppins font-semibold text-xl text-[#001D3D] mb-3">
                {prop.title}
              </h3>
              <p className="font-inter text-sm text-[#6b7280] leading-relaxed">
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
