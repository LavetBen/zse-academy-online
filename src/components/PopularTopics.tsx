import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowTrendUp, 
  faDollarSign, 
  faChartColumn, 
  faStar, 
  faUsers, 
  faClock, 
  faChartLine,
  faSpinner 
} from "@fortawesome/free-solid-svg-icons";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface Course {
  id: number;
  title: string;
  description: string;
  category: string | Category; // Can be string or Category object
  level: string;
  price: number;
  thumbnail_url: string;
  is_published: boolean;
  instructor?: string;
  duration?: string;
  students?: number;
  rating?: number;
  review_count?: number;
  is_enrolled?: boolean;
  progress?: number;
  creation_date?: string;
  sales?: number;
  is_bestseller?: boolean;
  original_price?: number;
}

export const PopularTopics = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/api/courses/latest');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data.data); // Debug log
        setCourses(data.data || []);
      } catch (err) {
        console.error('Error fetching latest courses:', err);
        setError(err instanceof Error ? err.message : 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestCourses();
  }, []);

  // Helper function to get category name safely
  const getCategoryName = (category: string | Category): string => {
    if (typeof category === 'string') {
      return category;
    }
    if (category && typeof category === 'object' && 'name' in category) {
      return category.name;
    }
    return 'General';
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Bestseller": return "bg-orange-500";
      case "Premium": return "bg-purple-600";
      case "Hot": return "bg-red-500";
      case "New": return "bg-green-500";
      default: return "bg-primary";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-600";
      case "intermediate": return "bg-blue-100 text-blue-600";
      case "advanced": return "bg-purple-100 text-purple-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  // Format price to display as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price);
  };

  // Calculate discount percentage
  const getDiscountPercentage = (originalPrice: number, currentPrice: number) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  // Get default thumbnail if none provided
  const getThumbnail = (course: Course) => {
    if (course.thumbnail_url) return course.thumbnail_url;
    
    // Default thumbnails based on category
    const defaultThumbnails: Record<string, string> = {
      'Programming': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=240&fit=crop',
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
      'Forex': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop',
      'Analysis': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop',
      'Markets': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=240&fit=crop',
    };
    
    const categoryName = getCategoryName(course.category);
    return defaultThumbnails[categoryName] || 
           'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop';
  };

  // Render star rating
  const renderRating = (rating: number, reviewCount?: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center mb-3 sm:mb-4">
        <div className="flex items-center mr-2">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              className={`h-3 w-3 sm:h-4 sm:w-4 ${
                i < fullStars 
                  ? "text-yellow-400 fill-yellow-400" 
                  : i === fullStars && hasHalfStar 
                  ? "text-yellow-400 fill-yellow-400 opacity-50" 
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="font-semibold text-secondary mr-1 text-sm">{rating?.toFixed(1) || '4.5'}</span>
        <span className="text-xs sm:text-sm text-muted-foreground">
          ({reviewCount ? reviewCount.toLocaleString() : '0'})
        </span>
      </div>
    );
  };

  // Transform course data to ensure all fields are properly formatted
  const transformCourseData = (course: Course) => {
    return {
      ...course,
      // Ensure category is handled properly
      category: getCategoryName(course.category),
      // Add fallback values for missing data
      instructor: course.instructor || 'Expert Instructor',
      duration: course.duration || `${Math.floor(Math.random() * 8) + 4} weeks`,
      students: course.students || Math.floor(Math.random() * 2000) + 500,
      rating: course.rating || 4.5 + Math.random() * 0.5,
      review_count: course.review_count || Math.floor(Math.random() * 200) + 100,
      is_bestseller: course.is_bestseller || Math.random() > 0.7,
      original_price: course.original_price || course.price * 1.5,
    };
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50/30 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="mb-8 sm:mb-12">
            <Skeleton className="h-6 w-48 mb-3" />
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>

          {/* Courses Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200">
                <Skeleton className="w-full h-40 sm:h-48" />
                <div className="p-4 sm:p-6">
                  <Skeleton className="h-5 w-20 mb-3" />
                  <Skeleton className="h-6 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-3" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex justify-between mb-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                  <Skeleton className="h-10 w-full rounded-lg" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50/30 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <FontAwesomeIcon icon={faSpinner} className="h-8 w-8 text-red-500 mb-3" />
            <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to load courses</h3>
            <p className="text-red-600 text-sm">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white"
            >
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  // No courses state
  if (courses.length === 0) {
    return (
      <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50/30 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <FontAwesomeIcon icon={faStar} className="h-8 w-8 text-yellow-500 mb-3" />
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">No courses available</h3>
            <p className="text-yellow-600 text-sm">Check back later for new courses</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50/30 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Left Aligned */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-sm text-xs font-medium mb-3">
            <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
            Latest Courses
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-3">
            Master Financial Markets
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Build your trading skills with expert-led courses designed for Zimbabwe's unique financial landscape
          </p>
        </div>

        {/* Enhanced Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {courses.map((course) => {
            const transformedCourse = transformCourseData(course);
            
            return (
              <Card 
                key={transformedCourse.id} 
                className="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Course Image with Gradient Overlay */}
                <div className="relative overflow-hidden">
                  <img 
                    src={getThumbnail(transformedCourse)} 
                    alt={transformedCourse.title} 
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Badge */}
                  {transformedCourse.is_bestseller && (
                    <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-sm font-semibold">
                      Bestseller
                    </span>
                  )}
                  
                  {/* Discount Badge */}
                  {transformedCourse.original_price && transformedCourse.original_price > transformedCourse.price && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-sm font-semibold">
                      {getDiscountPercentage(transformedCourse.original_price, transformedCourse.price)}% OFF
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  {/* Level Badge */}
                  <div className="flex justify-between items-start mb-2 sm:mb-3">
                    <span className={`inline-block px-2 py-1 rounded-sm text-xs font-semibold ${getLevelColor(transformedCourse.level)}`}>
                      {transformedCourse.level || 'All Levels'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {transformedCourse.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg sm:text-xl font-bold text-secondary mb-2 sm:mb-3 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                    {transformedCourse.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                    {transformedCourse.description || "No description available"}
                  </p>

                  {/* Rating */}
                  {renderRating(transformedCourse.rating || 4.5, transformedCourse.review_count)}

                  {/* Price Section */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl font-bold text-secondary">
                      {formatPrice(transformedCourse.price)}
                    </span>
                    {transformedCourse.original_price && transformedCourse.original_price > transformedCourse.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(transformedCourse.original_price)}
                      </span>
                    )}
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faUsers} className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{transformedCourse.students?.toLocaleString() || '1,000+'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{transformedCourse.duration || 'Self-paced'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Enroll Now Button - Aligned in card body */}
                  <div className="mt-4">
                    <Link to={`/courses/${transformedCourse.id}`}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:shadow-lg text-sm">
                        Enroll Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* View All Button - Left Aligned */}
        <div className="text-left mt-6">
          <Link to="/courses" className="inline-block">
            <Button variant="outline" className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg text-sm sm:text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
              View All Courses
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};