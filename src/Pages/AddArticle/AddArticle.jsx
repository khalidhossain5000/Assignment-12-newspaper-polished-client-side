import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { tagOptions } from "./Data/TagOptions";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FiUpload } from "react-icons/fi";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import FormLoading from "../Shared/Loading/FormLoading";

const AddArticle = () => {
  const [articlePic, setArticlePic] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [articleSendingLoader, setArticleSendingLoader] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  //getting publisher data from db
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });
  //  Map data to making it usable format for react multi select
  const publisherOptions = publishers.map((pub) => ({
    value: pub._id,
    label: pub.publisherName,
  }));

  const {
    register,
    handleSubmit,
    control,
    reset,
    // formState: { errors },
  } = useForm({
    defaultValues: {
      publisher: null,
      tags: [],
    },
  });

  const onSubmit = (data) => {
    const articlesData = {
      authorName: user?.displayName,
      authorEmail: user?.email,
      authorPhoto: user?.photoURL,
      ...data,
      articlePic,
      views: 0,
      status: "pending",
      createdAt: new Date().toISOString(),
      isPremium: false,
    };
    //LOAIDNG TRUE UNTIL DATA SEND COMPLETED
    setArticleSendingLoader(true);
    //SENDING DATA TO DB
    axiosSecure
      .post("/articles", articlesData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Article Submitted Successfully",
            icon: "success",
            html: "<p class='text-xl   mt-2'>Your article has been submitted and is currently under review. It will be published once approved by an admin.</p>",
            confirmButtonText: "Ok!",
            background: "#0a2b4a", // dark bg
            color: "#ffffff", // white text
            buttonsStyling: false,
            customClass: {
              popup: "gradient-bg",
              confirmButton:
                "bg-[#13a0b5] hover:bg-[#040230] text-white font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
            },
          });
          setArticleSendingLoader(false);
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response?.status === 403) {
          Swal.fire({
            icon: "warning",
            title: "Limit Reached",
            text: "You already posted one article. Please take premium to post more.",
            confirmButtonText: "Get Premium",
            showCancelButton: true,
            color: "#ffffff",
            buttonsStyling: false,
            customClass: {
              popup: "error-gradient-bg",
              confirmButton:
                "bg-gradient-to-r from-yellow-500 via-yellow-500 to-yellow-600 hover:bg-yellow-500  text-black font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
              cancelButton:
                "bg-yellow-600 ml-3 text-xl text-black cursor-pointer hover:bg-yellow-500 font-bold px-6 py-2 rounded-xl",
            },
            cancelButtonText: "Cancel",
          }).then((result) => {
            if (result.isConfirmed) {
              // এখানে তুমি ইউজারকে premium subscription page এ redirect করতে পারো
              navigate("/subscription"); // React Router useNavigate দিয়ে
            }
          });
        } else {
          Swal.fire("Error", "Something went wrong!", "error");
        }
      });
  };

  //iamge
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreviewUrl(URL.createObjectURL(image)); // ✅ preview দেখানোর জন্য
    }
    const formData = new FormData();
    formData.append("image", image);
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_Imgbb_Key
    }`;

    const res = await axios.post(imagUploadUrl, formData);
    setArticlePic(res.data.data.display_url);
  };

  return (
    <div className="bg-light-primary min-h-screen mb-6 px-3">
      <div className="container w-full mx-auto py-6 lg:py-12 ">
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl xl:text-6xl text-light-text font-bold pb-12 font-secondary">
          Add Article{" "}
        </h1>
      </div>

      <div className="container md:mx-auto bg-light-secondary w-full p-6 shadow-2xl rounded-xl ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center">
            <h2 className="text-light-text/50 font-primary py-3 text-2xl text-left md:w-9/12 mx-auto">
              Add Article Title
            </h2>
            <input
              type="text"
              className="mx-auto border border-light-text w-full md:w-9/12 p-2 rounded-md placeholder:text-light-text focus:outline-none
             focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
              placeholder="Article Title"
              {...register("articleTitle")}
            />
          </div>
          <div className="mx-auto border border-light-text p-6 md:w-9/12 my-2 rounded-xl shadow-md">
            <label htmlFor="image" className="block text-light-text/50 font-primary py-3 text-xl">
              Select Article Image:
            </label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-4 w-12 h-12 rounded-full shadow mb-2 lg:mb-5"
              />
            )}
            <label
              htmlFor="image"
              className="mx-auto flex items-center gap-3 px-4 py-2 bg-light-primary text-light-text border border-light-text rounded-md cursor-pointer hover:bg-light-text/20 transition"
            >
              <FiUpload className="text-xl" />
              <span>Choose Image</span>
            </label>

            <input
              onChange={handleImageUpload}
              className="hidden mx-auto"
              type="file"
              id="image"
              name="image"
              accept="image/*"
            />
          </div>
          {/* tag code */}
          {/* Tags field */}
          <div className="">
            <label
              style={{
                display: "block",
                marginTop: "20px",
                marginBottom: "5px",
              }}
              className="text-light-text/50 font-primary py-3 text-2xl text-left md:w-9/12 mx-auto"
            >
              Tags
            </label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={tagOptions}
                  isMulti
                  placeholder="Select Tags"
                  onChange={(selectedOptions) =>
                    field.onChange(selectedOptions)
                  }
                  value={field.value}
                  className="border border-light-text w-full md:w-9/12  mx-auto p-2 rounded-md placeholder:text-light-text focus:outline-none focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
                />
              )}
            />
          </div>
          {/* PUBLISHER DATA */}
          {/* Publisher field */}
          <div>
            <label
              style={{ display: "block", marginBottom: "5px" }}
              className="text-light-text/50 font-primary py-3 md:text-2xl text-left md:w-9/12 mx-auto"
            >
              Publisher
            </label>
            <Controller
              name="publisher"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={publisherOptions}
                  placeholder="Select Publisher"
                  onChange={(selectedOption) => field.onChange(selectedOption)}
                  value={field.value}
                  isLoading={isLoading}
                  className="border border-light-text w-full md:w-9/12 mx-auto p-2 rounded-md placeholder:text-light-text focus:outline-none focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
                />
              )}
            />
          </div>
          <div className="mx-auto text-center">
            <label className="block text-light-text/50 font-primary py-3 text-xl md:text-2xl w-full md:w-9/12 text-left mx-auto">
              Descriptions
            </label>
            <textarea
              rows={3}
              cols={50}
              placeholder="Add Article Details"
              className="border w-full md:w-9/12 rounded-xl shadow-sm my-3 p-6 mx-auto"
              {...register("descriptions")}
            />
          </div>

          <div className="text-center">
            {articleSendingLoader ? (
              <div className="w-9/12 mx-auto text-3xl">
                <FormLoading />
              </div>
            ) : (
              <input
                className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110 w-9/12 mx-auto cursor-pointer"
                type="submit"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddArticle;
