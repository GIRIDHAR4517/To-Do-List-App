import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

export const Tasks = () => {
  const user = JSON.parse(localStorage.getItem("loggedinUsers"));

  const [tasks, addTasks] = useState({
    title: "",
    description: "",
    category: "",
    priority: "",
    Deadline: "",
    userId: `${user.user_id}`,
  });

  const hanldeChange = (e) => {
    const { name, value } = e.target;
    addTasks({ ...tasks, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/api/add-tasks", tasks, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Task added successfully ✅");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add Task");
    }

    addTasks({
      title: "",
      description: "",
      category: "",
      priority: "",
      Deadline: "",
      userId: `${user.user_id}`,
    });
  };

  return (
    <>
     
      <section className="fixed flex top-16 justify-center w-full left-0 z-40">
        <NavLink
          to="/TaskViewer"
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-5 py-2 rounded-full shadow-md hover:scale-105 transition m-2"
        >
          View Tasks
        </NavLink>
      </section>

      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-28">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md flex flex-col gap-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-center text-blue-600 dark:text-blue-400 mb-2">
            ➕ Add New Task
          </h2>

          <input
            type="text"
            name="title"
            placeholder="Task Name"
            onChange={hanldeChange}
            value={tasks.title}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <textarea
            name="description"
            placeholder="Task Description"
            onChange={hanldeChange}
            value={tasks.description}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none resize-none"
            rows="3"
          ></textarea>

          <label htmlFor="category" className="text-sm font-semibold">
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={hanldeChange}
            value={tasks.category}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 cursor-pointer text-black"
          >
            <option value="">--- Select Category ---</option>
            <option value="1">Personal</option>
            <option value="2">Work</option>
          </select>

          <label htmlFor="priority" className="text-sm font-semibold">
            Priority
          </label>
          <select
            name="priority"
            id="priority"
            onChange={hanldeChange}
            value={tasks.priority}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 cursor-pointer text-black"
          >
            <option value="">--- Select Priority ---</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>

          <label htmlFor="Deadline" className="text-sm font-semibold">
            Deadline
          </label>
          <input
            type="date"
            name="Deadline"
            id="Deadline"
            onChange={hanldeChange}
            value={tasks.Deadline}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400 cursor-pointer"
          />

          <input
            type="submit"
            value="Add Task"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg font-semibold shadow-md hover:scale-105 transition cursor-pointer"
          />
        </form>
      </div>
    </>
  );
};
