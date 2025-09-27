import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faChevronRight,
  faRightFromBracket,
  faHome,
  faBook,
  faGraduationCap,
  faChartColumn,
  faCog,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import MyCourses from "./dashboard/MyCourses";
import Certificates from "./dashboard/Certificates";
import Analytics from "./dashboard/Analytics";
import Profile from "./dashboard/Profile";
import SettingsPage from "./dashboard/Settings";

const sidebarItems = [
  { icon: faHome, label: "Dashboard", key: "dashboard" },
  { icon: faBook, label: "My Courses", key: "courses" },
  { icon: faGraduationCap, label: "Certificates", key: "certificates" },
  { icon: faChartColumn, label: "Analytics", key: "analytics" },
  { icon: faUser, label: "Profile", key: "profile" },
  { icon: faCog, label: "Settings", key: "settings" }
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
              <FontAwesomeIcon icon={faArrowTrendUp} className="h-5 w-5 text-primary-foreground" />
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
                <FontAwesomeIcon icon={item.icon} className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="mt-8 pt-8 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="h-5 w-5 flex-shrink-0" />
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
                <FontAwesomeIcon icon={faChevronRight} className={`h-4 w-4 transition-transform ${sidebarCollapsed ? "" : "rotate-180"}`} />
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
        <main className="p-6 bg-gradient-to-br from-muted/30 via-background to-accent/20 min-h-screen">
          {activeSection === "dashboard" && (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-secondary rounded-3xl p-8 text-white">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName}! 🎯</h2>
                  <p className="text-primary-foreground/80 text-lg mb-4">Ready to continue your financial education journey?</p>
                  <div className="flex items-center space-x-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-sm font-medium">Current Level</span>
                      <p className="text-xl font-bold">Intermediate Trader</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                      <span className="text-sm font-medium">Next Goal</span>
                      <p className="text-xl font-bold">Advanced Certification</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full"></div>
                <div className="absolute -left-5 -bottom-5 w-32 h-32 bg-white/5 rounded-full"></div>
              </div>

              {/* Stats Grid - Enhanced */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Courses Card */}
                <div className="group relative bg-gradient-to-br from-card via-card to-accent/30 rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
                        <FontAwesomeIcon icon={faBook} className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary mb-1">12</p>
                        <p className="text-xs text-muted-foreground">+2 this month</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">Total Courses</h3>
                    <p className="text-sm text-muted-foreground">Enrolled programs</p>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-primary/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>

                {/* Completed Courses Card */}
                <div className="group relative bg-gradient-to-br from-card via-card to-success/10 rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-success/10 rounded-xl group-hover:bg-success/20 transition-colors duration-300">
                        <FontAwesomeIcon icon={faGraduationCap} className="h-6 w-6 text-success" />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-success mb-1">3</p>
                        <p className="text-xs text-muted-foreground">25% completion</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">Completed</h3>
                    <p className="text-sm text-muted-foreground">Finished courses</p>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-success/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>

                {/* Study Hours Card */}
                <div className="group relative bg-gradient-to-br from-card via-card to-orange-500/10 rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-orange-500/10 rounded-xl group-hover:bg-orange-500/20 transition-colors duration-300">
                        <FontAwesomeIcon icon={faChartColumn} className="h-6 w-6 text-orange-500" />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-orange-500 mb-1">45</p>
                        <p className="text-xs text-muted-foreground">+8 this week</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">Study Hours</h3>
                    <p className="text-sm text-muted-foreground">Total learning time</p>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-orange-500/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>

                {/* Learning Streak Card */}
                <div className="group relative bg-gradient-to-br from-card via-card to-purple-500/10 rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-purple-500/10 rounded-xl group-hover:bg-purple-500/20 transition-colors duration-300">
                        <FontAwesomeIcon icon={faArrowTrendUp} className="h-6 w-6 text-purple-500" />
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-purple-500 mb-1">7</p>
                        <p className="text-xs text-muted-foreground">days in a row</p>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">Learning Streak</h3>
                    <p className="text-sm text-muted-foreground">Current streak</p>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-purple-500/5 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                </div>
              </div>

              {/* Quick Actions - Enhanced */}
              <div className="bg-gradient-to-br from-card via-card to-muted/30 rounded-3xl p-8 border border-border/50 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
                    <p className="text-muted-foreground">Jump into your learning journey</p>
                  </div>
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <FontAwesomeIcon icon={faArrowTrendUp} className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button 
                    className="group relative bg-gradient-to-br from-primary via-primary to-primary/80 text-white p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                    onClick={() => setActiveSection("courses")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={faBook} className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Continue Learning</h3>
                      <p className="text-primary-foreground/80">Pick up where you left off</p>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
                  </button>

                  <button 
                    className="group relative bg-gradient-to-br from-success via-success to-success/80 text-white p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                    onClick={() => setActiveSection("certificates")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={faGraduationCap} className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">View Certificates</h3>
                      <p className="text-white/80">See your achievements</p>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
                  </button>

                  <button 
                    className="group relative bg-gradient-to-br from-secondary via-secondary to-secondary/80 text-white p-8 rounded-2xl shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                    onClick={() => setActiveSection("analytics")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FontAwesomeIcon icon={faChartColumn} className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">View Analytics</h3>
                      <p className="text-white/80">Track your progress</p>
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/5 rounded-full"></div>
                  </button>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-card via-card to-muted/20 rounded-3xl p-6 border border-border/50 shadow-soft">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                      <FontAwesomeIcon icon={faArrowTrendUp} className="h-4 w-4 text-primary" />
                    </div>
                    Recent Activity
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gradient-to-r from-primary/5 to-transparent rounded-xl border border-primary/10">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3">
                        <FontAwesomeIcon icon={faGraduationCap} className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Course Completed</p>
                        <p className="text-sm text-muted-foreground">Stock Market Fundamentals</p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-gradient-to-r from-success/5 to-transparent rounded-xl border border-success/10">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center mr-3">
                        <FontAwesomeIcon icon={faBook} className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Lesson Progress</p>
                        <p className="text-sm text-muted-foreground">Risk Management - 85% complete</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-card via-card to-accent/20 rounded-3xl p-6 border border-border/50 shadow-soft">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center mr-3">
                      <FontAwesomeIcon icon={faChartColumn} className="h-4 w-4 text-orange-500" />
                    </div>
                    Learning Goals
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-orange-500/5 to-transparent rounded-xl border border-orange-500/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">Weekly Study Goal</span>
                        <span className="text-sm text-orange-500 font-bold">12/15 hours</span>
                      </div>
                      <div className="w-full bg-orange-500/10 rounded-full h-2 mb-1">
                        <div className="bg-orange-500 h-2 rounded-full" style={{width: '80%'}}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">3 hours remaining</p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-500/5 to-transparent rounded-xl border border-purple-500/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-foreground">Monthly Certificates</span>
                        <span className="text-sm text-purple-500 font-bold">1/2 earned</span>
                      </div>
                      <div className="w-full bg-purple-500/10 rounded-full h-2 mb-1">
                        <div className="bg-purple-500 h-2 rounded-full" style={{width: '50%'}}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">1 certificate to go</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === "courses" && <MyCourses />}
          {activeSection === "certificates" && <Certificates />}
          {activeSection === "analytics" && <Analytics />}
          {activeSection === "profile" && <Profile />}
          {activeSection === "settings" && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;