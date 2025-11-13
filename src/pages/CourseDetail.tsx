import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { courseService, Course as CourseType } from "@/services/course.service";
import { SimilarCoursesSection } from "@/components/course/SimilarCoursesSection";
import { CourseSidebarCard } from "@/components/course/CourseSidebarCard";
import {
  faXmark,
  faChevronRight,
  faChevronLeft,
  faPlay,
  faUsers,
  faAward,
  faList,
  faUser,
  faStar,
  faFileAlt,
  faChartLine,
  faMoneyBill,
  faHeart,
  faClock,
  faArrowTrendUp,
  faDownload,
  faCheck,
  faForward,
  faBackward,
  faExternalLink,
  faVideo,
  faExclamationTriangle,
  faRefresh,
} from "@fortawesome/free-solid-svg-icons";
import { Star, BookOpen } from "lucide-react";

// Define TypeScript interfaces based on your API response
interface Slide {
  id: number;
  course_content_id: number;
  title: string;
  type: string;
  file_path: string | null;
  url: string;
  position: number;
  created_at: string;
  updated_at: string;
}

interface Content {
  id: number;
  course_id: number;
  title: string;
  description: string;
  position: number;
  created_at: string;
  updated_at: string;
  slides: Slide[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface CourseDetail extends CourseType {
  user_id: number;
  category: Category;
  category_id: number;
  created_at: string;
  updated_at: string;
  is_enrolled: boolean;
  contents: Content[];
}

// Video Player Component with Fallback
const VideoContentPlayer = ({ 
  content 
}: { 
  content: {
    title: string;
    type: string;
    url: string;
    youtubeId?: string;
  } 
}) => {
  const [useFallback, setUseFallback] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced YouTube ID extraction
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;

    // Remove any tracking parameters and clean the URL
    const cleanUrl = url
      .replace(/\?si=.*$/, '') // Remove ?si parameters
      .replace(/&t=.*$/, '')   // Remove timestamp parameters
      .split('&')[0];          // Take only the first parameter

    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      /youtube\.com\/watch\?v=([^"&?\/\s]{11})/,
      /youtu\.be\/([^"&?\/\s]{11})/,
    ];

    for (const pattern of patterns) {
      const match = cleanUrl.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  };

  // Enhanced embed URL with additional parameters to avoid restrictions
  const getYouTubeEmbedUrl = (youtubeId: string): string => {
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0', // Don't show related videos
      modestbranding: '1', // Less YouTube branding
      showinfo: '0', // Don't show video info
      iv_load_policy: '3', // Don't show annotations
      enablejsapi: '1', // Enable JS API
      origin: window.location.origin, // Set origin to current domain
      widget_referrer: window.location.origin, // Set referrer
    });

    return `https://www.youtube-nocookie.com/embed/${youtubeId}?${params.toString()}`;
  };

  const youtubeId = content.youtubeId || getYouTubeId(content.url);

  useEffect(() => {
    setIsLoading(true);
    setUseFallback(false);
  }, [content.url]);

  if (useFallback || !youtubeId) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-8">
        <div className="text-center max-w-md">
          <FontAwesomeIcon icon={faExclamationTriangle} className="h-16 w-16 text-amber-500 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Video Content</h3>
          <p className="text-gray-600 mb-4 text-center">
            Unable to load embedded video. This may be due to YouTube restrictions. 
            Please watch directly on YouTube.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild variant="outline">
              <a 
                href={content.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faExternalLink} className="h-4 w-4" />
                <span>Watch on YouTube</span>
              </a>
            </Button>
            <Button 
              onClick={() => {
                setUseFallback(false);
                setIsLoading(true);
              }}
              variant="secondary"
            >
              <FontAwesomeIcon icon={faRefresh} className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading video...</p>
          </div>
        </div>
      )}
      <iframe
        width="100%"
        height="100%"
        src={getYouTubeEmbedUrl(youtubeId)}
        title={content.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="w-full h-full"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setUseFallback(true);
        }}
        style={{ opacity: isLoading ? 0 : 1 }}
      />
    </div>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [similarCourses, setSimilarCourses] = useState<CourseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<{
    title: string;
    type: string;
    url: string;
    youtubeId?: string;
    currentSlideIndex: number;
    totalSlides: number;
    contentId: number;
    slides: Slide[];
  } | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const token = localStorage.getItem("zse_training_token");

