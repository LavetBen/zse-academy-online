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
  Heart
} from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Zimbabwe Stock Exchange Fundamentals",
    description: "Complete introduction to ZSE operations, market structure, and basic trading principles. Master the intricacies of creating and implementing trading policies, process management and strategic planning.",
    instructor: "Dr. Sarah Mukamuri",
    instructorTitle: "ZSE Certified Professional",
    instructorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    duration: "8 weeks",
    students: 2340,
    rating: 4.9,
    reviewCount: 2220,
    level: "Beginner",
    originalPrice: "$299",
    price: "$199",
    discount: "33% off!",
    category: "Fundamentals",
    language: "English",
    certificate: true,
    practiceTests: 4,
    articles: 24,
    downloadableResources: 20,
    lastUpdated: "07/2024",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    learningPoints: [
      "Key factors in the development of stock exchange operations and trading as a professional trader",
      "Zimbabwe Stock Exchange fundamentals, the scope of ZSE, processes in trading, and the role of brokers in this framework",
      "Skills required for professional trading with case studies, assignments, and coursework",
      "Risk management strategies and portfolio optimization techniques"
    ]
  },
  {
    id: 2,
    title: "Advanced Technical Analysis",
    description: "Master chart patterns, technical indicators, and advanced trading strategies for ZSE.",
    instructor: "James Chigumba",
    instructorTitle: "Senior Technical Analyst",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    duration: "12 weeks",
    students: 1890,
    rating: 4.8,
    reviewCount: 1567,
    level: "Advanced",
    originalPrice: "$399",
    price: "$299",
    discount: "25% off!",
    category: "Technical Analysis",
    language: "English",
    certificate: true,
    practiceTests: 6,
    articles: 32,
    downloadableResources: 25,
    lastUpdated: "06/2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    learningPoints: [
      "Advanced chart pattern recognition and technical indicator analysis",
      "Professional trading strategies and risk management techniques",
      "Market psychology and behavioral analysis in trading decisions",
      "Automated trading systems and algorithmic strategies"
    ]
  }
];

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const course = courses.find(c => c.id === parseInt(id || "1"));
  
  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-accent/20 py-4">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/courses" className="hover:text-primary transition-colors">All courses</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{course.category}</span>
          </nav>
        </div>
      </div>

      {/* Course Header */}
      <section className="py-8 lg:py-12">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Title & Badges */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
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
                
                <div className="flex flex-wrap items-center gap-4 text-left">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">({course.reviewCount.toLocaleString()})</span>
                  </div>
                  <div className="text-muted-foreground">
                    {course.students.toLocaleString()} students
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Last updated {course.lastUpdated}
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div className="text-left">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              </div>

              {/* Instructor */}
              <div className="flex items-center space-x-4 text-left">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                  <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground">Created by</div>
                  <div className="font-semibold">{course.instructor}</div>
                  <div className="text-sm text-muted-foreground">{course.instructorTitle}</div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - Course Preview & Purchase */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <div className="relative aspect-video rounded-t-lg overflow-hidden bg-hero">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Button size="lg" className="rounded-full h-16 w-16">
                      <Play className="h-6 w-6 ml-1" />
                    </Button>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 px-2 py-1 rounded text-sm font-medium">
                    Preview
                  </div>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  {/* Pricing */}
                  <div className="text-left">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-bold text-primary">{course.price}</span>
                      <span className="text-lg text-muted-foreground line-through">{course.originalPrice}</span>
                    </div>
                    <div className="text-accent font-medium">{course.discount}</div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button className="w-full" size="lg">
                      Start course
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                      {isWishlisted ? 'Wishlisted' : 'Add to wishlist'}
                    </Button>
                  </div>

                  {/* Money Back Guarantee */}
                  <div className="text-center text-sm text-muted-foreground">
                    14-day money-back guarantee
                  </div>

                  {/* Course Includes */}
                  <div className="space-y-4 text-left">
                    <h3 className="font-semibold">This course includes:</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{course.language}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        <span>Certificate upon completion</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{course.practiceTests} practice tests</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{course.articles} articles</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Download className="h-4 w-4 text-muted-foreground" />
                        <span>{course.downloadableResources} downloadable resources</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Tabs */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:pr-80">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="content">Course content</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-8">
                {/* What you'll learn */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6 text-left flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      What you'll learn
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {course.learningPoints.map((point, index) => (
                        <div key={index} className="flex items-start space-x-3 text-left">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm leading-relaxed">{point}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="content">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6 text-left">Course Content</h2>
                    <p className="text-muted-foreground text-left">Detailed course curriculum coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="instructor">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6 text-left">About the Instructor</h2>
                    <div className="flex items-start space-x-4 text-left">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={course.instructorAvatar} alt={course.instructor} />
                        <AvatarFallback>{course.instructor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{course.instructor}</h3>
                        <p className="text-muted-foreground">{course.instructorTitle}</p>
                        <p className="mt-2 text-sm">Experienced professional with over 15 years in financial markets and stock exchange operations.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-6 text-left">Student Reviews</h2>
                    <p className="text-muted-foreground text-left">Reviews and ratings coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetail;