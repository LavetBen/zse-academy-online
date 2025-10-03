import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPlay, faClock, faUsers } from "@fortawesome/free-solid-svg-icons";

const mockCourses = [
  {
    id: 1,
    title: "Stock Market Fundamentals",
    progress: 85,
    totalLessons: 12,
    completedLessons: 10,
    duration: "4 hours",
    category: "Beginner",
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
    instructor: "Emma Rodriguez",
    nextLesson: "Currency Pair Analysis"
  }
];

const MyCourses = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Courses</h1>
        <p className="text-muted-foreground">Track your learning progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>Instructor: {course.instructor}</CardDescription>
                </div>
                <Badge variant="outline">{course.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faBook} className="h-4 w-4 mr-1" />
                  {course.completedLessons}/{course.totalLessons} lessons
                </span>
                <span className="flex items-center">
                  <FontAwesomeIcon icon={faClock} className="h-4 w-4 mr-1" />
                  {course.duration}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Next: {course.nextLesson}
                </p>
                <Button className="w-full">
                  <FontAwesomeIcon icon={faPlay} className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyCourses;