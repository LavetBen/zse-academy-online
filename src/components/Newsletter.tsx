import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setEmail("");
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    }, 1000);
  };

  return (
    <section className="section-padding bg-primary">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0 shadow-strong">
          <CardContent className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
                  Stay Updated with Market Insights
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Get weekly market analysis, trading tips, and exclusive course updates delivered to your inbox.
                </p>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Weekly market insights</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Exclusive trading tips</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Early access to new courses</span>
                  </div>
                </div>
              </div>

              <div className="bg-accent/30 rounded-2xl p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-lg"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    variant="hero"
                    className="w-full h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Subscribe Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
                
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  No spam, unsubscribe at any time. We respect your privacy.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};