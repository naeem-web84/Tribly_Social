import React from "react";
import { Link } from "react-router";
import Lottie from "lottie-react";
import welcomeLottie from "../../assets/lotties/welcome-lottie.json";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const WelcomeUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const userName = user?.displayName || user?.userName || "User";

  const { data: postData = {} } = useQuery({
    queryKey: ["postCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/posts/count/byEmail/${user.email}`);
      return res.data;
    },
  });

  const { data: commentData = {} } = useQuery({
    queryKey: ["commentCount", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/comments/count/byEmail/${user.email}`);
      return res.data;
    },
  });

  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 p-6 md:p-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Lottie Animation */}
      <div className="w-full flex justify-center">
        <Lottie animationData={welcomeLottie} className="max-w-md w-full" />
      </div>

      {/* Right Section */}
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Welcome, {userName}! 👋
        </h1>

        {/* Typewriter Text */}
        <p className="text-secondary-content text-lg">
          <Typewriter
            words={["Here’s a quick overview of your activity:"]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={1200}
          />
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <motion.div
            className="bg-base-100 p-4 rounded-xl shadow border border-primary"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-bold text-primary">
              {postData?.count || 0}
            </h2>
            <p className="text-sm text-base-content">Posts</p>
          </motion.div>
          <motion.div
            className="bg-base-100 p-4 rounded-xl shadow border border-primary"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-xl font-bold text-primary">
              {commentData?.count || 0}
            </h2>
            <p className="text-sm text-base-content">Comments</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              to: "myProfile",
              title: "Update Profile",
              desc: "Make sure your info is up to date.",
            },
            {
              to: "addPosts",
              title: "Add a Post",
              desc: "Share something new with your audience.",
            },
            {
              to: "myPosts",
              title: "View Your Posts",
              desc: "Check and manage your posts.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.04 }}
              className="cursor-pointer"
            >
              <Link
                to={card.to}
                className="card bg-secondary text-secondary-content p-4 rounded-xl transition hover:shadow-lg"
              >
                <h2 className="text-lg font-semibold">{card.title}</h2>
                <p className="text-sm">{card.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeUser;
