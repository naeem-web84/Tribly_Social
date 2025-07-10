import React from "react";
import { motion } from "framer-motion"; 
import categorizedTags from "../../data/tags";

const TagBoard = () => {
  return (
    <section className="py-10 px-4 md:px-10 lg:px-20 font-urbanist bg-base-100 text-base-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          🔖 Explore Tags
        </h2>
        <p className="text-center text-base-content/70 mb-6">
          আপনার পছন্দের টপিক খুঁজে পেতে নিচের ট্যাগগুলো একবার দেখুন!
        </p>

        {categorizedTags.map(({ icon: Icon, label, tags }) => (
          <div key={label} className="space-y-3">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Icon className="text-primary" /> {label}
            </h3>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <div key={tag} className="tooltip" data-tip={`Tag: ${tag}`}>
                  <span
                    className="badge badge-outline border-primary text-primary cursor-default hover:bg-primary hover:text-white transition duration-300"
                  >
                    #{tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default TagBoard;
