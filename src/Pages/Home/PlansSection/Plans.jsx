import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router";
import { IoCheckmark } from "react-icons/io5";
import { Typewriter } from "react-simple-typewriter";

const Plans = () => {
  return (
    <div className="py-14 lg:py-24 flex justify-center items-center dark:bg-dark-primary">
      <div className="">
        <div className="text-center font-semibold py-3 lg:py-12">
          <h1 className="text-4xl md:text-5xl font-secondary ">
            <span className="text-light-text dark:text-dark-text font-bold  tracking-wide">
              <Typewriter
                loop={5}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
                words={["Flexible", "Premium", "Awesome", "Scalable!","Smooth"]}
              />{" "}
            </span>
            <span>Plans</span>
          </h1>
          <p className="pt-4 md:pt-6 md:text-xl text-light-text/50 dark:text-dark-text font-normal w-full md:px-8 md:w-full">
            Choose a plan that works best for you.
          </p>
        </div>
        <div className="px-3 lg:px-0 py-14 md:py-24 xl:flex items-center gap-12 space-y-6 lg:space-y-0">


          {/* <!-- Basic Card --> */}
          <div className="max-w-2xl lg:w-[490px] p-3 xl:p-9 bg-light-accent/30 dark:bg-dark-accent/80 text-center rounded-xl lg:rounded-3xl lg:px-16 shadow-xl">
            <h2 className="text-light-text text-2xl lg:text-3xl font-bold">
              Basic Plan - “News Lite”
            </h2>
            <p className="text-light-text/80 mb-6 mt-2 font-medium md:font-bold md:text-xl">
              {" "}
              Best For: Casual readers
            </p>

            <p className="text-5xl font-bold text-light-text/90 mb-3 md:mb-6">
              $49/
              <span className="text-2xl font-bold text-light-text">1 Min</span>
            </p>
            {/* divider */}
            <div className="flex items-center py-3">
              <div className="flex-grow border-t border-light-text"></div>
              <span className="px-4 text-light-text text-xl font-medium">
                What's Included
              </span>
              <div className="flex-grow border-t border-light-text"></div>
            </div>

            {/* divider ends */}

            <div className="pt-2 lg:pt-8 icon">
              <ul className="">
                <li className="flex items-center gap-3 my-2 md:my-5">
                  <RxCross2 className=" text-[17px] md:text-2xl text-light-text " />
                  <span className="md:text-[17px] text-light-text/80">
                   Premium News Pages
                  </span>
                </li>
                <li className="flex items-center gap-2 md:gap-3 my-2 md:my-5">
                  <RxCross2 className="text-[17px] md:text-2xl text-light-text" />
                  <span className="md:text-[17px] text-light-text/80">
                    Premium News Details
                  </span>
                </li>
                <li className="flex items-center gap-2 md:gap-3 my-2 md:my-5">
                  <RxCross2 className="text-[17px] md:text-2xl text-light-text" />
                  <span className="md:text-[17px] text-light-text/80">
                    Unlimited News Post
                  </span>
                </li>
              </ul>

              <div className="mx-auto text-center mt-12 ">
                <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110">
                  <Link
                  to={`/subscriptions`}
                >
                  Go Premium
                </Link>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- StartUp Card --> */}
          <div className="relative max-w-2xl xl:max-w-96 my-3 xl:my-0 lg:w-full p-6 xl:px-6 lg:py-9  bg-light-accent/90 text-center rounded-xl xl:rounded-3xl text-light-text border-1 shadow-xl border-light-text/50 xl:transform xl:scale-125">
            <h2 className="text-2xl lg:text-3xl pt-2 lg:pt-6 font-bold text-light-text mb-4">
              Standard Plan – “News Plus”
            </h2>
            <p className="text-light-text my-6 font-medium">
              Best For: Regular readers who want more access
            </p>
            <p className="text-5xl font-bold text-light-text/90 mb-6">
              $99/
              <span className="text-2xl font-bold text-light-text">5 D</span>
            </p>
            {/* divider */}
            <div className="flex items-center py-3">
              <div className="flex-grow border-t border-light-text"></div>
              <span className="px-4 text-light-text text-xl font-medium">
                What's Included
              </span>
              <div className="flex-grow border-t border-light-text"></div>
            </div>

            {/* divider ends */}
            <div className=" lg:pt-8 icon">
              <ul>
                <li className="flex items-center gap-1 md:gap-3 pt-1 md:my-2">
                  <IoCheckmark className="text-[17px] md:text-2xl lg:text-3xl text-light-text " />
                  <span className="font-secondary font-bold lg:text-[17px] text-light-text/90">
                    Access To Premium News 
                  </span>
                </li>
                <li className="flex items-center gap-1 md:gap-3 my-2">
                  <IoCheckmark className="text-[17px] md:text-2xl lg:text-3xl text-light-text" />
                  <span className="font-secondary font-bold lg:text-[17px] text-light-text/90">
                   Premium News Details
                  </span>
                </li>
                <li className="flex items-center gap-1 md:gap-3 my-2">
                  <IoCheckmark className="text-[17px] md:text-2xl lg:text-3xl text-light-text" />
                  <span className="font-secondary font-bold lg:text-[17px] text-light-text/90">
                    Unlimited Articles Post
                  </span>
                </li>
              </ul>

              <div className="mx-auto text-center mt-12">
                <button className="border-2 border-light-text hover:bg-light-accent/90 transition duration-300 hover:scale-110 text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-2 px-3">
                <Link
                  
                  to={`/subscription`}
                >
                  Go Premium
                </Link>
                </button>
                
              </div>
            </div>
            <div className="absolute top-1 right-2 md:top-4 md:right-4">
              <p className="bg-light-text text-light-primary font-semibold px-4 py-1 rounded-full uppercase text-xs">
                Popular
              </p>
            </div>
          </div>

          {/* enter prise card */}
          <div className="max-w-2xl lg:w-[490px] p-3 xl:p-9 bg-light-accent/30 dark:bg-dark-accent/80 text-center rounded-xl lg:rounded-3xl lg:px-16 shadow-xl">
            <h2 className="text-light-text text-2xl lg:text-3xl font-bold">
              Premium Plan – “Pro Reader”
            </h2>
            <p className="text-light-text/80 mb-6 mt-2 font-medium md:font-bold md:text-xl">
              {" "}
              Best For: News lovers and professionals
            </p>

            <p className="text-5xl font-bold text-light-text/90 mb-3 md:mb-6">
              $149/
              <span className="text-2xl font-bold text-light-text">15</span>
            </p>
            {/* divider */}
            <div className="flex items-center py-3">
              <div className="flex-grow border-t border-light-text"></div>
              <span className="px-4 text-light-text text-xl font-medium">
                What's Included
              </span>
              <div className="flex-grow border-t border-light-text"></div>
            </div>

            {/* divider ends */}

            <div className="pt-3 lg:pt-8 icon">
              <ul>
                <li className="flex items-center gap-3 my-2 md:my-5">
                  <RxCross2 className="text-[17px] md:text-2xl text-light-text " />
                  <span className="md:text-[17px] text-light-text/80">
                    Premium News Pages
                  </span>
                </li>
                <li className="flex items-center gap-3 my-5">
                  <RxCross2 className="text-[17px] md:text-2xl text-light-text" />
                  <span className="md:text-[17px] text-light-text/80">
                   Premium News Details
                  </span>
                </li>
                <li className="flex items-center gap-3 my-5">
                  <RxCross2 className="text-[17px] md:text-2xl text-light-text" />
                  <span className="md:text-[17px] text-light-text/80">
                    Unlimited News Post
                  </span>
                </li>
              </ul>

              <div className="mx-auto text-center mt-12">
              <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110">
                  <Link
              
                  to={`/subscription`}
                >
                  Go Premium
                </Link>
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
