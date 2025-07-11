import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth/useAuth";

const MyProfile = () => {
    const { user, loading: authLoading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data , isLoading, error} = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/email/${user.email}`);
            return res.data;
        }
    });

    if (isLoading || authLoading) return <p>Loading user profile...</p>;
    if (error) return <p>Error: {error.message}</p>;

    // ✅ Final check
    console.log("✅ Loaded user from DB:", data);

    return (
        <div className="p-6 bg-base-100 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">My Profile</h2>
            <p><strong>Name:</strong> {data?.userName}</p>
            <p><strong>Email:</strong> {data?.email}</p>
            <p><strong>About:</strong> {data?.about}</p>
        </div>
    );
};

export default MyProfile;
