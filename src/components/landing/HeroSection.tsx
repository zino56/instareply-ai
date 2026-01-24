import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-landing-background py-16 md:py-20 px-5 md:px-15">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left side - Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="font-poppins font-bold text-4xl md:text-5xl text-landing-headline leading-tight mb-6">
              Turn Every Instagram Message Into a Sale
            </h1>
            <p className="font-inter text-lg text-landing-subheadline mb-8 max-w-xl mx-auto lg:mx-0">
              AI-powered responses that understand customer intent. 4x conversion uplift. 24/7 sales automation.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
              <Button 
                asChild
                className="bg-landing-teal hover:bg-landing-teal/90 text-white font-inter font-medium text-sm py-3.5 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Link to="/signup">Start Free</Link>
              </Button>
              <Button 
                variant="outline"
                className="border-landing-teal text-landing-teal hover:bg-landing-teal/5 font-inter font-medium text-sm py-3.5 px-8 rounded-lg transition-all duration-200"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Badge */}
            <p className="font-inter text-sm text-landing-headline flex items-center justify-center lg:justify-start gap-2">
              <span className="text-lg">💚</span>
              Trusted by 500+ e-commerce brands
            </p>
          </div>
          
          {/* Right side - Image Mockup */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="bg-white rounded-2xl shadow-xl border border-border p-4 transform hover:scale-[1.02] transition-transform duration-300">
              {/* Instagram DM Header */}
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">IG</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">@fashion_store</p>
                  <p className="text-xs text-muted-foreground">Instagram Direct</p>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="py-6 space-y-4">
                {/* Customer Message */}
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                    <p className="text-sm">Do you have this dress in blue? Size M?</p>
                  </div>
                </div>
                
                {/* AI Response */}
                <div className="flex justify-end items-end gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="bg-landing-teal text-white text-[10px] px-1.5 py-0.5 rounded">AI</span>
                  </div>
                  <div className="bg-landing-teal text-white rounded-2xl rounded-br-md px-4 py-2.5 max-w-[80%]">
                    <p className="text-sm">Yes! We have the Aurora Dress in Ocean Blue, Size M. It's $89 and ships same-day! 💙 Want me to send the link?</p>
                  </div>
                </div>
                
                {/* Customer Response */}
                <div className="flex justify-start">
                  <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-2.5 max-w-[80%]">
                    <p className="text-sm">Yes please! 🙏</p>
                  </div>
                </div>
              </div>
              
              {/* Response Time Badge */}
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Responded in 1.2 seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
