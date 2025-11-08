import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faChevronDown, faUser, faGauge, faRightFromBracket, faUserShield, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/contexts/AuthContext";
import logo from "../assets/logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

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
    {
      name: "Blog",
      href: "/blog",
      dropdown: [
        { name: "Market News", href: "/blog/news" },
        { name: "Trading Tips", href: "/blog/tips" },
        { name: "Case Studies", href: "/blog/cases" },
      ],
    },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white backdrop-blur-md border-b border-border/60 sticky top-0 z-50 shadow-sm font-poppins">
      <div className="max-w-content mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img
                src={logo}
                alt="Logo"
                className="h-10 w-20 object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-md"
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
                      <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 mt-3 w-56 rounded-lg shadow-xl bg-white backdrop-blur-md border border-border/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2 transition-all duration-200">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          className={`block px-5 py-3 text-sm transition-colors hover:bg-blue-200
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
              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <Link to="/admin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-5 py-2 rounded-full border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef]/10 hover:shadow-sm transition"
                      >
                        <FontAwesomeIcon icon={faUserShield} className="mr-2 h-4 w-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="px-5 py-2 rounded-full border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef]/10 hover:shadow-sm transition"
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2 h-4 w-4" />
                        <span className="hidden lg:inline">{user?.name || 'Account'}</span>
                        <FontAwesomeIcon icon={faChevronDown} className="ml-2 h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="flex items-center cursor-pointer">
                          <FontAwesomeIcon icon={faGauge} className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => {
                          handleLogout();
                        }}
                        className="cursor-pointer text-red-600 focus:text-red-600"
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button + Auth Icons */}
          <div className="md:hidden flex items-center space-x-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                  >
                    <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-[#00aeef]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center cursor-pointer">
                      <FontAwesomeIcon icon={faGauge} className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center cursor-pointer">
                        <FontAwesomeIcon icon={faUserShield} className="mr-2 h-4 w-4" />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9"
                  >
                    <FontAwesomeIcon icon={faSignInAlt} className="h-5 w-5 text-[#00aeef]" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="icon"
                    className="h-9 w-9 bg-[#00aeef] hover:bg-[#0095cc]"
                  >
                    <FontAwesomeIcon icon={faUserPlus} className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            )}
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-[#00aeef] hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <FontAwesomeIcon icon={faTimes} className="h-7 w-7" /> : <FontAwesomeIcon icon={faBars} className="h-7 w-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slideDown bg-white border-t border-gray-200 rounded-b-xl shadow-lg">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="px-2 py-2">
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className="flex items-center justify-between w-full text-base font-medium rounded-lg transition-colors hover:bg-gray-100 hover:text-[#00aeef] p-2"
                      >
                        <span
                          className={
                            isActive(item.href)
                              ? "text-[#00aeef] font-semibold"
                              : "text-gray-700"
                          }
                        >
                          {item.name}
                        </span>
                        <FontAwesomeIcon
                          icon={faChevronDown}
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
                              className={`block px-3 py-2 text-sm rounded-lg transition-colors hover:bg-gray-100 hover:text-[#00aeef]
                                ${
                                  isActive(dropdownItem.href)
                                    ? "text-[#00aeef] bg-gray-50 font-medium"
                                    : "text-gray-600"
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
                      className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors hover:bg-gray-100 hover:text-[#00aeef]
                        ${
                          isActive(item.href)
                            ? "text-[#00aeef] bg-gray-50 font-semibold"
                            : "text-gray-700"
                        }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Auth Buttons */}
              <div className="pt-5 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {user?.role === "admin" && (
                      <Link to="/admin" className="block">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full rounded-full border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef]/10 transition"
                          onClick={() => setIsOpen(false)}
                        >
                          <FontAwesomeIcon icon={faUserShield} className="mr-2 h-4 w-4" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Link to="/dashboard" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-full border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef]/10 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <FontAwesomeIcon icon={faGauge} className="mr-2 h-4 w-4" />
                        Dashboard
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      size="sm"
                      variant="outline"
                      className="w-full rounded-full border-red-500 text-red-500 hover:bg-red-500/10 transition"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-3">
                    <Link to="/login" className="w-1/2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full rounded-full border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef]/10 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup" className="w-1/2">
                      <Button
                        size="sm"
                        className="w-full rounded-full bg-[#00aeef] text-white shadow-md hover:bg-[#0095cc] transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
