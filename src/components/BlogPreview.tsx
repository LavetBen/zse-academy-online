import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser, faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

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
}

export const BlogPreview = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch latest blog posts from Laravel API
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching latest blogs from API...');
        const response = await fetch('http://127.0.0.1:8000/api/blogs/latest');
        
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
        }));
        
        console.log('Transformed posts:', transformedPosts); // Debug log
        setBlogPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching latest blogs:', err);
        setError('Failed to load latest blog posts. Please try again later.');
        // Fallback to empty array if API fails
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  // Helper functions to transform API data
  const generateExcerpt = (content: string, maxLength: number = 100) => {
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

  const getFallbackImage = (id: number) => {
    const fallbackImages = [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop",
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop",
      "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=240&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop"
    ];
    return fallbackImages[id % fallbackImages.length];
  };

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
      <section className="section-padding bg-muted/30 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-2">
              Latest Marketing Insights
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
              Over 35 years of combined experience delivering measurable results for B2B clients of all types and sizes.
            </p>
          </div>

          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <FontAwesomeIcon 
                icon={faSpinner} 
                className="h-8 w-8 text-primary animate-spin mb-4" 
              />
              <p className="text-muted-foreground">Loading latest insights...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted/30 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-2">
            Latest Marketing Insights
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Over 35 years of combined experience delivering measurable results for B2B clients of all types and sizes.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> {error}
            </p>
          </div>
        )}

        {blogPosts.length === 0 && !loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={post.id} className="card-hover overflow-hidden group">
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
                <CardHeader className="text-left">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{post.read_time}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 text-left group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-left">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-left">
                  <div className="flex items-center justify-between">
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
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="ghost" className="w-full mt-4 group">
                      Read More
                      <FontAwesomeIcon 
                        icon={faArrowRight} 
                        className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" 
                      />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* View All Blogs Button */}
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white">
            <Link to="/blog" className="flex items-center">
              View All Blog Posts
              <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};