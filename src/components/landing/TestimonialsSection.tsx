const quotes = [
  {
    quote:
      "We finally treat our DMs like real pipeline. Conveero picks up the first message, qualifies, and routes it before we're even at our desks.",
    name: "Head of Sales",
    role: "B2B services · illustrative",
  },
  {
    quote:
      "Our reps stopped copy-pasting the same three questions. The AI handles first-touch and the transcript lands in HubSpot with the deal.",
    name: "Revenue Lead",
    role: "Agency · illustrative",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background border-t border-border">
      <div className="section-container">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-4">Built for</div>
          <h2 className="font-display text-[36px] md:text-[48px] leading-[1.05] text-foreground">
            Teams handling high-volume Instagram and WhatsApp leads.
          </h2>
        </div>

        {/* Logo strip — clearly labeled placeholder */}
        <div className="rounded-xl border border-dashed border-border bg-secondary/30 p-8 mb-10">
          <div className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-6 text-center">
            Placeholder — replace with real customer logos
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center opacity-60">
            {["Northwind", "Halcyon", "Meridian", "Foundry", "Atelier", "Grove"].map((n) => (
              <div key={n} className="font-display text-lg text-foreground/60 text-center tracking-tight">
                {n}
              </div>
            ))}
          </div>
        </div>

        {/* Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quotes.map((q) => (
            <figure key={q.name} className="rounded-xl border border-border bg-card p-8">
              <blockquote className="font-display text-2xl leading-snug text-foreground mb-6">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="flex items-center justify-between text-sm">
                <div>
                  <div className="text-foreground">{q.name}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{q.role}</div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Illustrative</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
