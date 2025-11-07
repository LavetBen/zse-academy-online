import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTrendUp, faDollarSign, faChartColumn, faStar, faUsers, faClock, faChartLine } from "@fortawesome/free-solid-svg-icons";

// Images
import forexImg from "@/assets/hero-image.jpg";
import analysisImg from "@/assets/hero-image.jpg";
import marketsImg from "@/assets/hero-image.jpg";

const allTopics = [
  {
    id: 1,
    title: "Forex Trading Basics",
    description: "Learn how to trade Forex and navigate currency markets effectively with practical strategies.",
    students: "1,200",
    duration: "6 weeks",
    level: "Beginner",
    rating: 4.5,
    reviews: 220,
    badge: "Bestseller",
    image: forexImg,
    category: "Forex",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Technical Analysis",
    description: "Master chart patterns, indicators, and advanced trading strategies for market success.",
    students: "900",
    duration: "5 weeks",
    level: "Intermediate",
    rating: 4.7,
    reviews: 180,
    badge: "Hot",
    image: analysisImg,
    category: "Analysis",
    color: "bg-green-500",
  },
  {
    id: 3,
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
    color: "bg-purple-500",
  },
];

export const PopularTopics = () => {
  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Bestseller": return "bg-orange-500";
      case "Premium": return "bg-purple-600";
      case "Hot": return "bg-red-500";
      case "New": return "bg-green-500";
      default: return "bg-primary";
    }
  };

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50/30 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Left Aligned */}
        <div className="mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium mb-3">
            <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
            Most Popular Courses
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-3">
            Master Financial Markets
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Build your trading skills with expert-led courses designed for Zimbabwe's unique financial landscape
          </p>
        </div>

        {/* Enhanced Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {allTopics.map((topic) => (
            <Card 
              key={topic.id} 
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Course Image with Gradient Overlay */}
              <div className="relative overflow-hidden">
                <img 
                  src={topic.image} 
                  alt={topic.title} 
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Badge */}
                {topic.badge && (
                  <span className={`absolute top-3 left-3 ${getBadgeColor(topic.badge)} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
                    {topic.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                {/* Level Badge */}
                <div className="flex justify-between items-start mb-2 sm:mb-3">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    topic.level === "Beginner" ? "bg-green-100 text-green-600" :
                    topic.level === "Intermediate" ? "bg-blue-100 text-blue-600" :
                    "bg-purple-100 text-purple-600"
                  }`}>
                    {topic.level}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg sm:text-xl font-bold text-secondary mb-2 sm:mb-3 leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                  {topic.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${
                          i < Math.floor(topic.rating) 
                            ? "text-yellow-400 fill-yellow-400" 
                            : i < topic.rating 
                            ? "text-yellow-400 fill-yellow-400 opacity-50" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-secondary mr-1 text-sm">{topic.rating}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">({topic.reviews})</span>
                </div>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUsers} className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{topic.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faClock} className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{topic.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="text-left">
                    <span className="text-lg sm:text-xl font-bold text-secondary">Free</span>
                  </div>
                  <Link to={`/courses/${topic.id}`} className="flex-1 max-w-[120px] sm:max-w-[140px]">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg text-xs sm:text-sm">
                      Enroll Now
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Button - Left Aligned */}
        <div className="text-left mt-8 sm:mt-12">
          <Button variant="outline" className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-lg font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};