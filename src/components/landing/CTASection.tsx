import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/40 border-t border-border">
      <div className="section-container">
        <div className="rounded-2xl bg-foreground text-background px-8 md:px-16 py-14 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-[36px] md:text-[52px] leading-[1.05] mb-5">
              Stop reading DMs one at a time.
            </h2>
            <p className="text-background/75 text-lg mb-8 leading-relaxed">
              See how Conveero replies, qualifies, and routes your Instagram and WhatsApp leads — with your team still in control.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="h-11 rounded-[10px] bg-background text-foreground hover:bg-accent hover:text-accent-foreground font-medium px-5">
                <Link to="/signup">
                  Start free <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-[10px] bg-transparent border-background/40 text-background hover:bg-background/10 font-medium px-5">
                <a href="#contact">Book a demo</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
