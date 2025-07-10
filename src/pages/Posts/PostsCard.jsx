import React from "react";
import PostActions from "./PostActions";

const PostCard = ({ post }) => {
  const {
    authorImage,
    authorName,
    postTitle,
    postDescription,
    tag,
  } = post;

  return (
    <div className="bg-base-200 p-4 sm:p-5 rounded-lg shadow-md space-y-3 sm:space-y-4 font-urbanist
                    max-w-full
                    sm:max-w-md
                    md:max-w-lg
                    lg:max-w-xl
                    mx-auto"
    >
      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={authorImage}
          alt={authorName}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-primary object-cover"
        />
        <div>
          <h4 className="font-semibold text-base-content text-sm sm:text-base">{authorName}</h4>
          <span className="text-xs sm:text-sm text-base-content/70">{tag}</span>
        </div>
      </div>

      {/* Title & Description */}
      <h2 className="text-lg sm:text-xl font-bold text-base-content leading-tight">{postTitle}</h2>
      <p className="text-sm sm:text-base text-base-content/80 leading-relaxed">{postDescription}</p>

      {/* Stats + Actions */}
      <PostActions post={post} />
    </div>
  );
};

export default PostCard;
