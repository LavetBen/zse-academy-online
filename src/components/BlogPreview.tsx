import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faUser, faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { blogService, BlogPost } from "@/services/blog.service";
import { transformBlogPost, formatDate, getFallbackImage } from "@/utils/blogHelpers";

export const BlogPreview = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch latest blog posts
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await blogService.getLatestPosts();
        const transformedPosts = data.map(transformBlogPost);
        setBlogPosts(transformedPosts);
      } catch (err) {
        console.error('Error fetching latest blogs:', err);
        setError('Failed to load latest blog posts. Please try again later.');
        setBlogPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBlogs();
  }, []);

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