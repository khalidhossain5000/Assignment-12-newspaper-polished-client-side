import React from "react";
import { Link } from "react-router";

const ExclusiveCardMini = ({ news }) => {
  return (
    <Link to={`/article/${news?._id}`}>
      <div className="flex flex-col dark:bg-dark-accent/90 ">
        <img
          src={news.articlePic}
          className="w-full h-[200px] object-cover hover:scale-95 transition-transform duration-300"
          alt={news.articleTitle}
        />

        <p className="text-xl my-3 dark:my-1 font-semibold uppercase text-light-text dark:p-3">
          {news.publisher?.label}
        </p>
        <h3 className="font-bold text-md leading-5 mt-1 dark:p-3">
          <span className="bg-light-accent dark:bg-dark-primary dark:text-dark-text text-light-text  text-md px-2 py-[1px] rounded mr-1">
            EXCLUSIVE
          </span>
          <span className="dark:text-light-text">{news.articleTitle}</span>
        </h3>

      </div>
    </Link>
  );
};

export default ExclusiveCardMini;
