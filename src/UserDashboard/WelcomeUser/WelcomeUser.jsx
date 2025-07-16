import React from "react";
import { Link } from "react-router";  
import Lottie from "lottie-react";
import welcomeLottie from "../../assets/lotties/welcome-lottie.json";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 p-6 md:p-10">
      {/* Lottie Animation */}
      <div className="w-full flex justify-center">
        <Lottie animationData={welcomeLottie} className="max-w-md w-full" />
      </div>

      {/* Right: Welcome + Stats + Actions */}
      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Welcome, {userName}! 👋
        </h1>
        <p className="text-secondary-content">
          Here’s a quick overview of your activity:
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-base-100 p-4 rounded-xl shadow border border-primary">
            <h2 className="text-xl font-bold text-primary">
              {postData?.count || 0}
            </h2>
            <p className="text-sm text-base-content">Posts</p>
          </div>
          <div className="bg-base-100 p-4 rounded-xl shadow border border-primary">
            <h2 className="text-xl font-bold text-primary">
              {commentData?.count || 0}
            </h2>
            <p className="text-sm text-base-content">Comments</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="myProfile"
            className="card bg-secondary text-secondary-content p-4 hover:shadow-md rounded-xl transition"
          >
            <h2 className="text-lg font-semibold">Update Profile</h2>
            <p className="text-sm">Make sure your info is up to date.</p>
          </Link>
          <Link
            to="addPosts"
            className="card bg-secondary text-secondary-content p-4 hover:shadow-md rounded-xl transition"
          >
            <h2 className="text-lg font-semibold">Add a Post</h2>
            <p className="text-sm">Share something new with your audience.</p>
          </Link>
          <Link
            to="myPosts"
            className="card bg-secondary text-secondary-content p-4 hover:shadow-md rounded-xl transition"
          >
            <h2 className="text-lg font-semibold">View Your Posts</h2>
            <p className="text-sm">Check and manage your posts.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUser;
