import { X, Check } from "lucide-react";

const beforeItems = [
  "Manual replies to every DM (takes 8 hours/week)",
  "Copy-pasting the same replies 417 times",
  "4-6 hour response delay",
  "50% of hot leads abandon",
  "Losing sales while you sleep",
  "No data on customer intent",
];

const afterItems = [
  "AI responds in <2 seconds",
  "24/7 automation while you sleep",
  "Instant customer replies",
  "4x sales conversion uplift",
  "Organized, tagged leads for follow-up",
  "Real-time insights on customer intent",
];

const BeforeAfterSection = () => {
  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-landing-background">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-landing-headline mb-4">
            Your Inbox: A Before & After
          </h2>
          <p className="font-inter text-base text-landing-subheadline">
            More messages, less mess
          </p>
        </div>

        {/* Before/After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before Column */}
          <div className="bg-red-50 rounded-xl p-8 border border-red-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <X className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-red-600">
                Before
              </h3>
            </div>
            <ul className="space-y-4">
              {beforeItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="font-inter text-sm text-foreground leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* After Column */}
          <div className="bg-green-50 rounded-xl p-8 border border-green-100">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Check className="w-4 h-4 text-green-600" />
              </div>
              <h3 className="font-poppins font-semibold text-xl text-green-600">
                After
              </h3>
            </div>
            <ul className="space-y-4">
              {afterItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="font-inter text-sm text-foreground leading-relaxed">
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
