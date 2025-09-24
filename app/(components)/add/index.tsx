'use client";';

import { useTaskCreation } from "@/app/context/taskContext";
import React from "react";

interface Props {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddTAsk = ({ setOpenAdd }: Props) => {
  const { addTask, task, setTask } = useTaskCreation();

  return (
    <div className=" absolute top-0 bottom-0 left-0 right-0 bg-amber-50">
      <div className="w-[500px] mx-auto mt-20 p-10 bg-white border relative ">
        <div
          className="absolute top-3 right-2 cursor-pointer border rounded-full h-7 w-7 text-center -py-2 text-black"
          onClick={() => setOpenAdd(false)}
        >
          x
        </div>
        <h2 className="text-black font-extrabold capitalize text-4xl">
          add Task
        </h2>
        <form className="text-black" onSubmit={addTask}>
          <input
            type="text"
            id="name"
            className="border w-full my-5 p-3 rounded-2xl placeholder:text-black  outline-none"
            placeholder="Title"
            value={task.title}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            id="description"
            rows={4}
            className="border p-3 rounded-2xl placeholder:text-black w-full outline-none my-5 "
            placeholder="Descrpitions"
            value={task.description}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Add task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTAsk;
