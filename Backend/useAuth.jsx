import axios from "axios";
import React from "react";
import  { createContext, useContext, useEffect, useState } from "react";

const context = createContext();
const api_path = "https://to-do-list-app-backend-spring.onrender.com/api/users";

export function useAuth() {
  return useContext(context);
}
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser , setCurrentUser] =useState();

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("loggedinUsers"));
    setCurrentUser(login);
    if (login) {
      setLogin(true);
    }
  }, []);
  
  useEffect(() => {
    async function fetcher() {
      try {
        let res = await axios.get(api_path);
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetcher();
  }, []);

  useEffect(() => {
    async function fetcher() {
      const res = await axios.get("https://to-do-list-app-backend-spring.onrender.com/api/tasks");
      console.log(res.data);
      setTasks(res.data);
    }
    fetcher();
  }, []);

  const data ={
    isLoggedIn : isLoggedIn,
    setLogin  : setLogin,
    tasks : tasks,
    setTasks :setTasks,
    users : users,
    setUsers : users,
    currentUser:currentUser,
    setCurrentUser:setCurrentUser
  }

  return (
    <context.Provider value={data}>
      {children}
    </context.Provider>
  );
};
