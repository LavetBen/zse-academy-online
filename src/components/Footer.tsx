import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

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
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">ZSE Training</span>
            </Link>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Professional training platform for Zimbabwe Stock Exchange. 
              Master financial markets with expert-led courses and industry-recognized certifications.
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 text-blue-200">
                <Mail className="h-4 w-4" />
                <span>info@zsetraining.co.zw</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200">
                <Phone className="h-4 w-4" />
                <span>+263 4 751 951</span>
              </div>
              <div className="flex items-center space-x-3 text-blue-200">
                <MapPin className="h-4 w-4" />
                <span>Harare, Zimbabwe</span>
              </div>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Courses</h3>
            <ul className="space-y-2">
              {footerLinks.courses.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-blue-200 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-200 text-sm mb-4 md:mb-0">
              © 2024 ZSE Training Platform. All rights reserved.
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-blue-200 hover:text-primary transition-colors"
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