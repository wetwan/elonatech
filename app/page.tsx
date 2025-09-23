import React from "react";
import Login from "./Login/page";
import SignUp from "./SignUp/page";
import Dashboard from "./dashboard/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <ToastContainer />
      <Dashboard />
      <Login />
      <SignUp />
    </div>
  );
};

export default Page;
