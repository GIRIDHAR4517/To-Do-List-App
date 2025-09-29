import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
const context = createContext();
export function useAuth (){
    return useContext(context)
}
export const AuthProvider = ({ children }) => {
    const [isLoggedIn , setLogin] = useState(false);
    const [tasks, setTasks] = useState([]);
    
    useEffect(()=>{

      const login = JSON.parse(localStorage.getItem("loggedinUsers"))

      if(login){
        setLogin(true)
      }

    },[])

    

  useEffect(() => {
    async function fetcher() {
      const res = await axios.get("http://localhost:3001/api/add-tasks");
      setTasks(res.data);
    }
    fetcher();
  }, []);
    

  return (
   <context.Provider value={[isLoggedIn ,setLogin , tasks , setTasks ]}>
    {children}
   </context.Provider>
  )
}
