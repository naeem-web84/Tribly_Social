import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router"; // fixed here

const MyPosts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const email = user?.email;
  const navigate = useNavigate();

  // Fetch posts created by this user
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ["myPosts", email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/mine/${email}`);
      return res.data;
    },
    enabled: !!email,
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/posts/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Your post has been deleted.", "success");
      queryClient.invalidateQueries({ queryKey: ["myPosts", email] });
    },
    onError: (error) => {
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to delete post",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this post!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Optional: Comment count per post
  const CommentCount = ({ postId }) => {
    const { data, isLoading, error } = useQuery({
      queryKey: ["commentCount", postId],
      queryFn: async () => {
        const res = await axiosSecure.get(`/comments/post/${postId}`);
        return res.data.length;
      },
      enabled: !!postId,
    });

    if (isLoading) return <span>...</span>;
    if (error) return <span>0</span>;
    return <span>{data}</span>;
  };

  if (isLoading) return <p className="text-center p-4">Loading posts...</p>;
  if (error)
    return <p className="text-center text-red-600">Failed to load posts</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto font-urbanist">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 My Posts</h2>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">You haven't posted anything yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100">
            <thead className="bg-primary text-primary-content">
              <tr>
                <th>#</th>
                <th>Post Title</th>
                <th>Votes</th>
                <th>Comments</th>
                <th>View Details</th>
                <th>Comments Page</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id} className="hover">
                  <td>{index + 1}</td>
                  <td className="font-semibold">{post.postTitle}</td>
                  <td>{(post.upVote || 0) - (post.downVote || 0)}</td>
                  <td>
                    <CommentCount postId={post._id} />
                  </td>
                  <td>
                    <Link
                      to={`/posts/${post._id}`}
                      className="btn btn-sm btn-secondary"
                    >
                      View
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/user/comments/${post._id}`)}
                      className="btn btn-sm btn-primary"
                    >
                      View Comments
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error text-white"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPosts;
