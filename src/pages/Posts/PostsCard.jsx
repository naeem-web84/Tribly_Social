import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const PostsCard = ({ post }) => {
  const {
    authorImage,
    postTitle,
    tag,
    postTime,
    _id,
    upVote,
    downVote,
  } = post;

  const axios = useAxiosSecure();
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    if (!axios) return; // Guard here

    axios.get(`/comments/count/${postTitle}`)
      .then(res => {
        setCommentCount(res.data.count || 0);
      })
      .catch(err => {
        console.error("Failed to fetch comment count", err);
      });
  }, [axios, postTitle]);

  const postDate = postTime ? new Date(postTime) : null;
  const isValidDate = postDate instanceof Date && !isNaN(postDate);

  return (
    <article
      className="bg-base-200 rounded-xl shadow-md p-5 flex flex-col justify-between
        hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer
        w-full h-full font-urbanist"
      tabIndex={0}
      aria-label={`Post titled ${postTitle}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={authorImage}
            alt={`Author of ${postTitle}`}
            className="w-12 h-12 rounded-full border border-primary object-cover"
            loading="lazy"
          />
          <span className="text-sm font-semibold text-primary">{tag}</span>
        </div>
      </div>

      <h2 className="text-xl font-bold text-base-content mb-4 leading-snug">
        {postTitle}
      </h2>

      <div className="flex justify-between items-center mb-4 text-base-content/80 text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <FaRegThumbsUp /> {upVote}
          </div>
          <div className="flex items-center gap-1">
            <FaRegThumbsDown /> {downVote}
          </div>
          {/* You can optionally display comment count here */}
          <div>
            💬 {commentCount}
          </div>
        </div>
        <time
          dateTime={isValidDate ? postDate.toISOString() : undefined}
          title={isValidDate ? postDate.toLocaleString() : "Unknown time"}
          className="italic"
        >
          🕒 {isValidDate ? `${postDate.toLocaleDateString()} ${postDate.toLocaleTimeString()}` : "Unknown time"}
        </time>
      </div>

      <Link
        to={`/posts/${_id}`}
        className="btn btn-sm border border-primary text-primary hover:bg-primary hover:text-primary-content self-start"
      >
        View Details
      </Link>
    </article>
  );
};

export default PostsCard;
