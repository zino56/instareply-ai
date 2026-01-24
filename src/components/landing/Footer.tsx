import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, Github, Sparkles } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Pricing", href: "#pricing" },
    { label: "Features", href: "#features" },
    { label: "Security", href: "#" },
    { label: "Roadmap", href: "#" },
    { label: "What's New", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Community", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "#" },
    { label: "FAQ", href: "#faq" },
    { label: "Community", href: "#" },
    { label: "Status Page", href: "#" },
    { label: "Security", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Github, href: "#", label: "GitHub" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer className="bg-[#001D3D] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#FFD60A] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#001D3D]" />
              </div>
              <span className="font-poppins font-bold text-xl text-white">InstaAI</span>
            </Link>
            <p className="font-inter text-sm text-white/70 leading-relaxed">
              AI-powered Instagram DM automation for e-commerce brands.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-poppins font-semibold text-sm text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-[13px] text-white/80 hover:text-[#FFD60A] hover:underline transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-poppins font-semibold text-sm text-white mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-[13px] text-white/80 hover:text-[#FFD60A] hover:underline transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-poppins font-semibold text-sm text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-[13px] text-white/80 hover:text-[#FFD60A] hover:underline transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-poppins font-semibold text-sm text-white mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-[13px] text-white/80 hover:text-[#FFD60A] hover:underline transition-all duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[rgb(15,23,42)] border-t border-[rgba(255,214,10,0.2)]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="font-inter text-xs text-white/70 order-3 lg:order-1">
              © 2026 InstaAI. All rights reserved.
            </p>

            {/* Newsletter */}
            <div className="flex flex-col items-center gap-3 order-1 lg:order-2 w-full lg:w-auto">
              <p className="font-inter text-xs text-white/90">
                Get weekly tips on Instagram sales automation
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full max-w-sm lg:max-w-none">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 lg:w-56 bg-white/10 border border-[#FFD60A] text-white placeholder:text-white/50 text-sm rounded-md px-3.5 py-2.5 h-auto focus:ring-[#FFD60A]"
                />
                <Button
                  type="submit"
                  className="bg-[#FFD60A] hover:bg-[#E5C009] text-[#001D3D] font-inter font-semibold text-xs px-5 py-2.5 h-auto rounded-md"
                >
                  Subscribe
                </Button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 order-2 lg:order-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white hover:text-[#FFD60A] transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
