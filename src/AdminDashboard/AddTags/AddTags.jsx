import React from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddTags = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  async function uploadImage(file) {
    if (!file) return null;
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
      { method: "POST", body: formData }
    );
    const data = await res.json();
    return data.success ? data.data.url : null;
  }

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
    let iconUrl = null;
    if (data.icon && data.icon.length > 0) {
      iconUrl = await uploadImage(data.icon[0]);
    }
    mutation.mutate({ name: data.name, iconUrl });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-base-100 rounded-lg shadow-md font-urbanist">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Tag</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Tag Name *</span>
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

        <div className="form-control">
          <label className="label font-semibold">
            <span className="label-text">Tag Icon (optional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            {...register("icon")}
          />
        </div>

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
