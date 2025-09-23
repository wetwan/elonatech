"use client";

import axios from "axios";
import React, { useState } from "react";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!signUp.email || !signUp.password) {
      setError("All fields are required");
      return;
    }

    if (!regexemail.test(signUp.email)) {
      setError("Invalid email format");
      return;
    }
    if (signUp.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      // signig up
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email: signUp.email,
        password: signUp.password,
      });
      const data = res.data;
      console.log(data, "data");
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-[500px] p-20 rounded-2xl">
        <h1 className="my-5 font-bold text-2xl capitalize">signUp page</h1>
        <form
          onSubmit={handleSignUp}
          className="capitalize flex flex-col gap-5 placeholder-shown:capitalize placeholder:capitalize"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">name</label>
            <input
              type="text"
              id="name"
              className="border p-4 rounded-xl placeholder:capitalize placeholder:text-white"
              placeholder="username"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="email"
              className="border placeholder:text-white p-4 rounded-xl placeholder:capitalize"
              placeholder="email"
              value={signUp.email}
              onChange={(e) =>
                setSignUp((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="email"
              className="border p-4 rounded-xl placeholder:capitalize placeholder:text-white"
              placeholder="password"
              value={signUp.password}
              onChange={(e) =>
                setSignUp((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button
            disabled={loading}
            type="submit"
            className="py-4 bg-blue-500 text-white rounded-xl"
          >
            {loading ? "Sign up" : "    Signing Up"}
          </button>

          <div className=" uppercase">
            Not a user yet{" "}
            <span className="text-blue-700 cursor-pointer"> sign up</span>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
