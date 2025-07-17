import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { NavLink, Outlet } from "react-router";
import {
  FaSun,
  FaMoon,
  FaArrowLeft,
  FaHome,
  FaUsers,
  FaBullhorn,
  FaTasks,
  FaTags,
} from "react-icons/fa";

const AdminLayouts = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex bg-base-200 font-urbanist">
      {/* Sidebar for desktop */}
      <aside className="w-64 bg-base-100 shadow-md hidden lg:flex flex-col sticky top-0 h-screen p-5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaHome />
            Admin Dashboard
          </h2>
          <button
            onClick={toggleTheme}
            className="btn btn-sm bg-secondary btn-ghost text-secondary-content"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
          </button>
        </div>
        <nav className="flex flex-col gap-4 flex-grow">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold flex items-center gap-2"
                : "hover:text-primary transition-colors flex items-center gap-2"
            }
          >
            <FaHome />
            Profile
          </NavLink>
          <NavLink
            to="manageUser"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold flex items-center gap-2"
                : "hover:text-primary transition-colors flex items-center gap-2"
            }
          >
            <FaUsers />
            Manage Users
          </NavLink>
          <NavLink
            to="makeAnnouncement"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold flex items-center gap-2"
                : "hover:text-primary transition-colors flex items-center gap-2"
            }
          >
            <FaBullhorn />
            Announcements
          </NavLink>
          <NavLink
            to="manageActivitis"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold flex items-center gap-2"
                : "hover:text-primary transition-colors flex items-center gap-2"
            }
          >
            <FaTasks />
            ManageActivitis
          </NavLink>
          <NavLink
            to="tags"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold flex items-center gap-2"
                : "hover:text-primary transition-colors flex items-center gap-2"
            }
          >
            <FaTags />
            Manage Tags
          </NavLink>
        </nav>

        {/* Back to Home button */}
        <NavLink
          to="/"
          className="flex items-center gap-2 mt-auto px-4 py-2 rounded bg-secondary text-secondary-content hover:bg-secondary-focus transition-colors duration-200"
          title="Back to Home"
        >
          <FaArrowLeft />
          Back to Home
        </NavLink>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div className="lg:hidden sticky top-0 z-50 w-full">
        <div className="drawer drawer-start">
          <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content p-4">
            <label
              htmlFor="admin-drawer"
              className="btn btn-primary btn-sm mb-4"
              aria-label="Open menu"
            >
              ☰ Menu
            </label>
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="admin-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-64 bg-base-100 text-base-content space-y-2 flex flex-col">
              <li className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-2">
                  <FaHome />
                  Admin Dashboard
                </span>
                <button
                  onClick={toggleTheme}
                  className="btn btn-sm bg-secondary btn-ghost text-secondary-content"
                  title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                >
                  {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
                </button>
              </li>
              <li>
                <NavLink
                  to="/admin"
                  end
                  onClick={() => {
                    document.getElementById("admin-drawer").checked = false;
                  }}
                  className="flex items-center gap-2"
                >
                  <FaHome />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/manageUser"
                  onClick={() => {
                    document.getElementById("admin-drawer").checked = false;
                  }}
                  className="flex items-center gap-2"
                >
                  <FaUsers />
                  Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/makeAnnouncement"
                  onClick={() => {
                    document.getElementById("admin-drawer").checked = false;
                  }}
                  className="flex items-center gap-2"
                >
                  <FaBullhorn />
                  Announcements
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/manageActivitis"
                  onClick={() => {
                    document.getElementById("admin-drawer").checked = false;
                  }}
                  className="flex items-center gap-2"
                >
                  <FaTasks />
                  ManageActivitis
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/tags"
                  onClick={() => {
                    document.getElementById("admin-drawer").checked = false;
                  }}
                  className="flex items-center gap-2"
                >
                  <FaTags />
                  Manage Tags
                </NavLink>
              </li>

              {/* Back to Home button */}
              <li className="mt-auto">
                <NavLink
                  to="/"
                  onClick={() => {
                    document.getElementById("admin-drawer").checked = false;
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded bg-secondary text-secondary-content hover:bg-blue-500 transition-colors duration-200"
                >
                  <FaArrowLeft />
                  Back to Home
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content for desktop */}
      <main className="flex-1 p-6 hidden lg:block">
        <Outlet />
      </main>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default AdminLayouts;
