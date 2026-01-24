const valueProps = [
  {
    emoji: "🎯",
    title: "Intention Recognition",
    description: "No instructions? No problem. InstaAI detects what customers want and routes them accordingly.",
  },
  {
    emoji: "🤖",
    title: "AI Flow",
    description: "Train your AI to understand your business and respond like you would - but faster and 24/7.",
  },
  {
    emoji: "📄",
    title: "Text Ingestion",
    description: "Upload your product catalog, FAQs, or policies and let AI automatically pull the right answers.",
  },
  {
    emoji: "✨",
    title: "Flow Builder Assistant",
    description: "Describe your automation in plain English and watch AI build the entire workflow for you.",
  },
];

const ValuePropsSection = () => {
  return (
    <section className="py-20 md:py-[100px] px-5 md:px-10 bg-black">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-white leading-tight mb-4">
            Smarter automations. Better conversations
          </h2>
          <p className="font-inter text-base md:text-lg text-white/60 max-w-[700px] mx-auto">
            Brand-new AI features available in Pro and Elite plans. No jargon, just effortless wins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] rounded-xl p-8 hover:scale-[1.02] transition-all duration-300 group"
            >
              <span className="text-[48px] block mb-4">{prop.emoji}</span>
              <h3 className="font-poppins font-bold text-xl text-white mb-3">
                {prop.title}
              </h3>
              <p className="font-inter text-sm text-white/60 leading-relaxed">
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
