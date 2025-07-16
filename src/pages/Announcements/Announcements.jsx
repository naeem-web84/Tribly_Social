import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxiosSecure/useAxios";
import { Typewriter } from "react-simple-typewriter";
import { HiSpeakerphone } from "react-icons/hi"; // 📢 React Icon

const fetchAnnouncements = async (axiosInstance) => {
  const response = await axiosInstance.get("/api/announcements");
  return response.data;
};

const Announcements = () => {
  const axios = useAxios();

  const {
    data: announcements = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: () => fetchAnnouncements(axios),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="text-center py-10 text-lg font-semibold text-primary">
        Loading announcements...
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10 text-red-500 font-medium">
        Error: {error.message}
      </div>
    );

  return (
    <section className="w-full bg-secondary text-secondary-content py-12 px-4 md:px-10 lg:px-20 font-urbanist">
      <div className="max-w-6xl mx-auto">
        {/* Header with React Icon + Typewriter */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex justify-center items-center gap-2">
            <HiSpeakerphone className="text-primary text-4xl" />
            <Typewriter
              words={["Latest Announcements", "Important Updates", "What's New?"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>
          <p className="text-base-content/70 mt-2 max-w-xl mx-auto">
            Stay informed with recent updates, important notices, and
            announcements.
          </p>
        </div>

        {/* Announcement Cards */}
        {announcements.length === 0 ? (
          <p className="text-center text-base-content/60">No announcements yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {announcements.map((ann) => (
              <article
                key={ann._id}
                className="bg-base-100 border border-base-300 rounded-xl shadow-md p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-primary mb-2">
                  {ann.title}
                </h3>
                <p className="mb-4 text-base-content/80">{ann.message}</p>

                {/* Author Info */}
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={
                      ann.postedBy?.photo ||
                      "https://via.placeholder.com/40?text=User"
                    }
                    alt={ann.postedBy?.name || "User"}
                    className="w-10 h-10 rounded-full object-cover border border-primary"
                  />
                  <div>
                    <p className="font-semibold text-base-content">
                      {ann.postedBy?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-base-content/60">
                      {ann.postedBy?.email || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Timestamp */}
                <time
                  className="text-xs text-base-content/60 block mt-1"
                  dateTime={ann.createdAt}
                >
                  🕒 {new Date(ann.createdAt).toLocaleString()}
                </time>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Announcements;
