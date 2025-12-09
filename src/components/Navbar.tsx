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
import { faBars, faTimes, faChevronDown, faUser, faGauge, faRightFromBracket, faUserShield, faSignInAlt, faUserPlus, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
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
    { name: "Courses", href: "/courses" },
    { name: "Blog", href: "/blog" },
    { name: "Tutorials", href: "/tutorials" },
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

  // Split navigation for different screen sizes
  const primaryNavigation = navigation.slice(0, 4); // Home, Courses, Blog, Tutorials
  const secondaryNavigation = navigation.slice(4); // About Us, Contact

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

          {/* Desktop Navigation - Show from large screens */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
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
              </div>
            ))}

            {/* Auth Buttons for Desktop */}
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
                        <span className="hidden xl:inline">{user?.name || 'Account'}</span>
                        <span className="xl:hidden">Account</span>
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

          {/* Medium Screen Navigation (768px - 1024px) */}
          <div className="hidden md:flex lg:hidden items-center space-x-4 flex-1 justify-end">
            {/* Show primary navigation items */}
            <div className="flex items-center space-x-4">
              {primaryNavigation.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className={`text-xs font-medium transition-colors hover:text-[#00aeef] px-2 py-1
                      ${
                        isActive(item.href)
                          ? "text-[#00aeef]"
                          : "text-muted-foreground"
                      }`}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
              
              {/* More dropdown for secondary items */}
              {secondaryNavigation.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-xs font-medium text-muted-foreground hover:text-[#00aeef] px-2 py-1"
                    >
                      <FontAwesomeIcon icon={faEllipsisH} className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-40">
                    {secondaryNavigation.map((item) => (
                      <DropdownMenuItem key={item.name} asChild>
                        <Link
                          to={item.href}
                          className={`cursor-pointer text-xs ${
                            isActive(item.href)
                              ? "text-[#00aeef] font-medium"
                              : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Auth Buttons for Medium Screens */}
            <div className="flex items-center space-x-2 ml-4 border-l border-gray-200 pl-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-[#00aeef]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel className="text-xs">{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center cursor-pointer text-xs">
                        <FontAwesomeIcon icon={faGauge} className="mr-2 h-3 w-3" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {user?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center cursor-pointer text-xs">
                          <FontAwesomeIcon icon={faUserShield} className="mr-2 h-3 w-3" />
                          Admin
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600 focus:text-red-600 text-xs"
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} className="mr-2 h-3 w-3" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="px-3 py-1 text-xs rounded-full border-[#00aeef] text-[#00aeef] hover:bg-[#00aeef]/10"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      size="sm"
                      className="px-3 py-1 text-xs rounded-full bg-[#00aeef] text-white hover:bg-[#0095cc]"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button (below 768px) */}
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