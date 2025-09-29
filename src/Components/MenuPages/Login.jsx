import React, { useEffect, useState } from 'react'
import { useToggle } from '../../../Backend/useToggle'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../../Backend/useAuth'
import { useNavigate } from 'react-router-dom'

const api_path = 'http://localhost:3001/api/add-users'

export const Login = () => {
  const navigate = useNavigate()
  const [passwordVisibility, toggle] = useToggle()
  const [isLoggedIn, setLogin] = useAuth()
  const [users, setUsers] = useState([])
  const [loginData, setLoginData] = useState({ uname: "", password: "" })

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setLoginData({ ...loginData, [name]: value })
  }

  useEffect(() => {
    async function fetcher() {
      try {
        let res = await axios.get(api_path)
        setUsers(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetcher()
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    const matchedUsers = users.find(
      user => user.username === loginData.uname && user.password_hash === loginData.password
    )

    if (matchedUsers) {
      localStorage.setItem("loggedinUsers", JSON.stringify(matchedUsers))
      setLogin(true)
      toast.success("Login successful ✅")
      navigate('/')
    } else {
      toast.error("Invalid credentials ❌")
    }

    setLoginData({ uname: "", password: "" })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-cyan-100">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-gray-200"
      >
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-center text-gray-500">
          Please login to continue
        </p>

        {/* Username */}
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

        {/* Password */}
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

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>

        {/* Footer */}
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
