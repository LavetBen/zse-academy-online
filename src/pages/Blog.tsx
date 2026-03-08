import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { blogService, BlogPost } from "@/services/blog.service";
import {
  transformBlogPost,
  formatDate,
  getFallbackImage,
} from "@/utils/blogHelpers";

const categories = [
  "All",
  "Market Analysis",
  "Investment Tips",
  "Risk Management",
  "Fintech",
  "Currency Analysis",
  "Sustainable Finance",
];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await blogService.getPublicPosts();
        const transformedPosts = data.map((post, index) => ({
          ...transformBlogPost(post),
          featured: index === 0,
          rating: (4.5 + Math.random() * 0.5).toFixed(1),
          enrolled: Math.floor(Math.random() * 5000) + 1000,
          lessons: Math.floor(Math.random() * 10) + 5,
          duration: `${Math.floor(Math.random() * 60) + 30}m`,
        }));
        setBlogPosts(transformedPosts);
      } catch (err) {
        console.error("Error fetching blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      activeFilter === "All" || post.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);
  const trendingPosts = [...filteredPosts]
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Skeleton loading omitted for brevity, would be here */}
          <div className="h-64 bg-gray-100 animate-pulse mb-8" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error && blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] pt-24">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faNewspaper}
              className="h-16 w-16 text-gray-300 mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Unable to Load Blog</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-600 rounded-none hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Flat Corporate Header */}
      <div className="border-b border-gray-200 bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              Newsroom
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              The latest financial insights, market analysis, and platform updates straight from the experts.
            </p>
          </div>

          {/* Simple Search */}
          <div className="w-full md:w-auto flex items-center md:max-w-sm">
            <div className="relative w-full">
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"
              />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 w-full border-gray-300 border rounded-none focus:ring-0 focus:border-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Main Feed Column */}
          <div className="lg:w-3/4">

            {/* Navigational Tabs (Categories) inside Main Feed Instead of Sidebar to ensure flat design */}
            <div className="mb-8 border-b border-gray-200 overflow-x-auto">
              <nav className="flex space-x-8 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                      ${activeFilter === category
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </nav>
            </div>

            {/* Featured Article */}
            {featuredPost && activeFilter === "All" && searchTerm === "" && (
              <div className="mb-12 group block">
                <Link to={`/blog/${featuredPost.id}`}>
                  <div className="relative h-80 md:h-[450px] w-full mb-6 bg-gray-100 overflow-hidden">
                    <img
                      src={featuredPost.image || getFallbackImage(featuredPost.id)}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover transition duration-300 group-hover:opacity-90 grayscale-0 hover:grayscale-0"
                      onError={(e) => {
                        e.currentTarget.src = getFallbackImage(featuredPost.id);
                      }}
                    />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">
                      {featuredPost.category}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg mb-4 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 uppercase tracking-wider font-semibold">
                      <span>{featuredPost.author?.name}</span>
                      <span className="mx-2">·</span>
                      <span>{formatDate(featuredPost.created_at)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Top Toolbar for regular posts (Filters & Sort if active) */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900">Latest Updates</h3>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px] rounded-none border-gray-300 bg-transparent shadow-none text-sm font-semibold h-10">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="rounded-none shadow-sm border-gray-300">
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Article List / Feed */}
            {regularPosts.length === 0 ? (
              <div className="py-12 border-t border-b border-gray-100 text-center">
                <p className="text-gray-500 text-lg">There are no articles matching your criteria.</p>
                <button
                  onClick={() => { setSearchTerm(""); setActiveFilter("All"); }}
                  className="mt-4 text-blue-600 hover:underline font-medium"
                >
                  Clear Search
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                {regularPosts.map((post) => (
                  <article key={post.id} className="flex flex-col md:flex-row gap-8 group">
                    {/* Image on left for list view */}
                    <div className="w-full md:w-2/5 flex-shrink-0">
                      <Link to={`/blog/${post.id}`}>
                        <div className="h-48 md:h-full min-h-[160px] bg-gray-100 overflow-hidden relative border border-gray-100">
                          <img
                            src={post.image || getFallbackImage(post.id)}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                            onError={(e) => {
                              e.currentTarget.src = getFallbackImage(post.id);
                            }}
                          />
                        </div>
                      </Link>
                    </div>

                    {/* Content on right */}
                    <div className="w-full md:w-3/5 flex flex-col justify-center py-2">
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                        {post.category}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                        <Link to={`/blog/${post.id}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="mt-auto flex items-center text-xs text-gray-500 uppercase tracking-wider font-semibold">
                        <span>{post.author?.name}</span>
                        <span className="mx-2">|</span>
                        <time>{formatDate(post.created_at)}</time>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Empty space mimicking pagination bar */}
            {regularPosts.length > 0 && (
              <div className="mt-16 border-t border-gray-200 pt-8 flex justify-between">
                {/* Real pagination could go here, currently static */}
                <Button variant="outline" className="rounded-none border-gray-300 text-gray-700 bg-white shadow-none hover:bg-gray-50 transition-none" disabled>
                  Previous Page
                </Button>
                <Button variant="outline" className="rounded-none border-gray-300 text-gray-700 bg-white shadow-none hover:bg-gray-50 transition-none" disabled={blogPosts.length < 10}>
                  Next Page
                </Button>
              </div>
            )}
          </div>

          {/* Right Sidebar - Trending/Corporate Info */}
          <div className="lg:w-1/4 pt-12 lg:pt-0">
            <aside className="sticky top-28">
              <div className="border-t-4 border-black pt-4 mb-10">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-900">Trending Now</h4>
                <ul className="space-y-6">
                  {trendingPosts.map((post, index) => (
                    <li key={post.id} className="group">
                      <Link to={`/blog/${post.id}`} className="flex items-start gap-4">
                        <span className="text-3xl font-bold text-gray-200 mt-[-4px]">
                          0{index + 1}
                        </span>
                        <div>
                          <h5 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 line-clamp-3 leading-snug">
                            {post.title}
                          </h5>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 p-6 border border-gray-200">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Newsletter</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest insights and platform updates delivered straight to your inbox.
                </p>
                <div className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-none border-gray-300 bg-white shadow-none h-11 focus:border-blue-600 focus:ring-0"
                  />
                  <Button className="w-full rounded-none bg-blue-600 text-white font-bold tracking-wider h-11 hover:bg-blue-700">
                    SUBSCRIBE
                  </Button>
                </div>
              </div>
            </aside>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;




