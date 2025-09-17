import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    {
      name: "Courses",
      href: "/courses",
      dropdown: [
        { name: "Stock Market Basics", href: "/courses/basics" },
        { name: "Advanced Trading", href: "/courses/advanced" },
        { name: "Market Analysis", href: "/courses/analysis" },
      ],
    },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <nav className="bg-white backdrop-blur-md border-b border-border/60 sticky top-0 z-50 shadow-sm">
  <div className="max-w-content mx-auto px-2 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center group">
          <img
            src={logo}
            alt="Logo"
            className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        {navigation.map((item) => (
          <div key={item.name} className="relative group">
            {item.dropdown ? (
              <>
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className={`flex items-center text-sm font-medium transition-colors hover:text-[#00aeef] py-2
                    ${
                      isActive(item.href) ||
                      item.dropdown.some((d) => isActive(d.href))
                        ? "text-[#00aeef]"
                        : "text-muted-foreground"
                    }`}
                >
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 mt-3 w-56 rounded-lg shadow-xl bg-black/95 backdrop-blur-md border border-border/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-200">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.name}
                      to={dropdownItem.href}
                      className={`block px-5 py-3 text-sm transition-colors hover:bg-muted/50
                        ${
                          isActive(dropdownItem.href)
                            ? "text-[#00aeef] bg-muted/30 font-medium"
                            : "text-muted-foreground"
                        }`}
                    >
                      {dropdownItem.name}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link
                to={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#00aeef] relative py-2
                  ${
                    isActive(item.href)
                      ? "text-[#00aeef] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#00aeef] after:rounded-full"
                      : "text-muted-foreground"
                  }`}
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}

        <div className="flex items-center space-x-3 ml-6">
          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              className="px-5 py-2 rounded-full border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef]/10 hover:shadow-sm transition"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              size="sm"
              className="px-6 py-2 rounded-full bg-[#00aeef] text-white shadow-md hover:bg-[#0095cc] transition"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg text-muted-foreground hover:text-[#00aeef] hover:bg-muted transition-colors"
        >
          {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>
    </div>

    {/* Mobile Navigation */}
    {isOpen && (
      <div className="md:hidden animate-slideDown bg-black/95 backdrop-blur-md border-t border-border/60 rounded-b-xl shadow-lg">
        <div className="px-2 pt-3 pb-5 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <div className="px-3 py-2">
                  <button
                    onClick={() => toggleDropdown(item.name)}
                    className="flex items-center justify-between w-full text-base font-medium rounded-lg transition-colors hover:bg-muted hover:text-[#00aeef] p-2"
                  >
                    <span
                      className={
                        isActive(item.href)
                          ? "text-[#00aeef] font-semibold"
                          : "text-muted-foreground"
                      }
                    >
                      {item.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        activeDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {activeDropdown === item.name && (
                    <div className="mt-2 ml-4 space-y-1 border-l-2 border-[#00aeef]/20 pl-3">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted hover:text-[#00aeef]
                            ${
                              isActive(dropdownItem.href)
                                ? "text-[#00aeef] bg-muted/30 font-medium"
                                : "text-muted-foreground"
                            }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors hover:bg-muted hover:text-[#00aeef]
                    ${
                      isActive(item.href)
                        ? "text-[#00aeef] bg-muted/30 font-semibold"
                        : "text-muted-foreground"
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}

          <div className="px-3 pt-4 space-y-2 border-t border-border/60">
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="w-full rounded-full border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef]/10 transition"
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                size="sm"
                className="w-full rounded-full bg-[#00aeef] text-white shadow-md hover:bg-[#0095cc] transition"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )}
  </div>
</nav>

  );
};
