const beforeItems = [
  "Manual replies to every DM (8 hours/week)",
  "Copy-pasting same responses 417 times",
  "4-6 hour response delay",
  "50% of leads abandon",
  "Losing sales while you sleep",
  "No data on customer intent",
];

const afterItems = [
  "AI responds in <2 seconds",
  "24/7 automation while you sleep",
  "Instant customer replies",
  "4x conversion uplift",
  "Organized, tagged leads",
  "Real-time customer insights",
];

const BeforeAfterSection = () => {
  return (
    <section className="py-[60px] md:py-[100px] px-5 md:px-[60px] bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-mc-black text-center mb-12 md:mb-16">
          Your Inbox: A Before & After
        </h2>

        {/* Before/After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Before Column */}
          <div 
            className="bg-[#FFF5F5] rounded-xl p-8 md:p-10 min-h-[350px] 
              animate-slide-in-left hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="font-poppins font-bold text-[24px] md:text-[28px] text-mc-red mb-6 flex items-center gap-3">
              <span className="text-3xl">❌</span> BEFORE
            </h3>
            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-mc-red mt-0.5 text-lg">•</span>
                  <span className="font-inter text-base text-mc-black leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Column */}
          <div 
            className="bg-[#F0FDF4] rounded-xl p-8 md:p-10 min-h-[350px] 
              animate-slide-in-right hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="font-poppins font-bold text-[24px] md:text-[28px] text-mc-green mb-6 flex items-center gap-3">
              <span className="text-3xl">✅</span> AFTER
            </h3>
            <ul className="space-y-4">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-mc-green mt-0.5 text-lg">•</span>
                  <span className="font-inter text-base text-mc-black leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
