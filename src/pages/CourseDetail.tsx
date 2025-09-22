import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  Clock,
  Users,
  Play,
  CheckCircle,
  Globe,
  Award,
  FileText,
  BookOpen,
  Download,
  ChevronRight,
  Heart,
  BarChart3,
  Code,
  Terminal,
  Sparkles,
  Calendar,
  X,
  TrendingUp,
  Building,
  Banknote,
  ChartNoAxesCombined,
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Zimbabwe Stock Exchange: Complete Trading & Investment Course",
    description:
      "Master stock market trading on the Zimbabwe Stock Exchange. Learn fundamental and technical analysis, portfolio management, and trading strategies tailored to the Zimbabwean market.",
    instructor: "Tendai Moyo",
    instructorTitle: "Chief Analyst at Harare Capital Markets",
    instructorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    duration: "8 weeks",
    students: 12453,
    rating: 4.7,
    reviewCount: 2850,
    level: "Beginner to Advanced",
    originalPrice: "$199.99",
    price: "$149.99",
    discount: "25% off",
    category: "Finance & Trading",
    language: "English",
    certificate: true,
    projects: 15,
    articles: 42,
    downloadableResources: 65,
    lastUpdated: "10/2024",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    // Add sample videos for the course preview with YouTube IDs
    sampleVideos: [
      {
        title: "Introduction to Zimbabwe Stock Exchange",
        duration: "04:15",
        youtubeId: "lc0upwOb7q4"
      },
      {
        title: "Understanding ZSE Listed Companies",
        duration: "05:32",
        youtubeId: "lc0upwOb7q4"
      },
      {
        title: "Trading Strategies for Zimbabwean Market",
        duration: "06:45",
        youtubeId: "lc0upwOb7q4"
      }
    ],
    learningPoints: [
      "Master ZSE trading mechanisms and market structure",
      "Analyze Zimbabwean companies using fundamental analysis",
      "Develop technical trading strategies for ZSE",
      "Build a diversified portfolio for the Zimbabwean market",
      "Understand regulatory framework and compliance requirements",
    ],
    modules: [
      {
        title: "Module 1: Introduction to Zimbabwe Stock Exchange",
        lessons: [
          { title: "History and evolution of ZSE", duration: "25m" },
          { title: "Market structure and key participants", duration: "30m" },
          { title: "Understanding the ZSE All-Share Index", duration: "35m" },
        ],
      },
      {
        title: "Module 2: Fundamental Analysis of ZSE Listed Companies",
        lessons: [
          { title: "Economic analysis for Zimbabwe context", duration: "40m" },
          { title: "Industry analysis techniques", duration: "35m" },
          { title: "Company financial statement analysis", duration: "45m" },
        ],
      },
      {
        title: "Module 3: Technical Analysis for ZSE Trading",
        lessons: [
          { title: "Chart patterns and trends specific to ZSE", duration: "40m" },
          { title: "Technical indicators for Zimbabwean stocks", duration: "35m" },
          { title: "Volume analysis and market sentiment", duration: "30m" },
        ],
      },
      {
        title: "Module 4: Trading Strategies & Portfolio Management",
        lessons: [
          { title: "Developing a ZSE trading plan", duration: "35m" },
          { title: "Risk management for volatile markets", duration: "40m" },
          { title: "Building a balanced portfolio on ZSE", duration: "45m" },
        ],
      },
    ],
  },
];

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<{title: string, youtubeId: string} | null>(null);

  const course = courses.find((c) => c.id === parseInt(id || "1"));
  if (!course) return <div>Course not found</div>;

  const handleLessonClick = (moduleTitle: string, lessonTitle: string) => {
    alert(`Clicked: ${moduleTitle} - ${lessonTitle}`);
  };

  const handleVideoClick = (video: {title: string, youtubeId: string}) => {
    setCurrentVideo(video);
  };

  const closeVideoModal = () => {
    setCurrentVideo(null);
  };

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar />

      {/* Video Modal */}
      {currentVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-black rounded-lg w-full max-w-4xl aspect-video relative">
            <button 
              onClick={closeVideoModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 z-10"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="w-full h-full rounded-lg overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h3 className="font-semibold">{currentVideo.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="bg-muted/40 py-3">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-primary transition-colors">
              All courses
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/courses/finance" className="hover:text-primary transition-colors">
              Finance & Trading
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Stock Exchange</span>
          </nav>
        </div>
      </div>

      {/* Course Header - Inspired by Udemy's layout */}
      <section className="py-8 lg:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200">
                    Bestseller
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {course.level}
                  </Badge>
                  <Badge variant="outline" className="text-accent-foreground">
                    {course.category}
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
                    <span className="font-bold text-primary">{course.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(course.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      ({course.reviewCount.toLocaleString()} ratings)
                    </span>
                  </div>
                  <div className="text-muted-foreground">
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Last updated {course.lastUpdated}
                  </div>
                </div>
              </div>

              

             

              {/* Tabs Section */}
              <div className="pt-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted/50 p-1">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-background">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="content" className="data-[state=active]:bg-background">
                      Course Content
                    </TabsTrigger>
                    <TabsTrigger value="instructor" className="data-[state=active]:bg-background">
                      Instructor
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="data-[state=active]:bg-background">
                      Reviews
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview" className="space-y-8">
                    <Card>
                      <CardContent className="p-6 space-y-4">
                        <h2 className="text-xl font-bold flex items-center text-left">
                          <Users className="h-5 w-5 mr-2 text-primary" />
                          Who this course is for
                        </h2>
                        <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                          <li>Beginner investors looking to start trading on the Zimbabwe Stock Exchange</li>
                          <li>Experienced traders wanting to expand their knowledge of the ZSE</li>
                          <li>Finance students seeking practical knowledge of the Zimbabwean market</li>
                          <li>Professionals in financial services targeting Zimbabwean markets</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-bold flex items-center text-left mb-4">
                          <Award className="h-5 w-5 mr-2 text-primary" />
                          Course Requirements
                        </h2>
                        <ul className="list-disc pl-6 text-sm space-y-2 text-muted-foreground">
                          <li>Basic understanding of financial concepts (helpful but not required)</li>
                          <li>Access to a computer with internet connection</li>
                          <li>Interest in learning about the Zimbabwe Stock Exchange and investment strategies</li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="text-center p-4">
                        <div className="text-2xl font-bold text-primary">{course.projects}+</div>
                        <div className="text-sm text-muted-foreground">Practical Exercises</div>
                      </Card>
                      <Card className="text-center p-4">
                        <div className="text-2xl font-bold text-primary">{course.duration}</div>
                        <div className="text-sm text-muted-foreground">Duration</div>
                      </Card>
                      <Card className="text-center p-4">
                        <div className="text-2xl font-bold text-primary">{course.students.toLocaleString().slice(0, -3)}K+</div>
                        <div className="text-sm text-muted-foreground">Students</div>
                      </Card>
                      <Card className="text-center p-4">
                        <div className="text-2xl font-bold text-primary">100%</div>
                        <div className="text-sm text-muted-foreground">Practical</div>
                      </Card>
                    </div>

                    
                  </TabsContent>

                  {/* Course Content Tab */}
                  <TabsContent value="content">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-xl font-bold text-left">Course Content</h2>
                          <div className="text-sm text-muted-foreground">
                            {course.modules.length} modules • {course.modules.reduce((acc, module) => acc + module.lessons.length, 0)} lessons • {course.duration}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          {course.modules.map((module, modIndex) => (
                            <div key={modIndex} className="border rounded-lg overflow-hidden">
                              <div className="bg-muted/50 p-4 font-medium flex items-center justify-between">
                                <div className="flex items-center">
                                  <ChevronRight className="h-5 w-5 mr-2 transition-transform" />
                                  <span>{module.title}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {module.lessons.length} lessons •{" "}
                                  {module.lessons.reduce((total, lesson) => {
                                    const mins = parseInt(lesson.duration);
                                    return total + (isNaN(mins) ? 0 : mins);
                                  }, 0)}m
                                </div>
                              </div>
                              
                              <div className="divide-y">
                                {module.lessons.map((lesson, lesIndex) => (
                                  <div 
                                    key={lesIndex} 
                                    className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors"
                                    onClick={() => handleLessonClick(module.title, lesson.title)}
                                  >
                                    <div className="flex items-center">
                                      <Play className="h-4 w-4 mr-3 text-muted-foreground" />
                                      <span className="text-sm">{lesson.title}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">{lesson.duration}</div>
                                  </div>
                                ))}
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
                        <h2 className="text-xl font-bold mb-6 text-left">About the Instructor</h2>
                        <div className="flex items-start space-x-6 text-left">
                          <Avatar className="h-20 w-20 flex-shrink-0">
                            <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                            <AvatarFallback>
                              {course.instructor.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">{course.instructor}</h3>
                            <p className="text-muted-foreground">{course.instructorTitle}</p>
                            <div className="flex items-center mt-2 space-x-4 text-sm">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>4.7 Instructor Rating</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 text-muted-foreground mr-1" />
                                <span>24,850 Students</span>
                              </div>
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 text-muted-foreground mr-1" />
                                <span>5 Courses</span>
                              </div>
                            </div>
                            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                              <p>Tendai Moyo is a seasoned financial analyst with over 15 years of experience in African markets, specializing in the Zimbabwe Stock Exchange. He has worked with leading financial institutions in Harare and has been a regular commentator on ZBC Business Hour.</p>
                              <p>As Chief Analyst at Harare Capital Markets, Tendai has developed trading strategies that have consistently outperformed the ZSE All-Share Index. His research on market trends in emerging economies has been published in several international finance journals.</p>
                              <p>Tendai is passionate about democratizing financial knowledge and has trained thousands of investors across Zimbabwe. He believes that informed investing is key to wealth creation in emerging markets.</p>
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
                              <Star className="h-5 w-5 mr-2 text-primary" />
                              Student Reviews
                            </h2>
                            <div className="flex items-center mt-2">
                              <span className="text-3xl font-bold mr-2">{course.rating}</span>
                              <div>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-5 w-5 ${
                                        i < Math.floor(course.rating)
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted-foreground/30"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Course Rating • {course.reviewCount.toLocaleString()} reviews
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-muted/50 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Review this course</h3>
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
                                <span className="font-semibold">Tinashe Marimo</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < 5
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted-foreground/30"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">2 weeks ago</p>
                              <p className="text-sm">This course completely changed my approach to investing on the ZSE. The modules on fundamental analysis helped me identify undervalued stocks that have since performed exceptionally well. Tendai's teaching style makes complex concepts easy to understand.</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-4">
                            <Avatar>
                              <AvatarImage src="https://i.pravatar.cc/50?img=2" />
                              <AvatarFallback>NK</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-semibold">Nomsa Kambanje</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < 4
                                          ? "fill-yellow-400 text-yellow-400"
                                          : "text-muted-foreground/30"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">1 month ago</p>
                              <p className="text-sm">As someone new to stock trading, I found this course incredibly valuable. The practical exercises helped me apply what I learned immediately. The section on risk management is particularly helpful for navigating the Zimbabwean market volatility.</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Student Also Bought Section */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold mb-6 text-left">Similar Courses</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-4 flex">
                      <div className="h-16 w-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                        <ChartNoAxesCombined className="h-full w-full p-3 text-muted-foreground" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Advanced Technical Analysis</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium text-primary">$99.99</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">$129.99</span>
                        </div>
                      </div>
                    </Card>
                    
                    <Card className="p-4 flex">
                      <div className="h-16 w-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                        <Banknote className="h-full w-full p-3 text-muted-foreground" />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-semibold">Forex Trading in Zimbabwe</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium text-primary">$89.99</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">$119.99</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                </section>
              </div>
            </div>

            {/* Right Sidebar - Course Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 shadow-lg border-0">
                <div className="relative aspect-video rounded-t-lg overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Button 
                      size="lg" 
                      className="rounded-full h-16 w-16 bg-white/90 hover:bg-white"
                      onClick={() => {
                        if (course.sampleVideos && course.sampleVideos.length > 0) {
                          handleVideoClick(course.sampleVideos[0]);
                        }
                      }}
                    >
                      <Play className="h-6 w-6 ml-1 text-black" />
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
                    Preview
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="text-left">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-primary">{course.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{course.originalPrice}</span>
                      <Badge variant="destructive" className="ml-2">
                        {course.discount}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Limited time offer
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Add to cart
                    </Button>
                    <Button className="w-full" size="lg" variant="outline">
                      Buy now
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                      {isWishlisted ? "Wishlisted" : "Add to wishlist"}
                    </Button>
                  </div>

                  <div className="text-sm text-center text-muted-foreground pt-2">
                    30-Day Money-Back Guarantee
                  </div>

                  <div className="pt-4">
                    <h3 className="font-bold text-left mb-2">This course includes:</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{course.duration} of content</span>
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{course.projects} practical exercises</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{course.articles} articles</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{course.downloadableResources} downloadable resources</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;