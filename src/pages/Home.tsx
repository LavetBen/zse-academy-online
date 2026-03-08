import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { PopularTopics } from "@/components/PopularTopics";
import { TrainingDepartments } from "@/components/TrainingDepartments";
import { Footer } from "@/components/Footer";
import { BlogPreview } from "@/components/BlogPreview";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PopularTopics />
      <BlogPreview />
      <TrainingDepartments />
      <Footer />
    </div>
  );
};

export default Home;
