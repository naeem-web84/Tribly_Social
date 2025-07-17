import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router";  
import {
  FaUserCircle,
  FaPlusCircle,
  FaListAlt,
  FaSun,
  FaMoon,
  FaHome,
  FaArrowLeft,
} from "react-icons/fa";

const User = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const drawerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLinkClick = () => {
    if (window.innerWidth < 1024 && drawerRef.current) {
      drawerRef.current.checked = false;
    }
  };

  return (
    <div className="drawer lg:drawer-open font-urbanist bg-secondary text-secondary-content min-h-screen">
      <input id="user-drawer" type="checkbox" className="drawer-toggle" ref={drawerRef} />

      {/* Content */}
      <div className="drawer-content flex flex-col min-h-screen p-2 md:p-4 lg:p-6">
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
          <div className="mx-2 flex-1 px-2 font-semibold text-lg">User Menu</div>
        </div>

        {/* Main Page Content */}
        <div className="bg-base-100 dark:bg-secondary rounded-lg shadow flex-grow overflow-auto p-4">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="user-drawer" className="drawer-overlay"></label>
        <ul className="menu bg-primary text-primary-content min-h-full w-64 p-4 space-y-3 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-bold">User Menu</h2>
            <button
              onClick={toggleTheme}
              className="btn btn-sm bg-secondary btn-ghost text-secondary-content"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>
          </div>

          {/* Nav Links */}
          <li>
            <NavLink
              to="/user"
              end
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded ${
                  isActive
                    ? "bg-secondary text-secondary-content"
                    : "hover:bg-secondary hover:text-secondary-content"
                } transition-colors duration-200`
              }
            >
              <FaHome />
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="myProfile"
              end
              onClick={handleLinkClick}
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
              end
              onClick={handleLinkClick}
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
              end
              onClick={handleLinkClick}
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

          <li className="pt-6 mt-auto">
            <NavLink
              to="/"
              end
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `flex bg-secondary text-secondary-content items-center gap-3 px-3 py-2 rounded ${
                  isActive
                    ? "bg-primary text-primary-content"
                    : "hover:bg-blue-500 hover:text-primary-content"
                } transition-colors duration-200`
              }
            >
              <FaArrowLeft />
              Back to Home
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default User;
