import React from "react";
import { FaMedal } from "react-icons/fa";

const BadgeIcon = ({ badge }) => {
  if (badge === "user") {
    return <FaMedal className="text-[#cd7f32]" title="Bronze Badge" />; // Bronze
  }
  if (badge === "member") {
    return <FaMedal className="text-[#FFD700]" title="Gold Badge" />; // Gold
  }
  return null;
};

export default BadgeIcon;
