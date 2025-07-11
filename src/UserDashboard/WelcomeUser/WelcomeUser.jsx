import React from "react";
import { Link } from "react-router";

const WelcomeUser = ({ name = "User" }) => (
  <div className="space-y-6 p-6">
    <h1 className="text-3xl font-bold text-primary">Welcome, {name}! 👋</h1>
    <p className="text-secondary-content">
      Here's what's next in your dashboard:
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link to="myProfile" className="card bg-base-100 shadow hover:shadow-lg transition p-4">
        <h2 className="text-xl font-semibold">Update Profile</h2>
        <p className="text-sm">Make sure your info is up to date.</p>
      </Link>
      <Link to="addPosts" className="card bg-base-100 shadow hover:shadow-lg transition p-4">
        <h2 className="text-xl font-semibold">Add a Post</h2>
        <p className="text-sm">Share something new with your audience.</p>
      </Link>
      <Link to="myPosts" className="card bg-base-100 shadow hover:shadow-lg transition p-4">
        <h2 className="text-xl font-semibold">View Your Posts</h2>
        <p className="text-sm">Check your existing posts and manage them.</p>
      </Link>
    </div>
  </div>
);

export default WelcomeUser;
