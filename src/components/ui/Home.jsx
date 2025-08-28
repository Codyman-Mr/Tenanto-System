import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 p-4 space-y-12 relative overflow-hidden">

      {/* Background subtle circles */}
      <div className="absolute top-[-80px] left-[-80px] w-96 h-96 bg-blue-300 rounded-full opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-purple-300 rounded-full opacity-20 animate-pulse-slow"></div>

      {/* Hero heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 text-center animate-pulse">
        Welcome to Tenanto System
      </h1>

      {/* Description */}
      <p className="text-center text-gray-700 text-lg md:text-xl max-w-2xl">
        Manage your tenants, units, and assignments easily. Login or register to start your journey with Tenanto!
      </p>

      {/* Buttons with icons */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
        <Link
          to="/login"
          className="flex items-center justify-center px-10 py-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transform hover:-translate-y-2 transition-all duration-300 space-x-3"
        >
          <FaSignInAlt className="text-lg" />
          <span className="text-lg font-medium">Login</span>
        </Link>
        <Link
          to="/register"
          className="flex items-center justify-center px-10 py-4 bg-green-600 text-white rounded-full shadow-xl hover:bg-green-700 transform hover:-translate-y-2 transition-all duration-300 space-x-3"
        >
          <FaUserPlus className="text-lg" />
          <span className="text-lg font-medium">Register</span>
        </Link>
      </div>

    </div>
  );
};

export default Home;
