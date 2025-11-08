import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { courseService } from "@/services/course.service";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faClock, 
  faUsers, 
  faStar, 
  faSearch, 
  faSpinner, 
  faCheckCircle,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  price: number;
  thumbnail_url: string;
  is_published: boolean;
  instructor?: string;
  duration?: string;
  students?: number;
  rating?: number;
  is_enrolled?: boolean;
  progress?: number;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all-levels");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await courseService.getAllCourses();
        const coursesWithMockData = coursesData.map((course) => ({
          ...course,
          instructor: course.instructor?.name || "ZSE Expert Instructor",
          duration: course.duration || `${Math.floor(Math.random() * 12) + 4} weeks`,
          students: Math.floor(Math.random() * 2000) + 500,
          rating: 4.5 + Math.random() * 0.5,
          category: course.category?.name || "General",
          level: course.level || "Beginner",
          thumbnail_url: course.thumbnail || "",
          is_published: true,
          is_enrolled: course.is_enrolled || false,
          progress: course.progress || 0,
        }));
        setCourses(coursesWithMockData);
      } catch (error: any) {
        console.error("Failed to fetch courses:", error);
        toast({
          title: "Error",
          description: "Unable to load courses. Please try again later.",
          variant: "destructive",
        });
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [toast]);

  const handleEnroll = async (courseId: number) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to enroll in courses",
        variant: "destructive",
      });
      return;
    }

    setEnrolling(courseId);
    try {
      await courseService.enrollInCourse(courseId);
      setCourses(prevCourses => 
        prevCourses.map(course => 
          course.id === courseId 
            ? { ...course, is_enrolled: true, progress: 0 }
            : course
        )
      );
      toast({
        title: "Success!",
        description: "You have successfully enrolled in the course",
        className: "bg-green-50 text-green-900 border-green-200",
      });
    } catch (error: any) {
      toast({
        title: "Enrollment Failed",
        description: "Failed to enroll in course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setEnrolling(null);
    }
  };

  const filteredCourses = courses.filter(course => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLevel === "all-levels" || selectedLevel === "" || course.level === selectedLevel) &&
      (selectedCategory === "all-categories" || selectedCategory === "" || course.category === selectedCategory) &&
      course.is_published
    );
  });

  const categories = Array.from(new Set(courses.map(course => course.category).filter(Boolean)));
  const levels = Array.from(new Set(courses.map(course => course.level).filter(Boolean)));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getThumbnail = (course: Course) => {
    if (course.thumbnail_url) return course.thumbnail_url;
    const defaultThumbnails: Record<string, string> = {
      'Fundamentals': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop',
      'Technical Analysis': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop',
      'Portfolio Management': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=240&fit=crop',
    };
    return defaultThumbnails[course.category] || 
           'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center py-12">
            <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-primary animate-spin" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />
      
      {/* Hero Section - Udemy Style */}
      <section className="bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Learn from the best courses
            </h1>
            <p className="text-lg md:text-xl text-purple-100">
              Explore our comprehensive catalog of courses designed to help you master trading and financial markets
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar - Sticky */}
      <section className="border-b bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-xl w-full">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary"
              />
            </div>
            
            {/* Filters */}
            <div className="flex gap-3 w-full md:w-auto">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48 border-gray-300">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-40 border-gray-300">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'} found
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid - Udemy Style */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <FontAwesomeIcon icon={faSearch} className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="group overflow-hidden border hover:shadow-xl transition-all duration-300 bg-white">
                  {/* Course Thumbnail */}
                  <Link to={`/courses/${course.id}`}>
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={getThumbnail(course)}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop';
                        }}
                      />
                      {course.is_enrolled && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500 hover:bg-green-500 text-white border-0">
                            <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3 mr-1" />
                            Enrolled
                          </Badge>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  {/* Course Info */}
                  <CardContent className="p-4">
                    <Link to={`/courses/${course.id}`}>
                      <h3 className="font-bold text-base text-gray-900 line-clamp-2 mb-2 group-hover:text-purple-600 transition-colors">
                        {course.title}
                      </h3>
                    </Link>
                    
                    <p className="text-xs text-gray-600 mb-2">{course.instructor}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-sm text-gray-900">{course.rating?.toFixed(1)}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon 
                            key={i} 
                            icon={faStar} 
                            className={`h-3 w-3 ${i < Math.floor(course.rating || 0) ? 'text-orange-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({course.students?.toLocaleString()})</span>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{formatPrice(course.price)}</span>
                      </div>
                      
                      {course.is_enrolled ? (
                        <Link to={`/learn/${course.id}`}>
                          <Button size="sm" variant="outline" className="text-xs h-8">
                            Continue
                          </Button>
                        </Link>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleEnroll(course.id)}
                          disabled={enrolling === course.id}
                          className="text-xs h-8 bg-purple-600 hover:bg-purple-700"
                        >
                          {enrolling === course.id ? (
                            <FontAwesomeIcon icon={faSpinner} className="h-3 w-3 animate-spin" />
                          ) : (
                            "Enroll"
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-3">
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                      <Badge variant="outline" className="text-xs py-0 px-2 h-5">
                        {course.level}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
