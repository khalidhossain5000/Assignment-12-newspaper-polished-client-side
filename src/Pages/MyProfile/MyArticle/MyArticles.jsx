import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

import MyArticlesTable from "./MyArticlesTable";

const MyArticles = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();
  const {
    data: myArticles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-articles", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/articles/my-articles?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  return (
    <div>
       <div className="w-full h-64 md:h-80 bg-gradient-to-tr from-light-text/5 via-light-primary to-light-secondary flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-4">
          <h1 className="text-light-text font-secondary text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            My Articles
          </h1>
          
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="overflow-x-auto rounded-box border border-light-text/50 shadow-xl container mx-auto mt-6 lg:mt-9">
        <table className="table">
          {/* head */}
          <thead className="bg-light-text/60">
            <tr className="text-xl text-light-primary font-secondary border-b border-b-light-text/60 ">
              <th>#</th>
              <th>Article Title</th>
              <th>Article Details</th>
              <th>Status</th>
              <th>Is Premium</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myArticles.map((ma, i) => (
              <MyArticlesTable
                refetch={refetch}
                serial={i}
                key={ma._id}
                myArticle={ma}
              ></MyArticlesTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyArticles;
