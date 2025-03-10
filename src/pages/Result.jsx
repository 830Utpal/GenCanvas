import React, { useState } from "react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      {/* Image with Loading Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="relative">
          <img
            src={image}
            alt="Generated"
            className="max-w-sm rounded-lg shadow-lg border border-gray-300"
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[3s]" : "w-0"
            }`}
          />
        </div>
        {loading && <p className="mt-2 text-gray-500">Loading.....</p>}
      </motion.div>

      {/* Input Field & Generate Button */}
      {!isImageLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex w-full max-w-xl bg-neutral-900/70 backdrop-blur-lg text-white text-sm p-1 mt-10 rounded-full shadow-lg border border-gray-700"
        >
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Describe what you want to generate..."
            className="flex-1 bg-transparent outline-none text-white px-4 py-3 placeholder-gray-400 placeholder-opacity-75 focus:placeholder-opacity-100 transition-all duration-300"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 px-10 sm:px-16 py-3 rounded-full transition-all duration-500 text-white font-medium shadow-md"
          >
            Generate
          </button>
        </motion.div>
      )}

      {/* Generate Another & Download Buttons */}
      {isImageLoaded && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 flex-wrap justify-center text-white text-sm p-2 mt-10"
        >
          <motion.p
            onClick={() => setIsImageLoaded(false)}
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-transparent border border-gray-800 text-gray-800 px-8 py-3 rounded-full transition-all duration-300 hover:bg-purple-900 hover:text-white shadow-md"
          >
            Generate Another
          </motion.p>
          <motion.a
            href={image}
            download
            whileHover={{ scale: 1.05, boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer bg-black px-10 py-3 rounded-full text-white transition-all duration-300 hover:bg-gray-900 shadow-lg"
          >
            Download
          </motion.a>
        </motion.div>
      )}
    </motion.form>
  );
};

export default Result;
