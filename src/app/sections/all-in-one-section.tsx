import { useState } from "react";
import { Video, MessageSquare, Info, ArrowRight } from "lucide-react";

const useCases = [
  {
    title: "Say hi to new followers",
    reply: "Hey! Thanks for the follow 👋 Want to see what's new this week?",
  },
  {
    title: "Send welcome messages",
    reply: "Welcome! Here's 10% off your first order — just reply YES.",
  },
  {
    title: "Automate FAQs",
    reply:
      "The new collection is already on our website! Select the category you are interested in to view 👇",
  },
  {
    title: "Auto-DM people from comments and capture email or phone number",
    reply: "Dropped it in your DMs! What's the best email to send updates to?",
  },
  {
    title: "Run giveaways",
    reply: "You're entered 🎉 Tag a friend to double your chances!",
  },
];

/** See it in action section. */
export default function AllInOneSection() {
  const [active, setActive] = useState(2);

  return (
    <section
      className="block py-24 overflow-x-clip bg-[hsl(var(--mc-yellow))] max-lg:py-14"
      id="create"
    >
      <div className="max-w-300 mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left card */}
          <div className="bg-background rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.12)]">
            <h2 className="[font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-[2.25rem] leading-[2.5rem] font-extrabold tracking-[-1px] text-foreground">
              See it in action...
            </h2>

            <ul className="mt-8 space-y-1">
              {useCases.map((u, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`w-full text-left rounded-xl px-4 py-3 transition-colors duration-300 ${
                      active === i ? "bg-muted" : "hover:bg-muted/60"
                    }`}
                  >
                    <span className="block font-semibold text-foreground leading-snug">
                      {u.title}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      Check it out <ArrowRight className="h-3 w-3" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <a
              href="/signup"
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-foreground px-6 font-semibold uppercase tracking-[0.12em] text-background transition-colors duration-300 hover:bg-[hsl(var(--mc-magenta))] hover:text-white"
            >
              Get started
            </a>
          </div>

          {/* Right: phone mockup */}
          <div className="flex flex-col items-center gap-8">
            <div className="w-[19rem] rounded-[2.25rem] bg-black p-3 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="rounded-[1.75rem] bg-black overflow-hidden">
                {/* header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
                  <div className="h-8 w-8 rounded-full bg-[hsl(var(--mc-magenta))]" />
                  <span className="font-semibold text-white">The Star</span>
                  <div className="ml-auto flex items-center gap-3 text-white/70">
                    <Video className="h-4 w-4" />
                    <MessageSquare className="h-4 w-4" />
                    <Info className="h-4 w-4" />
                  </div>
                </div>

                {/* messages */}
                <div className="px-4 py-4 space-y-3">
                  <div className="flex justify-end">
                    <span className="rounded-2xl bg-[hsl(var(--mc-magenta))] px-4 py-2 text-sm font-medium text-white">
                      New collection
                    </span>
                  </div>
                  <div className="flex justify-start">
                    <p className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3 text-sm leading-snug text-white">
                      {useCases[active].reply}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-3">
                    <div className="h-32 rounded-xl bg-gradient-to-br from-white/25 to-white/5" />
                    <p className="mt-3 text-sm font-semibold text-white">
                      New Linen Arrivals
                    </p>
                    <p className="text-xs text-white/60">Check it out</p>
                    <button className="mt-3 w-full rounded-lg bg-white/15 py-2 text-sm text-white transition-colors hover:bg-white/25">
                      View collection
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <p className="max-w-[18rem] border-l-2 border-foreground pl-4 font-semibold leading-snug text-foreground">
              Automate customer support — let Conveero handle the responses to
              common questions and provide immediate help to your audience
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
