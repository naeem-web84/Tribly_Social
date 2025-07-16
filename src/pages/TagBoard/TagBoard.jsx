// src/components/TagBoard/TagBoard.jsx
import React from "react";
import { motion } from "framer-motion";
import categorizedTags from "../../data/tags";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

const TagBoard = () => {
  return (
    <section className="py-12 px-4 md:px-10 lg:px-20 font-urbanist bg-secondary text-secondary-content">
      <div className="max-w-6xl mx-auto text-center space-y-4 mb-10">
        <h2 className="text-4xl font-bold">🔖 Explore Tags</h2>
        <p className="text-base-content/70 max-w-2xl mx-auto">
          To find your interest, search by these tags.
        </p>
      </div>

      {/* Tag Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categorizedTags.map(({ label, labelIcon: LabelIcon, tags }, i) => (
          <motion.div
            key={label}
            className="bg-base-100 text-base-content rounded-xl shadow-xl p-6 border border-base-300 hover:shadow-2xl transition duration-300"
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardVariants}
          >
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-primary text-primary-content rounded-full shadow">
                <LabelIcon className="text-xl" />
              </div>
              <h3 className="text-xl font-bold">{label}</h3>
            </div>

            {/* Tag List */}
            <div className="flex flex-wrap gap-3">
              {tags.map(({ name, icon: TagIcon }) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm border border-primary text-secondary-content hover:bg-primary hover:text-primary-content transition-all"
                >
                  <TagIcon className="text-secondary-content" />
                  #{name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TagBoard;
