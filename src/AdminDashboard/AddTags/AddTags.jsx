import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth"; // 🧠 your Firebase auth hook

const AddTags = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth(); // Get Firebase user
  const [userInfo, setUserInfo] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // ✅ Fetch user data from backend
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/email/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch(() => setUserInfo(null));
    }
  }, [user, axiosSecure]);

  const mutation = useMutation({
    mutationFn: (tagData) => axiosSecure.post("/tags", tagData),
    onSuccess: () => {
      queryClient.invalidateQueries(["tags"]);
      reset();
      Swal.fire({
        icon: "success",
        title: "Tag added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Failed to add tag.",
        text: "Please try again later.",
      });
    },
  });

  const onSubmit = async (data) => {
    if (!userInfo) {
      return Swal.fire({
        icon: "error",
        title: "User not found",
        text: "Please log in again.",
      });
    }

    const tagData = {
      name: data.name,
      email: userInfo.email,
      userName: userInfo.userName || userInfo.name || "Anonymous",
      role: userInfo.role || "user",
    };

    mutation.mutate(tagData);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-lg shadow-md font-urbanist">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Tag</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tag Name */}
        <div className="form-control">
          <label className="label font-semibold mb-2 mr-2">
            <span className="label-text">Tag Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter tag name starting with #"
            className={`input input-bordered ${errors.name ? "input-error" : ""}`}
            {...register("name", {
              required: "Tag name is required",
              validate: (value) =>
                value.startsWith("#") || "Tag must start with #",
            })}
          />
          {errors.name && (
            <p className="text-error mt-1 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || mutation.isLoading}
          className="btn btn-primary w-full"
        >
          {mutation.isLoading ? "Adding..." : "Add Tag"}
        </button>
      </form>
    </div>
  );
};

export default AddTags;
