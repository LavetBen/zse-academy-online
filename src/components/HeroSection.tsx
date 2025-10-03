import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlay, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import heroImage1 from "@/assets/day-trader-using-pc-purchase-sell-stocks-browsing-through-documents.jpg";
import heroImage2 from "@/assets/diverse-business-analysts-working-evaluate-costs-create-projection.jpg";
import heroImage3 from "@/assets/business-analyst-looking-into-statistics-reports-detect-any-obstacles.jpg";

export const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: heroImage1, title: "Master the Zimbabwe Stock Exchange" },
    { image: heroImage2, title: "Expert Financial Market Training" },
    { image: heroImage3, title: "Advance Your Career in Finance" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const goToPrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative text-white overflow-hidden h-[80vh] md:h-[90vh] max-h-[850px]">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />
          </div>
        ))}
      </div>

      {/* Slideshow controls - hidden on small screens */}
      <div className="absolute bottom-6 right-6 z-10 flex space-x-2 hidden md:flex">
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={goToPrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          onClick={goToNext}
        >
          <FontAwesomeIcon icon={faChevronRight} className="h-4 w-4" />
        </Button>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white scale-125 shadow-lg" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Column */}
          <div className="text-left lg:text-left animate-fade-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-snug drop-shadow-xl text-left">
              {slides[currentSlide].title}{" "}
              <span className="text-[#00aeef]">Today</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-xl leading-relaxed text-left">
              Professional training courses designed to help you succeed in Zimbabwe's financial markets. 
              Learn from industry experts and elevate your career with hands-on skills.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-start mb-10">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 bg-[#00aeef] hover:bg-[#009ad1] text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Start Learning
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-[#00aeef] border-white hover:bg-white/10 backdrop-blur-sm hidden sm:flex"
              >
                <FontAwesomeIcon icon={faPlay} className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
