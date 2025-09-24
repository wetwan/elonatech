"use client";
import { useTaskCreation } from "@/app/context/taskContext";
import React from "react";

const Nav = () => {
  const { handleLogout } = useTaskCreation();
  return (
    <div className="flex justify-between p-4  mx-auto items-center my-5">
      <div className="">
        <h1 className="my-5 font-bold text-2xl capitalize">Elonatech</h1>
        <p className="hidden sm:block font-semibold">Welcome to Elonatech Nigeria Limited</p>
      </div>

      <div
        className="py-5 capitalize px-10 rounded-2xl bg-red-500"
        onClick={handleLogout}
      >
        log out
      </div>
    </div>
  );
};

export default Nav;
