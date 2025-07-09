import React from 'react';
import { Link } from 'react-router';

const LeftDrawer = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        {/* Menu button for small screens */}
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden m-4">
          Open Menu
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay lg:hidden"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li><Link to="/dashboard/user">My Profile</Link></li>
          <li><Link to="/dashboard/user/add-post">Add Post</Link></li>
          <li><Link to="/dashboard/user/my-posts">My Posts</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default LeftDrawer;
