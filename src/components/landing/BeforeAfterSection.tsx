import { X, Check } from "lucide-react";

const without = [
  "DMs pile up across two apps with no shared inbox",
  "Reps copy-paste the same qualifying questions",
  "Leads go cold overnight because nobody owns them",
  "No trace of the conversation once it moves to the CRM",
];

const withConveero = [
  "One inbox for Instagram DMs and WhatsApp threads",
  "AI qualifies with your questions, in your tone",
  "Leads are routed to the right rep within seconds",
  "Every message is synced to the deal record, automatically",
];

const BeforeAfterSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="section-container">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-4">The problem</div>
          <h2 className="font-display text-[36px] md:text-[48px] leading-[1.05] text-foreground">
            DMs are where deals start — and where they die.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Instagram and WhatsApp aren't a support channel anymore. They're the top of your funnel. But treating them like a shared inbox breaks the second volume shows up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card p-8">
            <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-5">Without Conveero</div>
            <ul className="space-y-4">
              {without.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-muted-foreground" />
                  </span>
                  <span className="text-[15px] text-foreground/85 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-foreground/90 bg-card p-8 relative">
            <div className="absolute -top-3 left-8 text-[10px] uppercase tracking-[0.16em] text-background bg-foreground px-2 py-1 rounded">
              With Conveero
            </div>
            <ul className="space-y-4 mt-3">
              {withConveero.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </span>
                  <span className="text-[15px] text-foreground leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
