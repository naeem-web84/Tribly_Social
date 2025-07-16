import React from "react";
import { motion } from "framer-motion";

const infoVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
  }),
};

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
  const infoItems = [
    { label: "Name", value: userName || "-" },
    { label: "Email", value: email || "-" },
    { label: "Role", value: role || "-" },
    { label: "Badge", value: badge || "-" },
    { label: "Membership", value: membershipStatus || "-" },
    { label: "Followers", value: follower ?? 0 },
    {
      label: "Joined",
      value: created_at ? new Date(created_at).toLocaleDateString() : "-",
    },
    {
      label: "Last Login",
      value: last_log_in ? new Date(last_log_in).toLocaleString() : "-",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-md p-6 font-urbanist">
      <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
        User Information
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {infoItems.map(({ label, value }, i) => (
          <motion.div
            key={label}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={infoVariants}
          >
            <h3 className="font-semibold text-base-content/80">{label}</h3>
            <p className="text-lg font-medium">{value}</p>
          </motion.div>
        ))}

        {about && (
          <motion.div
            className="sm:col-span-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: infoItems.length * 0.1, duration: 0.4, ease: "easeOut" }}
          >
            <h3 className="font-semibold text-base-content/80">About</h3>
            <p className="text-base whitespace-pre-wrap">{about}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default UserInfoSection;
