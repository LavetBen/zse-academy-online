import { useState, useEffect } from "react";
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
  faNewspaper,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

// Types based on your Laravel API response
interface BlogPost {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
  excerpt?: string;
  category?: string;
  read_time?: string;
  tags?: string[];
  featured?: boolean;
}

const categories = ["All", "Market Analysis", "Investment Tips", "Risk Management", "Fintech", "Currency Analysis", "Sustainable Finance"];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch blog posts from Laravel API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching blog posts from API...');
        const response = await fetch('http://127.0.0.1:8000/api/public/blogs');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        // The response is an array directly, not nested under data.data
        const posts = Array.isArray(data) ? data : data.data || data;
        
        // Transform the API data to match our frontend structure
        const transformedPosts = posts.map((post: any) => ({
          id: post.id,
          user_id: post.user_id,
          title: post.title,
          content: post.content,
          image: post.image || getFallbackImage(post.id),
          created_at: post.created_at,
          updated_at: post.updated_at,
          author: post.user ? { name: post.user.name, email: post.user.email } : { name: "Anonymous Author", email: "" },
          excerpt: generateExcerpt(post.content),
          category: getRandomCategory(),
          read_time: calculateReadTime(post.content),
          tags: generateTags(post.title),
          featured: post.id === 1 // Make first post featured, or use your own logic
        }));
        
        console.log('Transformed posts:', transformedPosts); // Debug log
        setBlogPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
        
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  // Helper functions to transform API data
  const generateExcerpt = (content: string, maxLength: number = 150) => {
    // Remove HTML tags for excerpt
    const plainText = content.replace(/<[^>]*>/g, '');
    if (plainText.length <= maxLength) return plainText;
    return plainText.substring(0, maxLength) + '...';
  };

  const calculateReadTime = (content: string) => {
    // Remove HTML tags for word count
    const plainText = content.replace(/<[^>]*>/g, '');
    const wordsPerMinute = 200;
    const words = plainText.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  const getRandomCategory = () => {
    const categories = ["Market Analysis", "Investment Tips", "Risk Management", "Fintech", "Currency Analysis"];
    return categories[Math.floor(Math.random() * categories.length)];
  };

  const generateTags = (title: string) => {
    const words = title.split(/\s+/).slice(0, 3);
    return words.map(word => word.replace(/[^\w]/g, ''));
  };

  const getFallbackImage = (id: number) => {
    const fallbackImages = [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop"
    ];
    return fallbackImages[id % fallbackImages.length];
  };

 

  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <FontAwesomeIcon 
              icon={faSpinner} 
              className="h-12 w-12 text-primary animate-spin mb-4" 
            />
            <h3 className="text-xl font-semibold mb-2">Loading Blog Posts</h3>
            <p className="text-muted-foreground">Fetching the latest articles...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <FontAwesomeIcon 
              icon={faNewspaper} 
              className="h-16 w-16 text-muted-foreground mb-4" 
            />
            <h3 className="text-xl font-semibold mb-2">Unable to Load Blog</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <FontAwesomeIcon icon={faNewspaper} className="h-16 w-16 text-primary" />
          </div>
          <h3 className="text-4xl md:text-6xl font-bold mb-6">
            Financial Insights
            <span className="block text-primary mt-2">Blog</span>
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay updated with the latest market analysis, investment strategies, and financial trends in Zimbabwe
          </p>
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
          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">
                <strong>Note:</strong> {error} Showing available content.
              </p>
            </div>
          )}
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
                    src={featuredPost.image || getFallbackImage(featuredPost.id)}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = getFallbackImage(featuredPost.id);
                    }}
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
                          <span>{featuredPost.author?.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                          <span>{formatDate(featuredPost.created_at)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                          <span>{featuredPost.read_time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-fit bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                      size="lg"
                      asChild
                    >
                      <Link to={`/blog/${featuredPost.id}`} className="flex items-center">
                        Read Full Article
                        <FontAwesomeIcon 
                          icon={faArrowRight} 
                          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" 
                        />
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
                      src={post.image || getFallbackImage(post.id)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = getFallbackImage(post.id);
                      }}
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center">
                        <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
                        {post.read_time}
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
                          <span>{post.author?.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                          <span>{formatDate(post.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            <FontAwesomeIcon icon={faTag} className="h-2 w-2 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <Button 
                      variant="outline" 
                      className="w-full group border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 hover:shadow-md" 
                      asChild
                    >
                      <Link to={`/blog/${post.id}`} className="flex items-center justify-center">
                        Read Full Article
                        <FontAwesomeIcon 
                          icon={faArrowRight} 
                          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" 
                        />
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