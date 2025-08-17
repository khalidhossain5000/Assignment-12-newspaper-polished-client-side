import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { tagOptions } from "../AddArticle/Data/TagOptions";
import { useQuery } from "@tanstack/react-query";

import useAuth from "../../Hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import ArticelsCard from "./ArticelsCard";
import useAxios from "../../Hooks/useAxios";

const PublicAllArticles = () => {
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const inputRef = useRef(null);

  const axiosInstance = useAxios();

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white",
      borderRadius: "0.5rem", // rounded-lg
      borderColor: state.isFocused ? "#211f54" : "#d1d5db", // ফোকাসে primary color
      boxShadow: state.isFocused ? "0 0 0 2px rgba(33,31,84,0.4)" : "none", // হালকা glow
      padding: "4px 8px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280", // gray-500
      fontWeight: 500,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#211f54",
      fontWeight: 600,
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#211f54",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#211f54",
    }),
  };

  //getting publisher data from db
  const { data: publishers = [], isLoading: publisherLoading } = useQuery({
    queryKey: ["publishers", user?.email],
    queryFn: async () => {
      const res = await axiosInstance.get("/publishers");
      return res.data;
    },
  });
  //  Map data to making it usable format for react multi select
  const publisherOptions = publishers.map((pub) => ({
    value: pub._id,
    label: pub.publisherName,
  }));

  console.log(publisherOptions, "thi sis options of the publisher");

  const publisherValue = selectedPublisher?.value || "";
  const tagsValue = selectedTags.map((tag) => tag.value).join(",");

  //ARTICLES DATA LOADING IS RELATED ---->
  const { data: atricles = [], isLoading } = useQuery({
    queryKey: ["articles", searchText, selectedPublisher, selectedTags],
    queryFn: async () => {
      const res = await axiosInstance.get("/articles/approved", {
        params: {
          search: searchText,
          publisher: publisherValue,
          tags: tagsValue, // array থেকে comma separated string
        },
      });
      return res.data;
    },
  });

  useEffect(() => {
    inputRef.current?.focus();
  });
  if (isLoading || publisherLoading) return <Loading />;
  return (
    <div className="bg-light-primary">
      <h1 className="text-center text-3xl lg:text-5xl font-bold text-light-text font-primary py-12 ">
        All Articles
      </h1>

      <div className="flex flex-col lg:flex-row container mx-auto">

      <div className="serch w-96 mx-auto py-12 rounded-lg shaodw-xl font-secondary flex-1 bg-light-secondary p-3 md:w-full xl:w-96">
        <div className="flex max-w-full lg:max-w-full w-full mb-4 rounded-lg overflow-hidden border border-gray-300 shadow-md">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search articles by title"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-grow px-4 py-3 text-light-text placeholder-light-text/60 
               focus:outline-light-text/30 "
          />
          <button className="bg-light-accent hover:bg-light-accent/60 text-light-text font-semibold px-6 py-3 transition-colors duration-300">
            Search
          </button>
        </div>

        {/* Publisher Single Select */}
        {/* <Select
          options={publisherOptions}
          value={selectedPublisher}
          onChange={setSelectedPublisher}
          placeholder="Select Publisher"
          isClearable
          className="mb-4"
        /> */}
        <Select
          options={publisherOptions}
          value={selectedPublisher}
          onChange={setSelectedPublisher}
          placeholder="Select Publisher"
          isClearable
          styles={customStyles}
          className="mb-4"
        />
        {/* Tags Multi Select */}
        <Select
          options={tagOptions}
          value={selectedTags}
          onChange={setSelectedTags}
          isMulti
          placeholder="Select Tags"
          className="mb-4"
          styles={customStyles}
        />
      </div>

      {atricles.length === 0 ? (
        <p className="text-center text-lg text-gray-500 py-10">
          No articles found matching your search/filter.
        </p>
      ) : (
        <div className="py-12 flex-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 lg:max-w-full px-3  gap-6">
          {atricles.map((article) => (
            <ArticelsCard key={article._id} article={article}></ArticelsCard>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default PublicAllArticles;
