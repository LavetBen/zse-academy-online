import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import heroImage from "@/assets/banner.jpg";

export const HeroSection = () => {
  return (
    <section className="relative w-full text-gray-900 bg-white h-[100vh] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroImage}
          alt="Zimbabwe Stock Exchange Training"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle overlay to ensure the image isn't too overpowering if needed, though Udemy usually runs it raw */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Floating Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="bg-white p-8 md:p-10 lg:p-12 shadow-2xl max-w-lg w-full md:ml-0 mx-auto md:mx-0 sm:mt-0 mt-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-[#1c1d1f] leading-tight">
            Master the Zimbabwe Stock Exchange
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
            Learn to trade and invest with ZSE Academy. Professional training courses designed to help you succeed in Zimbabwe's financial markets.
          </p>

          <div className="relative flex items-center w-full mb-2">
            <input
              type="text"
              placeholder="What do you want to learn?"
              className="w-full h-14 pl-4 pr-12 text-base text-gray-900 border border-black focus:outline-none focus:ring-1 focus:ring-black rounded-none placeholder:text-gray-500"
            />
            <div className="absolute right-0 h-14 w-14 flex items-center justify-center bg-white cursor-pointer hover:bg-gray-100 transition border-y border-r border-black">
              <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-900" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
