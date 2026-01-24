import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 lg:py-[100px] px-5 md:px-10 lg:px-[60px] overflow-hidden">
      {/* Yellow accent bar on left */}
      <div className="absolute left-0 top-0 w-[3px] h-full bg-[#FFD60A]" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left side - Text (55%) */}
          <div className="flex-1 lg:flex-[0.55] text-center lg:text-left lg:pl-[60px] max-w-[550px] lg:max-w-none">
            <h1 className="font-poppins font-bold text-[40px] md:text-[48px] lg:text-[52px] text-[#1f2937] leading-[1.2] mb-6">
              Turn Every Instagram Message Into a Sale
            </h1>
            <p className="font-inter text-base md:text-lg text-[#6b7280] leading-[1.6] mb-8 max-w-[550px] mx-auto lg:mx-0">
              AI-powered responses that understand customer intent. 4x conversion uplift. 24/7 sales automation.
            </p>
            
            {/* CTA Buttons - Stacked */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto lg:mx-0">
              <Button 
                asChild
                className="bg-[#FFD60A] hover:bg-[#E5C009] text-[#001D3D] font-inter font-semibold text-base py-3.5 px-8 h-auto rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 w-full lg:w-auto"
              >
                <Link to="/signup">Start Free</Link>
              </Button>
              <Button 
                variant="outline"
                className="bg-white border-2 border-[#FFD60A] text-[#FFD60A] hover:bg-[#FFD60A] hover:text-[#001D3D] font-inter font-normal text-sm py-3 px-7 h-auto rounded-lg transition-all duration-200 w-full lg:w-auto"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Badge */}
            <p className="font-inter text-sm text-[#1f2937] flex items-center justify-center lg:justify-start gap-2 mt-5">
              <span className="text-lg">💚</span>
              Trusted by 500+ e-commerce brands
            </p>
          </div>
          
          {/* Right side - Dashboard Mockup (45%) */}
          <div className="flex-1 lg:flex-[0.45] w-full max-w-lg lg:max-w-none lg:pr-10">
            <div className="relative">
              {/* Main Dashboard Card */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 transform hover:scale-[1.02] transition-transform duration-300">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FFD60A] flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-[#001D3D]" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1f2937]">InstaAI Dashboard</p>
                      <p className="text-xs text-[#6b7280]">Live conversations</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium text-green-700">Active</span>
                  </div>
                </div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-3 py-4">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-[#1f2937]">847</p>
                    <p className="text-xs text-[#6b7280]">Messages</p>
                  </div>
                  <div className="text-center p-3 bg-[#FFF9DB] rounded-xl border border-[#FFD60A]/20">
                    <p className="text-2xl font-bold text-[#1f2937]">4.2x</p>
                    <p className="text-xs text-[#6b7280]">Conversion</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-[#1f2937]">1.2s</p>
                    <p className="text-xs text-[#6b7280]">Avg Reply</p>
                  </div>
                </div>
                
                {/* Instagram DM Preview */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">IG</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-[#1f2937]">@customer_sarah</p>
                      <p className="text-[10px] text-[#6b7280]">Just now</p>
                    </div>
                  </div>
                  
                  {/* Chat Bubbles */}
                  <div className="space-y-2.5">
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl rounded-bl-md px-3 py-2 max-w-[85%]">
                        <p className="text-xs text-[#1f2937]">Do you have this dress in blue? 💙</p>
                      </div>
                    </div>
                    <div className="flex justify-end items-end gap-1.5">
                      <div className="flex items-center">
                        <span className="bg-[#FFD60A] text-[#001D3D] text-[9px] font-bold px-1.5 py-0.5 rounded">AI</span>
                      </div>
                      <div className="bg-[#FFD60A] text-[#001D3D] rounded-2xl rounded-br-md px-3 py-2 max-w-[85%]">
                        <p className="text-xs font-medium">Yes! Ocean Blue, Size M - $89. Ships today! 🚀</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Response Time Badge */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Zap className="w-4 h-4 text-[#FFD60A]" />
                  <span className="text-xs font-medium text-[#6b7280]">
                    Responded in <span className="text-[#1f2937] font-semibold">1.2 seconds</span>
                  </span>
                </div>
              </div>
              
              {/* Floating Accent Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FFD60A]/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#FFD60A]/30 rounded-full blur-xl" />
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-3 hidden md:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1f2937]">+127%</p>
                  <p className="text-[10px] text-[#6b7280]">Revenue this month</p>
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
