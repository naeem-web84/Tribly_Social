import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import { motion, AnimatePresence } from "framer-motion"; 
import Loading from "../../components/loading/Loading";
import PostsCard from "../../pages/Posts/PostsCard";

const ShowThreePosts = () => {
  const { user } = useAuth();
  const axios = useAxiosSecure();

  // Fetch 3 latest posts by user email
  const { data, isLoading, error } = useQuery({
    queryKey: ["threePosts", user?.email],
    enabled: !!user?.email && !!axios,
    queryFn: async () => {
      const res = await axios.get(`/posts/user/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <p className="text-center text-red-500 p-4">
        Failed to load your recent posts.
      </p>
    );

  if (!data || data.length === 0)
    return <p className="text-center p-4">You have no recent posts.</p>;

  // Framer motion variants for smooth fade-in + slide-up on mount
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
  };

  return (
    <section className="max-w-4xl mx-auto my-8 px-4 font-urbanist">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        My Recent Posts
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <AnimatePresence>
          {data.map((post) => (
            <motion.div
              key={post._id}
              variants={cardVariants}
              exit={{ opacity: 0, y: -20 }}
              className="w-full"
            >
              <PostsCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default ShowThreePosts;
