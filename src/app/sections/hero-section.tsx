/** Hero section — the page's lead block. */
export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden bg-black"
      data-cid="n31"
    >
      <div className="relative z-10 w-full max-w-[1280px] mx-auto px-5 md:px-[60px] pt-[100px] pb-[80px] md:pt-[120px] md:pb-[120px]">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-8 items-center">
          {/* Left column */}
          <div className="text-center lg:text-left">
            <h1
              data-component="heading"
              className="[font-family:'Poppins',_Inter,_system-ui,_sans-serif] font-bold text-[44px] md:text-[72px] text-white leading-[1.05] tracking-[-0.02em] mb-6"
            >
              Make the most out of every conversation
            </h1>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-[500px] mx-auto lg:mx-0">
              Sell more, engage better, and grow your audience. AI-powered automation that turns
              messages into revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a
                href="/signup"
                data-component="button"
                className="inline-flex items-center justify-center bg-[#FF00FF] hover:bg-[#E600E6] text-white font-bold text-sm tracking-wide px-10 py-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                GET STARTED FREE
              </a>
              <a
                href="#product"
                data-component="button"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold text-sm tracking-wide px-10 py-4 rounded-lg transition-all duration-200 hover:bg-white/10 hover:border-[#FFF100] hover:text-[#FFF100]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                WATCH DEMO
              </a>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                {[
                  "from-pink-500 to-rose-500",
                  "from-blue-500 to-cyan-500",
                  "from-purple-500 to-violet-500",
                  "from-amber-500 to-orange-500",
                ].map((gradient, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-black`}
                  />
                ))}
              </div>
              <span className="text-sm text-white/70">500+ brands trust Conveero</span>
            </div>
          </div>

          {/* Right column — DM mockup */}
          <div className="relative">
            <div className="relative w-full max-w-[500px] mx-auto lg:ml-auto">
              <div className="bg-[#111111] rounded-[24px] p-4 shadow-2xl">
                <div className="bg-white rounded-[16px] overflow-hidden">
                  <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FF00FF]" />
                    <span className="font-semibold text-sm text-black">Instagram DMs</span>
                  </div>

                  <div className="p-4 space-y-4 min-h-[300px]">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm text-black">Hey! How much is this product? 🤔</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-[#FFF100] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm text-black">
                          Hi! 👋 Great choice! This item is $49.99. Would you like me to send you the
                          checkout link?
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm text-black">Yes please! 💸</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-[#FFF100] rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                        <p className="text-sm text-black">
                          Perfect! Here's your checkout link: shop.link/abc123 ✨
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-center mt-4">
                      <span className="bg-[#FF00FF]/10 text-[#FF00FF] text-xs font-medium px-3 py-1.5 rounded-full">
                        ⚡ Powered by Conveero
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 top-1/4 bg-white rounded-lg p-3 shadow-lg hidden lg:block">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📈</span>
                  <div>
                    <p className="font-bold text-black text-sm">4x</p>
                    <p className="text-xs text-neutral-500">Conversion</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-white rounded-lg p-3 shadow-lg hidden lg:block">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚡</span>
                  <div>
                    <p className="font-bold text-black text-sm">&lt;2s</p>
                    <p className="text-xs text-neutral-500">Response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
