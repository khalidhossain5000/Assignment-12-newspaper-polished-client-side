import React from "react";
import bgImg from "../../../assets/background/subscribe-section-bg.webp";
import { IoMailOutline } from "react-icons/io5";
const SubscribeNewsLetter = () => {
  return (
    <div className="py-12 md:py-24 px-3 xl:px-0 dark:bg-dark-secondary/60">
      <div className="container mx-auto  flex flex-col lg:flex-row items-center justify-center border-2 border-light-text/50 w-full">
        {/* Left side: BG image with icon */}
        <div
          className="w-full xl:flex-1 lg:w-1/3 h-72 md:h-[200px] lg:h-[300px] xl:h-[400px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          {/* Icon centered */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-5xl md:text-6xl text-light-accent border-4 border-light-accent rounded-lg p-6 md:p-6 lg:p-9">
            <IoMailOutline />
          </div>
        </div>

        {/* Right side: Text */}
        <div className="w-full xl:flex-2 lg:w-2/3 bg-light-secondary dark:bg-dark-accent px-6 md:px-12 py-10 md:py-0 flex flex-col justify-center md:pb-6 lg:pb-0 h-72 md:h-[200px] lg:h-[300px] xl:h-[400px]">
          <h2 className="text-center lg:text-left text-3xl md:text-4xl xl:text-6xl text-light-text font-bold pb-4 md:pt-6 font-secondary">
            Subscribe Now
          </h2>
          <p className="text-center lg:text-left text-base md:text-lg lg:text-xl pb-3 lg:pb-6 text-light-text/60 font-secondary">
            Get the latest updates and news directly to your inbox.
          </p>

          <form className=" md:w-11/12 lg:w-9/12 flex mx-auto md:mx-0 pt-4 lg:pt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 p-2  md:px-4 md:py-3 rounded-l-md border border-light-text/60 focus:outline-none focus:ring-2 focus:ring-light-accent text-sm md:text-base dark:text-dark-primary dark:placeholder:text-dark-primary"
            />
            <button
              type="submit"
              className="px-2 font-secondary md:px-6 py-3 bg-light-text text-light-primary  md:font-bold rounded-r-md hover:bg-light-accent/90 transition-colors text-sm md:text-base"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubscribeNewsLetter;
