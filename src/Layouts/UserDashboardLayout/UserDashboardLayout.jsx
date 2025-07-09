import React from 'react';
import { Outlet } from 'react-router';
import LeftDrawer from '../../pages/UserDashboard/LeftDrawer/LeftDrawer';

const UserDashboardLayout = () => {
  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar on left for large screens */}
      <div className="hidden lg:block w-80 bg-base-200">
        <LeftDrawer />
      </div>

      {/* Drawer layout for small screens */}
      <div className="lg:hidden">
        <LeftDrawer />
      </div>

      {/* Main content area */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboardLayout;
