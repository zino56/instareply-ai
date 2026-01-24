import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this automation safe for my Instagram account?",
    answer: "Yes. We use Meta's official Graph API. Zero account risk. We're a Meta Business Partner.",
  },
  {
    question: "Can the AI say wrong things (hallucinate)?",
    answer: "No. We use Row-Level Security. AI only recommends products in your catalog. 100% hallucination-proof.",
  },
  {
    question: "Do I need coding skills?",
    answer: "Not at all. Upload CSV. Set AI tone. Done. No code required.",
  },
  {
    question: "What if customer asks something outside my catalog?",
    answer: "AI gracefully deflects or escalates to you. Never robotic.",
  },
  {
    question: "How much revenue can I make?",
    answer: "Average customer sees 4x uplift. Typical: $30k/month → +$6k/month additional revenue from InstaAI.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-[100px] px-5 md:px-10 bg-white">
      <div className="max-w-[800px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[32px] md:text-[40px] text-[#001D3D] text-center mb-12 md:mb-[60px]">
          Frequently Asked Questions
        </h2>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-[#e5e7eb] border-l-4 border-l-[#FFD60A] rounded-lg px-6 hover:bg-[#f9fafb] transition-colors duration-200 cursor-pointer"
            >
              <AccordionTrigger className="font-poppins font-semibold text-[15px] md:text-base text-[#001D3D] hover:no-underline py-6 pr-8 [&[data-state=open]>svg]:text-[#FFD60A] [&>svg]:text-[#FFD60A]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-inter text-[13px] md:text-sm text-[#6b7280] leading-[1.8] pb-6 pt-4 border-t border-[#e5e7eb] mt-0">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
