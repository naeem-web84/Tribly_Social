import React from "react";
import { Toaster } from "react-hot-toast";
import { NavLink, Outlet } from "react-router";

const AdminLayouts = () => {
  return (
    <div className="min-h-screen flex bg-base-200 font-urbanist">
      {/* Sidebar for desktop */}
      <aside className="w-64 bg-base-100 shadow-md hidden lg:block sticky top-0 h-screen p-5">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "hover:text-primary transition-colors"
            }
          >
            🏠 Profile
          </NavLink>
          <NavLink
            to="manageUser"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "hover:text-primary transition-colors"
            }
          >
            👥 Manage Users
          </NavLink>
          <NavLink
            to="makeAnnouncement"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "hover:text-primary transition-colors"
            }
          >
            📢 Announcements
          </NavLink>
          <NavLink
            to="manageActivitis"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-semibold"
                : "hover:text-primary transition-colors"
            }
          >
            📊 ManageActivitis
          </NavLink>
        </nav>
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div className="lg:hidden sticky top-0 z-50 w-full">
        <div className="drawer drawer-start">
          <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content p-4">
            <label htmlFor="admin-drawer" className="btn btn-primary btn-sm mb-4">
              ☰ Menu
            </label>
            <Outlet />
          </div>
          <div className="drawer-side">
            <label htmlFor="admin-drawer" className="drawer-overlay"></label>
            <ul className="menu p-4 w-64 bg-base-100 text-base-content">
              <li>
                <NavLink to="/admin" onClick={() => {
                  document.getElementById('admin-drawer').checked = false;
                }}>
                  🏠 Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/manageUser" onClick={() => {
                  document.getElementById('admin-drawer').checked = false;
                }}>
                  👥 Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/makeAnnouncement" onClick={() => {
                  document.getElementById('admin-drawer').checked = false;
                }}>
                  📢 Announcements
                </NavLink>
              </li>
              <li>
                <NavLink to="manageActivitis" onClick={() => {
                  document.getElementById('admin-drawer').checked = false;
                }}>
                  📊 ManageActivitis
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
