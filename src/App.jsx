import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './Components/MenuPages/Login'
import { Registration } from './Components/MenuPages/Registration'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { RootLayout } from './RootLayout'
import { Home } from './Components/MenuPages/Home'
import { Tasks } from './Components/MenuPages/Tasks'
import { TaskStatus, TaskViewer } from './Components/TaskViewer'

function App() {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<RootLayout/>,
      children:[
        {index:true , element:<Home/>},
        {path:"Login", element:<Login/>},
        {path:'Register',element:<Registration/>},
        {path:'Tasks',element:<Tasks/>},
        {path:'TaskViewer' , element:<TaskViewer/>,
          children :[
            {path:':id',element:<TaskStatus/>}
          ]
        }
        
      ]
    }
  ])

  return (
  
    <RouterProvider router={route}/>
  )
}

export default App
