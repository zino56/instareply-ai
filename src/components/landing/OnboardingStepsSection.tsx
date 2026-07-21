import { Link2, Bot, Clock, ArrowRightLeft } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Link2,
    title: "Connect",
    desc: "Plug in your Instagram business account and WhatsApp Business number. No custom code.",
  },
  {
    n: "02",
    icon: Bot,
    title: "Reply & qualify",
    desc: "Conveero answers first-touch, asks your qualifying questions, and tags the lead.",
  },
  {
    n: "03",
    icon: Clock,
    title: "Follow up",
    desc: "Automatic nudges on your cadence — polite, specific, and paused the moment a human replies.",
  },
  {
    n: "04",
    icon: ArrowRightLeft,
    title: "Hand off",
    desc: "Qualified leads are routed to the right rep and synced to your CRM with the full transcript.",
  },
];

const OnboardingStepsSection = () => {
  return (
    <section id="how" className="py-20 md:py-28 bg-secondary/40 border-y border-border">
      <div className="section-container">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-4">How it works</div>
          <h2 className="font-display text-[36px] md:text-[48px] leading-[1.05] text-foreground">
            From DM to booked call, in four steps.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.n} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs text-muted-foreground tracking-widest">{step.n}</span>
                <step.icon className="w-4 h-4 text-accent" strokeWidth={1.75} />
              </div>
              <h3 className="font-display text-2xl text-foreground mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OnboardingStepsSection;
