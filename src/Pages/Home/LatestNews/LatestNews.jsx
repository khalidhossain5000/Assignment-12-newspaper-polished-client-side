import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading/Loading";
import { Link } from "react-router";

const LatestNews = () => {
  const axiosInstance = useAxios();

  const { data: latestNews = [], isLoading } = useQuery({
    queryKey: ["latest-news"],
    queryFn: async () => {
      const res = await axiosInstance.get("/articles/latest");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="py-24 bg-[#e6ebfb]">
      <h1 className="text-5xl font-bold text-center py-12">Latest News</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 container mx-auto gap-6">
        {latestNews.map((news, i) => (
          <div
            key={i}
            className=" p-1 rounded-xl max-w-sm mx-auto mt-8 hover:scale-105 transition duration-300"
          >
            <div className="bg-gray-900 rounded-lg overflow-hidden h-full">
              <img
                src={news.articlePic}
                alt={news.articleTitle}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4 text-white">
                <Link to={`/article/${news?._id}`}>
                  <h3 className="text-xl font-bold mb-2">
                    {news.articleTitle}
                  </h3>
                </Link>
                <p className="text-gray-300">
                  {news.descriptions?.slice(0, 60)}...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
