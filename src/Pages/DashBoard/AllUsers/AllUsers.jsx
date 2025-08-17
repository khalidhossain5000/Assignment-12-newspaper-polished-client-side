import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [limit, setLimit] = useState(10); // প্রতি পেজে কতজন

  //FETCH ALL USERS
  const {
    data = { users: [], total: 0 },
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", currentPage, limit], // 🧠 dynamic key
    queryFn: async () => {
      // const res = await axiosSecure.get("/users");
      const res = await axiosSecure.get(
        `/users?page=${currentPage}&limit=${limit}`
      );
      return res.data;
    },
  });
  const totalPages = Math.ceil(data.total / limit);
  const handleMakeAdmin = async (id) => {
    try {
      await axiosSecure.patch(`/users/admin/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;
  return (
    <div className="py-12 ">
      
       <div className="w-full h-64 md:h-80 bg-gradient-to-tr from-light-text/5 via-light-primary to-light-secondary flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-4">
          <h1 className="text-light-text font-secondary text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            All Users
          </h1>
          
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>



      <div className="overflow-x-auto rounded-box border border-light-text/50 p-6 bg-white container mx-auto lg:mt-12 px-3 lg:px-0">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-xl md:text-2xl text-light-text font-secondary border-b border-b-light-text/60 ">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data.users.map((user, i) => (
              <tr key={i} className="">
                <th className="border-b border-light-text/60">{i + 1}</th>
                <td className="border-b border-light-text/60">
                  <img
                    src={user?.profilePic}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                <td className="text-xs md:text-[17px] font-secondary font-medium text-light-text border-b border-light-text/60">
                  {user?.name}
                </td>
                <td className="text-xs md:text-[17px] font-secondary font-medium text-light-text border-b border-light-text/60">
                  {user?.email}
                </td>
                <td className="text-xs md:text-[19px] font-secondary font-bold text-light-text border-b border-light-text/60">
                  {user?.role}
                </td>
                <td className="border-light-text/60 border-b">
                  {user?.role === "admin" ? (
                    <span className="bg-light-accent text-light-text text-xs font-semibold px-3 py-1 rounded-full">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => {
                        handleMakeAdmin(user?._id);
                      }}
                      className="btn btn-sm btn-outline btn-light-secondary hover:bg-light-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex gap-2 mt-4 lg:mt-12 ">
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${
                currentPage === number
                  ? "bg-light-accent text-light-text text-xs font-bold px-3 lg:px-6 py-1 rounded-full"
                  : "bg-gray-200"
              }`}
            >
              {number + 1}
            </button>
          ))}

          <select
            className="border p-1 rounded mb-4"
            value={limit}
            onChange={(e) => {
              setLimit(parseInt(e.target.value));
              setCurrentPage(0); 
            }}
          >
            <option value={2}>2 per page</option>
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
