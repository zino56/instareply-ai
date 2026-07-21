import { Instagram, MessageCircle, Sparkles, UserCheck, Calendar } from "lucide-react";

const WorkflowPreviewSection = () => {
  return (
    <section id="workflow" className="py-20 md:py-28 bg-background">
      <div className="section-container">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-4">Product</div>
          <h2 className="font-display text-[36px] md:text-[48px] leading-[1.05] text-foreground">
            One command center for every conversation.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Follow a single lead through every stage — the same way your team already thinks about pipeline.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-elevated overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-secondary/40">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
            </div>
            <div className="ml-3 text-xs text-muted-foreground">conveero.app / lead · #4821</div>
            <span className="ml-auto text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Illustrative</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5">
            <Stage
              icon={Instagram}
              stage="01 · Inbound"
              title="DM lands"
              body="Maya messages your Instagram at 21:47 asking about Berlin availability."
              meta="Instagram · 21:47"
            />
            <Stage
              icon={Sparkles}
              stage="02 · Draft"
              title="AI drafts reply"
              body="Conveero writes a first response in your voice and asks your two qualifying questions."
              meta="0.9s draft time"
              accent
            />
            <Stage
              icon={UserCheck}
              stage="03 · Qualify"
              title="Lead scored"
              body="Team of 12 · Aug launch · Berlin. Tagged high-intent, EMEA, mid-market."
              meta="Auto-tagged"
            />
            <Stage
              icon={MessageCircle}
              stage="04 · Follow up"
              title="Nudge scheduled"
              body="If no reply in 24h, send a polite check-in on WhatsApp with a booking link."
              meta="Paused on human reply"
            />
            <Stage
              icon={Calendar}
              stage="05 · Hand off"
              title="Routed to Lena"
              body="Assigned to Lena R. (EMEA). Full transcript synced to HubSpot as deal #4821."
              meta="Booked · Fri 14:00"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

function Stage({
  icon: Icon,
  stage,
  title,
  body,
  meta,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  stage: string;
  title: string;
  body: string;
  meta: string;
  accent?: boolean;
}) {
  return (
    <div className={`p-6 border-b lg:border-b-0 lg:border-r last:border-r-0 border-border ${accent ? "bg-accent/[0.04]" : ""}`}>
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground"}`}>
          <Icon className="w-4 h-4" />
        </span>
      </div>
      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-1">{stage}</div>
      <h3 className="font-display text-xl text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{body}</p>
      <div className="text-[11px] text-foreground/70 border-t border-border pt-3">{meta}</div>
    </div>
  );
}

export default WorkflowPreviewSection;
