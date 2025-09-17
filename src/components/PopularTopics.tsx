import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, BarChart3, Star } from "lucide-react";

// Images
import forexImg from "@/assets/hero-image.jpg";
import analysisImg from "@/assets/hero-image.jpg";
import marketsImg from "@/assets/hero-image.jpg";

const allTopics = [
  {
    icon: TrendingUp,
    title: "Forex Trading Basics",
    description: "Learn how to trade Forex and navigate currency markets effectively.",
    students: "1,200",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.5,
    reviews: 220,
    badge: "Bestseller",
    image: forexImg,
    category: "Forex",
  },
  {
    icon: BarChart3,
    title: "Technical Analysis",
    description: "Master chart patterns, indicators, and trading strategies.",
    students: "900",
    duration: "5 weeks",
    level: "Intermediate",
    rating: 4.7,
    reviews: 180,
    badge: "",
    image: analysisImg,
    category: "Analysis",
  },
  {
    icon: DollarSign,
    title: "Financial Markets Overview",
    description: "Understanding bonds, equities, and derivatives in the Zimbabwe Stock Exchange.",
    students: "800",
    duration: "8 weeks",
    level: "Advanced",
    rating: 4.6,
    reviews: 150,
    badge: "Premium",
    image: marketsImg,
    category: "Markets",
  }
];

const topicChips = ["All", "Forex", "Analysis", "Markets"];

export const PopularTopics = () => {
  const [activeChip, setActiveChip] = useState("All");

  const filteredTopics = activeChip === "All" 
    ? allTopics 
    : allTopics.filter(topic => topic.category === activeChip);

  return (
    <section className="section-padding bg-accent/30">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-2">
            ZSE Forex & Trading Courses
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
            Build your trading skills and gain expertise in Zimbabwe's financial markets.
          </p>
        </div>

        {/* Chips */}
        <div className="flex space-x-3 overflow-x-auto py-4 mb-6 scrollbar-hide">
          {topicChips.map((chip, index) => (
            <button
              key={index}
              onClick={() => setActiveChip(chip)}
              className={`flex-shrink-0 px-5 py-2 rounded-full font-medium transition-colors ${
                activeChip === chip
                  ? "bg-primary text-white"
                  : "bg-white text-muted-foreground hover:bg-primary hover:text-white"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic, index) => (
            <Card 
              key={index} 
              className="bg-white rounded-lg overflow-hidden border hover:shadow-xl transition-transform hover:scale-[1.02]"
            >
              {/* Course Image */}
              <div className="relative">
                <img 
                  src={topic.image} 
                  alt={topic.title} 
                  className="w-full h-40 object-cover" 
                />
                {topic.badge && (
                  <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-md">
                    {topic.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <topic.icon className="h-5 w-5 text-primary mr-2" />
                  <h3 className="text-lg font-semibold">{topic.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{topic.description}</p>

                {/* Rating */}
                <div className="flex items-center text-sm text-yellow-500 mb-2">
                  <span className="font-medium mr-1">{topic.rating}</span>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.round(topic.rating) ? "fill-yellow-500 text-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-muted-foreground">({topic.reviews})</span>
                </div>

                {/* Meta */}
                <div className="flex justify-between text-xs text-muted-foreground mb-4">
                  <span>{topic.students} students</span>
                  <span>{topic.duration}</span>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                    {topic.level}
                  </span>
                  <Button variant="outline" size="sm" className="hover:bg-primary hover:text-white">
                    Learn More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Show All */}
        <div className="text-left mt-8">
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
            Show All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};
