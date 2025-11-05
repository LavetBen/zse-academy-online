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
  faShare
} from "@fortawesome/free-solid-svg-icons";

const blogPosts = [
  {
    id: 1,
    title: "Understanding ZSE Market Trends in 2024",
    excerpt: "Comprehensive analysis of current market trends and what they mean for investors in Zimbabwe's financial sector. Explore the latest developments and future outlook.",
    content: `
      <h2>Introduction to Market Trends</h2>
      <p>The Zimbabwe Stock Exchange (ZSE) has shown remarkable resilience and growth patterns throughout 2024. As we analyze the current market landscape, several key trends emerge that are reshaping investment strategies and opportunities across the sector.</p>
      
      <h2>Key Market Indicators</h2>
      <p>Throughout 2024, we've witnessed significant movements in the ZSE All Share Index, with particular strength in the mining and banking sectors. The market capitalization has grown by approximately 15% year-to-date, reflecting increased investor confidence and improved economic fundamentals.</p>
      
      <h3>Sector Performance Analysis</h3>
      <p>The mining sector has been the standout performer, driven by favorable commodity prices and increased production capacity. Banking stocks have also shown strong performance, benefiting from improved lending conditions and digital transformation initiatives.</p>
      
      <h2>Investment Implications</h2>
      <p>For investors, these trends suggest several strategic considerations. Diversification across sectors remains crucial, while maintaining a focus on fundamentally strong companies with solid management teams and competitive advantages.</p>
      
      <h2>Future Outlook</h2>
      <p>Looking ahead, we expect continued volatility but underlying growth momentum. The key will be staying informed and maintaining a long-term perspective while being tactical about entry and exit points.</p>
      
      <h2>Conclusion</h2>
      <p>Understanding market trends is essential for successful investing. By staying informed and adapting to changing conditions, investors can position themselves to capitalize on emerging opportunities in the ZSE.</p>
    `,
    author: "Dr Mukamuri",
    date: "December 15, 2024",
    category: "Market Analysis",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    tags: ["ZSE", "Market Trends", "Analysis", "2024"]
  },
  {
    id: 2,
    title: "Top 5 Investment Strategies for Beginners",
    excerpt: "Essential investment strategies every beginner should know before entering the Zimbabwe Stock Exchange. Learn from the experts and start your journey.",
    content: `
      <h2>Getting Started with Investing</h2>
      <p>Investing in the stock market can seem daunting for beginners, but with the right strategies and mindset, anyone can build a successful investment portfolio. This guide outlines five fundamental strategies that will set you on the path to investment success.</p>
      
      <h2>Strategy 1: Start with What You Know</h2>
      <p>Begin your investment journey by researching companies and sectors you understand. If you work in banking, start by analyzing banking stocks. Familiarity with a sector gives you an edge in understanding business dynamics and making informed decisions.</p>
      
      <h2>Strategy 2: Diversification is Key</h2>
      <p>Never put all your eggs in one basket. Spread your investments across different sectors and asset classes to minimize risk. A well-diversified portfolio typically includes stocks from mining, banking, manufacturing, and other key sectors.</p>
      
      <h2>Strategy 3: Invest Regularly</h2>
      <p>Use dollar-cost averaging by investing fixed amounts regularly, regardless of market conditions. This strategy reduces the impact of market volatility and helps build wealth over time.</p>
      
      <h2>Strategy 4: Think Long-Term</h2>
      <p>Successful investing requires patience. Focus on companies with strong fundamentals and hold them for the long term. Short-term market fluctuations shouldn't derail your investment strategy.</p>
      
      <h2>Strategy 5: Continue Learning</h2>
      <p>The market constantly evolves. Stay informed through courses, books, financial news, and market analysis. The more you learn, the better equipped you'll be to make sound investment decisions.</p>
    `,
    author: "Dr Chigumba",
    date: "December 12, 2024",
    category: "Investment Tips",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    tags: ["Investment", "Beginners", "Strategy", "Tips"]
  },
  {
    id: 3,
    title: "Risk Management in Volatile Markets",
    excerpt: "Learn how to protect your investments during market uncertainty with proven risk management techniques. Essential knowledge for every investor.",
    content: `
      <h2>Understanding Market Volatility</h2>
      <p>Market volatility is an inherent characteristic of stock markets worldwide, and the ZSE is no exception. While volatility can create opportunities, it also poses significant risks that investors must manage effectively.</p>
      
      <h2>Essential Risk Management Techniques</h2>
      <p>Successful investors employ multiple risk management strategies to protect their capital while maintaining growth potential.</p>
      
      <h3>Position Sizing</h3>
      <p>Never allocate more than 5-10% of your portfolio to a single investment. This ensures that even if one investment performs poorly, your overall portfolio remains healthy.</p>
      
      <h3>Stop-Loss Orders</h3>
      <p>Set predetermined exit points for your investments. If a stock falls below a certain level, having a stop-loss order can prevent catastrophic losses.</p>
      
      <h3>Portfolio Rebalancing</h3>
      <p>Regularly review and adjust your portfolio to maintain your desired asset allocation. Market movements can cause your portfolio to drift from its target allocation.</p>
      
      <h2>Emotional Discipline</h2>
      <p>Perhaps the most important aspect of risk management is controlling emotions. Fear and greed are the enemies of successful investing. Stick to your strategy and avoid making impulsive decisions based on short-term market movements.</p>
      
      <h2>Conclusion</h2>
      <p>Risk management is not about avoiding risk entirely—it's about understanding, measuring, and controlling it. By implementing these strategies, you can navigate volatile markets with confidence.</p>
    `,
    author: "Dr Tendai",
    date: "December 10, 2024",
    category: "Risk Management",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop",
    tags: ["Risk Management", "Volatility", "Protection", "Markets"]
  },
  {
    id: 4,
    title: "Digital Banking Revolution in Zimbabwe",
    excerpt: "How digital banking is transforming the financial landscape in Zimbabwe and what it means for investors and businesses moving forward.",
    content: `
      <h2>The Digital Transformation</h2>
      <p>Zimbabwe's banking sector is undergoing a profound digital transformation that is reshaping how financial services are delivered and consumed. This revolution is creating new investment opportunities and changing the competitive landscape.</p>
      
      <h2>Mobile Banking Growth</h2>
      <p>Mobile banking adoption has surged, with millions of Zimbabweans now accessing financial services through their smartphones. This shift has reduced operational costs for banks while expanding access to previously underserved populations.</p>
      
      <h2>Investment Implications</h2>
      <p>Banks investing heavily in digital infrastructure are positioning themselves for long-term success. Look for institutions with strong mobile platforms, innovative products, and growing digital transaction volumes.</p>
      
      <h2>Fintech Partnerships</h2>
      <p>Traditional banks are increasingly partnering with fintech companies to accelerate innovation. These partnerships are creating new revenue streams and improving customer experiences.</p>
      
      <h2>The Road Ahead</h2>
      <p>Digital banking is not just a trend—it's the future of financial services. Investors who recognize and capitalize on this transformation early stand to benefit significantly.</p>
    `,
    author: "Chipo Madziva",
    date: "December 8, 2024",
    category: "Fintech",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
    tags: ["Digital Banking", "Fintech", "Zimbabwe", "Innovation"]
  },
  {
    id: 5,
    title: "Currency Dynamics and Investment Impact",
    excerpt: "Understanding how currency fluctuations affect investment decisions in the Zimbabwean context. A comprehensive guide for investors.",
    content: `
      <h2>Currency Challenges in Zimbabwe</h2>
      <p>Zimbabwe's complex currency environment presents both challenges and opportunities for investors. Understanding these dynamics is crucial for making informed investment decisions.</p>
      
      <h2>Multi-Currency System</h2>
      <p>The current multi-currency system affects how companies report earnings, manage operations, and deliver returns to shareholders. Investors must understand these implications when analyzing investments.</p>
      
      <h2>Hedging Strategies</h2>
      <p>Companies with strong export revenues or foreign currency earnings provide natural hedges against local currency volatility. These businesses often represent more stable investment opportunities.</p>
      
      <h2>Valuation Considerations</h2>
      <p>Currency dynamics affect asset valuations and investment returns. Investors should consider both nominal and real returns when evaluating investment performance.</p>
      
      <h2>Strategic Positioning</h2>
      <p>By understanding currency dynamics, investors can position their portfolios to benefit from currency movements while managing associated risks.</p>
    `,
    author: "Robert Mapfumo",
    date: "December 5, 2024",
    category: "Currency Analysis",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop",
    tags: ["Currency", "Investment", "Analysis", "Economics"]
  },
  {
    id: 6,
    title: "Sustainable Investing in African Markets",
    excerpt: "The rise of ESG investing in Africa and how Zimbabwe is positioning itself in the sustainable investment landscape.",
    content: `
      <h2>The ESG Revolution</h2>
      <p>Environmental, Social, and Governance (ESG) investing is transforming global markets, and Africa is no exception. Zimbabwe is increasingly embracing sustainable investment practices.</p>
      
      <h2>Why ESG Matters</h2>
      <p>Companies with strong ESG practices typically demonstrate better risk management, operational efficiency, and long-term value creation. These factors translate into superior investment returns over time.</p>
      
      <h2>ESG in Zimbabwe</h2>
      <p>Leading Zimbabwean companies are adopting ESG frameworks, improving corporate governance, and implementing sustainable business practices. This trend is creating new investment opportunities.</p>
      
      <h2>Measuring ESG Performance</h2>
      <p>Investors should evaluate companies based on ESG metrics alongside traditional financial measures. This holistic approach provides a more complete picture of investment quality.</p>
      
      <h2>The Future of Sustainable Investing</h2>
      <p>As global capital increasingly flows toward sustainable investments, Zimbabwean companies with strong ESG credentials will attract more investment and achieve premium valuations.</p>
    `,
    author: "Dr. Patience Gombe",
    date: "December 3, 2024",
    category: "Sustainable Finance",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
    tags: ["ESG", "Sustainable", "Africa", "Investment"]
  }
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-background font-poppins">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
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

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

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
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline">
                  <FontAwesomeIcon icon={faTag} className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t">
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCalendar} className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
                  <span>{post.readTime}</span>
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
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
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
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
