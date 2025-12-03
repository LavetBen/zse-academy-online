import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faPhone, 
  faMapMarker, 
  faClock, 
  faPaperPlane,
  faHeadset,
  faUsers,
  faHandshake,
  faShieldAlt,
  faRocket
} from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: faEnvelope,
    title: "Email Us",
    details: "info@zsetraining.co.zw",
    subtitle: "We'll respond within 24 hours",
    gradient: "from-blue-500/10 to-blue-600/5",
    color: "text-blue-600"
  },
  {
    icon: faPhone,
    title: "Call Us",
    details: "+263 4 751 951",
    subtitle: "Mon-Fri, 8:00 AM - 5:00 PM",
    gradient: "from-green-500/10 to-green-600/5",
    color: "text-green-600"
  },
  {
    icon: faMapMarker,
    title: "Visit Our Office",
    details: "ZSE Building, Sam Nujoma Street",
    subtitle: "Harare, Zimbabwe",
    gradient: "from-purple-500/10 to-purple-600/5",
    color: "text-purple-600"
  },
  {
    icon: faClock,
    title: "Office Hours",
    details: "Monday - Friday: 8:00 AM - 5:00 PM",
    subtitle: "Saturday: 9:00 AM - 1:00 PM",
    gradient: "from-orange-500/10 to-orange-600/5",
    color: "text-orange-600"
  }
];

const features = [
  {
    icon: faHeadset,
    title: "24/7 Online Support",
    description: "Access our comprehensive knowledge base and get help anytime through our online portal",
    gradient: "from-blue-500/10 to-cyan-500/5",
    color: "text-blue-600"
  },
  {
    icon: faUsers,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of experience in financial markets",
    gradient: "from-green-500/10 to-emerald-500/5",
    color: "text-green-600"
  },
  {
    icon: faHandshake,
    title: "Partnership Programs",
    description: "Collaborate with us to create customized training solutions for your organization",
    gradient: "from-purple-500/10 to-violet-500/5",
    color: "text-purple-600"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    inquiry: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        inquiry: "",
        message: ""
      });
      toast({
        title: "🎉 Message Sent Successfully!",
        description: "We'll get back to you within 24 hours. Thank you for reaching out!",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-r from-primary via-primary/95 to-secondary text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get in <span className="text-blue-200">Touch</span>
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Have questions about our courses? Need guidance on your learning path? 
              We're here to help you succeed in your financial education journey.
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Information */}
      <section className="section-padding bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
              How Can We Help You?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the most convenient way to reach out to our dedicated support team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className="relative group bg-white/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <CardHeader className="relative z-10 pb-4">
                  <div className={`w-20 h-20 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon icon={info.icon} className={`h-8 w-8 ${info.color}`} />
                  </div>
                  <CardTitle className="text-xl text-center text-secondary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                    {info.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 text-center">
                  <p className="font-bold text-lg text-foreground mb-2">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form & Features */}
      <section className="section-padding bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Enhanced Form Section */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
              
              <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-border/50 shadow-soft p-1">
                <div className="bg-gradient-to-br from-white to-slate-50/80 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                      <FontAwesomeIcon icon={faPaperPlane} className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-secondary">
                        Send us a Message
                      </h2>
                      <p className="text-muted-foreground">We'd love to hear from you</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          className="h-12 bg-white/50 border-border/50 focus:border-primary/50 transition-colors"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          className="h-12 bg-white/50 border-border/50 focus:border-primary/50 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+263 xxx xxx xxx"
                          className="h-12 bg-white/50 border-border/50 focus:border-primary/50 transition-colors"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="inquiry" className="text-sm font-semibold">Inquiry Type *</Label>
                        <Select value={formData.inquiry} onValueChange={(value) => handleInputChange("inquiry", value)}>
                          <SelectTrigger className="h-12 bg-white/50 border-border/50 focus:border-primary/50 transition-colors">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="course-info">Course Information</SelectItem>
                            <SelectItem value="enrollment">Enrollment Support</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                            <SelectItem value="corporate">Corporate Training</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-semibold">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject of your message"
                        className="h-12 bg-white/50 border-border/50 focus:border-primary/50 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                        className="bg-white/50 border-border/50 focus:border-primary/50 resize-none transition-colors"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full h-14 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold text-lg shadow-medium hover:shadow-strong transition-all duration-300 transform hover:-translate-y-0.5"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          Send Message
                          <FontAwesomeIcon icon={faRocket} className="h-5 w-5" />
                        </div>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            {/* Enhanced Features Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-6">
                  Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ZSE Training</span>?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We're committed to providing exceptional support and building lasting relationships with our students and partners.
                </p>
              </div>
              
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <Card 
                    key={index} 
                    className="group bg-white/80 backdrop-blur-sm border-border/50 shadow-soft hover:shadow-medium transition-all duration-500 hover:-translate-y-1 overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <FontAwesomeIcon icon={feature.icon} className={`h-6 w-6 ${feature.color}`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-secondary mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Trust Badge */}
                <Card className="bg-gradient-to-br from-slate-50 to-blue-50/50 border-blue-200/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <FontAwesomeIcon icon={faShieldAlt} className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary mb-1">Trust & Reliability</h4>
                        <p className="text-sm text-muted-foreground">
                          Backed by Zimbabwe Stock Exchange with decades of financial expertise
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">500+</div>
                  <div className="text-xs text-muted-foreground">Students Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary mb-1">24h</div>
                  <div className="text-xs text-muted-foreground">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">98%</div>
                  <div className="text-xs text-muted-foreground">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary via-primary/95 to-secondary rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/5 rounded-full"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Start Your Financial Journey?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of successful students who have transformed their careers with ZSE Training
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-blue-50 font-semibold text-lg px-8 py-3"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Explore Our Courses
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;