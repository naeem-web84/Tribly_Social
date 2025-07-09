import React from "react";

const PostCard = ({ post }) => {
  const {
    authorImage,
    authorName,
    postTitle,
    postDescription,
    tag,
    upVote,
    downVote,
    createdAt,
  } = post;

  // Format date or fallback
  const timeAgo = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Just now";

  return (
    <div className="bg-base-100 border border-base-200 shadow-lg rounded-2xl p-6 transition-all hover:shadow-xl font-urbanist flex flex-col justify-between">
      {/* Author and time */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={authorImage}
            alt={authorName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-base-content">{authorName}</p>
            <p className="text-xs text-base-content/70">#{tag}</p>
          </div>
        </div>
        <time className="text-xs text-base-content/50">{timeAgo}</time>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-primary mb-2">{postTitle}</h2>

      {/* Description */}
      <p className="text-base-content text-sm mb-6 line-clamp-3">
        {postDescription}
      </p>

      {/* Comments & Votes */}
      <div className="flex justify-between text-sm text-base-content/70">
        <div className="flex items-center gap-2">
          <span className="font-semibold">Comments:</span>
          <span>{upVote}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-green-600">
            <span>▲</span>
            <span>{upVote}</span>
          </div>
          <div className="flex items-center gap-1 text-red-500">
            <span>▼</span>
            <span>{downVote}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
