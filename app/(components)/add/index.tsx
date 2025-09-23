'use client";'

import React from "react";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AddTAsk = ({ setOpen }: Props) => {
  return (
    <div className=" absolute top-0 bottom-0 left-0 right-0 bg-amber-50">
      <div className="w-[500px] mx-auto mt-20 p-10 bg-white border relative ">
        <div
          className="absolute top-10 right-4  text-black"
          onClick={() => setOpen(false)}
        >
         
          x
        </div>
        <input
          type="text"
          id="name"
          className="border w-full my-5 p-3 rounded-2xl placeholder:text-black  "
          placeholder="Title"
        />
        <textarea
          id="name"
          className="border p-3 rounded-2xl placeholder:text-black w-full my-5 "
          placeholder="Descrpitions"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Add task
        </button>
      </div>
    </div>
  );
};

export default AddTAsk;
