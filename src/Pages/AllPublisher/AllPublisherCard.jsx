import React from "react";

import Loading from "../Shared/Loading/Loading";
import { Link } from "react-router";

const AllPublisherCard = ({ publisher }) => {
  

  return (
    <div className="">
      <div className="bg-light-primary dark:bg-gradient-to-br dark:from-[#facc15] dark:via-[#fbbf24] dark:to-[#d97706]  rounded-xl shadow-2xl h-full flex flex-col shadow-light-text/60 ">
        <img
          src={publisher?.publisherPic}
          className="max-h-60 lg:h-96"
          alt={publisher?.publisherName}
        />

        <div className="contentds px-2 lg:px-6 py-6 font-secondary  flex flex-col justify-between ">
          <div className="">
            <h3 className="text-light-text text-xl font-medium lg:text-2xl lg:font-bold text-center">
              {publisher?.publisherName}
              
            </h3>
            <h2 className="text-light-text text-xl font-medium pt-3 text-center">Article Posted: <span className="text-dark-secondary font-extrabold">{publisher?.articleCount}</span></h2>
          </div>
       <div className="pt-3 lg:pt-6">
        <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110 w-full dark:hidden">
            <Link to={`/publisher-article/${publisher?._id}`}>See All Post</Link>
        </button>

        <button className="border-1 border-dark-primary/60 hover:bg-light-accent/90 transition duration-300 hover:scale-110 text-light-text dark:text-dark-primary cursor-pointer mx-auto xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 hidden dark:block">
            <Link to={`/publisher-article/${publisher?._id}`}>See All Post</Link>
        </button>
       </div>
        </div>
      </div>
    </div>
  );
};

export default AllPublisherCard;
