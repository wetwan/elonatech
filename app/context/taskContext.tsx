/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TaskProp } from "@/types/type";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type TaskContextType = {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
  handleLogout: () => void;
  task: {
    title: string;
    description: string;
  };
  setTask: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
    }>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  openAdd: boolean;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  addTask: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  tasks: TaskProp[];
  setTasks: React.Dispatch<React.SetStateAction<TaskProp[]>>;
  deleteTask: (id: string) => void;
  editTask: (
    id: string,
    updatedName: string,
    updatedDescription: string
  ) => Promise<void>;
  completeTask: (id: string) => void;
  openEdit: boolean;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [userToken, setUserToken] = useState<string | null>(null);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<TaskProp[]>([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    setUserToken(null); // update state
    toast.success("Logged out successfully");
    router.push("/Login"); // redirect to login page
  };

  const getTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/task/taskall`,
        {
          headers: {
            token,
          },
        }
      );

      const sortedTasks = res.data.tasks.sort((a: any, b: any) => {
        if (a.status === "pending" && b.status === "completed") return -1;
        if (a.status === "completed" && b.status === "pending") return 1;
        return 0;
      });

      setTasks(sortedTasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  const addTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!task.title) {
      setError("Title is required");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/task/addtask`,
        {
          name: task.title,
          description: task.description,
        },
        {
          headers: {
            token,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setOpenAdd(false);
        router.push("/dashboard");
        await getTask();
        setTask({ title: "", description: "" });
      } else {
        setError(data.message || "Sign up failed. Please try again.");
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message);
        console.log(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      if (!userToken) {
        console.log("No token found. Please login.");
        return;
      }

      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/task/deletetask/${id}`,
        {
          headers: {
            token: userToken, // send your JWT token
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Task deleted successfully");
        getTask();
      } else {
        toast.error(data.message || "Failed to delete task");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error deleting task");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const editTask = async (
    id: string,
    updatedName?: string,
    updatedDescription?: string
  ) => {
    try {
      if (!userToken) {
        console.log("No token found. Please login.");
        return;
      }

      // Build the payload dynamically
      const payload: { name?: string; description?: string } = {};
      if (updatedName) payload.name = updatedName;
      if (updatedDescription) payload.description = updatedDescription;

      if (Object.keys(payload).length === 0) {
        console.log("No updates provided");
        return;
      }

      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/task/edittask/${id}`,
        payload,
        {
          headers: {
            token: userToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Task updated successfully");
        getTask(); // Refresh tasks list
      } else {
        toast.error(data.message || "Failed to update task");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error updating task");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  const completeTask = async (id: string) => {
    try {
      if (!userToken) {
        console.log("No token found. Please login.");
        return;
      }

      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/task/edittask/${id}`,
        {
          status: "completed",
        },
        {
          headers: {
            token: userToken, // send your JWT token
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Task marked as complete");
        // Refresh tasks list
        getTask();
      } else {
        toast.error(data.message || "Failed to update task");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Error completing task");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      setUserToken(token);
    }
  }, []);
  return (
    <TaskContext.Provider
      value={{
        userToken,
        setUserToken,
        handleLogout,
        task,
        setTask,
        setError,
        error,
        setLoading,
        loading,
        openAdd,
        setOpenAdd,
        addTask,
        tasks,
        setTasks,
        deleteTask,
        editTask,
        completeTask,
        openEdit,
        setOpenEdit,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskCreation() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskCreation must be used within a TaskProvider");
  }
  return context;
}
