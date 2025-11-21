import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ManageCourses from "./ManageCourses";
import ManageUsers from "./ManageUsers";
import ManageBlog from "./ManageBlog";
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
  faBlog,
  faCog,
  faBookAtlas,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import logo from "@/assets/logo.png";

const API_BASE_URL = "http://127.0.0.1:8000/api";

interface AdminStats {
  total_courses: number;
  total_users: number;
  total_enrollments: number;
  total_blogs:number
}

const sidebarItems = [
  { icon: faHome, label: "Dashboard", key: "dashboard" },
  { icon: faBook, label: "Courses", key: "courses" },
  { icon: faUsers, label: "Students", key: "users" },
  { icon: faBookAtlas, label: "Blog", key: "Blog" },
  { icon: faChartLine, label: "Analytics", key: "analytics" }
];

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (activeSection === "dashboard") {
      fetchAdminStats();
    }
  }, [activeSection]);

  const fetchAdminStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem("zse_training_token");
      
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(`Failed to fetch stats: ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err: any) {
      console.error("Error fetching admin stats:", err);
      setError(err.message || "Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

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

  const retryFetchStats = () => {
    fetchAdminStats();
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
            <img 
              src={logo} 
              alt="ZSE Logo" 
              className="h-10 w-10 object-contain"
            />
            <span className="font-bold text-lg text-secondary">Admin</span>
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
            <img 
              src={logo} 
              alt="ZSE Logo" 
              className={`object-contain transition-all duration-300 ${
                sidebarCollapsed ? "h-12 w-12" : "h-14 w-14"
              }`}
            />
            {!sidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground leading-tight">Admin Panel</span>
              </div>
            )}
          </div>

          {/* Mobile Header in Sidebar */}
          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="ZSE Logo" 
                className="h-12 w-12 object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground leading-tight">Admin Panel</span>
              </div>
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
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-destructive/10 text-destructive">
                Admin Access
              </Badge>
              <img 
                src={logo} 
                alt="ZSE Logo" 
                className="h-10 w-10 object-contain"
              />
            </div>
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
                  {loading && (
                    <div className="flex items-center space-x-2 text-primary-foreground/80">
                      <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Loading statistics...</span>
                    </div>
                  )}
                  {error && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-red-200">{error}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={retryFetchStats}
                        className="text-white border-white hover:bg-white/20"
                      >
                        Retry
                      </Button>
                    </div>
                  )}
                </div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full"></div>
                <div className="absolute -left-5 -bottom-5 w-32 h-32 bg-white/5 rounded-full"></div>
              </div>

              {/* Stats Grid */}
              {loading ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="bg-card rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border/50 animate-pulse">
                      <div className="flex items-start justify-between mb-3">
                        <div className="p-2 lg:p-3 bg-muted rounded-lg lg:rounded-xl">
                          <div className="h-4 w-4 lg:h-6 lg:w-6 bg-muted-foreground/20 rounded"></div>
                        </div>
                        <div className="h-6 lg:h-8 w-12 bg-muted-foreground/20 rounded"></div>
                      </div>
                      <div className="h-4 w-24 bg-muted-foreground/20 rounded mb-2"></div>
                      <div className="h-3 w-20 bg-muted-foreground/20 rounded"></div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <Card className="bg-destructive/10 border-destructive/20">
                  <CardContent className="p-6 text-center">
                    <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-destructive mb-2" />
                    <h3 className="font-semibold text-destructive mb-2">Failed to load statistics</h3>
                    <p className="text-destructive/80 text-sm mb-4">{error}</p>
                    <Button onClick={retryFetchStats} variant="outline" className="border-destructive text-destructive">
                      <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 mr-2" />
                      Retry
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
                  <div className="group relative bg-gradient-to-br from-card via-card to-accent/30 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 lg:p-3 bg-primary/10 rounded-lg lg:rounded-xl">
                        <FontAwesomeIcon icon={faBook} className="h-4 w-4 lg:h-6 lg:w-6 text-primary" />
                      </div>
                      <p className="text-xl lg:text-3xl font-bold text-primary">
                        {stats?.total_courses || 0}
                      </p>
                    </div>
                    <h3 className="font-semibold text-sm lg:text-base">Total Courses</h3>
                    <p className="text-xs text-muted-foreground">Active courses</p>
                  </div>

                  <div className="group relative bg-gradient-to-br from-card via-card to-success/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 lg:p-3 bg-success/10 rounded-lg lg:rounded-xl">
                        <FontAwesomeIcon icon={faUsers} className="h-4 w-4 lg:h-6 lg:w-6 text-success" />
                      </div>
                      <p className="text-xl lg:text-3xl font-bold text-success">
                        {stats?.total_users || 0}
                      </p>
                    </div>
                    <h3 className="font-semibold text-sm lg:text-base">Total Users</h3>
                    <p className="text-xs text-muted-foreground">Registered users</p>
                  </div>

                  <div className="group relative bg-gradient-to-br from-card via-card to-orange-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 lg:p-3 bg-orange-500/10 rounded-lg lg:rounded-xl">
                        <FontAwesomeIcon icon={faGraduationCap} className="h-4 w-4 lg:h-6 lg:w-6 text-orange-500" />
                      </div>
                      <p className="text-xl lg:text-3xl font-bold text-orange-500">
                        {stats?.total_enrollments || 0}
                      </p>
                    </div>
                    <h3 className="font-semibold text-sm lg:text-base">Enrollments</h3>
                    <p className="text-xs text-muted-foreground">Total enrollments</p>
                  </div>

                  <div className="group relative bg-gradient-to-br from-card via-card to-purple-500/10 rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 lg:p-3 bg-purple-500/10 rounded-lg lg:rounded-xl">
                        <FontAwesomeIcon icon={faBlog} className="h-4 w-4 lg:h-6 lg:w-6 text-purple-500" />
                      </div>
                      <p className="text-xl lg:text-3xl font-bold text-purple-500">
                        {stats?.total_blogs || 0}
                      </p>
                    </div>
                    <h3 className="font-semibold text-sm lg:text-base">Blogs</h3>
                    <p className="text-xs text-muted-foreground">Total Blogs</p>
                  </div>
                </div>
              )}

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
          {activeSection === "Blog" && <ManageBlog />}
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