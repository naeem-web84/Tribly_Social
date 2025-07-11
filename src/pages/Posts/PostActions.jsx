import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth/useAuth";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegComments,
  FaPlus,
  FaEye,
  FaUser,
  FaTag,
} from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const MySwal = withReactContent(Swal);

const PostActions = ({ post }) => {
  const axios = useAxiosSecure();
  const { user } = useAuth();
  const [commentCount, setCommentCount] = useState(0);
  const [up, setUp] = useState(post.upVote);
  const [down, setDown] = useState(post.downVote);
  const [userVote, setUserVote] = useState(null); // "up", "down", or null
  const [loading, setLoading] = useState(false);

  const { postTitle, _id, voters = [] } = post;

  useEffect(() => {
    if (!axios) return; // wait for axios to be ready

    axios.get(`/comments/count/${postTitle}`).then((res) => {
      setCommentCount(res.data.count || 0);
    });

    if (user) {
      const voted = voters.find((v) => v.email === user.email);
      if (voted) setUserVote(voted.type);
    }
  }, [axios, postTitle, user, voters]);

  // Vote Handler
  const handleVote = async (type) => {
    if (!user) return Swal.fire("⚠️ Please log in to vote", "", "warning");
    if (!axios) return; // wait for axios to be ready
    if (loading) return;

    try {
      setLoading(true);
      await axios.post(`/posts/${_id}/vote`, {
        userEmail: user.email,
        type,
      });

      if (userVote === type) {
        // Toggle off
        type === "up" ? setUp((prev) => prev - 1) : setDown((prev) => prev - 1);
        setUserVote(null);
      } else {
        // Switch or first time
        if (userVote === "up") setUp((prev) => prev - 1);
        if (userVote === "down") setDown((prev) => prev - 1);
        type === "up" ? setUp((prev) => prev + 1) : setDown((prev) => prev + 1);
        setUserVote(type);
      }
    } catch (err) {
      Swal.fire(err.response?.data?.message || "Vote failed", "", "error");
    } finally {
      setLoading(false);
    }
  };

  // Add comment
  const handleAddComment = async () => {
    if (!user) return Swal.fire("⚠️ Please login to add a comment", "", "warning");
    if (!axios) return;

    const { value: text } = await MySwal.fire({
      title: `✍️ Add Comment to "${postTitle}"`,
      input: "textarea",
      showCancelButton: true,
      confirmButtonText: "Post Comment",
      background: "var(--color-base-100)",
      color: "var(--color-base-content)",
      customClass: { popup: "font-urbanist" },
    });

    if (text) {
      try {
        await axios.post("/comments", {
          postTitle,
          comment: text,
          user: user.displayName || user.email || "Anonymous",
        });
        setCommentCount((prev) => prev + 1);
        Swal.fire("✅ Comment Posted!", "", "success");
      } catch {
        Swal.fire("❌ Failed to post comment", "", "error");
      }
    }
  };

  // Show all comments
  const handleShowComments = async () => {
    if (!axios) return;

    try {
      const res = await axios.get(`/comments/${postTitle}`);
      const comments = res.data;

      MySwal.fire({
        title: `💬 Comments on "${postTitle}"`,
        html: (
          <div className="text-left max-h-[300px] overflow-y-auto">
            {comments.length === 0 ? (
              <p>No comments yet.</p>
            ) : (
              comments.map((c, i) => (
                <div key={i} className="p-3 border-b mb-2 rounded bg-base-200">
                  <p>{c.comment}</p>
                  <div className="flex items-center gap-2 text-xs text-base-content/60">
                    <FaUser /> {c.user} <FaTag /> {c.postTitle}
                  </div>
                </div>
              ))
            )}
          </div>
        ),
        showCloseButton: true,
        showConfirmButton: false,
        width: 500,
        background: "var(--color-base-100)",
        color: "var(--color-base-content)",
        customClass: { popup: "font-urbanist" },
      });
    } catch {
      Swal.fire("❌ Failed to load comments", "", "error");
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 text-sm text-base-content/80 flex-wrap gap-2">
      <div className="flex items-center gap-4">
        <button
          onClick={() => handleVote("up")}
          disabled={loading}
          className={`flex items-center gap-1 px-2 py-1 rounded transition ${
            userVote === "up"
              ? "bg-green-300 text-green-900"
              : "hover:bg-base-300"
          }`}
        >
          <FaRegThumbsUp /> {up}
        </button>

        <button
          onClick={() => handleVote("down")}
          disabled={loading}
          className={`flex items-center gap-1 px-2 py-1 rounded transition ${
            userVote === "down"
              ? "bg-red-300 text-red-900"
              : "hover:bg-base-300"
          }`}
        >
          <FaRegThumbsDown /> {down}
        </button>

        <span className="flex items-center gap-1">
          <FaRegComments /> {commentCount}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleAddComment}
          className="btn btn-xs border text-primary border-primary hover:bg-primary hover:text-white"
        >
          <FaPlus className="mr-1" /> Comment
        </button>
        <button
          onClick={handleShowComments}
          className="btn btn-xs text-primary border border-primary hover:bg-primary hover:text-white"
        >
          <FaEye className="mr-1" /> Show
        </button>
      </div>
    </div>
  );
};

export default PostActions;
