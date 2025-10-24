import React from "react";
import { TaskViewer } from "../TaskViewer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Backend/useAuth";

export const Home = () => {
 const {currentUser} = useAuth();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
     
      <div className="w-full max-w-3xl text-center mt-20">
        {currentUser ? (
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            👋 Welcome back,{" "}
            <span className="text-blue-600 dark:text-blue-400">{currentUser.name}</span>!
          </h1>
        ) : (
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            👋 Welcome Guest
          </h1>
        )}
        {currentUser && (
          <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">
            Your user ID: <span className="font-mono">{currentUser.username}</span>
          </p>
        )}
      </div>

      
      <div className="w-full max-w-4xl mt-10">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center">
          📝 Things To Do
        </h3>
        { currentUser? <div onClick={()=>navigate("/TaskViewer")} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 ">
          <TaskViewer />
        </div> :<h1 className="text-8xl font-bold text-white">Login to View Tasks</h1>}
      </div>
    </div>
  );
};
