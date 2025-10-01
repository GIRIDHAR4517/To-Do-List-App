import React, { useEffect, useState } from 'react'
import { useToggle } from '../../../Backend/useToggle'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../../Backend/useAuth'
import { useNavigate } from 'react-router-dom'



export const Login = () => {
  const navigate = useNavigate()
  const [passwordVisibility, toggle] = useToggle()
  const {isLoggedIn, setLogin , setCurrentUser} = useAuth()
  
  const [loginData, setLoginData] = useState({ uname: "", password: "" })
  const {users} = useAuth();
  const handleOnchange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }



  const handleLogin = (e) => {
    e.preventDefault()
    const matchedUsers = users.find(
      user => user.username === loginData.uname && user.password_hash === loginData.password
    )

    if (matchedUsers) {
      localStorage.setItem("loggedinUsers", JSON.stringify(matchedUsers))
      setLogin(true)
      setCurrentUser(matchedUsers)
      toast.success("Login successful ✅")
      navigate('/')
    } else {
      toast.error("Invalid credentials ❌")
    }

    setLoginData({ uname: "", password: "" })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 via-white to-cyan-500">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200"
      >
        
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-gray-500">
          Please login to continue
        </p>

        
        <div>
          <label className="block text-gray-600 mb-1 text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            name="uname"
            placeholder="Enter your username"
            value={loginData.uname}
            onChange={handleOnchange}
            className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       
        <div className="relative">
          <label className="block text-gray-600 mb-1 text-sm font-medium">
            Password
          </label>
          <input
            type={passwordVisibility ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={loginData.password}
            onChange={handleOnchange}
            className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={toggle}
            className="absolute top-9 right-3 text-sm text-blue-600 hover:underline"
          >
            {passwordVisibility ? "Hide" : "Show"}
          </button>
        </div>

        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        
        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/Register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  )
}
