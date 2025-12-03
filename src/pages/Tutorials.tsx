import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWallet,
  faMoneyBillTransfer,
  faChartLine,
  faUserPlus,
  faMobileScreen,
  faDesktop,
  faPlay,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: "web" | "mobile";
  supademoId?: string; // Supademo embed ID
  duration: string;
}

const tutorials: Tutorial[] = [
  {
    id: "create-account",
    title: "Create an Account",
    description: "Learn how to register and set up your trading account step by step.",
    icon: faUserPlus,
    category: "web",
    supademoId: "", // Add Supademo ID here
    duration: "3 min",
  },
  {
    id: "deposit-funds",
    title: "How to Deposit",
    description: "Step-by-step guide on depositing funds into your trading account.",
    icon: faWallet,
    category: "web",
    supademoId: "", // Add Supademo ID here
    duration: "2 min",
  },
  {
    id: "withdraw-funds",
    title: "How to Withdraw",
    description: "Learn how to withdraw your funds safely and quickly.",
    icon: faMoneyBillTransfer,
    category: "web",
    supademoId: "", // Add Supademo ID here
    duration: "2 min",
  },
  {
    id: "place-order",
    title: "Place an Order",
    description: "Master the art of placing buy and sell orders on our platform.",
    icon: faChartLine,
    category: "web",
    supademoId: "", // Add Supademo ID here
    duration: "4 min",
  },
  {
    id: "mobile-create-account",
    title: "Create Account (Mobile)",
    description: "Set up your account using our mobile application.",
    icon: faUserPlus,
    category: "mobile",
    supademoId: "", // Add Supademo ID here
    duration: "3 min",
  },
  {
    id: "mobile-deposit",
    title: "Deposit via Mobile",
    description: "Quick guide to depositing funds through the mobile app.",
    icon: faWallet,
    category: "mobile",
    supademoId: "", // Add Supademo ID here
    duration: "2 min",
  },
  {
    id: "mobile-withdraw",
    title: "Withdraw via Mobile",
    description: "How to withdraw funds using our mobile application.",
    icon: faMoneyBillTransfer,
    category: "mobile",
    supademoId: "", // Add Supademo ID here
    duration: "2 min",
  },
  {
    id: "mobile-place-order",
    title: "Trade on Mobile",
    description: "Learn to execute trades on the go with our mobile app.",
    icon: faChartLine,
    category: "mobile",
    supademoId: "", // Add Supademo ID here
    duration: "4 min",
  },
];

const TutorialCard = ({ tutorial, onSelect }: { tutorial: Tutorial; onSelect: (tutorial: Tutorial) => void }) => {
  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30"
      onClick={() => onSelect(tutorial)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <FontAwesomeIcon icon={tutorial.icon} className="h-6 w-6 text-primary" />
          </div>
          <Badge variant="secondary" className="text-xs">
            {tutorial.duration}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-3 group-hover:text-primary transition-colors">
          {tutorial.title}
        </CardTitle>
        <CardDescription className="text-sm">
          {tutorial.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center text-sm text-primary font-medium">
          <FontAwesomeIcon icon={faPlay} className="h-3 w-3 mr-2" />
          Start Tutorial
        </div>
      </CardContent>
    </Card>
  );
};

const SupademoEmbed = ({ supademoId, title }: { supademoId: string; title: string }) => {
  if (!supademoId) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] bg-muted/30 rounded-xl border-2 border-dashed border-border">
        <FontAwesomeIcon icon={faCircleQuestion} className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground text-lg font-medium">Tutorial Coming Soon</p>
        <p className="text-muted-foreground/70 text-sm mt-1">
          The interactive demo for "{title}" is being prepared.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg">
      <iframe
        src={`https://app.supademo.com/embed/${supademoId}`}
        title={title}
        allow="clipboard-write"
        frameBorder="0"
        loading="lazy"
        className="w-full h-[600px]"
      />
    </div>
  );
};

const Tutorials = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [activeCategory, setActiveCategory] = useState<"web" | "mobile">("web");

  const filteredTutorials = tutorials.filter((t) => t.category === activeCategory);

  const handleSelectTutorial = (tutorial: Tutorial) => {
    setSelectedTutorial(tutorial);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setSelectedTutorial(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Platform Tutorials
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to use our trading platform with interactive step-by-step guides. 
              Master deposits, withdrawals, order placement, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedTutorial ? (
            <div className="space-y-6">
              {/* Back Button & Title */}
              <div className="flex items-center gap-4">
                <button
                  onClick={handleBack}
                  className="text-primary hover:text-primary/80 font-medium flex items-center gap-2 transition-colors"
                >
                  ← Back to Tutorials
                </button>
              </div>
              
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FontAwesomeIcon icon={selectedTutorial.icon} className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {selectedTutorial.title}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      {selectedTutorial.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Supademo Embed */}
              <SupademoEmbed 
                supademoId={selectedTutorial.supademoId || ""} 
                title={selectedTutorial.title} 
              />
            </div>
          ) : (
            <div className="space-y-8">
              {/* Platform Tabs */}
              <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as "web" | "mobile")} className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-md grid-cols-2 h-12">
                    <TabsTrigger value="web" className="flex items-center gap-2 text-base">
                      <FontAwesomeIcon icon={faDesktop} className="h-4 w-4" />
                      Web Platform
                    </TabsTrigger>
                    <TabsTrigger value="mobile" className="flex items-center gap-2 text-base">
                      <FontAwesomeIcon icon={faMobileScreen} className="h-4 w-4" />
                      Mobile App
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="web" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTutorials.map((tutorial) => (
                      <TutorialCard 
                        key={tutorial.id} 
                        tutorial={tutorial} 
                        onSelect={handleSelectTutorial}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="mobile" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredTutorials.map((tutorial) => (
                      <TutorialCard 
                        key={tutorial.id} 
                        tutorial={tutorial} 
                        onSelect={handleSelectTutorial}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              {/* Help Section */}
              <div className="mt-16 text-center bg-muted/30 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Need More Help?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tutorials;
