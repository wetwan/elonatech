"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useTaskCreation } from "../context/taskContext";

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState({
    password: "",
    email: "",
  });
  const { userToken, setUserToken } = useTaskCreation();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const regexemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          email: login.email,
          password: login.password,
        }
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success(data.message);
        router.push("/dashboard");
      } else {
        setError(data.message || "Sign up failed. Please try again.");
        toast.error(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optionally: validate token by calling a backend endpoint
      router.push("/dashboard"); // redirect if token exists
    }
  }, []);

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
              placeholder="email"
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
              id="password"
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
            type="submit"
            className="py-4 bg-blue-500 text-white rounded-xl"
          >
            {loading ? "signing in" : "sign in"}
          </button>

          <div className=" uppercase">
            Not a user yet?
            <Link href={"/SignUp"} className="text-blue-700 cursor-pointer">
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
