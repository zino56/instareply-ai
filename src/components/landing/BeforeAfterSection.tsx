const beforeItems = [
  "Manual replies to every DM",
  "Copy-pasting same replies",
  "4-6 hour response delay",
  "50% of leads abandon",
  "Losing sales while you sleep",
];

const afterItems = [
  "AI responds in <2 seconds",
  "24/7 automation while you sleep",
  "Instant customer replies",
  "4x sales conversion uplift",
  "Organized, tagged leads",
];

const BeforeAfterSection = () => {
  return (
    <section className="py-16 md:py-[100px] px-5 md:px-10 bg-white">
      <div className="max-w-[1100px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[32px] md:text-[40px] text-[#001D3D] text-center mb-12 md:mb-[60px]">
          Your Inbox: A Before & After
        </h2>

        {/* Before/After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {/* Before Column */}
          <div className="bg-[#fff4f4] rounded-xl p-8 md:p-10 border-l-[5px] border-l-[#ef4444] min-h-[320px] hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-poppins font-semibold text-2xl text-[#ef4444] mb-6">
              ❌ Before
            </h3>
            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#ef4444] mt-0.5">•</span>
                  <span className="font-inter text-sm text-[#1f2937] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Column */}
          <div className="bg-[#f0fdf4] rounded-xl p-8 md:p-10 border-l-[5px] border-l-[#10b981] min-h-[320px] hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-poppins font-semibold text-2xl text-[#10b981] mb-6">
              ✅ After
            </h3>
            <ul className="space-y-4">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-[#10b981] mt-0.5">•</span>
                  <span className="font-inter text-sm text-[#1f2937] leading-relaxed">
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
