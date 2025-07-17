import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { toast } from "react-hot-toast";
import Loading from "../../components/loading/Loading";

const ManageActivities = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: comments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-comments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/comments");
      return res.data;
    },
  });

  if (isLoading) return <Loading></Loading>;

  const reportedComments = comments.filter(
    (comment) => comment.reportStatus === "pending"
  );

  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await axiosSecure.patch(`/comments/status/${id}`, {
        status,
      });

      if (res.data?.result?.modifiedCount > 0) {
        toast.success(`Comment ${status === "reported" ? "reported" : "rejected"} successfully`);
        refetch();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Reported Comments</h2>

      {reportedComments.length === 0 ? (
        <p className="text-center text-gray-500">No reported comments found.</p>
      ) : (
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Post Title</th>
              <th>Comment</th>
              <th>Feedback</th>
              <th>Reported At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportedComments.map((comment, index) => (
              <tr key={comment._id}>
                <td>{index + 1}</td>
                <td>{comment.postTitle}</td>
                <td>{comment.comment}</td>
                <td>{comment.feedback || "—"}</td>
                <td>{new Date(comment.reportedAt).toLocaleString()}</td>
                <td>
                  <span className="badge badge-warning">pending</span>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(comment._id, "reported")}
                    className="btn btn-xs btn-error"
                  >
                    Report User
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(comment._id, "false")}
                    className="btn btn-xs btn-outline"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageActivities;
