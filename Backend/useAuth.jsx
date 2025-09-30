import axios from "axios";
import React from "react";
import  { createContext, useContext, useEffect, useState } from "react";

const context = createContext();
const api_path = "http://localhost:3001/api/add-users";
export function useAuth() {
  return useContext(context);
}
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLogin] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const login = JSON.parse(localStorage.getItem("loggedinUsers"));

    if (login) {
      setLogin(true);
    }
  }, []);

  useEffect(() => {
    async function fetcher() {
      try {
        let res = await axios.get(api_path);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetcher();
  }, []);

  useEffect(() => {
    async function fetcher() {
      const res = await axios.get("http://localhost:3001/api/add-tasks");
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
    setUsers : users

  }

  return (
    <context.Provider value={data}>
      {children}
    </context.Provider>
  );
};
