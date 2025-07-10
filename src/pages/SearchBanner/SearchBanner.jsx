import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxiosSecure/useAxios";
import { FaSearch, FaTimes } from "react-icons/fa";
import PostCard from "../Posts/PostsCard";
import { motion, AnimatePresence } from "framer-motion";

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
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold">Find Your Interest</h1>
        <p className="text-base-content/70">Search by tags to find relevant posts</p>

        {/* Search Box */}
        <div className="relative w-full max-w-xl mx-auto bg-base-100 rounded-md shadow-md p-1 sm:p-2 transition-all">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
          <input
            type="text"
            placeholder="Search by tag..."
            className="w-full pl-10 pr-10 py-3 rounded-md border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary bg-base-100 text-base-content transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <FaTimes
              className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 cursor-pointer"
              onClick={handleClear}
              title="Clear search"
            />
          )}
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
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
              <motion.p
                className="col-span-full text-center text-base-content/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                No results found.
              </motion.p>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SearchBanner;
