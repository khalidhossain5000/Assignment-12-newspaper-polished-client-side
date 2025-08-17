import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import Loading from "../Shared/Loading/Loading";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import PubisherPostCard from "./PubisherPostCard";

const PublisherPostPage = () => {
  const {id:publisherId}  = useParams();
  console.log(publisherId,"pubid");
  const axiosInstance = useAxios();
  const { user } = useAuth();

  //getting publisher data from db
  const { data: publisherPost = [], isPending } = useQuery({
    queryKey: ["articleCount", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/api/articles?publisherId=${publisherId}`);
      return res.data;
    },
  });

  if (isPending) return <Loading />;
  console.log(publisherPost,"from post ihgsdhgdgj");
  return (
    <div className="bg-light-primary dark:bg-dark-primary">
      <h2 className="text-center text-3xl lg:text-5xl font-bold dark:text-dark-text text-light-text font-secondary py-6 lg:py-12">News Posted By </h2>

      <div className="pb-6 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {
            publisherPost.map((post,i)=><PubisherPostCard
            post={post}
            key={i}
            ></PubisherPostCard>)
        }
      </div>
    </div>
  );
};

export default PublisherPostPage;
