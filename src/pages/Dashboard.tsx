import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  TrendingUp, 
  Award, 
  Clock, 
  Users, 
  Target,
  ChevronRight,
  PlayCircle,
  LogOut,
  Home,
  GraduationCap,
  BarChart3,
  Settings,
  User
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for dashboard
const mockCourses = [
  {
    id: 1,
    title: "Stock Market Fundamentals",
    progress: 85,
    totalLessons: 12,
    completedLessons: 10,
    duration: "4 hours",
    category: "Beginner",
    thumbnail: "/api/placeholder/300/200",
    instructor: "Dr. Sarah Johnson",
    nextLesson: "Portfolio Diversification"
  },
  {
    id: 2,
    title: "Advanced Trading Strategies",
    progress: 60,
    totalLessons: 15,
    completedLessons: 9,
    duration: "6 hours",
    category: "Advanced",
    thumbnail: "/api/placeholder/300/200",
    instructor: "Michael Chen",
    nextLesson: "Risk Management Techniques"
  },
  {
    id: 3,
    title: "Forex Trading Basics",
    progress: 30,
    totalLessons: 10,
    completedLessons: 3,
    duration: "3 hours",
    category: "Intermediate",
    thumbnail: "/api/placeholder/300/200",
    instructor: "Emma Rodriguez",
    nextLesson: "Currency Pair Analysis"
  }
];

const mockStats = {
  totalCourses: 12,
  completedCourses: 3,
  totalHours: 45,
  certificates: 2,
  currentStreak: 7,
  rank: "Intermediate Trader"
};

const sidebarItems = [
  { icon: Home, label: "Dashboard", active: true },
  { icon: BookOpen, label: "My Courses" },
  { icon: GraduationCap, label: "Certificates" },
  { icon: BarChart3, label: "Analytics" },
  { icon: User, label: "Profile" },
  { icon: Settings, label: "Settings" }
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  item.active 
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
                <h1 className="text-2xl font-bold text-secondary">Welcome back, {user?.firstName}!</h1>
                <p className="text-muted-foreground">Continue your financial education journey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {mockStats.rank}
              </Badge>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{mockStats.totalCourses}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{mockStats.completedCourses}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((mockStats.completedCourses / mockStats.totalCourses) * 100)}% completion rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{mockStats.totalHours}</div>
                <p className="text-xs text-muted-foreground">
                  +5 hours this week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{mockStats.currentStreak}</div>
                <p className="text-xs text-muted-foreground">
                  days in a row
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Courses Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Courses */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-left">Continue Learning</CardTitle>
                  <CardDescription className="text-left">
                    Pick up where you left off
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {mockCourses.map((course) => (
                    <div key={course.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-left text-foreground mb-1">{course.title}</h3>
                          <p className="text-sm text-muted-foreground text-left mb-2">
                            Instructor: {course.instructor}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                            <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                            <span>{course.duration}</span>
                            <Badge variant="outline" className="text-xs">
                              {course.category}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" className="ml-4">
                          <PlayCircle className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-primary font-medium">{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground text-left">
                          Next: {course.nextLesson}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-left">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-left">Certificate Earned</p>
                      <p className="text-xs text-muted-foreground text-left">Stock Market Fundamentals</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-left">Lesson Completed</p>
                      <p className="text-xs text-muted-foreground text-left">Risk Management Basics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-left">Joined Discussion</p>
                      <p className="text-xs text-muted-foreground text-left">Trading Strategies Forum</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommended Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-left">Recommended for You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border border-border rounded-lg p-3">
                    <h4 className="font-medium text-sm text-left mb-1">Technical Analysis Mastery</h4>
                    <p className="text-xs text-muted-foreground text-left mb-2">
                      Learn chart patterns and indicators
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                  
                  <div className="border border-border rounded-lg p-3">
                    <h4 className="font-medium text-sm text-left mb-1">Options Trading</h4>
                    <p className="text-xs text-muted-foreground text-left mb-2">
                      Advanced derivatives strategies
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Enroll Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;