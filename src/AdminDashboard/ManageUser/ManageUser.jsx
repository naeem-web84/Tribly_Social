import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { FaSearch, FaUserShield, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: usersData = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", page, searchTerm],
    queryFn: async () => {
      const url = searchTerm
        ? `/users/search?name=${searchTerm}&page=${page}&limit=${limit}`
        : `/paginatedUsers?page=${page}&limit=${limit}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPreviousData: true,
  });

  const users = usersData?.users || [];
  const totalUsers = usersData?.total || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  const handleMakeAdmin = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are promoting this user to Admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, make admin",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/users/admin/${userId}`);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "User promoted to admin", "success");
          queryClient.invalidateQueries({ queryKey: ["users"] });
        }
      } catch (error) {
        Swal.fire("Error", "Failed to make user admin", "error");
      }
    }
  };

  if (isLoading) return <div className="text-center p-10">Loading...</div>;
  if (isError) return <div className="text-center p-10 text-red-500">Error fetching users</div>;

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <div className="form-control w-full max-w-sm relative">
          <input
            type="text"
            placeholder="Search by name"
            className="input input-bordered w-full pr-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset to first page on search
            }}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-200 rounded-xl">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Make Admin</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{(page - 1) * limit + idx + 1}</td>
                <td className="flex items-center gap-3">
                  <img
                    src={user.photo || "/default-avatar.png"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span>{user.name}</span>
                </td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>
                  {user.role === "admin" ? (
                    <span className="text-green-500 font-bold">Admin</span>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline btn-primary"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      <FaUserShield className="mr-2" />
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
        {/* Left arrow */}
        <button
          className={`btn btn-sm border border-base-300 transition-colors duration-300 ${
            page === 1
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-primary hover:text-primary-content"
          }`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          aria-label="Previous Page"
        >
          <FaChevronLeft />
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`btn btn-sm transition-colors duration-300 ${
              p === page
                ? "btn-primary cursor-default"
                : "btn-outline cursor-pointer hover:bg-primary hover:text-primary-content"
            }`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}

        {/* Right arrow */}
        <button
          className={`btn btn-sm border border-base-300 transition-colors duration-300 ${
            page === totalPages || totalPages === 0
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:bg-primary hover:text-primary-content"
          }`}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || totalPages === 0}
          aria-label="Next Page"
        >
          <FaChevronRight />
        </button>
      </div>
    </motion.div>
  );
};

export default ManageUsers;
