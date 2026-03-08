import logo from "../assets/logo.png";
import vfexLogo from "../assets/vfex-logo.png";

export const WhatWeOffer = () => {
  return (
    <section className="py-12 bg-[#f7f9fa] border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-10">
          Professional Training for Zimbabwe's Leading Financial Platforms
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {/* ZSE Logo */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="h-16 md:h-20 w-auto flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              <img
                src={logo}
                alt="Zimbabwe Stock Exchange"
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase group-hover:text-gray-600 transition-colors">
              Zimbabwe Stock Exchange
            </span>
          </div>

          {/* VFEX Logo */}
          <div className="flex flex-col items-center gap-3 group">
            <div className="h-16 md:h-20 w-auto flex items-center justify-center grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
              <img
                src={vfexLogo}
                alt="Victoria Falls Stock Exchange"
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="text-[10px] font-bold text-gray-400 tracking-tighter uppercase group-hover:text-gray-600 transition-colors">
              Victoria Falls Stock Exchange
            </span>
          </div>
        </div>

        <div className="mt-12 text-gray-400 text-xs italic">
          Gain recognized expertise in both Zimbabwe Dollar and US Dollar denominated markets.
        </div>
      </div>
    </section>
  );
};
