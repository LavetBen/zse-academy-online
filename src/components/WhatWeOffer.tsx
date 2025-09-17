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
    <section className="section-padding bg-background">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive training solutions designed to accelerate your success in Zimbabwe's stock exchange
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-gradient card-hover border-0">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl text-secondary">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary hover:text-white">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-secondary text-white rounded-3xl p-8 lg:p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-blue-200">Active Students</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">98%</div>
              <div className="text-blue-200">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">15+</div>
              <div className="text-blue-200">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">50+</div>
              <div className="text-blue-200">Course Modules</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};