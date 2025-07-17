import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut"
    }
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

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

    try {
      const res = await axiosSecure.post("/announcements", announcement);
      console.log("✅ Announcement posted:", res.data);
    } catch (error) {
      console.error("❌ Failed to post announcement:", error);
    }

    reset();
  };

  return (
    <motion.div
      className="p-6 max-w-xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl font-bold mb-6 text-center md:text-left"
        variants={itemVariants}
      >
        Make an Announcement
      </motion.h2>

      {/* Author Info */}
      <motion.div
        className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-4 bg-base-200 rounded-lg"
        variants={itemVariants}
      >
        <img
          src={user?.photoURL}
          alt={user?.displayName}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="text-center sm:text-left">
          <p className="font-semibold text-lg">{user?.displayName}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        variants={itemVariants}
      >
        <div>
          <label className="label font-semibold">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            placeholder="Enter announcement title"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label font-semibold">Message</label>
          <textarea
            {...register("message", { required: true })}
            placeholder="Write your announcement message"
            className="textarea textarea-bordered w-full"
            rows={5}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full text-lg font-semibold hover:scale-[1.02] transition-transform duration-200"
          aria-label="Post Announcement"
        >
          Post Announcement
        </button>
      </motion.form>
    </motion.div>
  );
};

export default MakeAnnouncement;
