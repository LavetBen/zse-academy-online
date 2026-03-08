import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faChartLine,
  faGlobe,
  faDatabase,
  faMobileAlt,
  faDesktop,
  faShieldAlt,
  faRocket,
  faUsers,
  faArrowCircleUp,
  faBolt,
  faCheckCircle,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";

// Solid Color Palette (No Gradients)
const BLUE_COLORS = {
  primary: "#1E88E5",     // Light blue primary
  secondary: "#0D47A1",   // Dark blue for accents
  accent: "#2196F3",      // Bright light blue
  light: "#E3F2FD",       // Very light blue background
  darkBlue: "#0D3A6E",    // Dark blue for Core Principles section
  dark: "#000000",        // Black for text (as requested)
  gray: "#666666",        // Medium gray for secondary text
  border: "#CCE5FF",      // Light blue border
  success: "#00C853",     // Success green
  platformBlue: "#2196F3",
  platformCyan: "#00ACC1",
  platformIndigo: "#3949AB",
};

const coreValues = [
  {
    number: "01",
    title: "Innovation Driven",
    description: "We continuously innovate to provide cutting-edge solutions that meet the evolving needs of Zimbabwe's financial markets. Our technology-first approach ensures you stay ahead in today's digital economy.",
    icon: faRocket,
    features: ["AI-powered analytics", "Real-time market data", "Cloud-native architecture"]
  },
  {
    number: "02",
    title: "User-Centric Design",
    description: "Every platform we build is designed with the user experience in mind. Intuitive interfaces, seamless workflows, and responsive design ensure maximum productivity and satisfaction.",
    icon: faUsers,
    features: ["Intuitive interfaces", "Mobile-first design", "Personalized dashboards"]
  },
  {
    number: "03",
    title: "Reliability & Security",
    description: "Built with enterprise-grade security and 99.9% uptime guarantee. Your data is protected with bank-level encryption and comprehensive backup systems.",
    icon: faShieldAlt,
    features: ["Bank-level security", "99.9% uptime", "24/7 monitoring"]
  },
];

