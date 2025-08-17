import React from "react";
import { MdWorkspacePremium } from "react-icons/md";
import { Link } from "react-router";

const PremiumArticleCard = ({ premiumArticle }) => {
  const {
    articleTitle,
    articlePic,
    // authorPhoto,
    authorName,
    descriptions,
    // tags,
    // views,
    createdAt,
    _id,
  } = premiumArticle;
  return (
    <div className="">
      <div className="h-full bg-gradient-to-br from-[#facc15] via-[#fbbf24] to-[#d97706] text-light-text font-secondary shadow-2xl w-full mx-auto relative overflow-hidden border border-yellow-400 hover:scale-105 transition-transform duration-300">
        <div className="absolute top-4 left-4">
          <div className="bg-light-text text-yellow-300 px-3 py-1 text-xs font-bold rounded-full shadow-lg uppercase tracking-wider ring-2 ring-yellow-400 flex items-center">
            <MdWorkspacePremium className="text-xl" /> Premium
          </div>
        </div>
        <img
          src={articlePic}
          className="max-h-60 lg:h-96 w-full"
          alt={articleTitle}
        />

        <div className="contentds p-6 font-secondary mt-6 flex flex-col justify-between">
          <div>
            <h3 className="text-light-text  text-xl font-medium">
              <span className="font-bold">Publisher</span> :{" "}
              {premiumArticle.publisher?.label}
            </h3>
            <h2 className="text-light-text font-bold  text-xl lg:text-2xl py-2 lg:py-4 ">
              {articleTitle}
            </h2>
            <p className="line-clamp-3 text-md text-light-text font-normal">
              {descriptions}
            </p>
          </div>

          <div className="dateandauthor flex items-center justify-between py-2 lg:py-5">
            <h2 className="text-light-text font-bold">By {authorName}</h2>
            <h2 className="text-light-text font-bold">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
          </div>
          <div className="mx-auto text-center ">
            <Link to={`/article/${_id}`}>
              <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110 w-full cursor-pointer font-bold">
                Read More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumArticleCard;
