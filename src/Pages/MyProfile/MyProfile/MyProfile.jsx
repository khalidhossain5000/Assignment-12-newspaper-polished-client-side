import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: currentUserFromDbData, isLoading } = useQuery({
    queryKey: ["log-in-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user?email=${user?.email}`);
      return res.data;
    },
  });
  //   const isPremiumUser=currentUserFromDbData?.premiumInfo

  if (isLoading) return <Loading />;
  
  return (
    <div className="w-full mx-auto bg-light-primary dark:bg-dark-primary rounded-2xl shadow-2xl pb-12">
      <div className="relative z-10 bg-[url('assets/background/another-bg.jpg')] bg-no-repeat bg-cover h-[200px] md:h-[300px] bg-top-right"></div>

      <div className="info bg-light-secondary dark:bg-dark-accent/90 container shadow-xl shadow-light-accent/10 rounded-xl mx-auto  relative p-6 pb-12 lg:pb-20 lg:px-12">
        <div className="imgname flex flex-col lg:flex-row items-center gap-6">
          <img
            src={user?.photoURL}
            alt=""
            className="lg:-mt-24 lg:z-30 relative w-24 shadow-md rounded-full lg:w-64 lg:rounded-[100px] p-2 lg:p-5 bg-transparent"
          />
          <div>
            <h1 className="text-center dark:text-dark-primary md:text-left py-3 lg:text-3xl text-light-text font-secondary font-bold">
              Name: {user?.displayName}
            </h1>
            <h2 className="text-xl text-center md:text-left dark:text-dark-primary font-bold text-light-text ">
              Email: {user?.email}
            </h2>
          </div>
        </div>

        <div className="mt-12 space-y-2 bg-white/90 dark:bg-dark-accent/50 dark:border-dark-primary p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row items-center justify-around">
          <h2 className="text-lg lg:text-xl font-semibold text-light-text tracking-wide">
            Role:{" "}
            <span className="font-bold text-light-text/50 dark:text-dark-secondary">
              {currentUserFromDbData?.role}
            </span>
          </h2>

          <h2 className="text-sm lg:text-base font-semibold lg:font-bold text-light-text tracking-wide">
            Premium Status:{" "}
            <span
              className={`ml-1 font-bold px-3 py-1 rounded-full text-light-text text-xs ${
                currentUserFromDbData?.premiumInfo
                  ? "bg-gradient-to-r from-light-accent to-light-accent/90 "
                  : "bg-red-600"
              }`}
            >
              {currentUserFromDbData?.premiumInfo || "Not Taken yet"}
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
