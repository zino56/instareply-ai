import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote: "Generated $65k in revenue in 3 months. Conveero handles 90% of our customer replies.",
    name: "Sarah Chen",
    company: "Fashion & Beauty Store",
    followers: "15.3k",
    avatar: "SC",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    quote: "Before: 50 unanswered DMs per day. After: 100% response rate in <2 minutes.",
    name: "James Rodriguez",
    company: "Electronics E-commerce",
    followers: "8.7k",
    avatar: "JR",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    quote: "5-minute setup. Immediate sales lift. Best ROI we've seen on any automation tool.",
    name: "Emma Thompson",
    company: "Jewelry & Accessories",
    followers: "24.5k",
    avatar: "ET",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    quote: "We were drowning in DMs. Conveero gave us our life back while increasing revenue.",
    name: "Michael Park",
    company: "Home Decor",
    followers: "12k",
    avatar: "MP",
    gradient: "from-amber-500 to-orange-500",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <section className="py-[60px] md:py-[100px] px-5 md:px-[60px] bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[32px] md:text-[48px] text-mc-black text-center mb-12 md:mb-16">
          Loved by e-commerce brands
        </h2>

        {/* Testimonial Card */}
        <div className="max-w-[700px] mx-auto">
          <div className="bg-white border border-border rounded-2xl p-8 md:p-10 shadow-card transition-all duration-300">
            {/* Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-mc-yellow text-mc-yellow" />
              ))}
            </div>

            {/* Quote */}
            <p className="font-inter text-base md:text-lg text-mc-black text-center italic leading-relaxed mb-8">
              "{currentTestimonial.quote}"
            </p>

            {/* Customer Info */}
            <div className="flex flex-col items-center gap-4">
              {/* Avatar */}
              <div 
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${currentTestimonial.gradient} 
                  flex items-center justify-center text-white font-poppins font-bold text-sm`}
              >
                {currentTestimonial.avatar}
              </div>

              {/* Details */}
              <div className="text-center">
                <p className="font-poppins font-bold text-base text-mc-black">
                  {currentTestimonial.name}
                </p>
                <p className="font-inter text-sm text-mc-gray">
                  {currentTestimonial.company}
                </p>
                <p className="font-inter text-xs text-[#999999] mt-1">
                  {currentTestimonial.followers} Instagram followers
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full text-mc-black hover:text-mc-yellow hover:bg-mc-light-gray transition-colors duration-200 focus-ring"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 focus-ring ${
                    index === currentIndex
                      ? "bg-mc-yellow scale-110"
                      : "bg-[#D0D0D0] hover:bg-mc-gray"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              className="p-2 rounded-full text-mc-black hover:text-mc-yellow hover:bg-mc-light-gray transition-colors duration-200 focus-ring"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
