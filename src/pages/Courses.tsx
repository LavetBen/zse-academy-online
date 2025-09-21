import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Users, Star, Search, Filter } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Zimbabwe Stock Exchange Fundamentals",
    description: "Complete introduction to ZSE operations, market structure, and basic trading principles.",
    instructor: "Dr. Sarah Mukamuri",
    duration: "8 weeks",
    students: 2340,
    rating: 4.9,
    level: "Beginner",
    price: "$199",
    category: "Fundamentals",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop"
  },
  {
    id: 2,
    title: "Advanced Technical Analysis",
    description: "Master chart patterns, technical indicators, and advanced trading strategies for ZSE.",
    instructor: "James Chigumba",
    duration: "12 weeks",
    students: 1890,
    rating: 4.8,
    level: "Advanced",
    price: "$299",
    category: "Technical Analysis",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop"
  },
  {
    id: 3,
    title: "Portfolio Management Strategies",
    description: "Learn professional portfolio construction and management techniques for optimal returns.",
    instructor: "Prof. Michael Tendai",
    duration: "10 weeks",
    students: 1567,
    rating: 4.9,
    level: "Intermediate",
    price: "$249",
    category: "Portfolio Management",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=240&fit=crop"
  },
  {
    id: 4,
    title: "Risk Management Essentials",
    description: "Comprehensive guide to identifying, measuring, and managing investment risks.",
    instructor: "Alice Nyamadzawo",
    duration: "6 weeks",
    students: 1234,
    rating: 4.7,
    level: "Intermediate",
    price: "$179",
    category: "Risk Management",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=240&fit=crop"
  },
  {
    id: 5,
    title: "Financial Markets Analysis",
    description: "Deep dive into Zimbabwe's financial markets including bonds, derivatives, and commodities.",
    instructor: "Robert Mpofu",
    duration: "14 weeks",
    students: 987,
    rating: 4.8,
    level: "Advanced",
    price: "$349",
    category: "Market Analysis",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=240&fit=crop"
  },
  {
    id: 6,
    title: "Compliance and Regulations",
    description: "Navigate ZSE regulations, compliance requirements, and legal frameworks effectively.",
    instructor: "Dr. Grace Chivasa",
    duration: "4 weeks",
    students: 756,
    rating: 4.6,
    level: "Professional",
    price: "$149",
    category: "Compliance",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=240&fit=crop"
  }
];

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all-levels");
  const [selectedCategory, setSelectedCategory] = useState("all-categories");

  const filteredCourses = courses.filter(course => {
    return (
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedLevel === "all-levels" || selectedLevel === "" || course.level === selectedLevel) &&
      (selectedCategory === "all-categories" || selectedCategory === "" || course.category === selectedCategory)
    );
  });

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
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-levels">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="Fundamentals">Fundamentals</SelectItem>
                  <SelectItem value="Technical Analysis">Technical Analysis</SelectItem>
                  <SelectItem value="Portfolio Management">Portfolio Management</SelectItem>
                  <SelectItem value="Risk Management">Risk Management</SelectItem>
                  <SelectItem value="Market Analysis">Market Analysis</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
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
                        src={course.image}
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
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{course.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl line-clamp-2 text-left">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-3 text-left">
                        {course.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-left">
                      <div className="space-y-3">
                        <div className="text-sm text-muted-foreground">
                          Instructor: {course.instructor}
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{course.students.toLocaleString()} students</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-2xl font-bold text-primary">{course.price}</div>
                          <Button variant="hero" onClick={(e) => e.preventDefault()}>Enroll Now</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>  
                </Link>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">No courses found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;