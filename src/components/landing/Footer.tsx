import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const footerLinks = {
  product: [
    { label: "Product", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Security", href: "#" },
    { label: "Pricing", href: "#pricing" },
    { label: "Status Page", href: "#" },
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
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "GDPR Compliance", href: "#" },
    { label: "Subprocessors", href: "#" },
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-mc-black">
      {/* Main Footer */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-[60px] py-[60px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-10">
          {/* Product Column */}
          <div>
            <h4 className="font-poppins font-bold text-base text-white mb-6">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-white/80 hover:text-mc-yellow transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-poppins font-bold text-base text-white mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-white/80 hover:text-mc-yellow transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-poppins font-bold text-base text-white mb-6">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-white/80 hover:text-mc-yellow transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-poppins font-bold text-base text-white mb-6">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-white/80 hover:text-mc-yellow transition-colors duration-200"
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
      <div className="border-t border-[#333333]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-[60px] py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="font-inter text-xs text-[#999999] order-3 md:order-1">
              © 2026 Conveero. All rights reserved.
            </p>

            {/* Newsletter */}
            <div className="order-1 md:order-2 w-full md:w-auto">
              <p className="font-inter text-xs text-white/90 mb-3 text-center md:text-left">
                Get weekly tips on Instagram sales automation
              </p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-white/10 border border-[#333333] rounded-md px-4 py-2.5 
                    font-inter text-sm text-white placeholder:text-white/50
                    focus:outline-none focus-visible:border-mc-yellow focus-visible:ring-2 focus-visible:ring-mc-yellow/40 focus-visible:ring-offset-2 focus-visible:ring-offset-mc-black transition-colors duration-200
                    w-full md:w-[240px]"
                />
                <Button
                  type="submit"
                  className="bg-mc-yellow hover:bg-mc-hover-yellow text-mc-black font-poppins 
                    font-bold text-xs px-5 py-2.5 h-auto rounded-md transition-all duration-200"
                >
                  Subscribe
                </Button>
              </form>

            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4 order-2 md:order-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-white hover:text-mc-yellow transition-all duration-200 hover:rotate-6 rounded-md focus-ring-on-dark"
                  aria-label={social.label}
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
