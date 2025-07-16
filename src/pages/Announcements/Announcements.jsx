import React from "react";
import { useQuery } from "@tanstack/react-query"; 
import useAxios from "../../hooks/useAxiosSecure/useAxios";

const fetchAnnouncements = async (axiosInstance) => {
  const response = await axiosInstance.get("/api/announcements");
  return response.data;
};

const Announcements = () => {
  const axiosInstance = useAxios();

  const {
    data: announcements = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => fetchAnnouncements(axiosInstance),
    staleTime: 5 * 60 * 1000, // cache for 5 mins
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading announcements...</p>;
  if (isError) return <p>Error loading announcements: {error.message}</p>;

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md max-w-4xl mx-auto my-10">
      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">
        Announcements
      </h2>
      {announcements.length === 0 ? (
        <p className="text-center text-gray-500">No announcements yet.</p>
      ) : (
        <div className="space-y-6">
          {announcements.map((ann) => (
            <article
              key={ann._id}
              className="border border-gray-300 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-900 shadow-sm"
            >
              <h3 className="text-xl font-bold text-primary mb-2">{ann.title}</h3>
              <p className="mb-3 text-gray-700 dark:text-gray-300">{ann.message}</p>
              <div className="flex items-center space-x-3">
                <img
                  src={ann.postedBy?.photo || "https://via.placeholder.com/40"}
                  alt={ann.postedBy?.name || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {ann.postedBy?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {ann.postedBy?.email || ""}
                  </p>
                </div>
              </div>
              <time className="mt-3 text-sm text-gray-500 dark:text-gray-400" dateTime={ann.createdAt}>
                {new Date(ann.createdAt).toLocaleString()}
              </time>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Announcements;
