import CountUp from "react-countup";

import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import useAxios from "../../../Hooks/useAxios";
import { FiUsers } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { MdWorkspacePremium } from "react-icons/md";

const Statistics = () => {
  const axiosInstance = useAxios();
  const fetchUserStats = async () => {
    const res = await axiosInstance.get("/user-stats");
    return res.data;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userStats"],
    queryFn: fetchUserStats,
  });

  if (isLoading) return <Loading />;
  refetch();

  return (
    <div className="py-12 md:py-24 bg-light-secondary">
      <h1 className="text-center text-4xl xl:text-6xl text-light-text font-bold pb-12 font-secondary">
        Statistics
      </h1>
      <div className="py-12 md:py-20 container mx-auto lg:flex flex-col lg:flex-row items-center  gap-12 px-4 lg:px-0 space-y-6 lg:space-y-0">
        <div className="p-3 lg:p-6 shadow-md flex-1  crd-1 bg-light-accent/90 border border-light-text/50 rounded-xl space-y-3 lg:space-y-3">
          <FiUsers
            style={{ margin: "auto" }}
            size={90}
            className="text-light-text"
          />
          <h2 className="text-[64px] font-extrabold text-center text-light-text">
            <CountUp end={data?.totalUsers} enableScrollSpy={true}></CountUp>+
          </h2>
          <h1 className="text-center text-2xl lg:text-4xl font-bold text-light-text">
            Total Users
          </h1>
        </div>

        <div className="bg-light-accent/90 border border-light-text/50 p-3 lg:p-6 shadow-md flex-1 crd-1 rounded-xl space-y-3 lg:space-y-6">
          <FaUserAlt
            style={{ margin: "auto" }}
            size={90}
            className="text-light-text"
          />
          <h2 className="text-[64px] font-extrabold text-center text-light-text">
            <CountUp end={data?.normalUsers} enableScrollSpy={true}></CountUp>+
          </h2>
          <h1 className="text-center text-2xl lg:text-4xl font-bold text-light-text">
            Normal Users
          </h1>
        </div>

        <div className="p-3 lg:p-6 shadow-md flex-1 crd-1 bg-light-accent/90 border border-light-text/50 rounded-xl space-y-3 lg:space-y-6">
          <MdWorkspacePremium
            style={{ margin: "auto" }}
            size={90}
            className="text-light-text"
          />
          <h2 className="text-[64px] font-extrabold text-light-text text-center">
            <CountUp end={data?.premiumUsers} enableScrollSpy={true}></CountUp>+
          </h2>
          <h1 className="text-center text-2xl lg:text-4xl font-bold text-light-text">
            Premium Users
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
