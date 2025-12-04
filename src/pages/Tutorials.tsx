import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faPlay,
  faMobileScreen,
  faDesktop,
  faWallet,
  faMoneyBillTransfer,
  faChartLine,
  faUserPlus,
  faCheckCircle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// -------------------------
// Tutorial Type
// -------------------------
interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: "web" | "mobile";
  duration: string;
  completed: boolean;
  order: number;
  color: string;
}

// -------------------------
// Tutorial Data
// -------------------------
const tutorials: Tutorial[] = [
  {
    id: "create-account",
    title: "Account Setup",
    description: "Create and verify your trading account",
    icon: faUserPlus,
    category: "web",
    duration: "3 min",
    completed: true,
    color: "text-blue-600",
    order: 1,
  },
  {
    id: "deposit-funds",
    title: "Deposit Funds",
    description: "Add money to start trading",
    icon: faWallet,
    category: "web",
    duration: "2 min",
    completed: true,
    color: "text-green-600",
    order: 2,
  },
  {
    id: "withdraw-funds",
    title: "Withdraw Profits",
    description: "Secure withdrawal process",
    icon: faMoneyBillTransfer,
    category: "web",
    duration: "2 min",
    completed: false,
    color: "text-purple-600",
    order: 3,
  },
  {
    id: "place-order",
    title: "Place Trade",
    description: "Execute buy/sell orders",
    icon: faChartLine,
    category: "web",
    duration: "4 min",
    completed: false,
    color: "text-red-600",
    order: 4,
  },
  {
    id: "mobile-create",
    title: "Mobile Setup",
    description: "App installation and setup",
    icon: faUserPlus,
    category: "mobile",
    duration: "3 min",
    completed: false,
    color: "text-blue-500",
    order: 1,
  },
  {
    id: "mobile-deposit",
    title: "Mobile Deposit",
    description: "Quick deposit on mobile",
    icon: faWallet,
    category: "mobile",
    duration: "2 min",
    completed: false,
    color: "text-green-500",
    order: 2,
  },
  {
    id: "mobile-withdraw",
    title: "Mobile Withdraw",
    description: "Withdraw on the go",
    icon: faMoneyBillTransfer,
    category: "mobile",
    duration: "2 min",
    completed: false,
    color: "text-purple-500",
    order: 3,
  },
  {
    id: "mobile-trade",
    title: "Mobile Trading",
    description: "Trade from anywhere",
    icon: faChartLine,
    category: "mobile",
    duration: "4 min",
    completed: false,
    color: "text-red-500",
    order: 4,
  },
];

// -------------------------
// Tutorial Card Component
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
      className="cursor-pointer"
      onClick={onSelect}
    >
      <div className="rounded-md border bg-white shadow hover:shadow-md transition-all">
        <div className="relative h-40 w-full overflow-hidden rounded-t-md">
          <img
            src={'../assets/6436e1c49548c7859151b833_6388b5c565306ff068b6890f_Demo-CAMRT.jpeg'}
            alt={tutorial.title}
            className="h-full w-full object-cover"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 hover:opacity-100 transition">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow">
              <FontAwesomeIcon icon={faPlay} className="h-4 w-4 text-black" />
            </div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-white text-gray-800 px-2 py-0.5 rounded text-xs shadow-sm">
              {tutorial.category === "web" ? "Web" : "Mobile"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="font-semibold text-gray-800 text-sm mb-1">
            {tutorial.title}
          </h3>
          <p className="text-xs text-gray-600 mb-3">{tutorial.description}</p>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={tutorial.icon} className={`h-3 w-3 ${tutorial.color}`} />
              <span className="font-medium">Step {tutorial.order}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
              {tutorial.duration}
            </div>
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
    <div className="rounded-md border bg-white shadow p-6">
      <h3 className="text-xl font-bold mb-2">Interactive Tutorial</h3>
      <p className="text-gray-600 mb-4">Follow the guided demo to learn</p>

      <iframe
        src={`https://app.supademo.com/embed/${tutorialId}`}
        className="w-full h-[480px] rounded-md border"
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
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="max-w-6xl mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => setSelectedTutorial(null)}
            className="mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Tutorials
          </Button>

          <div className="rounded-md border bg-white p-6 shadow-sm mb-6">
            <h1 className="text-2xl font-bold mb-1">{tutorial.title}</h1>
            <p className="text-gray-600 mb-3">{tutorial.description}</p>

            <div className="flex gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={faClock} className="h-3 w-3" />
                {tutorial.duration}
              </div>
              <div className="flex items-center gap-1">
                <FontAwesomeIcon icon={tutorial.icon} className={`h-3 w-3 ${tutorial.color}`} />
                Step {tutorial.order}
              </div>
              {tutorial.completed && (
                <div className="flex items-center gap-1 text-green-600">
                  <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3" />
                  Completed
                </div>
              )}
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 pt-12 pb-8">
        <h1 className="text-3xl font-bold mb-2">Interactive Tutorials</h1>
        <p className="text-gray-600">Learn our platform step-by-step using guided demos.</p>

        {/* Categories */}
        <div className="flex gap-2 mt-6 mb-8">
          <Button
            variant={activeCategory === "all" ? "default" : "outline"}
            onClick={() => setActiveCategory("all")}
            size="sm"
          >
            All
          </Button>

          <Button
            variant={activeCategory === "web" ? "default" : "outline"}
            onClick={() => setActiveCategory("web")}
            size="sm"
          >
            <FontAwesomeIcon icon={faDesktop} className="mr-2" />
            Web
          </Button>

          <Button
            variant={activeCategory === "mobile" ? "default" : "outline"}
            onClick={() => setActiveCategory("mobile")}
            size="sm"
          >
            <FontAwesomeIcon icon={faMobileScreen} className="mr-2" />
            Mobile
          </Button>
        </div>

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
