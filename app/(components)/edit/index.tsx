'use client';

import { useTaskCreation } from "@/app/context/taskContext";
import React, { FormEvent } from "react";

interface Props {
  editingTaskId: string;
}

const EditTask = ({ editingTaskId }: Props) => {
  const { editTask, task, setTask, setOpenEdit } = useTaskCreation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editTask(editingTaskId, task.title, task.description);
    setOpenEdit(false); // close modal after editing
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 bg-amber-50">
      <div className="w-[500px] mx-auto mt-20 p-10 bg-white border relative">
        <div
          className="absolute top-3 right-2 cursor-pointer border rounded-full h-7 w-7 text-center text-black"
          onClick={() => setOpenEdit(false)}
        >
          x
        </div>
        <h2 className="text-black font-extrabold capitalize text-4xl">
          Edit Task
        </h2>
        <form className="text-black" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            className="border w-full my-5 p-3 rounded-2xl placeholder:text-black outline-none"
            placeholder="Title"
            value={task.title}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <textarea
            id="description"
            rows={4}
            className="border p-3 rounded-2xl placeholder:text-black w-full outline-none my-5"
            placeholder="Description"
            value={task.description}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Edit Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
