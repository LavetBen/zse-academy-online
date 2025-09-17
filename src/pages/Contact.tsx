import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "info@zsetraining.co.zw",
    subtitle: "We'll respond within 24 hours"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+263 4 751 951",
    subtitle: "Mon-Fri, 8:00 AM - 5:00 PM"
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: "ZSE Building, Sam Nujoma Street",
    subtitle: "Harare, Zimbabwe"
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: "Monday - Friday: 8:00 AM - 5:00 PM",
    subtitle: "Saturday: 9:00 AM - 1:00 PM"
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
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-hero text-white py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Have questions about our courses? Need guidance on your learning path? 
              We're here to help you succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-accent/30">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-gradient text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <info.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-secondary mb-2">{info.details}</p>
                  <p className="text-sm text-muted-foreground">{info.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Send us a Message
              </h2>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+263 xxx xxx xxx"
                        />
                      </div>
                      <div>
                        <Label htmlFor="inquiry">Inquiry Type *</Label>
                        <Select value={formData.inquiry} onValueChange={(value) => handleInputChange("inquiry", value)}>
                          <SelectTrigger>
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

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Brief subject of your message"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        placeholder="Please provide details about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="hero"
                  className="w-full"
                  disabled={isLoading}
                >
                      {isLoading ? (
                        "Sending..."
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Why Choose ZSE Training?
              </h2>
              
              <div className="space-y-6">
                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-3">
                      Expert Support Team
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our dedicated support team consists of financial experts and education 
                      specialists ready to assist you with any questions about courses, 
                      enrollment, or career guidance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-3">
                      Corporate Training Solutions
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      We offer customized training programs for financial institutions, 
                      corporations, and government agencies. Contact us to discuss 
                      tailored solutions for your organization.
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-gradient">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-3">
                      Partnership Opportunities
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Interested in partnering with us? We collaborate with educational 
                      institutions, professional bodies, and industry organizations to 
                      expand access to quality financial education.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;