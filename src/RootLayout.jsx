import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Navbar } from './Components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { AuthProvider } from '../Backend/useAuth'

export const RootLayout = () => {
  return (
    <>
    <AuthProvider>
        <Toaster/>
        <Navbar/>
        <Outlet/>
    </AuthProvider>
    </>
  )
}
