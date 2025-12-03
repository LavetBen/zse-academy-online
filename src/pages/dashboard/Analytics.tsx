import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChartColumn, 
  faArrowTrendUp, 
  faClock, 
  faBullseye,
  faBook,
  faAward
} from "@fortawesome/free-solid-svg-icons";

const mockData = {
  week: {
    weeklyProgress: [
      { day: "Mon", hours: 2.5 },
      { day: "Tue", hours: 1.8 },
      { day: "Wed", hours: 3.2 },
      { day: "Thu", hours: 2.1 },
      { day: "Fri", hours: 2.8 },
      { day: "Sat", hours: 4.1 },
      { day: "Sun", hours: 1.5 }
    ],
    monthlyStats: { totalHours: 45, coursesCompleted: 3, averageScore: 92, streakDays: 12 },
    skillProgress: [
      { skill: "Technical Analysis", progress: 85 },
      { skill: "Risk Management", progress: 72 },
      { skill: "Market Psychology", progress: 68 },
      { skill: "Portfolio Management", progress: 45 }
    ]
  },
  month: {
    weeklyProgress: [
      { day: "Week 1", hours: 12 },
      { day: "Week 2", hours: 15 },
      { day: "Week 3", hours: 9 },
      { day: "Week 4", hours: 18 }
    ],
    monthlyStats: { totalHours: 54, coursesCompleted: 4, averageScore: 88, streakDays: 19 },
    skillProgress: [
      { skill: "Technical Analysis", progress: 92 },
      { skill: "Risk Management", progress: 78 },
      { skill: "Market Psychology", progress: 74 },
      { skill: "Portfolio Management", progress: 59 }
    ]
  },
  quarter: {
    weeklyProgress: [
      { day: "Jan", hours: 40 },
      { day: "Feb", hours: 38 },
      { day: "Mar", hours: 44 }
    ],
    monthlyStats: { totalHours: 122, coursesCompleted: 8, averageScore: 90, streakDays: 41 },
    skillProgress: [
      { skill: "Technical Analysis", progress: 96 },
      { skill: "Risk Management", progress: 84 },
      { skill: "Market Psychology", progress: 77 },
      { skill: "Portfolio Management", progress: 68 }
    ]
  },
};

const mockRecent = [
  { id: 1, text: "Completed lesson — Market Psychology", time: "2h ago" },
  { id: 2, text: "Scored 92% in Portfolio Quiz", time: "1d ago" },
  { id: 3, text: "Started course — Advanced TA", time: "3d ago" }
];

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("week");
  const [goal, setGoal] = useState(10);

  const currentData = mockData[range];
  const currentWeekHours = currentData.weeklyProgress.reduce((s, d) => s + d.hours, 0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <div className="space-y-6">Loading...</div>;
  }

  return (
    <div className="space-y-6">

      {/* ================== RANGE SELECTOR ================== */}
      <div className="flex gap-2">
        {["week", "month", "quarter"].map((r) => (
          <button
            key={r}
            onClick={() => setRange(r)}
            className={`px-3 py-1 rounded-md text-sm ${
              range === r ? "bg-primary text-white" : "border"
            }`}
          >
            {r[0].toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      {/* ================== MAIN STATS ================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        
        {/* Total Hours */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Total Hours</CardTitle>
            <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {currentData.monthlyStats.totalHours}
            </div>
            <p className="text-xs text-muted-foreground">+8 hours</p>
          </CardContent>
        </Card>

        {/* Courses */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Courses Completed</CardTitle>
            <FontAwesomeIcon icon={faBook} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {currentData.monthlyStats.coursesCompleted}
            </div>
            <p className="text-xs text-muted-foreground">+1 from last period</p>
          </CardContent>
        </Card>

        {/* Score */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Average Score</CardTitle>
            <FontAwesomeIcon icon={faAward} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {currentData.monthlyStats.averageScore}%
            </div>
            <p className="text-xs text-muted-foreground">+5%</p>
          </CardContent>
        </Card>

        {/* Streak */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Learning Streak</CardTitle>
            <FontAwesomeIcon icon={faBullseye} className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {currentData.monthlyStats.streakDays}
            </div>
            <p className="text-xs text-muted-foreground">days in a row</p>
          </CardContent>
        </Card>

        {/* WEEKLY GOAL */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Weekly Goal</CardTitle>
            <CardDescription>{currentWeekHours} / {goal} hrs</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(currentWeekHours / goal) * 100} className="h-2" />
            <button 
              onClick={() => setGoal(goal + 2)} 
              className="text-xs underline mt-2"
            >
              Increase Goal
            </button>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ================== WEEKLY ACTIVITY ================== */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FontAwesomeIcon icon={faChartColumn} className="mr-2" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Hours spent this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentData.weeklyProgress.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="w-16 text-sm font-medium">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <Progress value={(day.hours / 5) * 100} className="h-2" />
                  </div>
                  <span className="w-12 text-right text-sm text-muted-foreground">{day.hours}h</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ================== RECENT ACTIVITY ================== */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning events</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockRecent.map(a => (
                <li key={a.id} className="flex justify-between">
                  <span className="text-sm">{a.text}</span>
                  <span className="text-xs text-muted-foreground">{a.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* ================== SKILL PROGRESS ================== */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FontAwesomeIcon icon={faArrowTrendUp} className="mr-2" />
            Skill Progress
          </CardTitle>
          <CardDescription>Your mastery in different topics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {currentData.skillProgress.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{skill.skill}</span>
                  <span className="text-sm text-primary">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
