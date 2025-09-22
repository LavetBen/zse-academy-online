import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import ZSELogo from "@/assets/logo.png";

const footerLinks = {
  courses: [
    { name: "Stock Market Basics", href: "/courses/basics" },
    { name: "Technical Analysis", href: "/courses/technical" },
    { name: "Portfolio Management", href: "/courses/portfolio" },
    { name: "Risk Management", href: "/courses/risk" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "Student Portal", href: "/portal" },
    { name: "Course Catalog", href: "/catalog" },
    { name: "Certificates", href: "/certificates" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com/zse" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com/zse" },
  { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/zse" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com/zse" },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0B1E39] text-gray-300 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand / About */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center space-x-2 mb-5">
              <img
                src={ZSELogo}
                alt="Zimbabwe Stock Exchange"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              ZSE Training offers professional development courses tailored for
              Zimbabwe’s financial markets. Learn from experts and earn
              certifications recognized locally and regionally.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4 text-white capitalize">
                {title}
              </h3>
              <ul className="space-y-2 text-sm">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
              © {new Date().getFullYear()} Zimbabwe Stock Exchange Training. All
              rights reserved.
            </div>
            <div className="flex space-x-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
