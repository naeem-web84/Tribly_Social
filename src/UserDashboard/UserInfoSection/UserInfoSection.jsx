import React from "react";

const UserInfoSection = ({
  userName,
  email,
  role,
  membershipStatus,
  badge,
  follower,
  created_at,
  last_log_in,
  about,
}) => {
  return (
    <section className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-md p-6 font-urbanist">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
        User Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <h3 className="font-semibold text-base-content/80">Name</h3>
          <p className="text-lg font-medium">{userName || "-"}</p>
        </div>

        {/* Email */}
        <div>
          <h3 className="font-semibold text-base-content/80">Email</h3>
          <p className="text-lg font-medium">{email || "-"}</p>
        </div>

        {/* Role */}
        <div>
          <h3 className="font-semibold text-base-content/80">Role</h3>
          <p className="text-lg font-medium">{role || "-"}</p>
        </div>

        {/* Badge */}
        <div>
          <h3 className="font-semibold text-base-content/80">Badge</h3>
          <p className="text-lg font-medium">{badge || "-"}</p>
        </div>

        {/* Membership */}
        <div>
          <h3 className="font-semibold text-base-content/80">Membership</h3>
          <p className="text-lg font-medium">{membershipStatus || "-"}</p>
        </div>

        {/* Followers */}
        <div>
          <h3 className="font-semibold text-base-content/80">Followers</h3>
          <p className="text-lg font-medium">{follower || 0}</p>
        </div>

        {/* Joined Date */}
        <div>
          <h3 className="font-semibold text-base-content/80">Joined</h3>
          <p className="text-lg font-medium">
            {created_at ? new Date(created_at).toLocaleDateString() : "-"}
          </p>
        </div>

        {/* Last Login */}
        <div>
          <h3 className="font-semibold text-base-content/80">Last Login</h3>
          <p className="text-lg font-medium">
            {last_log_in ? new Date(last_log_in).toLocaleString() : "-"}
          </p>
        </div>

        {/* About */}
        {about && (
          <div className="sm:col-span-2">
            <h3 className="font-semibold text-base-content/80">About</h3>
            <p className="text-base whitespace-pre-wrap">{about}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserInfoSection;
