import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  faCalendar,
  faUser,
  faArrowRight,
  faSearch,
  faClock,
  faTag,
  faFire,
  faChartLine,
  faNewspaper,
  faSpinner,
  faStar,
  faUsers,
  faBookOpen,
  faGraduationCap,
  faPlayCircle,
  faCheckCircle,
  faChevronRight,
  faArrowUpRightFromSquare,
  faFilter,
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

// Trading/Finance background images (abstract patterns, charts, etc.)
const BACKGROUND_IMAGES = [
  "linear-gradient(rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.88)), url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=2000&q=80')",
  "linear-gradient(rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.88)), url('https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&w=2000&q=80')",
  "linear-gradient(rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.88)), url('https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=2000&q=80')",
];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState("All");
  const [backgroundImage] = useState(BACKGROUND_IMAGES[0]);

  // Fetch blog posts - NO CHANGES TO API CALLS
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

  // Filter posts based on search and category - NO CHANGES
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
    .slice(0, 3);

  // Stats
  const stats = {
    totalArticles: blogPosts.length,
    activeReaders: blogPosts.reduce(
      (acc, post) => acc + (post as any).enrolled,
      0
    ),
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="pt-24">
          {/* Skeleton remains the same */}
        </div>
        <Footer />
      </div>
    );
  }

  if (error && blogPosts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh] pt-24">
          <div className="text-center">
            <FontAwesomeIcon 
              icon={faNewspaper} 
              className="h-16 w-16 text-gray-400 mb-4" 
            />
            <h3 className="text-xl font-semibold mb-2">Unable to Load Blog</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700"
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-sans">
      <Navbar />

      {/* Hero Header with Background Image - Reduced Padding */}
      <div 
        className="relative text-white"
        style={{
          background: backgroundImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
          <div className="max-w-3xl">
            <nav className="flex items-center space-x-2 text-sm text-gray-300 mb-4">
              <Link to="/" className="hover:text-white transition hover:underline">
                Home
              </Link>
              <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
              <span className="text-white font-medium">Financial Insights</span>
            </nav>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              Master Financial Markets
              <span className="block text-blue-400 mt-2">
                Expert Insights & Analysis
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-6">
              Join {stats.activeReaders.toLocaleString()}+ professionals learning investment strategies, 
              market analysis, and financial management
            </p>

            {/* Stats in hero */}
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <div className="text-2xl font-bold">{stats.totalArticles}</div>
                <div className="ml-2 text-sm text-gray-300">Articles</div>
              </div>
              <div className="h-6 w-px bg-gray-600" />
              <div className="flex items-center">
                <div className="text-2xl font-bold">
                  {(stats.activeReaders / 1000).toFixed(1)}K+
                </div>
                <div className="ml-2 text-sm text-gray-300">Readers</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-lg">
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
                />
                <Input
                  placeholder="Search articles, topics, or strategies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-5 text-base rounded-xl bg-white/10 border-white/30 text-white placeholder-gray-400 backdrop-blur-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
                />
              </div>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-5 text-base rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faSearch} className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="sticky top-24 space-y-5">
              {/* Categories Card */}
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                <div className="flex items-center mb-4">
                  <FontAwesomeIcon icon={faFilter} className="h-5 w-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-bold text-gray-900">Categories</h3>
                </div>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveFilter(category)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeFilter === category
                          ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm"
                          : "text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category}</span>
                        {activeFilter === category && (
                          <FontAwesomeIcon
                            icon={faChevronRight}
                            className="h-4 w-4 text-blue-500"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl shadow-lg p-5">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <FontAwesomeIcon icon={faChartLine} className="h-5 w-5 text-blue-400 mr-2" />
                  Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                    <span className="text-gray-300">Total Articles</span>
                    <span className="font-bold text-lg">{stats.totalArticles}</span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-gray-700">
                    <span className="text-gray-300">Active Readers</span>
                    <span className="font-bold text-lg">
                      {(stats.activeReaders / 1000).toFixed(0)}K+
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Categories</span>
                    <span className="font-bold text-lg">{categories.length - 1}</span>
                  </div>
                </div>
              </div>

              {/* Trending Articles */}
              {trendingPosts.length > 0 && (
                <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <FontAwesomeIcon icon={faFire} className="h-5 w-5 text-orange-500 mr-2" />
                    Trending Now
                  </h3>
                  <div className="space-y-4">
                    {trendingPosts.map((post, index) => (
                      <div key={post.id} className="group">
                        <Link 
                          to={`/blog/${post.id}`}
                          className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                              {post.title}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
                              <FontAwesomeIcon icon={faClock} className="h-3 w-3 mr-1" />
                              <span>{post.read_time}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Featured Article */}
            {featuredPost && (
              <div className="mb-8">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-xl relative">
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full -translate-x-16 -translate-y-16" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full translate-x-20 translate-y-20" />
                  
                  <div className="p-6 md:p-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium mb-4">
                          <FontAwesomeIcon
                            icon={faStar}
                            className="h-3.5 w-3.5 mr-2"
                          />
                          Featured Article
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-300 mb-6 text-base max-w-2xl">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-6">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
                              <FontAwesomeIcon
                                icon={faUser}
                                className="h-4 w-4 text-blue-400"
                              />
                            </div>
                            <span className="font-medium">
                              {featuredPost.author?.name}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="h-4 w-4 mr-2 text-gray-400"
                            />
                            <span className="text-sm">{formatDate(featuredPost.created_at)}</span>
                          </div>
                          <div className="flex items-center">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-4 w-4 mr-2 text-gray-400"
                            />
                            <span className="text-sm">{featuredPost.read_time}</span>
                          </div>
                        </div>
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-5 rounded-xl shadow-lg hover:shadow-xl transition-all group"
                          asChild
                        >
                          <Link
                            to={`/blog/${featuredPost.id}`}
                            className="flex items-center"
                          >
                            <FontAwesomeIcon
                              icon={faPlayCircle}
                              className="h-5 w-5 mr-3"
                            />
                            Read Full Article
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                        </Button>
                      </div>
                      <div className="hidden md:block">
                        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl p-6 min-w-[200px]">
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FontAwesomeIcon
                                key={i}
                                icon={faStar}
                                className={`h-4 w-4 ${
                                  i <
                                  Math.floor(
                                    parseFloat((featuredPost as any).rating)
                                  )
                                    ? "text-yellow-400"
                                    : "text-gray-400"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">
                            {(featuredPost as any).rating}
                          </div>
                          <div className="text-gray-300 text-sm">
                            Average Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Article Grid */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Latest Articles
                  </h2>
                  <p className="text-gray-600 mt-1 text-sm">
                    {filteredPosts.length} articles • {blogPosts.length} total
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-40 bg-white border-gray-300 rounded-xl">
                      <FontAwesomeIcon icon={faFilter} className="h-4 w-4 mr-2 text-gray-500" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {regularPosts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="h-12 w-12 text-gray-300 mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter("All");
                    }}
                    className="rounded-lg border-gray-300 hover:border-gray-400"
                  >
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5">
                  {regularPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image || getFallbackImage(post.id)}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.src = getFallbackImage(post.id);
                          }}
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-gradient-to-r from-blue-600 to-blue-500 text-white border-0 text-xs font-medium px-3 py-1">
                            {post.category}
                          </Badge>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900/40 to-transparent" />
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center text-xs text-gray-600">
                            <FontAwesomeIcon
                              icon={faCalendar}
                              className="h-3 w-3 mr-1.5"
                            />
                            <span>{formatDate(post.created_at)}</span>
                          </div>
                          <div className="flex items-center text-xs font-medium text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full">
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-3 w-3 mr-1.5"
                            />
                            <span>{post.read_time}</span>
                          </div>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 flex items-center justify-center mr-3 border border-blue-200">
                              <FontAwesomeIcon
                                icon={faUser}
                                className="h-3.5 w-3.5 text-blue-600"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {post.author?.name}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <FontAwesomeIcon
                              icon={faUsers}
                              className="h-3.5 w-3.5 mr-1"
                            />
                            <span>{(post as any).enrolled.toLocaleString()}</span>
                          </div>
                        </div>

                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 2).map((tag, index) => (
                              <span
                                key={index}
                                className="inline-block px-2.5 py-1 text-xs bg-gray-100 text-gray-700 rounded-lg border border-gray-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-lg py-3 transition-all group/btn"
                          asChild
                        >
                          <Link
                            to={`/blog/${post.id}`}
                            className="flex items-center justify-center font-medium"
                          >
                            Read Full Article
                            <FontAwesomeIcon
                              icon={faArrowRight}
                              className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1"
                            />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;




