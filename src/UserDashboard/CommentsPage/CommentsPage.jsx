import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../components/loading/Loading";
import Swal from "sweetalert2";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

const feedbackOptions = [
  "Inappropriate language",
  "Spam or irrelevant",
  "Harassment or abuse",
];

const CommentsPage = () => {
  const { postId } = useParams();
  const axios = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedFeedbacks, setSelectedFeedbacks] = useState({});
  const [reportedComments, setReportedComments] = useState({});

  const { data: comments, isLoading, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await axios.get(`/comments/post/${postId}`);
      return res.data;
    },
    enabled: !!axios && !!postId,
  });

  const reportMutation = useMutation({
    mutationFn: async ({ commentId, feedback }) => {
      const res = await axios.patch(`/comments/report/${commentId}`, {
        feedback,
      });
      return res.data;
    },
    onSuccess: (_, { commentId }) => {
      setReportedComments((prev) => ({ ...prev, [commentId]: true }));
      Swal.fire("Reported!", "This comment has been reported.", "success");
      queryClient.invalidateQueries(["comments", postId]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to report the comment.", "error");
    },
  });

  const handleFeedbackChange = (commentId, feedback) => {
    setSelectedFeedbacks((prev) => ({
      ...prev,
      [commentId]: feedback,
    }));
  };

  const handleReport = (commentId) => {
    const feedback = selectedFeedbacks[commentId];
    if (feedback) {
      reportMutation.mutate({ commentId, feedback });
    }
  };

  if (!axios || isLoading) return <Loading />;
  if (error) return <ErrorPage></ErrorPage>;
  if (!comments || comments.length === 0) return <div className="text-center">No comments found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto font-urbanist">
      <h2 className="text-3xl font-bold mb-6 text-center">🗨️ Comments on Your Post</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full bg-base-100">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>#</th>
              <th>Comment</th>
              <th>By</th>
              <th>Feedback</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((c, index) => (
              <tr key={c._id} className="hover">
                <td>{index + 1}</td>
                <td className="max-w-xs whitespace-pre-wrap">{c.comment}</td>
                <td>{c.user?.email || "Unknown"}</td>
                <td>
                  <select
                    className="select select-bordered select-sm w-full max-w-xs"
                    value={selectedFeedbacks[c._id] || ""}
                    onChange={(e) => handleFeedbackChange(c._id, e.target.value)}
                    disabled={reportedComments[c._id]}
                  >
                    <option value="" disabled>
                      Select feedback
                    </option>
                    {feedbackOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleReport(c._id)}
                    className="btn btn-sm btn-error text-white"
                    disabled={
                      !selectedFeedbacks[c._id] || reportedComments[c._id]
                    }
                  >
                    {reportedComments[c._id] ? "Reported" : "Report"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsPage;
