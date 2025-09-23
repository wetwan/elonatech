"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type TaskContextType = {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
};

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [userToken, setUserToken] = useState<string | null>(null);

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
