import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ManageCourses from "./ManageCourses";
import ManageUsers from "./ManageUsers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBook,
  faChartLine,
  faRightFromBracket,
  faHome,
  faArrowTrendUp,
  faBars,
  faXmark,
  faChevronRight,
  faGraduationCap,
  faCog
} from "@fortawesome/free-solid-svg-icons";

const sidebarItems = [
  { icon: faHome, label: "Dashboard", key: "dashboard" },
  { icon: faBook, label: "Courses", key: "courses" },
  { icon: faUsers, label: "Users", key: "users" },
  { icon: faChartLine, label: "Analytics", key: "analytics" }
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-border px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileSidebar}
              className="p-2"
            >
              <FontAwesomeIcon 
                icon={mobileSidebarOpen ? faXmark : faBars} 
                className="h-5 w-5 text-foreground" 
              />
            </Button>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowTrendUp} className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-secondary">ZSE Admin</span>
          </div>
          
          <Badge variant="secondary" className="bg-destructive/10 text-destructive text-xs">
            Admin
          </Badge>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white border-r border-border z-40 transition-all duration-300
        ${sidebarCollapsed ? "w-16" : "w-64"}
        ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-4 h-full flex flex-col">
          {/* Desktop Logo & Toggle */}
          <div className="hidden lg:flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faArrowTrendUp} className="h-5 w-5 text-primary-foreground" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-lg text-secondary">ZSE Admin</span>
            )}
          </div>

          {/* Mobile Header in Sidebar */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faArrowTrendUp} className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-secondary">ZSE Admin</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileSidebar}
              className="p-2"
            >
              <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-foreground" />
            </Button>
          </div>

          <nav className="space-y-2 flex-1">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSectionChange(item.key)}
                className={`w-full flex items-center space-x-3 px-2 py-3 rounded-lg transition-colors ${
                  activeSection === item.key
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} className="h-5 w-5 flex-shrink-0" />
                {(!sidebarCollapsed || mobileSidebarOpen) && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="h-5 w-5 flex-shrink-0" />
              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <span className="text-sm font-medium">Logout</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`
        transition-all duration-300 
        ${sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"}
      `}>
        {/* Desktop Header */}
        <header className="hidden lg:block bg-white border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex"
              >
                <FontAwesomeIcon 
                  icon={faChevronRight} 
                  className={`h-4 w-4 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} 
                />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-secondary">
                  {activeSection === "dashboard" 
                    ? `Welcome, ${user?.name}!` 
                    : sidebarItems.find(item => item.key === activeSection)?.label
                  }
                </h1>
                <p className="text-muted-foreground">
                  {activeSection === "dashboard" 
                    ? "Admin Dashboard Overview"
                    : `Manage ${sidebarItems.find(item => item.key === activeSection)?.label.toLowerCase()}`
                  }
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-destructive/10 text-destructive">
              Admin Access
            </Badge>
          </div>
        </header>

        {/* Mobile Page Title */}
        <div className="lg:hidden bg-white border-b border-border px-4 py-3">
          <h1 className="text-xl font-bold text-secondary">
            {activeSection === "dashboard" 
              ? `Welcome, ${user?.name}!` 
              : sidebarItems.find(item => item.key === activeSection)?.label
            }
          </h1>
          <p className="text-muted-foreground text-sm">
            {activeSection === "dashboard" 
              ? "Admin Dashboard Overview"
              : `Manage ${sidebarItems.find(item => item.key === activeSection)?.label.toLowerCase()}`
            }
          </p>
        </div>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 bg-gradient-to-br from-muted/30 via-background to-accent/20 min-h-screen">
          {activeSection === "dashboard" && (
            <div className="space-y-6 lg:space-y-8">
              {/* Welcome Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-secondary rounded-2xl lg:rounded-3xl p-6 lg:p-8 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <h2 className="text-xl lg:text-3xl font-bold mb-2">Admin Dashboard 🎯</h2>
                  <p className="text-primary-foreground/80 text-sm lg:text-lg mb-4">
                    Manage courses, users, and platform analytics
                  </p>
                </div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full"></div>
                <div className="absolute -left-5 -bottom-5 w-32 h-32 bg-white/5 rounded-full"></div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                <div className="group relative bg-gradient-to-br from-card via-card to-accent/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 lg:p-3 bg-primary/10 rounded-lg lg:rounded-xl">
                      <FontAwesomeIcon icon={faBook} className="h-4 w-4 lg:h-6 lg:w-6 text-primary" />
                    </div>
                    <p className="text-xl lg:text-3xl font-bold text-primary">45</p>
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base">Total Courses</h3>
                  <p className="text-xs text-muted-foreground">Active courses</p>
                </div>

                <div className="group relative bg-gradient-to-br from-card via-card to-success/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 lg:p-3 bg-success/10 rounded-lg lg:rounded-xl">
                      <FontAwesomeIcon icon={faUsers} className="h-4 w-4 lg:h-6 lg:w-6 text-success" />
                    </div>
                    <p className="text-xl lg:text-3xl font-bold text-success">1,234</p>
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base">Total Users</h3>
                  <p className="text-xs text-muted-foreground">Registered users</p>
                </div>

                <div className="group relative bg-gradient-to-br from-card via-card to-orange-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 lg:p-3 bg-orange-500/10 rounded-lg lg:rounded-xl">
                      <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4 lg:h-6 lg:w-6 text-orange-500" />
                    </div>
                    <p className="text-xl lg:text-3xl font-bold text-orange-500">892</p>
                  </div>
                  <h3 className="font-semibold text-sm lg:text-base">Enrollments</h3>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-card via-card to-muted/30 border-border/50 shadow-soft">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button 
                      onClick={() => setActiveSection("courses")}
                      className="h-auto py-4 flex-col space-y-2"
                    >
                      <FontAwesomeIcon icon={faBook} className="h-6 w-6" />
                      <span>Manage Courses</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveSection("users")}
                      variant="outline"
                      className="h-auto py-4 flex-col space-y-2"
                    >
                      <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
                      <span>Manage Users</span>
                    </Button>
                    <Button 
                      onClick={() => setActiveSection("analytics")}
                      variant="outline"
                      className="h-auto py-4 flex-col space-y-2"
                    >
                      <FontAwesomeIcon icon={faChartLine} className="h-6 w-6" />
                      <span>View Analytics</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === "courses" && <ManageCourses />}
          {activeSection === "users" && <ManageUsers />}
          {activeSection === "analytics" && (
            <Card className="bg-gradient-to-br from-card via-card to-muted/30 border-border/50 shadow-soft">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
