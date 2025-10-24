import React from 'react'
import { useToggle } from '../../../Backend/useToggle'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../../Backend/useAuth'

const api_path = 'https://to-do-list-app-backend-spring.onrender.com/api/users'

export const Registration = () => {
  const {users} = useAuth();
  const [passwordVisibility, toggle] = useToggle()
  const [formData, setFormData] = useState({ name: "", username: "", email: "", password: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const isUserExist = users.some(t => t.username === formData.username)
    const isEmailExist = users.some(t=>t.email === formData.email);
    if(isUserExist){
      toast.error('❌ Username already exist please try new one ');
      return;
    }
    if(isEmailExist){
      toast.error('❌ Email already Registered ');
      return;

    }
    try {
      await axios.post(api_path, formData, { headers: { 'Content-Type': 'application/json' } })
      toast.success("Registered Successfully ✅")
    } catch (error) {
      toast.error("All fields are required ❌")
      console.log(error)
    }
    setFormData({ name: "", username: "", email: "", password: "" })
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-100 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/20 dark:bg-gray-800/50 backdrop-blur-lg border border-white/30 dark:border-gray-600 rounded-3xl p-8 space-y-5 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-500 dark:text-indigo-400 mb-2">Create an Account</h2>
        <p className="text-sm text-center text-gray-700 dark:text-gray-300 mb-6">Fill in your details to get started</p>

       
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full bg-white/30 dark:bg-gray-700/40 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full bg-white/30 dark:bg-gray-700/40 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          />
        </div>

        
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full bg-white/30 dark:bg-gray-700/40 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition"
          />
        </div>

       
        <div className="relative">
          <input
            type={passwordVisibility ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full bg-white/30 dark:bg-gray-700/40 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm transition pr-10"
          />
          <button
            type="button"
            onClick={toggle}
            className="absolute top-3 right-3 text-gray-600 dark:text-gray-300"
          >
            {passwordVisibility ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white p-3 rounded-xl font-bold shadow-md transition duration-200"
        >
          Register
        </button>

      
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account? <span className="text-indigo-500 dark:text-indigo-400 cursor-pointer hover:underline"><NavLink to="/Login">Login</NavLink></span>
        </p>
      </form>
    </section>
  )
}
