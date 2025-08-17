import axios from "axios";
import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const AddPublisher = () => {
  const [publisherPic, setPublisherPic] = useState("");
  const axiosSecure = useAxiosSecure();
  const handlePublisher = (e) => {
    e.preventDefault();
    const form = e.target;
    const publisherName = form.publisher.value;
    const publsiherData = {
      publisherName,
      publisherPic,
    };
    //data sending to mongo db here
    axiosSecure
      .post("/publishers", publsiherData)
      .then((res) => {
        
        if (res.data.publisherId) {
           toast.success(`Publisher Added SuccessFully`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid #08086c",
            color: "white",
            backgroundImage: "linear-gradient(to bottom right, #050342,#01c3f4 )"
          },
        });
        }
      })
      .catch((error) => {
        console.log(("this is ", error));
      });
    
  };
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setPublisherPic(res.data.data.url);
  };
  
  return (
    <div className="bg-dark-primary pb-12">
      <div className="w-full h-64 md:h-80 bg-gradient-to-tr from-light-text/5 via-light-primary to-light-secondary  dark:from-dark-primary dark:via-dark-secondary dark:to-dark-secondary flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-4">
          <h1 className="text-light-text dark:text-dark-text font-secondary text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Add Publisher
          </h1>
          
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 dark:bg-dark-accent dark:opacity-40 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full dark:bg-dark-accent dark:opacity-90 transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      

      <form
        onSubmit={handlePublisher}
        className="bg-light-primary dark:bg-dark-accent/90 p-6 rounded-2xl shadow-xl mt-12 space-y-5 text-light-text max-w-3xl mx-auto"
      >
        <div>
          <input
            className="w-full px-4 py-3 border border-light-text/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#211f54] focus:border-transparent transition duration-200 placeholder-light-text text-sm bg-light-secondary  font-secondary"
            type="text"
            name="publisher"
            placeholder="Enter Publisher Name"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium mb-2 font-secondary ">
            Select Publisher Image
          </label>
          <input
            onChange={handleImageUpload}
            className="w-full border border-light-text/30 file:bg-light-accent/90 dark:file:bg-dark-primary file:text-white file:px-4 file:py-2 file:rounded-md file:border-none file:cursor-pointer bg-light-secondary font-secondary rounded-lg text-sm text-light-text"
            type="file"
            id="image"
            name="image"
            accept="image/*"
          />
        </div>

        <input
          type="submit"
          value="Add Publisher"
          className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-105 w-full font-secondary font-bold cursor-pointer "
        />
      </form>

    </div>
  );
};

export default AddPublisher;
