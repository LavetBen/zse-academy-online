import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, BarChart3, Target, Users, Shield } from "lucide-react";

const topics = [
  {
    icon: TrendingUp,
    title: "Stock Market Fundamentals",
    description: "Learn the basics of stock trading, market analysis, and investment strategies.",
    students: "2,340",
    duration: "8 weeks",
    level: "Beginner"
  },
  {
    icon: BarChart3,
    title: "Technical Analysis",
    description: "Master chart patterns, indicators, and technical trading strategies.",
    students: "1,890",
    duration: "6 weeks",
    level: "Intermediate"
  },
  {
    icon: DollarSign,
    title: "Financial Markets",
    description: "Understanding bonds, derivatives, and other financial instruments.",
    students: "1,567",
    duration: "10 weeks",
    level: "Advanced"
  },
  {
    icon: Target,
    title: "Risk Management",
    description: "Learn to identify, assess, and mitigate investment risks effectively.",
    students: "1,234",
    duration: "4 weeks",
    level: "Intermediate"
  },
  {
    icon: Users,
    title: "Portfolio Management",
    description: "Build and manage diversified investment portfolios for optimal returns.",
    students: "987",
    duration: "12 weeks",
    level: "Advanced"
  },
  {
    icon: Shield,
    title: "Compliance & Regulations",
    description: "Navigate ZSE regulations and compliance requirements effectively.",
    students: "756",
    duration: "6 weeks",
    level: "Professional"
  }
];

export const PopularTopics = () => {
  return (
    <section className="section-padding bg-accent/30">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            Popular Training Topics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our most sought-after courses designed by industry experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <Card key={index} className="card-hover group">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <topic.icon className="h-6 w-6 text-primary group-hover:text-white" />
                </div>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
                <CardDescription className="text-base">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                  <span>{topic.students} students</span>
                  <span>{topic.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    {topic.level}
                  </span>
                  <Button variant="ghost" size="sm" className="hover:text-primary">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="hero">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};