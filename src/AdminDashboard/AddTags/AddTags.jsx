import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth/useAuth";
import { motion } from "framer-motion";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const buttonVariants = {
  idle: { scale: 1 },
  loading: {
    scale: 1.05,
    rotate: [0, 10, -10, 10, -10, 0],
    transition: { repeat: Infinity, duration: 1.5 },
  },
};

const AddTags = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

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
    <div className="min-h-screen flex justify-center items-center bg-base-200 p-4">
      <motion.div
        className="max-w-xl w-full p-6 bg-base-100 rounded-lg shadow-md font-urbanist"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-2xl font-bold mb-6 text-center select-none">
          Add New Tag
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tag Name Input */}
          <div className="form-control">
            <label className="label font-semibold mb-2 mr-2">
              <span className="label-text">Tag Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter tag name starting with #"
              className={`input input-bordered transition-colors duration-300 ${
                errors.name
                  ? "input-error"
                  : "focus:border-primary focus:ring-primary"
              }`}
              {...register("name", {
                required: "Tag name is required",
                validate: (value) =>
                  value.startsWith("#") || "Tag must start with #",
              })}
              disabled={mutation.isLoading}
            />
            {errors.name && (
              <p className="text-error mt-1 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Submit Button with animation */}
          <motion.button
            type="submit"
            disabled={isSubmitting || mutation.isLoading}
            className="btn btn-primary w-full font-semibold select-none"
            variants={buttonVariants}
            animate={mutation.isLoading ? "loading" : "idle"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-busy={mutation.isLoading}
          >
            {mutation.isLoading ? "Adding..." : "Add Tag"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddTags;
