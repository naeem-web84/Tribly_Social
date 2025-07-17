import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
      ease: "easeOut"
    }
  },
};

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users (with optional search)
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(
        searchTerm ? `/users/search?name=${searchTerm}` : "/allUsers"
      );
      return res.data;
    },
  });

  // Mutation: make user admin
  const makeAdminMutation = useMutation({
    mutationFn: async (email) => {
      return await axiosSecure.patch(`/users/admin/${email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allUsers"]);
      Swal.fire("Success", "User promoted to admin!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to promote user", "error");
    },
  });

  const handleMakeAdmin = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will give admin access to the user.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#64DA91",
      confirmButtonText: "Yes, Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(email);
      }
    });
  };

  return (
    <motion.div
      className="p-6 font-urbanist bg-base-100 rounded-lg shadow-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-semibold mb-6 text-primary">Manage Users</h2>

      {/* Search bar */}
      <div className="mb-6 flex items-center gap-4 max-w-md">
        <input
          type="text"
          placeholder="Search by username"
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && queryClient.invalidateQueries(["allUsers"])}
        />
        <button
          className="btn btn-primary"
          onClick={() => queryClient.invalidateQueries(["allUsers"])}
          aria-label="Search users"
        >
          Search
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-300 shadow-sm">
        <table className="table table-zebra w-full">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th className="text-center">#</th>
              <th>User Name</th>
              <th>Email</th>
              <th className="text-center">Make Admin</th>
              <th className="text-center">Membership</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center p-6 font-semibold text-lg">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-6 font-semibold text-lg">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  variants={rowVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group"
                >
                  <td className="text-center">{index + 1}</td>
                  <td>{user.userName || user.displayName || "N/A"}</td>
                  <td>{user.email}</td>
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <span className="badge badge-success">Admin</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline btn-primary group-hover:scale-105 transition-transform"
                        onClick={() => handleMakeAdmin(user.email)}
                        aria-label={`Make ${user.userName} admin`}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        user.membership === "active"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {user.membership || "None"}
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ManageUser;
