import React, { useContext, useEffect, useRef } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const BuyCredit = () => {
  
  const { user,backendUrl,loadCreditsData,token,setShowLogin} = useContext(AppContext);
  useContext(AppContext);

  const navigate=useNavigate()

  const initPay=async(order)=>{
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credit Payment",
      description: "Credits Payment",
      receipt: order.receipt,
      handler: async(response)=>{
        try{
          const {data}=await axios.post(backendUrl+"/api/user/verify-razor",{response,order},{headers:{token}})
          if(data.success){
            loadCreditsData()
            navigate('/')
            toast.success('credits added successfully')
          }
        }catch(error){
          toast.error(error.message)
        }
      }
    }
    const rzp= new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay=async(planId)=>{
    try{
      if(!user){
        setShowLogin(true)
      }

     const {data} =await axios.post(backendUrl+"/api/user/pay-razor",{planId},{headers:{token}})
        
     if(data.success){
        initPay(data.order)
     }

    }catch(error){
      toast.error(error.message)
    }
  }

  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(buttonRef.current, {
      borderImageSource: "linear-gradient(120deg, #ff7eb3, #ff758c, #ff7eb3)",
      borderImageSlice: 1,
      repeat: -1,
      duration: 3,
      ease: "linear",
    });
  }, []);

  return (
    <div ref={containerRef} className="min-h-[80vh] text-center pt-14 mb-10">
      {/* Our Plans Button with Animated Border & Shadow Effect */}
      <button
        ref={buttonRef}
        className=" border-gray-400 px-10 py-2 rounded-full mb-6 text-lg font-medium text-gray-700 
        relative overflow-hidden before:absolute before:inset-0 before:rounded-full 
        before:border-[3px] before:border-transparent before:animate-rotateBorder 
        shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        Our Plans
      </button>

      <h1 className="text-center text-4xl font-semibold mb-6 sm:mb-10 text-gray-800">
        Choose the Plan
      </h1>

      {/* Pricing Plans Section */}
      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => {
          let planClass = "";
          let hoverEffect = "";
          let buttonClass = "text-white"; // Default button text color

          if (item.id.includes("Basic")) {
            planClass = "border-gray-300";
            hoverEffect = "hover:scale-105";
            buttonClass = "text-black bg-gray-100 hover:bg-gray-300"; // Basic plan: black text
          } else if (item.id.includes("Advanced")) {
            planClass = "border-purple-500 shadow-lg";
            hoverEffect =
              "hover:scale-110 hover:shadow-2xl transition-all duration-300";
            buttonClass =
              "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500";
          } else if (item.id.includes("Business")) {
            planClass =
              "border-yellow-500 bg-gradient-to-br from-yellow-300 to-orange-400 text-black shadow-xl";
            hoverEffect =
              "hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-pulse";
            buttonClass =
              "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-orange-600 hover:to-yellow-500 text-white";
          }

          return (
            <div
              key={index}
              className={` bg-white drop-shadow-lg border rounded-lg py-12 px-8 text-gray-700 
              relative overflow-hidden ${planClass} ${hoverEffect} before:absolute 
              before:inset-0 before:border-[3px] before:border-transparent 
              before:animate-rotateBorder`}
            >
              <img width={40} src={assets.logo_icon} alt="" />
              <p className="mt-3 mb-1 font-semibold text-gray-900">{item.id}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
              <p className="mt-6 text-gray-800">
                <span className="text-3xl font-semibold text-black">
                  ₹{item.price}
                </span>{" "}
                / {item.credits} credits
              </p>

              {/* Buttons with Modern Styles */}
              <button onClick={()=>paymentRazorpay(item.id)}
                className={`w-full mt-8 text-sm rounded-md py-3 min-w-52 font-medium 
                transition-all duration-300 shadow-md ${buttonClass}`}
              >
                {user ? "Purchase" : "Get Started"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuyCredit;  