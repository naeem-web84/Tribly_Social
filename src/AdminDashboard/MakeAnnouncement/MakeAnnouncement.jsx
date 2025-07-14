import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";

const MakeAnnouncement = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const announcement = {
      ...data,
      postedBy: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
      createdAt: new Date(),
    };

    console.log("📢 Announcement data ready to post:", announcement);

    // 👉 Do your axios.post('/announcements', announcement) here

    try{
        const res = await axiosSecure.post("/announcements", announcement)
        console.log("✅ Announcement posted:", res.data);
    }
    catch(error){
        console.error("❌ Failed to post announcement:", error);
    }


    reset();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Make an Announcement</h2>

      {/* Author Info */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-base-200 rounded-lg">
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">{user?.displayName}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Message</label>
          <textarea
            {...register("message", { required: true })}
            placeholder="Write your announcement message"
            className="textarea textarea-bordered w-full"
            rows={4}
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default MakeAnnouncement;
