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
        <div className="mb-12 text-left w-full">
          <h2 className="text-3xl font-bold text-[#1c1d1f] mb-2 tracking-tight">
            Latest Marketing Insights
          </h2>
          <p className="text-lg text-[#1c1d1f] max-w-3xl">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <div key={post.id} className="group bg-white overflow-hidden flex flex-col border border-gray-200">
                <Link to={`/blog/${post.id}`} className="block block">
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <img
                      src={post.image || getFallbackImage(post.id)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                      onError={(e) => {
                        e.currentTarget.src = getFallbackImage(post.id);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>

                <div className="pt-2 pb-4 px-4 flex flex-col flex-grow text-left">
                  <div className="flex items-center justify-between mb-2 mt-2">
                    <span className="text-xs font-bold text-[#b4690e]">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.read_time}</span>
                  </div>

                  <Link to={`/blog/${post.id}`}>
                    <h3 className="font-bold text-base text-[#1c1d1f] leading-tight mb-2 line-clamp-2 min-h-[2.5rem] group-hover:text-black hover:underline cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-xs text-[#6a6f73] mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto">
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                      <div className="flex items-center space-x-1">
                        <span>{post.author?.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{formatDate(post.created_at)}</span>
                      </div>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <Button className="w-full bg-[#00aeef] hover:bg-[#0077a3] text-white font-semibold py-2 rounded-sm text-sm transition-all duration-200">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Blogs Link */}
        <div className="text-left mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-[#0095cc] rounded-sm hover:text-[#0077a3] transition-all group font-semibold text-lg border border-[#0095cc] hover:border-[#0077a3] px-6 py-2"
          >
            View All Blog Posts
            <FontAwesomeIcon
              icon={faArrowRight}
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};