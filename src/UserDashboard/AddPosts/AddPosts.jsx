import React, { useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import Loading from "../../components/loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

const AddPosts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const userEmail = user?.email;

  const [selectedTag, setSelectedTag] = useState(null);
  const [postLimitReached, setPostLimitReached] = useState(false);

  // ✅ Fetch backend user data
  const { data: backendUser, isLoading: loadingUser, error: userError } = useQuery({
    queryKey: ["user", userEmail],
    queryFn: async () => {
      if (!userEmail) return null;
      const res = await axiosSecure.get(`/users/email/${userEmail}`);
      return res.data;
    },
    enabled: !!userEmail,
  });

  // ✅ Fetch tags
  const { data: tags = [], isLoading: loadingTags, error: tagsError } = useQuery({
    queryKey: ["tags"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tags");
      return res.data;
    },
  });

  const tagOptions = tags.map(tag => ({
    value: tag.name,
    label: tag.name,
  }));

  // ✅ Author Info using backendUser
  const authorImage = backendUser?.photo || "/default-avatar.jpg";
  const authorName = backendUser?.userName || user?.displayName || "Unknown User";

  // ✅ Check post count limit
  useQuery({
    queryKey: ["postCount", userEmail],
    queryFn: async () => {
      if (!userEmail) return 0;
      const res = await axiosSecure.get(`/posts/count/${userEmail}`);
      return res.data.count;
    },
    enabled: !!userEmail,
    onSuccess: (count) => {
      setPostLimitReached(count >= 5);
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: (postData) =>
      axiosSecure.post("/posts", postData).then((res) => res.data),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Post has been added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ["postCount", userEmail] });
      reset();
      setSelectedTag(null);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to add post",
      });
    },
  });

  const onSubmit = (data) => {
    if (!selectedTag) {
      Swal.fire({
        icon: "warning",
        title: "Tag required",
        text: "Please select a tag for your post.",
      });
      return;
    }

    const postPayload = {
      authorName,
      authorEmail: userEmail,
      authorImage,
      postTitle: data.postTitle,
      postDescription: data.postDescription,
      tag: selectedTag.value,
    };

    mutation.mutate(postPayload);
  };

  if (loadingUser) return <Loading></Loading>;
  if (userError) return <ErrorPage></ErrorPage>;

  if (postLimitReached) {
    return (
      <div className="text-center p-6 font-urbanist">
        <p className="mb-4 text-lg font-semibold text-red-600">
          You have reached the post limit for general users.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/membership")}
        >
          Become a Member
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 rounded-lg font-urbanist shadow-md">
      <h2 className="text-3xl font-bold mb-8 text-center">Add a New Post</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ✅ Author Info */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 gap-2">
          <img
            src={authorImage}
            alt="Author"
            className="w-24 h-24 rounded-full border-2 border-primary object-cover"
          />
          <p className="text-base font-semibold">{authorName}</p>
          <p className="text-sm text-gray-500">{userEmail}</p>
        </div>

        {/* Post Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-2/3 space-y-6">
          <div>
            <label className="block mb-2 font-semibold">Post Title</label>
            <input
              {...register("postTitle", { required: "Post title is required" })}
              className="input input-bordered w-full"
              placeholder="Enter post title"
            />
            {errors.postTitle && (
              <p className="text-error mt-1">{errors.postTitle.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold">Post Description</label>
            <textarea
              {...register("postDescription", { required: "Description is required" })}
              className="textarea textarea-bordered w-full"
              placeholder="Enter post description"
              rows={5}
            />
            {errors.postDescription && (
              <p className="text-error mt-1">{errors.postDescription.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold">Tag</label>
            {loadingTags ? (
              <p>Loading tags...</p>
            ) : tagsError ? (
              <p className="text-error">Failed to load tags</p>
            ) : (
              <Select
                options={tagOptions}
                value={selectedTag}
                onChange={setSelectedTag}
                placeholder="Select a tag"
                className="text-black"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={mutation.isLoading}
            className={`btn btn-primary w-full mt-4 ${mutation.isLoading ? "loading" : ""}`}
          >
            {mutation.isLoading ? "Adding..." : "Add Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPosts;
