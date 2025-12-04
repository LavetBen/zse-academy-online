import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlay,
  faMobileScreen,
  faDesktop,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import tutorialThumbnail from "@/assets/6436e1c49548c7859151b833_6388b5c565306ff068b6890f_Demo-CAMRT.jpeg";

// -------------------------
// Tutorial Type
// -------------------------
interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: "web" | "mobile";
  duration: string;
  completed: boolean;
  order: number;
}

// -------------------------
// Tutorial Data
// -------------------------
const tutorials: Tutorial[] = [
  {
    id: "create-account",
    title: "Account Setup",
    description: "Learn how to create and verify your trading account step by step",
    category: "web",
    duration: "3 min",
    completed: true,
    order: 1,
  },
  {
    id: "deposit-funds",
    title: "Deposit Funds",
    description: "Add money to your account and start trading immediately",
    category: "web",
    duration: "2 min",
    completed: true,
    order: 2,
  },
  {
    id: "withdraw-funds",
    title: "Withdraw Profits",
    description: "Learn the secure withdrawal process for your earnings",
    category: "web",
    duration: "2 min",
    completed: false,
    order: 3,
  },
  {
    id: "place-order",
    title: "Place Trade",
    description: "Execute buy and sell orders like a professional trader",
    category: "web",
    duration: "4 min",
    completed: false,
    order: 4,
  },
  {
    id: "mobile-create",
    title: "Mobile Setup",
    description: "Install our mobile app and set up your account on the go",
    category: "mobile",
    duration: "3 min",
    completed: false,
    order: 1,
  },
  {
    id: "mobile-deposit",
    title: "Mobile Deposit",
    description: "Quick and easy deposit process from your mobile device",
    category: "mobile",
    duration: "2 min",
    completed: false,
    order: 2,
  },
  {
    id: "mobile-withdraw",
    title: "Mobile Withdraw",
    description: "Withdraw your funds anytime, anywhere from mobile",
    category: "mobile",
    duration: "2 min",
    completed: false,
    order: 3,
  },
  {
    id: "mobile-trade",
    title: "Mobile Trading",
    description: "Master trading on the go with our mobile platform",
    category: "mobile",
    duration: "4 min",
    completed: false,
    order: 4,
  },
];

// -------------------------
// Tutorial Card Component (Udemy-inspired)
// -------------------------
const TutorialCard = ({
  tutorial,
  onSelect,
}: {
  tutorial: Tutorial;
  onSelect: () => void;
}) => {
  return (
    <div
      className="group cursor-pointer"
      onClick={onSelect}
    >
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300">
        {/* Thumbnail */}
        <div className="relative aspect-video w-full overflow-hidden">
          <img
            src={tutorialThumbnail}
            alt={tutorial.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center shadow-lg">
              <FontAwesomeIcon icon={faPlay} className="h-5 w-5 text-foreground ml-1" />
            </div>
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2">
            <span className="bg-black/80 text-white px-2 py-1 rounded text-xs font-medium">
              {tutorial.duration}
            </span>
          </div>

          {/* Completed Badge */}
          {tutorial.completed && (
            <div className="absolute top-2 left-2">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3" />
                Completed
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-foreground text-base mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {tutorial.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {tutorial.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">
              Step {tutorial.order} of 4
            </span>
            <span className="text-xs bg-muted px-2 py-1 rounded font-medium text-muted-foreground">
              {tutorial.category === "web" ? "Web Platform" : "Mobile App"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------
// Supademo Viewer
// -------------------------
const SupademoViewer = ({ tutorialId }: { tutorialId: string }) => {
  return (
    <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
      <iframe
        src={`https://app.supademo.com/embed/${tutorialId}`}
        className="w-full h-[600px]"
        title="Tutorial Demo"
        allow="clipboard-write"
      />
    </div>
  );
};

// -------------------------
// Main Dashboard
// -------------------------
export default function TutorialsDashboard() {
  const [selectedTutorial, setSelectedTutorial] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<"all" | "web" | "mobile">("web");

  const filteredTutorials = tutorials
    .filter((t) => (activeCategory === "all" ? true : t.category === activeCategory))
    .sort((a, b) => a.order - b.order);

  // -------------------------
  // Tutorial Details Page
  // -------------------------
  if (selectedTutorial) {
    const tutorial = tutorials.find((t) => t.id === selectedTutorial);

    if (!tutorial) return null;

    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedTutorial(null)}
            className="mb-6 hover:bg-muted"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-4 w-4" />
            Back to Tutorials
          </Button>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm mb-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">{tutorial.title}</h1>
                <p className="text-muted-foreground">{tutorial.description}</p>
              </div>
              
              <div className="flex gap-3 text-sm">
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
                  <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{tutorial.duration}</span>
                </div>
                <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
                  <span className="font-medium">Step {tutorial.order} of 4</span>
                </div>
                {tutorial.completed && (
                  <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-2 rounded-lg">
                    <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
                    <span className="font-medium">Completed</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <SupademoViewer tutorialId="cmidcq8rb9r6mb7b45svbkd9l" />
        </div>

        <Footer />
      </div>
    );
  }

  // -------------------------
  // Tutorial List Page
  // -------------------------
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Interactive Tutorials
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Master our trading platform with step-by-step guided demos. Learn at your own pace.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <div className="flex gap-2 mb-8 border-b border-border pb-4">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => setActiveCategory("all")}
            size="sm"
          >
            All Tutorials
          </Button>

          <Button
            variant={activeCategory === "web" ? "default" : "outline"}
            onClick={() => setActiveCategory("web")}
            size="sm"
          >
            <FontAwesomeIcon icon={faDesktop} className="mr-2 h-4 w-4" />
            Web Platform
          </Button>

          <Button
            variant={activeCategory === "mobile" ? "default" : "outline"}
            onClick={() => setActiveCategory("mobile")}
            size="sm"
          >
            <FontAwesomeIcon icon={faMobileScreen} className="mr-2 h-4 w-4" />
            Mobile App
          </Button>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {filteredTutorials.length} tutorial{filteredTutorials.length !== 1 ? 's' : ''} available
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              onSelect={() => setSelectedTutorial(tutorial.id)}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
