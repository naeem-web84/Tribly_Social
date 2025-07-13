import React from "react";
import { useParams } from "react-router"; // fixed here
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../components/loading/Loading";

const CommentsPage = () => {
  const { postId } = useParams();
  const axios = useAxiosSecure();

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(`/comments/post/${postId}`);
      return res.data;
    },
    enabled: !!axios && !!postId,
  });

  if (!axios || isLoading) return <Loading />;
  if (error) return <div>Error loading comments</div>;
  if (!comments || comments.length === 0) return <div>No comments found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {comments.map((c) => (
        <div
          key={c._id}
          className="border border-gray-300 rounded p-4 mb-3 bg-base-200"
        >
          <p>{c.comment}</p>
          <p className="mt-2 text-sm text-gray-500">
            By: {c.user.name} ({c.user.email})
          </p>
          <p className="text-xs text-gray-400 italic">
            Posted at: {new Date(c.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentsPage;
