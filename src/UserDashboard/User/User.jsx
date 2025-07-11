import React from "react";
import { NavLink, Outlet } from "react-router";
import { FaUserCircle, FaPlusCircle, FaListAlt } from "react-icons/fa";

const User = () => {
  return (
    <div className="drawer lg:drawer-open h-screen font-urbanist bg-secondary text-secondary-content">
      <input id="user-drawer" type="checkbox" className="drawer-toggle" />

      {/* Right side content */}
      <div className="drawer-content flex flex-col">
        {/* Navbar for small screens */}
        <div className="navbar bg-secondary text-secondary-content w-full lg:hidden shadow">
          <div className="flex-none">
            <label
              htmlFor="user-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost text-secondary-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 font-semibold">User Dashboard</div>
        </div>

        {/* Page content area */}
        <div className="p-6 bg-base-100 dark:bg-secondary rounded-lg shadow flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>

      {/* Sidebar drawer menu */}
      <div className="drawer-side">
        <label htmlFor="user-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-primary text-primary-content min-h-full w-64 p-4 space-y-2">
          <h2 className="text-lg font-bold mb-4">User Menu</h2>

          <li>
            <NavLink
              to="myProfile"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded ${
                  isActive
                    ? "bg-secondary text-secondary-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                } transition-colors duration-200`
              }
            >
              <FaUserCircle />
              My Profile
            </NavLink>
          </li>

          <li>
            <NavLink
              to="addPosts"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded ${
                  isActive
                    ? "bg-secondary text-secondary-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                } transition-colors duration-200`
              }
            >
              <FaPlusCircle />
              Add Posts
            </NavLink>
          </li>

          <li>
            <NavLink
              to="myPosts"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded ${
                  isActive
                    ? "bg-secondary text-secondary-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                } transition-colors duration-200`
              }
            >
              <FaListAlt />
              My Posts
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
