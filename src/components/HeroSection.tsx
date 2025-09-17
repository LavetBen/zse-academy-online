import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Users, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const HeroSection = () => {
  return (
    <section className="relative bg-hero text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Zimbabwe Stock Exchange Training"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary/80" />
      </div>

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left animate-fade-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Master the{" "}
              <span className="text-gradient bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                Zimbabwe Stock Exchange
              </span>{" "}
              Today
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
              Professional training courses designed to help you succeed in Zimbabwe's financial markets.
              Learn from industry experts and advance your career.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Link to="/signup">
                <Button size="lg" variant="hero" className="text-lg px-8 py-4">
                  Start Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-blue-200 border-2 border-white flex items-center justify-center text-xs font-semibold text-primary"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <span className="text-blue-100">5,000+ Students</span>
              </div>
            </div>
          </div>

          {/* Hero Cards */}
          <div className="relative animate-slide-in">
            <div className="grid gap-6">
              {/* Main Feature Card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Certified Training</h3>
                    <p className="text-blue-200 text-sm">Industry-recognized certificates</p>
                  </div>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
                <p className="text-blue-200 text-sm mt-2">87.5% completion rate</p>
              </div>

              {/* Secondary Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">12+</div>
                  <div className="text-blue-200 text-sm">Expert Instructors</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-blue-200 text-sm">Course Modules</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};