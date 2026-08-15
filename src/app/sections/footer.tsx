import { Logo } from "@/components/brand/Logo";

export default function Footer() {
  return (
    <footer className="py-12 text-background bg-foreground" id="contact">
      <div className="max-w-300 mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <a href="/site" aria-label="Conveero home" className="h-8 inline-flex items-center">
            <Logo variant="light" size="nav" />
          </a>
          <p className="text-sm text-white/50">
            © 2026 Conveero.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
