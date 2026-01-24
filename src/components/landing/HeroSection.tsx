import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-[100px] px-5 md:px-10 lg:px-[60px] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left side - Text (60%) */}
          <div className="flex-1 lg:flex-[0.6] text-center lg:text-left max-w-[600px] lg:max-w-none">
            <h1 className="font-poppins font-bold text-[44px] md:text-[56px] lg:text-[72px] text-black leading-[1.1] mb-6">
              Make the most out of every conversation
            </h1>
            <p className="font-inter text-lg md:text-xl text-muted-foreground leading-[1.6] mb-8 max-w-[550px] mx-auto lg:mx-0">
              AI-powered automation that turns Instagram comments and DMs into sales. No coding required. Set up in minutes.
            </p>
            
            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <Button 
                asChild
                className="bg-manychat-yellow hover:bg-[#E5D600] text-black font-inter font-semibold text-lg py-4 px-10 h-auto rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                <Link to="/signup">GET STARTED FREE</Link>
              </Button>
              <Button 
                variant="ghost"
                className="text-black font-inter font-normal text-base gap-2 hover:bg-transparent hover:text-muted-foreground"
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white" />
                  ))}
                </div>
                <span className="font-inter text-sm text-muted-foreground">500+ brands trust InstaAI</span>
              </div>
            </div>
          </div>
          
          {/* Right side - Dashboard Mockup (40%) */}
          <div className="flex-1 lg:flex-[0.4] w-full max-w-lg lg:max-w-none">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-black rounded-2xl shadow-2xl p-5 transform hover:scale-[1.02] transition-transform duration-300">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-manychat-yellow flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-white">InstaAI Dashboard</p>
                      <p className="text-xs text-white/60">Live conversations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-manychat-green/20 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 bg-manychat-green rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium text-manychat-green">Active</span>
                  </div>
                </div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 py-4">
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-white">847</p>
                    <p className="text-xs text-white/60">Messages</p>
                  </div>
                  <div className="text-center p-3 bg-manychat-yellow/10 rounded-xl border border-manychat-yellow/20">
                    <p className="text-2xl font-bold text-manychat-yellow">4.2x</p>
                    <p className="text-xs text-white/60">Conversion</p>
                  </div>
                  <div className="text-center p-3 bg-white/5 rounded-xl">
                    <p className="text-2xl font-bold text-white">1.2s</p>
                    <p className="text-xs text-white/60">Avg Reply</p>
                  </div>
                </div>
                
                {/* Instagram DM Preview */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">IG</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white">@customer_sarah</p>
                      <p className="text-[10px] text-white/50">Just now</p>
                    </div>
                  </div>
                  
                  {/* Chat Bubbles */}
                  <div className="space-y-2.5">
                    <div className="flex justify-start">
                      <div className="bg-white/10 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%]">
                        <p className="text-xs text-white">Do you have this dress in blue? 💙</p>
                      </div>
                    </div>
                    <div className="flex justify-end items-end gap-1.5">
                      <div className="flex items-center">
                        <span className="bg-manychat-yellow text-black text-[9px] font-bold px-1.5 py-0.5 rounded">AI</span>
                      </div>
                      <div className="bg-manychat-yellow text-black rounded-2xl rounded-br-md px-3 py-2 max-w-[85%]">
                        <p className="text-xs font-medium">Yes! Ocean Blue, Size M - $89. Ships today! 🚀</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Response Time Badge */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Zap className="w-4 h-4 text-manychat-yellow" />
                  <span className="text-xs font-medium text-white/60">
                    Responded in <span className="text-white font-semibold">1.2 seconds</span>
                  </span>
                </div>
              </div>
              
              {/* Floating Accent Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-manychat-yellow/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-manychat-yellow/30 rounded-full blur-xl" />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 hidden md:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-manychat-green/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-manychat-green" />
                </div>
                <div>
                  <p className="text-sm font-bold text-black">+127%</p>
                  <p className="text-[10px] text-muted-foreground">Revenue this month</p>
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
