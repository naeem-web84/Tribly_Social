import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../hooks/useAxiosSecure/useAxios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./PostsCard";
import CustomButton from "../../components/CustomButton/CustomButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loading from "../../components/loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

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
  if (error) return <ErrorPage></ErrorPage>;

  const { posts, totalPosts } = data;
  const totalPages = Math.ceil(totalPosts / limit);

  const gridVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="px-4 md:px-10 lg:px-20 py-12 font-urbanist bg-secondary text-secondary-content">
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">
          📰 All Posts
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          Browse the latest or most popular posts from our community.
        </p>
        <CustomButton
          className="btn-sm border border-primary text-primary hover:bg-primary hover:text-primary-content mt-4 transition"
          onClick={() => setSortByPopularity(!sortByPopularity)}
        >
          {sortByPopularity ? "Show Latest" : "Sort by Popularity"}
        </CustomButton>
      </div>

      {/* Post Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={page + (sortByPopularity ? "-pop" : "-latest")}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6 md:gap-8 mb-12"
        >
          {posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 flex-wrap">
        <CustomButton
          className="btn-sm border border-base-300 hover:bg-primary hover:text-primary-content transition"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          <FaChevronLeft />
        </CustomButton>

        {Array.from({ length: totalPages }, (_, i) => (
          <CustomButton
            key={i}
            className={`btn-sm transition font-semibold ${
              page === i + 1
                ? "bg-primary text-primary-content"
                : "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-content"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </CustomButton>
        ))}

        <CustomButton
          className="btn-sm border border-base-300 hover:bg-primary hover:text-primary-content transition"
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
