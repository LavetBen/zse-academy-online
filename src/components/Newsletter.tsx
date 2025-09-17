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
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/dots.png')] opacity-40"></div>

      <div className="max-w-6xl mx-auto">
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden">
          <CardContent className="p-6 sm:p-10 lg:p-14">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              {/* Left Side */}
              <div>
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                  Stay Updated with Market Insights
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Get weekly market analysis, trading tips, and exclusive course updates delivered straight to your inbox.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    "Weekly market insights",
                    "Exclusive trading tips",
                    "Early access to new courses",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center space-x-2 text-gray-600">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side */}
              <div className="bg-gradient-to-tr from-indigo-100 to-purple-100 rounded-2xl p-6 sm:p-8 shadow-inner">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-800 mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 text-lg border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 transition"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full h-12 text-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 rounded-xl shadow-md transition"
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
