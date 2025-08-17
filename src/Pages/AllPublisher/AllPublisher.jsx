import React from "react";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import AllPublisherCard from "./AllPublisherCard";
import Loading from "../Shared/Loading/Loading";

const AllPublisher = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();

  //getting publisher data from db
  const { data: articleCount = [], isPending } = useQuery({
    queryKey: ["articleCount", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/publishers-with-count");
      return res.data;
    },
  });

  if (isPending) return <Loading />;
  console.log(articleCount);
  return (
    <div className="bg-light-primary dark:bg-dark-primary">
      <h1 className="text-center text-3xl lg:text-5xl font-bold dark:text-dark-text text-light-text font-primary py-12 dark:text-dark-text">
        All Publishers
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 container mx-auto gap-3 md:gap-6 py-6 lg:py-12">
        {
            articleCount.map((publisher,i)=><AllPublisherCard
            key={i}
            publisher={publisher
            }
            ></AllPublisherCard>)
        }
      </div>
    </div>
  );
};

export default AllPublisher;
