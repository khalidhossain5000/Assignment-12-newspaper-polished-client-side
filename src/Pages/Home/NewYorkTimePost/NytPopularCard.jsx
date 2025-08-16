import React from "react";
import { IoStatsChartSharp } from "react-icons/io5";
import { Link } from "react-router";

const NytPopularCard = ({ popularPost }) => {
  console.log("popularPost", popularPost);
  const { articlePic, articleTitle, createdAt, views, descriptions,_id } =
    popularPost;
  return (
    <div className="flex flex-col xl:flex-row bg-light-secondary gap-6 ">
      <div className="w-full h-full flex-1">
        <img
          src={articlePic}
          className="w-full h-full rounded-xl "
          alt=""
        />
      </div>
      <div className="cntents px-3 py-6 xl:py-6 flex-1 ">
        {/* views and date */}
        <div className="flex  justify-between  ">
          <p className="text-light-text/60 font-bold">
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="flex  gap-3 pr-2">
            <IoStatsChartSharp className="text-[16px] md:text-xl text-light-accent" />
            <span className="font-secondary text-light-text/60 font-bold">
              {views} Views
            </span>
          </p>
        </div>

        {/* title and des */}
        <div className="py-2 flex flex-col h-full md:text-left text-center font-secondary">
          <h2 className="text-light-text lg:text-xl font-bold ">{articleTitle}</h2>
          <p className="pt-3 text-light-text/80 text-[14px]">
            {descriptions.split(" ").slice(0, 20).join(" ") +
              (descriptions.split(" ").length > 20 ? "..." : "")}
          </p>

          <div className="mt-auto">
            <button className="border-1 border-light-text hover:bg-light-accent/90 transition duration-300 hover:scale-110 text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-2 px-3">
              <Link to={`/article/${_id}`}>Read More</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NytPopularCard;
