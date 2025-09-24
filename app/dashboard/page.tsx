"use client";

import React, { useEffect, useState } from "react";
import AddTAsk from "../(components)/add";
import { useRouter } from "next/navigation";
import { useTaskCreation } from "../context/taskContext";
import EditTask from "../(components)/edit";
import { set } from "mongoose";

const Dashboard = () => {
  const router = useRouter();
  const {
    openAdd,
    setOpenAdd,
    tasks,
    deleteTask,
    completeTask,
    openEdit,
    setOpenEdit,
  } = useTaskCreation();

  const [status, setStatus] = useState("all");
  const [statusIndex, setStatusIndex] = useState(0);

  const filterStatus = ["all", "pending", "completed"];
  const [editingTaskId, setEditingTaskId] = useState<string>("");

  const filteredTasks = tasks
    .filter((task) => status === "all" || task.status === status)
    .sort((a, b) => {
      if (a.status === "pending" && b.status !== "pending") return -1;
      if (a.status !== "pending" && b.status === "pending") return 1;
      return 0;
    });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
    }
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center p-4 w-full my-10">
        <button
          onClick={() => {
            setOpenAdd(true);
          }}
          className=" px-10 p-4  bg-green-500  rounded-2xl "
        >
          Add task
        </button>

        <div className="flex gap-5 justify-center items-center w-[350p] bg-amber-50 p-5 rounded-2xl">
          {filterStatus.map((s, i) => (
            <div
              key={i}
              className={`cursor-pointer  px-4 py-2 rounded-lg capitalize ${
                statusIndex === i
                  ? "bg-white text-green-600 font-bold"
                  : "bg-black"
              }`}
              onClick={() => {
                setStatus(s);
                setStatusIndex(i);
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5  justify-center items-center max-w-7xl mx-auto p-10 rounded-2xl">
        {filteredTasks.map((task) => (
          <div
            key={task._id}
            className="p-5 overflow-clip  rounded-2xl bg-slate-200 text-blue-500 h-[300px]"
          >
            <h2 className="font-bold whitespace-nowrap text-ellipsis mask-ellipse uppercase text-xl">
              {task?.name}
            </h2>
            <p className="p-4 text-xl h-4/6 overflow-scroll font-light">
              {task?.description}
            </p>

            <div className="flex items-center gap-3 pt-4">
              <p className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                {task?.status === "pending" ? "🤷‍♀️" : "🚀"}
              </p>
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
                  task.status === "completed" &&
                  "bg-green-500 cursor-not-allowed"
                }`}
                disabled={task.status === "completed"}
                onClick={() => completeTask(task._id)}
              >
                ✓
              </button>
              <button
                className={`bg-blue-500 text-white px-4 py-2 transition-colors duration-150 ease-in rounded-lg ${
                  task.status === "completed" &&
                  "bg-green-500 cursor-not-allowed"
                }`}
                disabled={task.status === "completed"}
                onClick={() => {
                  setEditingTaskId(task._id);
                  setOpenEdit(true);
                }}
              >
                ✒️
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-150 ease-in"
                onClick={() => deleteTask(task._id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        <div
          onClick={() => setOpenAdd(true)}
          className="p-5 h-[300px] rounded-2xl bg-slate-200 text-blue-500 flex items-center justify-center text-8xl cursor-pointer  hover:bg-slate-400 transition-colors duration-150 ease-in"
        >
          +
        </div>
      </div>
      {openAdd && <AddTAsk setOpenAdd={setOpenAdd} />}
      {openEdit && <EditTask editingTaskId={editingTaskId} />}
    </div>
  );
};

export default Dashboard;
