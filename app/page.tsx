import React from "react";
import Login from "./Login/page";
import SignUp from "./SignUp/page";
import Dashboard from "./dashboard/page";

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <Login />
      <SignUp />
      <Dashboard />
    </div>
  );
};

export default Page;
