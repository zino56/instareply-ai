import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Generated $65k in revenue in 3 months. InstaAI handles 90% of our customer replies.",
    name: "Sarah Chen",
    niche: "Fashion & Beauty Store",
    followers: "15.3k Instagram followers",
    avatar: "SC",
  },
  {
    quote: "Before: 50 unanswered DMs per day. After: 100% response rate in <2 minutes.",
    name: "James Rodriguez",
    niche: "Electronics E-commerce",
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
    quote: "We were drowning in DMs. InstaAI gave us our life back while increasing revenue.",
    name: "Michael Park",
    niche: "Home Decor",
    followers: "12k followers",
    avatar: "MP",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
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
    <section className="py-16 md:py-[100px] px-5 md:px-10 bg-manychat-light-gray">
      <div className="max-w-[750px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[32px] md:text-[40px] text-black text-center mb-12 md:mb-16">
          What Our Customers Say
        </h2>

        {/* Testimonial Card */}
        <div className="bg-white rounded-xl border border-border shadow-card p-8 md:p-[50px] transition-all duration-300">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-[18px] h-[18px] fill-manychat-yellow text-manychat-yellow" />
            ))}
          </div>

          {/* Quote */}
          <blockquote className="text-center mb-8">
            <p className="font-inter text-lg md:text-xl text-black italic leading-relaxed">
              "{currentTestimonial.quote}"
            </p>
          </blockquote>

          {/* Customer Info */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-manychat-yellow to-[#E5D600] text-black flex items-center justify-center font-poppins font-semibold text-lg">
              {currentTestimonial.avatar}
            </div>
            <div className="text-center">
              <p className="font-poppins font-semibold text-base text-black">
                {currentTestimonial.name}
              </p>
              <p className="font-inter text-[13px] text-muted-foreground">
                {currentTestimonial.niche}
              </p>
              <p className="font-inter text-[13px] text-muted-foreground">
                {currentTestimonial.followers}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={goToPrevious}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center text-black hover:bg-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Dots */}
          <div className="flex gap-2.5">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-manychat-yellow w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-border flex items-center justify-center text-black hover:bg-white transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
