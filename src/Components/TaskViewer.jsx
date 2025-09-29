import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Backend/useAuth';

export const TaskViewer = () => {
const [,,tasks] = useAuth();
 

  return (
    tasks.length > 0 ? (
    <section className="p-6 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen rounded-2xl ">
      <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 mt-16">
        <table className="min-w-full border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
       
          <thead className="bg-gradient-to-r from-amber-500 to-amber-600 text-white dark:from-amber-600 dark:to-amber-700">
            <tr>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-left">
                Task
              </th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-left">
                Description
              </th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-left">
                Due Date
              </th>
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-left">
                Priority
              </th>
            </tr>
          </thead>

         
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((data, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200"
              >
                
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {data.title}
                </td>

                
                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                  {data.description}
                </td>

               
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {new Date(data.due_date).toLocaleDateString("en-IN")}
                </td>

               
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md border 
                      ${
                        data.priority_id === 1
                          ? "bg-green-100 text-green-700 border-green-400 dark:bg-green-900 dark:text-green-300 dark:border-green-600"
                          : data.priority_id === 2
                          ? "bg-yellow-100 text-yellow-700 border-yellow-400 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-600"
                          : "bg-red-100 text-red-700 border-red-400 dark:bg-red-900 dark:text-red-300 dark:border-red-600 animate-pulse"
                      }`}
                  >
                    {data.priority_id === 1
                      ? "Low"
                      : data.priority_id === 2
                      ? "Medium"
                      : "High"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  ) : (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-lg font-semibold text-gray-600 dark:text-gray-300 animate-pulse">
        Loading tasks...
      </h1>
    </div>
  )
)
};
