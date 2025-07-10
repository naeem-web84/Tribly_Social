import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxiosSecure/useAxios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostsCard";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "../../components/loading/Loading";

const Posts = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const limit = 5;

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", page, sortByPopularity],
    queryFn: async () => {
      const sortQuery = sortByPopularity ? "&sortBy=popularity" : "";
      const res = await axios.get(`/posts?page=${page}&limit=${limit}${sortQuery}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <div className="text-center py-10">Error loading posts</div>;

  const { posts, totalPosts } = data;
  const totalPages = Math.ceil(totalPosts / limit);

  // Animation variants for the posts grid
  const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-base-100 font-urbanist">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-base-content mb-4">
        All Posts
      </h1>

      <div className="flex justify-center mb-6">
        <CustomButton
          className="btn-sm border border-primary text-primary hover:bg-primary hover:text-primary-content"
          onClick={() => setSortByPopularity(!sortByPopularity)}
        >
          {sortByPopularity ? "Show Latest" : "Sort by Popularity"}
        </CustomButton>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={page + (sortByPopularity ? "-pop" : "-latest")}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8 mb-10"
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        <CustomButton
          className="btn-sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          <FaChevronLeft />
        </CustomButton>

        {Array.from({ length: totalPages }, (_, i) => (
          <CustomButton
            key={i}
            className={`btn-sm ${
              page === i + 1
                ? "btn-primary"
                : "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-content"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </CustomButton>
        ))}

        <CustomButton
          className="btn-sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          aria-label="Next Page"
        >
          <FaChevronRight />
        </CustomButton>
      </div>
    </section>
  );
};

export default Posts;
