import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

const MyProfile = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data, isLoading, error } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            return res.data;
        },
    });

    if (isLoading || authLoading) return <p className="text-center p-4">Loading user profile...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

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
        <div className="w-full max-w-5xl mx-auto font-urbanist">
            {/* Banner container */}
            <div className="relative">
                {/* Banner image */}
                <img
                    src={bannerImage?.trim()}
                    alt="Banner"
                    className="w-full h-48 md:h-64 object-contain rounded-t-lg"
                />

                {/* Profile image overlapping bottom of banner */}
                <div className="absolute left-12 md:-bottom-13 z-20">
                    <img
                        src={photo}
                        alt={userName}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-[4px] border-base-100 shadow-lg object-cover"
                    />
                </div>
            </div>

            {/* Profile info card */}
            <div className="mt-16 p-6 bg-base-100 dark:bg-secondary rounded-b-lg shadow space-y-3 text-base-content">
                <h2 className="text-2xl font-bold text-primary">{userName}</h2>
                <p className="text-sm text-secondary-content">{email}</p>
                {about && (
                    <p>
                        <span className="font-semibold">About:</span> {about}
                    </p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    <p><span className="font-semibold">Role:</span> {role}</p>
                    <p><span className="font-semibold">Badge:</span> {badge}</p>
                    <p><span className="font-semibold">Membership:</span> {membershipStatus}</p>
                    <p><span className="font-semibold">Followers:</span> {follower}</p>
                    <p><span className="font-semibold">Joined:</span> {new Date(created_at).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Last Login:</span> {new Date(last_log_in).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
