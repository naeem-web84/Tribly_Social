import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router";

const UserUpdate = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  const { mutateAsync, isLoading: isUpdating } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/users/email/${user.email}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user", user?.email]);
      navigate("/user/myProfile");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  React.useEffect(() => {
    if (userData) {
      reset({
        name: userData.userName,
        email: userData.email,
        about: userData.about,
      });
    }
  }, [userData, reset]);

  const onSubmit = async (data) => {
    const updatedFields = {
      userName: data.name,
      about: data.about,
    };

    // Helper function to upload image to imgbb
    async function uploadImage(file) {
      if (!file) return null;
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`,
        { method: "POST", body: formData }
      );
      const imgData = await res.json();
      return imgData.success ? imgData.data.url : null;
    }

    // Upload profile image if new file selected
    if (data.image && data.image.length > 0) {
      const profileUrl = await uploadImage(data.image[0]);
      if (profileUrl) updatedFields.photo = profileUrl;
    }

    // Upload banner image if new file selected
    if (data.bannerImage && data.bannerImage.length > 0) {
      const bannerUrl = await uploadImage(data.bannerImage[0]);
      if (bannerUrl) updatedFields.bannerImage = bannerUrl;
    }

    await mutateAsync(updatedFields);
  };

  if (isLoading || isUpdating) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-100 rounded-lg shadow-lg font-urbanist">
      <h2 className="text-3xl font-bold text-primary mb-8 text-center">Update Your Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Full Name */}
        <div className="form-control">
          <label className="label font-semibold text-secondary-content">Full Name</label>
          <input
            type="text"
            className="input input-bordered"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 mt-1 text-sm">{errors.name.message}</p>}
        </div>

        {/* Email (readonly) */}
        <div className="form-control">
          <label className="label font-semibold text-secondary-content">Email (Read-only)</label>
          <input
            type="email"
            className="input input-bordered bg-gray-100 text-gray-500 cursor-not-allowed"
            {...register("email")}
            readOnly
          />
        </div>

        {/* About Me (full width) */}
        <div className="form-control md:col-span-2">
          <label className="label font-semibold text-secondary-content">About Me</label>
          <textarea
            rows={4}
            className="textarea textarea-bordered resize-none"
            {...register("about", { required: "About is required" })}
          />
          {errors.about && <p className="text-red-500 mt-1 text-sm">{errors.about.message}</p>}
        </div>

        {/* Profile Image Upload */}
        <div className="form-control">
          <label className="label font-semibold text-secondary-content">
            Profile Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            {...register("image")}
          />
        </div>

        {/* Banner Image Upload */}
        <div className="form-control">
          <label className="label font-semibold text-secondary-content">
            Banner Image (optional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered"
            {...register("bannerImage")}
          />
        </div>

        {/* Submit button full width */}
        <div className="form-control md:col-span-2 mt-6">
          <button type="submit" className="btn btn-primary w-full text-lg font-semibold">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdate;
