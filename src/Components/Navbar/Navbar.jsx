import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../Backend/useAuth";
import { FaHome, FaTasks, FaSignOutAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";

export const Navbar = () => {
  const [isLoggedIn, setLogin] = useAuth();

  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem("loggedinUsers");
  };

  return (
    <nav className="flex justify-center fixed top-0 left-0 w-full z-50 p-3">
      {isLoggedIn ? (
        <ul className="flex gap-6 px-8 py-3 bg-white/30 backdrop-blur-md shadow-lg rounded-full border border-white/20 dark:bg-gray-800/40 dark:border-gray-700/50">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
              ${isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-white"
              }`
            }
          >
            <FaHome size={18} /> Home
          </NavLink>

          <NavLink
            to="/Tasks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
              ${isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-white"
              }`
            }
          >
            <FaTasks size={18} /> Tasks
          </NavLink>

          <NavLink
            to="/Login"
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-red-500 hover:bg-red-600 text-white transition shadow-md"
          >
            <FaSignOutAlt size={18} /> Logout
          </NavLink>
        </ul>
      ) : (
        <ul className="flex gap-6 px-8 py-3 bg-white/30 backdrop-blur-md shadow-lg rounded-full border border-white/20 dark:bg-gray-800/40 dark:border-gray-700/50">
          <NavLink
            to="/Login"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
              ${isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-white"
              }`
            }
          >
            <FaSignInAlt size={18} /> Login
          </NavLink>

          <NavLink
            to="/Register"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition
              ${isActive
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-blue-900 dark:hover:text-white"
              }`
            }
          >
            <FaUserPlus size={18} /> Register
          </NavLink>
        </ul>
      )}
    </nav>
  );
};
