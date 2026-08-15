import { Logo } from "@/components/brand/Logo";

export default function Footer() {
  return (
    <footer className="py-12 text-background bg-foreground" id="contact">
      <div className="max-w-300 mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div className="max-w-xs">
            <a href="/site" aria-label="Conveero home" className="h-8 inline-flex items-center">
              <Logo variant="light" size="nav" />
            </a>
            <p className="mt-4 text-sm text-white/70">
              Address: Dubai, Damac Hills, Jasmin B, Office 505, UAE
            </p>
            <p className="mt-2 text-sm text-white/70">
              <a href="tel:+971506071246" className="hover:text-[rgb(255,241,0)]">+971 50 607 1246</a>
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <a href="/site#automation" className="hover:text-[rgb(255,241,0)]">Automation</a>
            <a href="/site#post-management" className="hover:text-[rgb(255,241,0)]">Post Management</a>
            <a href="/site#inbox" className="hover:text-[rgb(255,241,0)]">Inbox</a>
            <a href="https://www.conveero/#academy" className="hover:text-[rgb(255,241,0)]">AIX Academy</a>
            <a href="https://www.trustpilot.com/review/conveero.com" className="hover:text-[rgb(255,241,0)]">Reviews</a>
            <a href="/site/alternatives" className="hover:text-[rgb(255,241,0)]">Competitors & Alternatives</a>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <a href="/site/privacy#gdpr" className="hover:text-[rgb(255,241,0)]">GDPR</a>
            <a href="/site/terms#sla" className="hover:text-[rgb(255,241,0)]">SLA</a>
            <a href="/site/alternatives" className="hover:text-[rgb(255,241,0)]">Alternatives</a>
            <a href="/site/sitemap" className="hover:text-[rgb(255,241,0)]">Sitemap</a>
            <a href="/site/sitemap.xml" className="hover:text-[rgb(255,241,0)]">XML</a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-sm text-white/50">
          © 2026 Conveero.ai. All rights reserved. Powered by AIX Training Academy.
        </div>
      </div>
    </footer>
  );
}
