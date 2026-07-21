import { Link } from "react-router-dom";

const columns = {
  Product: [
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "DPA", href: "#" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="section-container py-14">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-foreground flex items-center justify-center">
                <span className="font-display text-background text-lg leading-none">C</span>
              </div>
              <span className="font-display text-xl text-foreground">Conveero</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Turn Instagram and WhatsApp conversations into qualified pipeline.
            </p>
          </div>

          {Object.entries(columns).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs uppercase tracking-[0.16em] text-muted-foreground mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Conveero. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built for teams that live in DMs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
