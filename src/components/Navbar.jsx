import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>
      <div>
        {user ? (
          <div className="flex text-center gap-2 sm:gap-3">
            {/* Buy Credits Button */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full 
              hover:scale-105 hover:shadow-md transition-all duration-500"
            >
              <img className="w-5" src={assets.credit_star} alt="" />
              <p className="text-xs sm:text-sm font-medium text-green-600">
                Credits left: 50
              </p>
            </button>

            {/* User Greeting */}
            <p className="text-grey-600 max-sm:hidden pl-4 pt-2 text-lg">
              Hi, Utpal Yadav
            </p>

            {/* Profile Icon with Dropdown */}
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10 drop-shadow" alt="" />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li className="py-1 px-2 cursor-pointer pr-10">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            {/* Pricing Link */}
            <p onClick={() => navigate("/buy")} className="cursor-pointer">
              Pricing
            </p>

            {/* Login Button with Hover Effect */}
            <button
              className="bg-zinc-800 text-white px-7 py-2 sm:px-7 text-sm rounded-full 
              hover:bg-zinc-900 hover:scale-105 hover:shadow-lg transition-all duration-500"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
