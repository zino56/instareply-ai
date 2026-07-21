import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Does Conveero work with both Instagram DMs and WhatsApp?",
    a: "Yes. Conveero connects to Instagram business accounts and WhatsApp Business numbers, and shows every conversation in one shared inbox.",
  },
  {
    q: "Can I control what the AI says?",
    a: "You define the qualifying questions, tone, and guardrails. Conveero drafts replies inside those rules and pauses the moment a teammate takes over.",
  },
  {
    q: "How are leads routed to my reps?",
    a: "You set the rules — by region, product line, deal size, language, or round-robin. Conveero assigns the lead and syncs the transcript to your CRM automatically.",
  },
  {
    q: "Which CRMs do you integrate with?",
    a: "HubSpot, Salesforce, and Pipedrive on Growth and Scale. Custom webhooks are available for other systems on Scale.",
  },
  {
    q: "How does Conveero handle our data?",
    a: "Conversations are encrypted in transit and at rest. You can export or delete workspace data at any time. We do not train models on your customer conversations.",
  },
  {
    q: "What happens when the trial ends?",
    a: "Nothing automatic. Your account switches to read-only and you choose a plan. No credit card is required to start the trial.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-background border-t border-border">
      <div className="section-container max-w-[900px]">
        <div className="mb-10">
          <div className="eyebrow mb-4">FAQ</div>
          <h2 className="font-display text-[36px] md:text-[48px] leading-[1.05] text-foreground">
            Answers before you ask.
          </h2>
        </div>

        <Accordion type="single" collapsible className="border-t border-border">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-b border-border"
            >
              <AccordionTrigger className="text-left text-base md:text-lg text-foreground hover:no-underline py-5 font-medium">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-muted-foreground leading-relaxed pb-5 pr-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
