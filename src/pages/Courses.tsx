import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { courseService } from "@/services/course.service";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  faFilter, 
  faSpinner, 
  faCheckCircle,
  faPlayCircle,
  faCalendar,
  faDollarSign
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
  creation_date?: string;
  sales?: number;
}

interface ApiResponse {
  data?: Course[];
  courses?: Course[];
  message?: string;
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

        // Transform API response to include mock data for missing fields
        const coursesWithMockData = coursesData.map((course) => ({
          ...course,
          instructor: course.instructor?.name || "ZSE Expert Instructor",
          duration: course.duration || `${Math.floor(Math.random() * 12) + 4} weeks`,
          students: Math.floor(Math.random() * 2000) + 500,
          rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
          category: course.category?.name || "General",
          level: course.level || "Beginner",
          thumbnail_url: course.thumbnail || "",
          is_published: true,
          is_enrolled: course.is_enrolled || false,
          progress: course.progress || 0,
          creation_date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          sales: course.price
        }));

        setCourses(coursesWithMockData);
      } catch (error: any) {
        console.error("Failed to fetch courses:", error);
        
        let errorMessage = "Unable to load courses. Please try again later.";
        
        if (error.response) {
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        } else if (error.request) {
          errorMessage = "No response from server. Please check your connection.";
        }
        
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        // Set empty array to prevent further errors
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
      
      // Update the course to show as enrolled
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
      console.error("Enrollment error:", error);
      
      let errorMessage = "Failed to enroll in course. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 409) {
        errorMessage = "You are already enrolled in this course";
      }

      toast({
        title: "Enrollment Failed",
        description: errorMessage,
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
      course.is_published // Only show published courses
    );
  });

  // Get unique categories and levels for filters
  const categories = Array.from(new Set(courses.map(course => course.category).filter(Boolean)));
  const levels = Array.from(new Set(courses.map(course => course.level).filter(Boolean)));

  // Format price to display as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get default thumbnail if none provided
  const getThumbnail = (course: Course) => {
    if (course.thumbnail_url) return course.thumbnail_url;
    
    // Default thumbnails based on category
    const defaultThumbnails: Record<string, string> = {
      'Fundamentals': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop',
      'Technical Analysis': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop',
      'Portfolio Management': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=240&fit=crop',
      'Risk Management': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop',
      'Market Analysis': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
      'Compliance': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=240&fit=crop',
      'UI/UX Design': 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=240&fit=crop',
      'Graphic Design': 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=400&h=240&fit=crop',
      'Animation': 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=240&fit=crop',
      'Web Development': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop',
      'Branding': 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&h=240&fit=crop',
    };
    
    return defaultThumbnails[course.category] || 
           'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop';
  };

  const getStatusBadge = (isPublished: boolean) => {
    return isPublished ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-0 text-xs">
        Published
      </Badge>
    ) : (
      <Badge variant="outline" className="text-gray-500 border-gray-300 text-xs">
        Unpublished
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center py-12">
            <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-primary animate-spin" />
            <span className="ml-2 text-lg">Loading courses...</span>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
     

      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
              <p className="text-gray-600 mt-1">Create and manage courses in your school.</p>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">All Category</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all-categories")}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === "all-categories"
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-accent/30">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40 bg-white">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 bg-white">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                <div className="flex flex-col h-full">
                  {/* Course Image */}
                  <Link to={`/courses/${course.id}`}>
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={getThumbnail(course)}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </Link>
                  
                  {/* Course Content */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                        {course.category}
                      </Badge>
                      {getStatusBadge(course.is_published)}
                    </div>
                    
                    <Link to={`/courses/${course.id}`}>
                      <CardTitle className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors line-clamp-2 mb-2">
                        {course.title}
                      </CardTitle>
                    </Link>
                    
                    <CardDescription className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {course.description || "No description available"}
                    </CardDescription>

                    {/* Course Meta Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faCalendar} className="h-3 w-3" />
                          <span>Creation Date</span>
                        </div>
                        <span className="font-medium text-gray-900">{course.creation_date}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faDollarSign} className="h-3 w-3" />
                          <span>Sales</span>
                        </div>
                        <span className="font-medium text-gray-900">{formatPrice(course.sales || course.price)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faUsers} className="h-3 w-3" />
                          <span>Students</span>
                        </div>
                        <span className="font-medium text-gray-900">{course.students?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faStar} className="h-3 w-3 text-yellow-400" />
                          <span>Rating</span>
                        </div>
                        <span className="font-medium text-gray-900">{course.rating?.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Action Section */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="text-xl font-bold text-primary">
                        {formatPrice(course.price)}
                      </div>
                      
                      {course.is_enrolled ? (
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">Enrolled</span>
                          <Link to={`/learn/${course.id}`}>
                            <Button size="sm" variant="outline" className="h-8">
                              <FontAwesomeIcon icon={faPlayCircle} className="mr-1 h-3 w-3" />
                              Continue
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <Button 
                          variant="default" 
                          onClick={() => handleEnroll(course.id)}
                          disabled={enrolling === course.id}
                          className="min-w-24 h-9 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {enrolling === course.id ? (
                            <>
                              <FontAwesomeIcon icon={faSpinner} className="h-3 w-3 animate-spin mr-1" />
                              Enrolling...
                            </>
                          ) : (
                            "Enroll Now"
                          )}
                        </Button>
                      )}
                    </div>
                    
                    {course.is_enrolled && course.progress !== undefined && (
                      <div className="pt-3 mt-3 border-t border-gray-100">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-300" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && courses.length > 0 && (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faFilter} className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}

          {courses.length === 0 && !loading && (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faFilter} className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">No courses available</h3>
              <p className="text-muted-foreground">Check back later for new courses</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;