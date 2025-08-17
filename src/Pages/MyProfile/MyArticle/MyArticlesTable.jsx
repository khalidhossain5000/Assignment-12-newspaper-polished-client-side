import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import Modal from "react-modal";
Modal.setAppElement("#root");
import { FiTrash2 } from "react-icons/fi";
const MyArticlesTable = ({ myArticle, serial, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const openModal = (reason) => {
    setDeclineReason(reason);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeclineReason("");
  };
  const handleArticleUpdate = (e) => {
    e.preventDefault();
  };

  //ARTICLE DELETE REALTED API
  const handleDelete = (articleId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      buttonsStyling: false,
      color: "black",
      customClass: {
        popup: "error-gradient-bg",
        confirmButton:
          "bg-gradient-to-r from-yellow-500 text-black  to-amber-600 hover:bg-red-200  text-black font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
        cancelButton:
          "bg-yellow-600 ml-3 text-xl text-black cursor-pointer hover:bg-yellow-500 font-bold px-6 py-2 rounded-xl",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/articles/${articleId}`);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!The article has been deleted.",
              icon: "success",
              buttonsStyling: false,
              color: "black",
              customClass: {
                popup: "error-gradient-bg",
                confirmButton:
                  "bg-gradient-to-r from-yellow-500 text-black  to-amber-600 hover:bg-red-200  text-black font-semibold px-6 py-2 rounded-sm shadow-md  cursor-pointer",
                cancelButton:
                  "bg-yellow-600 ml-3 text-xl text-black cursor-pointer hover:bg-yellow-500 font-bold px-6 py-2 rounded-xl",
              },
            });
            refetch();
          } else {
            console.log("Failed!", "Could not delete the article.", "error");
          }
        } catch (err) {
          console.log("Error!", err);
        }
      }
    });
  };
  const { articleTitle, isPremium } = myArticle;
 
  return (
    <tr>
      <th>{serial + 1}</th>

      <td className="line-clamp-2">
        {/* {articleTitle.split(" ").slice(0, 15).join(" ")}....... */}
        {articleTitle}
      </td>
      <td>
        {/* <Link
          to={`/article/${myArticle._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Details
        </Link> */}
        <Link
          to={`/article/${myArticle._id}`}
          
        >
          <button  className="bg-light-accent text-light-text xl:py-[5px] xl:px-[20px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110 w-full font-secondary font-bold mx-auto cursor-pointer">Details</button>
        </Link>
      </td>
      <td>
        

        <td className="py-4">
          {myArticle.status === "declined" ? (
            <div className="flex items-center gap-3">
              <span className="bg-red-200 text-red-800 text-sm font-semibold px-3 py-1 rounded-full shadow-sm">
                Declined
              </span>

              <button
                onClick={() => openModal(myArticle?.declineReason)}
                className="cursor-pointer relative inline-flex items-center justify-center overflow-hidden rounded-full px-4 py-[6px] text-sm font-medium text-blue-600 border border-blue-600 group hover:text-white transition-all duration-200"
              >
                <span className="absolute inset-0 bg-blue-600 transition-all duration-300 ease-out transform scale-x-0 group-hover:scale-x-100 origin-left rounded-full"></span>
                <span className="relative z-10">View Reason</span>
              </button>
            </div>
          ) : (
            <span
              className={`capitalize px-3 py-1 rounded-full text-sm font-semibold
        ${
          myArticle.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : myArticle.status === "approved"
            ? "bg-green-100 text-green-700"
            : "bg-gray-200 text-gray-700"
        }`}
            >
              {myArticle?.status}
            </span>
          )}
        </td>
      </td>

      <td>
        {isPremium ? (
          <span className="inline-block px-4 py-[6px] text-sm font-semibold text-light-text bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
            Premium
          </span>
        ) : (
          <span className="text-sm font-medium text-red-600">No</span>
        )}
      </td>
      <td className="space-y-3">
        <div className="flex items-center gap-6">
         
          <Link
            to={`/my-profile/update-my-article/${myArticle._id}`}
            onClick={() => handleArticleUpdate(myArticle)}
            className="
    inline-flex items-center whitespace-nowrap
    px-5 py-2 text-sm font-semibold
    text-light-text hover:text-light-text border-1 border-light-text
    rounded-full
    transition-all duration-200
    hover:bg-light-accent
    hover:shadow-lg hover:-translate-y-0.5
  "
          >
            Update Article
          </Link>

          {/* <button
            onClick={() => handleDelete(myArticle._id)}
            className="btn btn-error btn-sm cursor-pointer"
          >
            Delete Article
          </button> */}

          <button
            onClick={() => handleDelete(myArticle._id)}
            className="bg-light-accent text-light-text xl:py-[5px] xl:px-[20px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110 w-6/12 font-secondary font-bold mx-auto cursor-pointer"
          >
            Delete Article
          </button>
        </div>
      </td>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Decline Reason Modal"
        className="p-6 bg-[#e7e9f5] rounded-xl  shadow-lg w-[400px] lg:w-[600px] mx-auto mt-20 z-50"
        overlayClassName="fixed inset-0 bg-black/30 flex justify-center items-center"
      >
        <h2 className="text-lg font-bold mb-4 text-red-600">Decline Reason</h2>
        <p className="mb-6">{declineReason || "No reason provided."}</p>
        <button
          onClick={closeModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Close
        </button>
      </Modal>
    </tr>
  );
};

export default MyArticlesTable;
