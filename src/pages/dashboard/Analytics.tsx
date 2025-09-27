import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartColumn, 
  faArrowTrendUp, 
  faClock, 
  faBullseye,
  faBook,
  faAward
} from "@fortawesome/free-solid-svg-icons";

const mockAnalytics = {
  weeklyProgress: [
    { day: "Mon", hours: 2.5 },
    { day: "Tue", hours: 1.8 },
    { day: "Wed", hours: 3.2 },
    { day: "Thu", hours: 2.1 },
    { day: "Fri", hours: 2.8 },
    { day: "Sat", hours: 4.1 },
    { day: "Sun", hours: 1.5 }
  ],
  monthlyStats: {
    totalHours: 45,
    coursesCompleted: 3,
    averageScore: 92,
    streakDays: 12
  },
  skillProgress: [
    { skill: "Technical Analysis", progress: 85 },
    { skill: "Risk Management", progress: 72 },
    { skill: "Market Psychology", progress: 68 },
    { skill: "Portfolio Management", progress: 45 }
  ]
};

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">Track your learning performance and progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockAnalytics.monthlyStats.totalHours}</div>
            <p className="text-xs text-muted-foreground">
              +8 hours from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <FontAwesomeIcon icon={faBook} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockAnalytics.monthlyStats.coursesCompleted}</div>
            <p className="text-xs text-muted-foreground">
              +1 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <FontAwesomeIcon icon={faAward} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockAnalytics.monthlyStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <FontAwesomeIcon icon={faBullseye} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{mockAnalytics.monthlyStats.streakDays}</div>
            <p className="text-xs text-muted-foreground">
              days in a row
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FontAwesomeIcon icon={faChartColumn} className="h-5 w-5 mr-2" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Hours spent learning this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAnalytics.weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <Progress value={(day.hours / 5) * 100} className="h-2" />
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {day.hours}h
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FontAwesomeIcon icon={faArrowTrendUp} className="h-5 w-5 mr-2" />
              Skill Progress
            </CardTitle>
            <CardDescription>Your mastery in different areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.skillProgress.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    <span className="text-sm text-primary font-medium">{skill.progress}%</span>
                  </div>
                  <Progress value={skill.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;