import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  ChevronRight,
  LogOut,
  Home,
  BookOpen,
  GraduationCap,
  BarChart3,
  Settings as SettingsIcon,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import MyCourses from "./dashboard/MyCourses";
import Certificates from "./dashboard/Certificates";
import Analytics from "./dashboard/Analytics";
import Profile from "./dashboard/Profile";
import Settings from "./dashboard/Settings";

const sidebarItems = [
  { icon: Home, label: "Dashboard", key: "dashboard" },
  { icon: BookOpen, label: "My Courses", key: "courses" },
  { icon: GraduationCap, label: "Certificates", key: "certificates" },
  { icon: BarChart3, label: "Analytics", key: "analytics" },
  { icon: User, label: "Profile", key: "profile" },
  { icon: SettingsIcon, label: "Settings", key: "settings" }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-border z-40 transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      }`}>
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary-foreground" />
            </div>
            {!sidebarCollapsed && (
              <span className="font-bold text-lg text-secondary">ZSE Training</span>
            )}
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(item.key)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeSection === item.key
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
        {/* Header */}
        <header className="bg-white border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="md:hidden"
              >
                <ChevronRight className={`h-4 w-4 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-secondary">
                  {activeSection === "dashboard" 
                    ? `Welcome back, ${user?.firstName}!` 
                    : sidebarItems.find(item => item.key === activeSection)?.label
                  }
                </h1>
                <p className="text-muted-foreground">
                  {activeSection === "dashboard" 
                    ? "Continue your financial education journey"
                    : `Manage your ${sidebarItems.find(item => item.key === activeSection)?.label.toLowerCase()}`
                  }
                </p>
              </div>
            </div>
            {activeSection === "dashboard" && (
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  Intermediate Trader
                </Badge>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {activeSection === "dashboard" && (
            <div>
              {/* Stats Grid - Dashboard Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-card rounded-lg p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                      <p className="text-2xl font-bold text-primary">12</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-primary/20" />
                  </div>
                </div>
                <div className="bg-card rounded-lg p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-2xl font-bold text-primary">3</p>
                    </div>
                    <GraduationCap className="h-8 w-8 text-primary/20" />
                  </div>
                </div>
                <div className="bg-card rounded-lg p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Study Hours</p>
                      <p className="text-2xl font-bold text-primary">45</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-primary/20" />
                  </div>
                </div>
                <div className="bg-card rounded-lg p-6 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                      <p className="text-2xl font-bold text-primary">7</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-primary/20" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => setActiveSection("courses")}
                  >
                    <BookOpen className="h-6 w-6 mb-2" />
                    Continue Learning
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => setActiveSection("certificates")}
                  >
                    <GraduationCap className="h-6 w-6 mb-2" />
                    View Certificates
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex-col"
                    onClick={() => setActiveSection("analytics")}
                  >
                    <BarChart3 className="h-6 w-6 mb-2" />
                    View Analytics
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "courses" && <MyCourses />}
          {activeSection === "certificates" && <Certificates />}
          {activeSection === "analytics" && <Analytics />}
          {activeSection === "profile" && <Profile />}
          {activeSection === "settings" && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;