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
    question: "What does InstaAI include?",
    answer: "InstaAI includes AI-powered DM automation, comment-to-DM conversion, product catalog integration, analytics dashboard, and 24/7 automated responses. All plans include our core automation features.",
  },
  {
    question: "Who is InstaAI for?",
    answer: "InstaAI is perfect for e-commerce brands, dropshipping stores, service providers, and anyone selling on Instagram who wants to automate customer conversations and boost sales.",
  },
  {
    question: "How much does InstaAI cost?",
    answer: "We offer three plans: Free ($0/month for up to 1,000 contacts), Pro ($15/month for unlimited contacts), and Elite (custom pricing for enterprise needs). All plans include core automation features.",
  },
  {
    question: "How do I upgrade to the next tier of Pro?",
    answer: "You can upgrade anytime from your dashboard. Go to Settings > Billing and select your new plan. Changes take effect immediately with prorated billing.",
  },
  {
    question: "Are there additional charges for messages?",
    answer: "No hidden fees. Your plan includes unlimited messages within your contact limit. Only pay for what you need based on your contact count.",
  },
  {
    question: "How does Email and SMS pricing work?",
    answer: "Email and SMS are optional add-ons. Email starts at $0.001 per message, SMS at $0.01 per message. You only pay for what you use.",
  },
  {
    question: "Can I cancel my payment plan options at any time?",
    answer: "Yes, you can cancel anytime. No long-term contracts. Your account stays active until the end of your billing period.",
  },
  {
    question: "What payment terms do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual plans.",
  },
  {
    question: "What is your refund policy for billing?",
    answer: "We offer a 30-day money-back guarantee. If you're not satisfied, contact support for a full refund. No questions asked.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-[100px] px-5 md:px-10 bg-white">
      <div className="max-w-[900px] mx-auto">
        {/* Section Header */}
        <h2 className="font-poppins font-bold text-[28px] md:text-[36px] text-black text-center mb-12 md:mb-[60px] leading-tight">
          Questions or InstaAI plan information and pricing info
        </h2>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-1">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white border border-border rounded-none first:rounded-t-lg last:rounded-b-lg px-5 hover:bg-manychat-light-gray transition-colors duration-200 cursor-pointer data-[state=open]:bg-manychat-light-gray"
            >
              <AccordionTrigger className="font-poppins font-semibold text-[15px] md:text-[18px] text-black hover:no-underline py-5 pr-8 [&[data-state=open]>svg]:text-manychat-yellow [&>svg]:text-manychat-yellow">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="font-inter text-[14px] md:text-[16px] text-muted-foreground leading-[1.8] pb-5 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button 
            asChild
            className="bg-manychat-yellow hover:bg-[#E5D600] text-black font-inter font-semibold text-lg py-4 px-10 h-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link to="/signup">Try InstaAI for free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
