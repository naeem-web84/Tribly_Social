import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxiosSecure/useAxios";
import { FaSearch, FaTimes } from "react-icons/fa";
import PostCard from "../Posts/PostsCard";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import searchLottie from "../../assets/lotties/search_lottie.json";

const SearchBanner = () => {
  const axios = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() !== "") {
        axios
          .get(`/search?tag=${searchTerm}`)
          .then((res) => setResults(res.data))
          .catch((err) => console.error(err));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, axios]);

  const handleClear = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <section className="bg-secondary text-secondary-content py-10 px-4 md:px-10 lg:px-20 font-urbanist">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold">Find Your Interest</h1>
        </div>

        {/* Lottie and subtitle side by side */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-24 md:w-24">
            <Lottie animationData={searchLottie} loop={true} />
          </div>
          <p className="text-base-content/70 text-lg md:text-xl font-medium">
            Search by tags to find relevant posts
          </p>
        </div>

        {/* WOW Search Box */}
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="Search by tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              peer
              w-full
              rounded-full
              border
              border-transparent
              bg-base-100
              px-14
              py-4
              text-base-content
              text-lg
              font-semibold
              placeholder:text-base-content/50
              focus:border-secondary-focus
              focus:ring-4
              focus:ring-secondary-focus/30
              focus:outline-none
              shadow-lg
              transition
              duration-300
              ease-in-out
            "
          />
          <FaSearch
            className="
              absolute
              left-5
              top-1/2
              -translate-y-1/2
              text-secondary-focus
              pointer-events-none
              text-xl
            "
          />
          {searchTerm && (
            <FaTimes
              onClick={handleClear}
              className="
                absolute
                right-5
                top-1/2
                -translate-y-1/2
                cursor-pointer
                text-red-500
                hover:text-red-700
                text-xl
                transition
                duration-200
                ease-in-out
              "
              title="Clear search"
            />
          )}
        </div>

        {/* Search Results */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <AnimatePresence mode="wait">
            {results.length > 0 ? (
              results.map((post, i) => (
                <motion.div
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            ) : (
              searchTerm && (
                <p className="col-span-full text-center text-base-content/60">
                  No results found.
                </p>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default SearchBanner;
