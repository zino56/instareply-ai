import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Generated $65k in revenue in 3 months. InstaAI handles 90% of our customer replies.",
    name: "Sarah Chen",
    niche: "Fashion & Beauty Store",
    followers: "15.3k Instagram followers",
    avatar: "SC",
  },
  {
    quote: "Before: 50 unanswered DMs per day. After: 100% response rate in less than 2 minutes.",
    name: "James Rodriguez",
    niche: "E-commerce (Electronics)",
    followers: "8.7k followers",
    avatar: "JR",
  },
  {
    quote: "5-minute setup. Immediate sales lift. Best ROI we've seen on any automation tool.",
    name: "Emma Thompson",
    niche: "Jewelry & Accessories",
    followers: "24.5k followers",
    avatar: "ET",
  },
  {
    quote: "We were drowning in DMs. InstaAI gave us our life back while actually increasing revenue.",
    name: "Michael Park",
    niche: "Home Decor",
    followers: "12k followers",
    avatar: "MP",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-landing-background">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-landing-headline">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-2xl border border-border shadow-lg p-8 md:p-12 transition-all duration-300">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-center mb-8">
            <p className="font-inter text-lg md:text-xl text-foreground italic leading-relaxed">
              "{currentTestimonial.quote}"
            </p>
          </blockquote>

          {/* Customer Info */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-landing-teal text-white flex items-center justify-center font-semibold">
              {currentTestimonial.avatar}
            </div>
            <div className="text-center">
              <p className="font-poppins font-semibold text-sm text-foreground">
                {currentTestimonial.name}
              </p>
              <p className="font-inter text-xs text-muted-foreground">
                {currentTestimonial.niche}
              </p>
              <p className="font-inter text-xs text-muted-foreground">
                {currentTestimonial.followers}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="rounded-full border-border hover:bg-muted"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-landing-teal w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="rounded-full border-border hover:bg-muted"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
