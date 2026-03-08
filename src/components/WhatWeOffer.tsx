import { Card } from "@/components/ui/card";

// Custom SVG icons
const features = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 14v6m0-6c3.866 0 7 1.343 7 3v3M12 14c-3.866 0-7 1.343-7 3v3"
        />
      </svg>
    ),
    title: "Revenue Responsibility",
    description:
      "We take responsibility for the revenue impact of our services.",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20l9-7-9-7-9 7 9 7z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20V10" />
      </svg>
    ),
    title: "Holistic Perspective",
    description:
      "Our experts examine and hone in to optimize your strategy at every level.",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
    title: "Results Oriented",
    description:
      "We offer impeccable implementation, with ongoing analysis focus on your line.",
  },
];

export const WhatWeOffer = () => {
  return (
    <section className="section-padding bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-2 text-left">
            What we offer
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl text-left">
            Build your trading skills and gain expertise in Zimbabwe's financial markets.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="bg-white rounded-2xl p-8 border shadow-sm hover:shadow-2xl transition-transform hover:scale-[1.05] text-center"
            >
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-base text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
