import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PostActions from "../Posts/PostActions";
import Loading from "../../components/loading/Loading";
import { FacebookShareButton, FacebookIcon } from "react-share";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const PostsDetails = () => {
  const { id } = useParams();
  const axios = useAxiosSecure();
  const navigate = useNavigate();

  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`/posts/${id}`);
      return res.data;
    },
    enabled: !!axios && !!id,
  });

  if (!axios || isLoading) return <Loading />;
  if (error) return <div className="text-center py-10">Error loading post</div>;
  if (!post) return <div className="text-center py-10">Post not found</div>;

  const {
    authorImage,
    authorName,
    postTitle,
    postDescription,
    tag,
    postTime,
  } = post;

  return (
    <section className="px-4 md:px-6 lg:px-10 py-10 bg-base-100 font-urbanist text-base-content">
      <div className="w-full max-w-3xl mx-auto bg-base-200 border border-base-300 p-6 md:p-10 rounded-2xl shadow-lg space-y-8">

        {/* Author Info */}
        <div className="flex items-center gap-4">
          <img
            src={authorImage}
            alt={authorName}
            className="w-14 h-14 rounded-full border-2 border-primary object-cover"
          />
          <div>
            <h4 className="text-lg md:text-xl font-semibold">{authorName}</h4>
            <span className="text-sm text-primary font-medium">#{tag}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">
          {postTitle}
        </h1>

        {/* Description */}
        <div className="text-base md:text-lg text-base-content/80 leading-relaxed whitespace-pre-wrap">
          {postDescription}
        </div>

        {/* Post Time */}
        <p className="text-sm text-base-content/60 italic">
          🕒 {postTime ? new Date(postTime).toLocaleString() : "Unknown Time"}
        </p>

        {/* Actions */}
        <PostActions post={post} />

        {/* Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4 border-t border-base-300">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline border-primary text-secondary-content hover:bg-primary hover:text-primary-content"
          >
            ← Back
          </button>

          <FacebookShareButton
            url={window.location.href}
            quote={postTitle}
            hashtag={`#${tag}`}
            className="flex items-center gap-2 btn btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
          >
            <FacebookIcon size={24} round />
            <span className="hidden sm:inline">Share on Facebook</span>
          </FacebookShareButton>
        </div>
      </div>
    </section>
  );
};

export default PostsDetails;
