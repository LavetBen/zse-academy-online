import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faArrowRight,
  faPhone,
  faClock,
  faMapMarkerAlt,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/hooks/use-toast";

// Main Accent Color
const PRIMARY_HEX = "#4785FF";

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
        title: "Message Sent",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 font-sans">
      <Navbar />
      
      {/* Main Content */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column: Contact Information */}
            <div className="space-y-10 lg:pr-10">
              {/* Header */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-sm text-primary font-medium mb-2">
                  <div className="w-6 h-px bg-primary"></div>
                  CONTACT US
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight">
                  Let's <span className="font-semibold text-primary">talk</span>
                </h1>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-lg">
                  Get in touch with our team. We're here to help with any questions about our services, enrollment, or technical support.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">Phone</h3>
                    <p className="text-lg font-semibold text-primary mt-1">+263 4 751 951</p>
                    <p className="text-sm text-neutral-500 mt-1">Mon–Fri, 8:00 AM – 4:30 PM </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">Email</h3>
                    <p className="text-lg font-semibold text-primary mt-1">info@zsetraining.co.zw</p>
                    <p className="text-sm text-neutral-500 mt-1">Typically responds within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-900">Visit Us</h3>
                    <p className="text-neutral-700 mt-1">44 Ridgeway North Highlands, Harare</p>
                  </div>
                </div>
              </div>

              
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <Card className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-neutral-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-sm font-medium text-neutral-700">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="John Doe"
                        className="h-11 bg-white border-neutral-200 rounded-lg focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="h-11 bg-white border-neutral-200 rounded-lg focus:border-primary focus:ring-primary/20"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Inquiry */}
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-sm font-medium text-neutral-700">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+263 xxx xxx xxx"
                        className="h-11 bg-white border-neutral-200 rounded-lg focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="inquiry" className="text-sm font-medium text-neutral-700">
                        Inquiry Type
                      </Label>
                      <Select 
                        value={formData.inquiry} 
                        onValueChange={(value) => handleInputChange("inquiry", value)}
                      >
                        <SelectTrigger className="h-11 bg-white border-neutral-200 rounded-lg focus:border-primary focus:ring-primary/20">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-neutral-200">
                          <SelectItem value="course-info">Course Information</SelectItem>
                          <SelectItem value="enrollment">Enrollment Support</SelectItem>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="corporate">Corporate Training</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-3">
                    <Label htmlFor="subject" className="text-sm font-medium text-neutral-700">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="How can we help you?"
                      className="h-11 bg-white border-neutral-200 rounded-lg focus:border-primary focus:ring-primary/20"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-sm font-medium text-neutral-700">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Please share details about your inquiry..."
                      rows={5}
                      className="bg-white border-neutral-200 rounded-lg focus:border-primary focus:ring-primary/20 resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Sending...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          Send Message
                          <FontAwesomeIcon 
                            icon={faArrowRight} 
                            className="h-3 w-3 group-hover:translate-x-1 transition-transform" 
                          />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours Banner */}
      <div className="border-t border-neutral-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Office Hours</p>
                <p className="font-medium text-neutral-900">Monday - Friday: 8:00 AM - 4:30 PM</p>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-neutral-200"></div>
            <p className="text-sm text-neutral-500">
              We strive to respond to all inquiries within 24 hours during business days.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;