import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Understanding ZSE Market Trends in 2024",
    excerpt: "Comprehensive analysis of current market trends and what they mean for investors in Zimbabwe's financial sector.",
    author: "Dr. Sarah Mukamuri",
    date: "December 15, 2024",
    category: "Market Analysis",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=240&fit=crop"
  },
  {
    title: "Top 5 Investment Strategies for Beginners",
    excerpt: "Essential investment strategies every beginner should know before entering the Zimbabwe Stock Exchange.",
    author: "James Chigumba",
    date: "December 12, 2024",
    category: "Investment Tips",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop"
  },
  {
    title: "Risk Management in Volatile Markets",
    excerpt: "Learn how to protect your investments during market uncertainty with proven risk management techniques.",
    author: "Prof. Michael Tendai",
    date: "December 10, 2024",
    category: "Risk Management",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=240&fit=crop"
  }
];

export const BlogPreview = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4 text-center">
            Latest Market Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center">
            Stay informed with expert analysis and insights from Zimbabwe's financial markets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="card-hover overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="text-left">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-xl line-clamp-2 text-left">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3 text-left">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 group">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="hover:bg-primary hover:text-white">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};