import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import PostActions from "../Posts/PostActions";
import Loading from "../../components/loading/Loading";
import { FacebookShareButton, FacebookIcon } from "react-share";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const PostsDetails = () => {
  const { id } = useParams(); // post ID from URL
  const axios = useAxiosSecure(); // returns null initially until token is ready
  const navigate = useNavigate();

  // ✅ Wait until axios is ready before running query
  const { data: post, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await axios.get(`/posts/${id}`);
      return res.data;
    },
    enabled: !!axios && !!id, // ✅ don't run query until axios is ready
  });

  // ✅ Show loading while axios is being initialized
  if (!axios || isLoading) return <Loading />;

  // ✅ Handle errors
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
    <section className="px-4 md:px-10 lg:px-20 py-10 bg-base-100 font-urbanist min-h-screen">
      <div className="max-w-4xl mx-auto bg-base-200 p-6 rounded-lg shadow-lg space-y-6">
        {/* Author Info */}
        <div className="flex items-center gap-4">
          <img
            src={authorImage}
            alt={authorName}
            className="w-14 h-14 rounded-full border-2 border-primary object-cover"
          />
          <div>
            <h4 className="text-lg font-semibold text-base-content">{authorName}</h4>
            <span className="text-sm text-base-content/70">{tag}</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-base-content leading-tight">
          {postTitle}
        </h1>

        {/* Description */}
        <p className="text-base text-base-content/80 leading-relaxed whitespace-pre-wrap">
          {postDescription}
        </p>

        {/* Post time */}
        <p className="text-sm text-base-content/60 italic">
          🕒 {new Date(postTime).toLocaleString()}
        </p>

        {/* Actions */}
        <PostActions post={post} />

        {/* Share & Back Buttons */}
        <div className="flex items-center lg:justify-between gap-4 mt-4">
          <FacebookShareButton
            url={window.location.href}
            quote={postTitle}
            hashtag={`#${tag}`}
            className="flex items-center gap-2 btn btn-sm border border-primary text-primary hover:bg-primary hover:text-primary-content"
          >
            <FacebookIcon size={24} round />
            <span className="text-secondary-content">Share on Facebook</span>
          </FacebookShareButton>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline border-primary text-primary hover:bg-primary hover:text-primary-content"
            aria-label="Go back"
          >
            ← Back
          </button>
        </div>
      </div>
    </section>
  );
};

export default PostsDetails;
