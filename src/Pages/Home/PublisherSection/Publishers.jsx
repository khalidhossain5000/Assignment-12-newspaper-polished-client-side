import React from "react";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../Shared/Loading/Loading";



const Publishers = () => {
  const axiosInstance = useAxios();
  const { user } = useAuth();




  //getting publisher data from db
  const { data: publishers = [], isPending } = useQuery({
    queryKey: ["publishers", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/publishers");
      return res.data;
    },
  });







  if (isPending) return <Loading/>
  return (
    <div className="py-12 md:py-24 relative z-0 font-secondary bg-dark-primary">
      <h2 className="dark:text-dark-text text-center text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-light-text font-bold pb-12 font-secondary">All Publishers</h2>

      <div className="py-9 px-4 lg:px-0" >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {publishers.map((publisher) => (
            <SwiperSlide key={publisher._id}>
              <div 
            
              className="overflow-x-hidden publisher-card bg-light-accent/50 dark:bg-dark-accent/65 shadow-md rounded-lg flex flex-col items-center md:justify-center p-4 gap-2  lg:p-6">
                  
                <img
                  src={publisher?.publisherPic}
                  alt={publisher.name}
                  className="w-20 h-20 object-contain"
                />
                <h2 className="text-center font-semibold font-secondary md:text-xl xl:text-2xl pt-3 lg:pt-6 lg:font-bold whitespace-nowrap">
                  {publisher?.publisherName}
                </h2>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Publishers;
