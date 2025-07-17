import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";
import { useNavigate } from "react-router";
import { FiEdit } from "react-icons/fi";
import BadgeIcon from "../BadgeIcon/BadgeIcon";
import ShowThreePosts from "../ShowThreePosts/ShowThreePosts";
import UserInfoSection from "../UserInfoSection/UserInfoSection";
import { motion } from "framer-motion";
import Loading from "../../components/loading/Loading";
import ErrorPage from "../../components/ErrorPage/ErrorPage";

const MyProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/email/${user.email}`);
      return res.data;
    },
  });

  if (isLoading || authLoading)
    return <Loading></Loading>;
  if (error)
    return <ErrorPage></ErrorPage>;

  const {
    userName,
    email,
    about,
    role,
    membershipStatus,
    badge,
    follower,
    bannerImage,
    photo,
    created_at,
    last_log_in,
  } = data || {};

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto font-urbanist px-2 md:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Banner Image */}
      <div className="w-full bg-base-100 object-contain overflow-hidden rounded-t-lg">
        <img
          src={bannerImage?.trim()}
          alt="Banner"
          className="max-h-full max-w-full object-contain w-full"
        />
      </div>

      {/* Profile header */}
      <div className="mt-2 sm:mt-3 md:mt-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4 text-center md:text-left">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start items-center">
            <img
              src={photo}
              alt="User"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-4 border-secondary-content object-cover shadow"
            />
          </div>

          {/* Name, Badge, and Button */}
          <div className="flex flex-col items-center md:items-start justify-center w-full">
            <div className="flex items-center gap-2 justify-center md:justify-start w-full">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {userName}
              </h1>
              <BadgeIcon badge={badge} />
            </div>

            <button
              onClick={() => navigate("/user/updateProfile")}
              className="mt-1 flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-secondary-content hover:text-primary font-medium justify-center md:justify-start cursor-pointer"
            >
              <FiEdit className="text-base sm:text-lg" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Show Recent Posts Section */}
      <div className="mt-6">
        <ShowThreePosts userEmail={email} />
      </div>

      {/* user info  */}
      <div className="mt-6">
        <UserInfoSection
          userName={userName}
          email={email}
          role={role}
          membershipStatus={membershipStatus}
          badge={badge}
          follower={follower}
          created_at={created_at}
          last_log_in={last_log_in}
          about={about}
        />
      </div>
    </motion.div>
  );
};

export default MyProfile;
