import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faChevronRight, 
  faBookOpen, 
  faList, 
  faChalkboardTeacher, 
  faStar, 
  faFileAlt 
} from "@fortawesome/free-solid-svg-icons";
import { Star } from "lucide-react";
import { courseService, Course as CourseType } from "@/services/course.service";
import { SimilarCoursesSection } from "@/components/course/SimilarCoursesSection";
import { CourseSidebarCard } from "@/components/course/CourseSidebarCard";
import { CourseContentModal } from "@/components/course/CourseContentModal";
import { QuizzesSection } from "@/components/course/quiz/QuizzesSection";
import { CourseOverviewTab } from "@/components/course/tabs/CourseOverviewTab";
import { CourseContentTab } from "@/components/course/tabs/CourseContentTab";
import { CourseInstructorTab } from "@/components/course/tabs/CourseInstructorTab";
import { CourseReviewsTab } from "@/components/course/tabs/CourseReviewsTab";

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

const CourseDetail = () => {
  const { id } = useParams();
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

  useEffect(() => {
    if (id) {
      loadCourseData(id);
    }
  }, [id]);

  const loadCourseData = async (courseId: string) => {
    try {
      setLoading(true);
      setError(null);

      const [courseData, similarCoursesData] = await Promise.all([
        courseService.getCourseById(courseId),
        courseService.getSimilarCourses(courseId),
      ]);

      setCourse(courseData as CourseDetail);
      setSimilarCourses(similarCoursesData);
    } catch (err) {
      console.error("Error loading course:", err);
      setError("Failed to load course details");
    } finally {
      setLoading(false);
    }
  };

  const handleEnrollNow = async () => {
    if (!course) return;

    try {
      await courseService.enrollInCourse(course.id);
      alert("Successfully enrolled in the course!");
      if (id) {
        loadCourseData(id);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
      alert("Failed to enroll in course");
    }
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleContentClick = (content: Content, slide: Slide, slideIndex: number) => {
    const youtubeId = slide.type === "video" ? getYouTubeId(slide.url) : undefined;

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
  };

  const closeContentModal = () => {
    setCurrentContent(null);
  };

  const navigateToSlide = (newIndex: number) => {
    if (!currentContent) return;

    const newSlide = currentContent.slides[newIndex];
    const youtubeId = newSlide.type === "video" ? getYouTubeId(newSlide.url) : undefined;

    setCurrentContent((prev) =>
      prev
        ? {
            ...prev,
            title: newSlide.title,
            type: newSlide.type,
            url: newSlide.url,
            youtubeId: youtubeId || undefined,
            currentSlideIndex: newIndex,
          }
        : null
    );
  };

  const handleFinishContent = () => {
    console.log(`Finished content ${currentContent?.contentId}`);
    closeContentModal();
  };

  const getYouTubeId = (url: string): string | null => {
    if (!url) return null;

    const cleanUrl = url
      .replace(/\?si=.*$/, "")
      .replace(/&t=.*$/, "")
      .split("&")[0];

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

  const getTotalLessons = (): number => {
    if (!course) return 0;
    return course.contents.reduce((total, content) => total + content.slides.length, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
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
            <p className="mt-2 text-muted-foreground">{error || "Course not found"}</p>
            <Button asChild className="mt-4">
              <Link to="/courses">Back to Courses</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalLessons = getTotalLessons();

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar />

      {currentContent && (
        <CourseContentModal
          content={currentContent}
          onClose={closeContentModal}
          onNavigateSlide={navigateToSlide}
          onFinish={handleFinishContent}
        />
      )}

      <div className="bg-muted/40 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-primary transition-colors">
              All courses
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
            <span className="text-foreground font-medium">{course.category.name}</span>
          </nav>
        </div>
      </div>

      <section className="py-8 lg:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-800 border-emerald-200"
                  >
                    {course.is_enrolled ? "Enrolled" : "Available"}
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
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
                    <span className="text-muted-foreground">(2850 ratings)</span>
                  </div>
                  <div className="text-muted-foreground">12,453 students</div>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-5 h-auto p-1 bg-muted/50 rounded-lg">
                  <TabsTrigger 
                    value="overview" 
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <FontAwesomeIcon icon={faBookOpen} className="h-4 w-4 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Overview</span>
                    <span className="sm:hidden text-[10px]">Overview</span>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="content" 
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <FontAwesomeIcon icon={faList} className="h-4 w-4 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Content</span>
                    <span className="sm:hidden text-[10px]">Content</span>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="instructor" 
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="h-4 w-4 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Instructor</span>
                    <span className="sm:hidden text-[10px]">Teacher</span>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="reviews" 
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <FontAwesomeIcon icon={faStar} className="h-4 w-4 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Reviews</span>
                    <span className="sm:hidden text-[10px]">Reviews</span>
                  </TabsTrigger>
                  
                  <TabsTrigger 
                    value="quizzes" 
                    className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 data-[state=active]:bg-background data-[state=active]:shadow-sm"
                  >
                    <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">Quizzes</span>
                    <span className="sm:hidden text-[10px]">Quizzes</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <CourseOverviewTab totalLessons={totalLessons} modulesCount={course.contents.length} />
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                  <CourseContentTab
                    contents={course.contents}
                    totalLessons={totalLessons}
                    onContentClick={handleContentClick}
                  />
                </TabsContent>

                <TabsContent value="instructor" className="mt-6">
                  <CourseInstructorTab instructor={course.instructor} />
                </TabsContent>

                <TabsContent value="reviews" className="mt-6">
                  <CourseReviewsTab />
                </TabsContent>

                <TabsContent value="quizzes" className="mt-6">
                  {id && <QuizzesSection courseId={id} />}
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <CourseSidebarCard
                thumbnailUrl={course.thumbnail_url || course.thumbnail || "/placeholder.svg"}
                title={course.title}
                price={course.price}
                isEnrolled={course.is_enrolled}
                totalLessons={totalLessons}
                modulesCount={course.contents.length}
                onEnrollClick={handleEnrollNow}
                onWishlistClick={handleAddToWishlist}
                hasSampleVideos={totalLessons > 0}
              />
            </div>
          </div>

          <SimilarCoursesSection courses={similarCourses} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;