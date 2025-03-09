import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <div className="flex flex-col items-center justify-center my-32">
      {/* Title Animation */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-semibold mb-2 text-center"
      >
        How it works
      </motion.h1>

      {/* Subtitle Animation */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-lg text-gray-600 mb-8 text-center"
      >
        Transform Words Into Stunning Images
      </motion.p>

      {/* Steps Section */}
      <div className="space-y-6 w-full max-w-3xl text-sm">
        {stepsData.map((items, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex items-center gap-4 px-8 py-6 bg-white/20 shadow-md border 
            rounded-lg min-h-[120px] hover:scale-[1.03] hover:shadow-lg transition-all duration-500"
          >
            <img width={40} src={items.icon} alt="" />
            <div className="flex flex-col justify-center py-2">
              <h2 className="text-xl font-medium">{items.title}</h2>
              <p className="text-gray-500">{items.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
