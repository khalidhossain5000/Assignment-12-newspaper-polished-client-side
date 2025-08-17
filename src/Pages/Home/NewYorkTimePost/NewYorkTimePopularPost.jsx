import React from "react";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import NytPopularCard from "./NytPopularCard";
import { Link } from "react-router";

const NewYorkTimePopularPost = () => {
  const axiosInstance = useAxios();
  const fetchNytPost = async () => {
    const res = await axiosInstance.get("/nyt-articles");
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["nytPost"],
    queryFn: fetchNytPost,
  });
  console.log(data, "all data");
  if (isLoading) return <Loading />;
  return (
    <div className="py-12 md:py-24  dark:bg-gradient-to-b dark:from-dark-primary dark:to-dark-secondary">
<div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between py-6 mx-3 xl:mx-0">
        <h1 className=" md:text-left text-center text-4xl xl:text-5xl text-light-text dark:text-dark-text font-bold pb-12 font-secondary">
          Popular News By :{" "}
          <span className="text-light-text/90 dark:text-dark-text/80">New York Times</span>
        </h1>
        <div>
          <button className="bg-light-accent text-light-text  rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110">
            <Link>View All News</Link>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-12 md:py-14 xl:py-20 px-3">
        {data.map((post, i) => (
          <NytPopularCard key={i} popularPost={post}></NytPopularCard>
        ))}
      </div>
</div>
    </div>
  );
};

export default NewYorkTimePopularPost;
