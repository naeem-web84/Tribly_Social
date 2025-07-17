import React from "react";
import {
  FaUserCircle,
  FaPlusCircle,
  FaFileAlt,
  FaTrashAlt,
  FaComments,
  FaStar,
  FaGift,
  FaCrown,
  FaBookOpen,
  FaBell,
  FaHandPointer,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const steps = [
  {
    Icon: FaGift,
    title: "Become a Member",
    description:
      "Unlock special powers by paying the membership fee. Members get the prestigious Gold Badge and can create more than 5 posts! 🎉",
  },
  {
    Icon: FaUserCircle,
    title: "Manage Your Profile",
    description:
      "Show off your style! Update your profile picture, name, badges (Bronze for newbies, Gold for members), and track your recent posts.",
  },
  {
    Icon: FaPlusCircle,
    title: "Add Posts",
    description:
      "Got something cool to share? Add posts with titles, descriptions, and tags. If you’re a free user, you can post up to 5 times. More posts? Become a member! 🚀",
  },
  {
    Icon: FaFileAlt,
    title: "View & Manage Your Posts",
    description:
      "Keep an eye on your posts — see votes, comments, and delete posts you don’t want anymore. Clean and simple!",
  },
  {
    Icon: FaComments,
    title: "Comment & Report",
    description:
      "Join the convo by commenting on posts. If you spot something off, report comments with quick feedback — we keep the community safe! 🛡️",
  },
  {
    Icon: FaStar,
    title: "Upvote & Downvote",
    description:
      "Express your love or dislike with upvotes and downvotes. Help the community find the best posts!",
  },
  {
    Icon: FaBell,
    title: "Stay Notified",
    description:
      "Get announcements and updates right on your dashboard. Never miss out on community news!",
  },
  {
    Icon: FaHandPointer,
    title: "Navigate Like a Pro",
    description:
      "Use the Navbar for quick access — Home, Membership, Notifications, and your Profile dropdown with Dashboard & Logout.",
  },
  {
    Icon: FaCrown,
    title: "Earn Your Badges",
    description:
      "Bronze badge for joining, Gold for members. Wear them proudly on your profile!",
  },
  {
    Icon: FaBookOpen,
    title: "Search & Explore",
    description:
      "Use the search bar and tags to find posts that match your interests. Discover new conversations every day!",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const TriblyUserGuide = () => {
  return (
    <section className="bg-base-200 min-h-screen py-12 px-6 md:px-20 font-urbanist text-base-content">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl font-extrabold mb-8 text-center text-primary min-h-[4rem]">
          <Typewriter
            words={["🎉 Welcome to Tribly — Your Ultimate User Guide!"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
            
          />
        </h1>
        <p className="mb-12 text-center text-lg max-w-3xl mx-auto text-base-content/80">
          Whether you're a curious newbie or a seasoned member, this guide will
          walk you through all the awesome features Tribly has to offer. Ready
          to dive in and make your mark? Let’s go! 🚀
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {steps.map(({ Icon, title, description }, i) => (
            <motion.article
              key={i}
              variants={itemVariants}
              className="flex gap-5 bg-base-100 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-default"
              tabIndex={0}
              aria-label={`Step ${i + 1}: ${title}`}
              role="article"
            >
              <div className="flex-shrink-0 flex items-center justify-center rounded-full bg-primary/20 p-4 text-primary">
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-primary mb-2">{`Step ${
                  i + 1
                }: ${title}`}</h2>
                <p className="text-base-content/90">{description}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          className="mt-12 text-center italic text-base-content/70"
          variants={itemVariants}
        >
          Happy Tribly-ing! 🎈
        </motion.p>
      </motion.div>
    </section>
  );
};

export default TriblyUserGuide;
