import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-mc-black">
        <div className="absolute inset-0 bg-gradient-to-br from-mc-black via-mc-black/90 to-mc-dark-gray" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-[60px] pt-[120px] pb-[60px] md:pt-[120px] md:pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left Column - Text */}
          <div className="animate-slide-in-left text-center lg:text-left">
            <h1 className="font-poppins font-bold text-[40px] md:text-[72px] text-white leading-[1.1] tracking-[-0.02em] mb-6">
              Make the most out of every conversation
            </h1>
            <p className="font-inter text-base md:text-lg text-white/90 leading-relaxed mb-10 max-w-[500px] mx-auto lg:mx-0">
              Sell more, engage better, and grow your audience. AI-powered automation 
              that turns messages into revenue.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button
                asChild
                className="bg-mc-magenta hover:bg-[#E600E6] text-white font-poppins font-bold 
                  text-base px-10 py-4 h-auto rounded-lg transition-all duration-200 
                  hover:shadow-magenta hover:-translate-y-0.5"
              >
                <Link to="/signup">GET STARTED FREE</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-transparent border-2 border-white text-white font-poppins font-bold 
                  text-base px-10 py-4 h-auto rounded-lg transition-all duration-200 
                  hover:bg-white/10 hover:border-mc-yellow group"
              >
                <a href="#demo" className="flex items-center gap-2">
                  <Play className="w-4 h-4 group-hover:text-mc-yellow transition-colors" />
                  WATCH DEMO
                </a>
              </Button>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                {["from-pink-500 to-rose-500", "from-blue-500 to-cyan-500", "from-purple-500 to-violet-500", "from-amber-500 to-orange-500"].map((gradient, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-mc-black`} />
                ))}
              </div>
              <span className="font-inter text-sm text-white/70">500+ brands trust Conveero</span>
            </div>
          </div>

          {/* Right Column - Mockup */}
          <div className="animate-slide-in-right relative">
            <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto">
              {/* Phone Mockup */}
              <div className="bg-mc-dark-gray rounded-[24px] p-4 shadow-hero">
                <div className="bg-white rounded-[16px] overflow-hidden">
                  {/* Instagram Header */}
                  <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-mc-magenta" />
                    <span className="font-inter font-semibold text-sm text-mc-black">Instagram DMs</span>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="p-4 space-y-4 min-h-[300px]">
                    {/* Incoming Message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                        <p className="font-inter text-sm text-mc-black">Hey! How much is this product? 🤔</p>
                      </div>
                    </div>

                    {/* Outgoing Message (AI) */}
                    <div className="flex justify-end">
                      <div className="bg-mc-yellow rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                        <p className="font-inter text-sm text-mc-black">
                          Hi! 👋 Great choice! This item is $49.99. Would you like me to send you the checkout link?
                        </p>
                      </div>
                    </div>

                    {/* Incoming Message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                        <p className="font-inter text-sm text-mc-black">Yes please! 💸</p>
                      </div>
                    </div>

                    {/* Outgoing Message (AI) */}
                    <div className="flex justify-end">
                      <div className="bg-mc-yellow rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                        <p className="font-inter text-sm text-mc-black">
                          Perfect! Here's your checkout link: shop.link/abc123 ✨
                        </p>
                      </div>
                    </div>

                    {/* AI Badge */}
                    <div className="flex justify-center mt-4">
                      <span className="bg-mc-magenta/10 text-mc-magenta font-inter text-xs font-medium px-3 py-1.5 rounded-full">
                        ⚡ Powered by Conveero
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -left-4 top-1/4 bg-white rounded-lg p-3 shadow-lg animate-fade-in hidden lg:block">
                <div className="flex items-center gap-2">
                  <span className="text-mc-green text-lg">📈</span>
                  <div>
                    <p className="font-poppins font-bold text-mc-black text-sm">4x</p>
                    <p className="font-inter text-xs text-mc-gray">Conversion</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-white rounded-lg p-3 shadow-lg animate-fade-in hidden lg:block" style={{ animationDelay: '200ms' }}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <p className="font-poppins font-bold text-mc-black text-sm">&lt;2s</p>
                    <p className="font-inter text-xs text-mc-gray">Response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
