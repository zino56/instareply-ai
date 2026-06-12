import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare, Zap, Filter, Clock, ShieldCheck, Inbox, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Nav = () => (
  <header className="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white font-bold">C</div>
        <span className="text-lg font-semibold tracking-tight text-slate-900">Conveero</span>
      </Link>
      <nav className="hidden items-center gap-8 md:flex">
        <a href="#how" className="text-sm text-slate-600 hover:text-slate-900">How it works</a>
        <a href="#benefits" className="text-sm text-slate-600 hover:text-slate-900">Benefits</a>
        <Link to="/pricing" className="text-sm text-slate-600 hover:text-slate-900">Pricing</Link>
      </nav>
      <div className="flex items-center gap-2">
        <Button asChild variant="ghost" className="text-slate-700 hover:bg-slate-100">
          <Link to="/login">Sign in</Link>
        </Button>
        <Button asChild className="bg-slate-900 text-white hover:bg-slate-800">
          <Link to="/signup">Get started</Link>
        </Button>
      </div>
    </div>
  </header>
);

const Hero = () => (
  <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50">
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Instagram-first lead qualification
        </div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Turn Instagram DMs into qualified leads.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
          Conveero answers Instagram messages instantly, qualifies leads with AI, and routes
          high-intent conversations to your team — so you never miss a sale.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 bg-slate-900 px-6 text-white hover:bg-slate-800">
            <Link to="/signup" className="flex items-center gap-2">
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 border-slate-300 px-6 text-slate-800 hover:bg-slate-100">
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
        <p className="mt-4 text-sm text-slate-500">No credit card required · Setup in under 5 minutes</p>
      </div>

      {/* Product mockup */}
      <div className="relative">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
          <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            </div>
            <span className="ml-2 text-xs text-slate-500">conveero.app / inbox</span>
          </div>
          <div className="grid grid-cols-[200px_1fr]">
            <aside className="border-r border-slate-100 p-3 text-sm">
              {[
                { name: "Sarah M.", msg: "Is this in stock?", tag: "Hot" },
                { name: "Jamal R.", msg: "Pricing?", tag: "Warm" },
                { name: "Lina K.", msg: "Thanks!", tag: "" },
              ].map((c, i) => (
                <div key={i} className={`rounded-lg p-2 ${i === 0 ? "bg-slate-100" : ""}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-800">{c.name}</span>
                    {c.tag && (
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${c.tag === "Hot" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                        {c.tag}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-slate-500">{c.msg}</p>
                </div>
              ))}
            </aside>
            <div className="space-y-3 p-4">
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-slate-100 px-3 py-2 text-sm text-slate-800">
                Hey! Is the navy jacket still available in size M?
              </div>
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-slate-900 px-3 py-2 text-sm text-white">
                Yes, it's in stock. Want me to send the checkout link?
              </div>
              <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-slate-900 px-3 py-2 text-sm text-white">
                shop.conveero.io/p/navy-jacket
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Lead qualified · routed to sales
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TrustStrip = () => (
  <section className="border-y border-slate-100 bg-white">
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 text-sm text-slate-600 md:grid-cols-3">
      <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-slate-400" /> Built for growing businesses</div>
      <div className="flex items-center gap-3"><MessageSquare className="h-5 w-5 text-slate-400" /> Instagram-first lead qualification</div>
      <div className="flex items-center gap-3"><Zap className="h-5 w-5 text-slate-400" /> Fast setup with secure login</div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how" className="bg-slate-50 py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Live in three steps</h2>
        <p className="mt-3 text-slate-600">No engineers required. Set up Conveero in minutes.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          { n: "01", t: "Create your account", d: "Sign up with your email — no credit card needed." },
          { n: "02", t: "Connect Instagram", d: "Authorize Conveero through Instagram's secure login." },
          { n: "03", t: "Qualify your leads", d: "Conveero replies, qualifies, and organizes every DM." },
        ].map((s) => (
          <div key={s.n} className="rounded-xl border border-slate-200 bg-white p-6">
            <div className="text-xs font-semibold tracking-widest text-slate-400">{s.n}</div>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Benefits = () => {
  const items = [
    { icon: Clock, t: "Reply in seconds", d: "Instant AI replies 24/7, so prospects never wait." },
    { icon: Filter, t: "Auto-qualify leads", d: "Score and tag conversations by buying intent." },
    { icon: Inbox, t: "Stay organized", d: "Every conversation, contact, and outcome in one inbox." },
    { icon: CheckCircle2, t: "Stop missing sales", d: "Capture every opportunity that lands in your DMs." },
  ];
  return (
    <section id="benefits" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Built to convert</h2>
          <p className="mt-3 text-slate-600">Everything you need to turn Instagram conversations into revenue.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-xl border border-slate-200 p-6 transition hover:border-slate-300 hover:shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-900">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section className="bg-slate-900 py-20">
    <div className="mx-auto max-w-3xl px-6 text-center">
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Start qualifying your Instagram leads today.
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-slate-300">
        Join businesses using Conveero to respond faster, qualify smarter, and close more.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button asChild size="lg" className="h-12 bg-white px-6 text-slate-900 hover:bg-slate-100">
          <Link to="/signup">Start free</Link>
        </Button>
        <Button asChild size="lg" variant="ghost" className="h-12 px-6 text-white hover:bg-white/10">
          <Link to="/login">Sign in</Link>
        </Button>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-slate-500 sm:flex-row">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-xs font-bold text-white">C</div>
        <span>© {new Date().getFullYear()} Conveero</span>
      </div>
      <div className="flex gap-6">
        <Link to="/pricing" className="hover:text-slate-900">Pricing</Link>
        <a href="#" className="hover:text-slate-900">Privacy</a>
        <a href="#" className="hover:text-slate-900">Terms</a>
      </div>
    </div>
  </footer>
);

const LandingPage = () => (
  <div className="min-h-screen bg-white text-slate-900">
    <Nav />
    <main>
      <Hero />
      <TrustStrip />
      <HowItWorks />
      <Benefits />
      <FinalCTA />
    </main>
    <Footer />
  </div>
);

export default LandingPage;
