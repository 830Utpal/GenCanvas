import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const GenerateBtn = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="pb-16 text-center"
    >
      {/* Heading with Animation */}
      <motion.h1
        variants={fadeUp}
        className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16"
      >
        See the magic. Try now
      </motion.h1>

      {/* Button with Animation & Aesthetic Hover Effect */}
      <motion.button
        variants={fadeUp}
        whileHover={{
          scale: 1.1,
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(66, 66, 66, 1) 100%)",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        className="relative inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto transition-all duration-500"
      >
        <span className="relative z-10">Generate Images</span>
        <img src={assets.star_group} alt="" className="h-6 relative z-10" />

        {/* Glow Effect (Doesn't Affect Text) */}
        <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 bg-gray-800"></span>
      </motion.button>
    </motion.div>
  );
};

export default GenerateBtn;
