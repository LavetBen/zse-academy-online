import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faUsers, faAward, faArrowTrendUp, faCheckCircle, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const team = [
  {
    name: "Dr. Sarah Mukamuri",
    role: "Chief Executive Officer",
    bio: "Former ZSE executive with 15+ years in financial markets. PhD in Finance from University of Zimbabwe.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b1b0?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "James Chigumba",
    role: "Head of Technical Analysis",
    bio: "Certified Market Technician with expertise in Zimbabwe and African markets. 12 years trading experience.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Prof. Michael Tendai",
    role: "Portfolio Management Director",
    bio: "Professor of Finance, published researcher, and portfolio manager with institutional investment experience.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face"
  },
  {
    name: "Alice Nyamadzawo",
    role: "Risk Management Specialist",
    bio: "Former bank risk officer with specialized knowledge in emerging market risk assessment and mitigation.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face"
  }
];

const values = [
  {
    icon: faBullseye,
    title: "Excellence in Education",
    description: "We deliver world-class financial education tailored to Zimbabwe's unique market environment."
  },
  {
    icon: faUsers,
    title: "Student Success",
    description: "Our students' career advancement and financial success is our primary measure of achievement."
  },
  {
    icon: faAward,
    title: "Industry Recognition",
    description: "Our certifications are recognized by leading financial institutions across Zimbabwe and beyond."
  },
  {
    icon: faArrowTrendUp,
    title: "Continuous Innovation",
    description: "We constantly update our curriculum to reflect latest market trends and best practices."
  }
];

const achievements = [
  "5,000+ professionals trained since 2018",
  "98% course completion rate",
  "Average 35% salary increase post-certification",
  "Partnerships with 15+ financial institutions",
  "Recognized by ZSE as preferred training partner",
  "International accreditation from CFA Institute"
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-hero text-white py-16">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              About ZSE Training
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Zimbabwe's premier financial education platform, empowering professionals 
              to excel in stock exchange operations and financial markets
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To democratize access to high-quality financial education in Zimbabwe, 
                empowering individuals and institutions with the knowledge and skills 
                needed to thrive in modern financial markets.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We bridge the gap between theoretical knowledge and practical application, 
                ensuring our students are job-ready and capable of making informed 
                investment decisions in Zimbabwe's evolving economic landscape.
              </p>
              <Button size="lg" variant="hero">
                Join Our Community
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">5K+</div>
                <div className="text-muted-foreground">Students Trained</div>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Expert Instructors</div>
              </div>
              <div className="bg-primary/10 rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">6</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-accent/30">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="card-gradient text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={value.icon} className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry veterans with decades of combined experience in Zimbabwe's financial markets
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-hover text-center">
                <CardHeader>
                  <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-secondary text-white">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Our Achievements
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Milestones that demonstrate our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faCheckCircle} className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="text-blue-100">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;