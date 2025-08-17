import React from "react";
import { Link } from "react-router";

const ExclusiveCardBig = ({ news }) => {
  return (
    <Link to={`/article/${news?._id}`}>
    <div className="relative ">
      <img
        src={news.articlePic}
        alt={news.articleTitle}
        className="w-full lg:h-[690px] object-cover hover:scale-95 transition-transform duration-300 dark:rounded-b-lg"
      />
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-6 rounded-b-lg  w-full ">
        <span className="bg-light-accent text-light-text text-xs md:text-xl px-2 py-1 rounded font-bold">
          EXCLUSIVE
        </span>
        <h2 className="text-2xl lg:text-4xl font-bold mt-2 text-light-secondary">{news.articleTitle}</h2>
        <p className="text-[17px] text-light-primary font-medium mt-3">{news.descriptions?.slice(0, 100)}...</p>
      </div>
    </div>
    </Link>
  );
};

export default ExclusiveCardBig;
