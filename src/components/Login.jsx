import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { gsap } from "gsap";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl,setToken,setUser} = useContext(AppContext);
  const formRef = useRef(null);

  const[name,setName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');

  const onSubmitHandler = async(e)=>{
    e.preventDefault();

    try{
        if(state==='Login'){
           const {data}= await axios.post(backendUrl+'/api/user/login',{email,password})
            if(data.success){
              setToken(data.token)
              setUser(data.user)
              localStorage.setItem('token',data.token)
              setShowLogin(false)
            }else{
              toast.error(data.message)
            }
    }else{
      const {data}= await axios.post(backendUrl+'/api/user/register',{name,email,password})
            if(data.success){
              setToken(data.token)
              setUser(data.user)
              localStorage.setItem('token',data.token)
              setShowLogin(false)
            }else{
              toast.error(data.message)
            }
    }
  }catch(error){
       toast.error(error.message)
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // GSAP animation for form entrance
    gsap.fromTo(
      formRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    );

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <form onSubmit={onSubmitHandler}
        ref={formRef}
        className="relative bg-white p-10 rounded-xl text-slate-500 shadow-lg"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue</p>

        {/* Full Name Field (Only in Sign Up) */}
        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
            <img
              src={assets.profile_icon || assets.user_icon}
              alt=""
              className="w-6 opacity-50 relative -left-1"
            />
            <input onChange={e=>setName(e.target.value)} value={name}
              type="text"
              className="outline-none text-sm w-full"
              placeholder="Full Name"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.email_icon} alt="" className="w-5 opacity-80" />
          <input onChange={e=>setEmail(e.target.value)} value={email}
            type="email"
            className="outline-none text-sm w-full"
            placeholder="Email Id"
            required
          />
        </div>
        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
          <img src={assets.lock_icon} alt="" className="w-5 opacity-80" />
          <input onChange={e=>setPassword(e.target.value)} value={password}
            type="password"
            className="outline-none text-sm w-full"
            placeholder="Password"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">
          Forgot password?
        </p>
        <button className="bg-blue-600 w-full text-white py-2 rounded-full hover:bg-blue-700 transition-all duration-300">
          {state === "Login" ? "Login" : "Create account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer "
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => {
            gsap.to(formRef.current, {
              y: 50,
              opacity: 0,
              scale: 0.9,
              duration: 0.4,
              ease: "power3.in",
              onComplete: () => setShowLogin(false),
            });
          }}
          src={assets.cross_icon}
          alt=""
          className="absolute top-5 right-5 cursor-pointer w-6 hover:scale-110 transition-all duration-200"
        />
      </form>
    </div>
  );
};

export default Login;
