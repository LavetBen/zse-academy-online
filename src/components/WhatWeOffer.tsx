import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, FileText, Users, Award, Clock, Globe } from "lucide-react";

const features = [
  {
    icon: Video,
    title: "Interactive Video Lessons",
    description: "High-quality video content with interactive elements and real-time examples from ZSE trading floors.",
    highlights: ["HD Quality", "Interactive", "Real Examples"]
  },
  {
    icon: FileText,
    title: "Comprehensive Materials",
    description: "Downloadable resources, practice exercises, and case studies based on actual ZSE scenarios.",
    highlights: ["PDF Resources", "Practice Tests", "Case Studies"]
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from seasoned professionals with years of experience in Zimbabwe's financial markets.",
    highlights: ["Industry Veterans", "Mentorship", "Live Sessions"]
  },
  {
    icon: Award,
    title: "Professional Certificates",
    description: "Earn industry-recognized certificates that boost your career prospects in financial services.",
    highlights: ["Accredited", "Career Boost", "Recognized"]
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials and updates.",
    highlights: ["Self-Paced", "Lifetime Access", "Mobile Friendly"]
  },
  {
    icon: Globe,
    title: "Community Support",
    description: "Join a vibrant community of learners and professionals for networking and support.",
    highlights: ["Active Community", "Networking", "24/7 Support"]
  }
];

export const WhatWeOffer = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4 text-center">
            What We Offer
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-center">
            Comprehensive training solutions designed to accelerate your success in Zimbabwe's stock exchange
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="text-left">
                <div className="w-16 h-16 bg-gradient-to-tr from-primary/10 to-blue-200/30 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-secondary text-left">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed text-gray-600 text-left">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-gradient-to-r from-primary/10 to-blue-100 text-primary hover:from-primary hover:to-blue-600 hover:text-white transition-colors"
                    >
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#0B1E39] via-indigo-900 to-blue-800 text-white p-10 lg:p-14 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-extrabold text-primary mb-2">5,000+</div>
              <div className="text-blue-200">Active Students</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-extrabold text-primary mb-2">98%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-extrabold text-primary mb-2">15+</div>
              <div className="text-blue-200">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-extrabold text-primary mb-2">50+</div>
              <div className="text-blue-200">Course Modules</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
