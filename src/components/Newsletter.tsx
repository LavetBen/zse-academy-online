import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
    <section className="relative py-16 bg-gradient-to-br font-poppins from-blue-50 via-white overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dots.png')] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-0  bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Side */}
              <div className="text-left">
                
                <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
                  Stay Updated with Market Insights
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Get weekly market analysis, trading tips, and exclusive course
                  updates delivered straight to your inbox.
                </p>
              </div>

              {/* Right Side */}
              <div className="bg-gradient-to-tr from-blue-50 to-blue-100 rounded-2xl p-6 sm:p-8 shadow-inner">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-lg border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-blue hover:opacity-90 rounded-xl shadow-md transition text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      "Subscribing..."
                    ) : (
                      <>
                        Subscribe Now
                        <FontAwesomeIcon icon={faArrowRight} className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-sm text-gray-500 mt-4 text-center">
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
