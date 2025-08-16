import React from "react";
import bgImg from "../../../assets/background/subscribe-section-bg.webp";
import { IoMailOutline } from "react-icons/io5";
const SubscribeNewsLetter = () => {
  return (
    <div className="py-12 md:py-24 container mx-auto ">
      <div className="flex flex-col md:flex-row  justify-center gap-8 border-2 border-light-text/50">
        {/* Left side: BG image with icon */}
        <div
          className="flex-1 h-96 md:h-[300px] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${bgImg})` }}
        >
          {/* Icon centered */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl text-light-accent border-4 border-light-accent rounded-lg p-9">
            <IoMailOutline />
          </div>
        </div>

        {/* Right side: Text */}
        <div className="flex-2 bg-light-secondary pl-12 pt-12 h-full">
          <h2 className="text-center md:text-left text-4xl xl:text-6xl text-light-text font-bold pb-6 font-secondary">
            Subscribe Now
          </h2>
          <p className="text-center md:text-left lg:text-xl pb-6 text-light-text">
            Get the latest updates and news directly to your inbox.
          </p>
          <form className=" w-9/12 flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-md border border-light-text/60 focus:outline-none focus:ring-2 focus:ring-light-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-light-text text-light-primary font-bold rounded-r-md hover:bg-light-accent/90 transition-colors"
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
