import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch users (with optional search)
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["allUsers", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get(
        searchTerm ? `/users/search?name=${searchTerm}` : "/allUsers"
      );
      return res.data;
    },
  });

  // ✅ Mutation: make user admin
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
    <div className="p-4 font-urbanist">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

      {/* ✅ Search bar */}
      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          placeholder="Search by username"
          className="input input-bordered w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={() => queryClient.invalidateQueries(["allUsers"])}
        >
          Search
        </button>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Make Admin</th>
              <th>Membership</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.userName || user.displayName || "N/A"}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <span className="badge badge-success">Admin</span>
                    ) : (
                      <button
                        className="btn btn-sm btn-outline btn-primary"
                        onClick={() => handleMakeAdmin(user.email)}
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
