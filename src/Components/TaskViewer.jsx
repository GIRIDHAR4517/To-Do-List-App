import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Backend/useAuth";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast/headless";

export const TaskViewer = () => {
  const { tasks } = useAuth();
  console.log(tasks);
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (taskId) => {
    setExpandedRow(expandedRow === taskId ? null : taskId);
  };

  return tasks.length > 0 ? (
    <section className="p-6 bg-gradient-to-b from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen rounded-2xl">
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
              <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {tasks.map((data) => (
              <React.Fragment key={data.taskId}>
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-200 cursor-pointer"
                  onClick={() => handleRowClick(data.taskId)}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                    {data.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                    {data.description}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {new Date(data.dueDate).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md border ${
                        data.priority === 1
                          ? "bg-green-100 text-green-700 border-green-400"
                          : data.priority === 2
                          ? "bg-yellow-100 text-yellow-700 border-yellow-400"
                          : "bg-red-100 text-red-700 border-red-400 animate-pulse"
                      }`}
                    >
                      {data.priority === 1
                        ? "Low"
                        : data.priority === 2
                        ? "Medium"
                        : "High"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {data.isCompleted === 0
                      ? new Date(data.dueDate) <
                        new Date()
                        ? "Due Date Crossed"
                        : "pending"
                      : "completed"}
                  </td>
                </tr>

                {expandedRow === data.taskId && (
                  <tr>
                    <td colSpan={5} className="bg-gray-50 dark:bg-gray-700 p-4">
                      <TaskStatus
                        taskId={data.taskId}
                        onClose={() => setExpandedRow(null)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  ) : (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6 rounded-2xl">
      <div className="bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 animate-pulse">
          No Tasks Present 🚀
        </h1>
        <p className="mt-3 text-gray-300">
          Since you don’t have anything to do, here are some good habits ✨
        </p>

        <ul className="mt-6 space-y-3 text-left text-gray-200 font-medium">
          <li className="flex items-center gap-3">
            <span className="text-green-400 text-xl">💧</span>
            Drink 5 liters of water daily
          </li>
          <li className="flex items-center gap-3">
            <span className="text-pink-400 text-xl">🏋️</span>
            Do a workout daily
          </li>
          <li className="flex items-center gap-3">
            <span className="text-yellow-400 text-xl">🙏</span>
            Be thankful
          </li>
        </ul>
      </div>
    </div>
  );
};

export function TaskStatus({ taskId, onClose }) {
  const { tasks, setTasks } = useAuth();
  const [status, setStatus] = useState({ status: "" });

  const task = tasks.find((t) => t.taskId === taskId);
  if (!task) return <h1>No Task Found</h1>;

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `https://to-do-list-app-backend-spring.onrender.com/api/task/${taskId}`,
        { isCompleted: status.status },
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Updated Successfully ✅");
      setTasks(
        tasks.map((t) =>
          t.taskId === taskId ? { ...t, isCompleted: status.status } : t
        )
      );
      onClose();
    } catch (error) {
      toast.error(`Failed to Update ❌: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://to-do-list-app-backend-spring.onrender.com/api/task/${taskId}`);
      toast.success("Task deleted ✅");
      
      setTasks(tasks.filter((task) => task.taskId !== taskId));
      onClose();
    } catch (error) {
      toast.error(`Failed to delete ❌: ${error.message}`);
    }
  };

  return (
    <section className="relative p-6 bg-gradient-to-r from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <button
        className="absolute top-3 right-3 text-xl font-bold text-red-600 hover:text-red-800 transition cursor-pointer"
        onClick={onClose}
      >
        ❌
      </button>

      <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-100 mb-2">
        {task.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        {task.description}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Due: {new Date(task.due_date).toLocaleDateString("en-IN")}
      </p>

      <div className="flex items-center gap-3 mb-4">
        <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
          <input
            type="checkbox"
            name="status"
            id="status"
            checked={status.status === 1}
            onChange={(e) =>
              setStatus({ ...status, status: e.target.checked ? 1 : 0 })
            }
            className="w-5 h-5 accent-indigo-500 dark:accent-indigo-400"
          />
          Completed
        </label>
      </div>

      <div className="flex gap-3">
        <button
          className="flex-1 bg-gradient-to-r from-indigo-400 to-purple-500 hover:from-indigo-500 hover:to-purple-600 text-white font-semibold py-2 rounded-xl shadow-md transition duration-200"
          onClick={handleUpdate}
        >
          Update
        </button>

        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-xl shadow-md transition duration-200 "
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </section>
  );
}
