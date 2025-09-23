"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.preventDefault();
    setError("");

    if (!login.email || !login.password) {
      setError("All fields are required");
      return;
    }

    if (!regexemail.test(login.email)) {
      setError("Invalid email format");
      return;
    }
    if (login.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    router.push("/home");
    try {
      const res = await axios.post("http://localhost:5000/api/user/login", {
        email: login.email,
        password: login.password,
      });
      console.log("✅ User registered:", res.data);
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-[500px] p-20 rounded-2xl">
        <h1 className="my-5 font-bold text-2xl capitalize">login page</h1>
        <form onSubmit={handleLogin} className="capitalize flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Email</label>
            <input
              type="email"
              id="email"
              className="border p-4 rounded-xl"
              placeholder="username"
              value={login.email}
              onChange={(e) =>
                setLogin((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="email"
              className="border p-4 rounded-xl"
              placeholder="password"
              value={login.password}
              onChange={(e) =>
                setLogin((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </div>
          {error && <p className="text-red-500 p-4">{error}</p>}
          <button
            disabled={loading}
            type="button"
            className="py-4 bg-blue-500 text-white rounded-xl"
          >
            Login
          </button>

          <div className=" uppercase">
            Not a user yet
            <Link
              href={"../SignUp/page"}
              className="text-blue-700 cursor-pointer"
            >
              {" "}
              sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
