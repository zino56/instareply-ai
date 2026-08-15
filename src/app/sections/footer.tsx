import { Logo } from "@/components/brand/Logo";

const linkGroups = [
  {
    title: "Product",
    links: [
      { label: "Product", href: "/#product" },
      { label: "How it works", href: "/#create" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 text-background bg-foreground" id="contact">
      <div className="max-w-300 mx-auto px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <a href="/" aria-label="Conveero home" className="inline-flex items-center">
              <Logo variant="light" size="nav" />
            </a>
            <p className="mt-5 [font-family:'Bricolage_Grotesque',_Inter,_system-ui,_sans-serif] text-lg font-bold leading-6 tracking-[-0.3px]">
              AI-powered customer conversations.
            </p>
            <p className="mt-3 text-sm leading-6 text-background/60">
              Manage customer messages, reply faster, and keep every conversation moving.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="/signup"
                className="h-10 inline-flex px-5 rounded-[999px] items-center justify-center text-sm font-semibold text-foreground bg-accent transition-all duration-300 hover:bg-background hover:-translate-y-0.5"
              >
                Get started
              </a>
              <a
                href="/login"
                className="text-sm font-semibold text-background/70 underline-offset-4 transition-colors duration-300 hover:text-accent hover:underline"
              >
                Sign in
              </a>
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-background/45">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/75 transition-colors duration-300 hover:text-accent"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-background/10">
          <p className="text-sm text-background/50">
            © 2026 Conveero. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
