import { useState, useEffect } from "react";
import { courseService } from "@/services/course.service";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCertificate, faClock } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: number;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  category: string;
  instructor: string;
  nextLesson: string;
  level: string;
  stages: number;
  status: "completed" | "in-progress" | "not-started";
  certificateReceived?: boolean;
  timeSpent: string;
}

// Skeleton Loader Component
const CourseSkeleton = () => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        {/* Mobile Layout */}
        <div className="block sm:hidden space-y-3">
          <div className="space-y-2">
            <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-1">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
            <div className="h-9 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="flex-1 max-w-md">
              <div className="h-2 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="space-y-1 text-right">
              <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse ml-auto"></div>
            </div>
            <div className="h-9 bg-gray-200 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MyCourses = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user) return;

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const data = await courseService.getMyCourses();

        const enrolledCourses = data.map((course: any, index: number) => {
          let status: "completed" | "in-progress" | "not-started" = "not-started";
          let certificateReceived = false;
          
          if (course.pivot?.progress === 100) {
            status = "completed";
            certificateReceived = true;
          } else if (course.pivot?.progress > 0) {
            status = "in-progress";
          }

          const levels = ["Beginner", "Intermediate", "Advanced"];
          const timeSpentOptions = ["12h 37m", "6h 21m", "4h 9m"];
          
          return {
            id: course.id,
            title: course.title,
            progress: course.pivot?.progress || 0,
            totalLessons: course.contents?.length || 0,
            completedLessons: course.pivot?.completed_lessons || 0,
            duration: course.duration || "N/A",
            category: course.category?.name || "Role-Play",
            instructor: course.instructor?.name || "N/A",
            nextLesson: course.contents?.[course.pivot?.completed_lessons || 0]?.title || "Start course",
            level: levels[index % levels.length],
            stages: course.contents?.length || Math.floor(Math.random() * 8) + 3,
            status,
            certificateReceived,
            timeSpent: timeSpentOptions[index % timeSpentOptions.length],
          };
        });

        setCourses(enrolledCourses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        toast({
          title: "Error",
          description: "Unable to load your courses. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [user, toast]);

  const getStatusBadge = (status: string, certificateReceived: boolean) => {
    switch (status) {
      case "completed":
        return (
          <div className="flex items-center gap-2">
            <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
              Completed
            </Badge>
            {certificateReceived && (
              <FontAwesomeIcon icon={faCertificate} className="h-3 w-3 text-yellow-500" />
            )}
          </div>
        );
      case "in-progress":
        return (
          <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
            In Progress
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-gray-500 text-xs">
            Not yet available
          </Badge>
        );
    }
  };

  const getStatusText = (status: string, certificateReceived: boolean) => {
    if (status === "completed") {
      return certificateReceived ? "Certificate received" : "Completed";
    }
    return "Not yet available";
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, index) => (
          <CourseSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">You are not enrolled in any courses yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {courses.map((course) => (
        <Card key={course.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden space-y-3">
              {/* Course Title and Info */}
              <div className="space-y-1">
                <h3 className="font-semibold text-sm leading-tight">
                  {course.title}
                </h3>
                <div className="text-xs text-muted-foreground">
                  {course.stages} Stages • {course.level}
                </div>
              </div>

              {/* Progress Bar and Percentage */}
              <div className="flex items-center gap-3">
                <Progress value={course.progress} className="h-2 flex-1" />
                <span className="text-sm font-medium whitespace-nowrap min-w-12">
                  {course.progress}%
                </span>
              </div>

              {/* Status and Action */}
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                  {getStatusBadge(course.status, course.certificateReceived || false)}
                  <div className="flex items-center text-xs text-muted-foreground">
                    <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
                    <span>{course.timeSpent}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getStatusText(course.status, course.certificateReceived || false)}
                  </div>
                </div>
                
                <Button 
                  variant={course.status === "completed" ? "outline" : "default"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faPlay} className="h-3 w-3 mr-1" />
                  {course.status === "completed" ? "Review" : "Continue"}
                </Button>
              </div>
            </div>

            {/* Desktop Layout - Horizontal */}
            <div className="hidden sm:flex items-center justify-between gap-6">
              {/* Left Section - Course Title, Progress Bar, and Percentage in one line */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Course Title */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm truncate">
                    {course.title}
                  </h3>
                  <div className="text-xs text-muted-foreground mt-1">
                    {course.stages} Stages • {course.level}
                  </div>
                </div>

                {/* Progress Bar and Percentage */}
                <div className="flex items-center gap-3 flex-1 max-w-md">
                  <Progress value={course.progress} className="h-2 flex-1" />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {course.progress}%
                  </span>
                </div>
              </div>

              {/* Right Section - Status and Action */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right space-y-1">
                  {getStatusBadge(course.status, course.certificateReceived || false)}
                  <div className="flex items-center justify-end text-xs text-muted-foreground">
                    <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
                    <span>{course.timeSpent}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getStatusText(course.status, course.certificateReceived || false)}
                  </div>
                </div>
                
                <Button 
                  variant={course.status === "completed" ? "outline" : "default"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <FontAwesomeIcon icon={faPlay} className="h-3 w-3 mr-1" />
                  {course.status === "completed" ? "Review" : "Continue"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MyCourses;