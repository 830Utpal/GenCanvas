import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Description = () => {
  const titleRef = useRef(null);
  const subTextRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Heading & Subtext Animation
    gsap.from([titleRef.current, subTextRef.current], {
      opacity: 0,
      y: 50, // Move up from 50px
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%", // Start when the element is 90% in viewport
        toggleActions: "play none none none",
      },
    });

    // Image Slide-in from Left
    gsap.from(imageRef.current, {
      opacity: 0,
      x: -100, // Move from left
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // Text Slide-in from Right
    gsap.from(textRef.current, {
      opacity: 0,
      x: 100, // Move from right
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center text-center">
      {/* Animated Heading */}
      <h1 ref={titleRef} className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>

      {/* Animated Subtext */}
      <p ref={subTextRef} className="text-gray-500 mb-8">
        Turn your imagination into visuals
      </p>

      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        {/* Image with GSAP Animation */}
        <img
          ref={imageRef}
          src={assets.sample_img_1}
          alt=""
          className="w-80 xl:w-96 rounded-lg"
        />

        {/* Text Section with GSAP Animation */}
        <div ref={textRef}>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Easily bring your ideas to life with our free AI image generator.
            Whether you need stunning visuals or unique imagery, our tool
            transforms your text into eye-catching images with just a few
            clicks. Imagine it, describe it, and watch it come to life
            instantly.
          </p>
          <p className="text-gray-600">
            Simply type in a text prompt, and our cutting-edge AI will generate
            high-quality images in seconds. From product visuals to character
            designs and portraits, even concepts that don't yet exist can be
            visualized effortlessly. Powered by advanced AI technology, the
            creative possibilities are limitless!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
