// ✨ FULL FIXED CourseDetail.tsx

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
  faFileAlt,
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
  is_locked?: boolean;
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

import { useCourse, useSimilarCourses, useEnrollMutation } from "@/hooks/useCourses";
import { useToast } from "@/hooks/use-toast";

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { data: course, isLoading: loading, error: fetchError } = useCourse(id);
  const { data: similarCourses = [] } = useSimilarCourses(id);
  const enrollMutation = useEnrollMutation();
  const { toast } = useToast();

  const [currentContent, setCurrentContent] = useState<{
    title: string;
    type: string;
    url: string;
    youtubeId?: string;
    currentSlideIndex: number;
    totalSlides: number;
    contentId: number;
    slides: Slide[];
    moduleId: number;
    courseId: number;
  } | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleEnrollNow = async () => {
    if (!course) return;

    try {
      await enrollMutation.mutateAsync(course.id);
      toast({
        title: "Success!",
        description: "Successfully enrolled in the course!",
      });
    } catch (error) {
      console.error("Error enrolling in course:", error);
      toast({
        title: "Error",
        description: "Failed to enroll in course",
        variant: "destructive",
      });
    }
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const handleContentClick = (
    content: Content,
    slide: Slide,
    slideIndex: number
  ) => {
    if (slide.is_locked && !course?.is_enrolled) {
      toast({
        title: "Access Restricted",
        description: "Please log in or enroll to unlock this premium lesson slide.",
        variant: "destructive",
      });
      return;
    }

    const youtubeId =
      slide.type === "video" ? getYouTubeId(slide.url) : undefined;

    setCurrentContent({
      title: slide.title,
      type: slide.type,
      url: slide.url,
      youtubeId: youtubeId || undefined,
      currentSlideIndex: slideIndex,
      totalSlides: content.slides.length,
      contentId: content.id,
      slides: content.slides,
      moduleId: content.id,
      courseId: content.course_id,
    });
  };

  const closeContentModal = () => {
    setCurrentContent(null);
  };

  const navigateToSlide = (newIndex: number) => {
    if (!currentContent) return;

    const newSlide = currentContent.slides[newIndex];
    const youtubeId =
      newSlide.type === "video" ? getYouTubeId(newSlide.url) : undefined;

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

  const handleFinishContent = async () => {
    if (!currentContent) return;

    try {
      await courseService.finishModule(
        currentContent.courseId,
        currentContent.moduleId
      );
      closeContentModal();
    } catch (err) {
      console.log("Finish error:", err);
    }
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
    if (!course || !course.contents) return 0;
    return course.contents.reduce(
      (total, content) => total + (content.slides?.length || 0),
      0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-montserrat">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00aeef] mx-auto mb-4"></div>
            <p className="mt-4 text-gray-500">Loading course...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (fetchError || !course) {
    return (
      <div className="min-h-screen bg-white font-montserrat">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Error</h2>
            <p className="mt-2 text-gray-600">
              {fetchError ? "Failed to load course details" : "Course not found"}
            </p>
            <Button asChild className="mt-4 bg-[#00aeef] hover:bg-[#009ad1]">
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
    <div className="min-h-screen bg-white font-montserrat">
      <Navbar />

      {/* Content Modal */}
      {currentContent && (
        <CourseContentModal
          content={currentContent}
          onClose={closeContentModal}
          onNavigateSlide={navigateToSlide}
          onFinish={handleFinishContent}
        />
      )}

      {/* Udemy Header Section */}
      <section className="bg-[#1c1d1f] text-white py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 relative">
            {/* Left Content Column */}
            <div className="lg:col-span-2 space-y-4">
              {/* Breadcrumb - White on Dark */}
              <nav className="flex items-center space-x-2 text-sm text-[#cec0fc] font-bold">
                <Link to="/courses" className="hover:underline">
                  Courses
                </Link>
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
                <span className="text-[#cec0fc]">
                  {course.category?.name || "Topic"}
                </span>
              </nav>

              <h1 className="text-3xl lg:text-4xl font-bold text-left leading-tight">
                {course.title}
              </h1>

              <p className="text-lg leading-relaxed text-gray-200">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-left">
                <div className="flex items-center space-x-1">
                  <span className="font-bold text-[#f3ca8c]">4.7</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4
                            ? "fill-[#f3ca8c] text-[#f3ca8c]"
                            : "text-gray-600"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#cec0fc] hover:underline cursor-pointer">
                    (2,850 ratings)
                  </span>
                </div>
                <div className="text-sm">12,453 students</div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                <div>
                  Created by <span className="text-[#cec0fc] hover:underline cursor-pointer">{course.instructor?.name || "ZSE Academy"}</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2 h-3.5 w-3.5" />
                  Last updated {new Date(course.updated_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Sidebar Card - Only shows on desktop/tablet nicely */}
            <div className="hidden lg:block absolute right-0 top-0 translate-y-[-20px] z-50">
              <CourseSidebarCard
                thumbnailUrl={
                  course.thumbnail_url || course.thumbnail || "/placeholder.svg"
                }
                title={course.title}
                isEnrolled={course.is_enrolled}
                totalLessons={totalLessons}
                modulesCount={course.contents?.length || 0}
                onEnrollClick={handleEnrollNow}
                onWishlistClick={handleAddToWishlist}
                hasSampleVideos={totalLessons > 0}
              />
            </div>

            {/* Mobile Sidebar Card - Simplified */}
            <div className="lg:hidden">
              <img
                src={course.thumbnail_url || course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-full aspect-video object-cover border border-white/20 mb-4"
              />
              <div className="flex flex-col gap-3">
                {course.is_enrolled ? (
                  <Button className="w-full rounded-none h-12 bg-white text-black hover:bg-gray-100 font-bold" asChild>
                    <Link to={`/learn/${course.id}`}>Go to course</Link>
                  </Button>
                ) : (
                  <Button onClick={handleEnrollNow} className="w-full rounded-none h-12 bg-[#00aeef] hover:bg-[#009ad1] text-white font-bold">
                    Enroll Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-8 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              {/* Udemy Styled Tabs - Sticky or Flat */}
              <div className="border-b border-gray-200">
                <div className="flex overflow-x-auto space-x-8 no-scrollbar">
                  {["overview", "content", "instructor", "reviews", "quizzes"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-3 text-sm font-bold border-b-2 transition-all whitespace-nowrap capitalize ${activeTab === tab
                          ? "border-black text-black"
                          : "border-transparent text-gray-500 hover:text-black"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 transition-all duration-300">
                {activeTab === "overview" && (
                  <CourseOverviewTab
                    totalLessons={totalLessons}
                    modulesCount={course.contents?.length || 0}
                    description={course.description}
                  />
                )}
                {activeTab === "content" && (
                  <CourseContentTab
                    contents={course.contents}
                    totalLessons={totalLessons}
                    onContentClick={handleContentClick}
                    isEnrolled={course.is_enrolled}
                  />
                )}
                {activeTab === "instructor" && (
                  <CourseInstructorTab instructor={course.instructor} />
                )}
                {activeTab === "reviews" && id && (
                  <CourseReviewsTab courseId={id} />
                )}
                {activeTab === "quizzes" && id && (
                  <QuizzesSection courseId={id} />
                )}
              </div>

              {/* Similar Courses Section - Standard Udemy Bottom grid */}
              <div className="pt-12 border-t border-gray-200">
                <SimilarCoursesSection courses={similarCourses} />
              </div>
            </div>

            {/* Empty space for the sticky card overflow */}
            <div className="hidden lg:block lg:col-span-1"></div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;
