// src/components/TagBoard/TagBoard.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaHashtag } from "react-icons/fa";
import useAxios from "../../hooks/useAxiosSecure/useAxios";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 },
  }),
};

const TagBoard = () => {
  const axios = useAxios();

  const { data: tags = [], isLoading, isError } = useQuery({
    queryKey: ["allTags"],
    queryFn: async () => {
      const res = await axios.get("/tags");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center text-lg py-12">Loading tags...</p>;
  }
  if (isError) {
    return <p className="text-center text-error py-12">Failed to load tags.</p>;
  }
  if (tags.length === 0) {
    return <p className="text-center text-gray-500 py-12">No tags found.</p>;
  }

  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 font-urbanist bg-secondary text-secondary-content">
      <div className="max-w-6xl mx-auto text-center space-y-4 mb-10">
        <h2 className="text-4xl font-bold">🔖 Explore Tags</h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Discover trending tags added by our community.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
      >
        {tags.map((tag, i) => (
          <motion.div
            key={tag._id}
            custom={i}
            variants={cardVariants}
            className="bg-base-100 text-base-content rounded-xl shadow-lg p-6 border border-base-300 hover:shadow-xl transition duration-300 flex flex-col items-center"
          >
            <div className="p-3 bg-primary text-primary-content rounded-full shadow mb-3">
              <FaHashtag size={20} />
            </div>
            <h3 className="text-lg font-semibold text-center break-words max-w-full">
              {tag.name}
            </h3>
            <div className="text-sm text-base-content/70 mt-2 text-center break-words">
              Added by: <span className="font-medium">{tag.userName}</span>
            </div>
            <div className="text-xs text-base-content/50 mt-1 text-center">
              {new Date(tag.createdAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TagBoard;
