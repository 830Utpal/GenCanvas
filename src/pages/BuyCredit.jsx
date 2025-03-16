import React, { useContext, useEffect, useRef } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BuyCredit = () => {
  const { user, backendUrl, loadCreditsData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    cardRefs.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.9, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );

      gsap.to(el, {
        scale: 1.07,
        duration: 0.3,
        ease: "power2.out",
        paused: true,
      });

      el.addEventListener("mouseenter", () => gsap.to(el, { scale: 1.07 }));
      el.addEventListener("mouseleave", () => gsap.to(el, { scale: 1 }));
    });

    // **Always Blinking Light Effect for Business Plan**
    gsap.to(".business-glow", {
      boxShadow: "0px 0px 30px rgba(255, 215, 0, 1)",
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <PayPalScriptProvider
      options={{
        "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
        currency: "USD",
      }}
    >
      <div
        ref={sectionRef}
        className="min-h-[90vh] text-center pt-16 pb-14 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 rounded-xl shadow-lg p-10"
      >
        <button className="border border-gray-400 px-10 py-2 rounded-full mb-8 text-lg font-semibold text-gray-800 shadow-md hover:shadow-lg hover:bg-gray-300 transition-all">
          Our Plans
        </button>

        <h1 className="text-center text-4xl font-bold mb-10 text-gray-900">
          Choose the Plan
        </h1>

        <div className="flex flex-wrap justify-center gap-10 text-left">
          {plans.map((item, index) => {
            let borderClass = "border border-gray-300 shadow-md rounded-3xl";
            let textColor = "text-gray-900";
            let buttonClass =
              "text-black bg-gray-300 hover:bg-gray-400 transition-all rounded-lg";
            let bgGradient =
              "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300";
            let shadowColor = "shadow-gray-400/40";
            let buttonSize = "py-3";

            if (item.id.includes("Advanced")) {
              borderClass =
                "border-2 border-blue-500 shadow-xl rounded-3xl";
              bgGradient =
                "bg-gradient-to-br from-blue-700 via-indigo-500 to-blue-400";
              textColor = "text-white";
              buttonClass =
                "bg-blue-500 text-white hover:bg-blue-600 transition-all rounded-lg";
              shadowColor = "shadow-blue-500/50";
              buttonSize = "py-4";
            } else if (item.id.includes("Business")) {
              borderClass =
                "border-4 border-yellow-400 shadow-2xl rounded-3xl business-glow";
              bgGradient =
                "bg-gradient-to-br from-yellow-500 via-orange-400 to-red-400";
              textColor = "text-gray-900";
              buttonClass =
                "bg-yellow-500 text-white hover:bg-yellow-600 transition-all rounded-lg";
              shadowColor = "shadow-yellow-400/50";
              buttonSize = "py-5";
            }

            return (
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                key={index}
                className={`relative cursor-pointer border py-12 px-10 w-[360px] h-[480px] ${borderClass} ${shadowColor} ${bgGradient}`}
              >
                <img
                  width={50}
                  src={assets.logo_icon}
                  alt=""
                  className="mx-auto mb-4"
                />
                <p className={`mt-2 mb-3 font-bold text-xl ${textColor}`}>
                  {item.id}
                </p>
                <p className={`text-sm opacity-90 ${textColor}`}>
                  {item.desc}
                </p>
                <p className={`mt-6 text-lg font-medium ${textColor}`}>
                  <span className="text-3xl font-bold">
                    ${Math.round(item.price / 83)}
                  </span>{" "}
                  <span className="text-md opacity-80">
                    / {item.credits} credits
                  </span>
                </p>

                {!user ? (
                  <button
                    onClick={() => setShowLogin(true)}
                    className={`w-full mt-8 text-sm font-semibold ${buttonSize} 
                      transition-all duration-300 shadow-md ${buttonClass}`}
                  >
                    Get Started
                  </button>
                ) : (
                  <PayPalButtons
                    style={{
                      layout: "vertical",
                      color: "blue",
                      shape: "rect",
                      label: "paypal",
                    }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              currency_code: "USD",
                              value: (item.price / 83).toFixed(2),
                            },
                            description: item.id,
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        handleOnApprove(details, item.id);
                      });
                    }}
                    onError={(err) => {
                      toast.error(err.message);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default BuyCredit;
