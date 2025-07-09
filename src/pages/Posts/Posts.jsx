import React from "react";
import useAxios from "../../hooks/useAxiosSecure/useAxios";
import { useQuery } from "@tanstack/react-query"; 
import PostCard from "./PostsCard";

const Posts = () => {
  const axios = useAxios();

  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("/posts");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center py-10 text-primary font-urbanist">Loading...</div>
    );
  if (error)
    return (
      <div className="text-center py-10 text-red-500 font-urbanist">
        Error: {error.message}
      </div>
    );

  return (
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-base-100 font-urbanist">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-base-content mb-8">
        All Posts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-8">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Posts;
