import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Features", href: "#features", isRoute: false },
  { label: "Pricing", href: "/pricing", isRoute: true },
  { label: "Blog", href: "#", isRoute: false },
  { label: "Docs", href: "#", isRoute: false },
];

const LandingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 ${
        isScrolled ? "shadow-[var(--shadow-sm)] border-b border-border" : "border-b border-transparent"
      }`}
    >

      <div className="max-w-[1280px] mx-auto px-5 md:px-[60px] h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-mc-yellow flex items-center justify-center">
              <span className="font-poppins font-bold text-lg text-mc-black">C</span>
            </div>
            <span className="font-poppins font-bold text-xl text-mc-black">Conveero</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) =>
              link.isRoute ? (
                <Link
                  key={index}
                  to={link.href}
                  className="font-inter text-sm text-mc-black hover:text-mc-yellow relative transition-colors duration-200 rounded-sm focus-ring
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 
                    after:bg-mc-yellow after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={index}
                  href={link.href}
                  className="font-inter text-sm text-mc-black hover:text-mc-yellow relative transition-colors duration-200 rounded-sm focus-ring
                    after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 
                    after:bg-mc-yellow after:transition-all after:duration-200 hover:after:w-full"
                >
                  {link.label}
                </a>
              )

            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              asChild
              variant="ghost"
              className="font-poppins font-bold text-sm text-mc-black border-2 border-mc-black 
                hover:bg-mc-light-gray rounded-lg px-7 py-3 h-auto transition-all duration-200"
            >
              <Link to="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black font-poppins font-bold 
                text-sm px-7 py-3 h-auto rounded-lg transition-all duration-200 hover:shadow-yellow"
            >
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus-ring"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-mc-black" />
            ) : (
              <Menu className="w-6 h-6 text-mc-black" />
            )}
          </button>

        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white shadow-lg py-6 px-5 animate-fade-in">
            <nav className="flex flex-col gap-4 mb-6">
              {navLinks.map((link, index) =>
                link.isRoute ? (
                  <Link
                    key={index}
                    to={link.href}
                    className="font-inter text-base text-mc-black py-2 hover:text-mc-yellow transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={link.href}
                    className="font-inter text-base text-mc-black py-2 hover:text-mc-yellow transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                variant="outline"
                className="w-full border-2 border-mc-black font-poppins font-bold"
              >
                <Link to="/login">Sign In</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black font-poppins font-bold"
              >
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LandingNavbar;