  // Check authentication on component mount
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token, navigate]);

  // Fetch course data from API
  useEffect(() => {
    const fetchCourseData = async () => {
      // Check authentication before making API call
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        setLoading(true);
        
        // Fetch course details
        const courseData = await courseService.getCourseById(id!) as unknown as CourseDetail;
        setCourse(courseData);

        // Fetch similar courses
        try {
          const similar = await courseService.getSimilarCourses(id!);
          setSimilarCourses(similar);
        } catch (err) {
          console.error("Error fetching similar courses:", err);
          // Don't fail the whole page if similar courses fail
        }
      } catch (err) {
        if (err instanceof Error && err.message.includes("401")) {
          localStorage.removeItem("zse_training_token");
          navigate("/login");
          return;
        }
        setError(err instanceof Error ? err.message : "Failed to fetch course");
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchCourseData();
    }
  }, [id, token, navigate]);

  const handleContentClick = (slide: Slide, contentIndex: number, slideIndex: number) => {
    // Check authentication before allowing content access
    if (!token) {
      navigate("/login");
      return;
    }

    const content = course?.contents[contentIndex];
    if (!content) return;

    setSlideDirection('right');
    
    if (slide.type === "video") {
      const youtubeId = getYouTubeId(slide.url);
      setCurrentContent({
        title: slide.title,
        type: slide.type,
        url: slide.url,
        youtubeId: youtubeId || undefined,
        currentSlideIndex: slideIndex,
        totalSlides: content.slides.length,
        contentId: content.id,
        slides: content.slides,
      });
    } else if (slide.type === "ppt") {
      setCurrentContent({
        title: slide.title,
        type: slide.type,
        url: slide.url,
        currentSlideIndex: slideIndex,
        totalSlides: content.slides.length,
        contentId: content.id,
        slides: content.slides,
      });
    }
  };

  const closeContentModal = () => {
    setCurrentContent(null);
  };

  const navigateToSlide = (newIndex: number) => {
    if (!currentContent) return;

    // Determine slide direction for animation
    setSlideDirection(newIndex > currentContent.currentSlideIndex ? 'right' : 'left');
    
    setTimeout(() => {
      const newSlide = currentContent.slides[newIndex];
      if (newSlide.type === "video") {
        const youtubeId = getYouTubeId(newSlide.url);
        setCurrentContent(prev => prev ? {
          ...prev,
          title: newSlide.title,
          type: newSlide.type,
          url: newSlide.url,
          youtubeId: youtubeId || undefined,
          currentSlideIndex: newIndex,
        } : null);
      } else if (newSlide.type === "ppt") {
        setCurrentContent(prev => prev ? {
          ...prev,
          title: newSlide.title,
          type: newSlide.type,
          url: newSlide.url,
          currentSlideIndex: newIndex,
        } : null);
      }
    }, 50);
  };

  const navigateToNextSlide = () => {
    if (!currentContent) return;
    const nextIndex = currentContent.currentSlideIndex + 1;
    if (nextIndex < currentContent.totalSlides) {
      navigateToSlide(nextIndex);
    }
  };

  const navigateToPreviousSlide = () => {
    if (!currentContent) return;
    const prevIndex = currentContent.currentSlideIndex - 1;
    if (prevIndex >= 0) {
      navigateToSlide(prevIndex);
    }
  };

  const handleFinishContent = () => {
    // Here you would typically mark the content as completed in your backend
    console.log(`Finished content ${currentContent?.contentId}`);
    closeContentModal();
  };

  // Extract YouTube ID from URL
  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;

    const cleanUrl = url
      .replace(/\?si=.*$/, '')
      .replace(/&t=.*$/, '')
      .split('&')[0];

    const patterns = [
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/,
      /youtube\.com\/watch\?v=([^"&?\/\s]{11})/,
      /youtu\.be\/([^"&?\/\s]{11})/,
    ];

    for (const pattern of patterns) {
      const match = cleanUrl.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return null;
  };

  // Check if URL is a PowerPoint file
  const isPowerPointUrl = (url: string): boolean => {
    return url.toLowerCase().includes('.ppt') || url.toLowerCase().includes('.pptx');
  };

  // Get embed URL for PowerPoint
  const getPowerPointEmbedUrl = (url: string): string => {
    // For Google Drive PowerPoint files
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/d\/([^\/]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    // For direct PowerPoint URLs, we'll use Google Docs viewer as fallback
    return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;
  };

  // Get sample videos from course content
  const getSampleVideos = (): {
    title: string;
    duration: string;
    youtubeId: string;
  }[] => {
    if (!course) return [];

    const videos: { title: string; duration: string; youtubeId: string }[] = [];

    course.contents.forEach((content) => {
      content.slides.forEach((slide) => {
        if (slide.type === "video" && slide.url) {
          const youtubeId = getYouTubeId(slide.url);
          if (youtubeId) {
            videos.push({
              title: slide.title,
              duration: "05:00",
              youtubeId: youtubeId,
            });
          }
        }
      });
    });

    return videos.slice(0, 3);
  };

  // Calculate total lessons count
  const getTotalLessons = (): number => {
    if (!course) return 0;
    return course.contents.reduce(
      (total, content) => total + content.slides.length,
      0
    );
  };

  // Format price
  const formatPrice = (price: string): string => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Custom Slides Controller Component
  const SlidesController = () => {
    if (!currentContent) return null;

    const isFirstSlide = currentContent.currentSlideIndex === 0;
    const isLastSlide = currentContent.currentSlideIndex === currentContent.totalSlides - 1;
    const progressPercentage = ((currentContent.currentSlideIndex + 1) / currentContent.totalSlides) * 100;

    return (
      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">
              Slide {currentContent.currentSlideIndex + 1} of {currentContent.totalSlides}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Progress Bar */}
            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={navigateToPreviousSlide}
                disabled={isFirstSlide}
                className="h-8 w-8 p-0"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={navigateToNextSlide}
                disabled={isLastSlide}
                className="h-8 w-8 p-0"
              >
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
              </Button>

              {isLastSlide ? (
                <Button
                  onClick={handleFinishContent}
                  size="sm"
                  className="h-8 bg-green-600 hover:bg-green-700"
                >
                  <FontAwesomeIcon icon={faCheck} className="h-3 w-3 mr-1" />
                  Finish
                </Button>
              ) : (
                <Button
                  onClick={navigateToNextSlide}
                  size="sm"
                  className="h-8"
                  disabled={isLastSlide}
                >
                  <FontAwesomeIcon icon={faForward} className="h-3 w-3 mr-1" />
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Slide Navigation Dots */}
        <div className="flex justify-center space-x-2">
          {currentContent.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentContent.currentSlideIndex
                  ? 'bg-primary scale-125'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              title={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Render content in modal based on type
  const renderContentModal = () => {
    if (!currentContent) return null;

    const slideAnimationClass = slideDirection === 'right' 
      ? 'animate-slide-in-right' 
      : 'animate-slide-in-left';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl aspect-video relative flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b bg-white">
            <div className="flex items-center space-x-4">
              <button
                onClick={closeContentModal}
                className="text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
              </button>
              <div>
                <h3 className="font-semibold text-lg">{currentContent.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Badge variant="outline" className="text-xs capitalize">
                    {currentContent.type}
                  </Badge>
                  <span>Module Content</span>
                </div>
              </div>
            </div>
            
            {/* Quick Navigation */}
            <div className="flex items-center space-x-2">
              <select
                value={currentContent.currentSlideIndex}
                onChange={(e) => navigateToSlide(parseInt(e.target.value))}
                className="text-sm border rounded px-2 py-1 bg-white"
              >
                {currentContent.slides.map((slide, index) => (
                  <option key={index} value={index}>
                    Slide {index + 1}: {slide.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Content Area with Animation */}
          <div className="flex-1 relative bg-gray-900">
            <div className={`w-full h-full ${slideAnimationClass}`}>
              {currentContent.type === "video" ? (
                <VideoContentPlayer content={currentContent} />
              ) : currentContent.type === "ppt" ? (
                <iframe
                  width="100%"
                  height="100%"
                  src={getPowerPointEmbedUrl(currentContent.url)}
                  title={currentContent.title}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <div className="text-center">
                    <FontAwesomeIcon icon={faFileAlt} className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-lg font-semibold">Unsupported Content Type</p>
                    <p className="text-gray-600 mt-2">
                      <a 
                        href={currentContent.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Click here to view the content
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Custom Slides Controller */}
            <SlidesController />
          </div>

          {/* Keyboard Shortcuts Info */}
          <div className="absolute top-4 right-4 bg-black/70 text-white text-xs p-2 rounded opacity-0 hover:opacity-100 transition-opacity">
            <div>← Previous Slide</div>
            <div>→ Next Slide</div>
            <div>ESC Close</div>
          </div>
        </div>
      </div>
    );
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!currentContent) return;

      switch (e.key) {
        case 'ArrowLeft':
          navigateToPreviousSlide();
          break;
        case 'ArrowRight':
          navigateToNextSlide();
          break;
        case 'Escape':
          closeContentModal();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentContent]);

  // Show loading state while checking authentication
  if (!token) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Redirecting to login...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading course...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-destructive">Error</h2>
            <p className="mt-2 text-muted-foreground">
              {error || "Course not found"}
            </p>
            <Button asChild className="mt-4">
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const sampleVideos = getSampleVideos();
  const totalLessons = getTotalLessons();

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar />

      {/* Content Modal */}
      {renderContentModal()}

      {/* Breadcrumb */}
      <div className="bg-muted/40 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-primary transition-colors">
              All courses
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
            <span className="text-foreground font-medium">
              {course.category.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Course Header */}
      <section className="py-8 lg:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 border-emerald-200"
                  >
                    {course.is_enrolled ? "Enrolled" : "Available"}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary"
                  >
                    {course.level}
                  </Badge>
                  <Badge variant="outline" className="text-accent-foreground">
                    {course.category.name}
                  </Badge>
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold text-left leading-tight">
                  {course.title}
                </h1>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  {course.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-left">
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-primary">4.7</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      (2850 ratings)
                    </span>
                  </div>
                  <div className="text-muted-foreground">12,453 students</div>
                  <div className="text-muted-foreground text-sm">
                    Last updated{" "}
                    {new Date(course.updated_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="pt-4">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/50 p-1">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-background flex items-center justify-center"
                    >
                      <BookOpen className="h-5 w-5 sm:hidden" />
                      <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>

                    <TabsTrigger
                      value="content"
                      className="data-[state=active]:bg-background flex items-center justify-center"
                    >
                      <FontAwesomeIcon
                        icon={faList}
                        className="h-5 w-5 sm:hidden"
                      />
                      <span className="hidden sm:inline">Course Content</span>
                    </TabsTrigger>

                    <TabsTrigger
                      value="instructor"
                      className="data-[state=active]:bg-background flex items-center justify-center"
                    >
                      <FontAwesomeIcon
                        icon={faUser}
                        className="h-5 w-5 sm:hidden"
                      />
                      <span className="hidden sm:inline">Instructor</span>
                    </TabsTrigger>

                    <TabsTrigger
                      value="reviews"
                      className="data-[state=active]:bg-background flex items-center justify-center"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className="h-5 w-5 sm:hidden"
                      />
                      <span className="hidden sm:inline">Reviews</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-8">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-bold flex items-center text-left">
                          <FontAwesomeIcon
                            icon={faUsers}
                            className="h-5 w-5 mr-2 text-primary"
                          />
                          Who this course is for
                        </h2>
                        <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                          <li>
                            Beginner investors looking to start their journey
                          </li>
                          <li>
                            Experienced professionals wanting to expand their
                            knowledge
                          </li>
                          <li>
                            Students seeking practical knowledge in this field
                          </li>
                          <li>
                            Anyone interested in learning about {course.title}
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold flex items-center text-left mb-4">
                          <FontAwesomeIcon
                            icon={faAward}
                            className="h-5 w-5 mr-2 text-primary"
                          />
                          Course Requirements
                        </h2>
                        <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                          <li>
                            Basic understanding of the subject (helpful but not
                            required)
                          </li>
                          <li>Access to a computer with internet connection</li>
                          <li>
                            Interest in learning and applying new concepts
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="text-center p-4">
                        <div className="text-2xl font-bold text-primary">
                          {totalLessons}+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Lessons
                        </div>
                      </Card>
                      <Card className="text-center p-4">
                        <div className="text-2xl font-bold text-primary">
                          {course.contents.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Modules
                        </div>
                      </Card>
                      <Card className="text-center p-4">
                        <div className="text-2xl font-bold text-primary">
                          12.4K+
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Students
                        </div>
                      </Card>
                      <Card className="text-center p-4">
                        <div className="text-2xl font-bold text-primary">
                          100%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Practical
                        </div>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* Course Content Tab */}
                  <TabsContent value="content">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-bold text-left">
                            Course Content
                          </h2>
                          <div className="text-sm text-muted-foreground">
                            {course.contents.length} modules • {totalLessons}{" "}
                            lessons
                          </div>
                        </div>

                        <div className="space-y-4">
                          {course.contents.map((content, contentIndex) => (
                            <div
                              key={content.id}
                              className="border rounded-lg overflow-hidden"
                            >
                              <div className="bg-muted/50 p-4 font-medium flex items-center justify-between">
                                <div className="flex items-center">
                                  <FontAwesomeIcon
                                    icon={faChevronRight}
                                    className="h-5 w-5 mr-2 transition-transform"
                                  />
                                  <span>{content.title}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {content.slides.length} lessons
                                </div>
                              </div>

                              <div className="divide-y">
                                {content.slides.map((slide, slideIndex) => (
                                  <div
                                    key={slide.id}
                                    className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors"
                                    onClick={() => handleContentClick(slide, contentIndex, slideIndex)}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <div className={`p-2 rounded ${
                                        slide.type === "video" 
                                          ? "bg-blue-100 text-blue-600" 
                                          : "bg-purple-100 text-purple-600"
                                      }`}>
                                        <FontAwesomeIcon
                                          icon={
                                            slide.type === "video"
                                              ? faPlay
                                              : faFileAlt
                                          }
                                          className="h-4 w-4"
                                        />
                                      </div>
                                      <div>
                                        <span className="text-sm font-medium">
                                          {slide.title}
                                        </span>
                                        <div className="flex items-center space-x-2 mt-1">
                                          <Badge 
                                            variant="outline" 
                                            className={`text-xs ${
                                              slide.type === "video" 
                                                ? "border-blue-200 text-blue-700" 
                                                : "border-purple-200 text-purple-700"
                                            }`}
                                          >
                                            {slide.type === "video" ? "Video" : "Presentation"}
                                          </Badge>
                                          {slide.type === "video" && getYouTubeId(slide.url) && (
                                            <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 border-red-200">
                                              YouTube
                                            </Badge>
                                          )}
                                          {slide.type === "ppt" && isPowerPointUrl(slide.url) && (
                                            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-200">
                                              PowerPoint
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Click to view
                                    </div>
                                  </div>
                                ))}
                                {content.slides.length === 0 && (
                                  <div className="p-4 text-center text-muted-foreground text-sm">
                                    No content available yet
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Instructor Tab */}
                  <TabsContent value="instructor">
                    <Card>
                      <CardContent className="p-6 space-y-6">
                        <h2 className="text-xl font-bold mb-6 text-left">
                          About the Instructor
                        </h2>
                        <div className="flex items-start space-x-6 text-left">
                          <Avatar className="h-20 w-20 flex-shrink-0">
                            <AvatarFallback>IN</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">
                              Instructor
                            </h3>
                            <p className="text-muted-foreground">
                              Course Expert
                            </p>
                            <div className="flex items-center mt-2 space-x-4 text-sm">
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faStar}
                                  className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1"
                                />
                                <span>4.7 Instructor Rating</span>
                              </div>
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faUsers}
                                  className="h-4 w-4 text-muted-foreground mr-1"
                                />
                                <span>12,453 Students</span>
                              </div>
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faFileAlt}
                                  className="h-4 w-4 text-muted-foreground mr-1"
                                />
                                <span>Multiple Courses</span>
                              </div>
                            </div>
                            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                              <p>
                                Experienced instructor with deep knowledge in
                                this field. Passionate about sharing knowledge
                                and helping students achieve their learning
                                goals.
                              </p>
                              <p>
                                Dedicated to providing high-quality educational
                                content and practical learning experiences.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Reviews Tab */}
                  <TabsContent value="reviews">
                    <Card>
                      <CardContent className="p-6 space-y-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-xl font-bold flex items-center text-left">
                              <FontAwesomeIcon
                                icon={faStar}
                                className="h-5 w-5 mr-2 text-primary"
                              />
                              Student Reviews
                            </h2>
                            <div className="flex items-center mt-2">
                              <span className="text-3xl font-bold mr-2">
                                4.7
                              </span>
                              <div>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                      key={i}
                                      icon={faStar}
                                      className={`h-5 w-5 ${
                                        i < 4
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted-foreground/30"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Course Rating • 2,850 reviews
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">
                              Review this course
                            </h3>
                            <Button variant="outline" size="sm">
                              Add a review
                            </Button>
                          </div>
                        </div>

                        {/* Sample Reviews */}
                        <div className="space-y-6">
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src="https://i.pravatar.cc/50?img=1" />
                              <AvatarFallback>TM</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold">
                                  Tinashe Marimo
                                </span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                      key={i}
                                      icon={faStar}
                                      className={`h-4 w-4 ${
                                        i < 5
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted-foreground/30"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                2 weeks ago
                              </p>
                              <p className="text-sm">
                                This course completely changed my approach. The
                                modules helped me understand complex concepts
                                easily.
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Similar Courses Section */}
                <SimilarCoursesSection courses={similarCourses} />
              </div>
            </div>

            {/* Right Sidebar - Course Card */}
            <div className="lg:col-span-1">
              <CourseSidebarCard
                thumbnailUrl={course.thumbnail_url}
                title={course.title}
                price={course.price}
                isEnrolled={course.is_enrolled}
                totalLessons={totalLessons}
                modulesCount={course.contents.length}
                hasSampleVideos={sampleVideos.length > 0}
                onPreviewClick={() => {
                  if (sampleVideos.length > 0) {
                    const firstVideo = sampleVideos[0];
                    let foundSlide: Slide | null = null;
                    let contentIndex = -1;
                    let slideIndex = -1;

                    course.contents.forEach((content, cIndex) => {
                      content.slides.forEach((slide, sIndex) => {
                        if (slide.type === "video" && getYouTubeId(slide.url) === firstVideo.youtubeId) {
                          foundSlide = slide;
                          contentIndex = cIndex;
                          slideIndex = sIndex;
                        }
                      });
                    });

                    if (foundSlide) {
                      handleContentClick(foundSlide, contentIndex, slideIndex);
                    }
                  }
                }}
                onWishlistClick={() => setIsWishlisted(!isWishlisted)}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;