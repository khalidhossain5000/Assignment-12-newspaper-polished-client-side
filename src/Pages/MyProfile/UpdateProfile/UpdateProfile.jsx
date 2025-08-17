import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import axios from "axios";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FiUpload } from "react-icons/fi";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { loading, updateUserProfile, user, setUser } = useAuth();
  const [updatedPic, setUpdatedPic] = useState(user?.photoURL);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [updatingLoader,setUpdatingLoader]=useState(false)
 
  const axiosSecure = useAxiosSecure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedName = e.target.updatedName.value;
    const updatedPhoto = updatedPic;
    //UPDATE INFO IN THE DB
    const updatedDbInfo = {
      name: updatedName,
      profilePic: updatedPhoto,
    };
    // UPDATING LOADIN START
    setUpdatingLoader(true)
    const res = await axiosSecure.patch(
      `/users?email=${user?.email}`,
      updatedDbInfo
    );
    // UPDAITNG LOADING ENDS
    console.log("res ", res);
    //update user profiel
    updateUserProfile({ displayName: updatedName, photoURL: updatedPhoto })
      .then(() => {
        setUser({ ...user, displayName: updatedName, photoURL: updatedPhoto });
        toast.success(`Profile Updated SuccessFully`, {
          className: "w-[300px] h-[100px] text-xl font-bold ",
          removeDelay: 1000,
          iconTheme: {
            primary: "#16061e",
            secondary: "#ef54e2",
          },
          style: {
            border: "1px solid #08086c",
            color: "white",
            backgroundImage: "linear-gradient(to bottom right, #02AAB0,#00CDAC )"
          },
        });
        // UPDATING LOADIN START
        setUpdatingLoader(false)
        // UPDATING LOADIN ENDS
      })
      .catch((error) => {
        console.log("error updated", error);
      });
  };
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

    setUpdatedPic(res.data.data.url);
  };
  if (loading) return <Loading />;
  return (
    <div className="bg-[#e8efef] shadow-2xl rounded-xl">
      <div className="w-full h-64 md:h-80 bg-gradient-to-tr from-light-text/5 via-light-primary to-light-secondary flex items-center justify-center relative overflow-hidden">
        <div className="text-center px-4">
          <h1 className="text-light-text font-secondary text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Update Profile
          </h1>
          
        </div>
        {/* Subtle overlay shapes in primary text color */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#211F54] opacity-10 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#211F54] opacity-10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      </div>
      <form onSubmit={handleSubmit} className=" space-y-4 max-w-2xl mt-12 shadow-2xl mx-auto bg-[#f0f2fb] p-6 lg:p-12">
        <div className="mx-auto  text-center">
          <label className="block text-left md:w-9/12 mx-auto">Name:</label>
          <input
            type="text"
            name="updatedName"
            defaultValue={user?.displayName}
            className=" mx-auto border border-light-text/60 w-full md:w-9/12 p-2 rounded-md placeholder:text-[#211f54] focus:outline-none
             focus:ring-0
             focus:shadow-[0_0_0_4px_rgba(33,31,84,0.2)]
             transition duration-300"
          />
        </div>
        {/* updaetd image */}
        <div>
          <div className="mx-auto border border-light-text/60 p-6 md:w-9/12 my-2 rounded-xl shadown-md">
            <label htmlFor="image" className="block text-light-text/60 py-3 text-xl">
              Select Profile Image:
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
              className="mx-auto flex items-center gap-3 px-4 py-2 bg-light-primary text-light-text border border-light-text/60 rounded-md cursor-pointer hover:bg-gray-200 transition"
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
        </div>

        <div className="text-center">
          <button
          type="submit"
          className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110 w-full cursor-pointer font-secondary font-bold"
        >
          {
            updatingLoader ? "Updating..........." : "Update Profile"
          }
        </button>
        </div>
      </form>
    </div>
  );
};

//   <label htmlFor="image" className="block mb-2 text-sm">
//   Select Image:
// </label>
// <input
//   onChange={handleImageUpload}
//   className="bg-gray-200 cursor-pointer"
//   type="file"
//   id="image"
//   name="image"
//   accept="image/*"
// />
export default UpdateProfile;
