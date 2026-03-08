import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faUser,
  faArrowLeft,
  faArrowRight,
  faClock,
  faShare,
  faCheck,
  faPlayCircle,
  faChevronRight,
  faGlobe,
  faLaptopCode
} from "@fortawesome/free-solid-svg-icons";
import { blogService, type BlogPost } from "@/services/blog.service";
import { transformBlogPost, formatDate, getFallbackImage } from "@/utils/blogHelpers";

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog post
  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        // Simulate load time for UX
        const data = await blogService.getPostById(id);
        const transformedPost = transformBlogPost(data);
        setPost(transformedPost);
        fetchRelatedPosts(transformedPost);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPost();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchRelatedPosts = async (currentPost: BlogPost) => {
    try {
      const data = await blogService.getPublicPosts();
      const related = data
        .filter((p: any) => p.id !== currentPost.id)
        .slice(0, 3)
        .map(transformBlogPost);
      setRelatedPosts(related);
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        {/* Skeleton Hero - Dark Background */}
        <div className="bg-gray-900 py-12 px-4 h-[350px]">
          <div className="max-w-7xl mx-auto flex gap-8 relative">
            <div className="w-full lg:w-2/3 space-y-4 pt-8">
              <div className="h-4 bg-gray-700 rounded w-32 animate-pulse" />
              <div className="h-12 bg-gray-700 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-24 text-center">
          <h3 className="text-3xl font-bold mb-4 text-gray-900">Article Not Found</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            {error || "The article you're looking for doesn't exist or has been removed."}
          </p>
          <Button asChild className="bg-gray-900 text-white hover:bg-gray-800 rounded-none h-12 px-8 font-bold">
            <Link to="/blog">
              Back to Newsroom
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* Udemy-style Dark Hero Section */}
      <div className="bg-[#1c1d1f] text-white pt-8 pb-12 relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Breadcrumbs */}
          <nav className="flex items-center space-x-2 text-sm text-[#cec8c2] font-semibold mb-6">
            <Link to="/blog" className="hover:text-white transition">
              Newsroom
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="h-2.5 w-2.5" />
            <span className="hover:text-white transition cursor-pointer">
              {post.category}
            </span>
            <FontAwesomeIcon icon={faChevronRight} className="h-2.5 w-2.5" />
            <span className="text-white truncate max-w-[200px] md:max-w-xs">{post.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-start justify-between">
            {/* Left Content Area in Hero */}
            <div className="w-full lg:w-[65%] lg:pr-12 xl:pr-16">

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4 text-white">
                {post.title}
              </h1>

              <p className="text-lg md:text-xl text-[#cec8c2] mb-6 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>

              {/* Meta info block */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#cec8c2] font-semibold mb-6">

                {/* Simulated best seller badge if featured */}
                {post.id && parseInt(post.id) % 2 === 0 && ( /* Arbitrary condition for demo */
                  <span className="bg-[#eceb98] text-[#3d3c0a] px-3 py-1 text-xs font-bold leading-none tracking-tight">
                    Best Seller
                  </span>
                )}

                <div className="flex items-center">
                  <span className="text-[#f69c08] font-bold mr-1">4.7</span>
                  <div className="flex text-[#f69c08] text-xs">
                    <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 mr-1" />
                    <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 mr-1" />
                    <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 mr-1" />
                    <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 mr-1" />
                    <FontAwesomeIcon icon={faCalendar} className="h-3 w-3 text-[#cec8c2]" />
                  </div>
                  <span className="ml-2 underline text-[#cec8c2]">(3,421 ratings)</span>
                  <span className="ml-2">15,489 students</span>
                </div>

                <div className="flex items-center">
                  Created by <span className="text-[#a435f0] hover:text-[#c02424] underline ml-1 cursor-pointer">{post.author?.name}</span>
                </div>

                <div className="flex items-center">
                  <FontAwesomeIcon icon={faGlobe} className="h-3.5 w-3.5 mr-2" />
                  English
                </div>

                <div className="flex items-center text-[#cec8c2]">
                  <FontAwesomeIcon icon={faCalendar} className="h-3.5 w-3.5 mr-2" />
                  Last updated {formatDate(post.created_at)}
                </div>
              </div>
            </div>

            {/* 
               The absolute/floating Preview Card for Desktop.
               On mobile, this card sits in normal document flow below the header.
            */}
            <div className="hidden lg:block lg:w-[35%] lg:absolute lg:top-8 lg:right-4 xl:right-8 z-50">
              <div className="bg-white text-gray-900 border border-gray-200 shadow-xl overflow-hidden w-full max-w-sm ml-auto">
                {/* Preview Image */}
                <div className="relative aspect-video bg-gray-100 group cursor-pointer block">
                  <img
                    src={post.image || getFallbackImage(post.id)}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = getFallbackImage(post.id);
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                    <FontAwesomeIcon icon={faPlayCircle} className="text-white h-16 w-16 opacity-90 drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 text-center text-white font-bold text-sm z-10 drop-shadow-md">
                    Preview this article
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                {/* Card Content & CTAs */}
                <div className="p-6">
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold tracking-tight">Free</span>
                    <span className="text-gray-500 ml-2 line-through tracking-tight text-lg">$84.99</span>
                    <span className="ml-2 text-sm font-semibold text-gray-900">100% off</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <Button className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white rounded-none h-12 font-bold text-base transition-colors">
                      Add to cart
                    </Button>
                    <Button variant="outline" className="w-full bg-white border-black text-gray-900 rounded-none h-12 font-bold text-base hover:bg-gray-50 border-2">
                      Read Now
                    </Button>
                  </div>

                  <div className="text-center text-xs text-gray-500 mb-6">
                    30-Day Money-Back Guarantee
                  </div>

                  <div className="mb-4">
                    <h4 className="font-bold text-sm mb-3 text-gray-900">This article includes:</h4>
                    <ul className="space-y-2 text-sm text-gray-700 font-medium">
                      <li className="flex items-center">
                        <FontAwesomeIcon icon={faClock} className="w-4 h-4 mr-3 text-gray-900" />
                        {post.read_time} on-demand video
                      </li>
                      <li className="flex items-center">
                        <FontAwesomeIcon icon={faLaptopCode} className="w-4 h-4 mr-3 text-gray-900" />
                        Access on mobile and TV
                      </li>
                      <li className="flex items-center">
                        <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-3 text-gray-900" />
                        Direct author access
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200 mt-2">
                    <button className="text-gray-900 font-bold underline text-sm hover:text-black">Share</button>
                    <button className="text-gray-900 font-bold underline text-sm hover:text-black">Gift this article</button>
                    <button className="text-gray-900 font-bold underline text-sm hover:text-black">Apply Coupon</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative">
        <div className="flex flex-col lg:flex-row">

          {/* Mobile Preview Card (Only visible on small screens) */}
          <div className="block lg:hidden w-full mb-8">
            <div className="bg-white border text-gray-900 shadow-sm overflow-hidden w-full">
              <div className="aspect-video relative bg-gray-100 group cursor-pointer">
                <img
                  src={post.image || getFallbackImage(post.id)}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <FontAwesomeIcon icon={faPlayCircle} className="text-white h-12 w-12 opacity-90" />
                </div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold mb-4">Free</div>
                <Button className="w-full bg-[#a435f0] hover:bg-[#8710d8] text-white rounded-none h-12 font-bold mb-3">Add to cart</Button>
                <Button variant="outline" className="w-full rounded-none h-12 font-bold border-black border-2 text-black hover:bg-gray-50">Read Now</Button>
              </div>
            </div>
          </div>

          {/* Left Column - Article Content & Details */}
          <div className="w-full lg:w-[65%] lg:pr-12 xl:pr-16">

            {/* "What you'll learn" Section (Udemy staple) */}
            <div className="border border-gray-300 p-6 mb-10 bg-gray-50">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">What you'll learn</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-800">
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faCheck} className="mr-3 w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                  <span>Understand the fundamental concepts of {post.category.toLowerCase()} and its impact.</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faCheck} className="mr-3 w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                  <span>Apply actionable insights to your own strategies immediately.</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faCheck} className="mr-3 w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                  <span>Identify market trends before they become mainstream.</span>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon icon={faCheck} className="mr-3 w-4 h-4 text-gray-900 shrink-0 mt-0.5" />
                  <span>Avoid common pitfalls in modern financial analysis.</span>
                </li>
              </ul>
            </div>

            {/* Article Content Container */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Article description</h2>
              <div
                className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5 prose-ul:text-gray-700 prose-a:text-[#5624d0] prose-a:underline font-normal text-sm"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags directly below content */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Related Topics:</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1.5 border border-gray-900 text-gray-900 text-sm font-bold bg-white hover:bg-gray-100 transition cursor-pointer">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Instructor / Author Block */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">About the author</h2>
              <div className="mb-4">
                <a href="#" className="text-xl font-bold text-[#5624d0] underline hover:text-[#401b9c]">
                  {post.author?.name}
                </a>
                <p className="text-gray-600 text-base font-semibold">Senior Financial Analyst & Educator</p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 text-sm text-gray-900 font-medium">
                <img src={getFallbackImage("author")} alt={post.author?.name} className="w-24 h-24 rounded-full object-cover border border-gray-200" />
                <ul className="space-y-2">
                  <li className="flex items-center"><FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-4 text-gray-900" /> 4.7 Instructor Rating</li>
                  <li className="flex items-center"><FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-4 text-gray-900" /> 34,213 Reviews</li>
                  <li className="flex items-center"><FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-4 text-gray-900" /> 165,892 Students</li>
                  <li className="flex items-center"><FontAwesomeIcon icon={faPlayCircle} className="w-4 h-4 mr-4 text-gray-900" /> 12 Articles</li>
                </ul>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mt-4">
                With over 15 years of experience in market analysis and fintech solutions, {post.author?.name} has dedicated their career to demystifying complex financial concepts. Their work has been featured in major financial publications and they actively consult for Fortune 500 companies on risk management and sustainable finance strategies.
              </p>
            </div>

          </div>

          {/* 
             Right Column Placeholder. 
             Since the actual card is fixed absolute to the top header via z-index, 
             we don't need content here unless we want to pad it for layout balance.
          */}
          <div className="hidden lg:block lg:w-[35%]">
            {/* Empty space preserving the grid layout for the absolutely positioned preview card above */}
          </div>

        </div>
      </div>

      {/* Flat Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="bg-white border-t border-gray-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">More articles by {post.author?.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} className="group cursor-pointer">
                  <div className="aspect-video relative mb-3 border border-gray-200 shadow-sm overflow-hidden bg-gray-100">
                    <img
                      src={relatedPost.image || getFallbackImage(relatedPost.id)}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:opacity-90"
                      onError={(e) => {
                        e.currentTarget.src = getFallbackImage(relatedPost.id);
                      }}
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="font-bold text-base text-gray-900 leading-tight mb-1 line-clamp-2 group-hover:text-black">
                    <Link to={`/blog/${relatedPost.id}`}>
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <div className="text-xs text-gray-600 mb-1">{relatedPost.author?.name}</div>
                  <div className="flex items-center text-xs mb-1">
                    <span className="text-[#b4690e] font-bold mr-1">4.6</span>
                    <div className="flex text-[#b4690e]">
                      <FontAwesomeIcon icon={faCalendar} className="h-2.5 w-2.5" />
                      <FontAwesomeIcon icon={faCalendar} className="h-2.5 w-2.5" />
                      <FontAwesomeIcon icon={faCalendar} className="h-2.5 w-2.5" />
                      <FontAwesomeIcon icon={faCalendar} className="h-2.5 w-2.5" />
                      <FontAwesomeIcon icon={faCalendar} className="h-2.5 w-2.5 text-gray-300" />
                    </div>
                    <span className="text-gray-500 ml-1">(1,245)</span>
                  </div>
                  <div className="font-bold text-gray-900">
                    Free
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;