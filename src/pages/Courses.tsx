import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUsers, faStar, faSearch, faFilter, faSpinner } from "@fortawesome/free-solid-svg-icons";
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
}

interface ApiResponse {
  data?: Course[];
  courses?: Course[];
  message?: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all-levels");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("zse_training_token");
        
        const response = await axios.get<ApiResponse>("http://127.0.0.1:8000/api/courses", {
          headers: token ? {
            Authorization: `Bearer ${token}`,
          } : undefined,
        });

        console.log("API Response:", response.data); // Debug log

        let coursesData: Course[] = [];

        // Handle different possible response structures
        if (Array.isArray(response.data)) {
          // If response.data is directly an array
          coursesData = response.data;
        } else if (Array.isArray(response.data?.data)) {
          // If response.data.data is an array (Laravel pagination format)
          coursesData = response.data.data;
        } else if (Array.isArray(response.data?.courses)) {
          // If response.data.courses is an array
          coursesData = response.data.courses;
        } else {
          console.error("Unexpected API response structure:", response.data);
          toast({
            title: "Error",
            description: "Unexpected data format from server",
            variant: "destructive",
          });
          setCourses([]);
          return;
        }

        // Transform API response to include mock data for missing fields
        const coursesWithMockData = coursesData.map((course: Course) => ({
          ...course,
          instructor: course.instructor || "ZSE Expert Instructor",
          duration: course.duration || `${Math.floor(Math.random() * 12) + 4} weeks`,
          students: course.students || Math.floor(Math.random() * 2000) + 500,
          rating: course.rating || (4.5 + Math.random() * 0.5), // Random rating between 4.5-5.0
        }));

        setCourses(coursesWithMockData);
      } catch (error: any) {
        console.error("Failed to fetch courses:", error);
        
        let errorMessage = "Unable to load courses. Please try again later.";
        
        if (error.response) {
          // Server responded with error status
          errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
        } else if (error.request) {
          // Request was made but no response received
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
    };
    
    return defaultThumbnails[course.category] || 
           'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <section className="bg-hero text-white py-16">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Professional Training Courses</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Master Zimbabwe Stock Exchange with our comprehensive range of expert-led courses
            </p>
          </div>
        </section>
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
      
      {/* Hero Section */}
      <section className="bg-hero text-white py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
              Professional Training Courses
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto text-center">
              Master Zimbabwe Stock Exchange with our comprehensive range of expert-led courses
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-accent/30">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4 flex-wrap">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`}>
                <Card className="card-hover overflow-hidden h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={getThumbnail(course)}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader className="text-left">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {course.level}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <FontAwesomeIcon icon={faStar} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{course.rating?.toFixed(1)}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl line-clamp-2 text-left">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-left">
                      {course.description || "No description available"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-left">
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground">
                        Instructor: {course.instructor}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faUsers} className="h-4 w-4" />
                          <span>{course.students?.toLocaleString()} students</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary">
                          {formatPrice(course.price)}
                        </div>
                        <Button variant="hero" onClick={(e) => e.preventDefault()}>
                          Enroll Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>  
              </Link>
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