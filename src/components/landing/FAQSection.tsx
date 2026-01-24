import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    answer: "Not at all. Upload your products via CSV (or manual entry). Set your AI tone preference (friendly/professional/casual). Done. AI handles everything automatically. No code required.",
  },
  {
    question: "What if a customer asks something outside my product catalog?",
    answer: "AI gracefully handles it. Either politely says 'I'm here to help with [your products]' or escalates to you for manual reply. Smart deflection, never robotic.",
  },
  {
    question: "How much revenue can I actually make?",
    answer: "Average customer sees 4x conversion uplift from automation. Typical shop: $30k/month revenue → +$6k/month additional from InstaAI. Your results depend on product/audience.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-20 px-5 md:px-10 bg-white">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-landing-headline">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-border rounded-lg px-6 data-[state=open]:shadow-md transition-shadow duration-200"
            >
              <AccordionTrigger className="font-poppins font-semibold text-base text-foreground hover:text-landing-teal hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-inter text-sm text-muted-foreground leading-relaxed pb-5 pt-2 border-t border-border">
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
