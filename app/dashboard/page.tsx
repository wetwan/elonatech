"use client";

import React, { useState } from "react";
import AddTAsk from "../(components)/add";
import axios from "axios";

const Dashboard = () => {
  const Task = [
    {
      name: "task 1",
      description: "this is task 1",
      status: "pending",
    },
    {
      name: "task 2",
      description: "this is task 1",
      status: "pending",
    },
  ];

  const [open, setOpen] = useState(false);
  const [task, setTask] = useState([]);

  const getTask = async (i: number) => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/login");
      console.log(res.data);
    } catch (error) {}
  };
  const deleteTask = (i: number) => {
    try {
    } catch (error) {}
  };
  const editTask = (i: number) => {
    try {
    } catch (error) {}
  };
  const completeTask = (i: number) => {
    try {
    } catch (error) {}
  };

  return (
    <div>
      <h1 className="my-5 font-bold text-2xl capitalize">Dashboard page</h1>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="my-20 p-4  mx-20 bg-green-500  rounded-2xl "
      >
        add task
      </button>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5  justify-center items-center max-w-7xl mx-auto border p-10 rounded-2xl">
        {Task.map((task, i) => (
          <div
            key={i}
            className="p-5  rounded-2xl bg-slate-200 text-blue-500 h-[200px]"
          >
            <h2>{task.name}</h2>
            <p className="p-4 text-2xl ">{task.description.slice(0, 20)}</p>

            <div className="flex items-center gap-3">
              <p>{task.status === "pending" ? "🤷‍♀️" : "🚀"}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                ✓
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                🗑️
              </button>
            </div>
          </div>
        ))}{" "}
        <div
          onClick={() => setOpen(true)}
          className="p-5 h-[200px] rounded-2xl bg-slate-200 text-blue-500 flex items-center justify-center text-8xl cursor-pointer  "
        >
          +
        </div>
      </div>
      {open && <AddTAsk setOpen={setOpen} />}
    </div>
  );
};

export default Dashboard;
