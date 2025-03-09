import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const staggerContainer = {
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

const Header = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="flex flex-col items-center text-center my-20"
    >
      {/* Small Top Text */}
      <motion.p
        variants={fadeUp}
        className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
      >
        Best text to image generator
        <img src={assets.star_icon} alt="" />
      </motion.p>

      {/* Heading */}
      <motion.h1
        variants={fadeUp}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10"
      >
        Turn text to <span className="text-blue-600">image</span>, in seconds.
      </motion.h1>

      {/* Subtext */}
      <motion.p variants={fadeUp} className="text-center max-w-xl mx-auto mt-5">
        Unleash your creativity with AI. Turn your imagination into visual art in seconds—just type, and watch the magic happen.
      </motion.p>

      {/* Button */}
      <motion.button
        variants={fadeUp}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full mx-auto"
      >
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>

      {/* Image Grid with Staggered Animation */}
      <motion.div
        className="flex flex-wrap justify-center mt-16 gap-3"
        variants={staggerContainer}
      >
        {Array(6)
          .fill("")
          .map((_, index) => (
            <motion.img
              key={index}
              variants={fadeUp}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              width={70}
            />
          ))}
      </motion.div>

      <motion.p variants={fadeUp} className="mt-2 text-neutral-600">
        Generated images from Imagify
      </motion.p>
    </motion.div>
  );
};

export default Header;
