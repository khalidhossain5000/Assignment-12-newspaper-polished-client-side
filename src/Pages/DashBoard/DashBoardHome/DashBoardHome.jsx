import React from "react";
import PublisherChart from "../PublisherPieChart/PublisherChart";


const DashBoardHome = () => {
  
  return (
    <div className="pb-12 lg:pb-20 overfliw-x-hidden">
       <div className="w-full h-64 md:h-80 bg-gradient-to-tr from-light-text/5 via-light-primary to-light-secondary dark:from-dark-primary dark:via-dark-secondary dark:to-dark-secondary flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-4">
          <h1 className="text-light-text dark:text-dark-text font-secondary text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Admin Dashboard
          </h1>
          
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] dark:bg-dark-accent dark:opacity-40 opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] dark:bg-dark-accent dark:opacity-90 opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      
      <PublisherChart></PublisherChart>
    </div>
  );
};

export default DashBoardHome;
