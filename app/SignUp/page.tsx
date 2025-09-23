"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import { toast } from "react-toastify";
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
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
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
        {
          username: signUp.username,
          email: signUp.email,
          password: signUp.password,
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
      redirect("/");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border w-[500px] p-20 rounded-2xl">
        <h1 className="my-5 font-bold text-2xl capitalize">signUp page</h1>
        <form
          onSubmit={handleSignUp}
          className="capitalize flex flex-col gap-5 placeholder-shown:capitalize placeholder:capitalize"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              id="name"
              className="border p-4 rounded-xl placeholder:capitalize placeholder:text-white"
              placeholder="username"
              value={signUp.username}
              onChange={(e) =>
                setSignUp((prev) => ({ ...prev, username: e.target.value }))
              }
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
            {loading ? "Signing up" : "Sign Up"}
          </button>

          <div className=" uppercase">
            already a user?
            <Link href={"/Login"} className="text-blue-700 cursor-pointer">
              {" "}
              sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
