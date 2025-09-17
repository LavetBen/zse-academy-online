import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PopularTopics } from "@/components/PopularTopics";
import { WhatWeOffer } from "@/components/WhatWeOffer";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { BlogPreview } from "@/components/BlogPreview";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PopularTopics />
      <WhatWeOffer />
      <BlogPreview />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;