const platforms = [
  {
    name: "ZSE Direct",
    description: "Professional trading platform for Zimbabwe Stock Exchange with real-time quotes, advanced charting tools, and instant order execution. Access ZSE's full market depth and trading history.",
    icon: faChartLine,
    color: BLUE_COLORS.platformBlue,
    features: [
      "Real-time market data",
      "Advanced charting tools",
      "Instant order execution",
      "Portfolio tracking",
      "Market depth analysis"
    ],
    cta: "Start Trading"
  },
  {
    name: "VFEX Direct",
    description: "Comprehensive platform for Victoria Falls Stock Exchange trading. Trade in multiple currencies with advanced forex integration and international settlement capabilities.",
    icon: faGlobe,
    color: BLUE_COLORS.platformCyan,
    features: [
      "Multi-currency trading",
      "Forex integration",
      "International settlement",
      "Cross-border analytics",
      "Global market access"
    ],
    cta: "Explore VFEX"
  },
  {
    name: "Data Direct",
    description: "Advanced market data analytics platform with historical data, predictive analytics, and custom reporting. Perfect for research analysts and institutional investors.",
    icon: faDatabase,
    color: BLUE_COLORS.platformIndigo,
    features: [
      "Historical data archive",
      "Predictive analytics",
      "Custom reporting",
      "API integration",
      "Research tools"
    ],
    cta: "Access Data"
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Poppins', sans-serif", color: BLUE_COLORS.dark }}>
      <Navbar />

      {/* HERO SECTION - Left Aligned */}
      <section className="pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ 
          backgroundColor: BLUE_COLORS.light,
          opacity: 0.7 
        }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-left max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              Empowering <span style={{ color: BLUE_COLORS.primary }}>Digital Trading</span><br />
              Across Zimbabwe's<br />
              Financial Ecosystem
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl" style={{ color: BLUE_COLORS.gray }}>
              We provide cutting-edge trading platforms and data solutions for Zimbabwe Stock Exchange (ZSE), 
              Victoria Falls Exchange (VFEX), and comprehensive market data analytics. Our platforms are designed 
              for reliability, security, and exceptional user experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="px-8 py-4 text-lg font-semibold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{ 
                        backgroundColor: BLUE_COLORS.primary,
                        borderColor: BLUE_COLORS.primary,
                        color: "white"
                      }}>
                Get Started Free
                <FontAwesomeIcon icon={faArrowRight} className="ml-3 h-4 w-4" />
              </Button>
              
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold rounded-lg border-2"
                      style={{ 
                        borderColor: BLUE_COLORS.border,
                        color: BLUE_COLORS.dark 
                      }}>
                <FontAwesomeIcon icon={faCogs} className="mr-3 h-4 w-4" />
                Platform Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PRINCIPLES SECTION - Dark Blue Background */}
      <section className="py-20" style={{ backgroundColor: BLUE_COLORS.darkBlue }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Our <span style={{ color: BLUE_COLORS.accent }}>Core Principles</span>
            </h2>
            <p className="text-xl max-w-3xl text-gray-300">
              Building the future of Zimbabwe's financial technology with these foundational principles
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="text-left p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                   style={{ backgroundColor: "#1A4A8F", border: `1px solid ${BLUE_COLORS.accent}30` }}>
                <div className="flex items-start mb-8">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mr-6"
                       style={{ backgroundColor: `${BLUE_COLORS.accent}30` }}>
                    <FontAwesomeIcon 
                      icon={value.icon} 
                      style={{ color: BLUE_COLORS.accent }} 
                      className="h-7 w-7" 
                    />
                  </div>
                  <div>
                    <span className="text-4xl font-bold text-white">
                      {value.number}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {value.title}
                </h3>
                <p className="text-lg mb-6 leading-relaxed text-gray-300">
                  {value.description}
                </p>
                
                <div className="space-y-3">
                  {value.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <FontAwesomeIcon icon={faCheckCircle} className="mr-3 h-4 w-4" style={{ color: BLUE_COLORS.success }} />
                      <span className="text-gray-200">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS SECTION - Showcase with Left Alignment */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: BLUE_COLORS.dark }}>
              Our <span style={{ color: BLUE_COLORS.primary }}>Trading Platforms</span>
            </h2>
            <p className="text-xl max-w-3xl" style={{ color: BLUE_COLORS.gray }}>
              Comprehensive suite of professional trading and data platforms for Zimbabwe's financial markets
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} 
                    className="border rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white overflow-hidden group"
                    style={{ borderColor: BLUE_COLORS.border, borderTop: `6px solid ${platform.color}` }}>
                <CardContent className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mr-6"
                         style={{ backgroundColor: `${platform.color}20` }}>
                      <FontAwesomeIcon 
                        icon={platform.icon} 
                        style={{ color: platform.color }} 
                        className="h-8 w-8" 
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2" style={{ color: BLUE_COLORS.dark }}>
                        {platform.name}
                      </h3>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: BLUE_COLORS.success }}></div>
                        <span className="text-sm font-medium" style={{ color: BLUE_COLORS.success }}>Live & Operational</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-lg mb-8 leading-relaxed" style={{ color: BLUE_COLORS.gray }}>
                    {platform.description}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <h4 className="font-bold text-lg" style={{ color: BLUE_COLORS.dark }}>Key Features:</h4>
                    {platform.features.map((feature, i) => (
                      <div key={i} className="flex items-center group-hover:translate-x-2 transition-transform duration-300">
                        <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: platform.color }}></div>
                        <span style={{ color: BLUE_COLORS.dark }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full py-4 text-lg font-semibold rounded-lg hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                          style={{ 
                            backgroundColor: platform.color,
                            borderColor: platform.color,
                            color: "white"
                          }}>
                    {platform.cta}
                    <FontAwesomeIcon icon={faArrowRight} className="ml-3 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20" style={{ backgroundColor: BLUE_COLORS.primary }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Start Trading with Confidence
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-blue-100">
            Join thousands of traders using our professional platforms. Experience the future of Zimbabwe's financial markets today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-10 py-5 text-lg font-bold rounded-lg hover:shadow-2xl transition-all bg-white hover:bg-blue-50"
                    style={{ color: BLUE_COLORS.primary }}>
              Create Free Account
              <FontAwesomeIcon icon={faArrowRight} className="ml-3 h-5 w-5" />
            </Button>
            
            <Button variant="outline" className="px-10 py-5 text-lg font-semibold rounded-lg border-2 bg-transparent hover:bg-white/10"
                    style={{ 
                      borderColor: 'white',
                      color: 'white' 
                    }}>
              <FontAwesomeIcon icon={faDesktop} className="mr-3 h-5 w-5" />
              Live Platform Demo
            </Button>
          </div>
          
          {/* Removed the footer text section as requested */}
        </div>
      </section>

      <Footer />
    </div>
  );
}