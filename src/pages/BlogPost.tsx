import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCalendar, 
  faUser, 
  faArrowLeft, 
  faArrowRight,
  faClock,
  faTag,
  faShare,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";

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
}

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog post from Laravel API
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching blog post from API...');
        const response = await fetch(`http://127.0.0.1:8000/api/public/blogs/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        // Transform the API data
        const transformedPost = {
          id: data.id,
          user_id: data.user_id,
          title: data.title,
          content: data.content,
          image: data.image || getFallbackImage(data.id),
          created_at: data.created_at,
          updated_at: data.updated_at,
          author: data.user ? { name: data.user.name, email: data.user.email } : { name: "Anonymous Author", email: "" },
          excerpt: generateExcerpt(data.content),
          category: getRandomCategory(),
          read_time: calculateReadTime(data.content),
          tags: generateTags(data.title),
        };
        
        console.log('Transformed post:', transformedPost); // Debug log
        setPost(transformedPost);
        
        // Fetch related posts (you might want to create a separate API endpoint for this)
        fetchRelatedPosts(transformedPost);
        
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id]);

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

  const fetchRelatedPosts = async (currentPost: BlogPost) => {
    try {
      // Fetch all posts and filter for related ones
      const response = await fetch('http://127.0.0.1:8000/api/blogs');
      if (response.ok) {
        const data = await response.json();
        const posts = Array.isArray(data) ? data : data.data || data;
        
        // Filter out current post and take first 3 as related
        const related = posts
          .filter((p: any) => p.id !== currentPost.id)
          .slice(0, 3)
          .map((post: any) => ({
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
          }));
        
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
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
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <FontAwesomeIcon 
              icon={faSpinner} 
              className="h-12 w-12 text-primary animate-spin mb-4" 
            />
            <h3 className="text-xl font-semibold mb-2">Loading Article</h3>
            <p className="text-muted-foreground">Fetching the blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h3 className="text-4xl font-bold mb-4">Article Not Found</h3>
          <p className="text-muted-foreground mb-8">
            {error || "The article you're looking for doesn't exist."}
          </p>
          <Button asChild>
            <Link to="/blog">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar />

      {/* Hero Section */}
      <article className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" className="mb-6 hover:bg-primary/10" asChild>
            <Link to="/blog">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <header className="mb-8 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {post.category}
              </Badge>
              {post.tags && post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline">
                  <FontAwesomeIcon icon={faTag} className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h3 className="text-4xl sm:text-5xl font-bold leading-tight">
              {post.title}
            </h3>

            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                  <span className="font-medium">{post.author?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                  <span>{formatDate(post.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                  <span>{post.read_time}</span>
                </div>
              </div>

              <Button variant="outline" size="sm">
                <FontAwesomeIcon icon={faShare} className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </header>

          {/* Featured Image */}
          <div className="aspect-video rounded-lg overflow-hidden mb-12 shadow-xl">
            <img
              src={post.image || getFallbackImage(post.id)}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src = getFallbackImage(post.id);
              }}
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image || getFallbackImage(relatedPost.id)}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = getFallbackImage(relatedPost.id);
                      }}
                    />
                  </div>
                  <div className="p-6 space-y-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {relatedPost.category}
                    </Badge>
                    <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {relatedPost.excerpt}
                    </p>
                    <Button variant="ghost" className="w-full group" asChild>
                      <Link to={`/blog/${relatedPost.id}`} className="flex items-center justify-center">
                        Read Article
                        <FontAwesomeIcon 
                          icon={faArrowRight} 
                          className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" 
                        />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;