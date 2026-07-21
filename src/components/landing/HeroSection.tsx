import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Instagram, MessageCircle, Check } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 bg-background">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div className="animate-fade-in">
            <div className="eyebrow mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              For Instagram &amp; WhatsApp sales teams
            </div>

            <h1 className="font-display text-[44px] leading-[1.05] md:text-[68px] md:leading-[1.02] text-foreground mb-6">
              Turn Instagram and WhatsApp DMs into&nbsp;qualified pipeline.
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-[560px] mb-8">
              Conveero replies, qualifies, follows up, and routes every conversation to
              the right person — so no lead sits unread and no deal slips through the inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button
                asChild
                className="h-11 rounded-[10px] bg-foreground text-background hover:bg-accent font-medium px-5"
              >
                <Link to="/signup">
                  Start free <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-[10px] border-foreground text-foreground hover:bg-secondary font-medium px-5"
              >
                <a href="#workflow">See it in action</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Instagram DM &amp; WhatsApp</span>
              <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Human handoff</span>
              <span className="inline-flex items-center gap-2"><Check className="w-4 h-4 text-accent" /> Works with your CRM</span>
            </div>
          </div>

          {/* Product frame — illustrative */}
          <div className="animate-slide-in-right">
            <div className="relative">
              <div className="absolute -top-3 left-4 text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80 bg-background px-2">
                Illustrative product preview
              </div>
              <div className="rounded-2xl border border-border bg-card shadow-hero overflow-hidden">
                {/* Frame header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/40">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
                    <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/25" />
                  </div>
                  <div className="ml-3 text-xs text-muted-foreground">conveero.app / inbox</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1.15fr_1fr]">
                  {/* Conversation */}
                  <div className="p-5 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium text-foreground">MA</div>
                        <div>
                          <div className="text-sm font-medium text-foreground">Maya A.</div>
                          <div className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Instagram className="w-3 h-3" /> Instagram DM
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 px-2 py-1 rounded">New lead</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="message-bubble-received">Hey, do you take clients based in Berlin? Looking for a Q3 launch.</div>
                      <div className="message-bubble-sent">Yes — we do. Quick check so I can route you to the right person: what's your team size and target launch date?</div>
                      <div className="message-bubble-received">Team of 12. Ideally launching mid-August.</div>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="status-online" />
                        <span className="text-[11px] text-muted-foreground">Conveero drafting reply…</span>
                      </div>
                    </div>
                  </div>

                  {/* Qualification panel */}
                  <div className="p-5 bg-secondary/30">
                    <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-3">Lead qualification</div>
                    <div className="space-y-3 text-sm">
                      <Row label="Intent" value="Enquiry — high" tone="accent" />
                      <Row label="Team size" value="12" />
                      <Row label="Timeline" value="Aug 2026" />
                      <Row label="Region" value="Berlin, DE" />
                      <Row label="Channel" value="Instagram" />
                    </div>
                    <div className="mt-5 pt-4 border-t border-border">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground mb-2">Assigned</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-foreground text-background text-[10px] flex items-center justify-center">LR</div>
                          <span className="text-sm text-foreground">Lena R. · EMEA</span>
                        </div>
                        <span className="text-[10px] text-accent">Auto-routed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer strip */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-border text-[11px] text-muted-foreground bg-card">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" /> Instagram</span>
                    <span className="inline-flex items-center gap-1.5"><MessageCircle className="w-3.5 h-3.5" /> WhatsApp</span>
                  </div>
                  <span>Response time · under 1 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function Row({ label, value, tone }: { label: string; value: string; tone?: "accent" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={tone === "accent" ? "text-accent font-medium" : "text-foreground"}>{value}</span>
    </div>
  );
}

export default HeroSection;
