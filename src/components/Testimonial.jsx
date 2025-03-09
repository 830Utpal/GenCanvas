import React from "react";
import { motion } from "framer-motion";
import { assets, testimonialsData } from "../assets/assets";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 p-12">
      {/* Heading Animation */}
      <motion.h1
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-3xl sm:text-4xl font-semibold mb-2"
      >
        Customer Testimonials
      </motion.h1>

      <motion.p
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="text-gray-500 mb-12"
      >
        What Our Users Are Saying
      </motion.p>

      {/* Testimonials */}
      <motion.div
        className="flex flex-wrap gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.2 }}
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={fadeUpVariant}
            className="bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex flex-col items-center">
              <img src={testimonial.image} alt="" className="rounded-full w-14" />
              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-gray-500 mb-4">{testimonial.role}</p>
              <div className="flex mb-4">
                {Array(testimonial.stars)
                  .fill()
                  .map((_, i) => (
                    <img key={i} src={assets.rating_star} alt="" />
                  ))}
              </div>
              <p className="text-center text-sm text-gray-600">{testimonial.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Testimonial;
