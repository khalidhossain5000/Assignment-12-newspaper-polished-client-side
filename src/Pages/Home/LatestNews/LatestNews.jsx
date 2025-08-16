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
    <div className="py-12 md:py-24 bg-light-secondary">
      <h1 className="text-center text-4xl xl:text-6xl text-light-text font-bold pb-12 font-secondary">
        Latest News
      </h1>

      <div className="container mx-auto md:pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 md:px-6 xl:px-0">
          {latestNews.map((news, i) => (
            <div key={i} className="">

              <div className="bg-light-accent/50 rounded-lg overflow-hidden h-full flex flex-col">
                <div>
                  <img
                  src={news.articlePic}
                  alt={news.articleTitle}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                </div>
                <div className="p-4 text-light-text text-center lg:text-left">
                 
                    <h3 className="text-xl font-bold mb-2">
                      {news.articleTitle}
                    </h3>
                  
                  <p className="text-light-text/90">
                    {news.descriptions?.slice(0, 60)}...
                  </p>
                </div>
                {/* button */}
                <div className="mt-auto text-center pb-3 md:pb-6">
                  <button className="bg-light-accent text-light-text xl:py-[10px] xl:px-[30px] rounded-lg xl:text-xl whitespace-nowrap md:py-2 md:px-3 py-1 px-2 hover:bg-light-accent/60 transition duration-300 hover:scale-110">
                    <Link to={`/article/${news?._id}`}>Read More</Link>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
