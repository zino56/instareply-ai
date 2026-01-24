import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Is this automation safe for my Instagram account?",
    answer: "Yes. We use Meta's official Graph API (same as Instagram business tools). Zero account risk. We're an Official Meta Business Partner. Your account stays safe.",
  },
  {
    question: "Can the AI say wrong things (hallucinate)?",
    answer: "No. We use strict Row-Level Security validation. AI only recommends products in your catalog. If you have 24 products, it can only mention those 24. 100% hallucination-proof.",
  },
  {
    question: "Do I need coding skills?",
    answer: "Not at all. Upload your products via CSV. Set your AI tone (friendly/professional/casual). Done. AI handles everything automatically. No code required.",
  },
  {
    question: "What if a customer asks something outside my product catalog?",
    answer: "AI gracefully handles it. Either politely says 'I'm here to help with [your products]' or escalates to you for manual reply. Smart deflection, never robotic.",
  },
  {
    question: "How much revenue can I actually make?",
    answer: "Average customer sees 4x conversion uplift from automation. Typical shop: $30k/month revenue → +$6k/month additional from InstaAI. Your results depend on product/audience.",
  },
  {
    question: "What if I need help setting things up?",
    answer: "We offer 24/7 email support for all tiers. Pro and Enterprise get priority support with guaranteed 2-hour response times. Onboarding calls available for Enterprise.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-[60px] md:py-[100px] px-5 md:px-[60px] bg-mc-light-gray">
      <div className="max-w-[900px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[28px] md:text-[40px] text-mc-black text-center mb-12 md:mb-16 leading-tight">
          Frequently asked questions
        </h2>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-[#E0E0E0] rounded-lg px-6 
                hover:bg-[#F9F9F9] transition-colors duration-200 
                data-[state=open]:bg-[#F9F9F9]"
            >
              <AccordionTrigger 
                className="font-poppins font-bold text-base md:text-lg text-mc-black 
                  hover:no-underline py-6 [&[data-state=open]>svg]:text-mc-yellow 
                  [&>svg]:text-mc-black [&>svg]:transition-colors [&>svg]:duration-200
                  hover:[&>svg]:text-mc-yellow"
              >
                {faq.question}
              </AccordionTrigger>
              <AccordionContent 
                className="font-inter text-[15px] text-mc-gray leading-relaxed pb-6"
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button 
            asChild
            className="bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black font-poppins font-bold 
              text-base md:text-lg py-4 px-10 h-auto rounded-lg shadow-yellow 
              hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <Link to="/signup">Try InstaAI for free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
