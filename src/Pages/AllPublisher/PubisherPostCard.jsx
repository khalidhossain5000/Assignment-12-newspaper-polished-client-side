import React from "react";
import { MdWorkspacePremium } from "react-icons/md";
import { Link } from "react-router";
const PubisherPostCard = ({ post }) => {
  console.log("single ps",post);
    return (
    <div>
      {post?.isArticlePremium ? (
        <div className="h-full bg-gradient-to-br from-[#facc15] via-[#fbbf24] to-[#d97706] text-[#211f54] shadow-2xl w-full mx-auto relative overflow-hidden border border-yellow-400 hover:scale-105 transition-transform duration-300">
          <div className="absolute top-4 left-4">
            <div className="bg-[#211f54] text-yellow-300 px-3 py-1 text-xs font-bold rounded-full shadow-lg uppercase tracking-wider ring-2 ring-yellow-400 flex items-center">
              <MdWorkspacePremium className="text-xl" /> Premium
            </div>
          </div>
          <img
            src={post?.articlePic}
            className="max-h-60 lg:h-96 w-full"
            alt={post?.articleTitle}
          />
          <div className="contentds p-6 urbanist mt-6">
            <h3 className="text-[#211f54]  text-xl font-medium">
              <span className="font-bold">Publisher</span> :{" "}
              {post?.article.publisher?.label}
            </h3>
            <h2 className="text-[#211f54] font-bold  text-xl  py-2 lg:py-4 playfair-display">
              {post?.articleTitle}
            </h2>
            <p className="line-clamp-3 text-md text-gray-800 font-normal">
              {post?.descriptions}
            </p>

            <div className="dateandauthor flex items-center justify-between py-2 lg:py-5">
              <h2 className="text-gray-900 font-bold">By {post?.authorName}</h2>
              <h2 className="text-gray-900 font-bold">
                {new Date(post?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
            </div>
            <div className="mx-auto text-center">
              {post?.disableDetailsLink ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed select-none border border-gray-600  transition text-black font-bold"
                  title="Please subscribe to access this premium article text-black"
                >
                  Details
                </button>
              ) : (
                <Link to={`/article/${post?._id}`}>
                  <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl cursor-pointer whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110 w-full">
                    Read More
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-light-primary rounded-xl shadow-2xl h-full flex flex-col shadow-gray-600 ">
          <img
            src={post?.articlePic}
            className="max-h-60 lg:h-96"
            alt={post?.articleTitle}
          />

          <div className="contentds p-6 urbanist mt-6 flex flex-col justify-between flex-grow">
            <div>
              <h3 className="text-[#211f54]  text-xl font-medium">
                <span className="font-bold">Publisher</span> :{" "}
                {post?.publisher?.label}
              </h3>
              <h2 className="text-[#211f54]  text-xl font-medium py-2 lg:py-4 playfair-display">
                {post?.articleTitle}
              </h2>
              <p className="line-clamp-3 text-md text-gray-800 font-normal">
                {post?.descriptions}
              </p>

              <div className="dateandauthor flex items-center justify-between py-2 lg:py-5">
                <h2 className="text-gray-600 font-bold">
                  By {post?.authorName}
                </h2>
                <h2 className="text-gray-600 font-bold">
                  {new Date(post?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
              </div>
            </div>

            <div className="mx-auto text-center pb-3">
              {post?.disableDetailsLink ? (
                <button
                  disabled
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed select-none border border-gray-600  transition text-black font-bold"
                  title="Please subscribe to access this premium article text-black"
                >
                  Details
                </button>
              ) : (
                <Link className="w-full" to={`/article/${post?._id}`}>
                  <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 cursor-pointer transition duration-300 hover:scale-110 w-full">
                    Read More
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PubisherPostCard;
