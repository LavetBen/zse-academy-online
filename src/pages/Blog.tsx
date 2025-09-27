import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCalendar, 
  faUser, 
  faArrowRight, 
  faSearch, 
  faClock,
  faTag,
  faFire,
  faChartLine,
  faNewspaper
} from "@fortawesome/free-solid-svg-icons";

const blogPosts = [
  {
    id: 1,
    title: "Understanding ZSE Market Trends in 2024",
    excerpt: "Comprehensive analysis of current market trends and what they mean for investors in Zimbabwe's financial sector. Explore the latest developments and future outlook.",
    author: "Dr. Sarah Mukamuri",
    date: "December 15, 2024",
    category: "Market Analysis",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    featured: true,
    tags: ["ZSE", "Market Trends", "Analysis", "2024"]
  },
  {
    id: 2,
    title: "Top 5 Investment Strategies for Beginners",
    excerpt: "Essential investment strategies every beginner should know before entering the Zimbabwe Stock Exchange. Learn from the experts and start your journey.",
    author: "James Chigumba",
    date: "December 12, 2024",
    category: "Investment Tips",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Investment", "Beginners", "Strategy", "Tips"]
  },
  {
    id: 3,
    title: "Risk Management in Volatile Markets",
    excerpt: "Learn how to protect your investments during market uncertainty with proven risk management techniques. Essential knowledge for every investor.",
    author: "Prof. Michael Tendai",
    date: "December 10, 2024",
    category: "Risk Management",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Risk Management", "Volatility", "Protection", "Markets"]
  },
  {
    id: 4,
    title: "Digital Banking Revolution in Zimbabwe",
    excerpt: "How digital banking is transforming the financial landscape in Zimbabwe and what it means for investors and businesses moving forward.",
    author: "Chipo Madziva",
    date: "December 8, 2024",
    category: "Fintech",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Digital Banking", "Fintech", "Zimbabwe", "Innovation"]
  },
  {
    id: 5,
    title: "Currency Dynamics and Investment Impact",
    excerpt: "Understanding how currency fluctuations affect investment decisions in the Zimbabwean context. A comprehensive guide for investors.",
    author: "Robert Mapfumo",
    date: "December 5, 2024",
    category: "Currency Analysis",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Currency", "Investment", "Analysis", "Economics"]
  },
  {
    id: 6,
    title: "Sustainable Investing in African Markets",
    excerpt: "The rise of ESG investing in Africa and how Zimbabwe is positioning itself in the sustainable investment landscape.",
    author: "Dr. Patience Gombe",
    date: "December 3, 2024",
    category: "Sustainable Finance",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    featured: false,
    tags: ["ESG", "Sustainable", "Africa", "Investment"]
  }
];

const categories = ["All", "Market Analysis", "Investment Tips", "Risk Management", "Fintech", "Currency Analysis", "Sustainable Finance"];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <FontAwesomeIcon icon={faNewspaper} className="h-8 w-8" />
              <h1 className="text-4xl sm:text-5xl font-bold">
                ZSE Academy Blog
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay informed with the latest insights, market analysis, and expert opinions on Zimbabwe's financial markets and investment opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-8">
              <FontAwesomeIcon icon={faFire} className="h-6 w-6 text-orange-500" />
              <h2 className="text-2xl font-bold">Featured Article</h2>
            </div>
            
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="grid lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <FontAwesomeIcon icon={faFire} className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                      <Badge variant="outline">{featuredPost.category}</Badge>
                    </div>
                    
                    <h3 className="text-3xl font-bold leading-tight">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-lg">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                          <span>{featuredPost.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                          <span>{featuredPost.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-fit" asChild>
                      <Link to={`/blog/${featuredPost.id}`}>
                        Read Full Article
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-12 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-8">
            <FontAwesomeIcon icon={faChartLine} className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <span className="text-muted-foreground">({regularPosts.length} articles)</span>
          </div>

          {regularPosts.length === 0 ? (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faSearch} className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <FontAwesomeIcon icon={faTag} className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="ghost" className="w-full group" asChild>
                      <Link to={`/blog/${post.id}`}>
                        Read More
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
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

export default Blog;